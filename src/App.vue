<template>
    <div id="app">
        <h1>Vue Table App</h1>
        <Table
            class="app-table"
            :data="tableData"
            :headers="tableHeaders"
            @loadMore="onLoadMore"
            @sortChanged="onSortChanged"
            @searchChanged="onSearchChanged"
        />
        <PreloaderOverlay v-show="loading" />
    </div>
</template>

<script>
    import PreloaderOverlay from './components/PreloaderOverlay';
    import Table from './components/Table';

    import HttpService from './services/http-service';

    const http = new HttpService('https://jsonplaceholder.typicode.com');
    const albumsStorageMap = new Map();

    export default {
        name: 'App',
        components: {
            PreloaderOverlay,
            Table,
        },
        data() {
            return {
                loading: false,
                tableData: [],
                albums: [],
                albumsPhotosMap: new Map(),
                tableHeaders: [
                    {
                        id: 'albumId',
                        title: 'Album Id',
                        disableSearch: true,
                    }, {
                        id: 'albumTitle',
                        title: 'Album Title',
                    }, {
                        id: 'title',
                        title: 'Photo Title',
                    }, {
                        id: 'thumbnail',
                        title: 'Photo Thumbnail',
                        disableSearch: true,
                        disableSorting: true,
                    },
                ],
            };
        },
        async created() {
            this.loading = true;
            try {
                const albums = await this.getAlbums();
                albums.forEach(album => {
                    albumsStorageMap.set(album.id, album);
                });

                this.tableData = await this.getTableData({});
            }
            catch (e) {
                console.error(e);
            }
            finally {
                this.loading = false;
            }
        },
        methods: {
            async onLoadMore(event) {
                const data = await this.getTableData(event);
                this.tableData = this.tableData.concat(data);
            },
            async onSortChanged(event) {
                // clear table data to scroll table up
                this.tableData = [];
                this.tableData = await this.getTableData(event);
            },
            async onSearchChanged(event) {
                // clear tableData to scroll table up
                this.tableData = [];
                this.tableData = await this.getTableData(event);
            },
            getPhotos(queryParams) {
                return http.get('photos', queryParams);
            },
            getAlbums(queryParams) {
                return http.get('albums', queryParams);
            },
            async getAlbumById(albumId = 0) {
                let album = albumsStorageMap.get(albumId);
                if (album) {
                    return album;
                }

                album = await http.get(`albums/${albumId}`) || {};
                if (album.id) {
                    albumsStorageMap.set(album.id, album);
                }

                return album;
            },
            async getPhotosSortedOrSearchedByAlbumTitle({ order, page = 1, limit = 0, searchField, searchQuery }) {
                // make new request if new sort order or search is applied
                if (page === 1) {
                    this.albums = [];
                    this.albumsPhotosMap.clear();
                }

                if (!this.albums.length) {
                    this.albums = await this.getAlbums({
                        _order: order || null,
                        _sort: order ? 'title' : null,
                        title_like: searchQuery || null,
                    });
                }

                let photos = [];
                let tableDataMap = new Map();
                this.tableData.forEach(item => {
                    tableDataMap.set(item.id, item);
                });
                // The for loop is used instead of Array.forEach to be able to exit from iterating if page is already full
                for (let i = 0; i < this.albums.length; i += 1) {
                    let requestedPhotos = [];
                    if (!this.albumsPhotosMap.has(this.albums[i].id)) {
                        requestedPhotos = await this.getPhotos({ albumId: this.albums[i].id });
                        this.albumsPhotosMap.set(this.albums[i].id, requestedPhotos);
                    } else {
                        requestedPhotos = this.albumsPhotosMap.get(this.albums[i].id);
                    }

                    requestedPhotos.forEach(photo => {
                        if (!tableDataMap.has(photo.id)) {
                            photo.albumTitle = this.albums[i].title || 'No title';
                            photos.push(photo);
                        }
                    });

                    if (photos.length >= limit) {
                        break;
                    }
                }

                return photos.slice(0, limit);
            },
            addAlbumTitleToPhotos(photos = []) {
                return Promise.all(photos.map(async photo => {
                    const photoAlbum = await this.getAlbumById(photo.albumId);

                    return {
                        ...photo,
                        albumTitle: photoAlbum.title || 'No title',
                    };
                }));
            },
            async getTableData({
                page = 1,
                limit = 25,
                sort,
                order,
                searchField,
                searchQuery,
            }) {
                const queryParams = {
                    _page: page,
                    _limit: limit,
                    _sort: sort || null,
                    _order: order || null,
                    [`${searchField}_like`]: searchQuery || null,
                };
                try {
                    if (sort === 'albumTitle' || searchField === 'albumTitle') {
                        return this.getPhotosSortedOrSearchedByAlbumTitle({ page, limit, order, searchQuery});
                    }

                    let photos = await this.getPhotos(queryParams);

                    return this.addAlbumTitleToPhotos(photos);
                }
                catch (e) {
                    console.error(e);
                }
            },
        },
    };
</script>

<style lang="scss">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

        .app-table {
            table.table {
                td, th {
                    &:first-child {
                        width: 150px;
                    }

                    &:last-child {
                        width: 220px;
                    }
                }
            }
        }
    }
</style>

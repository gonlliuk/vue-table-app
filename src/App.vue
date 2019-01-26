<template>
    <div id="app">
        <PreloaderOverlay v-show="loading" />
        <h1>Vue Table App</h1>
        <Table
            class="app-table"
            :data="tableData"
            :headers="tableHeaders"
            @loadMore="onLoadMore"
            @sortChanged="onSortChanged"
            @searchChanged="onSearchChanged"
/>
    </div>
</template>

<script>
    import PreloaderOverlay from './components/PreloaderOverlay';
    import Table from './components/Table';

    import HttpService from './services/http-service';

    const http = new HttpService('https://jsonplaceholder.typicode.com');
    const albumsStorage = new Map();

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
                sortedAlbums: [],
                storageKeys: ['limit', 'sort', 'order', 'searchFiled', 'searchQuery'],
                tableHeaders: [
                    {
                        id: 'albumId',
                        title: 'Album Id',
                    }, {
                        id: 'albumTitle',
                        title: 'Album Title',
                        disableSearch: true,
                        disableSorting: true,
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
                    albumsStorage.set(album.id, album);
                });

                this.tableData = await this.getTableData({});
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        methods: {
            async onLoadMore(event) {
                const data = await this.getDataWithLoading(event);
                this.tableData = this.tableData.concat(data);
            },
            async onSortChanged(event) {
                this.tableData = [];
                this.tableData = await this.getDataWithLoading(event);
            },
            async onSearchChanged(event) {
                this.tableData = [];
                this.tableData = await this.getDataWithLoading(event);
            },
            getPhotos(queryParams) {
                return http.get('photos', queryParams);
            },
            getAlbums(queryParams) {
                return http.get('albums', queryParams);
            },
            async getAlbumById(albumId = 0) {
                let album = albumsStorage.get(albumId);
                if (album) {
                    return album;
                }

                album = await http.get(`albums/${albumId}`) || {};
                if (album.id) {
                    albumsStorage.set(album.id, album);
                }

                return album;
            },
            addAlbumTitleToPhotos(photos = []) {
                return Promise.all(photos.map(async photo => {
                    const photoAlbum = await this.getAlbumById(photo.albumId);

                    return await {
                        ...photo,
                        albumTitle: photoAlbum.title || 'No title',
                    };
                }));
            },
            async getTableData({
                page = 1,
                limit = 25,
                sort = null,
                order = null,
                searchFiled = null,
                searchQuery = null,
            }) {
                const queryParams = {
                    _page: page,
                    _limit: limit,
                    _sort: sort || null,
                    _order: order || null,
                    [`${searchFiled}_like`]: searchQuery || null,
                };
                let photos = await this.getPhotos(queryParams);

                return this.addAlbumTitleToPhotos(photos);
            },
            getDataWithLoading(...args) {
                // enable loading after short period of time if request haven't resolved yet
                const timeout = setTimeout(() => {
                    this.loading = true;
                }, 300);
                try {
                    return this.getTableData(...args);
                } catch (e) {
                    console.error(e);
                } finally {
                    clearTimeout(timeout);
                    this.loading = false;
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

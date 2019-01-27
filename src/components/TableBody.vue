<template>
    <div class="table-body-container">
        <table
            class="table"
            cellpadding="0"
            cellspacing="0"
            border="0"
>
            <tbody>
            <tr
                v-for="item in data"
                :key="item.id"
>
                <td>
                    {{ item.albumId }}
                </td>
                <td>
                    {{ item.albumTitle }}
                </td>
                <td>
                    {{ item.title }}
                </td>
                <td>
                    <img
                        class="img-cell"
                        :src="item.thumbnailUrl"
>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'TableBodyComponent',
        props: {
            data: {
                type: Array,
                required: true,
                default() {
                    return [];
                },
            },
        },
        data() {
            return {
                loading: false,
                endOfData: false,
                element: null,
            };
        },
        watch: {
            data(newData, oldData) {
                this.endOfData = !!(newData.length && newData.length === oldData.length);
                this.loading = false;
            }
        },
        mounted() {
            this.element = document.querySelector('.table-body-container');
            if (this.element) {
                this.element.addEventListener('scroll', this.loadMoreDataListener);
            }
        },
        beforeDestroy() {
            if (this.element) {
                this.element.removeEventListener('scroll', this.loadMoreDataListener);
            }
        },
        methods: {
            loadMoreDataListener() {
                if (!this.element || this.loading || this.endOfData) {
                    return;
                }

                const loadEarlierPx = 100;
                const isClientHeightZero = this.element.clientHeight === 0;
                const isScrollOnBottom = this.element.scrollTop + this.element.clientHeight + loadEarlierPx >= this.element.scrollHeight
                if (!isClientHeightZero && isScrollOnBottom) {
                    this.loading = true;
                    this.$emit('loadMore');
                }
            },
        },
    };
</script>

<style lang="scss">
    .table-body-container {
        max-height: 70vh;
        overflow: auto;
        margin-top: 0px;
    }

    tr {
        & td {
            text-align: center;
            vertical-align: middle;
            font-size: 1.2em;
            font-weight: 300;

            & .img-cell {
                width: 50px;
            }
        }

        &:hover {
            background-color: rgba(0, 0, 0, .1);
        }
    }
</style>

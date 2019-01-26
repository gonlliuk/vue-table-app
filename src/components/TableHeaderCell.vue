<template>
    <th
        :class="sortingClass"
        @click="onHeaderCellClick(headerId)"
>
        <div class="header-title">
            {{ headerTitle }}
            <i class="material-icons">
                {{ getSortIcon(headerId) }}
            </i>
        </div>
        <div
v-show="!disableSearch"
            class="header-search"
            @click.stop
>
            <input
                v-model="searchQuery"
                type="text"
                @keyup.enter="emitSearch"
>
            <button
                class="search-button"
                type="button"
                :disabled="!searchQuery"
                @click="emitSearch"
            >
                <i class="material-icons">
                    search
                </i>
            </button>
        </div>
    </th>
</template>

<script>
    export default {
        name: 'TableHeaderCellComponent',
        props: {
            headerId: {
                type: String,
                default() {
                    return '';
                },
                required: true,
            },
            headerTitle: {
                type: String,
                default() {
                    return '';
                },
                required: true,
            },
            disableSorting: {
                type: Boolean,
                default() {
                    return false;
                },
            },
            disableSearch: {
                type: Boolean,
                default() {
                    return false;
                },
            },
        },
        data() {
            return {
                searchQuery: '',
                sort: '',
                order: '',
            };
        },
        computed: {
            sortingClass() {
                return this.disableSorting ? 'disabled-sorting' : '';
            },
            sortIcon() {
                switch (this.order) {
                    case 'asc':
                        return 'expand_more';
                    case 'desc':
                        return 'expand_less';
                    default:
                        return '';
                }
            },
        },
        methods: {
            getSortIcon(cellId) {
                return cellId === this.sort ? this.sortIcon : '';
            },
            emitSearch() {
                this.$emit('searchChanged', {
                    searchQuery: this.searchQuery,
                    searchFiled: this.headerId,
                });
            },
            onHeaderCellClick(cellId) {
                if (this.disableSorting) {
                    return;
                }

                this.sort = cellId;
                switch (this.order) {
                    case 'asc':
                        this.order = 'desc';
                        break;
                    case 'desc':
                        this.order = '';
                        this.sort = '';
                        break;
                    default:
                        this.order = 'asc';
                        break;
                }
                this.$emit('sortChanged', {
                    sort: this.sort,
                    order: this.order,
                });
            },
        },
    };
</script>

<style lang="scss">
    th {
        text-align: center;
        font-size: 1.4em;
        background: rgba(0, 0, 0, .7);
        color: #ffffff;
        font-weight: 500;
        position: relative;
        cursor: pointer;
        vertical-align: top;

        &.disabled-sorting {
            cursor: default;
        }

        &:hover {
            background: rgba(0, 0, 0, .6);
        }

        & .header-title {

            & i {
                position: absolute;
                user-select: none;
                margin-left: 10px;
            }

        }

        & .header-search {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            cursor: default;

            & input {
                flex: 1 1 auto;
                margin-right: 10px;
                height: 18px;
            }

            & .search-button {
                width: 24px;
                height: 24px;
                padding: 0;
                vertical-align: middle;
                background-color: #ffffff;
                border: 0;
                cursor: pointer;

                & i {
                    font-size: 16px;
                }

                &:disabled {
                    cursor: default;
                }
            }
        }
    }
</style>

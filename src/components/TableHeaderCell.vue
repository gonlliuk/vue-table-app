<template>
    <th
        :class="sortingClass"
        @click="onHeaderCellClick(header.id)"
    >
        <div class="header-title">
            {{ header.title }}
            <i class="material-icons">
                {{ getSortIconByCell(header) }}
            </i>
        </div>
        <div
            v-show="!header.disableSearch"
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
            header: {
                type: Object,
                default() {
                    return {};
                },
                required: true,
            },
        },
        data() {
            return {
                searchQuery: this.header.searchField === this.header.id ? this.header.searchQuery : '',
                order: this.header.sort === this.header.id ? this.header.order : '',
            };
        },
        computed: {
            sortingClass() {
                return this.header.disableSorting ? 'disabled-sorting' : '';
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
        watch: {
            header(newVal) {
                if (newVal.id !== newVal.searchField) {
                    this.searchQuery = '';
                }

                if (newVal.id !== newVal.sort) {
                    this.order = '';
                }
            },
        },
        methods: {
            getSortIconByCell(cell) {
                return cell.id === cell.sort ? this.sortIcon : '';
            },
            emitSearch() {
                this.$emit('searchChanged', {
                    searchQuery: this.searchQuery,
                    searchField: this.header.id,
                });
            },
            onHeaderCellClick(cellId) {
                if (this.header.disableSorting) {
                    return;
                }

                let sort = cellId;
                switch (this.order) {
                    case 'asc':
                        this.order = 'desc';
                        break;
                    case 'desc':
                        this.order = '';
                        sort = '';
                        break;
                    default:
                        this.order = 'asc';
                        break;
                }
                this.$emit('sortChanged', {
                    sort: sort,
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

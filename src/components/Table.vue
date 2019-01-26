<template>
    <div class="table-container">
        <TableHeader
            :headers="headers"
            @sortChanged="onSortChanged"
            @searchChanged="onSearchChanged"
/>
        <TableBody
            :data="data"
            @loadMore="onLoadMore"
/>
    </div>
</template>

<script>
    import TableBody from './TableBody';
    import TableHeader from './TableHeader';

    export default {
        name: 'TableComponent',
        components: {
            TableBody,
            TableHeader,
        },
        props: {
            data: {
                type: Array,
                required: true,
                default() {
                    return [];
                },
            },
            headers: {
                type: Array,
                required: true,
                default() {
                    return [];
                },
            },
        },
        data() {
            return {
                params: {
                    page: 1,
                    sort: '',
                    order: '',
                    searchFiled: '',
                    searchQuery: '',
                },
            };
        },
        methods: {
            onSortChanged({ order, sort }) {
                this.params = {
                    ...this.params,
                    order,
                    sort,
                    page: 1,
                };
                this.$emit('sortChanged', this.params);
            },
            onSearchChanged({ searchQuery, searchFiled }) {
                this.params = {
                    ...this.params,
                    searchQuery,
                    searchFiled,
                    page: 1,
                };
                this.$emit('searchChanged', this.params);
            },
            onLoadMore() {
                this.params.page += 1;
                this.$emit('loadMore', this.params);
            },
        },
    };
</script>

<style lang="scss">
    .table-container {
        table {
            text-align: center;
            width: 100%;
            table-layout: fixed;
        }

        td, th {
            padding: 10px 20px;
        }
    }
</style>

<template>
    <div class="table-header-container">
        <table
            class="table"
            cellpadding="0"
            cellspacing="0"
            border="0"
>
            <thead>
                <tr>
                    <TableHeaderCell
                        v-for="header in headers"
                        :key="header.id"
                        :header-id="header.id"
                        :header-title="header.title"
                        :disable-search="header.disableSearch"
                        :disable-sorting="header.disableSorting"
                        @sortChanged="onSortChanged"
                        @searchChanged="onSearchChanged"
/>
                </tr>
            </thead>
        </table>
    </div>
</template>

<script>
    import TableHeaderCell from './TableHeaderCell';

    export default {
        name: 'TableHeaderComponent',
        components: {
            TableHeaderCell,
        },
        props: {
            headers: {
                type: Array,
                required: true,
                default() {
                    return [];
                },
            },
        },
        methods: {
            onSortChanged(event) {
                this.$emit('sortChanged', event);
            },
            onSearchChanged(event) {
                this.$emit('searchChanged', event);
            },
        },
    };
</script>

<style lang="scss">
</style>

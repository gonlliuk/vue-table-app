<template>
    <div id="app">
        <PreloaderOverlay v-show="loading" />
        <h1>App</h1>
    </div>
</template>

<script>
    import PreloaderOverlay from './components/PreloaderOverlay';

    export default {
        name: 'App',
        components: {
            PreloaderOverlay,
        },
        data() {
            return {
                loading: true,
            };
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
        margin-top: 60px;
    }
</style>

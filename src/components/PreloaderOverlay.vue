<template>
    <div class="overlay">
        <div class="spinner">
            <i /> <i /> <i /> <i />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PreloaderOverlayComponent',
    };
</script>

<style lang="scss">
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        touch-action: none;
        user-select: none;
        background-color: rgba(255, 255, 255, .5);

        & * {
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
        }

        div.spinner {
            -moz-animation: rotate 10s infinite linear;
            -webkit-animation: rotate 10s infinite linear;
            animation: rotate 10s infinite linear;
            position: fixed;
            display: block;
            margin: auto;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 104px;
            height: 104px;
        }
        div.spinner i {
            -moz-animation: rotate 3s infinite cubic-bezier(0.09, 0.6, 0.8, 0.03);
            -webkit-animation: rotate 3s infinite cubic-bezier(0.09, 0.6, 0.8, 0.03);
            animation: rotate 3s infinite cubic-bezier(0.09, 0.6, 0.8, 0.03);
            -moz-transform-origin: 50% 100% 0;
            -webkit-transform-origin: 50% 100% 0;
            transform-origin: 50% 100% 0;
            position: absolute;
            display: inline-block;
            top: 50%;
            left: 50%;
            border: solid 6px transparent;
            border-bottom: none;
        }
        div.spinner i:nth-child(1) {
            -moz-animation-timing-function: cubic-bezier(0.09, 0.3, 0.12, 0.03);
            -webkit-animation-timing-function: cubic-bezier(0.09, 0.3, 0.12, 0.03);
            animation-timing-function: cubic-bezier(0.09, 0.3, 0.12, 0.03);
            width: 56px;
            height: 28px;
            margin-top: -28px;
            margin-left: -28px;
            border-color: #3f95e1;
            border-top-left-radius: 46px;
            border-top-right-radius: 46px;
        }
        div.spinner i:nth-child(2) {
            -moz-animation-timing-function: cubic-bezier(0.09, 0.6, 0.24, 0.03);
            -webkit-animation-timing-function: cubic-bezier(0.09, 0.6, 0.24, 0.03);
            animation-timing-function: cubic-bezier(0.09, 0.6, 0.24, 0.03);
            width: 72px;
            height: 36px;
            margin-top: -36px;
            margin-left: -36px;
            border-color: #82c545;
            border-top-left-radius: 52px;
            border-top-right-radius: 52px;
        }
        div.spinner i:nth-child(3) {
            -moz-animation-timing-function: cubic-bezier(0.09, 0.9, 0.36, 0.03);
            -webkit-animation-timing-function: cubic-bezier(0.09, 0.9, 0.36, 0.03);
            animation-timing-function: cubic-bezier(0.09, 0.9, 0.36, 0.03);
            width: 88px;
            height: 44px;
            margin-top: -44px;
            margin-left: -44px;
            border-color: #c88ecb;
            border-top-left-radius: 58px;
            border-top-right-radius: 58px;
        }
        div.spinner i:nth-child(4) {
            -moz-animation-timing-function: cubic-bezier(0.09, 1.2, 0.48, 0.03);
            -webkit-animation-timing-function: cubic-bezier(0.09, 1.2, 0.48, 0.03);
            animation-timing-function: cubic-bezier(0.09, 1.2, 0.48, 0.03);
            width: 104px;
            height: 52px;
            margin-top: -52px;
            margin-left: -52px;
            border-color: #ffcc00;
            border-top-left-radius: 64px;
            border-top-right-radius: 64px;
        }
    }

    @-moz-keyframes rotate {
        to {
            -moz-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes rotate {
        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes rotate {
        to {
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>

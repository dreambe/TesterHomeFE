<template>
    <header style="background-color: rgb(10, 47, 88);">
        <div class="text-logo">
            <router-link to="/"><div class="text-link">{{msg}}</div></router-link></div>
        <p class="meta">Stay Hungary!</p>
        <ul class="header-operations">
        </ul>
    </header>
</template>

<script>
    export default {
        name: 'db-header',
        data () {
            return {
                msg: '测试管理平台'
            }
        }
    }
</script>

<style>
    header {
        height: 70px;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        padding: 0 20px;
        z-index: 1;
        box-sizing: border-box;
    }

    .text-logo {
        display: inline-block;
        vertical-align: middle;
        border-style: none;
        position: relative;
        top: 26px;
        right: -20px;
        font-size: 25px;
        color: white;
    }

    .router-link-active .text-link {
        color: white;
        text-decoration: none;
        exact: true;
    }

    .meta {
        color: #7e95c5;
        width: 200px;
        display: block;
        margin: -5px 0 0 225px;
        font-weight: 700;
        font-size: 0.3rem;
    }
</style>
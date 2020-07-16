<template>
    <div id="app">
        <div class="header">
            <div class="logo">
                <router-link to="/">
                    谨下阅读
                </router-link>
            </div>
        </div>
        <div class="main">
            <router-view/>
        </div>
        <div class="footerBar">
            <van-tabbar v-model="activeBar">
                <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
                <van-tabbar-item>
                    <div>文库</div>
                    <template #icon>
                        <van-icon class="iconfont" class-prefix="icon" name="library" size="18"></van-icon>
                    </template>
                </van-tabbar-item>
                <van-tabbar-item>
                    论坛
                    <template #icon>
                        <van-icon class="iconfont" class-prefix="icon" name="forum" size="18"></van-icon>
                    </template>
                </van-tabbar-item>
                <van-tabbar-item icon="friends-o">
                    创作
                    <template #icon>
                        <van-icon class="iconfont" class-prefix="icon" name="ios-create" size="18"></van-icon>
                    </template>
                </van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showNav: false,
                activeBar: 0,
            }
        },
        methods: {}
    }
</script>

<style lang="scss">
    @import "./assets/icons/library/iconfont.css";
    @import "./assets/icons/forum/iconfont.css";
    @import "./assets/icons/create/iconfont.css";

    .app {
        background-color: #FFFFFF;
    }

    .header {
        width: 100%;
        height: 55px;
        /*background-color: #515a6e;*/
        background-color: #222;
        /*取消双击选中文字*/
        user-select: none;
    }

    .logo {
        width: 100%;
        line-height: 55px;
        color: #fff;
        font-size: 32px;
        font-weight: bold;
        font-family: YouYuan, serif;
        text-align: center;

        a {
            color: #fff;
        }
    }

    .main {
        padding: 5px;
    }

    .tabBar_library {
        width: 24px;
        text-align: center;
    }
</style>

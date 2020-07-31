<template>
    <div class="forum">
        <div class="noticeArea">
            <table class="table_notice">
                <tr class="tr_head border_bottom">
                    <th class="th_title" align="left" colspan="2">
                        <div class="title_box">全部公告</div>
                    </th>
                    <!--<th align="center">作者</th>
                    <th align="center">查看</th>
                    <th align="center">最后修改</th>-->
                </tr>
                <div :class="index===noticeList.length-1?'table_body':'table_body border_bottom'"
                     v-for="(notice, index) in noticeList" :key="index">
                    <div>
                        【<span class="notice_label">{{ notice.label }}</span>】
                        <span class="submitTime">{{ notice.submitTime | dateFormat }}</span>
                    </div>
                    <div class="title">
                        <router-link :to="'/toNotice?id='+notice.id">{{ notice.title }}</router-link>
                    </div>
                    <div class="author_count">
                        <!--<span>{{ topic.username }}</span>
                        <span>{{ topic.replycount }}</span>-->
                        <div class="author">{{ notice.username }}</div>
                        <div class="count">
                            <div class="count_view">
                                <Icon type="md-eye"/>
                                <span> {{ notice.viewCount }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </table>
        </div>
        <div class="topicArea">
            <table class="table_topic">
                <tr class="tr_head border_bottom">
                    <th class="th_title" align="left" colspan="2">
                        <div class="title_box">全部主题</div>
                    </th>
                    <!--<th align="center">作者</th>
                    <th align="center">回复 / 查看</th>
                    <th align="center">最后发表</th>-->
                </tr>
                <div :class="index===topics.length-1?'table_body':'table_body border_bottom'"
                     v-for="(topic, index) in topics" :key="index">
                    <div>
                        【<span class="label">{{ topic.label }}</span>】
                        <span class="submitTime">
                            <Time :time="topic.createTime"/>
                            <span>/</span>
                            <Time :time="topic.lastSubmit"/>
                        </span>
                    </div>
                    <div class="title">
                        <router-link :to="'/toTopic?id='+topic.id">{{ topic.title }}</router-link>
                    </div>
                    <div class="author_count">
                        <!--<span>{{ topic.username }}</span>
                        <span>{{ topic.replycount }}</span>-->
                        <div class="author">{{ topic.username }}</div>
                        <div class="count">
                            <div class="count_reply">
                                <Icon type="md-text"/>
                                <span> {{ topic.replyCount }}</span>
                            </div>
                            <div class="count_view">
                                <Icon type="md-eye"/>
                                <span> {{ topic.viewCount }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </table>
            <div class="paging_box">
                <Page v-if="paging.total>0" :current="paging.currentPage" :page-size="paging.pageSize"
                      :total="paging.total" show-elevator @on-change="changePage" size="small"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Forum",
        data() {
            return {
                noticeList: [],
                topics: [],
                paging: {
                    currentPage: 1,
                    pageSize: 45,
                    total: 0,
                },
                /*form: {
                    page: 1,
                    terminal: ''
                }*/
            }
        },
        computed: {
            isLogin: function () {
                return this.$store.getters.isLogin;
            },
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.getNoticeList();
                this.getTopicList();
            },
            getNoticeList() {
                let params = {
                    level: this.isLogin ? this.$store.getters.getUser.level : 0,
                    page: this.paging.currentPage,
                };
                this.axios.post(this.api.forum.notices, params).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
                        this.$Message.error(resp.msg);
                        return;
                    }
                    this.noticeList = resp.data;
                });
            },
            getTopicList() {
                let params = {
                    userId: 0,
                    page: this.paging.currentPage,
                };
                this.axios.post(this.api.forum.topics, params).then(response => {
                    let resp = response.data;
                    if (resp.status !== 200) {
                        this.$Message.error(resp.msg);
                        return;
                    }
                    this.topics = resp.data.topicList;
                    this.paging.total = resp.data.topicCount;
                });
            },
            changePage(page) {
                this.paging.currentPage = page;
                this.getTopicList();
            },
        }
    }
</script>

<style scoped lang="scss">
    .noticeArea {
        /*height: 100px;*/
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 10px 15px;
        margin-bottom: 6px;
    }

    .topicArea {
        /*height: 300px;*/
        background-color: #f5f5f5;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        padding: 10px 15px;
        overflow: hidden;
    }

    .table_notice {
        width: 100%;
        border-collapse: collapse;
    }

    .notice_label {
        width: 14%;
        font-size: 1.2em;
        color: red;
    }

    .table_topic {
        width: 100%;
        border-collapse: collapse;
    }

    .tr_head {
        height: 40px;
        font-size: 1.2em;
        font-weight: bold;
    }

    /*.th_title {
        border-left: 6px solid dodgerblue;
    }*/
    .title_box {
        padding-left: 15px;
        border-left: 6px solid dodgerblue;
    }

    .table_body {
        overflow: hidden;
        margin-top: 10px;
    }

    .label {
        width: 14%;
        font-size: 1.2em;
        color: #ff78f2;
    }

    .submitTime {
        font-size: 1.0em;
        /*font-weight: bold;*/
        span {
            margin: 0 0.1rem;
        }
    }

    .title {
        font-size: 1.2em;
        font-weight: bold;

        a {
            color: #515a6e;
        }
    }

    .author {
        float: left;
        color: #808695;
    }

    .count {
        float: right;
    }

    .count_reply {
        display: inline;
        margin-right: 10px;
    }

    .count_view {
        display: inline;
    }

    .border_bottom {
        border-bottom: 1px solid #999;
    }

    .paging_box {
        float: right;
        margin: 20px 0px 0px 0px;
    }
</style>

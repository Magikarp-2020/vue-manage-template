<template>
    <div class="message-list-box">
        <el-popover
                ref="message-propver"
                placement="bottom"
                popper-class="message-popper"
                width="400"
                :offset="2000"
                trigger="hover">
            <div class="title">
                站内消息通知
            </div>
            <div class="content">
                <div class="message-popper-item">
                    <a href="http://www.baidu.com" target="_blank" class="message-popper-item-name">今晚打老虎</a>
                    <div class="message-popper-item-info">2017年3月16日17:36:51</div>
                </div>
                <div class="message-popper-item">
                    <a href="http://www.baidu.com" target="_blank" class="message-popper-item-name">今晚打老虎</a>
                    <div class="message-popper-item-info">2017年3月16日17:36:51</div>
                </div>
                <div class="message-popper-item">
                    <a href="http://www.baidu.com" target="_blank" class="message-popper-item-name">今晚打老虎</a>
                    <div class="message-popper-item-info">2017年3月16日17:36:51</div>
                </div>
            </div>
            <div class="footer">
                <a href="">查看更多</a>
            </div>
        </el-popover>

        <i v-popover:message-propver class="message-icon iconfont icon-alarm"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {};

</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
<style lang="scss" rel="stylesheet/scss">
    .message-popper {
        top: 38px !important;
        padding: 0;
        a {
            color: #06c;
            display: block;
        }
        .popper__arrow {
            &::after {
                border-bottom-color: #eaedf1 !important;
            }
        }
        .title {
            height: 50px;
            background-color: #eaedf1;
            padding: 0 15px;
            line-height: 50px;
            color: #333;
            font-size: 14px;
        }
        .message-popper-item {
            padding: 8px;
            border-bottom: 1px solid #eaedf1;
            transition: all .3s;
            background: #ffffff;
            /*&:last-of-type {
                border-bottom: none;
            }*/
            &:hover {
                background: #f9f9f9;
            }
            .message-popper-item-name {
                max-width: 300px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 14px;
                line-height: 28px;
            }
            .message-popper-item-info {
                font-size: 12px;
                color: #c8c8c8;
                line-height: 16px;
            }
        }
        .footer {
            line-height: 40px;
            text-align: center;
        }
    }
</style>

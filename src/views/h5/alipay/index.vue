<script setup lang='ts'>
import { ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { ElMessageBox } from 'element-plus'
import QrcodeVue from 'qrcode.vue'
import { isPayApi } from "@/api/h5"

const route = useRoute()
const router = useRouter()

// const query = ref(route.query)
let timer: any;
timer = setInterval(() => {
    isPayApi(route.query.id as string).then(res => {
        console.log(res);
        if (res.data.status == 'PAID') {
            clearInterval(timer)
            ElMessageBox.confirm(`${res.data.detail.content}`, "请保存好账号信息", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success"
                }).then(() => {
                    router.push('/')
                })
        }
    })
}, 3000)

onUnmounted(() => {
    if (timer) {
        clearInterval(timer)
    }
})

const goAlipay = () => {
    window.open(route.query.url as string)
}

</script>

<template>
  <div class="pay">
    <div class="mod-title">
        <img src="../../../assets/images/alipay.jpg" alt="">
    </div>

    <div class="mod-ct">

        <div class="pc">
            <div style="font-size: 32px;padding-top: 20px;">请支付 <b style="color: red;">¥
                {{ route.query.amount }}</b> 元
            </div>
            <div class="hr-top"></div>
            <qrcode-vue :value="(route.query.url as string)" :size="200" level="H" />
        </div>

        <div class="mobile hr-top">
            <button type="button" class="openAlipay" @click="goAlipay();">👉点击我呼起支付宝进行支付👈</button>
        </div>

        <div class="footer">
            <div>
                <div class="tip ">
                    <img src="@/assets/images/kk.png" class="ico-scan"/>
                    <div class="tip-text">
                        <p>打开支付宝扫一扫</p>
                        <p>手机使用相册扫</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- <script type="text/javascript">
        let tradeNo = '774240202204703487';
        let qrcode = "https://qr.alipay.com/bax05930zy6js7ktsatb25f4";

        $('#qrcode').qrcode({
            render: "canvas",
            width: 200,
            height: 200,
            text: qrcode
        });

        let goAlipay = () => {
            window.open(qrcode);
        }

        if (pay.isMobile()) {
            window.open(qrcode);
            $('.mobile').show();
        }

        //查询订单
        pay.queryTimer(tradeNo, null, res => {
            layer.msg('支付成功');
            setTimeout(() => {
                window.location.href = "https://wgpt4.com/user/index/query?tradeNo=774240202204703487";
            }, 1000);
        }, res => {
            layer.msg('订单已被关闭');
            setTimeout(() => {
                window.location.href = "https://wgpt4.com/user/index/query?tradeNo=774240202204703487";
            }, 1000);
        });

        //点击小箭头事件
        $('#orderDetail a').click(function () {
            if ($('#orderDetail').hasClass('detail-open')) {
                $('#orderDetail .detail-ct').slideUp(500, function () {
                    $('#orderDetail').removeClass('detail-open');
                });
            } else {
                $('#orderDetail .detail-ct').slideDown(500, function () {
                    $('#orderDetail').addClass('detail-open');
                });
            }
        });
    </script> -->
  </div>
</template>

<style scoped lang='scss'>
.pay {
	padding: 16px;
	min-height: 100%;
  background: #f7f7f7;

	.mod-title {
		padding: 16px 0 10px;
        text-align: center;
        background: #fff;
		border-radius: 6px;
	}

	.mod-ct {
		background-color: #fff;
		border-radius: 6px;

		margin-top: 12px;
        min-width: 300px;
        max-width: 640px;
        margin: 0 auto;
        margin-top: 15px;
        text-align: center;
        color: #333;
        border-top: none;
	}

	.hr-top {
        margin-top: 20px;
        border-top: 1px dashed #e5e5e5;
        padding: 10px 0;
	}

    .hr-top {
        margin-top: 20px;
        border-top: 1px dashed #e5e5e5;
        padding: 10px 0;

        .openAlipay {
            padding: 6px 12px;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 4px;
            color: #fff;
            background-color: #2e6da4;
            border-color: #2e6da4;
        }
    }

    .tip {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        border-top: 1px dashed #e5e5e5;
        padding: 10px 0;

        .ico-scan {
            width: 56px;
            height: 55px;
            margin-right: 22px;
        }
    }
}
</style>
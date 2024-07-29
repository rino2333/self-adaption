<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus"
import { type WareData } from "@/api/ware"
import { h5WareDetailApi, createOrderApi, payApi } from "@/api/h5"

const route = useRoute()
const router = useRouter()

let id = ''
id = route.query.id as string

const wareInfo = ref({} as WareData)
const getDetail = () => {
  if (id) {
    h5WareDetailApi(id).then(res => {
      console.log(res);
      wareInfo.value = res.data
    }) 
  } else {
    ElMessage.warning('请从首页进入～')
    router.push('/')
  }
}
getDetail()

const disabled = ref(false)
const mobile = ref('')
const handleBuy = () => {
  if (localStorage.getItem('noFree')) {
    ElMessage.warning('该商品限购一次，快去看看其它商品吧')
    return
  }
  if (!mobile.value) {
    ElMessage.warning('请先输入邮箱！')
    return
  }
  const params = {
    id,
    number: '1',
    mobile: mobile.value
  }
  disabled.value = true
  createOrderApi(params).then(res => {
    console.log(res.data);
    payApi(res.data).then(resp => {
      console.log(resp.data);
      if (resp.data) {
        let obj = JSON.parse(resp.data)
        var url = obj.alipay_trade_precreate_response.qr_code
        router.push({ path: 'alipay', query: { id: res.data, url, amount: wareInfo.value.amount, orderId: id }})
      }
      // let aliSubmitDiv = document.getElementById("ali_submit_div") as HTMLElement;
      // aliSubmitDiv.innerHTML = resp.data;
      // let formedom = document.querySelector('form[name=punchout_form]') as HTMLFormElement;
      // formedom.submit();
    })
  }).finally(() => {
    disabled.value = false
  })
}
</script>

<template>
  <div style="display: none" id="ali_submit_div"></div>

  <nav>
    <div class="main-box">
      <div class="title" style="border-bottom: 1px solid #f7f7f7;padding-bottom: 5px;">
        <svg t="1602931755138" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4748" width="20" height="20">
            <path d="M904.192 908.288H119.808l-40.96-45.056 81.92-711.68 40.96-35.84h142.336v81.92H237.568l-71.68 628.736h692.224l-71.68-628.736H680.96v-81.92h141.312l40.96 35.84 81.92 711.68z" fill="#3C8CE7" p-id="4749" data-spm-anchor-id="a313x.7781069.0.i65" class=""></path>
            <path d="M516.096 422.912c-104.448 0-151.552-73.728-161.792-112.64l59.392-15.36c2.048 7.168 20.48 66.56 102.4 66.56 78.848 0 91.136-57.344 92.16-63.488l60.416 10.24c-5.12 38.912-46.08 114.688-152.576 114.688z" fill="#00EAFF" p-id="4750" data-spm-anchor-id="a313x.7781069.0.i68" class="selected"></path>
        </svg>
        <span>商品详情</span>
      </div>
      <div class="layui-col-md4 layui-col-sm12 pc">
          <div class="goods-img">
              <img class="viewer-pictures" :src="wareInfo.logo" alt="">
          </div>

          <div class="email-form">
            <input type="hidden" name="_token" value="unmylEfNKy5NxLYuuYitLk1FIdEGteSlQUPUYr4z">
            <input type="hidden" name="gid" value="4">
            <div class="layui-col-md8 layui-col-sm12">
                <div class="goods-msg">
                    <div class="goods-name">
                        <svg style="vertical-align: middle;" t="1602941112468" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1512" width="25" height="25" data-spm-anchor-id="a313x.7781069.0.i14">
                            <path d="M727.04 750.592h-68.608v-81.92H686.08V249.856L512 99.328 337.92 253.952v414.72h28.672v81.92H296.96l-40.96-40.96V235.52l13.312-30.72 215.04-190.464h54.272l215.04 186.368 14.336 30.72v478.208z" fill="#3C8CE7" p-id="1513" data-spm-anchor-id="a313x.7781069.0.i12" class=""></path>
                            <path d="M869.376 638.976l-147.456-18.432-35.84-40.96V350.208l69.632-28.672 147.456 147.456 12.288 28.672v99.328l-46.08 41.984zM768 543.744l65.536 8.192v-35.84L768 449.536v94.208zM154.624 638.976l-46.08-40.96v-99.328l12.288-28.672 147.456-147.456 69.632 28.672v229.376l-35.84 40.96-147.456 17.408z m35.84-123.904v35.84L256 542.72v-94.208l-65.536 66.56z" fill="#3C8CE7" p-id="1514" data-spm-anchor-id="a313x.7781069.0.i15" class=""></path>
                            <path d="M512 465.92m-67.584 0a67.584 67.584 0 1 0 135.168 0 67.584 67.584 0 1 0-135.168 0Z" fill="#3C8CE7" p-id="1515" data-spm-anchor-id="a313x.7781069.0.i16" class=""></path>
                            <path d="M479.232 660.48h58.368v233.472h-58.368zM391.168 723.968h58.368v157.696h-58.368zM461.824 922.624h58.368v88.064h-58.368zM574.464 748.544h58.368v188.416h-58.368z" fill="#00EAFF" p-id="1516" data-spm-anchor-id="a313x.7781069.0.i17" class="selected"></path>
                        </svg>
                        <span>
                          {{ wareInfo.name }}
                          <span class="small-tips tips-green">自动发货</span>
                          <span class="small-tips tips-blue">库存({{ wareInfo.count }})</span>
                        </span>
                    </div>
                    <div class="price">
                        <span class="price-sign">￥</span>
                        <span class="price-num">{{ wareInfo.amount }}</span>
                    </div>

                    <div class="entry">
                        <span class="l-msg"><span style="color: red;">* </span>邮箱:</span>
                        <label class="input">
                            <input v-model="mobile" type="text" name="order_sn" lay-verify="required" placeholder="请输入正确邮箱" autocomplete="off">
                        </label>
                    </div>

                    <div class="pay notSelection">
                      <input type="hidden" name="payway" lay-verify="payway" value="1">
                        <div class="pay-type  pay-select " data-type="zfbf2f" data-id="1" data-name="支付宝当面付">
                          <svg t="1602939269695" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1127" width="32" height="32"><path d="M902.095 652.871l-250.96-84.392s19.287-28.87 39.874-85.472c20.59-56.606 23.539-87.689 23.539-87.689l-162.454-1.339v-55.487l196.739-1.387v-39.227H552.055v-89.29h-96.358v89.294H272.133v39.227l183.564-1.304v59.513h-147.24v31.079h303.064s-3.337 25.223-14.955 56.606c-11.615 31.38-23.58 58.862-23.58 58.862s-142.3-49.804-217.285-49.804c-74.985 0-166.182 30.123-175.024 117.55-8.8 87.383 42.481 134.716 114.728 152.139 72.256 17.513 138.962-0.173 197.04-28.607 58.087-28.391 115.081-92.933 115.081-92.933l292.486 142.041c-11.932 69.3-72.067 119.914-142.387 119.844H266.37c-79.714 0.078-144.392-64.483-144.466-144.194V266.374c-0.074-79.72 64.493-144.399 144.205-144.47h491.519c79.714-0.073 144.396 64.49 144.466 144.203v386.764z m-365.76-48.895s-91.302 115.262-198.879 115.262c-107.623 0-130.218-54.767-130.218-94.155 0-39.34 22.373-82.144 113.943-88.333 91.519-6.18 215.2 67.226 215.2 67.226h-0.047z" fill="#02A9F1" p-id="1128" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path></svg> 支付宝当面付</div>
                    </div>
                </div>
            </div>
            <div class="layui-col-sm12 buy" style="text-align: center">
                <button @click="handleBuy" :disabled="disabled">
                  <span>下单</span>
                </button>
            </div>
          </div>
      </div>
    </div>

    <div class="main-box">
      <div class="title" style="border-bottom: 1px solid #f7f7f7;padding-bottom: 5px">
          <svg t="1602951214662" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1513" width="20" height="20">
              <path d="M791.552 1002.496L513.024 875.52l-91.136 45.056-35.84-73.728 107.52-53.248 35.84-1.024L766.976 901.12V242.688H257.024v559.104h-81.92V201.728l40.96-40.96h591.872l40.96 40.96v762.88z" fill="#3C8CE7" p-id="1514" data-spm-anchor-id="a313x.7781069.0.i7" class="selected"></path>
              <path d="M481.28 21.504h61.44v309.248h-61.44z" fill="#00EAFF" p-id="1515" data-spm-anchor-id="a313x.7781069.0.i8" class=""></path>
              <path d="M512 518.144c-63.488 0-114.688-51.2-114.688-114.688 0-63.488 51.2-114.688 114.688-114.688s114.688 51.2 114.688 114.688c0 63.488-51.2 114.688-114.688 114.688z m0-167.936c-29.696 0-53.248 23.552-53.248 53.248 0 29.696 23.552 53.248 53.248 53.248s53.248-23.552 53.248-53.248c0-29.696-23.552-53.248-53.248-53.248z" fill="#3C8CE7" p-id="1516" data-spm-anchor-id="a313x.7781069.0.i11" class="selected"></path>
          </svg>
          <span>商品描述</span>
      </div>
      <div class="intro">
        <div class="ware-describe" style="padding: 0 16px;" v-html="wareInfo.describe"></div>
      </div>
  </div>
  </nav>
</template>

<style lang="scss">
.ware-describe {
  padding: 0 16px;

  img {
    width: 100%;
  }
}
</style>

<style scoped lang="scss">
article {
  margin-top: 16px;
  padding: 12px 24px;
  background: rgba($color: #fff, $alpha: .2);
  box-shadow: 0 7px 29px 0 rgba(18, 52, 91, .11);
  border-radius: 6px;
}

nav {
  .main-box {
    margin-top: 20px;
    background: #fff;
    -webkit-box-shadow: 0 7px 29px 0 rgba(18, 52, 91, .11);
    box-shadow: 0 7px 29px 0 rgba(18, 52, 91, .11);
    border-radius: 6px;
    padding-top: 14px;
    padding-bottom: 20px;

    .goods-msg {
      margin: 20px 20px 0;

      .goods-name {
        font-weight: 700;
        font-size: 18px;
        color: #545454;
        border-bottom: 1px solid #f7f7f7;
        padding-bottom: 5px;

        .small-tips {
          display: inline-block;
          padding: 1px 5px;
          border-radius: 3px;
          font-size: 11px;
          margin-left: 5px;
          line-height: initial;
        }

        .tips-green {
          background: #dff7ea;
          color: #28C76F;
        }

        .tips-blue {
          background: #cadbff;
          color: #3C8CE7;
        }
      }

      
      .price-sign {
        color: #e4393c;
        font-size: 16px;
      }

      .price-num {
        color: #e4393c;
        font-size: 22px;
      }

      .entry {
        .l-msg {
          color: #999;
          width: 72px;
          display: inline-block;
          vertical-align: middle;
          font-size: 14px;
        }

        input {
          display: inline-block;
          padding: 0 5px;
          height: 35px;
          width: calc(100% - 95px);
          font-weight: 500;
          font-size: 14px;
          color: #999;
          background: #fff;
          border: 1px solid #f0f0f0;
          -webkit-box-shadow: 0 4px 10px 0 rgba(135, 142, 154, .07);
          box-shadow: 0 4px 10px 0 rgba(135, 142, 154, .07);
          border-radius: 4px;
          overflow: hidden;
        }
      }

      .pay {
        // margin-top: 20px;
        // border-top: 1px solid #f7f7f7;
        padding-top: 10px;

        svg {
          vertical-align: middle;
        }
      }

      .pay-type {
        display: inline-block;
        text-align: center;
        background: #f7f7f7;
        border: 2px solid #e7e7e7;
        border-radius: 5px;
        position: relative;
        padding: 7px 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
      }

      .pay-select {
        border: 2px solid rgb(51, 105, 255);
        background: rgb(248, 250, 255);
        color: rgb(51, 105, 255);
      }
    }

    .buy {
      button {
        border: initial;
        color: #fff;
        display: inline-block;
        width: 170px;
        font-size: 18px;
        font-weight: 700;
        line-height: 45px;
        border-radius: 100px;
        cursor: pointer;
        user-select: none;
        box-shadow: 0 5px 6px 0 rgba(73, 105, 230, .22);
        background-image: linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%);
      }
    }
  }

  .title {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    color: #545454;
    margin: 0 20px;

    span {
      margin-left: 6px;
    }
  }

  .main-box .goods-img {
    margin-left: 20px;
    margin-right: 10px;
    margin-top: 10px;
    width: calc(100% - 30px);
    
    img {
      width: calc(100% - 10px);
      box-shadow: 0 5px 6px 0 rgba(73, 105, 230, .22);
      border-radius: 5px;
      margin-top: 5px;
      padding: 5px; 
    }
  }

  .title-2 {
    margin-bottom: 10px;
    color: #545454;
  }
}

@media (min-width: 900px) {
  .pc {
    display: flex;
    
    .goods-img {
      flex: 1;
    }

    .email-form {
      flex: 2;
    }
  }
}
</style>
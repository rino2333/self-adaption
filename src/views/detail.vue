<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { type WareTypeData, type WareTypeTree, treeApi,  } from "@/api/ware-type"
import { type WareData, listApi, addApi, detailApi, deleteApi, editApi } from "@/api/ware"
import { type H5WareType, h5TypeApi } from "@/api/h5"

const router = useRouter()

const wareType = ref<H5WareType[]>([])
  h5TypeApi().then(res => {
  wareType.value = res.data
  getWareData(wareType.value[0].id)
})

const wareData = ref<WareData[]>([])
const getWareData = (typeId: string) => {
  listApi({ typeId }).then(res => {
    wareData.value = res.data.records
  })
}
const activeTab = ref(1)
const changeTab = (index: number, id: string) => {
  activeTab.value = index
  getWareData(id)
}


</script>

<template>
  <div class="page">
    <header class="flex-align-center">
      <img src="../assets/images/123.jpg" alt="">
      一个gpt账号自助平台
    </header>

    <nav>
      <div class="main-box">
        <div class="title" style="border-bottom: 1px solid #f7f7f7;padding-bottom: 5px;">
          <svg t="1602931755138" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4748" width="20" height="20">
              <path d="M904.192 908.288H119.808l-40.96-45.056 81.92-711.68 40.96-35.84h142.336v81.92H237.568l-71.68 628.736h692.224l-71.68-628.736H680.96v-81.92h141.312l40.96 35.84 81.92 711.68z" fill="#3C8CE7" p-id="4749" data-spm-anchor-id="a313x.7781069.0.i65" class=""></path>
              <path d="M516.096 422.912c-104.448 0-151.552-73.728-161.792-112.64l59.392-15.36c2.048 7.168 20.48 66.56 102.4 66.56 78.848 0 91.136-57.344 92.16-63.488l60.416 10.24c-5.12 38.912-46.08 114.688-152.576 114.688z" fill="#00EAFF" p-id="4750" data-spm-anchor-id="a313x.7781069.0.i68" class="selected"></path>
          </svg>
          <span>商品详情</span>
        </div>
        <div class="layui-col-md4 layui-col-sm12">
            <div class="goods-img">
                <img class="viewer-pictures" src="https://sat233.com/uploads/images/8056f676f0d87309aca66305aad3a2d4.jpg" data-original="https://sat233.com/uploads/images/8056f676f0d87309aca66305aad3a2d4.jpg" alt="">
            </div>
        </div>
        
        <form class="layui-form layui-form-pane" action="https://sat233.com/create-order" method="post">
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
                          Chat GPT 3.5 - 个人专属号
                                                                      <span class="small-tips tips-green">自动发货</span>
                                                                  <span class="small-tips tips-blue">库存(742)</span>
                                                              </span>
                  </div>
                  <div class="price">
                      <span class="price-sign">￥</span>
                      <span class="price-num">9.80</span>
                                                      </div>

                                                  <div class="entry notSelection">
                      <span class="l-msg">购买数量：</span>
                      <label class="input">
                          <span class="sub">
                              <svg t="1602946172380" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1676" width="25" height="25"><path d="M874.971429 149.942857C776.228571 54.857143 648.228571 0 512.914286 0S245.942857 54.857143 150.857143 149.942857c-201.142857 201.142857-201.142857 522.971429 0 724.114286C245.942857 969.142857 377.6 1024 512.914286 1024s266.971429-54.857143 362.057143-149.942857c201.142857-201.142857 201.142857-522.971429 0-724.114286m-51.2 672.914286C739.657143 906.971429 629.942857 950.857143 512.914286 950.857143s-226.742857-43.885714-310.857143-128c-171.885714-171.885714-171.885714-449.828571 0-621.714286C286.171429 117.028571 395.885714 73.142857 512.914286 73.142857s226.742857 43.885714 310.857143 128c171.885714 171.885714 171.885714 449.828571 0 621.714286" p-id="1677" fill="#8a8a8a"></path><path d="M772.571429 475.428571H253.257143c-21.942857 0-36.571429 14.628571-36.571429 36.571429 0 10.971429 3.657143 18.285714 10.971429 25.6s14.628571 10.971429 25.6 10.971429H768.914286c21.942857 0 36.571429-14.628571 36.571428-36.571429s-14.628571-36.571429-32.914285-36.571429" p-id="1678" fill="#8a8a8a"></path></svg>
                          </span>
                          <input class="pay-num" name="by_amount" id="orderNumber" required="" lay-verify="required|order_number" type="number" value="1">
                          <span class="add">
                              <svg t="1602946147946" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12364" width="25" height="25"><path d="M874.971429 149.942857C776.228571 54.857143 648.228571 0 512.914286 0S245.942857 54.857143 150.857143 149.942857c-201.142857 201.142857-201.142857 522.971429 0 724.114286C245.942857 969.142857 377.6 1024 512.914286 1024s266.971429-54.857143 362.057143-149.942857c201.142857-201.142857 201.142857-522.971429 0-724.114286m-51.2 672.914286C739.657143 906.971429 629.942857 950.857143 512.914286 950.857143s-226.742857-43.885714-310.857143-128c-171.885714-171.885714-171.885714-449.828571 0-621.714286C286.171429 117.028571 395.885714 73.142857 512.914286 73.142857s226.742857 43.885714 310.857143 128c171.885714 171.885714 171.885714 449.828571 0 621.714286" p-id="12365" fill="#8a8a8a"></path><path d="M549.485714 475.428571V288.914286c0-21.942857-14.628571-36.571429-36.571428-36.571429s-36.571429 14.628571-36.571429 36.571429V475.428571H289.828571c-21.942857 0-36.571429 14.628571-36.571428 36.571429 0 10.971429 3.657143 18.285714 10.971428 25.6s14.628571 10.971429 25.6 10.971429H476.342857v186.514285c0 10.971429 3.657143 18.285714 10.971429 25.6 7.314286 7.314286 14.628571 10.971429 25.6 10.971429 21.942857 0 36.571429-14.628571 36.571428-36.571429V548.571429h186.514286c21.942857 0 36.571429-14.628571 36.571429-36.571429s-14.628571-36.571429-36.571429-36.571429H549.485714z" p-id="12366" fill="#8a8a8a"></path>
                              </svg>
                          </span>
                      </label>
                  </div>
                  <div class="entry">
                      <span class="l-msg">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span>
                      <label class="input">
                          <input type="text" name="email" required="" lay-verify="required|email" placeholder="填写你的邮箱">
                      </label>
                  </div>
                                                      <div class="entry">
                          <span class="l-msg">优&nbsp;&nbsp;惠&nbsp;&nbsp;码：</span>
                          <label class="input">
                              <input type="text" name="coupon_code" placeholder="填写你的优惠码">
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
              <button lay-submit="" lay-filter="postOrder">
                  <span>下单</span>
              </button>
          </div>
        </form>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background-color: #6ea6f5;
  padding: 16px;
  overflow: auto;
  // background-image: url(@/assets/images/login-banner.jpg);
  background-image: url(@/assets/images/bg.jpg);
  background-size: 100% 100%;
}

header {
  // color: #fff;
  color: #1396558a;
  font-weight: bold;

  img {
    width: 50px;
    margin-right: 12px;
  }
}

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
    }
  }

  .title {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    color: #545454;
    margin: 0 20px;
  }

  .main-box .goods-img {
    margin-left: 20px;
    margin-right: 10px;
    margin-top: 10px;
    width: calc(100% - 30px);
    height: 0;
    position: relative;
    padding-bottom: calc(100% - 40px);

    img {
      width: calc(100% - 10px);
      box-shadow: 0 5px 6px 0 rgba(73, 105, 230, .22);
      border-radius: 5px;
      margin-top: 5px;
      /* padding: 5px; */
      height: 100%;
      position: absolute;
      object-fit: cover;
    }
  }

  
 

  .title-2 {
    margin-bottom: 10px;
    color: #545454;
  }
}

</style>
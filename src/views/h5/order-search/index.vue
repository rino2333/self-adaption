<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus"
import { orderDetailApi } from "@/api/h5"

const router = useRouter()

const mobile = ref('')
const getOrderDetail = () => {
  if (!mobile.value) {
    ElMessage.warning('请输入手机号')
    return
  }
  orderDetailApi(mobile.value).then(res => {
    console.log(res);
  })
}
</script>

<template>
  <div class="main-box">
    <div class="pay-title">
        <svg style="margin-bottom: -6px;" t="1603120404646" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1611" width="27" height="27">
            <path d="M320.512 428.032h382.976v61.44H320.512zM320.512 616.448h320.512v61.44H320.512z" fill="#00EAFF" p-id="1612" data-spm-anchor-id="a313x.7781069.0.i3" class="selected"></path>
            <path d="M802.816 937.984H221.184l-40.96-40.96V126.976l40.96-40.96h346.112l26.624 10.24 137.216 117.76 98.304 79.872 15.36 31.744v571.392l-41.984 40.96z m-540.672-81.92h500.736V345.088L677.888 276.48 550.912 167.936H262.144v688.128z" fill="#3C8CE7" p-id="1613" data-spm-anchor-id="a313x.7781069.0.i0" class=""></path>
        </svg>
        订单查询
    </div>
    <div class="layui-card-body">
      <p style="color: #3C8CE7;font-size: 18px;font-weight: 700; text-align: center;margin: 20px 0">
        输入购买时订单
      </p>
      <div class="layui-tab">
        <div class="layui-tab-content" style="text-align: center">
          <!-- 订单号查询 -->
          <div class="layui-tab-item layui-show">
            <input type="hidden" name="_token" value="2eoG3fj5sRrZescaIhC5tRp3hnyqpM3U5mFn91hr">
            <div class="entry">
              <span class="l-msg">联系方式:</span>
              <label class="input">
                <input v-model="mobile" type="text" name="order_sn" lay-verify="required" placeholder="" autocomplete="off">
              </label>
            </div>
            <div class="btn">
              <button @click="getOrderDetail">
                立即查询
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-box {
  margin-top: 20px;
  background: #fff;
  -webkit-box-shadow: 0 7px 29px 0 rgba(18, 52, 91, .11);
  box-shadow: 0 7px 29px 0 rgba(18, 52, 91, .11);
  border-radius: 6px;
  padding-top: 14px;
  padding-bottom: 20px;

  .pay-title {
    color: #737373;
    font-weight: 700;
    font-size: 20px;
    margin: 0 15px;
  }

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

  .btn button {
    border: initial;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    display: inline-block;
    width: 160px;
    line-height: 45px;
    margin-top: 15px;
    border-radius: 100px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    box-shadow: 0 5px 6px 0 rgba(73, 105, 230, .22);
    background-image: linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%);
  }
}

</style>
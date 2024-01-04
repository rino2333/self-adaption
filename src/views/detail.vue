<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { type WareTypeData, type WareTypeTree, treeApi,  } from "@/api/ware-type"
import { type WareData, type WareForm, listApi, addApi, detailApi, deleteApi, editApi } from "@/api/ware"
import { type H5WareType, h5TypeApi, h5WareDetailApi, createOrderApi } from "@/api/h5"

const route = useRoute()
const router = useRouter()

let id = ''
id = route.query.id as string

const wareInfo = ref<WareData>({})
const getDetail = () => {
  if (id) {
    // h5WareDetailApi(route.query.id).then(res => {
    //   console.log(res);
      
    // })
    detailApi(id).then(res => {
      console.log(res);
      wareInfo.value = res.data
    }) 
  }
}
getDetail()

const handleBuy = () => {
  const params = {
    id,
    number: '1'
  }
  createOrderApi(params).then(res => {
    console.log(res);
    
  })
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
                <img class="viewer-pictures" :src="wareInfo.logo" alt="">
            </div>
        </div>
        
        <div class="layui-form layui-form-pane">
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
                        <span class="small-tips tips-blue">库存(742)</span>
                      </span>
                  </div>
                  <div class="price">
                      <span class="price-sign">￥</span>
                      <span class="price-num">{{ wareInfo.amount }}</span>
                  </div>

                  <!-- <el-form>
                    <el-form-item label="">
                      <el-input>购买数量：</el-input>
                    </el-form-item>
                  </el-form> -->
                
                  <div class="pay notSelection">
                    <input type="hidden" name="payway" lay-verify="payway" value="1">
                      <div class="pay-type  pay-select " data-type="zfbf2f" data-id="1" data-name="支付宝当面付">
                        <svg t="1602939269695" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1127" width="32" height="32"><path d="M902.095 652.871l-250.96-84.392s19.287-28.87 39.874-85.472c20.59-56.606 23.539-87.689 23.539-87.689l-162.454-1.339v-55.487l196.739-1.387v-39.227H552.055v-89.29h-96.358v89.294H272.133v39.227l183.564-1.304v59.513h-147.24v31.079h303.064s-3.337 25.223-14.955 56.606c-11.615 31.38-23.58 58.862-23.58 58.862s-142.3-49.804-217.285-49.804c-74.985 0-166.182 30.123-175.024 117.55-8.8 87.383 42.481 134.716 114.728 152.139 72.256 17.513 138.962-0.173 197.04-28.607 58.087-28.391 115.081-92.933 115.081-92.933l292.486 142.041c-11.932 69.3-72.067 119.914-142.387 119.844H266.37c-79.714 0.078-144.392-64.483-144.466-144.194V266.374c-0.074-79.72 64.493-144.399 144.205-144.47h491.519c79.714-0.073 144.396 64.49 144.466 144.203v386.764z m-365.76-48.895s-91.302 115.262-198.879 115.262c-107.623 0-130.218-54.767-130.218-94.155 0-39.34 22.373-82.144 113.943-88.333 91.519-6.18 215.2 67.226 215.2 67.226h-0.047z" fill="#02A9F1" p-id="1128" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path></svg> 支付宝当面付</div>
                  </div>
              </div>
          </div>
          <div class="layui-col-sm12 buy" style="text-align: center">
              <button @click="handleBuy">
                <span>下单</span>
              </button>
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
                      <div style="padding: 0 16px;" v-html="wareInfo.describe"></div>
                        <!-- <p><strong><span class="ne-text" style="font-size: 19px;">NO.1/ 商品介绍</span></strong></p>
<div class="lake-content">
<p id="u69bf8d1c" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;"><strong>默认发：</strong><strong>GPT / 4.0&nbsp; Plus 官网直登账号 </strong><strong>30天&nbsp;</strong></p>
<p class="ne-p" style="margin: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; min-height: 24px; text-align: center;"><strong>约 6-9 人</strong><strong>合租</strong><strong> / 不支持二次分享朋友使用</strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;"><strong>（共用每3小时40条回复/官方限制）</strong></p>
<p class="ne-p" style="margin: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; min-height: 24px; text-align: center;"><span style="color: #e67e23;"><strong>正规充值 / 从未封号 / 封号包赔</strong></span></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;"><span style="color: #e67e23;"><strong>凡人&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;超人</strong></span></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;"><strong>无此功能&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;智能绘画</strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;"><strong>不支持语音&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;谈电子恋爱</strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;"><strong>不能识别图片&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;拍照识图答题</strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;"><strong><span style="font-size: 14pt;"><em>3 . 5</em>&nbsp; &nbsp;<span style="color: #e03e2d;"><span style="color: #e67e23; font-size: 18pt;">V S&nbsp;&nbsp;</span><span style="color: #e67e23; font-size: 18pt;"><span style="color: #e03e2d;">&nbsp;</span></span></span><em>4 . 0</em></span></strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;"><strong>不支持创建AI&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;创建自己的AI</strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;"><strong>去年老旧知识库&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;最新实时知识库</strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;"><strong>基础回复/效果不好&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;学术辅导/商业分析</strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;"><strong>功能</strong><strong>单一</strong><strong> / 毫无新意&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong><strong>模型多元</strong><strong>&nbsp;/ 爱不释手</strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;">&nbsp;</p>
</div>
<div class="lake-content">
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong><span class="ne-text" style="font-size: 19px;">NO.2/&nbsp; 请往下划 /&nbsp;<span style="color: #e67e23;">快捷登入</span></span></strong><strong><span class="ne-text" style="font-size: 19px;">&nbsp;/ 先开梯子</span></strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;">&nbsp;</p>
<h4 class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;"><span style="background-color: #00cbfe;"><strong><a href="https://sat233.com/buy/29" target="_blank" rel="noopener"><span style="color: #ffffff; font-size: 14pt; background-color: #00cbfe;">&nbsp;&gt;点击领取梯子&lt;&nbsp;</span></a></strong></span></h4>
<h4 id="uc1de6d5a" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;">&nbsp;</h4>
<div class="lake-content">
<h4 class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;"><span style="background-color: #00cbfe;"><strong><a href="https://v.douyin.com/i81RsSfc/ " target="_blank" rel="noopener"><span style="color: #ffffff; font-size: 14pt; background-color: #00cbfe;">&nbsp;&gt;观看电子恋爱&lt;&nbsp;</span></a></strong></span></h4>
<h4 id="uc1de6d5a" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;">&nbsp;</h4>
<h4 class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;"><span style="background-color: #2dc26b;"><strong><a href="http://b23.tv/qsmFbVf" target="_blank" rel="noopener"><span style="color: #ffffff; font-size: 14pt; background-color: #2dc26b;">&nbsp;&gt;点击了解工具&lt;&nbsp;</span></a></strong></span></h4>
<h4 id="uc1de6d5a" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;">&nbsp;</h4>
<h4 class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;"><span style="background-color: #2dc26b;"><strong><a href="https://chat.openai.com/auth/login" target="_blank" rel="noopener"><span style="color: #ffffff; font-size: 14pt; background-color: #2dc26b;">&nbsp;&gt;点击进入官网&lt;&nbsp;</span></a></strong></span></h4>
<h4 id="uc1de6d5a" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;">&nbsp;</h4>
<h4 class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;"><span style="background-color: #e67e23;"><strong><a href="https://apps.apple.com/us/app/chatgpt/id6448311069" target="_blank" rel="noopener"><span style="color: #ffffff; font-size: 14pt; background-color: #e67e23;">&nbsp;&gt;苹果点此安装&lt;&nbsp;</span></a></strong></span></h4>
<h4 class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;">&nbsp;</h4>
<h4 class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;"><span style="background-color: #e67e23;"><strong><a href="https://play.google.com/store/apps/details?id=com.openai.chatgpt&amp;pli=1" target="_blank" rel="noopener"><span style="color: #ffffff; font-size: 14pt; background-color: #e67e23;">&nbsp;&gt;安卓点此安装&lt;&nbsp;</span></a></strong></span></h4>
<h4 id="uc1de6d5a" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;">&nbsp;</h4>
<h4 class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;"><strong><span style="background-color: #00cbfe;"><a href="https://play.google.com/store/apps/details?id=com.openai.chatgpt&amp;pli=1" target="_blank" rel="noopener"><span style="color: #ffffff; font-size: 14pt; background-color: #00cbfe;">&nbsp;&gt;安装谷歌商店&lt;&nbsp;</span></a></span></strong></h4>
<h4 id="uc1de6d5a" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;">&nbsp;</h4>
<h4 class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;"><strong><span style="background-color: #00cbfe;"><a href="https://sat233.com/buy/41" target="_blank" rel="noopener"><span style="color: #ffffff; font-size: 14pt; background-color: #00cbfe;">&nbsp;&gt;点击安装插件&lt;&nbsp;</span></a></span></strong></h4>
<h4 id="uc1de6d5a" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;">&nbsp;</h4>
<h4 class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;"><span style="background-color: #2dc26b;"><strong><a href="https://t.me/+MQnfGx8HITAxNTA1" target="_blank" rel="noopener"><span style="color: #ffffff; font-size: 14pt; background-color: #2dc26b;">&nbsp;&gt;点击加入群聊&lt;&nbsp;</span></a></strong></span></h4>
<h4 id="uc1de6d5a" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;">&nbsp;</h4>
<h4 class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;"><span style="background-color: #2dc26b;"><strong><a href="https://www.deeplearning.ai/short-courses/" target="_blank" rel="noopener"><span style="color: #ffffff; font-size: 14pt; background-color: #2dc26b;">&nbsp;&gt;点击官方教程&lt;&nbsp;</span></a></strong></span></h4>
<h4 id="uc1de6d5a" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;">&nbsp;</h4>
<h4 id="uc1de6d5a" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;"><span style="background-color: #2dc26b;"><strong><a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener"><span style="color: #ffffff; font-size: 18.6667px; background-color: #2dc26b;">&nbsp;&gt;点击创建 Api&lt;&nbsp;</span></a></strong></span></h4>
</div>
<div class="lake-content">
<h4 class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: left;">&nbsp;</h4>
</div>
<div class="lake-content">
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;">（小贴士 / 苹果下载需美区ID账号 /安卓下载需谷歌账号和谷歌商店）</p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;">&nbsp;</p>
</div>
<h4 id="uc1de6d5a" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;"><strong><span style="font-size: 12pt;"><a href="https://sat233.com/buy/10" target="_blank" rel="noopener"><span style="color: #ffffff; background-color: #00cbfe;">&nbsp;&gt;点击获取&nbsp;<span style="font-size: 12pt;">Apale ID</span>&nbsp;账号&lt;&nbsp;</span></a></span></strong></h4>
<p>&nbsp;</p>
<h4 id="uc1de6d5a" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px; text-align: center;"><strong><span style="font-size: 12pt;"><a href="https://sat233.com/buy/8" target="_blank" rel="noopener"><span style="color: #ffffff; background-color: #00cbfe;">&nbsp;&gt;点击获取&nbsp; Google&nbsp; 账号&lt;&nbsp;</span></a></span></strong></h4>
<h1 id="ue46e75a0" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong><span class="ne-text" style="font-size: 19px;">NO.3/ 使用过程的常见问题 ?</span></strong></h1>
<p id="u3e84bc94" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;">&nbsp;</p>
<p id="u5d6169db" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong><span class="ne-text" style="font-size: 16px;">A</span><span class="ne-text">：问题：苹果/平板/安卓/等<span style="color: #e67e23;">使用问题</span>&nbsp;？</span></strong></p>
<p id="ua6ef8c07" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong><span class="ne-text" style="font-size: 16px;">B</span><span class="ne-text">：解答：</span></strong><strong>GPT有APP和网页，能上网的设备都可以登入</strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;">&nbsp;</p>
<p id="uc19a8e61" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong><span class="ne-text" style="font-size: 16px;">A</span><span class="ne-text">：问题：PLUS / 多人合租 会不会封号 ？</span></strong></p>
<p id="u14c33621" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong><span class="ne-text" style="font-size: 16px;">B</span><span class="ne-text">：原因：<span style="color: #e67e23;">封号都是因为非正规的黑市渠道充值导致</span></span></strong></p>
<p id="ufd5c42b2" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong><span class="ne-text" style="font-size: 16px;">C</span><span class="ne-text">：解决：我们只做正规充值 从未封号 封号包赔</span></strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;">&nbsp;</p>
<p id="uc19a8e61" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong><span class="ne-text" style="font-size: 16px;">A</span><span class="ne-text">：显示：<span style="color: #e67e23;">登入失败</span>或显示各种奇怪的<span style="color: #e67e23;">英文提示</span>？</span></strong></p>
<p id="u14c33621" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong><span class="ne-text" style="font-size: 16px;">B</span><span class="ne-text">：原因：登入不上基本都是 节点不支持 登入问题</span></strong></p>
<p id="ufd5c42b2" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong><span class="ne-text" style="font-size: 16px;">C</span><span class="ne-text">：解决：开启系统代理&nbsp;<span style="color: #e67e23;">切换节点</span>&nbsp;重启软件登入即可</span></strong></p>
<p id="u73fb4b02" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;">&nbsp;</p>
<p id="u64489181" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong><span class="ne-text" style="font-size: 16px;">A</span><span class="ne-text">：问题：需要魔法吗 /&nbsp;<span style="color: #e67e23;">没有梯子怎么办</span>&nbsp;？</span></strong></p>
<p id="u10688b96" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong><span class="ne-text" style="font-size: 16px;">B</span><span class="ne-text">：回答：GPT属于海外网站，需自主魔法上网能力</span></strong></p>
<p id="u90de1b15" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong>C：解决：不会操作？<span style="color: #ffffff; background-color: #00cbfe;"><a style="color: #ffffff; background-color: #00cbfe;" href="https://sat233.com/buy/24">&nbsp; &gt;点击此处/电脑远程&lt;&nbsp;&nbsp;</a></span>&nbsp;</strong></p>
<p id="uc19a8e61" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;">&nbsp;</p>
<p id="uc2c3f60d" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong>A：问题：为什么要选择我们家 ？</strong></p>
<p id="u16038c5a" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong>B：回答：<span style="color: #e67e23;">同产品我们价格最低，同价位我们服务最棒</span></strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong>C：便捷：<span style="color: #e67e23;">我们提供</span>&nbsp;<span style="color: #2dc26b;">下载 - 安装 - 到使用&nbsp;</span><span style="color: #e67e23;">的全流程</span></strong></p>
<p class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong>D：安全：<span style="color: #e67e23;">正规充值从未封号，人工客服全天在线解答</span></strong></p>
<p id="uc2c3f60d" class="ne-p" style="margin: 0px; padding: 0px; min-height: 24px;"><strong>G：</strong><strong>避坑：<span style="color: #e67e23;">选我们能让你避免 <span style="color: #e03e2d;">封号跑路 / 无人售后</span> 的风险</span></strong></p>
</div> -->
                    </div>
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

      
      .price-sign {
        color: #e4393c;
        font-size: 16px;
      }

      .price-num {
        color: #e4393c;
        font-size: 22px;
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
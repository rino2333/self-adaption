<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { type WareTypeData, type WareTypeTree, treeApi,  } from "@/api/ware-type"
import { type WareData, listApi, addApi, detailApi, deleteApi, editApi } from "@/api/ware"
import { type H5WareType, h5TypeApi, h5WareListApi } from "@/api/h5"

const router = useRouter()

const wareType = ref<H5WareType[]>([])
  h5TypeApi().then(res => {
  wareType.value = res.data
  getWareData(wareType.value[0].id)
})

const wareData = ref<WareData[]>([])
const getWareData = (typeId: string) => {
  // listApi({ typeId }).then(res => {
  //   wareData.value = res.data.records
  // })
  h5WareListApi(typeId).then(res => {
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

    <article>
      <div class="card">
        <div class="card-header">
          <p class="card-title">
            <i class="fa fa-bullhorn"></i>  温馨提示                 
          </p>
          <marquee>请您在下单前仔细阅读商品详情，自行备好科学工具，本站不提供任何VPN、梯子等相关的工具和方法。</marquee>
        </div>
        <div class="card-block">
          <p>免责声明：本站提供的账号资源，且限用来专业知识技能学习、游戏下载、外贸交流、网络营销等，用户若擅自利用本站资源从事任何违反本国（地区）法律法规的活动，由此引起的一切后果与本站无关。
            <b>若本站销售的邮箱账号侵犯了贵司版权,请联系本站微信客服。&nbsp;</b>
          </p>
          <p>
            <b><font color="#c24f4a">&nbsp; &nbsp;GPT客服小哥：create5000</font></b>
          </p>
          <p>
            <b><font color="#c24f4a">&nbsp; &nbsp;GPT客服小妹：Asoul8000</font></b>
          </p>
          <p>
            <b><font color="#c24f4a">&nbsp; &nbsp;人工在线时间：早9:00-凌晨2:00</font></b>
            <br>
          </p>
          <!-- <p>
            <b><a href="https://play.google.com/store/apps/details?id=com.openai.chatgpt&amp;pli=1" target="_blank">点击安装安卓APP</a>&nbsp; &nbsp; &nbsp;<a href="https://apps.apple.com/us/app/chatgpt/id6448311069" target="_blank">点击安装苹果APP</a>&nbsp; &nbsp; &nbsp;<a href="https://chat.openai.com/auth/login" target="_blank">点击跳转官网</a><br></b></p><p>
              <i><font color="#c24f4a">12月13日13:29通知：</font>
                <font color="#000000">付款后请勿切换页面，等待25秒会更新付款状态并自动发货，若仍未发货，请联系本站微信客服，人工在线处理！</font>
              </i>
            </p> -->
        </div>
      </div>
    </article>

    <nav>
      <div class="main-box">
        <div class="title">
          <svg t="1602925747464" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1270" data-spm-anchor-id="a313x.7781069.0.i4" width="20" height="20">
              <path d="M619.52 578.56V808.96h194.56V660.48h-133.12v-81.92h215.04V849.92l-40.96 40.96h-276.48l-40.96-40.96V578.56z" fill="#00EAFF" p-id="1271" data-spm-anchor-id="a313x.7781069.0.i0" class=""></path>
              <path d="M619.52 512V215.04h194.56v172.032h-133.12v81.92h174.08l40.96-40.96V174.08l-40.96-40.96h-276.48l-40.96 40.96v337.92z" fill="#3C8CE7" p-id="1272" data-spm-anchor-id="a313x.7781069.0.i6" class=""></path>
              <path d="M445.44 890.88h-276.48l-40.96-40.96V619.52l40.96-40.96h174.08v81.92h-133.12V808.96h194.56V215.04h-194.56v172.032h133.12v81.92h-174.08l-40.96-40.96V174.08l40.96-40.96h276.48l40.96 40.96v675.84z" fill="#3C8CE7" p-id="1273" data-spm-anchor-id="a313x.7781069.0.i3" class=""></path>
          </svg>
          <span>选择分类</span>
        </div>
        <div class="cate"> 
          <div 
            class="cate-box" 
            :class="{ 'cate-box-select' : activeTab == index + 1 }"
            v-for="(item, index) in wareType"
            @click="changeTab(index + 1, item.id as string)"
          > 
            <div>{{ item.name }}</div> 
            <div class="total">商品数量：{{ item.count }}</div> 
          </div>  
        </div>
        <div class="goods">
          <p class="title">
            <svg t="1602925988984" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1945" width="17" height="17">
                <path d="M803.84 883.712h-163.84v-81.92h133.12l118.784-393.216-178.176 95.232-55.296-15.36L512 240.64 365.568 488.448l-55.296 15.36-178.176-95.232 118.784 393.216h133.12v81.92h-163.84l-38.912-28.672L25.6 336.896l58.368-47.104 230.4 122.88 162.816-272.384h69.632l162.816 272.384 230.4-122.88 58.368 47.104-155.648 518.144z" fill="#3C8CE7" p-id="1946" data-spm-anchor-id="a313x.7781069.0.i17" class=""></path>
                <path d="M305.152 620.544h61.44v61.44h-61.44zM481.28 620.544h61.44v61.44h-61.44zM657.408 620.544h61.44v61.44h-61.44z" fill="#00EAFF" p-id="1947" data-spm-anchor-id="a313x.7781069.0.i14" class=""></path>
            </svg>
            <span>选择商品</span>
          </p>
          <div class="goods-list"> 
            <div 
              class="goods-box" 
              v-for="item in wareData"
              @click="router.push('/detail?id=' + item.id)"
            >  
              <div class="picture">
                <img :src="item.logo" alt="">
              </div>  
              <div class="msg"> 
                <div class="goods-name">{{ item.name }}</div> 
                <div class="goods-price">￥{{ item.amount }}</div> 
                <div class="goods-num"> 
                  <div>
                    <div style="width: 36.99307616221563%;"></div>
                  </div> 
                  <span>剩余{{ item.count }}件</span> 
                </div> 
              </div> 
            </div>  
          </div>
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
    padding: 14px 20px;
  }

  .title {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    color: #545454;
    span {
      margin-left: 6px;
    }
    // margin: 0 20px;
  }

  .cate {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
  }

  .cate-box {
    width: calc(50% - 6px);
    font-size: 12px;
    color: #545454;
    background: #f1f1f1;
    border-radius: 10px;
    padding: 12px 20px 16px;
    cursor: pointer;
    user-select: none;
    margin: 0 6px 10px 0;

    .total {
      color: #999;
    }
  }

  .cate-box-select {
    background-image: linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%);
    -webkit-box-shadow: 0 7px 10px 0 rgba(54, 144, 248, .23);
    box-shadow: 0 7px 10px 0 rgba(54, 144, 248, .23);
    color: #fff;

    .total {
      color: #fff;
    }
  }

  .goods {
    margin: 10px 0;
    border-top: 1px solid #f7f7f7;
    padding-top: 10px;

    .picture {
      vertical-align: top;
      margin-right: 10px;
      display: inline-block;
      min-width: 80px;
      width: 80px;
      height: 80px;

      img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          object-fit: cover;
      }
    }
  }

  .title-2 {
    margin-bottom: 10px;
    color: #545454;
  }

  .goods-box {
    padding: 18px;
    vertical-align: middle;
    // min-width: 185px;
    min-height: 80px;
    background: #fff;
    border: 2px solid #f1f4fb;
    -webkit-box-shadow: 0 4px 10px 0 rgba(135, 142, 154, .14);
    box-shadow: 0 4px 10px 0 rgba(135, 142, 154, .14);
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    user-select: none;
    position: relative;
    display: flex;
  }

  .goods-name {
    margin-bottom: 10px;
    color: #545454;
    font-size: 12px;
    font-weight: 400;
    margin-top: 5px;
  }

  .goods-price {
    color: #3C8CE7;
    font-size: 14px;
    font-weight: 700;
  }

  .goods-num {
    margin-top: 3px;

    div {
      display: inline-block;
      width: 53px;
      height: 5px;
      background: #f3f3f3;
      position: relative;
      border-radius: 3px;

      div {
        display: inline-block;
        position: absolute;
        width: 40%;
        height: 100%;
        background: linear-gradient(55deg, #65d69e, #31dd92);
        border-radius: 3px;
      }
    }

    span {
      color: #0db26a;
      font-size: 12px;
      margin-left: 10px;
      margin-right: 18px;
    }
  }
}

</style>
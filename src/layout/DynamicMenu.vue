<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useRouterStore } from '@/store/routerStore'
import { useUserStore } from '@/store/userStore'
import { UserFilled } from "@element-plus/icons-vue";

const route = useRoute(); 
const router = useRouter(); 
const routerStore = useRouterStore(); 
const userStore = useUserStore(); 

const activeIndex = computed(() => {
  const { meta, path } = route
  // if (meta?.activeMenu) {
  //   return meta.activeMenu
  // }
  return path
})

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  console.log(routerStore.nav);

  router.push(key);

  let selectedNav = routerStore.nav.filter(item => item.path == keyPath[0])[0];
  console.log(selectedNav.children);
  if (selectedNav.children) {
    routerStore.setAside(selectedNav.children);
  }
};

const setNav = () => {
  // setTimeout(() => {
    const nav = [
      { path: '/home', name: '首页' },
      {
        path: '/demo1', 
        name: 'demo1',
        children: [
          {
            path: '/demo1/table',
            name: 'demo1',
            children: [
              {
                path: '/demo1/table/a',
                name: 'demo1-1',
              },
              {
                path: '/demo1/table/b',
                name: 'demo1-2'
              },
              {
                path: '/demo1/table/c',
                name: 'demo1-3'
              },
              {
                path: '/demo1/table/d',
                name: 'demo1-4'
              }
            ]
          },
          {
            path: '/demo1/table2',
            name: '在线课堂'
          },
          {
            path: '/demo1/table3',
            name: '课件学习'
          }
        ]
      },
      {
        path: '/demo2',
        name: 'demo2',
        children: [
          {
            path: '/demo2/table2',
            name: 'demo2'
          }
        ]
      },
      {
        path: '/demo3',
        name: 'demo3',
        children: [
          {
            path: '/demo3/table3',
            name: 'demo3'
          }
        ]
      },
      {
        path: '/demo4',
        name: 'demo4',
        children: [
          {
            path: '/demo4/table4',
            name: 'demo4'
          }
        ]
      }
    ];
    // routerStore.setNav(nav);
  // }, 9000);
}
// setNav();

const logout = () => {
  routerStore.logout();
  // router.push("/login");
  // localStorage.clear();
  // routerStore.setNav([]);
};
</script>

<template>
  <header>
    <div class="logo">
      <img src="/123.jpg" alt="">
      继续教育
    </div>

    <!-- <div class="nav">
      <div
        v-for="(item, index) in routerStore.nav" 
        :key="index"
        class="nav-item"
        :class="{ active: routerStore.currentNav == item.path }"
      >
        {{ item.name }}
      </div>
    </div> -->
    <!-- <el-menu
      :default-active="routerStore.currentNav"
      class="el-menu"
      mode="horizontal"
      router
      @select="handleSelect"
    >
      <el-menu-item 
        v-for="(item, index) in routerStore.nav" 
        :key="index" 
        :index="item.path"
      >
        {{ item.name }}
      </el-menu-item>
    </el-menu> -->

    <el-dropdown class="right-menu-item">
      <div class="right-menu-avatar">
        <el-avatar :icon="UserFilled" :size="30" />
        <span>{{ userStore.name }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <span>
            <el-dropdown-item>个人中心</el-dropdown-item>
          </span>
          <span>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </span>
          <el-dropdown-item divided @click="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>
   
</template>

<style scoped lang='scss'>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // font-size: 1.4em;

  .nav {
    flex: 1;
    display: flex;
    height: 100%;

    .nav-item {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0 2em;
      cursor: pointer;

      &:hover {
        color: var(--el-menu-active-color);
        background-color: var(--el-menu-hover-bg-color);
      }
    }

    .active {
      color: var(--el-menu-active-color);
      background-color: var(--el-menu-hover-bg-color);
    }
  }

  .right-menu-item {
    padding: 0 1em;
    cursor: pointer;
    .right-menu-avatar {
      display: flex;
      align-items: center;
      outline: none;
      .el-avatar {
        margin-right: 1em;
      }
      span {
        font-size: 1.6em;
      }
    }
  }
}
.logo {
  display: flex;
  align-items: center;
  font-size: 2.2em;
  min-width: 9.1em;
  height: 2.72em;
  font-weight: bold;

  img {
    width: 2.72em;
    height: 2.72em;
    padding: .27em;
  }
}

.flex-grow {
  flex-grow: 1;
}

// .el-menu {
//   :deep(.is-active) {
//     border-bottom: none;
//   }
// }
</style>
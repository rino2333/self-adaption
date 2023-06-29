import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../router";

export interface Nav {
  path?: string;
  url?: string;
  name: string;
  isEnabled?: number;
  code?: string;
  component?: any;
  children?: Nav[];
}

// export const useRouterStore = defineStore('routerStore', {
//   state: () => {
//     return {
//       nav: [] as Nav[],
//       asideMenu: [] as Nav[],
//       currentNav: ''
//     }
//   },
//   getters: {

//   },
//   actions: {
//     setNav(nav: Nav[]) {
//       this.nav = nav;
//     },
//     setAside(asideMenu: Nav[]) {
//       this.asideMenu = asideMenu;
//     },
//     setCurrentNav(path: string) {
//       this.currentNav = path;
//     }
//   }
// })

export const useRouterStore = defineStore('routerStore', () => {
  const nav = ref<Nav[]>([]);
  const asideMenu = ref<Nav[]>([]);
  const currentNav = ref<string>();

  const setNav = (params: Nav[]) => {
    nav.value = params;
  };
  const setAside = (params: Nav[]) => {
    asideMenu.value = params;
  };
  
  const logout = () => {
    router.push("/login");
    localStorage.clear();
    setNav([]);
  };

  return {
    nav,
    asideMenu,
    currentNav,
    setNav,
    setAside,
    logout
  }
}, {
  persist: { // 持久化存储的方式
    enabled: true,
    strategies: [
      {
        //key的名称
        // key: 'my_user',
        //更改默认存储，我更改为localStorage
        storage: localStorage,
        // 可以选择哪些进入local存储，这样就不用全部都进去存储了
        // paths 默认是全部进去存储  ['想让哪个存储写哪个的可以']
        // paths: ['list']
      }
    ]
  }
})
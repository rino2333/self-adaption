import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist' // 持久化存储插件
const pinia = createPinia() 
pinia.use(piniaPluginPersist) 

export default pinia;
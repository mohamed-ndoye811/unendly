import { createApp } from 'vue'
import { createPinia } from 'pinia'
import localforage from 'localforage'

import '@assets/scss/main.scss';

import App from './App.vue'
import router from './router'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

// const installPersistedStatePlugin = createPersistedStatePlugin()
const app = createApp(App)
const pinia = createPinia()

const installPersistedStatePlugin = createPersistedStatePlugin()
pinia.use((context) => installPersistedStatePlugin(context))

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'localforage',
  storeName: 'unendly'
})

pinia.use(
  createPersistedStatePlugin({
    storage: {
      getItem: async (key) => {
        return await localforage.getItem(key)
      },
      setItem: async (key, value) => {
        return await localforage.setItem(key, value)
      },
      removeItem: async (key) => {
        return await localforage.removeItem(key)
      }
    }
  })
)

app.use(pinia)
// app.use(localforage)
app.use(router)

app.mount('#app')

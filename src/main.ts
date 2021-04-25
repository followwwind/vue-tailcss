import { createApp} from 'vue'
import App from './App.vue'
import 'element-plus/lib/theme-chalk/index.css';
import './assets/main.css'
import router from './router'
// import { setupProdMockServer } from './plugins/mockServer';


// Vue.use(notifyMessage.register)

// dev mock server
if (process.env.NODE_ENV != 'production') {
    // setupProdMockServer();
}

let app = createApp(App)
app.use(router).mount('#app')

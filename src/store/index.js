import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import user_store from './modules/user_store'
import global_store from './modules/global_store'


export default new vuex.Store({//store对象
    modules:{
        user:user_store,
        global:global_store
    }
  })
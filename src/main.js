/**
 * Created by Administrator on 2017/8/11.
 * @author yangkun
 */
// var Hello = require('./modules/hello');
// document.write(Hello);

import Vue from 'vue';
import Mountain from "./components/mountains.vue";
new Vue({
    el:'#app',
    components:{
        Mountain
    }
})
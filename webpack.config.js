/**
 * Created by Administrator on 2017/8/11.
 * @author yangkun
 */
//# 根目录新建webpack.config.js(webpack 会自动寻找一个叫webpack.config.js的文件去执行)
var path = require('path');
var fs= require('fs');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // entry:顾名思义入口文件,src/main.js,输入名字为 src.js
    entry:{
        app:["webpack-hot-middleware/client?noInfo=true&reload=true","./src/main.js"]
    },
    output:{
        path:path.resolve(__dirname, "./output/static"),//输出路径
        publicPath:"/",//调试或者 CDN 之类的域名,稍候会用到
        filename:"[name].js"//配置生成的文件名
    },
    resolve:{
        alias: {
            'vue': 'vue/dist/vue.js'//可以直接配置缩写 类似 require("vue")
        },
        modules: [path.resolve(__dirname, "src"), "node_modules"],//模块从里开始查找
        extensions:[".json",".js",".vue"]//模块后缀名，先这么些，稍候会用到
    },
    module:{
        //模块加载器
        loaders:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },{
                test:/\.js$/,
                loader:'babel',
                query:{
                    presets:['es2015']
                },
                include:'/',
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        // 优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurrenceOrderPlugin(),
        //插件热更新
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        //自动生成html
        new HtmlWebpackPlugin({
            filename: 'index.html',//也没什么说的，生成 html 文件的文件名。默认为 index.html.
            //渲染输出html文件名,路径相对于 output.path 的值
            template: path.resolve(__dirname, './src/views/index.html'),
            //渲染源模版文件
            inject: true
            //这个东西非常重要，true: 自动写入依赖文件; false: 不写入依赖，构建多页面非常有用
        }),
        new webpack.ProvidePlugin({//输出全局变量
            $: "jquery"
        })
      /*  ,
        // 去除代码块内的告警语句
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })*/
    ]
}
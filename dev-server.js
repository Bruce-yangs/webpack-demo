/**
 * Created by Administrator on 2017/8/11.
 * @author yangkun
 */
//启动一个http服务
var express = require('express');
var opn = require('opn')
var app = express();
var port = process.env.PORT || 3000;
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

// 获取配置
// var config = require('./config');

//用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为false
// var autoOpenBrowser = !!config.dev.autoOpenBrowser;

var uri = 'http://localhost:' + port;
var devClient = './dev-client';
Object.keys(webpackConfig.entry).forEach(function (name, i) {
    var extras = [devClient]
    webpackConfig.entry[name] = extras.concat(webpackConfig.entry[name])
})

//调用配置,生成 compiler instance
var compiler = webpack(webpackConfig);


//这里是重点，使用 webpack-dev-middleware 插件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

// 如果Node的环境变量中没有设置当前的环境（NODE_ENV），则使用config中的配置作为当前的环境
/*if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}*/


/*var hotMiddleware = require('webpack-hot-middleware')(compiler);

// 监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件 reload,这个事件会在dev-client.js中接受到，然后刷新
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})*/


// 注册中间件
app.use(devMiddleware);
app.use(require("webpack-hot-middleware")(compiler));

// 使用静态资源
app.use(express.static(__dirname + '/'));
// app.get('/', function (req, res) {
//     res.send('Hello World111111!');
// });
module.exports = app.listen(port,function (err) {
    // if(err){
    //     throw err;
    // }
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:'+port+'\n');


    // 如果符合自动打开浏览器的条件，则通过opn插件调用系统默认浏览器打开对应的地址uri
    // if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    if ( process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }


});

/*
*
 # 执行命令  npm i express --save-dev
 # 安装完成 执行命令: node dev-server.js
 # Listening at http://localhost:3000
 # 服务正常启动,chrome浏览器输入  http://localhost:3000/src/views/index.html
* */
/*
var express = require('express');
var app = express();
//
app.get('/', function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
*/

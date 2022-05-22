
import webpack, { Configuration } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { ConfigInit } from './web/webpack.web'
import { merge } from 'webpack-merge'

const openBrowser = require('./util/openBrowser')

// 开发环境的配置文件
const config:Configuration = merge(ConfigInit('development'), {
  output: {
    library: 'subject1-[name]',
    libraryTarget: 'umd'
  }
})

const host:string = '127.0.0.1'
const port:string = '10087'

const devserver = new WebpackDevServer({
  headers: { 'Access-Control-Allow-Origin': '*' },
  hot: true, // 热更新
  host: host, // 地址
  port: port, // 端口
  // open: true, // 关闭
  setupExitSignals: true,
  compress: true
}, webpack(config))

devserver.start().then(() => {
  // 启动界面
  openBrowser(`http://${host}:${port}`)
})
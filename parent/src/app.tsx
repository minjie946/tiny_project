import React, { useEffect } from 'react'
import { registerMicroApps, start } from 'qiankun'
import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './page/home'
import QiankunPage from './page/qiankun'

export function hashPrefix (prefix:string) {
  if (!prefix || prefix === '') {
    return () => true
  }
  return function (location:any) {
    // 使用的hash的形式对路由进行加载，前面会存在#所以替换之后，对路径进行判断，是相应的路径就返回ture
    const path:string = location.hash.replace('#', '')
    return prefix === path || path.includes(prefix + '/')
  }
}

const qiankunProject = [
  {
    name: 'react app1', // app name registered
    entry: 'http://localhost:10087', // 子项目对应的地址， 打包之后存放对应的网址
    container: '#sub-container', // 容器的ID（qiankun.tsx界面中生命的）
    activeRule: hashPrefix(`/app1`) // 判断是否加载
  },
  {
    name: 'react app2', // app name registered
    entry: 'http://localhost:10088',
    container: '#sub-container',
    activeRule: hashPrefix(`/app2`)
  }
]

export default () => {
  useEffect(() => {
    registerMicroApps(qiankunProject, {
      beforeLoad: async app => console.info(`[${app.name}]:before load`),
      beforeMount: [async app => console.info(`[${app.name}]:before mount`)],
      afterMount: async app => console.info(`[${app.name}]:after mount`),
      beforeUnmount: async app => console.info(`[${app.name}]:before unmount`),
      afterUnmount: async app => console.info(`[${app.name}]:after unmount`)
    })
    start()
  }, [])


  return <HashRouter>
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path='app1' element={<QiankunPage />} />
        <Route path='app2' element={<QiankunPage />} />
      </Route>
    </Routes>
  </HashRouter>
}

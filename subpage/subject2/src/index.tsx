import React from 'react';
import { createRoot, Root } from 'react-dom/client'
import App from './app'
import '../statics/public-path'

/** 不是qiankun 聚合的时候进行的加载 */
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({})
}

let root:Root

/** 根据参数判断从哪儿获取值 */
function render (props:any) {
  const { container } = props
  const dom = container ? container.querySelector('#root') : document.getElementById('root')
  root = createRoot(dom)
  root.render(<App/>)
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap(props:any) {
  console.log('react app bootstraped')
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount (props:any) {
  render(props)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount (props:any) {
  root.unmount()
}

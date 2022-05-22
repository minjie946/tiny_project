import React, { useState, useEffect } from 'react'
import { Row, Col, Layout, Button } from 'antd'
import { loadMicroApp, MicroApp, prefetchApps } from 'qiankun'
const { Content, Sider, Header } = Layout

const qiankunProject = [
  {
    name: 'react app1', // app name registered
    entry: 'http://localhost:10087', // 子项目对应的地址， 打包之后存放对应的网址
    container: '#sub-container' // 容器的ID（qiankun.tsx界面中生命的）
  },
  {
    name: 'react app2', // app name registered
    entry: 'http://localhost:10088',
    container: '#sub-container'
  }
]

export default () => {
  useEffect(() => {
    prefetchApps(qiankunProject)
  }, [])

  /** 存放对应的子项目的对象 */
  const [microAppAry, setMicroAppAry] = useState<Array<MicroApp>>([])
  /** 存放当前的子项目的下标 */
  const [index, setIndex] = useState<number>(0)

  const onChangeProject = (num:number) => {
    if (microAppAry[index]) { // 注销上一次加载的项目
      microAppAry[index].unmount()
    }
    microAppAry[num] = loadMicroApp(qiankunProject[num])
    setMicroAppAry(microAppAry)
    setIndex(num) // 设置当前的项目的下标
  }

  return <Layout style={{ height: '100%' }}>
    <Header style={{ color: '#fff' }}>顶部的</Header>
    <Layout>
      <Sider theme='light'>
        <Row>
          <Col span={24}>
            <Button onClick={() => onChangeProject(0)}>项目1</Button>
          </Col>
          <Col span={24}>
          <Button onClick={() => onChangeProject(1)}>项目2</Button>
          </Col>
        </Row>
      </Sider>
      <Content>
        <div id='sub-container'>子项目的容器</div>
      </Content>
    </Layout>
  </Layout>
}

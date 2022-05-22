import React, { useEffect } from 'react'
import { Row, Col, Layout } from 'antd'
import { Link, Outlet } from 'react-router-dom'

const { Content, Sider, Header } = Layout

export default () => {
  useEffect(() => {
  }, [])

  return <Layout style={{ height: '100%' }}>
    <Header style={{ color: '#fff' }}>顶部的</Header>
    <Layout>
      <Sider theme='light'>
        <Row>
          <Col span={24}>
            <Link to='app1'>项目1</Link>
          </Col>
          <Col span={24}>
            <Link to='app2'>项目2</Link>
          </Col>
        </Row>
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
}

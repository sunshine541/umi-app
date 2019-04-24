/**
 * 主内容块
 * 用于存放各tab
 */
import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;
class Container extends React.Component {
  render() {
    return (
      <Layout>
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

export default Container;
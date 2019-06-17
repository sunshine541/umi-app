/*
 * @Author: Fus
 * @Date:   2019-05-24 11:58:17
 * @Last Modified by: Fus
 * @Last Modified time: 2019-06-17 16:39:20
 * @Desc: 页面入口容器
 */
import React from 'react';
import MainLayout from '../layouts/MainLayout';

class IndexPage extends React.Component {
  render() {
    return (
      <MainLayout {...this.props} />
    );
  }
};

export default IndexPage;

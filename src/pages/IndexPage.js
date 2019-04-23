/**
 * 页面入口容器
 */
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import MainBoard from '../components/MainBoard/MainBoard';

class IndexPage extends React.Component {
  render() {
    return (
      <MainLayout>
        <MainBoard />
      </MainLayout>
    );
  }
};


export default IndexPage;

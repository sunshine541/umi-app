import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Home from '../components/Home/Home';

class IndexPage extends React.Component {
  render() {
    return (
      <MainLayout>
        <Home />
      </MainLayout>
    );
  }
};


export default IndexPage;

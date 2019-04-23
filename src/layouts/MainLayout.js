/**
 * 主体layout
 * 包括Header/Sidebar/Footer
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import Locale from './Locale';
import BasicHeader from './BasicHeader';
import Sidebar from './Sidebar';
import Container from './Container';
import TabContainer from './TabContainer';
import styles from './MainLayout.less';

@connect(state => ({
  theme: state.global.theme,
}))
class MainLayout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { theme } = this.props;
    const wrapCls = `theme-${theme}`;
    return (
      <Locale>
        <div className={styles[wrapCls]}>
          <Layout className={styles.layoutWrap}>
            <BasicHeader />
            <Layout>
              <Sidebar />
              <Container>
                <TabContainer>
                  {this.props.children}
                </TabContainer>
              </Container>
            </Layout>
          </Layout>
        </div>  
      </Locale>
     )
  }
}

export default MainLayout;

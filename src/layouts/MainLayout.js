/*
 * @Author: Fus
 * @Date:   2019-04-24 14:16:46
 * @Last Modified by: Fus
 * @Last Modified time: 2019-06-17 16:37:15
 * @Desc: 主体layout 包括Header/Sidebar/Footer
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import classNames from 'classnames';
import Locale from './Locale/Locale';
import BasicHeader from './BasicHeader/BasicHeader';
import Sidebar from './Sidebar/Sidebar';
import TabContainer from './TabContainer/TabContainer';
import { BaseContext } from '../constants/global';
import themes from '../themes';
import styles from './MainLayout.less';

const { Content } = Layout;
@connect(state => ({
  theme: state.global.theme,
  langLib: state.global.langLib,
}))
class MainLayout extends Component {
  render() {
    const { theme, dispatch, langLib } = this.props;
    const activeTheme = themes[theme];
    const wrapCls = `theme-${theme}`;
    const contentWrapCls = classNames({
      [styles.wrap]: true,
      mainLayout: true,
    });
    return (
      <BaseContext.Provider value={{ langLib, theme, dispatch }}>
        <Locale>
          <Layout className={activeTheme[wrapCls]}>
            <Sidebar />
            <Layout className={contentWrapCls}>
              <BasicHeader />
              <Content>
                <TabContainer />
              </Content>
            </Layout>
          </Layout>
        </Locale>
      </BaseContext.Provider>
     );
  }
}

export default MainLayout;

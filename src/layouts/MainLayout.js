/*
 * @Author: Fus
 * @Date:   2019-04-24 14:16:46
 * @Last Modified by: Fus
 * @Last Modified time: 2019-06-17 14:54:11
 * @Desc: 主体layout 包括Header/Sidebar/Footer
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import classNames from 'classnames';
import Locale from './Locale';
import BasicHeader from './BasicHeader';
import Sidebar from './Sidebar';
import Container from './Container';
import TabContainer from './TabContainer';
import { BaseContext } from '../constants/global';
import styles from './MainLayout.less';
import defaultStyle from '../styles/themes/default.less';
import redStyle from '../styles/themes/red.less';

const themeStyle = {
  red: redStyle,
  default: defaultStyle,
};
@connect(state => ({
  theme: state.global.theme,
  localLangLib: state.global.localLangLib,
}))
class MainLayout extends Component {
  render() {
    const { theme, dispatch, localLangLib } = this.props;
    const wrapCls = `theme-${theme}`;
    const contentWrapCls = classNames({
      [styles.wrap]: true,
      mainLayout: true,
    });
    return (
      <Locale>
        <BaseContext.Provider value={{ localLangLib, theme, dispatch }}>
          <div className={themeStyle[theme][wrapCls]}>
            <Layout className={contentWrapCls}>
              <Sidebar />
              <Layout>
                <BasicHeader />
                <Container>
                  <TabContainer>
                    {this.props.children}
                  </TabContainer>
                </Container>
              </Layout>
            </Layout>
          </div>
        </BaseContext.Provider>
      </Locale>
     );
  }
}

export default MainLayout;

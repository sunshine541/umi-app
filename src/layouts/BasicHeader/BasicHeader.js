/*
 * @Author: Fus
 * @Date:   2019-04-24 14:16:13
 * @Last Modified by: Fus
 * @Last Modified time: 2019-06-17 16:42:42
 * @Desc: 头部模块
 *      包含：logo、顶部菜单、个人中心等
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { BaseContext } from '../../constants/global';
import styles from './BasicHeader.less';

const { Header } = Layout;
class BasicHeader extends React.Component {
  static contextType = BaseContext
  // 切换主题
  changeTheme = () => {
    this.context.dispatch({
      type: 'global/updateTheme',
      payload: {
        theme: 'red',
      },
    });
  }
  // 切换语言
  changeLang = () => {
    this.context.dispatch({
      type: 'global/updateLang',
      payload: {
        lang: 'en',
      },
    });
  }
  render() {
    return (
      <Header className={styles.wrap}>
        <a onClick={this.changeTheme}>切换主题</a>
        <a onClick={this.changeLang}>切换语言</a>
      </Header>
    );
  }
};

export default BasicHeader;

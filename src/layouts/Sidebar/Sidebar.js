/*
 * @Author: Fus
 * @Date:   2019-04-24 14:16:58
 * @Last Modified by: Fus
 * @Last Modified time: 2019-06-17 16:34:58
 * @Desc: 侧边栏
 */
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import { BaseContext } from '../../constants/global';
import styles from './Sidebar.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

const mockData = [{
  tabKey: 'sub1',
  level: 1,
  title: '菜单1',
  icon: 'user',
  children: [{
    tabKey: 'AboutMeList-1',
    comKey: 'AboutMeList',
    title: '全部',
    level: 2,
    data: {
      pageType: 'all',
    },
  }, {
    tabKey: 'AboutMeList-2',
    comKey: 'AboutMeList',
    title: '菜单二',
    level: 2,
    data: {
      pageType: 'all',
    },
  }],
}];
@connect(state => ({ global: state.global  }))
class Sidebar extends React.Component {
  static contextType = BaseContext
  state = {
    showCompany: true,
    openKeys: ['sub1'], // 已经打开的菜单栏
  }
  rootSubmenuKeys = ['sub1']; // 一级菜单
  // 点击增加tab
  addTab = (e) => {
    const { config = {} } = e.item.props;
    this.context.dispatch({
      type: 'tabs/addTab',
      payload: { ...config },
    });
  }
  // 打开菜单
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !this.state.openKeys.includes(key));
    if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
      this.setState({ openKeys });
    } else {
      this.setState({ openKeys: latestOpenKey ? [latestOpenKey] : []  });
    }
  }
  // 选中菜单
  onSelectMenu = ({ item, key, selectedKeys }) => {
    // 当选中的菜单为第一级，且无子级时，关闭其他第一级的菜单
    const { level } = item.props;
    if (level === 1) this.setState({ openKeys: selectedKeys });
  }
  // 折叠sidebar
  handleCollapse = () => {
    const { showCompany } = this.state;
    const { showSidebar } = this.props.global;
    this.context.dispatch({
      type: 'global/updateShowSidebar',
      payload: { showSidebar: !showSidebar  },
    });
    this.setState({ showCompany: !showCompany  });
  }
  render() {
    const { showCompany, openKeys } = this.state;
    const { showSidebar } = this.props.global;
    // 生成菜单节点
    const loopMenu = (data) => {
      return data.map(item => {
        if (item.children) {
          return (
            <SubMenu
              key={item.tabKey}
              level={item.level}
              title={item.icon ? <span><Icon type={item.icon} /><span>{item.title}</span></span> : item.title}
            >
              {item.children && loopMenu(item.children)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item
              config={item}
              title={item.title}
              onClick={this.addTab}
            >
              <span><Icon type={item.icon} /><span>{item.title}</span></span>
            </Menu.Item>
          );
        }
      });

    };
    return (
      <Fragment>
        <Sider
          className={`${styles.sideWrap} sidebar-wrap`}
          collapsed={!showSidebar}
          collapsible
          onCollapse={this.handleCollapse}
        >
          <div className={styles.logoWrap}>
            <Icon type="chrome" className={styles.logo} />
            {showCompany && <span className={styles.companyName}>
              <FormattedMessage id="system.company.name" />
            </span>}
          </div>
          <Menu
            mode={showSidebar ? 'inline' : 'vertical'}
            theme="dark"
            openKeys={openKeys}
            // openKeys={showSidebar ? openKeys : []}
            onOpenChange={this.onOpenChange}
            onSelect={this.onSelectMenu}
            style={{ height: '100%', borderRight: 0 }}
            className={`custom-sidebar-menu ${styles.menuWrap}`}
          >
            {mockData && loopMenu(mockData)}
          </Menu>
        </Sider>
      </Fragment>
    );
  }
};

export default Sidebar;

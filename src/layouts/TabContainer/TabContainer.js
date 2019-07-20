/*
 * @Author: Fus
 * @Date:   2019-05-24 11:57:34
 * @Last Modified by: Fus
 * @Last Modified time: 2019-06-17 16:16:37
 * @Desc: tab的容器
 */
import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import classNames from 'classnames';
import Test from '@/components/Test/Test';
import { BaseContext } from '@/constants/global';
import styles from './TabContainer.less';

const { TabPane } = Tabs;

@connect(state => ({
  tabs: state.tabs,
}))
class TabContainer extends React.Component {
  static contextType = BaseContext
  state = {
  }
  onChange = (activeTabKey) => {
    this.context.dispatch({
      type: 'tabs/setActiveTabKey',
      payload: {
        activeTabKey,
      },
    });
  }
  onEdit = (targetKey, action) => {
    // 关闭tab
    if (action === 'remove') {
      this.removeTab(targetKey);
    }
  }
  // 根据comKey获取tab内容组件
  getTabContentComponnet = (comKey) => {
    const baseProps = {
    };
    switch (comKey) {
      default: return <Test />;
    }
  }
  removeTab = (tabKey) => {
    this.context.dispatch({
      type: 'tabs/removeTab',
      payload: {
        tabKey,
      },
    });
  }
  handleRefresh = ({ tabKey }) => {
    this.context.dispatch({
      type: 'tabs/updateTabInfo',
      payload: {
        tabKey,
        isRefreshing: true,
      },
    });
  }
  render() {
    const { openedTabs, activeTabKey } = this.props.tabs;
    return (
      <Tabs
        hideAdd
        onChange={this.onChange}
        activeKey={activeTabKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {openedTabs.map(tab => (
          <TabPane
            tab={
              <span
                title={tab.title}
                className="tab-text-ellipsis"
              >
                {tab.title_icon && tab.title_icon}
                {tab.title}
              </span>
            }
            key={tab.tabKey}
            closable={tab.closable}
          >
            {!tab.isRefreshing && this.getTabContentComponnet(tab.comKey)}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

export default TabContainer;
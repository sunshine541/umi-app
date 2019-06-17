/**
 * tab的容器
 */
import React from 'react';
import { connect } from 'dva';
import { Tabs, Button } from 'antd';
import CreateFlow from '../components/CreateFlow/CreateFlow';
import FlowList from '../components/FlowList/FlowList';
import MainBoard from '../components/MainBoard/MainBoard';

const { TabPane } = Tabs;

@connect(state => ({
  tabs: state.tabs,
}))
class TabContainer extends React.Component {
  state = {
  }
  onChange = (activeTabKey) => {
    this.props.dispatch({
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
  // 根据key获取tab内容组件
  getTabContentComponnet = (comKey) => {
    console.log(comKey, 'aaa');
    switch (comKey) {
      case 'CreateFlow': return <CreateFlow />;
      case 'FlowList': return <FlowList />;
      case 'MainBoard': return <MainBoard />;
      default: return <CreateFlow />;
    }
  }
  addTab = () => {
    this.props.dispatch({
      type: 'tabs/addTab',
      payload: {
        id: new Date().getTime(),
        title: `name-${new Date().getTime()}`,
      },
    });
  }
  removeTab = (tabKey) => {
    this.props.dispatch({
      type: 'tabs/removeTab',
      payload: {
        tabKey,
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
        {openedTabs.map(pane => <TabPane tab={pane.title} key={`${pane.tabKey}`} closable={pane.closable}>{this.getTabContentComponnet(pane.comKey)}</TabPane>)}
      </Tabs>
    );
  }
}

export default TabContainer;
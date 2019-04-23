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
    activeKey: 1,
  }
  onChange = (activeKey) => {
    this.setState({ activeKey })
  }
  onEdit = (targetKey, action) => {
    // 关闭tag
    if (action === 'remove') {
      this.removeTag(Number(targetKey));
    }
  }
  // 根据key获取tab内容组件
  getTabContentComponnet = (key) => {
    switch(key) {
      case 'CreateFlow': return <CreateFlow />;
      case 'FlowList': return <FlowList />;
      case 'MainBoard': return <MainBoard />
      default: return <CreateFlow />
    }
  }
  addTag = () => {
    this.props.dispatch({
      type: 'tabs/addTag',
      payload: {
        id: new Date().getTime(),
        title: `name-${new Date().getTime()}`
      }
    })
  }
  removeTag = (id) => {
    console.log(id, 'aaa')
    const { openedTabs } = this.props.tabs;
    this.props.dispatch({
      type: 'tabs/removeTag',
      payload: {
        id,
      }
    })
  }
  render() {
    const { openedTabs } = this.props.tabs;
    const { activeKey } = this.state;
    return (
      <Tabs
        hideAdd
        onChange={this.onChange}
        activeKey={`${activeKey}`}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {openedTabs.map(pane => <TabPane tab={pane.title} key={`${pane.id}`} closable={pane.closable}>{this.getTabContentComponnet(pane.key)}</TabPane>)}
      </Tabs>
    );
  }
}

export default TabContainer;
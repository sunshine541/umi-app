/**
 * 侧边栏
 */
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import styles from './Sidebar.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends React.Component {
  handleClick = () => {

  }
  render() {
    return (
      <Sider className={styles.wrap} collapsible>
        <div className={styles.logoWrap}>
          <img src="" alt="logo" />
        </div>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" title={<span><Icon type="user" /><span>subnav 1</span></span>}>
            <Menu.Item key="1" onClick={() => this.handleClick()}>option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="laptop" /><span>subnav 2</span></span>}>
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="notification" /><span>subnav 3</span></span>}>
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
};

export default Sidebar;

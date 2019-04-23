/**
 * 头部模块
 * 包含：logo、顶部菜单、个人中心等
 */
import { Layout, Menu } from 'antd';

const { Header } = Layout;
const MenuItem = Menu.Item;
const BasicHeader = () => {
  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <MenuItem key="1">nav 1</MenuItem>
        <MenuItem key="2">nav 2</MenuItem>
        <MenuItem key="3">nav 3</MenuItem>
      </Menu>
    </Header>
  )
};

export default BasicHeader;

/*
 * @Author: Fus
 * @Date:   2019-04-24 14:13:35
 * @Last Modified by: Fus
 * @Last Modified time: 2019-06-17 16:44:07
 * @Desc: 对标签页的数据状态存储
 *   规则：
 *      1. tabKey规则：以组件名为key，若有多个同一组件的tab，每个key后面加【-id】，如流程A的tab为CreateFlow-1,流程B的tab为CreateFlow-2;
 */
import { FormattedMessage } from 'react-intl';
import { Icon } from 'antd';

 // tab的默认配置
const initTabConfig = {
  tabKey: '', // tab的唯一标识符
  comKey: '', // 该tab引用的组件
  // id: '', // 该tab的具体id（如，申请模板的flowLineId是1）,允许为空
  title: '',
  title_icon: '', // tab上的小图标
  closable: true,
  isRefreshing: false, // 是否在刷新中
  data: {},
};
export default {
  state: {
    openedTabs: [
      // {
      //   tabKey: 'MainBoard',
      //   comKey: 'MainBoard',
      //   id: '',
      //   title_icon: <Icon type="home" />,
      //   title: '系统首页',
      //   closable: false,
      //   isRefreshing: false,
      // }, {
      //   tabKey: 'TemplateConfig-1',
      //   comKey: 'TemplateConfig',
      //   id: '1',
      //   title: '申请模板',
      //   closable: true,
      //   isRefreshing: false,
      // },
    ], // 已经打开的tab
    activeTabKey: 'MainBoard', // 当前打开的tab tabKey
    activeTabData: {}, // 当前存放在tab上的数据
  },
  subscriptions: {},
  effects: {},
  reducers: {
    // 修改tab内状态
    updateTabInfo(state, { payload }) {
      const { openedTabs } = state;
      const { tabKey } = payload;
      const activeTab = openedTabs.find(item => item.tabKey === tabKey) || {};
      const activeTabIndex = openedTabs.findIndex(item => item.tabKey === tabKey);
      const newActiveTabData = {
        ...activeTab,
        ...payload,
      };
      const newOpenedTabs = [...openedTabs];
      // 区分【删除tab】情况下
      if (activeTabIndex !== -1) newOpenedTabs.splice(activeTabIndex, 1, newActiveTabData);
      return {
        ...state,
        openedTabs: newOpenedTabs,
        activeTabData: newActiveTabData,
      };
    },
    // 切换tab
    setActiveTabKey(state, { payload }) {
      const { activeTabKey } = payload;
      const { openedTabs } = state;
      const activeTabData = openedTabs.find(item => item.tabKey === activeTabKey) || {};
      return {
        ...state,
        activeTabKey,
        activeTabData,
      };
    },
    // 增加tab
    addTab(state, { payload }) {
      const { openedTabs } = state;
      const { tabKey } = payload;
      // 要增加的tab已经打开则切换到当前tab
      if (openedTabs.find(tab => tab.tabKey === tabKey)) {
        const activeTabData = openedTabs.find(item => item.tabKey === tabKey) || {};
        return {
          ...state,
          activeTabKey: tabKey,
          activeTabData,
        };
      }
      const activeTabData = {
        ...initTabConfig,
        ...payload,
      };
      return {
        ...state,
        activeTabKey: tabKey,
        activeTabData,
        openedTabs: [
          ...openedTabs,
          activeTabData,
        ],
      };
    },
    // 根据id删除tab
    removeTab(state, { payload }) {
      const { openedTabs, activeTabKey } = state;
      const { tabKey } = payload;
      const removeTabIndex = openedTabs.findIndex(item => item.tabKey === tabKey);
      const newTabs = [...openedTabs].filter(item => item.tabKey !== tabKey);
      let newActiveTabKey = activeTabKey;
      // 删除的tab就是当前打开的tab时，activeTab前移
      if (activeTabKey === tabKey && removeTabIndex > 0) newActiveTabKey = newTabs[removeTabIndex - 1].tabKey;
      const activeTabData = openedTabs.find(item => item.tabKey === newActiveTabKey) || {};
      return {
        ...state,
        openedTabs: newTabs,
        activeTabKey: newActiveTabKey,
        activeTabData,
      };
    },
  },
};
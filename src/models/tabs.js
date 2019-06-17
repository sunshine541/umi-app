/**
 * 对标签页的数据状态存储
 * @desc:
 *    tabKey规则：以组件名为key，若有多个同一组件的tab，每个key后面加【-id】，如流程A的tab为CreateFlow-1,流程B的tab为CreateFlow-2;
 *    tabKey有可能与comKey相同；
 */

 // tab的默认配置
const initTabConfig = {
  tabKey: '', // tab的唯一标识符
  comKey: '', // 该tab引用的组件
  title: '',
  closable: true,
};
export default {
  state: {
    openedTabs: [
      {
        tabKey: 'MainBoard',
        comKey: 'MainBoard',
        title: '桌面首页',
        closable: false,
      },
      {
        tabKey: 'CreateFlow-123',
        comKey: 'CreateFlow',
        title: 'tab1',
        key: 'CreateFlow',
      },
    ], // 已经打开的tab
    activeTabKey: 'MainBoard', // 当前打开的tab tabKey
    activeTabInfo: {}, // 当前tab的数据
  },
  subscriptions: {},
  effects: {
  },
  reducers: {
    // 切换tab
    setActiveTabKey(state, { payload }) {
      const { openedTabs } = state;
      const { activeTabKey } = payload;
      return {
        ...state,
        activeTabKey,
        activeTabInfo: openedTabs.filter(tab => tab.tabKey === activeTabKey)[0],
      };
    },
    // 增加tab标签
    addTab(state, { payload }) {
      const { openedTabs } = state;
      const { tabKey } = payload;
      // 要增加的tab已经打开
      if (openedTabs.filter(tab => tab.tabKey === tabKey).length) return { ...state };
      return {
        ...state,
        activeTabKey: tabKey,
        openedTabs: [
          ...openedTabs,
          {
            ...initTabConfig,
            ...payload,
          },
        ],
      };
    },
    // 根据id删除tab标签
    removeTab(state, { payload }) {
      const { openedTabs, activeTabKey } = state;
      const { tabKey } = payload;
      const removeTabIndex = openedTabs.findIndex(item => item.tabKey === tabKey);
      const newTabs = [...openedTabs].filter(item => item.tabKey !== tabKey);
      let newActiveTabKey = activeTabKey;
      // 删除的tab就是当前打开的tab时，activeTab前移
      if (activeTabKey === tabKey) newActiveTabKey = newTabs[removeTabIndex - 1].tabKey;
      return {
        ...state,
        openedTabs: newTabs,
        activeTabKey: newActiveTabKey,
      };
    },
  },
};
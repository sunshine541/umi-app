/**
 * 对标签页的数据状态存储
 */
export default {
  state: {
    openedTabs: [
      {
        id: 1,
        title: 'tab1',
        content: 'contnet1232322323内容1',
        key: 'CreateFlow'
        // backupData: {}, // 打开tab时获取的数据备份（用于tab内刷新）
      }, {
        id: 2,
        title: 'tab2',
        content: '1222222222内容2',
        key: 'FlowList'
      }
    ], // 已经打开的tab
    activeTabId: -1, // 当前打开的tag id
    activeTabInfo: {}, // 当前tab的数据
  },
  subscriptions: {},
  effects: {
  },
  reducers: {
    // 增加tag标签
    addTag(state, { payload }) {
      const { openedTabs } = state;
      return {
        ...state,
        openedTabs: [
          ...openedTabs,
          { ...payload },
        ]
      }
    },
    // 根据id删除tag标签
    removeTag(state, { payload }) {
      const { openedTabs } = state;
      const { id } = payload;
      const newTabs = [...openedTabs].filter(item => item.id !== id);
      return {
        ...state,
        openedTabs: newTabs
      };
    }
  },
}
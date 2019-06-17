/*
 * @Author: Fus
 * @Date:   2019-04-24 14:13:11
 * @Last Modified by: Fus
 * @Last Modified time: 2019-06-17 16:07:31
 * @Desc: 全局通用
 *  包括：主题、国际化等
 */
import locales from '../locales/index';
const { langLib } = locales;

export default {
  state: {
    lang: 'zh', // 本地站点的国际化， zh-中文，en-英文
    langLib: langLib.zh, // 本地语言包内容
    theme: 'init', // 主题
    showSidebar: true, // 是否显示sidebar，用于管控图表resize
  },
  subscriptions: {},
  effects: {},
  reducers: {
    // 中英文切换
    updateLang(state, { payload }) {
      const { lang } = payload;
      return {
        ...state,
        lang,
        langLib: langLib[lang],
      };
    },
    // 更新主题
    updateTheme(state, { payload }) {
      const { theme } = payload;
      return { ...state, theme };
    },
    // 更新 是否显示sidebar
    updateShowSidebar(state, { payload }) {
      const { showSidebar } = payload;
      return { ...state, showSidebar };
    },
  },
};
/*
 * @Author: Fus
 * @Date:   2019-04-24 14:16:37
 * @Last Modified by: Fus
 * @Last Modified time: 2019-06-11 15:51:18
 * @Desc: 国际化
 */
import React from 'react';
import { LocaleProvider } from 'antd';
import { connect } from 'dva';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import locales from '../../locales';

const { antdLocale, localLocale } = locales;
addLocaleData([...en, ...zh]);

@connect(state => ({
  global: state.global,
}))
class Locale extends React.Component {
  render() {
    const { lang } = this.props.global;
    return (
      <IntlProvider
        key={lang}
        locale={lang}
        messages={localLocale[lang]}
      >
        <LocaleProvider locale={antdLocale[lang]}>
          {this.props.children}
        </LocaleProvider>
      </IntlProvider>
    );
  }
}


export default Locale;
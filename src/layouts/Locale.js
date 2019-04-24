/**
 * 国际化
 */
import React from 'react';
import { LocaleProvider } from 'antd';
import { connect } from 'dva';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import locales from '../locales';

const { antdLocale, localLocale } = locales;
addLocaleData([...en, ...zh]);

@connect(state => ({
  global: state.global,
}))
class Locale extends React.Component {
  render() {
    const { antdLang, localLang } = this.props.global;
    return (
      <IntlProvider
        key={localLang}
        locale={localLang}
        messages={localLocale[localLang]}
      >
        <LocaleProvider locale={antdLocale[antdLang]}>
          {this.props.children}
        </LocaleProvider>
      </IntlProvider>
    );
  }
}


export default Locale;
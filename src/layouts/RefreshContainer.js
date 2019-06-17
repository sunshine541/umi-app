/*
 * @Author: Fus
 * @Date:   2019-04-28 08:50:58
 * @Last Modified by: Fus
 * @Last Modified time: 2019-06-11 15:51:34
 * @Desc: 用于tab容器的刷新，主功能生命周期
 */
import React from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { CONTAINER_TYPES, BaseContext } from '../constants/global';
import styles from './RefreshContainer.less';

class RefreshContainer extends React.Component {
  static contextType = BaseContext
  componentWillMount() {
    const { tabKey } = this.props;
    this.context.dispatch({
      type: 'tabs/updateTabInfo',
      payload: {
        tabKey,
        isRefreshing: false,
      },
    });
  }
  // componentWillUnmount() {
  //   console.log('will aaa un tab');
  //   const that = this;
  //   const { tabKey } = this.props;
  //   // setTimeout(() => {
  //     that.context.dispatch({
  //       type: 'tabs/updateTabInfo',
  //       payload: {
  //         tabKey,
  //         isRefreshing: false,
  //       },
  //     });
  //   // }, 5000);
  // }
  render() {
    const { comKey, isRefreshing } = this.props;
    // 区分是列表型页面还是详情类型页面，用以外层容器样式区分
    const activeType = Object.keys(CONTAINER_TYPES).find(item => CONTAINER_TYPES[item].includes(comKey)) || '';
    const wrapCls = classNames({
      [styles[`wrap${activeType}`]]: true,
      [styles.wrap]: true,
    });
    return (
      <div className={wrapCls}>
        <Spin spinning={isRefreshing} tip={<FormattedMessage id="global.loading" />}>
          {this.props.children}
        </Spin>
      </div>
    );
  }
}

export default RefreshContainer;
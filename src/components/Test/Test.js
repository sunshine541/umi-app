import React from 'react';
import { DatePicker, Input } from 'antd';
import { connect } from 'dva';

@connect(state => ({
  langLib: state.global.langLib,
  activeTabData: state.tabs.activeTabData,
}))
class Test extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    console.log('aaa getdir');
    if (nextProps.activeTabData.isReloadData) {
      return nextProps;
    }
    return null;
  }
  componentDidMount() {
    console.log('aaa fetchList');
  }
  render() {
    const { langLib } = this.props;
    return (
      <div>
        <DatePicker />
        <Input placeholder={langLib['form.placeholder.iconfont']} />
      </div>
    );
  }
};

export default Test;
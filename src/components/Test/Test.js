import React from 'react';
import { DatePicker, Input } from 'antd';
import { connect } from 'dva';

@connect(state => ({
  langLib: state.global.langLib,
}))
class Test extends React.Component {
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
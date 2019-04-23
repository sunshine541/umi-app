/**
 * 流程列表
 */
import React from 'react';
import { getList } from '../../services/user';

class FlowList extends React.Component {
  componentWillMount() {
    console.log('will aaa')
    getList({
      id: 123
    }).then(res => {
      console.log(res, 'aaa res')
    });
  }
  componentWillUnmount() {
    console.log('will un aaa')
  }
  render() {
    return (
      <div>
        流程列表
      </div>
    )
  }
}

export default FlowList;

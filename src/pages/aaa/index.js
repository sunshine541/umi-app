import React from 'react';
import { Button } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './index.less';

@connect(state => ({
  name: state.global.name
}))
class aaa extends React.Component {
  goTo = () => { 
    router.push('/aaa/bbb');
  }
  render() {
    const { name } = this.props;
    return (
      <div className={styles.aaa}>123123 {name}
        <Button onClick={this.goTo}>href to</Button>
      </div>
    )
  }
}
export default aaa;
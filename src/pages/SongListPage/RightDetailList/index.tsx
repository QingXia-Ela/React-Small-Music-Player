import * as React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import './index.scss';

import TopInfo from './TopInfo';
import BottomList from './BottomList';

interface RightDetailListProps {}

interface RightDetailListState {
  spinning: boolean;
}

class RightDetailList extends React.Component<
  RightDetailListProps,
  RightDetailListState
> {
  state = {
    spinning: false,
  };
  render() {
    return (
      <div className="right_detail_list">
        <Spin
          spinning={this.state.spinning}
          indicator={
            <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} />
          }
        >
          <TopInfo />
          <BottomList />
        </Spin>
      </div>
    );
  }
}

export default connect((state: { [propName: string]: any }) => ({
  userInfo: state.Login.userInfo,
}))(RightDetailList);

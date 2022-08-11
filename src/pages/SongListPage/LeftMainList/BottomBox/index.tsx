import * as React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './index.scss';

interface BottomBoxProps {}

interface BottomBoxState {}

class BottomBox extends React.Component<BottomBoxProps, BottomBoxState> {
  state = {};
  render() {
    return (
      <div className="bottom_box">
        <Spin
          spinning={false}
          indicator={
            <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} />
          }
        >
          bottomBox
        </Spin>
      </div>
    );
  }
}

export default BottomBox;

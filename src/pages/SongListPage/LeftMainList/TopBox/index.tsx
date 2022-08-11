import * as React from 'react';
import { Input } from 'antd';
import './index.scss';

import BlackListItem from '@/components/BlackListItem';

interface TopBoxProps {}

interface TopBoxState {}

class TopBox extends React.Component<TopBoxProps, TopBoxState> {
  state = {};
  render() {
    return (
      <div className="top_box">
        <Input
          className="black_input"
          placeholder="搜索..."
          style={{ width: '90%' }}
        ></Input>
        <BlackListItem className="current_playlist">
          <span>111</span>
        </BlackListItem>
      </div>
    );
  }
}

export default TopBox;

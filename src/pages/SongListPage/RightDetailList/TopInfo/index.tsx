import * as React from 'react';
import './index.scss';

interface TopInfoProps {}

interface TopInfoState {}

class TopInfo extends React.Component<TopInfoProps, TopInfoState> {
  state = {};
  render() {
    return <div className="top_info">topinfo</div>;
  }
}

export default TopInfo;

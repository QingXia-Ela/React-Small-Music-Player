import * as React from 'react';
import { connect } from 'react-redux';
import './index.scss';

import SongListCoverImg from './CoverImg';
import WhiteScrollBar from '@/components/WhiteScrollBar';

interface TopInfoProps {
  currentDetailListInfo: { [propName: string]: any };
  name: string;
  description: string;
}

interface TopInfoState {}

class TopInfo extends React.Component<TopInfoProps, TopInfoState> {
  state = {};
  render() {
    const _ = this.props.currentDetailListInfo
      ? this.props.currentDetailListInfo
      : {};
    return (
      <div className="top_info">
        <SongListCoverImg
          style={{ backgroundImage: `url(${_.coverImgUrl})` }}
        />
        <div className="operation_box">
          <div className="text">
            <div className="title">{_.name}</div>
            <div className="description">{_.description}</div>
          </div>
          <div className="operation">111</div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: { [propName: string]: any }) => ({
    currentDetailListInfo: state.SongList.currentDetailListInfo,
    name: state.SongList.name,
    description: state.SongList.description,
  }),
  {},
)(TopInfo);

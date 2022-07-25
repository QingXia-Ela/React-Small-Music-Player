import * as React from 'react';
import './index.scss';

interface RightPlayListProps {}

interface RightPlayListState {}

class RightPlayList extends React.Component<
  RightPlayListProps,
  RightPlayListState
> {
  state = {};
  render() {
    return <div className="right_play_list">PlayList</div>;
  }
}

export default RightPlayList;

import * as React from 'react';
import './index.scss';

interface BottomListProps {}

interface BottomListState {}

class BottomList extends React.Component<BottomListProps, BottomListState> {
  state = {};
  render() {
    return <div className="bottom_list">bottomList</div>;
  }
}

export default BottomList;

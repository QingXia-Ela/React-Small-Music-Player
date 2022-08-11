import * as React from 'react';
import './index.scss';

import TopInfo from './TopInfo';
import BottomList from './BottomList';

interface RightDetailListProps {}

interface RightDetailListState {}

class RightDetailList extends React.Component<
  RightDetailListProps,
  RightDetailListState
> {
  state = {};
  render() {
    return (
      <div className="right_detail_list">
        <TopInfo />
        <BottomList />
      </div>
    );
  }
}

export default RightDetailList;

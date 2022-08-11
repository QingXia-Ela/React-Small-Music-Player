import * as React from 'react';
import BottomBox from './BottomBox';
import './index.scss';
import TopBox from './TopBox';

interface LeftMainListProps {}

interface LeftMainListState {}

class LeftMainList extends React.Component<
  LeftMainListProps,
  LeftMainListState
> {
  state = {};
  render() {
    return (
      <div className="left_main_list">
        <TopBox />
        <BottomBox />
      </div>
    );
  }
}

export default LeftMainList;

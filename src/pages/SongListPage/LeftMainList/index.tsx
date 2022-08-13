import * as React from 'react';
import BottomBox from './BottomBox';
import './index.scss';
import TopBox from './TopBox';

interface LeftMainListProps {
  currentId: string | number;
}

interface LeftMainListState {
  currentListId: string | number;
}

class LeftMainList extends React.Component<
  LeftMainListProps,
  LeftMainListState
> {
  state = {
    currentListId: 'current',
  };
  render() {
    return (
      <div className="left_main_list">
        <TopBox />
        <div className="row_split_line1"></div>
        <BottomBox />
      </div>
    );
  }
}

export default LeftMainList;

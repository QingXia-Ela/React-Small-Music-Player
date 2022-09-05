import * as React from 'react';
import { connect } from 'react-redux';
import './index.scss';

import TransparentBox1 from '@/components/pages/transparentBox1';
import LeftMainList from './LeftMainList';
import RightDetailList from './RightDetailList';
import judgeBrowserTitle from '@/utils/judgeBrowserTitle';

interface SongListPageProps {
  userInfo: {
    [propName: string]: any;
  };
}

interface SongListPageState {
  ListId: string | number;
}

class SongListPage extends React.Component<
  SongListPageProps,
  SongListPageState
> {
  state = {
    ListId: 'current',
  };
  changeShowList = (id: string | number) => {
    this.setState({
      ListId: id,
    });
    if (typeof id === 'string') {
      switch (id) {
        case 'current':
          break;
        case 'myfavorite':
          break;
        case 'search':
          break;
        default:
          break;
      }
    }
  };
  render() {
    return (
      <TransparentBox1 addclass="song_list_page">
        <div className="song_list_page_container">
          <LeftMainList currentId={this.state.ListId} />
          <RightDetailList />
        </div>
      </TransparentBox1>
    );
  }
  componentDidMount() {
    judgeBrowserTitle()
  }
}

export default connect((state: { [propName: string]: any }) => ({
  currentDetailListLoading: state.SongList.currentDetailListLoading,
  currentDetailListInfo: state.SongList.currentDetailListInfo,
  currentDetailList: state.SongList.currentDetailList,
}))(SongListPage);

import TransparentBox1 from '@/components/pages/transparentBox1';
import * as React from 'react';
import './index.scss';

import LeftMainList from './LeftMainList';
import RightDetailList from './RightDetailList';

interface SongListPageProps {}

interface SongListPageState {}

class SongListPage extends React.Component<
  SongListPageProps,
  SongListPageState
> {
  state = {};
  render() {
    return (
      <TransparentBox1 addClass="song_list_page">
        <div className="song_list_page_container">
          <LeftMainList />
          <RightDetailList />
        </div>
      </TransparentBox1>
    );
  }
}

export default SongListPage;

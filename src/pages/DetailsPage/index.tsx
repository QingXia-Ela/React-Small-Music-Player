import * as React from 'react';
import './index.scss';
import { match } from 'react-router-dom';
import { connect } from 'react-redux';

import MusicControler from '@/components/MusicPlayer/Control/musicControler';
import TimeSlider from '@/components/MusicPlayer/Control/timeSlider';
import SongInfo from './SongInfo';
import { IRouteComponentProps } from 'umi';
import judgeBrowserTitle from '@/utils/judgeBrowserTitle';

interface SongDetailsPageProps extends IRouteComponentProps {
  match: match<{
    id: string;
  }>;
  info: any;
}

interface SongDetailsPageState {}

class SongDetailsPage extends React.Component<
  SongDetailsPageProps,
  SongDetailsPageState
> {
  state = {};

  setTitle = () => {
    const info = this.props.info;
    if (this.props.info) {
      judgeBrowserTitle(
        info.name + ' - ' + info.ar.map((val: any) => val.name),
      );
    }
  };

  render() {
    return (
      <div className="song_details_page">
        <div className="song_details_container">
          <SongInfo match={this.props.match} />
          <div className="song_details_controler">
            <MusicControler showSongName={false} />
            <TimeSlider />
          </div>
        </div>
      </div>
    );
  }

  getSnapshotBeforeUpdate(
    prevProps: SongDetailsPageProps,
    prevState: SongDetailsPageState,
  ) {
    // 检测歌曲是否变化
    if (
      (prevProps.info && prevProps.info.id === this.props.info.id) ||
      (!prevProps.info && this.props.info)
    )
      return true;
    return null;
  }

  componentDidMount() {
    this.setTitle();
  }
  componentDidUpdate(
    prevProps: SongDetailsPageProps,
    prevState: SongDetailsPageState,
    snapshot: any,
  ) {
    if (snapshot) this.setTitle();
  }
}

export default connect((state: any) => ({
  info: state.MusicPlayer.currentSong,
}))(SongDetailsPage);

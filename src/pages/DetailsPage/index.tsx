import * as React from 'react';
import './index.scss';
import { match } from 'react-router-dom';

import MusicControler from '@/components/MusicPlayer/Control/musicControler';
import TimeSlider from '@/components/MusicPlayer/Control/timeSlider';
import SongInfo from './SongInfo';
import { IRouteComponentProps } from 'umi';

interface SongDetailsPageProps extends IRouteComponentProps {
  match: match<{
    id: string;
  }>;
}

interface SongDetailsPageState {}

class SongDetailsPage extends React.Component<
  SongDetailsPageProps,
  SongDetailsPageState
> {
  state = {};
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
}

export default SongDetailsPage;

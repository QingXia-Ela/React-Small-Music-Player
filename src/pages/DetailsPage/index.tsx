import * as React from 'react';
import './index.scss';

interface SongDetailsPageProps {}

interface SongDetailsPageState {}

class SongDetailsPage extends React.Component<
  SongDetailsPageProps,
  SongDetailsPageState
> {
  state = {};
  render() {
    return <div className="song_details_page">SongDetailsPage</div>;
  }
}

export default SongDetailsPage;

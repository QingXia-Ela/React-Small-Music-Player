import SongImg from './songImg';
import MusicControler from './musicControler';
import TimeSlider from './timeSlider';

import './index.scss';

function MusicState() {
  return (
    <div className="music_state">
      <SongImg />
      <MusicControler />
      <TimeSlider />
    </div>
  );
}

export default MusicState;

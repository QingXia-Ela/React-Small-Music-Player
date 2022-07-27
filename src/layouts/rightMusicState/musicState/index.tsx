import SongImg from '@/components/MusicPlayer/songImg';
import MusicControler from '@/components/MusicPlayer/Control/musicControler';
import TimeSlider from '@/components/MusicPlayer/Control/timeSlider';

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

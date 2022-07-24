import * as React from 'react';
import './index.scss';

class TimeSlider extends React.Component {
  state = {};
  render() {
    return (
      <div className="time_slider">
        <span className="time_text">-- / --</span>
      </div>
    );
  }
}

export default TimeSlider;

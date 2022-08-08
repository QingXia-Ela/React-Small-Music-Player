import * as React from 'react';
import { connect } from 'react-redux';

import './index.scss';
import TransparentBox1 from '@/components/pages/transparentBox1';

interface TopLeftSpectrumProps {
  ele: HTMLMediaElement;
  isPlay: boolean;
}

interface TopLeftSpectrumState {}

class TopLeftSpectrum extends React.Component<
  TopLeftSpectrumProps,
  TopLeftSpectrumState
> {
  state = {};
  private hasInit = false;
  private log = false;
  render() {
    return (
      <TransparentBox1>
        <div className="topleft_spectrum">频谱</div>
        <button onClick={this.begin}>draw</button>
        {/* <canvas></canvas> */}
      </TransparentBox1>
    );
  }

  componentDidMount() {
    console.log(this.props.ele);
  }

  componentDidUpdate() {
    if (!this.hasInit && this.props.ele.src.length) {
      let audioContext = new window.AudioContext();
      let eleSource = audioContext.createMediaElementSource(this.props.ele);
      let analyser = audioContext.createAnalyser();

      analyser.fftSize = 256;

      eleSource.connect(analyser);
      analyser.connect(audioContext.destination);

      this.hasInit = true;

      setInterval(() => {
        if (this.log) this.draw(analyser);
      }, 1000);
    }
  }

  begin = () => {
    this.log = !this.log;
  };

  draw = (analyser: AnalyserNode) => {
    let array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    console.log(array);
  };
}

export default connect(
  (state: { [propName: string]: any }) => ({
    ele: state.MusicPlayer.audioEle,
    isPlay: state.MusicPlayer.isPlay,
  }),
  {},
)(TopLeftSpectrum);

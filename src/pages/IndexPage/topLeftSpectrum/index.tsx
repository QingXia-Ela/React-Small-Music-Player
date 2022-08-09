import * as React from 'react';
import { connect } from 'react-redux';

import './index.scss';
import TransparentBox1 from '@/components/pages/transparentBox1';
import { throttle } from 'lodash';
import { switchPlayState } from '@/redux/modules/musicPlayer/actions';

interface TopLeftSpectrumProps {
  ele: HTMLMediaElement;
  switchPlayState: Function;
  isPlay: boolean;
}

interface TopLeftSpectrumState {}

class TopLeftSpectrum extends React.Component<
  TopLeftSpectrumProps,
  TopLeftSpectrumState
> {
  state = {};
  private hasInit = false;
  private canvasCtx: CanvasRenderingContext2D | null | undefined;
  private drawVisual: number = 0;

  private myFftSize: 256 = 256;

  IndexCanvas = React.createRef<HTMLCanvasElement>();

  render() {
    return (
      <TransparentBox1>
        <div className="topleft_spectrum">
          <canvas
            id="IndexCanvas"
            className="index_canvas"
            ref={this.IndexCanvas}
            onClick={() => this.props.switchPlayState()}
          ></canvas>
        </div>
      </TransparentBox1>
    );
  }

  componentDidMount() {
    this.canvasCtx = this.IndexCanvas.current?.getContext('2d');
    // 初始化频域图
    if (this.IndexCanvas.current) {
      this.drawToDom(
        this.IndexCanvas.current,
        new Uint8Array(this.myFftSize / 2).fill(0),
      );
    }
  }

  componentDidUpdate() {
    // 未初始化且无资源
    if (!this.hasInit && this.props.ele.src.length) {
      let audioContext = new window.AudioContext();
      let eleSource = audioContext.createMediaElementSource(this.props.ele);
      let analyser = audioContext.createAnalyser();

      analyser.fftSize = this.myFftSize;

      eleSource.connect(analyser);
      analyser.connect(audioContext.destination);

      this.hasInit = true;

      this.draw(analyser);
    }
  }

  draw = (analyser: AnalyserNode) => {
    const alt = analyser.frequencyBinCount;
    let array = new Uint8Array(alt);

    // 绘制函数
    let drawToCanvas = throttle(() => {
      this.drawVisual = requestAnimationFrame(drawToCanvas);
      // 获取频域数据
      analyser.getByteFrequencyData(array);
      if (this.IndexCanvas.current)
        this.drawToDom(this.IndexCanvas.current, array);
    }, 20);

    drawToCanvas();
  };

  drawToDom = (canvas: HTMLCanvasElement, arr: Uint8Array) => {
    let canvasCtx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const alt = arr.length;
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, w, h);
      // 计算每个条的宽度
      let barW = (w / alt) * 0.9;
      let barH = 0;
      let x = 0;

      for (let i = 0; i < alt; i++) {
        barH = arr[i] + 20;
        canvasCtx.fillStyle = '#bce5ef';
        canvasCtx.fillRect(x, h / 2 - barH / 8, barW, barH / 4);
        x += barW + 3;
      }
    } else {
      throw Error('canvas 元素为空');
    }
  };
}

export default connect(
  (state: { [propName: string]: any }) => ({
    ele: state.MusicPlayer.audioEle,
    isPlay: state.MusicPlayer.isPlay,
  }),
  {
    switchPlayState,
  },
)(TopLeftSpectrum);

import * as React from 'react';
import { connect } from 'react-redux';

import './index.scss';
import TransparentBox1 from '@/components/pages/transparentBox1';
import { throttle } from 'lodash';
import { switchPlayState } from '@/redux/modules/musicPlayer/actions';
import { setConnect2Ele } from '@/redux/modules/AudioContext/action';

interface TopLeftSpectrumProps {
  ele: HTMLMediaElement;
  switchPlayState: Function;
  setConnect2Ele: Function;
  isPlay: boolean;
  analyser: null | AnalyserNode;
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
    if (this.props.ele.src.length) this.props.setConnect2Ele(this.props.ele);

    // 初始化频域图
    if (this.IndexCanvas.current) {
      this.drawToDom(
        this.IndexCanvas.current,
        new Uint8Array(this.myFftSize / 2).fill(0),
      );
    }
    if (this.props.analyser) this.draw(this.props.analyser);
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
        barH = arr[i] + 30;
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
    analyser: state.AudioContext.analyser,
  }),
  {
    switchPlayState,
    setConnect2Ele,
  },
)(TopLeftSpectrum);

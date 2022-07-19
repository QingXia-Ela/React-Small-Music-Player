import React, { Fragment } from 'react';
import throttle from 'lodash/throttle';
import 'animate.css';
import './index.scss';

import {
  changeBG,
  switchFilter,
  switchMask,
} from '@/redux/modules/layouts/bg/action';
import { connect } from 'react-redux';

interface BGProps {
  bgLink: string;
  changeBG: Function;
  switchMask: Function;
  switchFilter: Function;
  path: string;
  mask: boolean;
  filter: boolean;
  pathChange: boolean;
}

class BG extends React.Component<BGProps> {
  bgRef: any = React.createRef();

  render() {
    window.addEventListener('mousemove', this.listenMove);
    return (
      <Fragment>
        <div id="bgMask" className={this.props.mask ? 'active' : ''}></div>
        <div
          key={+new Date()}
          id="bg"
          ref={this.bgRef}
          className={`animate__animated ${
            this.props.pathChange ? 'animate__fadeIn' : ''
          } ${this.props.filter ? 'active' : ''}`}
          style={{
            backgroundImage: `url(${
              this.props.path
                ? this.props.path
                : require('@/assets/images/bg/base_bg.jpg')
            })`,
          }}
        ></div>
      </Fragment>
    );
  }

  listenMove = throttle((e: any) => {
    const x = parseFloat((e.clientX / window.innerWidth).toFixed(2)) * 20 + 40;
    const y = parseFloat((e.clientY / window.innerHeight).toFixed(2)) * 6 + 47;
    document.getElementById('bg')!.style.backgroundPosition = `${x}% ${y}%`;
  }, 10);
}

/**
 * 背景组件，redux 有三个导出方法：
 * `changeBG(path: string)`
 * `switchFilter(isOpen: boolean)`
 * `switchMask(isOpen: boolean)`
 */
export default connect(
  (state: any) => ({
    path: state.BG.bgPath,
    pathChange: state.BG.pathChange,
    mask: state.BG.mask,
    filter: state.BG.filter,
  }),
  { changeBG, switchFilter, switchMask },
)(BG);

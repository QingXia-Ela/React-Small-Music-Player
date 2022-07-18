import React, { Fragment } from 'react';
import throttle from 'lodash/throttle'
import 'animate.css'
import './index.scss'

import {
  changeBG
} from '@/redux/modules/layouts/bg/action'
import { connect } from 'react-redux'

interface BGProps {
  bgLink: string,
  changeBG: Function,
  path: string
}

interface BGState {

}

class BG extends React.Component<BGProps, BGState> {

  state = {
    bgPath: this.props.path
  }

  bgRef: any = React.createRef()

  render() {
    window.addEventListener('mousemove', this.listenMove)
    return (
      <Fragment>
        <div id="bgMask"></div>
        <div key={+new Date()} id="bg" ref={this.bgRef} className="animate__animated animate__fadeIn" style={{ backgroundImage: `url(${this.props.path ? this.props.path : require('@/assets/images/bg/base_bg.jpg')})` }}></div>
      </Fragment>
    );
  }

  listenMove = throttle((e: any) => {
    const x = parseFloat((e.clientX / window.innerWidth).toFixed(2)) * 20 + 40
    const y = parseFloat((e.clientY / window.innerHeight).toFixed(2)) * 6 + 47
    document.getElementById('bg')!.style.backgroundPosition = `${x}% ${y}%`
  }, 10)
}

export default connect(
  (state: any) => ({ path: state.BGPath }),
  { changeBG }
)(BG);
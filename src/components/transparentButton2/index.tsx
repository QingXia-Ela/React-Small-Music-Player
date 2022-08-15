import React, { Fragment, ReactNode, cloneElement } from 'react';

import './index.scss';

interface TransparentButton2Props extends HTMLDivElement {}

interface TransparentButton2State {}

/**
 * 左右为圆的半透明按钮
 */
class TransparentButton2 extends React.Component<
  TransparentButton2Props,
  TransparentButton2State
> {
  state = {};
  render() {
    return (
      <div className="transparent_button2">
        {cloneElement(<>{this.props.children}</>)}
      </div>
    );
  }
}

export default TransparentButton2;

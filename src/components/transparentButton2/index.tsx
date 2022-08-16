import React, { Fragment, ReactNode, cloneElement } from 'react';

import './index.scss';

interface TransparentButton2Props {
  iconBefore?: JSX.Element;
  children: any;
}

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
        <div className="icon_before_container">{this.props.iconBefore}</div>
        {this.props.children}
      </div>
    );
  }
}

export default TransparentButton2;

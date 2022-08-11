import * as React from 'react';
import './index.scss';

import VT from 'vanilla-tilt';

interface TransparentBox1Props {
  title?: string | undefined;
  children?: any;
  openVT?: boolean | undefined;
  addClass?: string;
}

interface TransparentBox1State {}

class TransparentBox1 extends React.Component<
  TransparentBox1Props,
  TransparentBox1State
> {
  state = {};

  ele = React.createRef<HTMLDivElement>();

  render() {
    return (
      <div
        className={`transparent_box1 ${
          this.props.addClass ? this.props.addClass : ''
        }`}
        {...this.props}
      >
        <div className="content" ref={this.ele}>
          {this.props.title ? (
            <div className="title">{this.props.title}</div>
          ) : null}
          <div className="real_content">{this.props.children}</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const cardEle = this.ele.current;
    if (cardEle && this.props.openVT) {
      VT.init(cardEle, {
        max: 1,
        speed: 1000,
        glare: true,
        'max-glare': 0.2,
      });
    }
  }
}

export default TransparentBox1;

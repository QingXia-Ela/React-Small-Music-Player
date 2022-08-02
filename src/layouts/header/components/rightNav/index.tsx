import * as React from 'react';

import TransparentButton from '@/components/transparentButton';

import './index.scss';

class RightNav extends React.Component {
  state = {};
  render() {
    return (
      <div className="right_nav">
        <TransparentButton>
          <span className="content">主页</span>
        </TransparentButton>
        <TransparentButton>
          <span className="content">音乐</span>
        </TransparentButton>
        <TransparentButton>
          <span className="content">设置</span>
        </TransparentButton>
      </div>
    );
  }
}

export default RightNav;

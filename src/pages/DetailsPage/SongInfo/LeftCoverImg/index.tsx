import * as React from 'react';
import './index.scss';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

function LeftCoverImg(props: any) {
  const { link } = props;
  return (
    <TransitionGroup
      childFactory={(child) => React.cloneElement(child, { classNames: 'img' })}
      className="left_cover_img"
    >
      <CSSTransition key={link} timeout={800}>
        <div
          className="img_box"
          style={{ backgroundImage: `url(${link})` }}
        ></div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default LeftCoverImg;

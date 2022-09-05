import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';


interface WhiteScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  fullHeight?: boolean
}

function WhiteScrollBar(prop: WhiteScrollBarProps) {
  return (
    <Scrollbars
      style={{ width: '100%', height: '100%' }}
      renderTrackVertical={(props) => (
        <div
          {...props}
          className={`white_scroll_track-vertical ${prop.fullHeight ? 'full_height' : ''
            }`}
        />
      )}
      renderThumbVertical={(props) => (
        <div {...props} className="white_scroll_thumb-vertical" />
      )}
      className="white_scroll"
    >
      {prop.children}
    </Scrollbars>
  );
}

export default WhiteScrollBar;

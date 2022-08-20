import { Scrollbars } from 'react-custom-scrollbars';

function WhiteScrollBar(prop: { [propName: string]: any }) {
  return (
    <Scrollbars
      renderTrackVertical={(props) => (
        <div
          {...props}
          className={`white_scroll_track-vertical ${
            prop.fullHeight ? 'full_height' : ''
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

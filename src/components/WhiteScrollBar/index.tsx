import { Scrollbars } from 'react-custom-scrollbars';

function WhiteScrollBar(props: { [propName: string]: any }) {
  return (
    <Scrollbars
      renderTrackVertical={(props) => (
        <div {...props} className="white_scroll_track-vertical" />
      )}
      renderThumbVertical={(props) => (
        <div {...props} className="white_scroll_thumb-vertical" />
      )}
      className="white_scroll"
    >
      {props.children}
    </Scrollbars>
  );
}

export default WhiteScrollBar;

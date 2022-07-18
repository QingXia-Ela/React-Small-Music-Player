import './index.scss'

function YellowButton(props: { [propName: string]: any }) {
  return (
    <div className="yellow_button">
      <button>
        <div className="split_line">
          <svg viewBox="0 0 100 10"><g fill="currentColor"><line x1="5" x2="95" y1="5" y2="5" stroke="currentColor"></line><circle cx="5" cy="5" r="3"></circle><circle cx="95" cy="5" r="3"></circle></g></svg>
        </div>
        {props.children}
        <div className="split_line">
          <svg viewBox="0 0 100 10"><g fill="currentColor"><line x1="5" x2="95" y1="5" y2="5" stroke="currentColor"></line><circle cx="5" cy="5" r="3"></circle><circle cx="95" cy="5" r="3"></circle></g></svg>
        </div>
      </button>
    </div>
  );
}

export default YellowButton;
import * as React from 'react';

import './index.scss';

class HeaderTime extends React.Component {
  state = {
    time: '',
  };
  render() {
    return (
      <div className="header_timer">
        {this.state.time.split('').map((val, i) => {
          return <span key={val + i}>{val}</span>;
        })}
      </div>
    );
  }
  componentDidMount() {
    this.showTime();
    setInterval(() => {
      this.showTime();
    }, 1000);
  }

  showTime = () => {
    const timer = new Date();
    const h = timer.getHours() < 10 ? '0' + timer.getHours() : timer.getHours();
    const m =
      timer.getMinutes() < 10 ? '0' + timer.getMinutes() : timer.getMinutes();
    const s =
      timer.getSeconds() < 10 ? '0' + timer.getSeconds() : timer.getSeconds();
    this.setState({
      time: `${h}:${m}:${s}`,
    });
  };
}

export default HeaderTime;

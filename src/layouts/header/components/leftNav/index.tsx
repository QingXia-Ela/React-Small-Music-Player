import TransparentButton from '@/components/transparentButton';
import React, { Fragment } from 'react';
import { Link, NavLink } from 'umi';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import './index.scss';

import { history } from 'umi';

interface HeaderRouterButtonsProps {}

interface HeaderRouterButtonsState {
  historyPos: number;
}

class HeaderRouterButtons extends React.Component<
  HeaderRouterButtonsProps,
  HeaderRouterButtonsState
> {
  state = {
    historyPos: history.length,
  };
  render() {
    return (
      <div className="left_nav">
        <Link to="/" className="transparent_button">
          <div className="content">主页</div>
        </Link>
        <NavLink
          to="/SongList"
          activeClassName="transparent_button active"
          className="transparent_button"
        >
          <div className="content">音乐</div>
        </NavLink>
      </div>
    );
  }

  go = () => {
    if (this.state.historyPos < history.length) {
      let lastPos = this.state.historyPos;
      this.setState({
        historyPos: lastPos + 1,
      });
      history.go(1);
    }
  };

  back = () => {
    if (this.state.historyPos > 1) {
      let lastPos = this.state.historyPos;
      this.setState({
        historyPos: lastPos - 1,
      });
      history.goBack();
    }
  };
}

export default HeaderRouterButtons;

import TransparentButton from '@/components/transparentButton';
import * as React from 'react';

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
      <div className="router_button">
        <TransparentButton disabled={this.state.historyPos <= 1}>
          <LeftOutlined size={20} onClick={this.back} />
        </TransparentButton>
        <TransparentButton disabled={this.state.historyPos >= history.length}>
          <RightOutlined onClick={this.go} />
        </TransparentButton>
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

import * as React from 'react';
import HeaderRouterButtons from './components/routerButton';

import './index.scss';

interface HeaderProps {}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {};
  render() {
    return (
      <header>
        <HeaderRouterButtons />
      </header>
    );
  }
}

export default Header;

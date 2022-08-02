import * as React from 'react';
import { IRouteComponentProps } from 'umi';
import { Provider } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import store from '@/redux/index';
import BG from './bg';
import Header from './header';
import BottomMusicState from '@/layouts/bottomMusicState';

import 'antd/dist/antd.min.css';
import './index.scss';
import RightMusicState from './rightMusicState';

import NeteaseLogin from '@/components/Login';

const ANIMATION_MAP: any = {
  PUSH: 'forward',
  POP: 'back',
};

export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  return (
    <Provider store={store}>
      <div className="layout">
        <div className="header">
          <Header></Header>
        </div>
        <div className="middle_content">
          <TransitionGroup
            childFactory={(child) =>
              React.cloneElement(child, { classNames: 'page' })
            }
          >
            <CSSTransition key={location.pathname} timeout={500}>
              {children}
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div className="footer">
          <BottomMusicState />
        </div>
        <RightMusicState></RightMusicState>
      </div>
      <BG></BG>
      {/* 登录框 */}
      <NeteaseLogin></NeteaseLogin>
    </Provider>
  );
}

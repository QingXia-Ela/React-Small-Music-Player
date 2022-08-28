import * as React from 'react';
import { IRouteComponentProps } from 'umi';
import { Provider, connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import store from '@/redux/index';
import BG from './bg';
import Header from './header';
import BottomMusicState from '@/layouts/bottomMusicState';

import 'antd/dist/antd.min.css';
import './index.scss';
import 'animate.css';

import RightMusicState from './rightMusicState';
import NeteaseLogin from '@/components/Login';
import Loading from '@/components/loading';

import { SWITCHFILTER, SWITCHMASK } from '@/redux/constant';

interface LayoutProps extends IRouteComponentProps {}

interface LayoutState {}

class Layout extends React.Component<LayoutProps, LayoutState> {
  state = {};
  // 路由变化时切换背景效果
  SwitchBG = () => {
    switch (location.pathname) {
      case '/SongList':
        store.dispatch({ type: SWITCHFILTER, data: true });
        break;

      default:
        store.dispatch({ type: SWITCHFILTER, data: false });
        store.dispatch({ type: SWITCHMASK, data: false });
        break;
    }
  };
  render() {
    return (
      <Provider store={store}>
        <Loading />
        <TransitionGroup className="main-wrapper">
          <CSSTransition key={0} timeout={3000}>
            <div className="layout">
              <div className="header">
                <Header></Header>
              </div>
              <TransitionGroup
                className="middle_content"
                childFactory={(child) =>
                  React.cloneElement(child, { classNames: 'page' })
                }
              >
                <CSSTransition
                  key={location.pathname.split('/')[1]}
                  timeout={800}
                >
                  {this.props.children}
                </CSSTransition>
              </TransitionGroup>
              <div className="footer">
                <BottomMusicState />
              </div>
              <RightMusicState></RightMusicState>
              <BG></BG>
              {/* 登录框 */}
              <NeteaseLogin></NeteaseLogin>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Provider>
    );
  }
  componentDidMount() {
    const { history } = this.props;
    console.log('layout mount');

    this.SwitchBG();
    history.listen((location) => {
      if (this.props.location.pathname !== location.pathname) {
        this.SwitchBG();
      }
    });
  }
}

export default Layout;

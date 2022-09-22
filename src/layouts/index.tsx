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

import RightMusicState from './rightMusicState';
import NeteaseLogin from '@/components/Login';
import Loading from '@/components/loading';

import { SWITCHFILTER, SWITCHMASK } from '@/redux/constant';
import ResizeHtmlFontSize from '@/utils/resetHtmlFontSize';

import { setConnect2Ele } from '@/redux/modules/AudioContext/action';

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
        <div className="phone_mask">
          <p>:(</p>
          <span>
            很抱歉，本站并不支持手机移动端访问，推荐使用 PC 端进行页面访问
          </span>
          <span>
            We're sorry but the website doesn't support mobile phone, please
            change your device like PC to visit it.
          </span>
        </div>
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
    ResizeHtmlFontSize();
    const { history } = this.props;
    this.SwitchBG();
    history.listen((location) => {
      if (this.props.location.pathname !== location.pathname) {
        this.SwitchBG();
      }
    });
  }

  componentDidUpdate() {
    const storeState = store.getState();
    const ele = storeState.MusicPlayer.audioEle;
    if (ele && ele.src.length) store.dispatch(setConnect2Ele(ele));
  }
}

export default Layout;

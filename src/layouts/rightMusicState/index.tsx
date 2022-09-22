import * as React from 'react';
import { Drawer } from 'antd';
import pubsub from 'pubsub-js';

import './index.scss';

import MusicState from './musicState';
import MusicList from './musicList';
import { OPENERIGHTDRAWER } from '@/constant/PubSub';

class RightMusicState extends React.Component {
  state = {
    visible: false,
  };
  private OpenRightDrawerToken: string = '';

  onClose = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    this.OpenRightDrawerToken = pubsub.subscribe(
      OPENERIGHTDRAWER,
      (msg: string, data: boolean) => {
        this.setState({ visible: data });
      },
    );
  }

  componentWillUnmount() {
    pubsub.unsubscribe(this.OpenRightDrawerToken);
  }

  render() {
    this.props;
    return (
      <div className="right_music_state">
        <div
          className="hover_light"
          onClick={() => this.setState({ visible: true })}
        ></div>
        <Drawer
          placement="right"
          className="right_main_drawer"
          visible={this.state.visible}
          width="35em"
          onClose={this.onClose}
        >
          <div className="right_music_list_box">
            <MusicState />
            <MusicList />
          </div>
        </Drawer>
      </div>
    );
  }
}

export default RightMusicState;

import * as React from 'react';
import { Drawer } from 'antd';

import './index.scss';

import MusicState from './musicState';
import MusicList from './musicList';

class RightMusicState extends React.Component {
  state = {
    visible: false,
  };

  onClose = () => {
    this.setState({ visible: false });
  };

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
          className=""
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

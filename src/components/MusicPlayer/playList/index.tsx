import React, { createRef, Fragment } from 'react';
import { Popconfirm } from 'antd';
import './index.scss';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';

import { Scrollbars } from 'react-custom-scrollbars';

import TransparentButton from '@/components/transparentButton';

import {
  changeSong,
  changeAllQueue,
  removeFromQueue,
} from '@/redux/modules/musicPlayer/actions';
import { connect } from 'react-redux';

interface RightPlayListProps {
  changeAllQueue: Function;
  changeSong: Function;
  removeFromQueue: Function;
  playQueue: any;
  currentSong: { [propName: string]: any };
  hideButton?: boolean;
  disabledDragable?: boolean;
}

interface RightPlayListState {}

class RightPlayList extends React.Component<
  RightPlayListProps,
  RightPlayListState
> {
  scrollEle = createRef<HTMLDivElement>();

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Scrollbars
          renderTrackVertical={(props) => (
            <div {...props} className="white_scroll_track-vertical" />
          )}
          renderThumbVertical={(props) => (
            <div {...props} className="white_scroll_thumb-vertical" />
          )}
          className="right_play_list white_scroll"
        >
          <Droppable droppableId="rightPlayListDrop" direction="vertical">
            {(provided) => (
              <ul
                className="right_play_list_container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {this.props.playQueue.map((val: any, i: number) => (
                  <Draggable
                    draggableId={val.name}
                    index={i}
                    key={val.id}
                    isDragDisabled={this.props.disabledDragable}
                  >
                    {(provided) => (
                      <li
                        key={val.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onDoubleClick={() => this.props.changeSong(val.id)}
                        className={`right_play_list_item ${
                          this.props.currentSong &&
                          val.id == this.props.currentSong.id
                            ? 'active'
                            : ''
                        } ${val.invalid ? 'invalid' : ''}`}
                      >
                        <span className="song_title">{val.name}</span>
                        {this.props.hideButton ? null : (
                          <div className="function_button">
                            <TransparentButton>
                              <i
                                onClick={() => this.props.changeSong(val.id)}
                                className="button iconfont icon-24gl-play"
                              ></i>
                            </TransparentButton>
                            <TransparentButton>
                              <Popconfirm
                                placement="left"
                                title="确认移除吗？"
                                onConfirm={() => this.removeFromQueue(val.id)}
                                okText="YES"
                                cancelText="NO"
                                icon={
                                  <i className="iconfont icon-24gl-warningCircle" />
                                }
                              >
                                <i className="button iconfont icon-24gl-trash2"></i>
                              </Popconfirm>
                            </TransparentButton>
                          </div>
                        )}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </Scrollbars>
      </DragDropContext>
    );
  }

  componentDidMount() {
    // const wrapper = document.getElementById('rightPlayList');
  }

  onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const source = result.source.index,
      end = result.destination?.index;
    if (typeof end != 'undefined') {
      let newPlayQueue = [...this.props.playQueue];
      newPlayQueue.splice(end, 0, ...newPlayQueue.splice(source, 1));
      this.props.changeAllQueue(newPlayQueue);
    }
  };

  removeFromQueue = (n: number) => {
    this.props.removeFromQueue(n);
  };
}

export default connect(
  (state: { [propName: string]: any }) => ({
    playQueue: state.MusicPlayer.playQueue,
    currentSong: state.MusicPlayer.currentSong,
  }),
  {
    changeSong,
    changeAllQueue,
    removeFromQueue,
  },
)(RightPlayList);

import React, { Fragment } from 'react';
import './index.scss';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';

import TransparentButton from '@/components/transparentButton';

import { changeSong } from '@/redux/modules/musicPlayer/actions';
import { connect } from 'react-redux';

interface RightPlayListProps {
  changeSong: Function;
  playQueue: any;
  currentSongIndex: number;
}

interface RightPlayListState {}

class RightPlayList extends React.Component<
  RightPlayListProps,
  RightPlayListState
> {
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="right_play_list">
          <Droppable droppableId="rightPlayListDrop" direction="vertical">
            {(provided) => (
              <ul
                className="right_play_list_container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {this.props.playQueue.map((val: any, i: number) => (
                  <Draggable draggableId={val.name} index={i} key={val.id}>
                    {(provided) => (
                      <li
                        key={val.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onDoubleClick={() => this.props.changeSong(val.id)}
                        className={`right_play_list_item ${
                          i == this.props.currentSongIndex ? 'active' : ''
                        } ${val.invalid ? 'invalid' : ''}`}
                      >
                        <span className="song_title">{val.name}</span>
                        <div className="function_button">
                          <TransparentButton>
                            <i
                              onClick={() => this.props.changeSong(val.id)}
                              className="button iconfont icon-24gl-play"
                            ></i>
                          </TransparentButton>
                          <TransparentButton>
                            <i className="button iconfont icon-24gl-trash2"></i>
                          </TransparentButton>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }

  onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log(result, provided);
  };
}

export default connect(
  (state: { [propName: string]: any }) => ({
    playQueue: state.MusicPlayer.playQueue,
    currentSongIndex: state.MusicPlayer.currentSongIndex,
  }),
  {
    changeSong,
  },
)(RightPlayList);

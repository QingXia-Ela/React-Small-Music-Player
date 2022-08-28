import * as React from 'react';
import { connect } from 'react-redux';
import { PlaySquareOutlined } from '@ant-design/icons';
import './index.scss';

import SongListCoverImg from './CoverImg';
import TransparentButton2 from '@/components/transparentButton2';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { playSongList } from '@/redux/modules/SongList/action';

interface TopInfoProps {
  playSongList: Function;
  currentDetailListInfo: { [propName: string]: any };
  name: string;
  description: string;
  currentListId: string | number | any;
}

interface TopInfoState {}

class TopInfo extends React.Component<TopInfoProps, TopInfoState> {
  state = {};
  render() {
    const _ = this.props.currentDetailListInfo
      ? this.props.currentDetailListInfo
      : {
          id: -2,
          name: '搜索结果',
          cancelRenderOperation: true,
        };
    return (
      <TransitionGroup
        className="h30 por"
        childFactory={(child) =>
          React.cloneElement(child, { classNames: 'info' })
        }
      >
        <CSSTransition
          key={
            this.props.currentListId.id
              ? this.props.currentListId.id
              : this.props.currentListId
          }
          timeout={1200}
          appear={true}
        >
          <div className="top_info">
            <SongListCoverImg
              style={{ backgroundImage: `url(${_.coverImgUrl})` }}
            />
            <div className="operation_box">
              <div className="text">
                <div className="title">{_.name}</div>
                <div className="description">{_.description}</div>
              </div>
              <div
                className="operation"
                onClick={() => this.props.playSongList(undefined, _.id)}
              >
                {_.cancelRenderOperation ? undefined : (
                  <TransparentButton2 iconBefore={<PlaySquareOutlined />}>
                    播放该播放列表
                  </TransparentButton2>
                )}
              </div>
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default connect(
  (state: { [propName: string]: any }) => ({
    currentDetailListInfo: state.SongList.currentDetailListInfo,
    name: state.SongList.name,
    description: state.SongList.description,
    currentListId: state.SongList.currentListId,
  }),
  {
    playSongList,
  },
)(TopInfo);

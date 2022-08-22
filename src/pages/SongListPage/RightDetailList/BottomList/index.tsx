import React, { Fragment } from 'react';
import './index.scss';
import { PlayCircleOutlined, DownloadOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';

import BlackTable from '@/pages/SongListPage/RightDetailList/BottomList/BlackTable';
import TransparentButton from '@/components/transparentButton';

import { changeSong } from '@/redux/modules/musicPlayer/actions';
import DownloadAudio from '@/utils/SongList/downloadAudio';
import { debounce, throttle } from 'lodash';

interface BottomListProps {
  currentDetailList: any[];
  changeSong: Function;
}

interface BottomListState {}

interface SongListDataType {
  name: string;
  ar: any[];
  key: string | number;
  [propName: string]: any;
  render?: () => {};
}

class BottomList extends React.Component<BottomListProps, BottomListState> {
  state = {};
  render() {
    const columns = [
      {
        title: '歌曲名',
        className: 'w50',
        key: 'name',
      },
      {
        title: '歌手',
        className: 'w30',
        key: 'ar',
      },
      {
        title: '操作',
        className: 'w20',
        key: 'operation',
      },
    ];
    let propData = JSON.parse(JSON.stringify(this.props.currentDetailList));
    propData = propData.map((val: any) => {
      val.key = val.id;
      val.ar = val.ar.map((val: any) => `${val.name ? val.name : ''} `);
      val.operation = (
        <Fragment>
          <TransparentButton>
            <PlayCircleOutlined onClick={() => this.props.changeSong(val.id)} />
          </TransparentButton>
          <TransparentButton>
            <DownloadOutlined
              onClick={() => debounce(DownloadAudio, 2000)(val)}
            />
          </TransparentButton>
        </Fragment>
      );
      return val;
    });
    return (
      <div className="bottom_list">
        <BlackTable
          columns={columns}
          dataSource={propData}
          itemClassName={'black_list_item_style icon_por use_zebra'}
          useHeader
        />
      </div>
    );
  }
}

export default connect(
  (state: { [propName: string]: any }) => ({
    currentDetailList: state.SongList.currentDetailList,
  }),
  {
    changeSong,
  },
)(BottomList);

import React, { Fragment } from 'react';
import './index.scss';
import { PlayCircleOutlined, DownloadOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';

import BlackTable from '@/pages/SongListPage/RightDetailList/BottomList/BlackTable';
import BlackInput from '@/components/Input';
import TransparentButton from '@/components/transparentButton';

interface BottomListProps {
  currentDetailList: any[];
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
    // this.props.currentDetailList.map((val: any) => val)
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
        title: '过滤',
        className: 'w20',
        key: 'filter',
      },
    ];
    let propData = this.props.currentDetailList.map((val: any) => {
      val.key = val.id;
      val.ar = val.ar.map((val: any) => `${val.name ? val.name : ''} `);
      val.filter = (
        <Fragment>
          <TransparentButton>
            <PlayCircleOutlined />
          </TransparentButton>
          <TransparentButton>
            <DownloadOutlined />
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
  {},
)(BottomList);

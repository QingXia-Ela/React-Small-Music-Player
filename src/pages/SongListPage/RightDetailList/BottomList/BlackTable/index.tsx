import * as React from 'react';
import { connect } from 'react-redux';
import './index.scss';

import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import WhiteScrollBar from '../../../../../components/WhiteScrollBar';
import { changeSong } from '@/redux/modules/musicPlayer/actions';
import {
  changeCurrentListPage,
  changeSongListId,
} from '@/redux/modules/SongList/action';
import { history } from 'umi';
import { SongListId } from '@/redux/modules/SongList/constant';

interface BlackTableProps {
  columns: any[];
  dataSource: any[];
  itemClassName?: string;
  useHeader?: boolean;

  loading: boolean;
  currentListId: SongListId;
  currentSong?: { [propName: string]: any };
  currentDetailListInfo: { [propName: string]: any };
  currentDetailListPage: number;
  changeSong: Function;
  changeSongListId: Function;
  changeCurrentListPage: Function;
}

interface BlackTableState {
  page: number;
  listId: any;
}

interface colStruct {
  key: string;
  className: string;
}

class BlackTable extends React.Component<BlackTableProps, BlackTableState> {
  state = {
    page: 1,
    listId: '',
  };

  changeDetailListPage = (page: number, pageSize: number) => {
    let finalPage = page;
    this.props.changeCurrentListPage(finalPage);

    this.setState({ page: finalPage });
    if (finalPage > 0) finalPage--;

    this.props.changeSongListId(this.props.currentListId, finalPage * pageSize);
  };

  changeSong = (id: number) => {
    this.props.changeSong(id, () => {
      history.push('/music/' + id);
    });
  };

  static getDerivedStateFromProps(
    props: BlackTableProps,
    state: BlackTableState,
  ) {
    let listId = state.listId;
    if (props.currentListId.id != state.listId) listId = props.currentListId.id;

    return {
      page: props.currentDetailListPage,
      listId,
    };
  }

  render() {
    let keyMap: colStruct[] = [];
    const headerComponent = this.props.useHeader ? (
      <div className="table_header">
        {this.props.columns.map((val: any) => {
          if (val.key) keyMap.push({ key: val.key, className: val.className });
          return (
            <div className={`table_header_item ${val.className}`} key={val.key}>
              {val.render ? val.render(val) : val.title}
            </div>
          );
        })}
      </div>
    ) : undefined;

    const bodyComponent = (
      <div className="table_body">
        <WhiteScrollBar
          fullHeight={true}
          key={this.state.listId + '' + this.state.page}
        >
          {this.props.dataSource.map((val: any) => {
            return (
              <div
                className={`${this.props.itemClassName} table_body_item ${
                  this.props.currentSong && this.props.currentSong.id == val.id
                    ? 'active'
                    : ''
                }`}
                key={val.id}
                onDoubleClick={() => this.changeSong(val.id)}
              >
                {keyMap.map((i) => (
                  <div
                    className={`table_body_item_box ${i.className} ${
                      val.className ? val.className : ''
                    }`}
                    key={i.key}
                  >
                    {val[i.key]}
                  </div>
                ))}
              </div>
            );
          })}
        </WhiteScrollBar>
      </div>
    );

    const paginationComponent = (
      <Pagination
        className="black_pagination"
        current={this.state.page}
        onChange={this.changeDetailListPage}
        total={
          this.props.currentDetailListInfo
            ? this.props.currentDetailListInfo.trackCount
            : 0
        }
        pageSize={20}
        showSizeChanger={false}
      />
    );

    return (
      <div className="black_table">
        {headerComponent}
        <Spin
          spinning={this.props.loading}
          indicator={
            <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} />
          }
        >
          {bodyComponent}
          {paginationComponent}
        </Spin>
      </div>
    );
  }
}

export default connect(
  (state: { [propName: string]: any }) => ({
    currentSong: state.MusicPlayer.currentSong,
    currentDetailListInfo: state.SongList.currentDetailListInfo,
    currentListId: state.SongList.currentListId,
    loading: state.SongList.loading,
    currentDetailListPage: state.SongList.currentDetailListPage,
  }),
  {
    changeSong,
    changeSongListId,
    changeCurrentListPage,
  },
)(BlackTable);

import * as React from 'react';
import HeaderTime from './components/headerTime';
import RightNav from './components/rightNav';
import LeftNav from './components/leftNav';

import { Row, Col } from 'antd';

import './index.scss';

interface HeaderProps {}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {};
  render() {
    return (
      <Row className="row_header">
        <Col xs={7} sm={7} md={10} lg={10} xl={10} xxl={10}>
          <LeftNav />
        </Col>
        <Col xs={10} sm={10} md={4} lg={4} xl={4} xxl={4}>
          <HeaderTime />
        </Col>
        <Col xs={7} sm={7} md={10} lg={10} xl={10} xxl={10}>
          <RightNav />
        </Col>
      </Row>
    );
  }
}

export default Header;

import { Row, Col } from 'antd';
import './index.scss';

import LeftList from './leftList';
import MiddleGreeting from './middleGreeting';
import RightFunctionList from './rightFunctionList';
import BottomWeather from './topRightWeather';
import BottomSpectrum from './topLeftSpectrum';

export default function IndexPage() {
  return (
    <div className="index_page">
      <Row className="h20 spectrum">
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <BottomSpectrum />
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <BottomWeather />
        </Col>
      </Row>
      <Row className="h80">
        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <LeftList />
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MiddleGreeting />
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <RightFunctionList />
        </Col>
      </Row>
    </div>
  );
}

import { Row, Col } from 'antd';
import './index.scss';

import LeftList from './leftList';
import MiddleGreeting from './middleGreeting';
import RightFunctionList from './rightFunctionList';
import BottomWeather from './bottomWeather';
import BottomSpectrum from './bottomSpectrum';

export default function IndexPage() {
  return (
    <div className="index_page">
      <Row className="h70">
        <Col lg={6} xl={6} xxl={6}>
          <LeftList />
        </Col>
        <Col lg={12} xl={12} xxl={12}>
          <MiddleGreeting />
        </Col>
        <Col lg={6} xl={6} xxl={6}>
          <RightFunctionList />
        </Col>
      </Row>
      <Row className="h20 spectrum">
        <Col lg={12} xl={12} xxl={12}>
          <BottomSpectrum />
        </Col>
        <Col lg={12} xl={12} xxl={12}>
          <BottomWeather />
        </Col>
      </Row>
    </div>
  );
}

import { Row, Col } from 'antd';
import './index.scss';

import TransparentBox1 from '@/components/pages/transparentBox1';
import LeftList from './leftList';

export default function IndexPage() {
  return (
    <div className="index_page">
      <Row className="h70">
        <Col lg={6} xl={6} xxl={6}>
          <LeftList />
        </Col>
        <Col lg={12} xl={12} xxl={12} className="transparent_box1">
          <TransparentBox1>test</TransparentBox1>
        </Col>
        <Col lg={6} xl={6} xxl={6} className="transparent_box1">
          <TransparentBox1 title="功能按键">te</TransparentBox1>
        </Col>
      </Row>
      <Row className="h20 spectrum">
        <TransparentBox1>频谱</TransparentBox1>
      </Row>
    </div>
  );
}

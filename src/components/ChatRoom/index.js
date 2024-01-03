import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

export default function ChatRoom() {
  return (
    <div>
      <Row>
        <Col span={5}>
          <Sidebar />
        </Col>
        <Col span={19}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
}

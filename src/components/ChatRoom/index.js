import React, { useContext } from 'react';
import { Grid, Row, Col } from 'antd';
import { AlignCenterOutlined } from '@ant-design/icons';

import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { AppContext } from '../../Context/AppProvider';
const { useBreakpoint } = Grid;
export default function ChatRoom() {
  const screens = useBreakpoint();
  const { showMenu, setShowMenu } =
    useContext(AppContext);
  return (
    <div>
      {
        screens.xl !== true &&
        <AlignCenterOutlined style={{ fontSize: '25px', marginLeft: '15px', marginTop: '20px', color: '#422afb' }} onClick={() => setShowMenu(!showMenu)} />
      }
      <Row>
        <Col xs={showMenu ? 24 : 0} xl={7} >
          <Sidebar />
        </Col>
        <Col xs={!showMenu ? 24 : 0} xl={17} >
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
}

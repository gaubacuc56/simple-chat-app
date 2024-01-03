import React from 'react';
import { Row, Col, Button } from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styled from 'styled-components';
import { AppContext } from '../../Context/AppProvider';
const SidebarStyled = styled.div`
  background: #fff;
  color: white;
  height: 95vh;
  margin: 20px;
  margin-left: 35px;
  border-radius: 40px;
  position: relative;
`;

export default function Sidebar() {
  const { setIsAddRoomVisible } =
    React.useContext(AppContext);
  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <SidebarStyled>
      <Row justify='center'>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '20px'
      }}>
        <Button
          type='primary'
          style={{
            width: '90%',
            height: '40px',
            backgroundColor: '#422afb',
            borderRadius: '15px',
            border: 'none',
            outline: 'none',
            fontWeight: '600',
          }}
          className='add-room'
          onClick={handleAddRoom}
        >
          New room
        </Button>
      </div>
    </SidebarStyled>
  );
}

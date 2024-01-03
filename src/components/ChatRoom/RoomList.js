import React from 'react';
import { Collapse, Typography } from 'antd';
import styled from 'styled-components';
import { AppContext } from '../../Context/AppProvider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: #A3AED0;
      font-size: 16px;
      font-weight: 600;
      padding-bottom: 5px;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  padding-left: 5px;
  font-size: 14px;
`;

export default function RoomList() {
  const { rooms, selectedRoomId, setSelectedRoomId } =
    React.useContext(AppContext);
  console.log('selectedRoomId', selectedRoomId)
  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <PanelStyled header='Your rooms:' key='1'>
        {rooms.map((room) => (
          <LinkStyled style={{ color: selectedRoomId === room.id ? '#11047a' : '#A3AED0', fontWeight: selectedRoomId === room.id ? '600' : '500' }} key={room.id} onClick={() => setSelectedRoomId(room.id)}>
            {room.name}
          </LinkStyled>
        ))}
      </PanelStyled>
    </Collapse>
  );
}

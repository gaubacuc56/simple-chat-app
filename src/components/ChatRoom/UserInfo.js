import React from 'react';
import { Button, Avatar, Typography, Tooltip } from 'antd';
import styled from 'styled-components';

import { auth } from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';
import { AppContext } from '../../Context/AppProvider';
import { PoweroffOutlined } from '@ant-design/icons';
const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid  #e7ebf0;

  .username {
    color: #11047a;
    margin-left: 10px;
    font-weight: 600;
  }
`;

export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);
  const { clearState } = React.useContext(AppContext);

  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className='username'>{displayName}</Typography.Text>
      </div>
      <Tooltip title="Log Out">
        <PoweroffOutlined onClick={() => {
          // clear state in App Provider when logout
          clearState();
          auth.signOut();
        }}
          style={{
            color: 'red',
            fontSize: '18px',
          }}
        />
      </Tooltip>
      {/* <Button
        style={{
          borderRadius: '15px',
          fontWeight: '600'
        }}
        danger
        type="primary"
        onClick={() => {
          // clear state in App Provider when logout
          clearState();
          auth.signOut();
        }}
      >
        Log Out
      </Button> */}
    </WrapperStyled>
  );
}

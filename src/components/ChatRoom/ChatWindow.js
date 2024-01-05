import { UserAddOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Tooltip, Avatar, Form, Input, Typography } from 'antd';

import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';
import useFirestore from '../../hooks/useFirestore';
const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 30px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
      max-width: 50%;
    }

    &__title {
      margin: 0;
      font-weight: bold;
      color: #11047a;
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__description {
      font-size: 14px;
      color: #11047a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  background: #fff;
  color: white;
  height: 95vh;
  margin: 20px;
  margin-right: 35px;
  border-radius: 40px;
  @media only screen and (max-width: 1200px) {
  & {
    margin: 15px;
    height: 90vh;
  }
}
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  border: none;
  border-top: 1px solid #e7ebf0;
  padding: 0 30px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const ChatBox = styled.div`
  max-height: 92%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-left: 30px;
  &::-webkit-scrollbar{
      width: 0.35rem;
    }
  &::-webkit-scrollbar-thumb{
      background-color: #422afb;
      border-radius: 1rem;
  }
  @media only screen and (max-width: 1200px) {
    & {
        padding: 10px;
    }
  }
`

export default function ChatWindow() {
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const messageListRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };



  const handleOnSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });

    form.resetFields(['message']);

    // focus to input again after submit
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };

  const condition = React.useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore('messages', condition);

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className='header__info'>
              <p className='header__title'>{selectedRoom.name}</p>
              <span className='header__description'>
                {selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                type='text'
                onClick={() => setIsInviteMemberVisible(true)}
                style={{
                  fontSize: '16px'
                }}
              >
                Invite
              </Button>
              <Avatar.Group size='small' maxCount={2}>
                {members.map((member) => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ''
                        : member.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <ChatBox ref={messageListRef}>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                  isMyMessage={uid === mes.uid}
                />
              ))}
            </ChatBox>
            <FormStyled form={form}>
              <Form.Item name='message'>
                <Input
                  ref={inputRef}
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder='Type your message...'
                  bordered={false}
                  autoComplete='off'
                />
              </Form.Item>
              <Button
                style={{
                  backgroundColor: '#422afb',
                  border: 'none',
                  outline: 'none',
                  fontWeight: 600,
                  borderRadius: '15px',
                  width: '90px',
                  height: '40px'
                }}
                type='primary'
                onClick={handleOnSubmit}>
                Send
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography.Text style={{ fontSize: '30px', color: '#A3AED0', fontWeight: 600, textAlign: 'center' }}>Choose a room to start your chat</Typography.Text>
        </div>
      )}
    </WrapperStyled>
  );
}

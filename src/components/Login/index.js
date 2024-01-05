import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { GoogleCircleFilled, FacebookFilled } from '@ant-design/icons';

import firebase, { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';

const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const handleLogin = async (provider) => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
    if (additionalUserInfo?.isNewUser) {
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.email.toLowerCase()),
      });
    }
  };

  return (
    <Row justify='center' style={{ height: '100vh', paddingTop: '20%' }}>
      <Col xs={16} xl={8}>
        <Title style={{ textAlign: 'center' }} level={3}>
          Simple Chat
        </Title>
        <Button
          style={{ width: '100%', marginBottom: 10, height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => handleLogin(googleProvider)}
          icon={<GoogleCircleFilled style={{ fontSize: '20px' }} />}
        >
          Login with Google account
        </Button>
        <Button
          style={{ width: '100%', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => handleLogin(fbProvider)}
          icon={<FacebookFilled style={{ fontSize: '20px' }} />}
        >
          Login with Facebook account
        </Button>
      </Col>
    </Row>
  );
}

import React, { useContext, useState } from 'react';
import { Form, Modal, Input } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const [formStatus, setFormStatus] = useState([])
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    let errorFields = []
    for (const [key, value] of Object.entries(form.getFieldsValue())) {
      if (value === undefined || value.length === 0)
        errorFields.push(key)
    }
    if (errorFields.length > 0)
      setFormStatus(errorFields)
    else {
      // handle logic
      // add new room to firestore
      addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });
      // reset form value
      setFormStatus([])
      form.resetFields();
      setIsAddRoomVisible(false);
    }
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();

    setIsAddRoomVisible(false);
  };

  return (
    <Modal
      title='New room'
      visible={isAddRoomVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        style: {
          backgroundColor: '#422afb',
          border: 'none',
          outline: 'none',
          fontWeight: 600,
          borderRadius: '15px',
          width: '90px',
          height: '40px'
        }
      }}
      cancelButtonProps={{
        style: {
          fontWeight: 600,
          borderRadius: '15px',
          width: '90px',
          height: '40px'
        }
      }}
    >
      <Form form={form} layout='vertical'>
        <Form.Item label='Room name' name='name' style={{ fontWeight: 600 }} >
          <Input style={{ borderRadius: '10px' }} placeholder='Enter room name' required status={formStatus.includes('name') ? 'error' : ''} />
        </Form.Item>
        <Form.Item label='Room description' name='description' style={{ fontWeight: 600 }}>
          <Input.TextArea style={{ borderRadius: '10px' }} placeholder='Enter room description' required status={formStatus.includes('description') ? 'error' : ''} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

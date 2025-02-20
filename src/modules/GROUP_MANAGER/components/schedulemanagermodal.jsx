import React, { useState, useEffect } from 'react';
import { Button, Flex, Modal } from 'antd';

const ScheduleManagerModal= (props) => {
    const [open, setOpen] = useState(false);
    const [item_id, setItem_id] = useState(null);



    useEffect(()=>{
        if (props.on_open){
            setOpen(true);  
        }
    },[props.on_open]);

    const onCloseAction = ()=>{
        setOpen(false)
        if (props.on_close){
            props.on_close();
        }
    }

  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* Basic */}

      <Button type="primary" onClick={() => setOpen(false)}>
        Open Modal of responsive width
      </Button>
      <Modal
        title="Менеджер графиков"
        centered
        open={open}
        cancelText={''}
        footer={<Button onClick={onCloseAction}>Ok</Button>}
        onCancel={onCloseAction}
        // width={{
        //   xs: '90%',
        //   sm: '80%',
        //   md: '70%',
        //   lg: '60%',
        //   xl: '50%',
        //   xxl: '40%',
        // }}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </Flex>
  );
};

export default ScheduleManagerModal;
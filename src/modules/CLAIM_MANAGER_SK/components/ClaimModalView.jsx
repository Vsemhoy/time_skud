import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

const ClaimModalView = (props) => {
    const [itemId, setItemId] = useState(0);
    const [opened, setOpened] = useState(false);

    useEffect(() => {
      console.log('itemId', itemId)
      if (props.open){
        setItemId(props.item_id);
        setOpened(true);
      }
    }, [props.open]);


    const handleCloseForm = () =>{

        setOpened(false);
        if (props.on_close){
          props.on_close();
        }
    }

  return (
    <Modal
        open={opened}
        onCancel={handleCloseForm}
        onClose={handleCloseForm}
         title="Basic Modal"
    >   
        <div>HEllo wolf!</div>
    </Modal>
  );
};

export default ClaimModalView;
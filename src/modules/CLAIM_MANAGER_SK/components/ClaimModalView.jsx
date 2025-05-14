import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

const ClaimModalView = (props) => {
    const [itemId, setItemId] = useState(0);
    const [opened, setOpened] = useState(false);

    useEffect(() => {
      if (props.item_id && props.open){
        setItemId(props.item_id);
        setOpened(props.open);
      }
    }, [props.open]);


    const handleCloseForm = () =>{

        setOpened(false);
    }

  return (
    <Modal
        open={opened}
        onCancel={handleCloseForm}
        onClose={handleCloseForm}
    >   
        <div>HEllo wolf!</div>
    </Modal>
  );
};

export default ClaimModalView;
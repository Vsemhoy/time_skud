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
    centered
        open={opened}
        onCancel={handleCloseForm}
        onClose={handleCloseForm}
        title="Basic Modal"
    >   
        <div className={'sk-claim-modalinfo-body'}>
          <div className={'sk-claim-modalinfo-row'}>
            <div>Param</div>
            <div>value</div>
          </div>
          <div className={'sk-claim-modalinfo-row'}>
            <div>Param</div>
            <div>value</div>
          </div>
          <div className={'sk-claim-modalinfo-row'}>
            <div>Param</div>
            <div>value</div>
          </div>
          <div className={'sk-claim-modalinfo-row'}>
            <div>Param</div>
            <div>value</div>
          </div>
          <div className={'sk-claim-modalinfo-row'}>
            <div>Param</div>
            <div>value</div>
          </div>
          <div className={'sk-claim-modalinfo-row'}>
            <div>Param</div>
            <div>value</div>
          </div>
          <div className={'sk-claim-modalinfo-row'}>
            <div>Param</div>
            <div>value</div>
          </div>
          <div className={'sk-claim-modalinfo-row'}>
            <div>Param</div>
            <div>value</div>
          </div>
          <div className={'sk-claim-modalinfo-row'}>
            <div>Param</div>
            <div>value</div>
          </div>
          <div className={'sk-claim-modalinfo-row'}>
            <div>Param</div>
            <div>value</div>
          </div>
        </div>
    </Modal>
  );
};

export default ClaimModalView;
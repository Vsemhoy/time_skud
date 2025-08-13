import React from 'react';
import {Modal} from "antd";

const BillListModal = (props) => {
    return (
        <Modal
            title="Расчетный лист офис"
            closable={{ 'aria-label': 'Custom Close Button' }}
            footer={null}
            open={props?.isOpenBillListModal}
            onCancel={props?.handleCloseBillListModal}
            width={'90vw'}
            styles={{
                body: {
                    height: "70vh",
                    overflowY: "auto"
                }
            }}
        >
            <div style={{width: '100%', height: '100%'}}>

            </div>
        </Modal>
    );
}

export default BillListModal;

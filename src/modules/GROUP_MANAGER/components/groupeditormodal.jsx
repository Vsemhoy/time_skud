import React, { useState, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const { TextArea } = Input;

const GroupEditorModal = (props) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

  useEffect(() => {
    setOpen(props.open);
    setTargetId(props.target_id);

    if (props.item_list) {
      const targetItem = props.item_list.find(item => item.id == props.target_id);
      if (targetItem) {
        form.setFieldsValue({
          name: targetItem.name,
          description: targetItem.description
        });
        console.log('element', targetItem);
      }
    }
  }, [props, form]);

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
    if (props.on_cancel) {
      props.on_cancel();
    }
  };

  const onSave = () => {
    form.validateFields().then(values => {
      setOpen(false);
      if (props.on_save) {
        props.on_save(values);
      }
    });
  };

  const handleTextChange = (e, maxLength) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      form.setFieldsValue({ [e.target.id]: value });
    } else {
      form.setFieldsValue({ [e.target.id]: value.slice(0, maxLength) });
    }
  };

  return (
    <Modal
      title={"Редактирование группы: " + targetId}
      centered
      open={open}
      onOk={onSave}
      onCancel={onCancel}
      width={600}
      okText={"Сохранить"}
      cancelText={"Закрыть"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Название группы"
          name="name"
          rules={[
            { required: true, message: 'Введите название группы' },
            {    min: 9, 
                message: 'Минимум 9 символов'
            },
            {   max: 60, 
                message: 'Максимум 60 символов'
            }
          ]}
        >
          <Input placeholder="Название группы"
            onChange={(e) => handleTextChange(e, 50)}
           />
        </Form.Item>
        
        <Form.Item
          label="Короткое описание"
          name="description"
          rules={[
            {   max: 450, 
                message: 'Максимум 500 символов'
            }
          ]}
        >
          <TextArea 
            placeholder="Описание"
            autoSize={{ minRows: 3, maxRows: 6 }}
            style={{ maxHeight: '150px', overflowY: 'auto' }}
            onChange={(e) => handleTextChange(e, 500)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GroupEditorModal;

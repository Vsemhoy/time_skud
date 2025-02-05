import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;

const GroupEditorModal = (props) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [ctrKey, setCtrlKey] = useState(false);
  const [usedCompany, setUsedCompany] = useState(0);

  useEffect(() => {
    setOpen(props.open);
    setTargetId(props.target_id);
    setCtrlKey(props.ctrl_key);
    console.log('ctrl_key', props.ctrl_key);

    if (props.item_list) {
      const targetItem = props.item_list.find(item => item.id == props.target_id);
      if (targetItem) {
        form.setFieldsValue({
          name: targetItem.name,
          description: targetItem.description,
          id_company: targetItem.id_company
        });
        console.log('element', targetItem);
      } else {
        form.setFieldsValue({
          name: "Группа_" + dayjs().unix(),
          description: "",
          id_company: props.user_data.user.id_company
        });
      }
    }
  }, [props, form]);



    const [companies, setCompanies] = useState([]);

    useEffect(() => {
      if (props.user_data && props.user_data.companies) {
          setCompanies(
              props.user_data.companies.reverse().map((com) => ({
                  key: com.id,
                  value: Number(com.id),
                  label: com.name,
              }))
          );
      }
      console.log(props.user_data);

  }, [props.user_data, open]);
  

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
      values.id = targetId;
      values.deleted = 0;
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

  const deleteGroup = () => {
    if (props.on_delete)
    {
      props.on_delete(targetId);
    }
  }

  return (
    <Modal
      title={ targetId === null ? "Создание новой группы" : "Редактирование группы: " + targetId}
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
          {companies.length > 1 ? (
          <Form.Item
            name="id_company"
            label="Подразделение"
          >
              <Select 
                  options={companies}
                  // value={usedCompany !== 0 ? usedCompany : props.user_data.user.id_company} 
                  style={{ minWidth: 140 }}
                  onChange={(value)=>{setUsedCompany(value)}}
                  disabled={!(targetId === null || targetId === 0)}
              />
          </Form.Item>
                ) : ''}


        {ctrKey ? (
          <Form.Item

          >
            <Button  type="primary"
              onClick={deleteGroup}
              danger>Удалить группу и отвязать всех пользователей</Button>
          </Form.Item>
        ) : ""}
        
      </Form>
    </Modal>
  );
};

export default GroupEditorModal;

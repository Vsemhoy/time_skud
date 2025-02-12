import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select, Switch } from 'antd';
import dayjs from 'dayjs';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';
import { CSRF_TOKEN } from '../../../CONFIG/config';

const { TextArea } = Input;

const RuleEditorModal = (props) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [ctrKey, setCtrlKey] = useState(false);
  const [ruleType, setRuleType] = useState(1);
  const [usedCompany, setUsedCompany] = useState(0);

  const [varText1, setVarText1] = useState("Условие 1");
  const [varText2, setVarText2] = useState("Условие 2");

  const [editedItem, setEditedItem] = useState(null);

  useEffect(() => {
    setOpen(props.open);
    setTargetId(props.target_id);
    setCtrlKey(props.ctrl_key);
    console.log('ctrl_key', props.ctrl_key);

    if (props.item_list) {
      const targetItem = props.item_list.find(item => item.id == props.target_id);
      if (targetItem) {
        setRuleType(targetItem.rule_type_id);
        form.setFieldsValue({
          name: targetItem.name,
          rule_type_id: targetItem.rule_type_id,
          id_company: targetItem.id_company,
          duration_time: targetItem.duration_time !== 0 ? targetItem.duration_time / 60 : 0,
          variable_a: targetItem.variable_a,
          variable_b: targetItem.variable_b,
        });
        get_groupItem();
        console.log('element', targetItem);
      } else {
        setRuleType(1);
        form.setFieldsValue({
          name: "Правило_" + dayjs().unix(),
          rule_type_id: 1,
          id_company: props.user_data.user.id_company,
          duration_time: 60,
          variable_a: 0,
          variable_b: 0,
        });
        setEditedItem(null);
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
  

  useEffect(()=>{
    for (let i = 0; i < props.type_list.length; i++) {
        const el = props.type_list[i];
        if (el.id === ruleType){
            setVarText1(el.variable_a);
            setVarText2(el.variable_b);
            break;
        }
        
    }
  },[ruleType]);



     /* Получение одной группы
     * @param {*} req 
     * @param {*} res 
     */
    const get_groupItem = async (item_id, req, res ) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/group/groups_get/' + item_id, 
                {
                    data: {},
                    _token: CSRF_TOKEN
                });
            console.log('departs', response);
            setEditedItem(response.data.data);
        } catch (e) {
            console.log(e)
        } finally {
            
        }
    }

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


  const changeRuleType = (value) => {
    setRuleType(value);
  }

  return (
    <Modal
      title={ targetId === null ? "Создание нового правила учёта времени" : "Редактирование правила учёта времени: " + targetId}
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
          label="Название правила"
          name="name"
          rules={[
            { required: true, message: 'Введите название правила' },
            {    min: 9, 
                message: 'Минимум 9 символов'
            },
            {   max: 120, 
                message: 'Максимум 120 символов'
            }
          ]}
        >
          <Input placeholder="Название правила"
            onChange={(e) => handleTextChange(e, 120)}
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


        
        <Form.Item
                label="Тип правила обработки рабочего времени"
                name="rule_type_id"
                rules={[ 
                    {  required: true
                    }
                ]}
                >

        <Select
                defaultValue={1}
                style={{ width: '100%' }}
                value={1}
                onChange={changeRuleType}
                options={props.type_list.map((com) => ({
                key: com.id,
                value: Number(com.id),
                label: com.name,
            }))
            }
                />
        </Form.Item>

        <Form.Item
          label="Временной интервал в минутах"
          name="duration_time"
          type="number"
          rules={[
            { required: true, message: 'Укажите длительность периода' },
          ]}
        >
          <Input placeholder="Длетельность"
            onChange={(e) => handleTextChange(e, 120)} type='number'
           />
        </Form.Item>

        <Form.Item
          label={varText1}
          name="variable_a"
          type="boolean"
          rules={[]}
        >
            <Switch defaultChecked ></Switch>
        </Form.Item>

        <Form.Item
          label={varText2}
          name="variable_b"
          type="boolean"
          rules={[]}
        >
            <Switch defaultChecked ></Switch>
        </Form.Item>


        {ctrKey ? (
          <Form.Item

          >
            <Button  type="primary"
              onClick={deleteGroup}
              danger>Удалить группу и отвязать всех пользователей</Button>
          </Form.Item>
        ) : ""}
        
      </Form>
      {editedItem ? (
      <div className={'sk-modal-stat'}>
          <table>
            <tbody>
              <tr>
                <td>Создатель</td>
                <td>{editedItem.surname} {editedItem.name} {editedItem.patronymic}</td>
              </tr>
              <tr>
                <td>Дата создания</td>
                <td>{editedItem.created_at}</td>
              </tr>
              <tr>
                <td>Последнее обновление</td>
                <td>{editedItem.updated_at}</td>
              </tr>
            </tbody>
          </table>

      </div>
      ) : ""}

    </Modal>
  );
};

export default RuleEditorModal;

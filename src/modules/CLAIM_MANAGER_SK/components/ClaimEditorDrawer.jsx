import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
const { Option } = Select;
const ClaimEditorDrawer = (props) => {
  const [open, setOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');

  const [formType, setFormType] = useState(0);

  const [formUsers, setFormUsers] = useState([]); // all 
  const [formDateRange, setFormDateRange] = useState([dayjs(), dayjs()]); // All

  const [formTargetPoint, setFormTargetPoint] = useState('');     // 7, 8,
  const [formTargetAddress, setFormTargetAddress] = useState(''); // 7, 8,
  const [formContactFace, setFormContactFace] = useState('');     // 7, 8,
  const [formContactFacePhone, setFormContactFacePhone] = useState('');  // 7, 8,
  const [formTask, setFormTask] = useState('');                   // 7, 11, 8,
  const [formComment, setFormComment] = useState('');             // 7, 8, 10
  const [formSubwayCount, setFormSubwayCount] = useState(0);      // 7, 8,
  const [formBusCount, setFormBusCount] = useState(0);            // 7, 8,

  const [formReason, setFormReason] = useState('');               // 9, 

  const [formDescription, setFormDescription] = useState('');     // 6,
  const [formDiseaseNumber, setFormDiseaseNumber] = useState(''); // 6,
  
  const [formResult, setFormResult] = useState('');               // 11,
  
  const [userList, setUserList] = useState([]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    if (props.on_close){
        props.on_close();
    }
  };

  useEffect(()=>{
    if (props.user_list){
      setUserList(props.user_list.map((item)=>{
        return {
          'key': `userkey_${item.id}`,
          'value': item.id,
          'label': <div className={'sk-flex-space'}><div>{item.surname + " " + item.name + " " + item.patronymic}</div> <div>{item.id}</div></div>,
        }
      }));
    }
  },[props.user_list]);

  useEffect(()=>{
    if (props.opened){
        setOpen(true);
        refreshForm();
        let title = "";
        if (props.claim_types)
        {
          title = props.claim_types.find((item)=> item.value === props.claim_type)?.label;
          setFormType(props.claim_type);
        }
        setPageTitle(title);
    }
  },[props.opened, props.claim_type]);
  

  const refreshForm = () => {
    setFormUsers([]);
    setFormTargetPoint('');
    setFormTargetAddress('');
    setFormContactFace('');
    setFormContactFacePhone('');
    setFormTask('');
    setFormComment('');
    setFormSubwayCount(0);
    setFormBusCount(0);
    setFormReason('');
    setFormDescription('');
    setFormDiseaseNumber('');
    setFormResult('');
  }


  const handleSubmitForm = ()=>{
    let res2 = {};
    let result = {};
    result.start = formDateRange[0].format('YYYY-MM-DD HH:mm:ss');
    result.end = formDateRange[1].format('YYYY-MM-DD HH:mm:ss');
    result.users = formUsers;
    result.skud_current_state_id = formType;
    result.state = 0;
    result.days_count = formDateRange[1].diff(formDateRange[0], 'day') + 1;

    if (formTargetPoint?.trim()){
      res2.target_point = formTargetPoint;
    };
    if (formTargetAddress?.trim()){
      res2.target_address = formTargetAddress;
    };
    if (formContactFace?.trim()){
      res2.contact_person = formContactFace;
    };
    if (formContactFacePhone?.trim()){
      res2.contact_phone = formContactFacePhone;
    };
    if (formTask?.trim()){
      res2.task = formTask;
    };
    if (formComment?.trim()){
      res2.comment = formComment;
    };
    if (formSubwayCount > 0){
      res2.subway_count = parseInt(formSubwayCount);
    };
    if (formBusCount > 0){
      res2.bus_count = parseInt(formBusCount);
    };
    if (formReason?.trim()){
      res2.reason = formReason;
    };
    if (formDescription?.trim()){
      res2.description = formDescription;
    };
    if (formDiseaseNumber?.trim()){
      res2.disease_number = formDiseaseNumber;
    };
    if (formResult?.trim()){
      res2.result = formResult;
    };

    result.info = res2;

    console.log(result);
  }


  return (
    <>
      
      <Drawer
        title={'Заявка на: ' + pageTitle + " " + props.claim_type}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmitForm} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <div style={{display: 'flex', flexDirection: 'column'}}>

        <div>
          <div style={{padding: '9px 0px'}}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Сотрудник</span>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder={'Имя пользователя'}
                    options={userList}
                
                    />
            </div>

            {/* Диапазон дат с временем */}
            {(formType === 7 || formType === 8 || formType === 9) && (
            <div style={{padding: '9px 0px'}}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Время начала и конца</span>
              <div className={'sk-flex-space'}>
                <DatePicker.RangePicker
                    showTime
                    showSecond={false}
                    style={{ width: '100%' }}
                    value={formDateRange}
                    onChange={setFormDateRange}
                />
                <Button
                onClick={()=>{setFormDateRange([formDateRange[0], formDateRange[0]])}}
              >Сравнять</Button>
              </div>
            </div>
            )}
            {/* Диапазон дат */}
            {(formType === 10 || formType === 6) && (
              <div style={{padding: '9px 0px'}}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Начальная и конечная даты</span>
                <div className={'sk-flex-space'}>
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  value={formDateRange}
                  onChange={setFormDateRange}
              />
              <Button
                onClick={()=>{setFormDateRange([formDateRange[0], formDateRange[0]])}}
              >Сравнять</Button>
              </div>
                          </div>
            )}
            {/* Просто дата */}
            {(formType === 11 || formType === 13) && (
              <div style={{padding: '9px 0px'}}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Дата события</span>
                <DatePicker
                style={{ width: '100%' }}
                value={formDateRange[0]}
                onChange={(date)=>{setFormDateRange([date, date])}}
            />
                        </div>
            )}

        </div>

        <div style={{display:'grid', gridTemplateColumns: '48% 48%', gridGap: '0px 4%'}}>





            {(formType === 7 || formType === 8) && (
            <div style={{padding: '9px 0px'}}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Место назначения</span>
                <TextArea
                    style={{ width: '100%' }}
                    value={formTargetPoint}
                    onChange={(ev)=>{setFormTargetPoint(ev.target.value)}}
                    allowClear={true}
                    />
            </div>
            )}
            {(formType === 7 || formType === 8) && (
            <div style={{padding: '9px 0px'}}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Адрес</span>
                <TextArea
                    style={{ width: '100%' }}
                    value={formTargetAddress}
                    onChange={(ev)=>{setFormTargetAddress(ev.target.value)}}
                    allowClear={true}
                    />
            </div>
              )}
              {(formType === 7 || formType === 8) && (
            <div style={{padding: '9px 0px'}}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Контактное лицо</span>
                <Input
                    style={{ width: '100%' }}
                    placeholder={'Имя пользователя'}
                    allowClear={true}
                    value={formContactFace}
                    onChange={(ev)=>{setFormContactFace(ev.target.value)}}
                    />
            </div>
            )}
            {(formType === 7 || formType === 8) && (
            <div style={{padding: '9px 0px'}}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Телефон контактного лица</span>
                <Input
                    style={{ width: '100%' }}
                    placeholder={'Имя пользователя'}
                    allowClear={true}
                    value={formContactFacePhone}
                    onChange={(ev)=>{setFormContactFacePhone(ev.target.value)}}
                    />
            </div>
            )}
            {(formType === 7 || formType === 8) && (
            <div style={{padding: '9px 0px'}}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Количество поездок метро</span>
                <Input
                  type='number'
                  min={0}
                    style={{ width: '100%' }}
                    placeholder={'Имя пользователя'}
                    allowClear={true}
                    value={formSubwayCount}
                    onChange={(ev)=>{setFormSubwayCount(ev.target.value)}}
                    />
            </div>
            )}

            {(formType === 7 || formType === 8) && (
            <div style={{padding: '9px 0px'}}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Количество поездок на наземном трансп.</span>
                <Input
                    type='number'
                    min={0}
                    style={{ width: '100%' }}
                    placeholder={'Имя пользователя'}
                    allowClear={true}
                    value={formBusCount}
                    onChange={(ev)=>{setFormBusCount(ev.target.value)}}
                    />
            </div>
            )}

        </div>



        <div>
        {formType === 9 && (
          <div>
            <div style={{padding: '9px 0px'}}>
                <span className={'sk-usp-filter-col-label sk-labed-um'}>Причина</span>
                  <TextArea
                      style={{ width: '100%' }}
                      allowClear={true}
                      value={formReason}
                      onChange={(ev)=>{setFormReason(ev.target.value)}}
                      />
              </div>
          </div>
        )}

          {formType === 6 && (
            <div>
              <div style={{padding: '9px 0px'}}>
                  <span className={'sk-usp-filter-col-label sk-labed-um'}>Описание, доп. информация</span>
                    <TextArea
                        style={{ width: '100%' }}
                        allowClear={true}
                        value={formDescription}
                        onChange={(ev)=>{setFormDescription(ev.target.value)}}
                        />
                </div>
            </div>
          )}

          {(formType === 7 || formType === 8 || formType === 10 || formType === 13) && (
            <div>
              <div style={{padding: '9px 0px'}}>
                  <span className={'sk-usp-filter-col-label sk-labed-um'}>Комментарий</span>
                    <TextArea
                        style={{ width: '100%' }}
                        allowClear={true}
                        value={formComment}
                        onChange={(ev)=>{setFormComment(ev.target.value)}}
                        />
                </div>
            </div>
          )}

        {/* only for extra time */}
        {formType === 11 && (
            <div>
              <div style={{padding: '9px 0px'}}>
                  <span className={'sk-usp-filter-col-label sk-labed-um'}>Задача</span>
                    <TextArea
                        style={{ width: '100%' }}
                        allowClear={true}
                        value={formTask}
                        onChange={(ev)=>{setFormTask(ev.target.value)}}
                        />
                </div>
            </div>
          )}
          {formType === 11 && (
            <div>
              <div style={{padding: '9px 0px'}}>
                  <span className={'sk-usp-filter-col-label sk-labed-um'}>Результат</span>
                    <TextArea
                        style={{ width: '100%' }}
                        allowClear={true}
                        value={formResult}
                        onChange={(ev)=>{setFormResult(ev.target.value)}}
                      />
                </div>
            </div>
          )}
        </div>

        </div>
      </Drawer>
    </>
  );
};
export default ClaimEditorDrawer;
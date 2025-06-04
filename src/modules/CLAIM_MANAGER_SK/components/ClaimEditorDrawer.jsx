import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
const { Option } = Select;



const ClaimEditorDrawer = (props) => {
  const [open, setOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');

  const [itemId, setItemId] = useState(null);
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
  
  const [baseUserList, setBaseUserList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [acls, setAcls] = useState({});
  const [editMode, setEditMode] = useState('create');
  const [formValid, setFormValid] = useState(true);

  const [MYID, setMYID] = useState(0);

  const [personalModeUser, setPersonalModeUser] = useState(null);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    if (props.on_close){
        props.on_close();
    }
  };

  useEffect(() => {
    if (props.opened){
      setOpen(true);
    };
    let title = "";
    console.log(editMode);
    if (editMode === 'update' && props.data){
      console.log(props.data);
      let res2 = JSON.parse(props.data.info);

      /// ДОделать тут
      if (res2.target_address){
        setFormTargetAddress(res2.target_address);
      };

      if (res2.contact_person){
        setFormContactFace(res2.contact_person);
      };
      if (res2.contact_phone){
        setFormContactFacePhone(res2.contact_phone);
      };


      if (res2.task){
        setFormTask(res2.task);
      };
      if (res2.comment){
        setFormComment(res2.comment);
      };

      if (res2.subway_count){
        setFormSubwayCount(res2.subway_count);
      };
      if (res2.bus_count){
        setFormBusCount(res2.bus_count);
      };

      if (res2.reason){
        setFormReason(res2.reason);
      };
      if (res2.description){
        setFormDescription(res2.description);
      };

      if (res2.disease_number){
        setFormDiseaseNumber(res2.disease_number);
      };
      if (res2.result){
        setFormResult(res2.result);
      };

      setFormDateRange([dayjs(props.data.start), props.data.end ? dayjs(props.data.end) : null]);
      setItemId(props.data.id);
      setFormType(props.data.skud_current_state_id);

      if (props.claim_types)
        {
          title = props.claim_types.find((item)=> item.value === props.data.skud_current_state_id)?.label;
        }
    } else if (editMode === 'create'){

        setItemId(null);
        refreshForm();
        setFormType(props.claim_type);
        if (props.claim_types)
        {
          title = props.claim_types.find((item)=> item.value === props.claim_type)?.label;
        }
    }
    console.log(props.claim_types);

        setPageTitle(title);
  }, [props.opened, props.claim_type, props.claim_types, props.data, editMode]);




  useEffect(() => {
    setEditMode(props.mode);
  }, [props.mode]);

  useEffect(() => {
    setAcls(props.acl_base)
  }, [props.acl_base]);


  useEffect(() => {
    setMYID(props.my_id);
  }, [props.my_id]);

  useEffect(()=>{
    masterFilterUserList();
  },[baseUserList, acls, formType]);


  const masterFilterUserList = ()=>{
    
    let filteredUsers = [];
    console.log(acls);
    for (let i = 0; i < baseUserList.length; i++) {
      const userCard = baseUserList[i];
      // console.log(userCard);
      if (acls[userCard.id_company] && acls[userCard.id_company][formType] && acls[userCard.id_company][formType]?.includes('ANY_CLAIM_CREATE')){
        // фильтр, если есть привилегия создавать для всех в компании, добавляем в список
        filteredUsers.push(userCard);
        setPersonalModeUser(null);
      } else if (userCard.boss_id === MYID && acls[userCard.id_company] && acls[userCard.id_company][formType] && acls[userCard.id_company][formType]?.includes('TEAM_CLAIM_CREATE')){
        // Если челик мой подчиненный и у меня есть права добавлять подчиненным
        filteredUsers.push(userCard);
        setPersonalModeUser(null);
      } else if (userCard.id === MYID && acls[userCard.id_company] && acls[userCard.id_company][formType] && acls[userCard.id_company][formType]?.includes('PERS_CLAIM_CREATE')){
        filteredUsers.push(userCard);
        setPersonalModeUser(userCard);
      }
    }

      setUserList(filteredUsers.map((item)=>{
        return {
          'key': `userkey_${item.id}`,
          'value': item.id,
          'label': <div className={'sk-flex-space'}><div>{item.surname + " " + item.name + " " + item.patronymic}</div> <div>{item.id}</div></div>,
        }
      }));
    
  }


  useEffect(()=>{
    if (props.user_list){
      setBaseUserList(props.user_list);
    }
  },[props.user_list]);

  // useEffect(()=>{
  //   if (props.opened){
  //     setOpen(true);
  //     if (editMode === 'create'){
  //       setItemId(null);
  //       refreshForm();
  //     };
  //       let title = "";
  //       if (props.claim_types)
  //       {
  //         title = props.claim_types.find((item)=> item.value === props.claim_type)?.label +  itemId ? (" [" + itemId + "]"): "";
  //         setFormType(props.claim_type);
  //       }
  //       setPageTitle(title);
  //   }
  // },[props.opened, props.claim_type, editMode]);
  

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

    // console.log(result);
    if (props.on_send){
      if (itemId){
        result.id = itemId;
      };
      props.on_send(result, editMode);
    }
  }


  useEffect(()=>{
    // console.log('HELLOFD');
    if (formUsers.length > 0){
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  },[formUsers]);

  return (
    <>
      
      <Drawer
        title={'Заявка: ' + pageTitle + " " + props.claim_type}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button onClick={handleSubmitForm} type="primary">
        //       Submit
        //     </Button>
        //   </Space>
        // }
      >
        <div style={{display: 'flex', flexDirection: 'column'}}>

        <div>
          <div style={{padding: '9px 0px'}}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Сотрудник</span>
                {editMode === 'create' ? (
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder={'Имя пользователя'}
                    options={userList}
                      onChange={setFormUsers}
                    />
                ) : (
                  <Input value={`${props.data?.usr_surname} ${props.data?.usr_name} ${props.data?.usr_patronymic}`}  />
                )}

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
          <br />
          <br />
          <div>
            {formValid || itemId ? (
              <Button type={'primary'} onClick={handleSubmitForm} block>Отправить</Button>
            ): (
              <Button danger disabled block>Отправить</Button>
                        )} 
          </div>

        </div>
      </Drawer>
    </>
  );
};
export default ClaimEditorDrawer;
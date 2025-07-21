import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, TimePicker, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
const { Option } = Select;


function nl2br(str) {
  if (typeof str !== 'string') return str;
  return str.split(/\r\n|\n|\r/).map((line, idx, arr) => (
    <React.Fragment key={idx}>
      {line}
      {idx < arr.length - 1 && <br />}
    </React.Fragment>
  ));
}



const ClaimEditorDrawer = (props) => {
  const [open, setOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [pageСolor, setPageColor] = useState('');

  const [itemId, setItemId] = useState(null);
  const [formType, setFormType] = useState(0);

  const [formUsers, setFormUsers] = useState([]); // all 
  const [formDateRange, setFormDateRange] = useState([dayjs(), dayjs().endOf('day')]); // All

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

  const [userCard, setUserCard] = useState(null);
  const [allowBack, setAllowBack] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);
  const [allowApprove, setAllowApprove] = useState(false);
  const [allowDecline, setAllowDecline] = useState(false);

  // const [personalModeUser, setPersonalModeUser] = useState(null);


  const onClose = () => {
    console.log('CLOSE TRIGGER');
    setEditMode('read');
    if (props.on_close){
      props.on_close();
    }
    setOpen(false);
  };



  useEffect(() => {
    if (props.opened){
      refreshForm();
      setOpen(true);
    } else {
      return;
    }
    let title = "";
    let color = "#999999";
    console.log(editMode);
    if (editMode === 'update' || editMode === 'read' && props.data){
      setUserCard(props.data);
      console.log(props.data);
      let res2 = JSON.parse(props.data.info);
      if (res2) {
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

        if (res2.target_point){
          setFormTargetPoint(res2.target_point);
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
      }

      setFormDateRange([dayjs(props.data.start), props.data.end ? dayjs(props.data.end) : null]);
      setItemId(props.data.id);
      setFormType(props.data.skud_current_state_id);

      if (props.claim_types)
        {
          const q = props.claim_types.find((item)=> item.value === props.data.skud_current_state_id);
          title = q?.label;
          color = q?.color;
        }
    } else if (editMode === 'create'){

        setItemId(null);
        refreshForm();
        setFormType(props.claim_type);
        if (props.claim_types)
        {
          const q = props.claim_types.find((item)=> item.value === props.claim_type);
          title = q?.label;
          color = q?.color;
        }
    }
    console.log(props.claim_types);

        setPageTitle(title);
        setPageColor(color);

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

  useEffect(() => {
    setAllowApprove(false);
    setAllowBack(false);
    setAllowDecline(false);
    setAllowEdit(false);
    if (editMode === 'read' && userCard){
      masterSetReadOptions();
    };
  }, [userCard, editMode]);

  const masterSetReadOptions = () => {
    if  (userCard.evaluated === 0 && userCard.user_id === MYID && props.acl_base[userCard.id_company] && props.acl_base[userCard.id_company][userCard.skud_current_state_id] && props.acl_base[userCard.id_company][userCard.skud_current_state_id]?.includes('PERS_CLAIM_CREATE')){
        // Заявку можно отозвать вчера и если она не согласована
        if (!userCard.state !== 1){
          setAllowBack(true);
        }
        let start = dayjs(userCard.start).startOf('day').unix();
        let today = dayjs().startOf('day').unix();
        if (start > today){
          setAllowBack(true);
        }
    };


    if (props.acl_base[userCard.id_company] && props.acl_base[userCard.id_company][userCard.skud_current_state_id] && props.acl_base[userCard.id_company][userCard.skud_current_state_id]?.includes('ANY_CLAIM_UPDATE')){
        // фильтр, если есть привилегия создавать для всех в компании, добавляем в список
        setAllowEdit(true);
    } else if (userCard.boss_id === MYID && props.acl_base[userCard.id_company] && props.acl_base[userCard.id_company][userCard.skud_current_state_id] && props.acl_base[userCard.id_company][userCard.skud_current_state_id]?.includes('TEAM_CLAIM_UPDATE')){
        // Если челик мой подчиненный и у меня есть права добавлять подчиненным
        setAllowEdit(true);
    } else if (userCard.user_id === MYID && props.acl_base[userCard.id_company] && props.acl_base[userCard.id_company][userCard.skud_current_state_id] && props.acl_base[userCard.id_company][userCard.skud_current_state_id]?.includes('TEAM_CLAIM_UPDATE')){
      setAllowEdit(true);
    };

    if (userCard.need_approved === 1)
    {
        // Согласовываем только те, что требуют согласования
        if (props.acl_base[userCard.id_company] && props.acl_base[userCard.id_company][userCard.skud_current_state_id] && props.acl_base[userCard.id_company][userCard.skud_current_state_id]?.includes('ANY_CLAIM_APPROVE')){
            // фильтр, если есть привилегия согласовывать кому угодно
            if (userCard.state !== 1){
              setAllowApprove(true);
              setAllowDecline(true);
            } else {
                let start = dayjs(userCard.start).startOf('day').unix();
                let today = dayjs().startOf('day').unix();
                if (start > today){
                  setAllowDecline(true);
                }
            }
        } else if (userCard.boss_id === MYID && props.acl_base[userCard.id_company] && props.acl_base[userCard.id_company][userCard.skud_current_state_id] && props.acl_base[userCard.id_company][userCard.skud_current_state_id]?.includes('TEAM_CLAIM_APPROVE')){
            // Если челик мой подчиненный и у меня есть право ему согласовывать
            if (userCard.state !== 1){
              setAllowApprove(true);
              setAllowDecline(true);
            } else {
                let start = dayjs(userCard.start).startOf('day').unix();
                let today = dayjs().startOf('day').unix();
                if (start > today && userCard.state === 1){
                  setAllowDecline(true);
                }
            }
        } else if (userCard.user_id === MYID && props.acl_base[userCard.id_company] && props.acl_base[userCard.id_company][userCard.skud_current_state_id] && props.acl_base[userCard.id_company][userCard.skud_current_state_id]?.includes('PERS_CLAIM_APPROVE')){
            if (userCard.state !== 1){
              setAllowApprove(true);
              setAllowDecline(true);
            } else {
                let start = dayjs(userCard.start).startOf('day').unix();
                let today = dayjs().startOf('day').unix();
                if (start > today && userCard.state === 1){
                  setAllowDecline(true);
                }
            }
        };
    }
  }

  const masterFilterUserList = ()=>{
    
    let filteredUsers = [];
    console.log(acls);
    for (let i = 0; i < baseUserList.length; i++) {
      const userCard = baseUserList[i];
      // console.log(userCard);
      if (acls[userCard.id_company] && acls[userCard.id_company][formType] && acls[userCard.id_company][formType]?.includes('ANY_CLAIM_CREATE')){
        // фильтр, если есть привилегия создавать для всех в компании, добавляем в список
        filteredUsers.push(userCard);
        // setPersonalModeUser(null);
      } else if (userCard.boss_id === MYID && acls[userCard.id_company] && acls[userCard.id_company][formType] && acls[userCard.id_company][formType]?.includes('TEAM_CLAIM_CREATE')){
        // Если челик мой подчиненный и у меня есть права добавлять подчиненным
        filteredUsers.push(userCard);
        // setPersonalModeUser(null);
      } else if (userCard.id === MYID && acls[userCard.id_company] && acls[userCard.id_company][formType] && acls[userCard.id_company][formType]?.includes('PERS_CLAIM_CREATE')){
        filteredUsers.push(userCard);
        // setPersonalModeUser(userCard);
      }
    }

      setUserList(filteredUsers.map((item)=>{
        return {
          'key': `userkey_${item.id}`,
          'value': item.id,
          'label': <div className={'sk-flex-space'}><div>{item.surname + " " + item.name + " " + item.patronymic}</div> <div>{item.id}</div></div>,
          'searchLabel': `${item.surname + " " + item.name + " " + item.patronymic + " " + item.id}`,
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
    if (formType === 11 || formType === 13){
      result.end = formDateRange[1].clone().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    } else {
      result.end = formDateRange[1].format('YYYY-MM-DD HH:mm:ss');

    }
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
    setOpen(false);
  }


  useEffect(()=>{
    // console.log('HELLOFD');
    if (formUsers.length > 0){
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  },[formUsers]);


  const handleGetBack = () => {
    if (props.on_get_back){
      setOpen(false);
      props.on_get_back(itemId);
    }
  }

  const handleApproveClaim = ()=>{
    if (props.on_approve){
      props.on_approve(itemId, userCard);
    }
    setOpen(false);
  }

  const handleDeclineClaim = ()=>{
    if (props.on_decline){
      props.on_decline(itemId,userCard);
    }
    setOpen(false);
  }

  return (
    <>
      
      <Drawer
        title={`${itemId ? ("Заявка #" + itemId) : 'Новая заявка '}:  ${pageTitle}`} //props.claim_type
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
          header: {
            background: pageСolor,
          }
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
        <div style={{display: 'flex', flexDirection: 'column'}} className={`${editMode === 'read' ? 'sk-claim-read' : ''}`} >

        <div>
          <div className={'sk-claimeditor-drawer-row '}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Сотрудник</span>
                {editMode === 'create' ? (
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder={'Имя пользователя'}
                    options={userList}
                      onChange={setFormUsers}
                      optionFilterProp="searchLabel" // ищет по этому полю!
                      showSearch
                    />
                ) : (

                  <div className='sk-flex-space'>
                    <div className={'sk-contend-um'} >{`${props.data?.usr_surname} ${props.data?.usr_name} ${props.data?.usr_patronymic}`}</div>
                  </div>
                )}

            </div>

            {/* Диапазон дат с временем */}
            {(formType === 7 || formType === 8 || formType === 9) && (
            <div className={'sk-claimeditor-drawer-row '}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Время начала и конца</span>
              <div className={'sk-flex-space'}>
              {editMode === 'read' ? (
                <div className='sk-flex-space'>
                  <div className={'sk-contend-um'}>{dayjs(formDateRange[0])?.format('DD-MM-YYYY  HH:mm')}</div> - 
                  <div className={'sk-contend-um'}>{dayjs(formDateRange[1])?.format('DD-MM-YYYY  HH:mm')} </div>
              </div>
              ):(
                <>
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
                </>
              )}
              </div>
            </div>
            )}


            {/* Диапазон дат */}
            {(formType === 10 || formType === 6) && (
              <div className={'sk-claimeditor-drawer-row '}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Начальная и конечная даты</span>
                <div className={'sk-flex-space'}>
                {editMode === 'read' ? (
                <div className='sk-flex-space'>
                    <div className={'sk-contend-um'}>{dayjs(formDateRange[0])?.format('DD-MM-YYYY')}</div> - 
                    <div className={'sk-contend-um'}>{dayjs(formDateRange[1])?.format('DD-MM-YYYY')} </div>
                </div>
              ):(
                <>
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    value={formDateRange}
                    onChange={(dates)=>{setFormDateRange([dates[0], dates[1].clone().endOf('day')])}}
                  />
                  {editMode !== 'read' && (
                  <Button
                    onClick={()=>{setFormDateRange([formDateRange[0], formDateRange[0].clone().endOf('day')])}}
                  >Сравнять</Button>
                  )}
                </>
              )}
              </div>
            </div>
            )}


            {/* Просто дата */}
            {(formType === 11 || formType === 13) && (
              <div className={'sk-claimeditor-drawer-row '}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Дата события</span>
              {editMode === 'read' ? (
                <>
                    <div className={'sk-contend-um'}>{dayjs(formDateRange[0])?.format('DD-MM-YY')} </div>
                </>
              ):(
                <>
                <DatePicker
                  readOnly={editMode === 'read'}
                  style={{ width: '100%' }}
                  value={formDateRange[0]}
                  onChange={(date)=>{setFormDateRange([date, date.clone().endOf('day')])}}
                />
                </>
              )}

              </div>
            )}

        </div>

        <div style={{display:'grid', gridTemplateColumns: '48% 48%', gridGap: '0px 4%'}}>





            {(formType === 7 || formType === 8) && (
            <div className={'sk-claimeditor-drawer-row '}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Место назначения</span>
              {editMode === 'read' ? (
                      <div className={'sk-contend-um'}>{nl2br(formTargetPoint)}</div>
                    ) : (
                      <TextArea
                          readOnly={editMode === 'read'}
                          style={{ width: '100%', minHeight: '140px' }}
                          value={formTargetPoint}
                          onChange={(ev)=>{setFormTargetPoint(ev.target.value)}}
                          allowClear={true}
                          />

                    )}
            </div>
            )}
            {(formType === 7 || formType === 8) && (
            <div className={'sk-claimeditor-drawer-row '}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Адрес</span>
              {editMode === 'read' ? (
                      <div className={'sk-contend-um'}>{nl2br(formTargetAddress)}</div>
                    ) : (
                      <TextArea
                          readOnly={editMode === 'read'}
                          style={{ width: '100%', minHeight: '140px' }}
                          value={formTargetAddress}
                          onChange={(ev)=>{setFormTargetAddress(ev.target.value)}}
                          allowClear={true}
                          />

                    )}
            </div>
              )}
              {(formType === 7 || formType === 8) && (
            <div className={'sk-claimeditor-drawer-row '}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Контактное лицо</span>
              {editMode === 'read' ? (
                      <div className={'sk-contend-um'}>{formContactFace}</div>
                    ) : (
                      <Input
                        readOnly={editMode === 'read'}
                          style={{ width: '100%' }}
                          placeholder={'Имя пользователя'}
                          allowClear={true}
                          value={formContactFace}
                          onChange={(ev)=>{setFormContactFace(ev.target.value)}}
                          />

                    )}
            </div>
            )}
            {(formType === 7 || formType === 8) && (
            <div className={'sk-claimeditor-drawer-row '}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Телефон контактного лица</span>
              {editMode === 'read' ? (
                      <div className={'sk-contend-um'}>{formContactFacePhone}</div>
                    ) : (
                      <Input
                      readOnly={editMode === 'read'}
                          style={{ width: '100%' }}
                          placeholder={'Имя пользователя'}
                          allowClear={true}
                          value={formContactFacePhone}
                          onChange={(ev)=>{setFormContactFacePhone(ev.target.value)}}
                          />

                    )}
            </div>
            )}
            {(formType === 7 || formType === 8) && (
            <div className={'sk-claimeditor-drawer-row '}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Количество поездок метро</span>
              {editMode === 'read' ? (
                      <div className={'sk-contend-um'}>{formSubwayCount}</div>
                    ) : (
                      <Input
                        type='number'
                        min={0}
                        readOnly={editMode === 'read'}
                        style={{ width: '100%' }}
                        placeholder={'Имя пользователя'}
                        allowClear={true}
                        value={formSubwayCount}
                        onChange={(ev)=>{setFormSubwayCount(ev.target.value)}}
                        />
                    )}
            </div>
            )}

            {(formType === 7 || formType === 8) && (
            <div className={'sk-claimeditor-drawer-row '}>
              <span className={'sk-usp-filter-col-label sk-labed-um'}>Количество поездок на наземном трансп.</span>
              {editMode === 'read' ? (
                      <div className={'sk-contend-um'}>{formBusCount}</div>
                    ) : (
                <Input
                    readOnly={editMode === 'read'}
                    type='number'
                    min={0}
                    style={{ width: '100%' }}
                    placeholder={'Имя пользователя'}
                    allowClear={true}
                    value={formBusCount}
                    onChange={(ev)=>{setFormBusCount(ev.target.value)}}
                    />
                    )}
            </div>
            )}

        </div>



        <div>
        {formType === 9 && (
          <div>
            <div className={'sk-claimeditor-drawer-row '}>
                <span className={'sk-usp-filter-col-label sk-labed-um'}>Причина</span>
                {editMode === 'read' ? (
                      <div className={'sk-contend-um'}>{nl2br(formReason)}</div>
                    ) : (

                    <TextArea
                      readOnly={editMode === 'read'}
                        style={{ width: '100%', minHeight: '140px' }}
                        allowClear={true}
                        value={formReason}
                        onChange={(ev)=>{setFormReason(ev.target.value)}}
                        />
                    )}
              </div>
          </div>
        )}

          {formType === 6 && (
            <div>
              <div className={'sk-claimeditor-drawer-row '}>
                  <span className={'sk-usp-filter-col-label sk-labed-um'}>Описание, доп. информация</span>
                  {editMode === 'read' ? (
                      <div className={'sk-contend-um'}>{nl2br(formDescription)}</div>
                    ) : (
                      <TextArea
                        readOnly={editMode === 'read'}
                          style={{ width: '100%', minHeight: '140px' }}
                          allowClear={true}
                          value={formDescription}
                          onChange={(ev)=>{setFormDescription(ev.target.value)}}
                          />
                    )}
                </div>
            </div>
          )}

          {(formType === 7 || formType === 8 || formType === 10 || formType === 13) && (
            <div>
              <div className={'sk-claimeditor-drawer-row '}>
                  <span className={'sk-usp-filter-col-label sk-labed-um'}>Комментарий</span>
                  {editMode === 'read' ? (
                      <div className={'sk-contend-um'}>{nl2br(formComment)}</div>
                    ) : (
                    <TextArea
                      readOnly={editMode === 'read'}
                        style={{ width: '100%', minHeight: '140px' }}
                        allowClear={true}
                        value={formComment}
                        onChange={(ev)=>{setFormComment(ev.target.value)}}
                        />
                    )}
                </div>
            </div>
          )}

        {/* only for extra time */}
        {formType === 11 && (
            <div>
              <div className={'sk-claimeditor-drawer-row '}>
                  <span className={'sk-usp-filter-col-label sk-labed-um'}>Задача</span>
                  {editMode === 'read' ? (
                      <div className={'sk-contend-um'}>{nl2br(formTask)}</div>
                    ) : (

                      <TextArea
                        readOnly={editMode === 'read'}
                          style={{ width: '100%', minHeight: '140px' }}
                          allowClear={true}
                          value={formTask}
                          onChange={(ev)=>{setFormTask(ev.target.value)}}
                          />
                    )}
                </div>
            </div>
          )}
          {formType === 11 && (
            <div>
              <div className={'sk-claimeditor-drawer-row '}>
                  <span className={'sk-usp-filter-col-label sk-labed-um'}>Результат</span>
                    {editMode === 'read' ? (
                      <div className={'sk-contend-um'}>{nl2br(formResult)}</div>
                    ) : (
                      <TextArea
                          readOnly={editMode === 'read'}
                          style={{ width: '100%', minHeight: '140px' }}
                          allowClear={true}
                          value={formResult}
                          onChange={(ev)=>{setFormResult(ev.target.value)}}
                        />

                    )}
                </div>
            </div>
          )}
        </div>
          <br />
          
          <div className={'sk-flex-space'}>
            <Button
              onClick={onClose}
              >Закрыть</Button>
            {editMode !== 'read' && (
              <div>
                {formValid || itemId ? (
                  <Button type={'primary'} onClick={handleSubmitForm} block>Сохранить</Button>
                ): (
                  <Button danger disabled block>Сохранить</Button>
                            )} 
              </div>
            )}

            {editMode === 'read' && (
              <div className={'sk-flex'} style={{justifyContent: 'flex-end', gridGap: '0.5rem'}}>
                {allowBack && (
                  <Button 
                    danger
                    variant="outlined"
                    onClick={handleGetBack}
                  >Отозвать</Button>
                )}
                {allowApprove && (
                  <Button
                  color={'cyan'}
                  variant="outlined"
                  onClick={handleApproveClaim}
                  >Согласовать</Button>
                )}
                {allowDecline && (
                  <Button
                  variant="outlined"
                  color={'orange'}
                  onClick={handleDeclineClaim}
                  >Отклонить</Button>
                )}
                {allowEdit && (
                  <Button
                    onClick={()=>{setEditMode('update')}}
                    type={'primary'}
                    color={'primary'}
                  >Редактировать
                  </Button>
                )}
              </div>
            )}
          </div>


        </div>
      </Drawer>
    </>
  );
};
export default ClaimEditorDrawer;
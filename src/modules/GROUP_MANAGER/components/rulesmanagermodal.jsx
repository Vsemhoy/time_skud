import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Flex, Modal, Select, message } from 'antd';


import { CSRF_TOKEN, HOST_COMPONENT_ROOT, PRODMODE } from '../../../CONFIG/config';
import { DS_RULES, DS_SCHEDULE_LIST } from '../../../CONFIG/DEFAULTSTATE';
import { CloseOutlined, DeleteOutlined, EditOutlined, LockOutlined, PlusSquareOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';
import RuleIcons from "../../RULE_MANAGER/components/RuleIcons";




const RulesManagerModal= (props) => {
  const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [item_id, setItem_id] = useState(null);
    const [closeAllEditorRows, setCloseAllEditorRows] = useState(0);

    const [baseRules, setBaseRules] = useState([]);
    const [rules, setRules] = useState([]);

    const [baseLinks, setBaseLinks] = useState([]);
    const [links, setLinks] = useState([]);


    const [schedTypes, setSchedTypes] = useState([]);

    const [openAddSection, setOpenAddSection] = useState(false);
    const [page_num, setPage_num] = useState(1);
    const [page_offset, setPage_offset] = useState(30);
    const [hasMoreRows, setHasMoreRows] = useState(false);
    const [totalLinks, setTotalLinks] = useState(0);


    const [formRul, setFormRul] = useState(1);
    const [formType, setFormType] = useState(null);
    const [formStart, setFormStart] = useState(dayjs().startOf('day').add(1, 'day'));
    const [formEnd, setFormEnd] = useState(dayjs().add(1, 'month'));

    useEffect(()=>{
        if (props.on_open){
            setOpen(true); 
            if (PRODMODE){
              setBaseRules(props.rule_list);
            } else {
              setHasMoreRows(false);
              setPage_num(1);
              setPage_offset(30);
              setTotalLinks(0);
              setBaseLinks([]);
              get_links();
              setBaseRules(props.rule_list);
            }
        }
        console.log(props);
    },[props.on_open]);

   useEffect(()=>{
      if (openAddSection){
        setCloseAllEditorRows(0);
      }
    },[openAddSection]);

    const onCloseAction = ()=>{
        setOpen(false)
        if (props.on_close){
            props.on_close();
        }
        setBaseLinks([]);
        setLinks([]);
        setPage_num(1);
    }

    useEffect(()=>{
      if (openAddSection){
        if (formStart && formStart.unix() < dayjs().unix()){
          setFormStart(dayjs().startOf('day').add(1, 'day'));
          error();
        }
  
          let a = formStart.unix();
          let b = formEnd.unix();
          console.log('item time', a, b, 'today time');
          if (formEnd && a > b )
          {
            setFormEnd(formStart);
          }
      }
    },[formStart]);
  
    useEffect(()=>{
      if (openAddSection){
        if (formStart.unix() < dayjs().unix()){
          setFormStart(dayjs().startOf('day').add(1, 'day'));
        };
  
        if (formEnd){
          let a = formStart.unix();
          let b = formEnd.unix();
          console.log('item time', a, b, 'today time');
          if (a > b )
          {
            setFormEnd(formStart);
          } 

        }
      }
    },[formEnd]);

  const onOpenEditorRow = (id)=>{
    setOpenAddSection(false);
    setCloseAllEditorRows(id);
  }


  const error = () => {
    alert('Начало действия правила может быть установлено только с завтрашнего дня');
    // alert()
  };

  const loadMoreAction = ()=>{
    setPage_num(page_num + 1);
  }

  useEffect(()=>{ 
    if (page_num > 1 && open){
      get_links();
    }
  },[page_num]);




  useEffect(()=>{
    console.log(props.rule_types);
    console.log(baseRules);
    console.log(formType);
    setFormRul( baseRules
      .filter((item)=> item.id_company === props.data.id_company)
      .filter((item)=>formType === null || item.rule_type_id === formType)[0]?.id);
   },[formType]);


   useEffect(()=>{
    if (typeof baseLinks === 'object'){
      
    } else {
      setLinks(baseLinks.sort((a, b)=> a.start > b.start));
    }
   },[baseLinks]);


    /**
     * Получение графиков
     * @param {*} req 
     * @param {*} res 
     */
    const get_links = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/groups/rules_get/' + props.target_id, 
              {   
                data: {
                  page: page_num,
                  limit: page_offset,
                  orderby: ["id", "ASC"],
                }, 
                _token: CSRF_TOKEN
            }
            );
            console.log('departs', response.data);

            setBaseLinks(...baseLinks, response.data.data);
            setTotalLinks(response.data.total);
            // setOrganizations(organizations_response.data.org_list)
            // setTotal(organizations_response.data.total_count)

            // setScheduleList(response.data);
            if (page_offset + page_num < totalLinks){
              setHasMoreRows(true);
            } else {
              setHasMoreRows(false);
            }
        } catch (e) {
            console.log(e)
        } finally {
            // setLoadingOrgs(false)
        }
    }


  const createNewLink = () => {
    if (formRul && formStart){
      const data = {
        group_id: props.target_id,
        rule_id: formRul,
        rule_type: formType,
        start: formStart.unix(),
        end: formEnd.unix()
      };
      create_links(data);
    }
  }


      /**
     * Перелинковка юзеров с гурппами
     * @param {*} req 
     * @param {*} res 
     */
          const create_links = async (body, req, res) => {
              console.log('body',body);
              try {
                  let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/groups/rules',
                      {   
                          data: body, 
                          _token: CSRF_TOKEN
                      }
                  );
                  console.log('users', response);
                  setBaseLinks([...baseLinks, response.data.data]);
                  // setBaseUserListData(response.data.data);
              } catch (e) {
                  console.log(e)
              } finally {
                  // setBaseCalendarList(prevList => 
                  //     prevList.map(item => 
                  //         item.id === body.id ? { ...item, ...body } : item // Заменяем объект по id
                  //     )
                  // );
            }
        }


      const updateOldLink = (data) => {
        if (data){
          const data_up = {
            group_id: props.target_id,
            rule_id: formRul,
            // rule_type: formType,
            id: data.id,
            start: data.start.unix(),
            end: data.end.unix()
          };
          update_links(data_up);
        }
      }

      /**
     * Перелинковка юзеров с гурппами
     * @param {*} req 
     * @param {*} res 
     */
              const update_links = async (body, req, res) => {
                console.log('body',body);
                try {
                    let response = await PROD_AXIOS_INSTANCE.put('/api/timeskud/groups/rules/' + body.id,
                        {   
                            data: body, 
                            _token: CSRF_TOKEN
                        }
                    );
                    console.log('users', response);
                    // setBaseUserListData(response.data.data);
                } catch (e) {
                    console.log(e)
                } finally {
                    setBaseLinks(prevList => 
                        prevList.map(item => 
                            item.id === body.id ? { ...item, ...body } : item // Заменяем объект по id
                        )
                    );
              }
        }

    const deleteOldItem = (id) => {
      delete_link({id: id});
    }

    /**
     * удаление линка
     * @param {*} req 
     * @param {*} res 
     */
    const delete_link = async (body, req, res) => {

        try {
            let response = await PROD_AXIOS_INSTANCE.delete('/api/timeskud/groups/rules/' + body.id,
                {   
                    data: { "id" : body.id}, 
                    _token: CSRF_TOKEN
                }
            );
            if (response.data.status === 0){
                // get_groupList();
            }
        } catch (e) {
            console.log(e)
        } finally {
            setBaseLinks(baseLinks.filter((item)=>{return item.id !== body.id}));
        }
    }


  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* Basic */}


      <Modal
        title="Менеджер правил учёта рабочего времени"
        centered
        open={open}
        cancelText={''}
        footer={<Button onClick={onCloseAction}>Ok</Button>}
        onCancel={onCloseAction}
        width={{
          xs: '98%',
          sm: '90%',
          md: '90%',
          lg: '80%',
          xl: '70%',
          xxl:'60%',
        }}
      >
        <div className={'sk-grid-table sk-gt-schedules'}>
          <div className={'sk-grid-table-head'}>
            <div className={'sk-gt-table-row'}>
                <div>T</div>
                <div>id</div>
                <div>Название</div>
                <div>Дата начала действия</div>
                <div>Дата окончания действия</div>
                <div> </div>
              </div>
          </div>
          <div className={'sk-grid-table-middle'}>
            {openAddSection ? (
              <div className={'sk-gtm-form'}>
              <div>
              <Select
                placeholder="Тип правила"
                onChange={(value) => setFormType(value)}
                style={{ width: '100%' }}
                options={[
                  {
                    key: 'schedtype0',
                    value: null,
                    label: 'Все правила',
                  },
                  ...props.rule_types.map((item) => ({
                    key: `rtkey_${item.id}`,
                    value: item.id,
                    label: item.name,
                  })),
                ]}
                value={formType}
              />
              </div>
              <div>
              <Select
                  showSearch
                  placeholder="Выберите правило"
                  optionFilterProp="label"
                  style={{ width: '100%' }}
                  onChange={(vel)=>setFormRul(vel)}
                  // onSearch={onSearch}
                  options={
                    props.rule_list.filter((item)=> item.id_company === props.data.id_company).
                    filter((item)=>formType === null || item.rule_type_id === formType)
                    .map((typ)=>
                       ({
                      key: `rulist_${typ.id}`,
                      value: typ.id,
                      label: typ.name
                    })
                  
                  )}
                  value={formRul}
                />
              </div>
              <div>
                <DatePicker
                  allowClear={false}
                  style={{ width: '100%' }}
                  onChange={(value)=>{setFormStart(value)}}
                  value={formStart}
                />
              </div>
              <div>
                <DatePicker
                style={{ width: '100%' }}
                onChange={(value)=>{setFormEnd(value)}}
                value={formEnd}
                />
              </div>
              <div>
                <PlusSquareOutlined
                  onClick={createNewLink}
                className={'sk-gtm-button'}/>
              </div>
              <div>
                <CloseOutlined
                onClick={()=>{setOpenAddSection(false)}}
                className={'sk-gtm-button'} />
              </div>
            </div>
            ):(
            <div
              onClick={()=>{setOpenAddSection(true)}}
            className={'sk-gtm-trigger'}>
              Добавить правило
            </div>
            )}

            
          </div>
            <div className={'sk-grid-table-body'}>
              {links.map(item => (
                  <TableRowItem
                    on_delete={deleteOldItem}
                    on_save_data={updateOldLink}
                    open_editor={onOpenEditorRow}
                    close_edit={closeAllEditorRows}
                  data={{start: item.start, end: item.end, name: item.rule_name, type: item.rule_type, id: item.id}}
                  />
              ))}
              {/* <TableRowItem 
              on_delete={deleteOldItem}
              on_save_data={updateOldLink}
                open_editor={onOpenEditorRow}
                close_edit={closeAllEditorRows}
              data={{start: 1738068722, end: 1738068722, name: "Hello wolf2", type: 2, id: 645}}
              />
              <TableRowItem 
              on_delete={deleteOldItem}
              on_save_data={updateOldLink}
                open_editor={onOpenEditorRow}
                close_edit={closeAllEditorRows}
              data={{start: 1738068722, end: 1738068722, name: "Hello wolf3", type: 3, id: 6445}}
              />
              <TableRowItem 
              on_delete={deleteOldItem}
              on_save_data={updateOldLink}
                open_editor={onOpenEditorRow}
                close_edit={closeAllEditorRows}
              data={{start: 1738068722, end: 1738068722, name: "Hello wolf4", type: 3, id: 445}}
              /> */}



            </div>
            <div className={'sk-grid-table-bottom'}>
              {hasMoreRows ? (
                <div onClick={loadMoreAction} className={'sk-gtm-trigger'}>
                  Загрузить ещё
                </div>
              ):""}

          </div>
        </div>
      </Modal>
    </Flex>
  );
};

export default RulesManagerModal;





const TableRowItem = (props) => {
  
  const [archieved, setArchieved] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [startTime, setStartTime] = useState(props.data.start ? dayjs(props.data.start) : null);
  const [endTime, setEndTime] = useState(props.data.end ? dayjs(props.data.end) : null);
  const [_startTime] = useState(props.data.start ? dayjs(props.data.start) : null);
  const [_endTime] = useState(props.data.end ? dayjs(props.data.end) : null);

  const [hasChanges, setHasChanges] = useState(false);

  const [item_id, setItem_id] = useState(props.data.id);
  const [item_name, setItem_name] = useState(props.data.name);
  const [item_type, setItem_type] = useState(props.data.type);

  const [currentDate, setCurrentDate] = useState(false);

  useEffect(()=>{
    if (props.close_edit !== item_id){
      setEditMode(false);
      console.log('setEditMode false');
    }
  },[props.close_edit]);
  
  useEffect(()=>{
    if (editMode){

      if (startTime.unix() !== _startTime.unix()
      || JSON.stringify(endTime) != JSON.stringify(_endTime)
      ) {
        setHasChanges(true);
      } else {
        setHasChanges(false);
      };
    }

    if (startTime.unix() < dayjs().unix() && (endTime === null || endTime.unix() < dayjs().unix()))
    {
      setCurrentDate(true);
    } else {
      setCurrentDate(false);
    }
  },[startTime, endTime]);

  useEffect(()=>{
    if (editMode){
      if (endTime && endTime.unix() < dayjs().unix()){
        setEndTime(dayjs().endOf('day'));
      }

        let a = startTime.unix();
        let b = endTime.unix();
        console.log('item time', a, b, 'today time');
        if (endTime && a > b )
        {
          setEndTime(startTime);
        }
    }
  },[startTime]);

  useEffect(()=>{
    if (editMode){
      if (startTime.unix() < dayjs().unix()){
        setStartTime(dayjs().startOf('day').add(1, 'day'));
      };

      if (endTime){
        let a = startTime.unix();
        let b = endTime.unix();
        if (a > b)
        {
          setEndTime(startTime.endOf('day'));
        } 

      }
    }
  },[endTime]);

  const onSaveItem = ()=>{
    setEditMode(false);
    setHasChanges(false);
    if (props.on_save_data){
      props.on_save_data({
        id: item_id,
        start: startTime.startOf('day'),
        end: endTime.endOf('day'),
      })
    }
  }

  const onOpenEditor = ()=>{
    setEditMode(true);
    if (props.open_editor){
      props.open_editor(item_id);
    }
    console.log('setEditMode opened');
  }

  const onCloseRow = () => {
    setEditMode(false);
    setStartTime(_startTime);
    setEndTime(_endTime);
  }

  const onDeleteItem = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Действительно удалить запись?")){
      if (props.on_delete){
        props.on_delete(item_id);
      }
    }
  }

  return (
    <div className={`sk-gt-table-row ${currentDate ? "sk-gt-actual" : ""}`}>
      <div><RuleIcons type={item_type} /></div>
      <div>{item_id}</div>
      <div>{item_name}</div>
      <div>
        {editMode && startTime.unix() > dayjs().unix() ? (
          <DatePicker
            allowClear={false}
            value={startTime}
            onChange={(val)=>{setStartTime(val)}}
          />
        ):(
          startTime.format("DD-MM-YYYY")
        )}
      </div>
      <div>
        {editMode ? (
          <DatePicker 
            value={endTime}
            onChange={(val)=>{setEndTime(val)}}
          />
        ):(
          endTime ? endTime.format("DD-MM-YYYY") : " - - - "
        )}
      </div>
      { archieved ? (
        <div></div>
      ) : (
        <>
        {editMode ? (
          <div className={`sk-gtr-button ${hasChanges && 'active'}`} onClick={onSaveItem} ><SaveOutlined /></div>
        ): (
          <div className={"sk-gtr-button"} onClick={onOpenEditor} ><EditOutlined /></div>
        )}
        </>
      )}
      
      { archieved ? (
        <div className={"sk-gtr-button"}><LockOutlined /></div>
      ) : (
        <>
        {editMode ? (
          <div className={"sk-gtr-button"} 
            onClick={onCloseRow} ><CloseOutlined /></div>
        ): (
          <div className={"sk-gtr-button"} onClick={onDeleteItem}><DeleteOutlined /></div>
        )}
        </>
      
      )}
      
    </div>
  );
}
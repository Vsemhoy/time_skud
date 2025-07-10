import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Flex, Modal, Select, message } from 'antd';


import { CSRF_TOKEN, HOST_COMPONENT_ROOT, PRODMODE } from '../../../CONFIG/config';
import { DS_RULES, DS_SCHEDULE_LIST } from '../../../CONFIG/DEFAULTSTATE';
import { CloseOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, ExclamationCircleOutlined, LockOutlined, PlusSquareOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';
import RuleIcons from "../../../assets/Comicon/RuleIcons";
import { WordDayNumerate } from '../../../components/Helpers/TextHelpers';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);


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
    const [formType, setFormType] = useState(1);
    const [formStart, setFormStart] = useState(dayjs().startOf('day').add(1, 'day'));
    const [formEnd, setFormEnd] = useState(dayjs().add(1, 'month'));

    const [editMode, setEditMode] = useState(false);

    const [intersected, setIntersected] = useState([]);
    const [checkType, setCheckType] = useState(1);


    useEffect(()=>{
        if (props.on_open){
            setOpen(true); 
            if (!PRODMODE){
              setBaseRules(props.rule_list);
              setBaseLinks([
                      {
                          "id": 1,
                          "start": dayjs("2025-03-01 05:27:26"),
                          "end": dayjs("2025-03-15 14:54:19"),
                          "creator_id": 47,
                          "creator_name": "Валентина",
                          "creator_surname": "Кошелева",
                          "created_at": 1740914795,
                          "deleted": false,
                          "rule_name": "Правило_1741014647",
                          "rule_type": 1,
                          "rule_id": 1
                      },
                      {
                          "id": 3,
                          "start": dayjs("2025-03-02 00:00:00"),
                          "end": dayjs("2025-04-30 23:59:59"),
                          "creator_id": 46,
                          "creator_name": "Александр",
                          "creator_surname": "Кошелев",
                          "created_at": 1740830052,
                          "deleted": false,
                          "rule_name": "Правило хорошего тона 2 - переработка",
                          "rule_type": 2,
                          "rule_id": 2
                      },
                  ]
              );
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
        setEditMode(false);
    }


    useEffect(()=>{
      setBaseRules(props.rule_list);
    },[props.rule_list]);


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
          if (formEnd.endOf('day').unix() < dayjs().endOf('day').unix()){
            setFormEnd(dayjs().endOf('day'));
          };
          
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



  useEffect(()=>{
    console.log('try to editmode', editMode);
    if (!editMode){
      setIntersected([]);
      return;
    }
    let st = formStart.startOf('day').unix();
    let end = formEnd ? formEnd.endOf('day').unix() : dayjs().add(1,'years').endOf('day').unix();
    setIntersected([]);
    let inters = [];
    for (let i = 0; i < baseLinks.length; i++) {
      const element = baseLinks[i];
      const chstart = dayjs(element.start).unix();
      const chend   = element.end ? dayjs(element.end).unix() : 99999999999999;
      if (chstart === st 
        || chend === end
        || (st > chstart && end < chend)
        || (st > chstart && element.end === null)
        || (st < chstart && element.end !== null && end >= chend)
        || (st > chstart && element.end !== null && end <= chend)
        || (element.end !== null && st >= chstart && st <= chend)
        || (element.end !== null && st > chstart && st < chend)
        || (element.end !== null && st >= chstart && end <= chend)
        || (element.end !== null && end >= chstart && end <= chend)
      ){
        if (element.rule_type === checkType){
          inters.push(element.id);
          }
        }
      }

    setIntersected(inters);
    console.log(inters);
  },[baseLinks, formStart, formEnd, editMode, checkType]);


  useEffect(()=>{
    setEditMode(openAddSection);
  },[openAddSection]);




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
    setCheckType(formRul);
  },[formRul]);

  useEffect(()=>{
    console.log(props.rule_types);
    console.log(baseRules);
    console.log(formType);
    setFormRul( baseRules
      .filter((item)=> item.id_company === props.data.id_company)
      .filter((item)=>formType === null || item.rule_type_id === formType)[0]?.id);
   },[formType]);


  //  useEffect(()=>{
  //   console.log(baseLinks);

  //     // setLinks(baseLinks.sort((a, b)=> dayjs(a.start).unix() > (b.start !== null ? dayjs(b.start).unix() : 9999999948) ));
  //     let sorted = baseLinks.sort((a, b) => {
  //       const startA = dayjs(a.start).unix();
  //       const startB = b.start ? dayjs(b.start).unix() : Number.MAX_SAFE_INTEGER;
    
  //       console.log(startA, startB);
  //       return startA - startB; // Sort ascending by start time
  //     });
  //     console.log(sorted);
  //     setLinks(sorted);


  //  },[baseLinks]);


     useEffect(()=>{
      setLinks([]);
      if (baseLinks.length){
        console.log('use sort');
        let sorted = baseLinks.sort((a, b)=> {return  dayjs(b.start).unix() - dayjs(a.start).unix()});
  
        let result = [sorted[0]];
  
        // Итерация по отсортированному массиву
        for (let i = 1; i < sorted.length; i++) {
            let prevStart = dayjs(sorted[i - 1].start);
            let nextEnd = dayjs(sorted[i].end);
            console.log(prevStart, nextEnd);
            // Проверка наличия разрыва
            if (prevStart.unix() - nextEnd.unix() > 86400) { // 86400 секунд = 1 день
                // Создание нового объекта для заполнения разрыва
                let newObject = {
                    id: null, // или любое другое значение по умолчанию
                    start: nextEnd.add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                    end: prevStart.subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss'),
                    creator_id: sorted[i - 1].creator_id, // или любое другое значение по умолчанию
                    // Добавьте другие свойства по умолчанию, если необходимо
                };
                // Добавление нового объекта в массив
                result.push(newObject);
            }
            // Добавление следующей записи
            result.push(sorted[i]);
        }
        setLinks(result);
        console.log(result);
      }
  
     },[baseLinks]);


    /**
     * Получение правил линков
     * @param {*} req 
     * @param {*} res 
     */
    const get_links = async (command,req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/rules/rules_get/' + props.target_id, 
              {   
                data: {
                  page: page_num,
                  limit: page_offset,
                  orderby: ["id", "ASC"],
                }, 
                _token: CSRF_TOKEN
            }
            );
            
          if (command === 'clear'){
            setBaseLinks(response.data.data.map((item) => ({
              ...item,
              start: dayjs(item.start),
              end: item.end ? dayjs(item.end) : null,
              created_at: dayjs(item.created_at),
            })));
          } else {
            setBaseLinks([
              ...baseLinks,
              ...response.data.data.map((item) => ({
                ...item,
                start: dayjs(item.start),
                end: item.end ? dayjs(item.end) : null,
                created_at: dayjs(item.created_at),
              })),
            ]);
          }
          setTotalLinks(response.data.total);
            if (page_offset * page_num < response.data.total){
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
        users: [props.target_id],
        rule_id: formRul,
        rule_type: formType,
        start: formStart.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        end: !formEnd ? null : formEnd.endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      };

      for (let i = 0; i < props.rule_list.length; i++) {
        const element = props.rule_list[i];
        if (element.id === formRul)
        {
          data.rule_type = element.rule_type_id;
          data.rule_type_name = element.name;
          break;
        }
      }

      for (let i  = 0; i < baseLinks.length ; i++){
        const checkLink = baseLinks[i];
        const startDate = checkLink.start.unix();
        const endDate = checkLink.end !== null ? checkLink.end.unix() : null;

        if (startDate < data.start && (endDate === null || (endDate > data.start ))){
          // Обновляем найденную строку с пересечением - меняем дату окончания

            checkLink.end = dayjs.unix(data.start).subtract(1, 'day').endOf('day').unix(); 
          
          update_links(checkLink);
        };

        console.log(checkLink);
      }

      create_links(data);
    }
  }


    /**
     * Создание связи
     * @param {*} req 
     * @param {*} res 
     */
          const create_links = async (body, req, res) => {
              console.log('body',body);
              try {
                  let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/usermanager/bindrules',
                      {   
                          data: body, 
                          _token: CSRF_TOKEN
                      }
                  );
                  // console.log('users', response);
                  // let object = response.data.content[0];
                  // if (object){
                  //   object.rule_type = body.rule_type;
                  //   object.rule_name = body.rule_type_name;
                  // }


                  //  object.start = dayjs(object.start);
                  //   object.end   = dayjs(object.end);
                  
                  // setBaseLinks([...baseLinks, object]);
                  if (response){
                    get_links('clear');
                  }
                  // get_links();
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
            user_id: props.target_id,
            rule_id: formRul,
            // rule_type: formType,
            links: [data.id],
            start: data.start.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            end: data.end ? data.end.endOf('day').format('YYYY-MM-DD HH:mm:ss') : null
          };
          update_links(data_up);
        }
      }

      /**
     * Обновление данных связи
     * @param {*} req 
     * @param {*} res 
     */
              const update_links = async (body, req, res) => {
                console.log('body',body);
                try {
                    let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/usermanager/changelinkrules',
                        {   
                            data: body, 
                            _token: CSRF_TOKEN
                        }
                    );
                    setIntersected([]);
                    if (response){
                      get_links('clear');
                    }
                    // body.start = dayjs.unix(body.start).format('YYYY-MM-DD HH:mm:ss');
                    // if (body.end){
                    //   body.end = dayjs.unix(body.end).format('YYYY-MM-DD HH:mm:ss');
                    // }
                    // setBaseLinks(prevList => 
                    //     prevList.map(item => 
                    //         item.id === body.id ? { ...item, ...body } : item // Заменяем объект по id
                    //     )
                    // );
                    // setBaseUserListData(response.data.data);
                } catch (e) {
                    console.log(e)
                    alert(e.response.data.message);
                } finally {

              }
        }

    const deleteOldItem = (id) => {
      delete_link(id);
    }

    /**
     * удаление линка
     * @param {*} req 
     * @param {*} res 
     */
    const delete_link = async (id, req, res) => {

        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/usermanager/deleterulelinks',
                {   
                  data: {
                    links: [id],
                  }, 
                    _token: CSRF_TOKEN
                }
            );
            // setBaseLinks(baseLinks.filter((item)=>{return item.id !== id}));
            get_links('clear');
        } catch (e) {
            console.log(e)
            alert(e.response.data.message);
        } finally {
        }
    }


    const handleKeyDown = (e, callback) => {
      // If formStart is null, set it to today's date
      let currentDate = e.target.value;
      if (currentDate === ""){
        currentDate = dayjs();
      } else {
        currentDate = dayjs(currentDate);
      }
      console.log(currentDate);
  
      switch (e.key) {
        case "ArrowLeft":
          // Subtract 1 day
          currentDate = currentDate.subtract(1, "day");
          break;
        case "ArrowRight":
          // Add 1 day
          currentDate = currentDate.add(1, "day");
          break;
        case "ArrowUp":
          // Add 1 month
          currentDate = currentDate.add(1, "month");
          break;
        case "ArrowDown":
          // Subtract 1 month
          currentDate = currentDate.subtract(1, "month");
          break;
        default:
          return; // Do nothing for other keys
      }
  
      // Prevent default browser behavior for arrow keys
      e.preventDefault();
  
      // Update the date picker value
      if (callback){
        callback(currentDate);
      }
    };


    const setFormDateCallback = (start, end) =>
    {
      setEditMode(true);
      setFormStart(start);
      setFormEnd(end);
    };

    const handleEditMode = (value) =>{
      console.log('valuse', value);
      console.log('editmode', editMode);
      console.log('openeditor', openAddSection);
      setEditMode(value);
    }


    const onCheckTypeSelect = (ev) => {
      setCheckType(ev);
    }



  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* Basic */}


      <Modal
          title={ <span>Правила учёта РВ: <span
          style={{fontStyle: "italic", color: "#0095b8"}}
        >{
          props.base_user ? (
            props.base_user.surname + " " +
            props.base_user.name + " " +
            props.base_user.patronymic
          ) : " "}</span></span> }
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
                  style={{ width: '100%', maxWidth: '470px' }}
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
                  onKeyDown={(event)=> {handleKeyDown(event, setFormStart)} }
                  value={formStart}
                />
              </div>
              <div>
                <DatePicker
                style={{ width: '100%' }}
                onChange={(value)=>{setFormEnd(value)}}
                onKeyDown={(event)=> {handleKeyDown(event, setFormEnd)} }
                value={formEnd}
                />
              </div>
              <div>
                {intersected.length === 0 ? (
                  <PlusSquareOutlined
                    onClick={createNewLink}
                  className={'sk-gtm-button'}/>
                ) : ""}
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
            {links.map((item, index) => 
                {return item.id !== undefined && item.id !== null ? (
                  <TableRowItem
                    key={"rowrul_" + item.id} 
                    on_delete={deleteOldItem}
                    on_save_data={updateOldLink}
                    open_editor={onOpenEditorRow}
                    close_edit={closeAllEditorRows}
                    data={{start: item.start, end: item.end, name: item.rule_name, type: item.rule_type, id: item.id}}
                    intersects={intersected}
                    changeDatesCallback={setFormDateCallback}
                    changeEditMode={handleEditMode}
                    changeCheckType={onCheckTypeSelect}
                    check_type={checkType}
                />
                ):(<BreakIn
                    key={"rowrulgap_" + index}
                   start={item.start} end={item.end} />)}
              )}



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

  const [intersect, setintersect] = useState(false);

  const [checkType, setCheckType] = useState(props.check_type);

  useEffect(()=>{
    setCheckType(props.check_type);
  },[props.check_type]);

  useEffect(()=>{
    if (!editMode && props.intersects != null && props.intersects.includes(item_id) && checkType === item_type)
    {
      setintersect(true);
    } else {
      setintersect(false);
    }
  },[props.intersects]);

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


    if (startTime.unix() < dayjs().unix() && (endTime === null || endTime.unix() > dayjs().unix()))
    {
      setCurrentDate(true);
    } else {
      setCurrentDate(false);
    }


    if (editMode){
      if (props.changeDatesCallback)
      {
        props.changeDatesCallback(startTime, endTime);
      }
      if (props.changeCheckType)
      {
        props.changeCheckType(item_type);
      }
    }
  },[startTime, endTime, editMode]);



  useEffect(()=>{
    if (editMode){
      if (endTime && endTime.unix() < dayjs().unix()){
        setEndTime(dayjs().endOf('day'));
      }
      if (startTime.unix() < dayjs().unix()){
        setStartTime(dayjs().startOf('day').add(1, 'day'));
      };

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
      if (endTime.endOf('day').unix() < dayjs().endOf('day').unix()){
        // setStartTime(dayjs().startOf('day').add(1, 'day'));
        setEndTime(dayjs().endOf('day'));
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
    if (props.changeEditMode){
      props.changeEditMode(true);
    }
    console.log('setEditMode opened');
  }

  const onCloseRow = () => {
    setEditMode(false);
    setStartTime(_startTime);
    setEndTime(_endTime);
    if (props.changeEditMode){
      props.changeEditMode(false);
    }
  }

  const onDeleteItem = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Действительно удалить запись?")){
      if (props.on_delete){
        props.on_delete(item_id);
      }
    }
  }


  const handleKeyDown = (e, callback) => {
    // If formStart is null, set it to today's date
    let currentDate = e.target.value;
    if (currentDate === ""){
      currentDate = dayjs();
    } else {
      currentDate = dayjs(currentDate);
    }
    console.log(currentDate);

    switch (e.key) {
      case "ArrowLeft":
        // Subtract 1 day
        currentDate = currentDate.subtract(1, "day");
        break;
      case "ArrowRight":
        // Add 1 day
        currentDate = currentDate.add(1, "day");
        break;
      case "ArrowUp":
        // Add 1 month
        currentDate = currentDate.add(1, "month");
        break;
      case "ArrowDown":
        // Subtract 1 month
        currentDate = currentDate.subtract(1, "month");
        break;
      default:
        return; // Do nothing for other keys
    }

    // Prevent default browser behavior for arrow keys
    e.preventDefault();

    // Update the date picker value
    if (callback){
      callback(currentDate);
    }
  };

  return (
      <div className={`sk-gt-table-row ${currentDate ? "sk-gt-actual" : ""} ${intersect ? "sk-gt-intersected" : ""}`   }>
        <div className={'sk-micro-icon'}><RuleIcons type={item_type} /></div>
        <div>{item_id}</div>
        <div>{item_name}</div>
        <div>
        {editMode && startTime.unix() > dayjs().unix() ? (
          <DatePicker
            allowClear={false}
            value={startTime}
            onChange={(val)=>{setStartTime(val)}}
            onKeyDown={(event)=> {handleKeyDown(event, setStartTime)} }
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
            onKeyDown={(event)=> {handleKeyDown(event, setEndTime)} }
          />
        ):(
          endTime ? endTime.format("DD-MM-YYYY") : " бессрочно "
        )}
      </div>
      { archieved ? (
        <div></div>
      ) : (
        <>
        {editMode ? 
          props.intersects != null && props.intersects.length > 1 ? (
            <div className={"sk-gtr-button"} onClick={onOpenEditor} ><ExclamationCircleOutlined /></div>
        ) : (
          <div className={`sk-gtr-button ${hasChanges && 'active'}`} onClick={onSaveItem} ><SaveOutlined /></div>
        )
        : endTime == null || dayjs().endOf('day').unix() < endTime.unix() ?
        (
          <div className={"sk-gtr-button"} onClick={onOpenEditor} ><EditOutlined /></div>
        ) : ""}
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
          <>
          {startTime.unix() > dayjs().unix() ? (
            <div className={"sk-gtr-button"} onClick={onDeleteItem}><DeleteOutlined /></div>
          ): "" }
          
          </>
        )}
        </>
      
      )}
        
      </div>
    );
  }

 const BreakIn = ({start, end}) => {
  
  const gap =  (dayjs(end).unix() - dayjs(start).unix()) / (24*60*60);
  return (
    <div className='sk-gt-table-row sk-gt-row-gap'>

        <div style={{textAlign: 'center'}}>
          <EllipsisOutlined />
        </div>
        <div>

        </div>
        <div>
          Разрыв {gap.toFixed()} {WordDayNumerate(gap.toFixed())}
        </div>
        <div>
          {dayjs(start).format("DD-MM-YYYY")}
        </div>
        <div>
          {dayjs(end).format("DD-MM-YYYY")}
        </div>
        <div>
          
        </div>

    </div>
  )
 }




// const TableRowItem = (props) => {
  
//   const [archieved, setArchieved] = useState(false);
//   const [editMode, setEditMode] = useState(false);

//   const [startTime, setStartTime] = useState(props.data.start ? dayjs(props.data.start) : null);
//   const [endTime, setEndTime] = useState(props.data.end ? dayjs(props.data.end) : null);
//   const [_startTime] = useState(props.data.start ? dayjs(props.data.start) : null);
//   const [_endTime] = useState(props.data.end ? dayjs(props.data.end) : null);

//   const [hasChanges, setHasChanges] = useState(false);

//   const [item_id, setItem_id] = useState(props.data.id);
//   const [item_name, setItem_name] = useState(props.data.name);
//   const [item_type, setItem_type] = useState(props.data.type);
//   console.log('props type', props.data);

//   const [currentDate, setCurrentDate] = useState(false);

//   useEffect(()=>{
//     if (props.close_edit !== item_id){
//       setEditMode(false);
//       console.log('setEditMode false');
//     }
//   },[props.close_edit]);
  
//   useEffect(()=>{
//     if (editMode){

//       if (startTime.unix() !== _startTime.unix()
//       || JSON.stringify(endTime) != JSON.stringify(_endTime)
//       ) {
//         setHasChanges(true);
//       } else {
//         setHasChanges(false);
//       };
//     }

//     if (startTime.unix() < dayjs().unix() && (endTime === null || endTime.unix() < dayjs().unix()))
//     {
//       setCurrentDate(true);
//     } else {
//       setCurrentDate(false);
//     }
//   },[startTime, endTime]);

//   useEffect(()=>{
//     if (editMode){
//       if (endTime && endTime.unix() < dayjs().unix()){
//         setEndTime(dayjs().endOf('day'));
//       }

//         let a = startTime.unix();
//         let b = endTime.unix();
//         console.log('item time', a, b, 'today time');
//         if (endTime && a > b )
//         {
//           setEndTime(startTime);
//         }
//     }
//   },[startTime]);

//   useEffect(()=>{
//     if (editMode){
//       if (startTime.unix() < dayjs().unix()){
//         setStartTime(dayjs().startOf('day').add(1, 'day'));
//       };

//       if (endTime){
//         let a = startTime.unix();
//         let b = endTime.unix();
//         if (a > b)
//         {
//           setEndTime(startTime.endOf('day'));
//         } 

//       }
//     }
//   },[endTime]);

//   const onSaveItem = ()=>{
//     setEditMode(false);
//     setHasChanges(false);
//     if (props.on_save_data){
//       props.on_save_data({
//         id: item_id,
//         start: startTime.startOf('day'),
//         end: endTime.endOf('day'),
//       })
//     }
//   }

//   const onOpenEditor = ()=>{
//     setEditMode(true);
//     if (props.open_editor){
//       props.open_editor(item_id);
//     }
//     console.log('setEditMode opened');
//   }

//   const onCloseRow = () => {
//     setEditMode(false);
//     setStartTime(_startTime);
//     setEndTime(_endTime);
//   }

//   const onDeleteItem = () => {
//     // eslint-disable-next-line no-restricted-globals
//     if (confirm("Действительно удалить запись?")){
//       if (props.on_delete){
//         props.on_delete(item_id);
//       }
//     }
//   }

//   return (
//     <div className={`sk-gt-table-row ${currentDate ? "sk-gt-actual" : ""}`}>
//       <div className={'sk-micro-icon'}><RuleIcons type={item_type} /></div>
//       <div>{item_id}</div>
//       <div>{item_name}</div>
//       <div>
//         {editMode && startTime.unix() > dayjs().unix() ? (
//           <DatePicker
//             allowClear={false}
//             value={startTime}
//             onChange={(val)=>{setStartTime(val)}}
//           />
//         ):(
//           startTime.format("DD-MM-YYYY")
//         )}
//       </div>
//       <div>
//         {editMode ? (
//           <DatePicker 
//             value={endTime}
//             onChange={(val)=>{setEndTime(val)}}
//           />
//         ):(
//           endTime ? endTime.format("DD-MM-YYYY") : " - - - "
//         )}
//       </div>
//       { archieved ? (
//         <div></div>
//       ) : (
//         <>
//         {editMode ? (
//           <div className={`sk-gtr-button ${hasChanges && 'active'}`} onClick={onSaveItem} ><SaveOutlined /></div>
//         ): (
//           <div className={"sk-gtr-button"} onClick={onOpenEditor} ><EditOutlined /></div>
//         )}
//         </>
//       )}
      
//       { archieved ? (
//         <div className={"sk-gtr-button"}><LockOutlined /></div>
//       ) : (
//         <>
//         {editMode ? (
//           <div className={"sk-gtr-button"} 
//             onClick={onCloseRow} ><CloseOutlined /></div>
//         ): (
//           <div className={"sk-gtr-button"} onClick={onDeleteItem}><DeleteOutlined /></div>
//         )}
//         </>
      
//       )}
      
//     </div>
//   );
// }

// const BreakIn = ({start, end}) => {
  
//   const gap =  (dayjs(end).unix() - dayjs(start).unix()) / (24*60*60);
//   return (
//     <div className='sk-gt-table-row sk-gt-row-gap'>

//         <div style={{textAlign: 'center'}}>
//           <EllipsisOutlined />
//         </div>
//         <div>

//         </div>
//         <div>
//           Разрыв {gap.toFixed()} {WordDayNumerate(gap.toFixed())}
//         </div>
//         <div>
//           {dayjs(start).format("DD-MM-YYYY")}
//         </div>
//         <div>
//           {dayjs(end).format("DD-MM-YYYY")}
//         </div>
//         <div>
          
//         </div>

//     </div>
//   )
//  }
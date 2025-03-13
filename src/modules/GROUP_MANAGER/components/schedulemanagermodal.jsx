import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Flex, Modal, Select, message } from 'antd';

import SchedStdSVG from "../../../media/schedule-std.svg";
import SchedFlexSVG from "../../../media/schedule-flex.svg";
import SchedFreeSVG from "../../../media/schedule-free.svg";
import SchedShiftSVG from "../../../media/schedule-shift.svg";
import SchedSumSVG from "../../../media/schedule-sum.svg";
import { CSRF_TOKEN, HOST_COMPONENT_ROOT, PRODMODE } from '../../../CONFIG/config';
import { DS_SCHEDULE_LIST } from '../../../CONFIG/DEFAULTSTATE';
import { CloseOutlined, CloseSquareOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, ExclamationCircleOutlined, LockOutlined, PlusSquareOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';
import { WordDayNumerate } from '../../../GlobalComponents/Helpers/TextHelpers';




const Sched_type_icon = (type) => {
    
  switch (type.children) {
      case 1:
          return ( <img src={HOST_COMPONENT_ROOT + SchedStdSVG} title='Пятидневка график'/>);
      break;
      case 2:
          return (<img src={HOST_COMPONENT_ROOT + SchedFlexSVG}  title='Гибкий график'/>);
      break;
      case 3:
          return (<img src={HOST_COMPONENT_ROOT + SchedFreeSVG}  title='Свободный график'/>);
      break;
      case 4:
          return (<img  src={HOST_COMPONENT_ROOT + SchedShiftSVG} title='Сменный график'/>);
      break;
      case 5:
          return (<img src={HOST_COMPONENT_ROOT + SchedSumSVG}    title='Суммированный график'/>);
      break;
      default:

          return "";
  }
}


const ScheduleManagerModal= (props) => {
  const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [item_id, setItem_id] = useState(null);
    const [closeAllEditorRows, setCloseAllEditorRows] = useState(0);

    const [baseSchedules, setBaseSchedules] = useState([]);
    const [schedules, setSchedules] = useState([]);

    const [baseLinks, setBaseLinks] = useState([]);
    const [links, setLinks] = useState([]);


    const [schedTypes, setSchedTypes] = useState([]);

    const [openAddSection, setOpenAddSection] = useState(false);
    const [page_num, setPage_num] = useState(1);
    const [page_offset, setPage_offset] = useState(30);
    const [hasMoreRows, setHasMoreRows] = useState(false);
    const [totalLinks, setTotalLinks] = useState(0);


    const [formSched, setFormSched] = useState(1);
    const [formType, setFormType] = useState(null);
    const [formStart, setFormStart] = useState(dayjs().startOf('day').add(1, 'day'));
    const [formEnd, setFormEnd] = useState(dayjs().add(1, 'month'));

    const [editMode, setEditMode] = useState(false);

    const [intersected, setIntersected] = useState([]);

    useEffect(()=>{
      setEditMode(false);
        if (props.on_open){
          setIntersected([]);
            setOpen(true); 
            setOpenAddSection(false);
            if (!PRODMODE){

              setBaseSchedules(DS_SCHEDULE_LIST);
              setBaseLinks(
                [
                  {
                      "id": 1,
                      "start": "2025-03-01 00:00:00",
                      "end": "2025-03-13 23:59:59",
                      "creator_id": 46,
                      "creator_name": "Александр",
                      "creator_surname": "Кошелев",
                      "created_at": "2025-03-03 07:51:30",
                      "deleted": false,
                      "schedule_name": "OXY ENNY GRFIK",
                      "schedule_type": 1,
                      "schedule_id": 1,
                      "schedule_type_name": "Стандартный",
                      "schedule_type_color": "#FFFF99"
                  },
                  {
                      "id": 2,
                      "start": "2025-04-01 00:00:00",
                      "end": "2025-05-20 23:59:59",
                      "creator_id": 46,
                      "creator_name": "Александр",
                      "creator_surname": "Кошелев",
                      "created_at": "2025-03-03 08:38:59",
                      "deleted": false,
                      "schedule_name": "OXY ENNY GRFIK",
                      "schedule_type": 1,
                      "schedule_id": 1,
                      "schedule_type_name": "Стандартный",
                      "schedule_type_color": "#FFFF99"
                  },
                  {
                      "id": 3,
                      "start": "2025-03-14 00:00:00",
                      "end": "2025-04-13 23:59:59",
                      "creator_id": 46,
                      "creator_name": "Александр",
                      "creator_surname": "Кошелев",
                      "created_at": "2025-03-13 07:11:55",
                      "deleted": false,
                      "schedule_name": "OXY ENNY GRFIK",
                      "schedule_type": 1,
                      "schedule_id": 1,
                      "schedule_type_name": "Стандартный",
                      "schedule_type_color": "#FFFF99"
                  },
                  {
                      "id": 5,
                      "start": "2025-05-21 00:00:00",
                      "end": "2025-05-21 23:59:59",
                      "creator_id": 46,
                      "creator_name": "Александр",
                      "creator_surname": "Кошелев",
                      "created_at": "2025-03-13 10:15:52",
                      "deleted": false,
                      "schedule_name": "OXY ENNY GRFIK",
                      "schedule_type": 1,
                      "schedule_id": 1,
                      "schedule_type_name": "Стандартный",
                      "schedule_type_color": "#FFFF99"
                  }
              ]
              )
            } else {

              setHasMoreRows(false);
              setPage_num(1);
              setTotalLinks(0);
              setBaseLinks([]);
              get_links();
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

        if (formEnd.endOf('day').unix() < dayjs().endOf('day').unix()){
          // setStartTime(dayjs().startOf('day').add(1, 'day'));
          setFormEnd(dayjs().endOf('day'));
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

  useEffect(()=>{
    console.log('try to editmode', editMode);
    if (!editMode){
      setIntersected([]);
      return;
    }
    let st = formStart.startOf('day').unix();
    let end = formEnd ? formEnd.endOf('day').unix() : 9999999999999999;
    setIntersected([]);
    let inters = [];
    for (let i = 0; i < baseLinks.length; i++) {
      const element = links[i];
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
          inters.push(element.id);
        }
      }

    setIntersected(inters);
    console.log(inters);
  },[baseLinks, formStart, formEnd, editMode]);

  useEffect(()=>{
      setEditMode(openAddSection);
  },[openAddSection]);

  const onOpenEditorRow = (id)=>{
    setOpenAddSection(false);
    setCloseAllEditorRows(id);
  }

  const error = () => {
    alert('Начало действия графика может быть установлено только с завтрашнего дня');
    // alert()
  };

  const loadMoreAction = ()=>{
    setPage_num(page_num + 1);
    // setTimeout(() => {
    //   get_links();
    // }, 500);

    
  }
  useEffect(()=>{ 
    if (page_num > 1 && open){
      get_links();
    }
  },[page_num]);


  useEffect(()=>{
    console.log(props.schedule_list);
    setFormSched( props.schedule_list
      .filter((item)=> item.id_company === props.data.id_company)
      .filter((item)=>formType === null || item.skud_schedule_type_id === formType)[0]?.id);
   },[formType]);

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
   * Получение графиков
   * @param {*} req 
   * @param {*} res 
   */
  const get_links = async (req, res) => {
      try {
          let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/groups/schedules_get/' + props.target_id, 
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

          setBaseLinks([...baseLinks, ...response.data.data]);
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
    if (formSched && formStart){
      const data = {
        group_id: props.target_id,
        schedule_id: formSched,
        start: formStart.unix(),
        end: !formEnd ? null : formEnd.unix()
      };

      for (let i  = 0; i < baseLinks.length ; i++){
        const checkLink = baseLinks[i];
        const startDate = dayjs(checkLink.start).unix();
        const endDate = checkLink.end !== null ? dayjs(checkLink.end).unix() : null;

        if (startDate < data.start && (endDate === null || (endDate > data.start ))){
          // Обновляем найденную строку с пересечением - меняем дату окончания
          checkLink.end = dayjs().unix(data.start).subtract(1, 'day').endOf('day').unix();
          update_links(checkLink);
        };

        // if (startDate >= data.start && data.end !== null && data.end  (endDate === null || endDate <= data.))

        console.log(checkLink);
      }

      data.id = dayjs().unix();
      setBaseLinks([...baseLinks, data]);

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
                  let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/groups/schedules',
                      {   
                          data: body, 
                          _token: CSRF_TOKEN
                      }
                  );
                  console.log('__ RS --------', response);
                  console.log(props.schedule_list);
                  let object = response.data.data;
                  console.log(object);

                  for (let i = 0; i < props.schedule_list.length; i++) {
                    if (props.schedule_list[i].id === body.schedule_id){
                      object.schedule_name = props.schedule_list[i].name;
                      object.schedule_type = props.schedule_list[i].type;
                      console.log('inserted object ',object);
                      break;
                    }
                  }

                  setBaseLinks([...baseLinks, object]);
              } catch (e) {
                  console.log(e)
              } finally {
            }
        }


      const updateOldLink = (data) => {
        if (data){
          const data_up = {
            group_id: props.target_id,
            schedule_id: formSched,
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
                    let response = await PROD_AXIOS_INSTANCE.put('/api/timeskud/groups/schedules/' + body.id,
                        {   
                            data: body, 
                            _token: CSRF_TOKEN
                        }
                    );
                    body.start = dayjs().unix(body.start).format('YYYY-MM-DD HH:mm:ss');
                    if (body.end){
                      body.end = dayjs().unix(body.end).format('YYYY-MM-DD HH:mm:ss');
                    }
                    console.log('users', response);
                    setBaseLinks(prevList => 
                      prevList.map(item => 
                          item.id === body.id ? { ...item, ...body } : item // Заменяем объект по id
                      )
                  );
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
            let response = await PROD_AXIOS_INSTANCE.delete('/api/timeskud/groups/schedules/' + id + '?_token=' + CSRF_TOKEN,
              {   
                  data: id, 
                  _token: CSRF_TOKEN
              }
          );
          setBaseLinks(baseLinks.filter((item)=>{return item.id !== id}));
        } catch (e) {
            console.log(e);
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

  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* Basic */}


      <Modal
        title="Менеджер графиков"
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
          xxl: '60%',
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
                  
                  placeholder="Тип графика"
                  // optionFilterProp="label"
                  onChange={(value)=>setFormType(value)}
                  // onSearch={onSearch}
                  style={{ width: '100%' }}
                  options={[
                    {
                        key: 'schedtype0',
                        value: null,
                        label: 'Все графики',
                    },
                    ...props.schedule_types
                ]
                    }
                  value={formType}
                />
              </div>
              <div>
              <Select
                  showSearch
                  placeholder="Выберите график"
                  optionFilterProp="label"
                  style={{ width: '100%' }}
                  onChange={(vel)=>setFormSched(vel)}
                  // onSearch={onSearch}
                  options={
                    props.schedule_list.filter((item)=> item.id_company === props.data.id_company).
                    filter((item)=>formType === null || item.skud_schedule_type_id === formType)
                    .map((typ)=>
                      { 
                        return {
                      key: `shtlist_${typ.id}`,
                      value: typ.id,
                      label: typ.name
                    }
                  }
                  )}
                  value={formSched}
                />
              </div>
              <div>
                <DatePicker
                  allowClear={false}
                  style={{ width: '100%' }}
                  onChange={(value)=>{setFormStart(value)}}
                  value={formStart}
                  onKeyDown={(event)=> {handleKeyDown(event, setFormStart)} }
                />
              </div>
              <div>
                <DatePicker
                style={{ width: '100%' }}
                onChange={(value)=>{setFormEnd(value)}}
                value={formEnd}
                onKeyDown={(event)=> {handleKeyDown(event, setFormEnd)} }
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
                onClick={()=>{setOpenAddSection(false); setIntersected([]); setEditMode(false)}}
                className={'sk-gtm-button'} />
              </div>
            </div>
            ):(
            <div
              onClick={()=>{setOpenAddSection(true);setEditMode(true)}}
              className={'sk-gtm-trigger'}>
              Добавить график
            </div>
            )}

            
          </div>
            <div className={'sk-grid-table-body'}>
              {links.map((item, index) => 
                {return item.id !== undefined && item.id !== null ? (
                  <TableRowItem
                    key={"rowshed_" + item.id} 
                    on_delete={deleteOldItem}
                    on_save_data={updateOldLink}
                    open_editor={onOpenEditorRow}
                    close_edit={closeAllEditorRows}
                    data={{start: item.start, end: item.end, name: item.schedule_name, type: item.schedule_type, id: item.id}}
                    intersects={intersected}
                    changeDatesCallback={setFormDateCallback}
                    changeEditMode={handleEditMode}
                  />
                ):(<BreakIn
                    key={"rowshedgap_" + index}
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

export default ScheduleManagerModal;







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

  

  useEffect(()=>{
    if (!editMode && props.intersects != null && props.intersects.includes(item_id))
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
    }
  },[startTime, endTime, editMode]);


  useEffect(()=>{
    if (props.changeDatesCallback)
      {
        props.changeDatesCallback(startTime, endTime);
      }
  },[editMode]);

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
      <div><Sched_type_icon>{item_type}</Sched_type_icon></div>
      <div>{item_id}</div>
      <div>{item_name}</div>
      <div>
        {/* we cannot edit rows where start in past */}
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
          endTime ? endTime.format("DD-MM-YYYY") : " - - - "
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
        : (
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

import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Flex, Modal, Select } from 'antd';

import SchedStdSVG from "../../../media/schedule-std.svg";
import SchedFlexSVG from "../../../media/schedule-flex.svg";
import SchedFreeSVG from "../../../media/schedule-free.svg";
import SchedShiftSVG from "../../../media/schedule-shift.svg";
import SchedSumSVG from "../../../media/schedule-sum.svg";
import { HOST_COMPONENT_ROOT, PRODMODE } from '../../../CONFIG/config';
import { DS_SCHEDULE_LIST } from '../../../CONFIG/DEFAULTSTATE';
import { CloseOutlined, DeleteOutlined, EditOutlined, LockOutlined, PlusSquareOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';




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
    const [open, setOpen] = useState(false);
    const [item_id, setItem_id] = useState(null);
    const [closeAllEditorRows, setCloseAllEditorRows] = useState(0);

    const [baseSchedules, setBaseSchedules] = useState([]);
    const [schedules, setSchedules] = useState([]);

    const [baseLinks, setBaseLinks] = useState([]);

    const [schedTypes, setSchedTypes] = useState([]);

    const [openAddSection, setOpenAddSection] = useState(false);
    const [page_num, setPage_num] = useState(1);
    const [page_offset, setPage_offset] = useState(30);
    const [hasMoreRows, setHasMoreRows] = useState(false);


    useEffect(()=>{
        if (props.on_open){
            setOpen(true); 
            if (PRODMODE){

              setBaseSchedules(DS_SCHEDULE_LIST);
            } else {

            }
        }
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
    }

  const onOpenEditorRow = (id)=>{
    setOpenAddSection(false);
    setCloseAllEditorRows(id);
  }

  const loadMoreAction = ()=>{
    setPage_num(page_num + 1);
  }

  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* Basic */}

      <Button type="primary" onClick={() => setOpen(false)}>
        Open Modal of responsive width
      </Button>
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
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="label"
                  // onChange={onChange}
                  // onSearch={onSearch}
                  style={{ width: '100%' }}
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack',
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy',
                    },
                    {
                      value: 'tom',
                      label: 'Tom',
                    },
                  ]}
                />
              </div>
              <div>
              <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="label"
                  style={{ width: '100%' }}
                  // onChange={onChange}
                  // onSearch={onSearch}
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack',
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy',
                    },
                    {
                      value: 'tom',
                      label: 'Tom',
                    },
                  ]}
                />
              </div>
              <div>
                <DatePicker
style={{ width: '100%' }}
                />
              </div>
              <div>
                <DatePicker
style={{ width: '100%' }}
                />
              </div>
              <div>
                <PlusSquareOutlined
                  
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
              Добавить график
            </div>
            )}

            
          </div>
            <div className={'sk-grid-table-body'}>
              <TableRowItem 
                open_editor={onOpenEditorRow}
                close_edit={closeAllEditorRows}
              data={{start: 1738068722, end: 1738068722, name: "Hello wolf", type: 1, id: 324}}
              />
              <TableRowItem 
                open_editor={onOpenEditorRow}
                close_edit={closeAllEditorRows}
              data={{start: 1738068722, end: 1738068722, name: "Hello wolf2", type: 2, id: 645}}
              />
              <TableRowItem 
                open_editor={onOpenEditorRow}
                close_edit={closeAllEditorRows}
              data={{start: 1738068722, end: 1738068722, name: "Hello wolf3", type: 3, id: 6445}}
              />
              <TableRowItem 
                open_editor={onOpenEditorRow}
                close_edit={closeAllEditorRows}
              data={{start: 1738068722, end: 1738068722, name: "Hello wolf4", type: 3, id: 445}}
              />


              <div className={'sk-gt-table-row'}>
                <div><Sched_type_icon>{1}</Sched_type_icon></div>
                <div>id</div>
                <div>name</div>
                <div>start</div>
                <div>end</div>
                <div><EditOutlined /></div>
                <div><DeleteOutlined /></div>
              </div>
              <div className={'sk-gt-table-row'}>
                <div><Sched_type_icon>{2}</Sched_type_icon></div>
                <div>id</div>
                <div>name</div>
                <div>start</div>
                <div>end</div>
                <div></div>
                <div><LockOutlined /></div>
              </div>
              <div className={'sk-gt-table-row'}>
                <div><Sched_type_icon>{2}</Sched_type_icon></div>
                <div>id</div>
                <div>name</div>
                <div>start</div>
                <div>end</div>
                <div></div>
                <div><LockOutlined /></div>
              </div>
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
  const [endTime, setEndTime] = useState(props.data.end ? dayjs(props.data.start) : null);
  const [_startTime] = useState(props.data.start ? dayjs(props.data.start) : null);
  const [_endTime] = useState(props.data.end ? dayjs(props.data.start) : null);

  const [hasChanges, setHasChanges] = useState(false);

  const [item_id, setItem_id] = useState(props.data.id);
  const [item_name, setItem_name] = useState(props.data.name);
  const [item_type, setItem_type] = useState(props.data.type);

  useEffect(()=>{
    if (props.close_edit !== item_id){
      setEditMode(false);
      console.log('setEditMode false');
    }
  },[props.close_edit]);
  
  useEffect(()=>{
    if (editMode){

      if (startTime.unix() != _startTime.unix()
      || JSON.stringify(endTime) != JSON.stringify(_endTime)
      ) {
        setHasChanges(true);
      } else {
        setHasChanges(false);
      };
    }
  },[startTime, endTime]);

  useEffect(()=>{
    if (editMode){
      if (endTime && endTime.unix() < dayjs().unix()){
        setEndTime(dayjs().startOf('day').add(1, 'day'));
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

        let a = startTime.unix();
        let b = dayjs().startOf('day').unix();
        console.log('item time', a, b, 'today time');
        if (endTime && a > b )
        {
          setStartTime(endTime);
        } 
    }
  },[endTime]);

  const onSaveItem = ()=>{
    setEditMode(false);
    setHasChanges(false);
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
    <div className={'sk-gt-table-row'}>
      <div><Sched_type_icon>{item_type}</Sched_type_icon></div>
      <div>id</div>
      <div>{item_name}</div>
      <div>
        {editMode ? (
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
import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import TextHighlight from "../../../Utils/TextHelpers/TextHighlight";
import { CloseOutlined, DownOutlined, EditOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { HOST_COMPONENT_ROOT } from "../../../CONFIG/config";
import SchedStdSVG from "../../../media/schedule-std.svg";
import SchedFlexSVG from "../../../media/schedule-flex.svg";
import SchedFreeSVG from "../../../media/schedule-free.svg";
import SchedShiftSVG from "../../../media/schedule-shift.svg";
import SchedSumSVG from "../../../media/schedule-sum.svg";
import SchedEmptySVG from "../../../media/schedule-empty.svg";
import RuleIcons from "../../RULE_MANAGER/components/RuleIcons";


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

        return (<img src={HOST_COMPONENT_ROOT + SchedEmptySVG}    title='Нет графика'/>);
    }
}



const UserManagerCard = (props)=>{
    const [userName, setUserName] = useState(`${props.data.surname} ${props.data.name} ${props.data.patronymic}`);
    const [opened, setOpened] = useState(false);
    const [selected, setSelected] = useState(false);
    const [itemId, setItemId] = useState(props.data.id);
    const [companyName, setCompanyName] = useState(props.data.company_name);
    const [companyColor, setCompanyColor] = useState(props.data.company_color);

    const [data, setData] = useState(props.data);

    const [dapartment, setDepartment] = useState(props.data.department_name);
    const [occupu, setOccupy] = useState(props.data.occupy);
    const [groups, setGroups] = useState(props.groups.filter((item)=>{return props.data.groups.includes(item.id)}));

    const [wordsToHighlight , setWordsToHighlight ] = useState([]);

    const unlinkGroupAction = (group_id) => {
        if (props.onUnlinkGroup){
            props.onUnlinkGroup(itemId, group_id);
        }
    }

    useEffect(()=>{
        if (props.search_strings){
            setWordsToHighlight(props.search_strings);
        }
    },[props.search_strings]);

    const handleSelectAction = (ev) =>{
        setSelected(ev.target.checked);
        if (props.onSelectCard){
            props.onSelectCard(itemId, ev.target.checked);
        }
    }

    useEffect(()=>{
        let fgroups = props.groups.filter((item)=>{return props.data.groups.includes(item.id)});
        setGroups(fgroups);
    },[props.data.groups]);

    useEffect(()=>{
        setSelected(props.selected);
    },[props.selected]);
       
    useEffect(()=>{ 
        setItemId(props.data.id);
        setData(props.data);
        setUserName(`${props.data.surname} ${props.data.name} ${props.data.patronymic}`); },
    [props.data.surname, props.data.name, props.data.patronymic, props.data.id]);




    const handleDblClickOnSchedule = () => {
        if (props.onOpenScheduleModal)
            {
                props.onOpenScheduleModal(itemId);
            }
    }

    const handleDblClickOnRule = () => {
        if (props.onOpenRuleModal){
            props.onOpenRuleModal(itemId);
        }
    }

    const setOpenScheduleModal = () => {
        if (props.onOpenScheduleModal)
        {
            props.onOpenScheduleModal(itemId);
        }
    }

    const setOpenRuleModal = () => {
        if (props.onOpenRuleModal){
            props.onOpenRuleModal(itemId);
        }
    }



    return (
        <div className={`sk-um-card ${selected ? "sk-um-card-selected" : ""}`}>
            <div className={'sk-um-row sk-um-grid-5col'}>
                <div className={'skum-firstcol'}>
                    {itemId}
                </div>
                <div className={'sk-um-title'}>
                {/* <Highlighter
                        highlightClassName="highlight"
                        /> */}
                    <TextHighlight
                        searchWords={wordsToHighlight}
                        text={userName}
                    />
                </div>
                <div>
                <TextHighlight
                        searchWords={wordsToHighlight}
                        text={occupu}
                    />
                    
                </div>
                <div>
                <TextHighlight
                        searchWords={wordsToHighlight}
                        text={dapartment}
                    />
                </div>
                <div>
                    <div className={'sk-company-tag'} style={{border: `1px solid ${companyColor}`, color: `${companyColor}`}}>
                        {companyName}

                    </div>
                </div>
            </div>
            <div className={'sk-flex'}>
                <div className={'skum-firstcol'}>
                
                </div>
                <div style={{width: '100%', marginTop: '6px',marginBottom: '6px',}} className={'skum-card-content'}>
                   
                {data.linked_schedule && data.linked_schedule.id > 0 ? (
                    <div onDoubleClick={handleDblClickOnSchedule} className={'sk-group-flexer-in-row'}>
                      <div><Sched_type_icon>{data.linked_schedule && data.linked_schedule.type ? data.linked_schedule.type : 0}</Sched_type_icon></div>
                      <div>Текущий график: <span className={'sk-font-accent'}>{data.linked_schedule.name}</span></div>
                      <div>{data.linked_schedule.start  ? dayjs(data.linked_schedule.start).format("DD-MM-YYYY") : "..."}</div>
                      <div>{data.linked_schedule.end ? dayjs(data.linked_schedule.end).format("DD-MM-YYYY") : "..."}</div>
                      <div>
                        {data.schedules_in_queue ? (
                          <span><strong>{data.schedules_in_queue}</strong> в очереди</span>
                        ) : ""}
                        </div>
                      <div  onClick={setOpenScheduleModal} className={'sk-groupcard-mini-trigger'}><EditOutlined /></div>
                    </div> 
                    ) : (
                      <div onDoubleClick={handleDblClickOnSchedule} className={'sk-group-flexer-in-row'}>
                        <div></div>
                        <div>Нет графика...</div>
                        <div>-</div>
                        <div>-</div>
                        <div>                        
                          {data.schedules_in_queue ? (
                          <span><strong>{data.schedules_in_queue}</strong> в очереди</span>
                        ) : "-"}</div>
                        <div  onClick={setOpenScheduleModal} className={'sk-groupcard-mini-trigger'}><PlusOutlined /></div>
                      </div>  
                    )}


                    {data.linked_rules && data.linked_rules.length > 0 ? (
                      <div>
                        <div className={'sk-group-flexer-in-row'} onDoubleClick={handleDblClickOnRule} >
                        <span onClick={()=>setOpened(!opened)}> {opened ?  (<UpOutlined />) : (<DownOutlined />)}</span>
                          
                            <div>
                            Прикреплено првил: <strong>{data.linked_rules && data.linked_rules.length}</strong> </div>
                          <div></div>
                          <div></div>
                          <div><strong>{data?.rules_in_queue}</strong> в очереди</div>
                          <div  onClick={setOpenRuleModal} className={'sk-groupcard-mini-trigger'}><EditOutlined /></div>
                        </div>
                        {opened && (
                          <div className={'sk-groupcard-graystack'}>
                            {data.linked_rules.map((row)=>{return (
                              <div key={`${row.id}_n_${row.type}`} className={'sk-group-flexer-in-row'} onDoubleClick={handleDblClickOnRule} >
                                <span><RuleIcons type={row.type}/></span>
                                <div onClick={setOpenRuleModal}>  {row.name}</div>
                                <div>{row.start ? dayjs(row.start).format('DD-MM-YYYY') : "..."}</div>
                                <div>{row.end ? dayjs(row.end).format("DD-MM-YYYY") : "..."}</div>
                                <div></div>
                              </div>
                            )})}
                          </div>
                        )}

                      </div>
                    ) : (
                      <div onDoubleClick={handleDblClickOnRule}  className={'sk-group-flexer-in-row'}>
                        <div></div>
                        <div>Нет правил...</div>
                        <div>-</div>
                        <div>-</div>
                        <div>-</div>
                        <div  onClick={setOpenRuleModal} className={'sk-groupcard-mini-trigger'}><PlusOutlined /></div>
                      </div>
                    )}

                </div>
            </div>
            <div>
                <div className={'sk-flex sk-um-footer'}>
                    <div className={'sk-um-checkbox skum-firstcol'}>
                        <Checkbox
                        checked={selected}
                        onChange={handleSelectAction}
                        />
                    </div>
                    <div className={'sk-flex'}>
                        { groups.map((item)=>(
                            <div 
                                style={{borderBottom: `1px solid ${item.company_color}`}}
                            className={'sk-um-cgroup-tag'}>
                                <div>{item.name}</div>
                                <div
                                    onClick={()=>{unlinkGroupAction(item.id)}}
                                ><CloseOutlined /></div>
                            </div>
                        ))
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserManagerCard;
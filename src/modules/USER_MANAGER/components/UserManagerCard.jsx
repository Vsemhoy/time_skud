import { Checkbox, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import TextHighlight from "../../../Utils/TextHelpers/TextHighlight";
import { CalendarOutlined, CloseOutlined, DownOutlined, EditOutlined, MenuOutlined, PlusOutlined, TrademarkCircleOutlined, TrademarkOutlined, UpOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { HOST_COMPONENT_ROOT } from "../../../CONFIG/config";
import SchedStdSVG from "../../../media/schedule-std.svg";
import SchedFlexSVG from "../../../media/schedule-flex.svg";
import SchedFreeSVG from "../../../media/schedule-free.svg";
import SchedShiftSVG from "../../../media/schedule-shift.svg";
import SchedSumSVG from "../../../media/schedule-sum.svg";
import SchedEmptySVG from "../../../media/schedule-empty.svg";
import RuleIcons from "../../../assets/Comicon/RuleIcons";
import UmCardSchedRow from "./UmCardSchedRow";
import UmCardRuleRow from "./UmCardRuleRow";


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
    const [groups, setGroups] = useState([]);

    const [vStyle, setVStyle] = useState('view_top_only');

    const [wordsToHighlight , setWordsToHighlight ] = useState([]);

    const unlinkGroupAction = (group_id) => {
        if (props.onUnlinkGroup){
            props.onUnlinkGroup(itemId, group_id);
        }
    }

    useEffect(()=>{
        if (props.viewStyle){
            setVStyle(props.viewStyle);
        }
    },[props.viewStyle]);

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
        if (props.groups ){
            // let fgroups = props.groups.filter((item)=>{return props.data.groups.includes(item.id)});
            // setGroups(fgroups);
            let fgroups = props.groups.filter((item)=>{return item.id_company === props.data.id_company});
            let fgroups2 = [];

            for (let i = 0; i < fgroups.length; i++) {
                const element = fgroups[i];
                if (props.data.groups.includes(element.id)){
                    fgroups2.push(element);
                }
                
            }
            setGroups(fgroups2);
        }
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

    const handleDoubleClickOnTop = (ev)=>{
        console.log('ev', ev)
        ev.preventDefault();
        setSelected(!selected);
        if (props.onSelectCard){
            props.onSelectCard(itemId, !selected);
        }
    }



    const items = [
        {
          key: '1',
          label: (
            <a onClick={setOpenScheduleModal}>
              Редактировать Графики
            </a>
          ),
          icon: <CalendarOutlined />
          
        },
        {
          key: '2',
          label: (
            <a onClick={setOpenRuleModal}>
              Редактировать Правила
            </a>
          ),
          icon: <TrademarkCircleOutlined />
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
          icon: <CloseOutlined />
        },
      ];

    return (
        <div className={`sk-um-card ${selected ? "sk-um-card-selected" : ""}`}>
            <div className={'sk-um-row sk-um-grid-5col'}
                onDoubleClick={handleDoubleClickOnTop}
            >
            
                    <div className={'skum-firstcol'}>
                        <span className={'sk-um-checkbox  skf-hovered-show'}>
                            <Checkbox
                            checked={selected}
                            onChange={handleSelectAction}
                            />
                        </span>
                        <span className={'skf-hovered-hide'}>
                            {itemId}
                        </span>
                    
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
                <div className={'sk-um-second-text'}>
                <TextHighlight
                        searchWords={wordsToHighlight}
                        text={occupu}
                    />
                    
                </div>
                <div className={'sk-um-second-text'}>
                <TextHighlight
                        searchWords={wordsToHighlight}
                        text={dapartment}
                    />
                </div>
                <div className={''} style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div className={'sk-company-tag'} style={{width: '100%', border: `1px solid ${companyColor}`, color: `${companyColor}`, fontSize: 'x-small'}}>
                        {companyName}
                    </div>

                    <Dropdown menu={{ items }} placement="bottomRight" arrow>
                    <div style={{ color: '#666', padding: '0px 3px 0px 9px', cursor: 'pointer'}}>
                        {/* <Button>bottomRight</Button> */}
                        <MenuOutlined />
                    </div>
                    </Dropdown>
                </div>
            </div>



            {(vStyle === "view_top_middle_bottom" || vStyle === "view_top_schedule" || vStyle === "view_top_schedule_rules") && (

                <UmCardSchedRow schedule_item={props.schedule_item} />
                    
            )}
            {(vStyle === "view_top_middle_bottom" || vStyle === "view_top_rules" || vStyle === "view_top_schedule_rules") && (
                <>
                    {props.rule_items && (
                        <UmCardRuleRow rule_items={props.rule_items} rule_types={props.rule_types} />
                    )}
                </>
            )}

            {(vStyle === "view_top_middle_bottom" || vStyle === "view_top_bottom") && (
            <div>
                <div className={'sk-flex sk-um-footer'}>
                    <div className={'sk-um-checkbox skum-firstcol'}>
                        {/* <Checkbox
                        checked={selected}
                        onChange={handleSelectAction}
                        /> */}
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
            )}
        </div>
    )
}

export default UserManagerCard;
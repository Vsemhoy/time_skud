import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import TextHighlight from "../../../Utils/TextHelpers/TextHighlight";
import { CloseOutlined } from "@ant-design/icons";


const UserManagerCard = (props)=>{
    const [userName, setUserName] = useState(`${props.data.surname} ${props.data.name} ${props.data.patronymic}`);

    const [selected, setSelected] = useState(false);
    const [itemId, setItemId] = useState(props.data.id);

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
        setUserName(`${props.data.surname} ${props.data.name} ${props.data.patronymic}`); },
    [props.data.surname, props.data.name, props.data.patronymic, props.data.id]);

    return (
        <div className={`sk-um-card ${selected ? "sk-um-card-selected" : ""}`}>
            <div className={'sk-um-row sk-um-grid-4col'}>
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
            </div>
            <div className={'sk-flex'}>
                <div className={'skum-firstcol'}>
                    
                </div>
                <div>
                    <div>
                        <div>График такой-то</div>
                    </div>
                    <div>
                        Правила такие-то...
                    </div>
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
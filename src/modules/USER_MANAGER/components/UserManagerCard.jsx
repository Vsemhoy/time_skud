import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";

const UserManagerCard = (props)=>{
    const [userName, setUserName] = useState(`${props.data.surname} ${props.data.name} ${props.data.patronymic}`);

    const [selected, setSelected] = useState(false);
    const [itemId, setItemId] = useState(props.data.id);

    const [dapartment, setDepartment] = useState(props.data.department_name);
    const [occupu, setOccupy] = useState(props.data.occupy);
    const [groups, setGroups] = useState(props.groups.filter((item)=>{return props.data.groups.includes(item.id)}));

    useEffect(()=>{
        console.log(props.groups, "PGO");
        console.log(props.data.groups);
        let fgroups = props.groups.filter((item)=>{return props.data.groups.includes(item.id)});
        setGroups(fgroups);
        console.log(" fgro ",fgroups);
    },[props.data.groups]);

    useEffect(()=>{
        setSelected(props.selected);
    },[props.selected]);
       
    useEffect(()=>{ 
        setItemId(props.data.id);
        setUserName(`${props.data.surname} ${props.data.name} ${props.data.patronymic}`); },
    [props.data.surname, props.data.name, props.data.patronymic, props.data.id]);

    return (
        <div className={'sk-um-card'}>
            <div className={'sk-um-row sk-um-grid-4col'}>
                <div className={'skum-firstcol'}>

                </div>
                <div className={'sk-um-title'}>
                    {userName}
                </div>
                <div>
                    {occupu}
                </div>
                <div>
                    {dapartment}
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
                        onChange={(ev)=>(setSelected(ev.target.checked))}
                        />
                    </div>
                    <div className={'sk-flex'}>
                        { groups.map((item)=>(
                            <div 
                                style={{borderBottom: `1px solid ${item.company_color}`}}
                            className={'sk-um-cgroup-tag'}>{item.name}</div>
                        ))
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserManagerCard;
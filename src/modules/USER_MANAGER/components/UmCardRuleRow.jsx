import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { secondsToTime } from "../../../components/Helpers/TextHelpers";
import { DS_SCHED_UNITS } from "../../../CONFIG/DEFAULTSTATE";
import { HOST_COMPONENT_ROOT } from "../../../CONFIG/config";


import RuleIcons from "../../RULE_MANAGER/components/RuleIcons";
import { EllipsisOutlined } from "@ant-design/icons";




const UmCardRuleRow = (props)=>{
    console.log('props', props)

    const [unitName, setUnitName] = useState("");

    const [rules, setRules] = useState(props.rule_items);
    const [types, setTypes] = useState(props.rule_types);

    useEffect(()=>{
        if (props && props.rule_item && props.rule_item.skud_rule_type_id < 3){
            let unit = DS_SCHED_UNITS.find((u)=>{return u.value === props.rule_item.target_unit});
            console.log('unit', unit)
            if (unit){
                setUnitName(unit.label);
            }
        }
    }, [props.rule_item])

    return (
        <>
        {props.rule_items === null || rules === undefined  || rules.length === 0 ? (
                <div className={'sk-row-cc-2col'}>
                    <div style={{textAlign:'center', padding: '3px',color: '#8b8b8b'}}>
                        <EllipsisOutlined />
                    </div>
                    <div style={{padding: '3px',color: '#8b8b8b'}}>
                        Нет привязанных правил
                    </div>
                </div>
            ):(
                <>
        {rules.map((rule)=>{
            const typ  = types.find((item)=> {return item.id === rule.rule_type_id});
            return (

            <div className={'sk-row-cc-2col'}>
            <div style={{textAlign:'center', opacity: 0.8}} className={'sk-cccard-flexer-in-row'}>
                <RuleIcons type={rule.rule_type_id}/>
            </div>
            <div className={'sk-row-inline-several-col'}>
                <div className={'sk-row-in-cell'}
                    title={rule.description}
                    style={{textAlign:'left'}}
                    >
                    {rule.name}
                </div>
                <div className={'sk-row-in-cell'}
                title={typ?.variable_a}
                >
                    { rule.variable_a}
                </div>
                <div className={'sk-row-in-cell'}
                
                >
                </div>
                <div className={'sk-row-in-cell'}
                title={typ?.variable_b}
                >
                    { rule.variable_b}
                </div>
                <div className={'sk-row-in-cell'}
                
                >
                </div>
                    <div className={'sk-row-in-cell'}
                    
                    >
                </div>
                <div className={'sk-row-in-cell'}
                    title={"Целевое время"}
                >
                    {secondsToTime(rule.duration_time)}
                </div>
                <div className={'sk-row-in-cell'}>
                    {unitName}
                </div>
                
            </div>
            </div>
        )})}
        </>
            )}
        </>
    );
}

export default UmCardRuleRow;
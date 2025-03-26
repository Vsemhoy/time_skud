import { Checkbox, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import NotiCard from "./components/NotiCard";
import dayjs from "dayjs";



const NotifierPage = (props) => {
    const [noteTypes, setNoteTypes] = useState([
        {
            id: 1, 
            name: "Первый тип",
            color: "#bbb",
        },
        {
            id: 2, 
            name: "Второй тип",
            color: "#111111",
        },
    ]);

    const [formRequired, setFormRequired] = useState(false);
    const [formType, setFormType] = useState(1);
    const [formTypeColor, setFormTypeColor] = useState("#fff");
    const [formTypeName, setFormTypeName] = useState("Первый тип");

    const [formContent, setFormContent] = useState("Воздух эфир а значит, снег это белы шум...");
    const [formTargetUser, setTargetUser] = useState(46);

    const changeFormRequired = () =>{
        setFormRequired(!formRequired);
    };

    const changeContent = (ev) => {
        setFormContent(ev.target.value);
    }

    const changeType = (ev) => {
        console.log(ev);
        let needle  = noteTypes.find((item)=> {return item.id === ev});
        if (needle){
            setFormTypeColor(needle.color);
            setFormTypeName(needle.name);
        }
    }

    return (
        <div className="sk-mw-1200 sk-flex" style={{ marginTop: '22px', minHeight: "calc(100vh - 80px)"}}>

        <div className={'sk-w-60'} style={{padding: '12px', background: "#ededed" }}>
            <div className={' '} style={{flexDirection: "column", alignContent: 'space-between', alignItems: 'left', gridGap: '1rem', display: 'grid'}}>
                <Select
                    defaultValue={1}
                    style={{ width: 120 }}
                    onChange={changeType}
                    options={noteTypes.map((item)=>{
                        return {
                            key: `fooo${item.id}`,
                            value: item.id,
                            label: item.name
                        }
                    })}
            />

                    <TextArea 
                        rows={12}
                        placeholder="Cooбщение пользователю"
                            onChange={changeContent}
                        >
                    </TextArea>

                    <Checkbox checked={formRequired}  onChange={changeFormRequired}>Принудительное прочтение</Checkbox>


            </div>
        </div>

        <div className={'sk-w-40'}>
            {formContent && (
                <div style={{background: 'white', padding: '12px'}}>
                    <NotiCard
                        data={{id:33,
                            is_read: false,
                            mandatory: formRequired,
                            created_at: dayjs().format('YYYY-MM-DD'),
                            content: formContent,
                            color: formTypeColor,
                            name: formTypeName
                        }}
                    />
                    <NotiCard
                        data={{id:333,
                            is_read: false,
                            mandatory: formRequired,
                            created_at: dayjs().format('YYYY-MM-DD'),
                            content: formContent,
                            color: formTypeColor,
                            name: formTypeName
                        }}
                    />
                    <NotiCard
                        data={{id:332,
                            is_read: false,
                            mandatory: formRequired,
                            created_at: dayjs().format('YYYY-MM-DD'),
                            content: formContent,
                            color: formTypeColor,
                            name: formTypeName
                        }}
                    />
                </div>

                
            )}
        </div>
            
        </div>
    );
}

export default NotifierPage;
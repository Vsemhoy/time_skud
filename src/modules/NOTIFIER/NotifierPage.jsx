import { Button, Checkbox, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import NotiCard from "./components/NotiCard";
import dayjs from "dayjs";
import { PROD_AXIOS_INSTANCE } from "../../API/API";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import { DS_DEFAULT_USERS } from "../../CONFIG/DEFAULTSTATE";
import MDEditor from "@uiw/react-md-editor";



const NotifierPage = (props) => {
    const [noteTypes, setNoteTypes] = useState([
        {
            id: 1, 
            name: "Системное сообщение",
            color: "#ff4d4f",
        },
        {
            id: 2, 
            name: "Обновление системы",
            color: "#03a9f4",
        },
    ]);

    const [formRequired, setFormRequired] = useState(false);
    const [formType, setFormType] = useState(1);
    const [formTypeColor, setFormTypeColor] = useState("#999");
    const [formTypeName, setFormTypeName] = useState("Первый тип");

    const [formContent, setFormContent] = useState("Воздух эфир а значит, снег это белы шум...");
    const [formTargetUser, setTargetUser] = useState(46);

    const [baseUserListData, setBaseUserListData] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);

  /** ------------------ FETCHES ---------------- */

      /**
       * Получение списка пользователей
       * @param {*} req 
       * @param {*} res 
       */
      const get_types = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.get('/api/notice/types?_token=' + CSRF_TOKEN);
            console.log('users', response);
            setNoteTypes(response.data.types);
        } catch (e) {
            console.log(e)
        } finally {
            // setLoadingOrgs(false)
        }
    }


          /**
       * Получение списка пользователей
       * @param {*} req 
       * @param {*} res 
       */
          const get_users = async (req, res) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.get('/api/timeskud/users/users?_token=' + CSRF_TOKEN);
                console.log('users', response);
                setBaseUserListData(response.data.data.sort((a,b)=>{
                    if (a.surname.toLowerCase() < b.surname.toLowerCase()) {
                      return -1;
                    }
                    if (a.surname.toLowerCase() > b.surname.toLowerCase()) {
                      return 1;
                    }
                    return 0;
                  }));
            } catch (e) {
                console.log(e)
            } finally {
                // setLoadingOrgs(false)
            }
        }

          /**
       * Получение списка пользователей
       * @param {*} req 
       * @param {*} res 
       */
        const sendNotes = async (body, req, res) => {
        try {
                    let response = await PROD_AXIOS_INSTANCE.post('/api/notice/create',
                        {   
                            data: body, 
                            _token: CSRF_TOKEN
                        }
                    );
                    alert(response.data.message);
                    // setBaseUserListData(response.data.data);
                } catch (e) {
                    console.log(e)
                    alert(e.response.data.message);
                } finally {

              }
        }
  /** ------------------ FETCHES END ---------------- */

  useEffect(()=>{
    if (PRODMODE){
        get_types();
        get_users();
    } else {
        setBaseUserListData(DS_DEFAULT_USERS);
    }
  },[]);

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
        setFormType(ev);
    }

    const reselectUsers = (ev)=> {
        console.log(ev);
        setSelectedUsers(ev);
    }


    const sendMessages = ()=>{
        if (selectedUsers.length === 0 || formContent.trim() === ""){
            return;
        };
        let su = [];
        for (let i = 0; i < selectedUsers.length; i++) {
            su.push(parseInt( selectedUsers[i]));
        }

        let body = {
            "bo_type_notice_id": formType,
            "content" : formContent,
            "user_id": su,
            "mandatory" : formRequired,
        };

        sendNotes(body);
    }

    return (
        <div className="sk-mw-1200 sk-flex" style={{ marginTop: '22px', minHeight: "calc(100vh - 80px)"}}>

        <div className={'sk-w-60'} style={{padding: '12px', background: "#ededed" }}>
            <div className={' '} style={{flexDirection: "column", alignContent: 'space-between', alignItems: 'left', gridGap: '1rem', display: 'grid'}}>
                <Select
                    defaultValue={1}
                    style={{ width: 120 }}
                    onChange={changeType}
                    options={noteTypes.map((item)=>(
                         {
                            key: `fooo${item.id}`,
                            value: item.id,
                            label: item.name
                        }
                    ))}
            />

                    <TextArea 
                        rows={12}
                        placeholder="Cooбщение пользователю"
                            onChange={changeContent}
                        >
                            Used for selecting multiple values from several options.
                            If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be submitted.
                    </TextArea>

                    <Checkbox checked={formRequired}  onChange={changeFormRequired}>Прочтение по нажатию кнопки</Checkbox>

                    <Select
                    mode={"multiple"}
                    options={baseUserListData.map((item)=>({
                            value: item.id,
                            label: "(" +  item.id + ") " + item.surname + " " + item.name + " " + item.patronymic,
                            key: `usern${item.id}`
                        }
                    ))}
                    onChange={reselectUsers}
                    placeholder={'пользователи'}
                    value={selectedUsers}
                    />

                    <Button
                        onClick={sendMessages}
                    >
                        Отправить
                    </Button>


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
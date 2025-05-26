import React, { useEffect, useState, useId, useRef } from 'react';
import './components/style/aclskud2.css';
import { BarsOutlined, BuildOutlined, CheckCircleOutlined, CheckOutlined, ClearOutlined, CloseCircleOutlined, ClusterOutlined, CopyOutlined, DeleteColumnOutlined, DeleteOutlined, DiffOutlined, DownSquareOutlined, EditOutlined, EyeOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { AimOutlined, BlockOutlined, BugOutlined, CarOutlined, DockerOutlined, DollarOutlined, MedicineBoxOutlined, MoonOutlined, PlusCircleOutlined, PlusOutlined, RocketOutlined, SmileOutlined, TruckOutlined } from "@ant-design/icons";
import { Affix, Checkbox, Dropdown, Radio, Select, Tabs } from 'antd';
import { CSRF_TOKEN, PRODMODE } from '../../../CONFIG/config';
import { DS_DEPARTMENTS, DS_USERLIST_USERS } from '../../../CONFIG/DEFAULTSTATE';
import AclSkudCardRow from './components/AclSkudCardRow';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';
import { ACL_ACTUAL_USERS, ACL_COLUMNS, ACL_DEPARTS, ACL_DEPARTS_WITH_COUNT, ACL_SK_USERS, ACL_STATES } from './components/AclSkudData';
import AclSkudChecker from './components/AclSkudChecker';
import AclCheckbox from './components/AclSkudCheckbox';



const AclSkudPage2 = (props) => {

    const [baseUserCollection, setBaseUserCollection] = useState([]);
    const [userCollection, setUserCollection] = useState([]);
    const [departments, setDepartments]  = useState([]);

    // { user_id as key, [{ acl data}, ...]}
    const [userAcls, setUserAcls] = useState({});
    const [departAcls, setDepartAcls] = useState([]);
    

    const [eventTypes, setEventTypes] = useState([]);
    const [aclColumns, setAclColumns] = useState([]);

    const [cooxStateDeparts, setCooxStateDepars] = useState([]);

    const [visibleCompany, setVisibleCompany] = useState(2);

    const [selectTargetCompanyUsers, setSelectTargetCompanyUsers] = useState(2);

    const [companiesOptions, setCompaniesOptions] = useState([]);
    const [openedTemplates, setOpenedTemplates] = useState([]);
    const [openedDeparts, setOpenedDeparts] = useState([]);
    const [openedUsers, setOpenedUsers] = useState([]);

    const prevOpenedUsers = useRef([]);
    const prevOpenedTemplates = useRef([]);

    const [copyBuffer, setCopyBuffer] = useState([]);

    
    const rowMenuItems = [
      {
        key: 'u_cmd_copy_access',
        label: (
          <div>
            Скопировать доступы
          </div>
        ),
      },
      {
        key: 'u_cmd_paste_access',
        label: (
          <div>
            Вставить доступы
          </div>
        ),
      },
      {
        key: 'u_cmd_clear_access',
        label: (
          <div>
            Очистить доступы
          </div>
        ),
      },
      {
        key: 'u_cmd_set_access_to_depart',
        label: (
          <div>
            Установить всем в отделе
          </div>
        ),
      },
      {
        key: 'u_cmd_set_access_to_template',
        label: (
          <div>
            Установить в шаблон
          </div>
        ),
      },
      {
        key: 'u_cmd_set_access_all_selected',
        label: (
          <div>
            Установить всем выделенным
          </div>
        ),
      },
    ];


    useEffect(() => {
      if (PRODMODE){
        //   get_departments();
        //   get_users();
        //   get_departs2();
        //   get_departtemplates();
        //   get_states();
        //   get_departusers();
        get_departs2();
        get_columns();
        get_states();
        get_users();
      } else {
          setDepartments(ACL_DEPARTS_WITH_COUNT);
          setEventTypes(ACL_STATES);
          setAclColumns(ACL_COLUMNS);
          setBaseUserCollection(ACL_ACTUAL_USERS);

      }
    }, []);

    useEffect(() => {
        // get_departments();
        // get_users();
    }, [visibleCompany]);



    useEffect(() => {
      if (selectTargetCompanyUsers != null && selectTargetCompanyUsers !== 0){
        setUserCollection(baseUserCollection.filter((item)=> item.id_company === selectTargetCompanyUsers));
      } else {
        setUserCollection(baseUserCollection);
      }
    }, [baseUserCollection, selectTargetCompanyUsers]);


    useEffect(() => {
      if (props.userdata?.companies){
        setCompaniesOptions( props.userdata?.companies.filter(item => item.id > 1)
        .map(item => ({
          label: item.name,
          value: item.id,
          key: `tkes_${item.id * item.id}`,
        })));
      }
    }, [props.userdata]);



  /** ------------------ FETCHES ---------------- */


        const get_departs2 = async (filters, req, res) => {
          try {
              let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/getdeparts2', 
                  {
                      data: {
                          id_company: visibleCompany
                      },
                      _token: CSRF_TOKEN
                  });
                  if (response && response.data){
                    setDepartments(response.data.content);
                  }
          } catch (e) {
              console.log(e)
          } finally {
              // setLoadingOrgs(false)
          }
      }


        const get_states = async ( req, res) => {
          try {
              let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/getstates', 
                  {
                      data: {
                          id_company: visibleCompany
                      },
                      _token: CSRF_TOKEN
                  });
                  if (response && response.data){
                  //   setBaseUserCollection(response.data.content);
                    setEventTypes(response.data.content);
                  }
          } catch (e) {
              console.log(e)
          } finally {
              // setLoadingOrgs(false)
          }
      }

      const get_columns = async ( req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/getcolumns', 
                {
                    data: {
                        id_company: visibleCompany
                    },
                    _token: CSRF_TOKEN
                });
                if (response && response.data){
                //   setBaseUserCollection(response.data.content);
                  setAclColumns(response.data.content);
                }
        } catch (e) {
            console.log(e)
        } finally {
            // setLoadingOrgs(false)
        }
    }

  const get_users = async (req, res) => {
      try {
          let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/getdepartusers', 
              {
                  data: {
                      id_company: visibleCompany
                  },
                  _token: CSRF_TOKEN
              });
              if (response && response.data){
                setBaseUserCollection(response.data.content);
              }
      } catch (e) {
          console.log(e)
      } finally {
          // setLoadingOrgs(false)
      }
  }

  const get_temlate_acls = async (filters, req, res) => {
      try {
          let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/getaclentits', 
              {
                  data: {
                      id_company: visibleCompany
                  },
                  _token: CSRF_TOKEN
              });
              if (response && response.data){
              //   setBaseUserCollection(response.data.content);
              }
      } catch (e) {
          console.log(e)
      } finally {
          // setLoadingOrgs(false)
      }
  }

    const get_users_acls = async (users, callbackFn = null, callbackData = null) => {
      try {
          let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/getaclentits', 
              {
                  data: {
                    users: users,
                    table: 'users',
                    id_company: visibleCompany
                  },
                  _token: CSRF_TOKEN
              });
              if (response && response.data){
              //   setBaseUserCollection(response.data.content);
                // setUserAcls(prev => [...prev, response.data.content]);
                if (callbackFn){
                  callbackFn(callbackData, response.data.content);  
                }

                let prev = JSON.parse(JSON.stringify(userAcls));
                console.log(response.data.content);
                for (const key in response.data.content) {
                  if (Object.prototype.hasOwnProperty.call(response.data.content, key)) {
                    const element = response.data.content[key];
                    prev[key] = element;
                  }
                }
                setUserAcls(prev);
              }
      } catch (e) {
          console.log(e)
      } finally {
          // setLoadingOrgs(false)
      }
  }



      const set_acl_users = async (dataset, usersToUpdate = [], req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/setacls', 
                {
                    data: dataset,
                    _token: CSRF_TOKEN
                });
                if (response && response.data){
                  // Если в массиве юзеры, то их нужно перегрузить
                    if (usersToUpdate.length){
                      console.log('USERS TO UPDATE', usersToUpdate);
                      get_users_acls(usersToUpdate);
                    }
                }
        } catch (e) {
            console.log(e)
        } finally {
            // setLoadingOrgs(false)
        }
    }


    /** ------------------ FETCHES END ---------------- */


    const toggleAllDepCooxed = () => {
        if (cooxStateDeparts.length){
            setCooxStateDepars([]);
        } else {
            let coox = [];
            for (let i = 0; i < departments.length; i++) {
                coox.push(departments[i].id);
            }
            setCooxStateDepars(coox);
        }
    }

const toggleTemplatesOpen = (ev, id) => {
    if (ev.shiftKey){
      if (openedTemplates.includes(id))
      {
        setOpenedTemplates([]);
      } else {
        let nt = [];
        for (let i = 0; i < departments.length; i++) {
          nt.push(departments[i].id);
          
        }
        setOpenedTemplates(nt);
      }
    } else {
    setOpenedTemplates(prev => {
      if (prev.includes(id)) {
        // Если id есть — удаляем его
        return prev.filter(item => item !== id);
      } else {
        // Если нет — добавляем
        return [...prev, id];
      }
    });
  }
};

const toggleDepartsOpen = (ev, id) => {
  console.log('ev', ev)
  if (ev.shiftKey){
    let opened = openedDeparts.includes(id);
    if (opened){
      setOpenedDeparts([]);
    } else {
      let ndeps = departments.map(itm => itm.id);
      setOpenedDeparts(ndeps);
      refreshUsersForDeparts(ndeps);
    }
  } else {
    setOpenedDeparts(prev => {
      if (prev.includes(id)) {
        // Если id есть — удаляем его
        return prev.filter(item => item !== id);
      } else {
        // Если нет — добавляем
        refreshUsersForDeparts([id]);
        return [...prev, id];
      }
    });
  }
};

// Если открывается целый отдел, а внутри есть открытые юзера их надо перегрузить с сервера
const refreshUsersForDeparts = (departs) => {
  let user_ids = [];
  for (let i = 0; i < departs.length; i++) {
    const depaid = departs[i];
    for (let n = 0; n < userCollection.length; n++) {
      const usr = userCollection[n];
      if (openedUsers.includes(usr.id)){
        if (usr.depart_id === depaid){
          user_ids.push(usr.id);
        }
      }
    }
  }
  if (user_ids.length){
    get_users_acls(user_ids);
  }
};


const toggleUsersOpen = (ev, id, dep_id) => {
  if (ev.shiftKey){
    // if user opened - close all / else open all
    let opened = openedUsers.includes(id);
    let usersToOperate = userCollection.filter((item) => item.depart_id == dep_id).map(itm => itm.id);
    let nuds = [];
    if (opened){
      for (let index = 0; index < openedUsers.length; index++) {
        if (!usersToOperate.includes(openedUsers[index])){
          nuds.push(openedUsers[index]);
        }
      }
    } else {
      nuds = JSON.parse(JSON.stringify(openedUsers));
      for (let index = 0; index < usersToOperate.length; index++) {
        if (!nuds.includes(usersToOperate[index])){
          nuds.push(usersToOperate[index]);
        }
      }
    }
    setOpenedUsers(nuds);
  } else {
    setOpenedUsers(prev => {
      if (prev.includes(id)) {
        // Если id есть — удаляем его
        return prev.filter(item => item !== id);
      } else {
        // Если нет — добавляем
        return [...prev, id];
      }
    });
  }
};


  const toggleDoubleClickDepart = (row_id) => {
    toggleDepartsOpen({}, row_id);
  }


  const setColumnChecked = (ev, targtype, column, user_id, dep_id ) =>
  {
    let checked = true;
    let acl_data = [];
    
    if (targtype === 'user'){
      if (ev.ctrlKey){
        // Remove checks in column
        checked = false;
      };
      for (let i = 0; i < eventTypes.length; i++) {
        const element = eventTypes[i];
        acl_data.push(
          {
            state_id: element.id,
            col_id: column,
            depart_id: dep_id,
            user_id: user_id,
            value: checked,
          }
        )
      }
      let obj = {
        id_company: visibleCompany,
        table: 'users',
        acl_data: acl_data
      };
      set_acl_users(obj, [user_id]);
      console.log(acl_data);
    } else {
      // for template
    }
  }


  
  const setRowChecked = (ev, targtype, row_id, user_id, dep_id ) =>
  {
    let checked = true;
    let acl_data = [];
    
    if (targtype === 'user'){
      if (ev.ctrlKey){
        // Remove checks in column
        checked = false;
      };
      for (let i = 0; i < aclColumns.length; i++) {
        const element = aclColumns[i];
        acl_data.push(
          {
            state_id: row_id,
            col_id: element.id,
            depart_id: dep_id,
            user_id: user_id,
            value: checked,
          }
        )
      }
      let obj = {
        id_company: visibleCompany,
        table: 'users',
        acl_data: acl_data
      };
      set_acl_users(obj, [user_id]);
      console.log(acl_data);
    } else {
      // for template
    }
      
  }

  const toggleSingleChecboxUser = (ev, user_id, depart_id, column_id, row_id, state) => {
    console.log(user_id, column_id, row_id, state);

    let obj = {
      id_company: visibleCompany,
      table: 'users',
      acl_data: [
        {
          state_id: row_id,
          col_id: column_id,
          depart_id: depart_id,
          user_id: user_id,
          value: state,
        }
      ]
    };
    set_acl_users(obj);
  }


  // Отслеживаем что изменилось в списке открытых юзеров и делаем запрос на их получение
  useEffect(() => {
    const added = openedUsers.filter(id => !prevOpenedUsers.current.includes(id));
    const removed = prevOpenedUsers.current.filter(id => !openedUsers.includes(id));

    if (added.length > 0) {
      console.log('Добавились:', added);
      get_users_acls(added);
    }
    if (removed.length > 0) {
      console.log('Удалились:', removed);
    }

    prevOpenedUsers.current = openedUsers;
  }, [openedUsers]);


  const handleUserSubMenuClick = (user_id, depart_id, info) => {
    console.log(user_id, depart_id, info);

    if (info.key === "u_cmd_copy_access"){
      // CALLBACK_ON_UPDATE_USERS_ACLS = cmd_CopyUserAccesses;
      // CALLBACK_DATA_USERS_ACLS = {user_id: user_id, depart_id: depart_id};
    //  cmd_CopyUserAccesses(user_id, depart_id);
      get_users_acls([user_id], cmd_CopyUserAccesses, {user_id: user_id, depart_id: depart_id});
     }

    if (info.key === "u_cmd_paste_access") cmd_PasteUserAccesses(user_id, depart_id);
    if (info.key === "u_cmd_clear_access") cmd_ClearUserAccesses(user_id, depart_id);
  }




  /* -------------------------- MENU HANDLERS --------------------- */
  // Очистка всех чекбоксов юзера
  const cmd_ClearUserAccesses = (user_id, depart_id) => {
    console.log(user_id, depart_id);
    let acl_data = [];
      for (let i = 0; i < aclColumns.length; i++) {
        const column = aclColumns[i];
        for (let n = 0; n < eventTypes.length; n++) {
          const type = eventTypes[n];
            acl_data.push(
              {
                state_id: type.id,
                col_id: column.id,
                depart_id: depart_id,
                user_id: user_id,
                value: false,
              }
            )
        }
      }
      let obj = {
        id_company: visibleCompany,
        table: 'users',
        acl_data: acl_data
      };
      set_acl_users(obj, [user_id]);
  }

    // Метод вызывается через коллбэк при загрузке аклов для юзеров, если коллбэк передан на вызывающей стороне
  const cmd_CopyUserAccesses = (object, response) => {
    let acl_data = [];
    console.log('COMMAND CALLBACK',object, response);
    let trueAcls = response[object.user_id];
    console.log(trueAcls);
    // const sourcedata = userAcls
    //   for (let i = 0; i < aclColumns.length; i++) {
    //     const column = aclColumns[i];
    //     for (let n = 0; n < eventTypes.length; n++) {
    //       const type = eventTypes[n];
    //       let value = false;

    //         acl_data.push(
    //           {
    //             state_id: type.id,
    //             col_id: column.id,
    //             value: false,
    //           }
    //         )
    //     }
    //   }
    //   let obj = {
    //     id_company: visibleCompany,
    //     table: 'users',
    //     acl_data: acl_data
    //   };

  }

    const cmd_PasteUserAccesses = (user_id, depart_id) => {
    console.log(user_id, depart_id);

  }

  /* -------------------------- MENU HANDLERS --------------------- */





















    return (
        <div className='sk-page-body'>
                <div style={{padding: '6px'}} className={'sk-mw-1600'}>
                    <div>
                        dkfajslkdjfkas
                    </div>
                    <br/>
                    <div className={'sk-flex-space'}>
                        <div className={'sk-flex'}>
                            <div className={'sk-select-visicom'}>Доступы к компании: </div>
                            <div>
                            <Radio.Group
                            block
                            const options = {companiesOptions}
                            defaultValue={2}
                            value={visibleCompany}
                            optionType="button"
                            buttonStyle="solid"
                            onChange={(ev)=>{setVisibleCompany(ev.target.value)}}
                        />
                                </div>
                        </div>
                        <div className={'sk-flex'}>
                            <div className={'sk-select-visicom'}>Показать сотрудников компании: </div>
                            <div>
                                <Select
                                  style={{width: '240px'}}
                                  const options = { [
                                    { label: "Пользователи всех компаний", value: null, key: "allusr" },
                                    ...companiesOptions,
                                  ]}
                                  value={selectTargetCompanyUsers}
                                  onChange={setSelectTargetCompanyUsers}
                                  />
                            </div>
                        </div>
                    </div>
                </div>
        
                    <br/>
        
                       
                <div style={{padding: '6px'}} className={'sk-mw-1600'} key={'fashdjkfjaklsjdf'}>
        
                    <div className={'sk-table-aclskud'}>
                        <Affix offsetTop={0}>                
                            <div className={'sk-table-aclskud-row sk-table-aclskud-header'}>
                            <div className='sk-tas-inwrap'>
                                <div>
                                    {/* <Checkbox></Checkbox> */}
                                </div>
                            <div>
               
                            </div>
                            <div>
                                <div>
                                    Отдел / Сотрудник
                                </div>
                            </div>
                            <div>
                                <div className={'sk-table-aclskud-multicol2'}
                                 style={{
                                    gridTemplateColumns: `repeat(${aclColumns.length}, 1fr)`,
                                  }}
                                >
                                    {aclColumns.map((item)=>(
                                      <div 
                                      className='sk-table-aclskud-cell'
                                        style={{background: `${item.color}26`}}
                                        title={item.text}
                                      >
                                        <div>
                                        <div>
                                        {item.title}
                                        </div>
                                        </div>
                                      
                                      </div>
                                    ))}
                                </div>
                            </div>
        
                            <div>
                            </div>
                            </div>
                        </div>
                        </Affix>

                        <div>
                          {departments.map(item => {
                            const count_users_in = userCollection.filter((user)=> user.depart_id === item.id).length;
                            const current_depart = item.id;
                            return (
                            <div className={`${openedDeparts.includes(item.id) || openedTemplates.includes(item.id) ? "sk-opened-box":"sk-not-opened-box "}`}>
                            <div 
                              onDoubleClick={()=>{toggleDoubleClickDepart(item.id)}}
                              className={`sk-table-aclskud-row sk-table-aclskud-data `} key={`checkdser${item.id}_${item.id}`}>
                              <div className='sk-tas-inwrap sk-tas-inwrap-depart'>
                              <div><Checkbox /></div>
                              <div><div><span style={{ fontWeight: '500', color: `${count_users_in ? '#1f1f1f' : '#3e6c93'}`}}>{item.id}</span></div></div>
                              <div className={'sk-table-aclskud-row-name'}><div className={'sk-flex-space'}>
                                <span style={{ fontWeight: '500', color: `${count_users_in ? '#1f1f1f' : '#3e6c93'}`}}>{item.name}</span>
                                </div></div>
                              <div>
                                <div className={'sk-table-aclskud-multicol2'}
                                 style={{
                                    gridTemplateColumns: `repeat(${aclColumns.length}, 1fr)`,
                                  }}
                                >
                                {aclColumns.map((item)=>(
                                      <div 
                                        className='sk-table-aclskud-cell'
                                        style={{background: `${item.color}26`}}
                                        title={item.text}
                                      >
                                        <div><div></div></div>
                                      
                                      </div>
                                    ))}
                                </div>
                              </div>
                              <div className='sk-flex sk-table-triggers'>
                                <div title='Пользователи отдела'
                                  className={`${openedDeparts.includes(item.id) ? 'sk-trigger-active' : ''}`}
                                  onMouseDown={(ev)=>{toggleDepartsOpen(ev, item.id)}}
                                ><UserSwitchOutlined /> <span className={'sk-count-badge'}>{count_users_in}</span></div>
                                <div title='Шаблон отдела'
                                className={`${openedTemplates.includes(item.id) ? 'sk-trigger-active' : ''}`}
                                  onMouseDown={(ev)=>{toggleTemplatesOpen(ev, item.id)}}
                                ><BuildOutlined /></div>
                                {/* <div title='Очистить строку' ><ClearOutlined /></div> */}
                              </div>
                              </div>
                            </div>


                            { openedTemplates.includes(item.id) && (
                              <div className='sk-act-templaterow'>
                                  {eventTypes.map(type => (
                                    
                                <div 
                                  className={`sk-table-aclskud-row sk-table-aclskud-data `} key={`checktempl${item.id}_${type.id}`}>
                                  <div className='sk-tas-inwrap'>
                                  <div><Checkbox /></div>
                                  <div><div>{type.id}</div></div>
                                  <div className={'sk-table-aclskud-row-name'}><div className={'sk-flex-space'}>
                                    <span>{type.title}</span>
                                    </div></div>
                                  <div>
                                    <div className={'sk-table-aclskud-multicol2'}
                                    style={{
                                        gridTemplateColumns: `repeat(${aclColumns.length}, 1fr)`,
                                      }}
                                    >
                                    {aclColumns.map((item)=>(
                                          <div 
                                            className='sk-table-aclskud-cell'
                                            style={{background: `${item.color}26`}}
                                            title={item.text}
                                          >
                                            <div><div><AclCheckbox

                                             /></div></div>
                                          
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                  <div className='sk-flex sk-table-triggers'>
                                    </div>
                                </div>
                                </div>
                                  ))}
                                <div className={'sk-table-template-control'}>
                                  <div></div>
                                  <div className='sk-flex'>
                                    <div className={'sk-table-template-control-button'}>Установить шаблон всем в отделе</div>
                                    <div className={'sk-table-template-control-button'}>Скопировать шаблон</div>
                                    <div className={'sk-table-template-control-button'}>Вставить шаблон</div>
                                    <div className={'sk-table-template-control-button'}>Установить выделенные всем</div>
                                    <div className={'sk-table-template-control-button'}>Установить снятые всем</div>
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                            )}


                            
                            { openedDeparts.includes(item.id) && (
                              <div>
                              <div>
                                  {userCollection.filter((user)=> user.depart_id === item.id).map(user => {
                                  const userLocalAcls = userAcls[user.id] ? userAcls[user.id] : [];
                                  return (
                                    <div 
                                      onDoubleClick={(ev)=>{toggleUsersOpen(ev, user.id, item.id)}}
                                      className={`sk-table-aclskud-row sk-table-aclskud-data `} key={`checkusr${item.id}_${user.id}`}>
                                      <div className={`sk-tas-inwrap sk-tas-userrow ${openedUsers.includes(user.id) ? 'sk-tas-userrow-border' : ''}`}>
                                      <div><Checkbox /></div>
                                      <div><div>{user.id}</div></div>
                                      <div className={'sk-table-aclskud-row-name'}><div className={'sk-flex-space'}>
                                        <span>{user.surname} {user.name} {user.secondname}</span>
                                        </div></div>
                                      <div>
                                        <div className={'sk-table-aclskud-multicol2'}
                                        style={{
                                            gridTemplateColumns: `repeat(${aclColumns.length}, 1fr)`,
                                          }}
                                        >
                                        {aclColumns.map((item_acco)=>(
                                          <div 
                                            className='sk-table-aclskud-cell'
                                            style={{background: `${item_acco.color}26`}}
                                            title={'Нажать для заполнения колонки ИЛИ зажать нажать с CTRL для очистки колонки'}
                                          >
                                            {openedUsers.includes(user.id) && (
                                              <div className='sk-false-check'
                                              onMouseDown={(ev)=>{setColumnChecked(ev, 'user', item_acco.id, user.id, item.id)}}
                                              >
                                              <div>
                                                <CheckOutlined />
                                               </div>
                                              </div>
                                            )}
                                          
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                  <div className='sk-flex sk-table-triggers'>
                                    <div title='Пользователи отдела'
                                    className={`${openedUsers.includes(user.id) ? 'sk-trigger-active' : ''}`}
                                    onMouseDown={(ev)=>{toggleUsersOpen(ev, user.id, item.id)}}
                                  >
                                    {openedUsers.includes(user.id) ? (
                                      <DeleteColumnOutlined />
                                    ) : (
                                      <ClusterOutlined />
                                    )}
                                  </div>
                                    <div>
                                      <Dropdown menu={{items: rowMenuItems,
                                        onClick: (info) => handleUserSubMenuClick(user.id, item.id, info)
                                      }}
                                        onClick={(ev)=>{console.log(ev)}}
                                      >
                                        <BarsOutlined />
                                      </Dropdown>
                                    </div>
                                </div>
                                </div>
                                 <div className={'sk-aclskud-row-inner'}>
                                    {openedUsers.includes(user.id) && (
                                      <div className='sk-act-depusererow'>
                                        {eventTypes.map(type => {
                                        const userLocalAcls_row = userLocalAcls.filter(itemt => itemt.skud_current_state_id === type.id);
                                        return (
                                        <div 
                                          className={`sk-table-aclskud-row sk-table-aclskud-data `} key={`checktempl${item.id}_${type.id}`}>
                                          <div className='sk-tas-inwrap'>
                                          <div></div>
                                          <div><div>{type.id}</div></div>
                                          <div className={'sk-table-aclskud-row-name'}
                                            title={type.text}
                                          ><div className={'sk-flex-space'}>
                                            <span>{type.title}</span>
                                            </div></div>
                                          <div>
                                            <div className={'sk-table-aclskud-multicol2'}
                                            style={{
                                                gridTemplateColumns: `repeat(${aclColumns.length}, 1fr)`,
                                              }}
                                            >
                                            {aclColumns.map((acc_item)=>{
                                              const localMainCheck = userLocalAcls_row.find((iteme) => iteme.skud_acl_column_id === acc_item.id);
                                              return (
                                                  <div 
                                                    className='sk-table-aclskud-cell'
                                                    style={{background: `${acc_item.color}26`}}
                                                    title={acc_item.text}
                                                  >
                                                    <div><div><AclCheckbox
                                                      user_id={user.id}
                                                      column_id={acc_item.id}
                                                      row_id={type.id}
                                                      depart_id={current_depart}
                                                      onToggle={toggleSingleChecboxUser}
                                                      checked={localMainCheck ? localMainCheck.value : false}
                                                    /></div></div>
                                                  
                                                  </div>
                                                )})}
                                            </div>
                                          </div>
                                          <div className='sk-flex sk-table-triggers'>
                                            <div className='sk-false-check'
                                              title={'Нажать для заполнения строки ИЛИ зажать нажать с CTRL для очистки строки'}
                                              onMouseDown={(ev)=>{setRowChecked(ev, 'user', type.id, user.id, item.id)}}
                                            >
                                              <div>
                                                <CheckOutlined />
                                              </div>
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                          )})}
                                      </div>
                                    )}
                                  </div>
                                 </div>
                                  )})
                                  }
                              </div>
                              </div>
                              )}
                            </div>
                          )})}
                        </div>
            </div>
        </div>
    </div>
    )

}

export default AclSkudPage2;
import React, { useEffect, useState, useId, useRef } from 'react';
import './components/style/aclskud2.css';
import { BarsOutlined, BuildOutlined, CheckCircleOutlined, CheckOutlined, ClearOutlined, CloseCircleOutlined, CloseOutlined, ClusterOutlined, CopyOutlined, DeleteColumnOutlined, DeleteOutlined, DiffOutlined, DownSquareOutlined, EditOutlined, EyeOutlined, UserSwitchOutlined } from '@ant-design/icons';
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
    const [copySource, setCopySource] = useState(null)

    const [selectedDeparts, setselectedDeparts] = useState([]);
    const [selectedDepartsInermed, setselectedDepartsIntermed] = useState([]);
    const [selectedUsers, setselectedUsers] = useState([]);

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
          <div className='sk-mitem-special'>
            Установить эти доступы всем в отделе 
          </div>
        ),
      },
      {
        key: 'u_cmd_set_access_to_template',
        label: (
          <div className='sk-mitem-special'>
            Установить эти доступы в шаблон 
          </div>
        ),
      },
      {
        key: 'u_cmd_set_access_all_selected',
        label: (
          <div className='sk-mitem-special'>
            Установить эти доступы  всем выделенным
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
        setUserAcls([]);
        get_users_acls(openedUsers);
    }, [visibleCompany]);


    useEffect(() => {
      console.log(copyBuffer);
    }, [copyBuffer]);


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

  const get_temlate_acls = async (items, callbackFn = null, callbackData = null) => {
      try {
        let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/getaclentits', 
          {
              data: {
                departs: items,
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



  const set_acl_templates = async (dataset, itemToUpdate = [], req, res) => {
    try {
        let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/setacls', 
            {
                data: dataset,
                _token: CSRF_TOKEN
            });
            if (response && response.data){
              // Если в массиве юзеры, то их нужно перегрузить
                if (itemToUpdate.length){
                  console.log('USERS TO UPDATE', itemToUpdate);
                  get_temlate_acls(itemToUpdate);
                }
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

  // Отслеживаем что изменилось в списке открытых templates и делаем запрос на их получение
  useEffect(() => {
    const added = openedTemplates.filter(id => !prevOpenedTemplates.current.includes(id));
    const removed = prevOpenedTemplates.current.filter(id => !openedTemplates.includes(id));

    if (added.length > 0) {
      console.log('Добавились:', added);
      get_temlate_acls(added);
    }
    if (removed.length > 0) {
      console.log('Удалились:', removed);
    }

    prevOpenedTemplates.current = openedDeparts;
  }, [openedTemplates]);




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
      get_users_acls([user_id], cmd_CopyUserAccesses, {user_id: user_id, depart_id: depart_id});
     }

    if (info.key === "u_cmd_paste_access") cmd_PasteUserAccesses(user_id, depart_id);
    if (info.key === "u_cmd_clear_access") cmd_ClearUserAccesses(user_id, depart_id);

    if (info.key === "u_cmd_set_access_to_depart"){
      get_users_acls([user_id], cmd_SetAllUsersInDepart, {user_id: user_id, depart_id: depart_id});
    } 
    if (info.key === "u_cmd_set_access_to_template"){
      get_users_acls([user_id], cmd_SetToDepartTemplate, {user_id: user_id, depart_id: depart_id});
    }
    if (info.key === "u_cmd_set_access_all_selected"){
      if (selectedUsers.length == 0){
        alert('Не выделено ни одного пользователя :(');
        return;
      }
      get_users_acls([user_id], cmd_SetAllUsersSelected, {user_id: user_id, depart_id: depart_id});
    }
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
    setCopySource({id: object.user_id, type: 'users'});
    // const sourcedata = userAcls
      for (let i = 0; i < aclColumns.length; i++) {
        const column = aclColumns[i];
        for (let n = 0; n < eventTypes.length; n++) {
          const type = eventTypes[n];
          let value = false;
          let fo = trueAcls.find((fitem)=> fitem.skud_acl_column_id === column.id && fitem.skud_current_state_id === type.id);
          if (fo && fo.value === true){
            value = true;
          }
            acl_data.push(
              {
                state_id: type.id,
                col_id: column.id,
                value: value,
              }
            )
        }
      }
      setCopyBuffer(acl_data);
  }

    const cmd_PasteUserAccesses = (user_id, depart_id) => {
      if (copyBuffer.length == 0){
        alert("Нет данных для вставки :(");
        return;
      };
    console.log(user_id, depart_id);
       let acl_data = [];
      for (let i = 0; i < copyBuffer.length; i++) {
        const buffer = copyBuffer[i];

            acl_data.push(
              {
                state_id: buffer.state_id,
                col_id: buffer.col_id,
                depart_id: depart_id,
                user_id: user_id,
                value: buffer.value,
              }
            )
        
      }
      let obj = {
        id_company: visibleCompany,
        table: 'users',
        acl_data: acl_data
      };
      console.log(obj);
      set_acl_users(obj, [user_id]);
  }

  const cmd_SetAllUsersInDepart = (object, response) => {
    let acl_data = [];
    console.log('COMMAND CALLBACK',object, response);
    let trueAcls = response[object.user_id];
    let sourceUser = object.user_id;
    console.log(trueAcls);
    let departTarget = object.depart_id;
    // const sourcedata = userAcls
      for (let i = 0; i < aclColumns.length; i++) {
        const column = aclColumns[i];
        for (let n = 0; n < eventTypes.length; n++) {
          const type = eventTypes[n];
          let value = false;
          let fo = trueAcls.find((fitem)=> fitem.skud_acl_column_id == column.id && fitem.skud_current_state_id == type.id);
          if (fo && fo.value === true){
            value = true;
          }
            acl_data.push(
              {
                state_id: type.id,
                col_id: column.id,
                value: value,
              }
            )
        }
      }

      let usersToUpdate = [];
      let usersInDep = userCollection.filter(item => item.depart_id === departTarget);
      let real_acl_data = [];
      for (let i = 0; i < usersInDep.length; i++) {
        const tuser = usersInDep[i];
        usersToUpdate.push(tuser.id);
        for (let n = 0; n < acl_data.length; n++) {
          const acda = acl_data[n];
          real_acl_data.push({
                state_id: acda.state_id,
                col_id: acda.col_id,
                value: acda.value,
                depart_id: tuser.depart_id,
                user_id: tuser.id,
          });
        }
      }
      let obj = {
        id_company: visibleCompany,
        table: 'users',
        acl_data: real_acl_data
      };
      set_acl_users(obj, usersToUpdate);
  }

  const cmd_SetToDepartTemplate = (object, response) => {
    let acl_data = [];
    console.log('COMMAND CALLBACK',object, response);
    let trueAcls = response[object.user_id];
    console.log(trueAcls);
    // const sourcedata = userAcls
      for (let i = 0; i < aclColumns.length; i++) {
        const column = aclColumns[i];
        for (let n = 0; n < eventTypes.length; n++) {
          const type = eventTypes[n];
          let value = false;
          let fo = trueAcls.find((fitem)=> fitem.skud_acl_column_id == column && fitem.skud_current_state_id == type);
          if (fo && fo.value == true){
            value = true;
          }
            acl_data.push(
              {
                state_id: type.id,
                col_id: column.id,
                value: value,
              }
            )
        }
      }
      console.log('acl_data', acl_data) ;
  }

    // Set acls from source to all selected Users
    const cmd_SetAllUsersSelected = (object, response) => {
    let acl_data = [];
    console.log('COMMAND CALLBACK',object, response);
    let trueAcls = response[object.user_id];
    console.log(trueAcls);
    // const sourcedata = userAcls
      for (let i = 0; i < aclColumns.length; i++) {
        const column = aclColumns[i];
        for (let n = 0; n < eventTypes.length; n++) {
          const type = eventTypes[n];
          let value = false;
          let fo = trueAcls.find((fitem)=> fitem.skud_acl_column_id === column.id && fitem.skud_current_state_id === type.id);
          if (fo && fo.value == true){
            value = true;
          }
            acl_data.push(
              {
                state_id: type.id,
                col_id: column.id,
                value: value,
                // depart_id: depart_id,
                // user_id: user_id,
              }
            )
        }
      }
      let real_acl_data = [];
      for (let i = 0; i < selectedUsers.length; i++) {
        const usr_id = selectedUsers[i];
        const dep = userCollection.find((item)=> item.id === usr_id)?.depart_id;
        for (let n = 0; n < acl_data.length; n++) {
          const acda = acl_data[n];
          real_acl_data.push({
                state_id: acda.state_id,
                col_id: acda.col_id,
                value: acda.value,
                depart_id: dep,
                user_id: usr_id,
          });
        }
      };
        let obj = {
        id_company: visibleCompany,
        table: 'users',
        acl_data: real_acl_data
      };
      set_acl_users(obj, selectedUsers);
  }
  /* -------------------------- MENU HANDLERS END --------------------- */








  /* -------------------------- CHECKBOX HANDLERS --------------------- */

  const handleMasterCheckbox = (ev) => {
    if (ev.target.checked){
      setselectedDeparts(departments.map(item => item.id));
    } else {
      setselectedDeparts([]);
      setselectedUsers([]);
    }
  }

  const handleDepartCheckbox = (ev, depart_id) => {
    if (ev.target.checked){
      setselectedDeparts([...selectedDeparts, depart_id]);
    } else {
      setselectedDeparts(selectedDeparts.filter(item => item != depart_id));
    }
    setselectedDepartsIntermed(selectedDepartsInermed.filter(item => item != depart_id));
  }

  useEffect(() => {
    let usersToSelect = [];
    for (let i = 0; i < userCollection.length; i++) {
      const usr = userCollection[i];
      if (selectedDeparts.includes(usr.depart_id)){
        usersToSelect.push(usr.id);
      }
    }
    setselectedUsers(usersToSelect);
  }, [selectedDeparts]);


  const handleUserCheckbox = (ev, user_id) => {
    if (ev.target.checked){
      setselectedUsers([...selectedUsers, user_id]);
    } else {
      setselectedUsers(selectedUsers.filter(item => item != user_id));
    }
    console.log('value', ev);

    let filledFull = false;
    let intermeded = false;
    let counter = ev.target.checked ? 1 : -1;
    let tlength = 0;
    let user_dep = userCollection.find((item)=> item.id === user_id)?.depart_id;
    if (user_dep){
      const localUdes = userCollection.filter((item)=> item.depart_id === user_dep);
      tlength = localUdes.length;
      for (let i = 0; i < localUdes.length; i++) {
        const uid = localUdes[i].id;
        if (selectedUsers.includes(uid)){
          counter++;
        }
      }
    }
    // Set intermediate marker
    if (counter != tlength && counter != 0){
      console.log('NOT EQUAL', tlength, counter);
      setselectedDepartsIntermed([...selectedDepartsInermed, user_dep]);
    } else {
      console.log('EQUAL', tlength);
      if (user_dep){
        setselectedDepartsIntermed(selectedDepartsInermed.filter(item => item != user_dep));
        if (counter > 0){
          setselectedDeparts([...selectedDeparts, user_dep]);
        } else {
          setselectedDeparts(selectedDeparts.filter(item => item != user_dep));
        }
      }
    };
  }

useEffect(() => {
  console.log(copySource);
}, [copySource]);

/* -------------------------- CHECKBOX HANDLERS END --------------------- */




    return (
        <div className='sk-page-body'>
                <div style={{padding: '6px'}} className={'sk-mw-1600'}>
                    <div>
                        
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
                                    <Checkbox
                                      checked={selectedDeparts.length == departments.length}
                                      indeterminate={selectedDeparts.length > 0 && selectedDeparts.length != departments.length}
                                      onClick={handleMasterCheckbox}
                                    />
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
                              <div><Checkbox
                                checked={selectedDeparts.includes(item.id)}
                                onChange={(ev)=>{handleDepartCheckbox(ev, item.id)}}
                                disabled={count_users_in === 0}
                                indeterminate={selectedDepartsInermed.includes(item.id)}
                              /></div>
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
                                  {eventTypes.map(typyrow => {
                                    const localDepartAcls = departAcls[item.id]?.filter(itemt => itemt.skud_current_state_id === typyrow.id);
                                    return(
                                <div 
                                  className={`sk-table-aclskud-row sk-table-aclskud-data `} key={`checktempl${item.id}_${typyrow.id}`}>
                                  <div className='sk-tas-inwrap'>
                                  <div><Checkbox /></div>
                                  <div><div>{typyrow.id}</div></div>
                                  <div className={'sk-table-aclskud-row-name'}><div className={'sk-flex-space'}>
                                    <span>{typyrow.title}</span>
                                    </div></div>
                                  <div>
                                    <div className={'sk-table-aclskud-multicol2'}
                                    style={{
                                        gridTemplateColumns: `repeat(${aclColumns.length}, 1fr)`,
                                      }}
                                    >
                                    {aclColumns.map((accolum)=>{
                                      const localMainCheck = localDepartAcls?.find((iteme) => iteme.skud_acl_column_id === accolum.id);
                                      return (
                                          <div 
                                            className='sk-table-aclskud-cell'
                                            style={{background: `${item.color}26`}}
                                            title={accolum.text}
                                          >
                                            <div><div><AclCheckbox
                                              user_id={null}
                                              column_id={accolum.id}
                                              row_id={typyrow.id}
                                              depart_id={current_depart}
                                              onToggle={toggleSingleChecboxUser}
                                              checked={localMainCheck ? localMainCheck.value : false}
                                             /></div></div>
                                          
                                          </div>
                                        )})}
                                    </div>
                                  </div>
                                  <div className='sk-flex sk-table-triggers'>
                                    </div>
                                </div>
                                </div>
                                  )})}
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

                                      <div className={`sk-tas-inwrap sk-tas-userrow ${openedUsers.includes(user.id) ? 'sk-tas-userrow-border' : ''}
                                       ${copySource && copySource.type === 'users' && copySource.id === user.id ? 'sk-copysource' : ''}`}>


                                      <div><Checkbox
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={(val)=>{handleUserCheckbox(val, user.id)}}
                                      /></div>
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
                                  {copySource && copySource.type === 'users' && copySource.id === user.id ? (
                                    <div className='sk-mitem-extra-button'
                                      onClick={()=>{setCopySource(null); setCopyBuffer(null)}}
                                      title={"очистить буфек копирования"}
                                    >
                                      <CloseOutlined />
                                    </div>
                                  ) : (
                                      <Dropdown menu={{items: rowMenuItems,
                                        onClick: (info) => handleUserSubMenuClick(user.id, item.id, info)
                                      }}
                                        onClick={(ev)=>{console.log(ev)}}
                                      >
                                    <div className='sk-tablerow-toggle-menu'>
                                        <BarsOutlined />
                                    </div>
                                      </Dropdown>
                                  )}
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
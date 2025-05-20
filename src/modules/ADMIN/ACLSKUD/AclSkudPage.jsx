import React, { useEffect, useState } from 'react';
import './components/style/aclskud.css';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, DiffOutlined, DownSquareOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { AimOutlined, BlockOutlined, BugOutlined, CarOutlined, DockerOutlined, DollarOutlined, MedicineBoxOutlined, MoonOutlined, PlusCircleOutlined, PlusOutlined, RocketOutlined, SmileOutlined, TruckOutlined } from "@ant-design/icons";
import { Affix, Checkbox, Radio, Select, Tabs } from 'antd';
import { CSRF_TOKEN, PRODMODE } from '../../../CONFIG/config';
import { DS_DEPARTMENTS, DS_USERLIST_USERS } from '../../../CONFIG/DEFAULTSTATE';
import AclSkudCardRow from './components/AclSkudCardRow';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';
import { ACL_DEPARTS, ACL_SK_USERS } from './components/AclSkudData';



const AclSkud = (props) => {

    const [baseUserCollection, setBaseUserCollection] = useState([]);
    const [userCollection, setUserCollection] = useState([]);
    const [departments, setDepartments]  = useState([]);

    const [cooxStateDeparts, setCooxStateDepars] = useState([]);
    const [cooxStateUsers, setCooxStateUsers] = useState([]);

    const [visibleCompany, setVisibleCompany] = useState(2);

    const [triggerTemplates, setTriggerTemplates] = useState(false);

    const [copyRows, setCopyRows] = useState([]);

    const [pageLoaded, setPageLoaded] = useState(false);



    
    useEffect(() => {
      if (PRODMODE){
          get_departments();
          get_users();
      } else {
          setDepartments(ACL_DEPARTS);
          setBaseUserCollection(ACL_SK_USERS);

      }
    }, []);

    useEffect(() => {
        get_departments();
        get_users();
    }, [visibleCompany]);

    useEffect(() => {
        if (!pageLoaded){
            if (departments){
                let coox = [];
                for (let i = 0; i < departments.length; i++) {
                    coox.push(departments[i].id);
                }
                setCooxStateDepars(coox);
                setPageLoaded(true);
            }
        }
    }, [departments]);


    useEffect(() => {
        setUserCollection(insertDepartmentNames(baseUserCollection.sort((a, b) => a.id_departament - b.id_departament)));
    //   setUserCollection(baseUserCollection);
    }, [baseUserCollection, departments]);




  // Добавляем кастомную строку в зависимости от значения sortBy
  const customRow = (dep_id) => {
    return {
        id: dep_id,
        key: `custom_row_dep_${dep_id}`, // Уникальный ключ для строки
        name: getDepartmentNameById(dep_id) ? getDepartmentNameById(dep_id) : '<департамент удалён>',
        surname: null,
        patronymic: null,
        enter: '', // Пустые значения для других полей
        exit: '',
        losttime: '',
        type: 'header',
        acls: departments.find((item) =>  item.id === dep_id)?.acls,
      };
  };

  const insertDepartmentNames = (dataArray) => {
    let newDataArray = [];
    let next = -1; // next department ID
    if (!dataArray){return;}
    for (let i = 0; i < dataArray.length; i++){
      let dep_id = dataArray[i].id_departament;
      if (dep_id != next){
        // insert custom row
        let crow = customRow(dep_id);
        newDataArray.push(crow);
      }
      if (i < dataArray.length - 1){
        next = dep_id;
      }; 
        newDataArray.push(dataArray[i]);
      }
    
    return newDataArray;
  }

  const getDepartmentNameById = (id, shift) => {
    if (!departments) {return ""};
    const department = departments.find(dept => dept.id === id);
    return department ? department.name : null; // Возвращаем имя или null, если не найдено
    };


    /** ------------------ FETCHES ---------------- */
        /**
         * Получение списка отделов
         * @param {*} req 
         * @param {*} res 
         */
        const get_departments = async (req, res) => {
          try {
              let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/getdeparts', 
                {
                    data: {
                        id_company: visibleCompany
                    },
                    _token: CSRF_TOKEN
                });
              console.log('departs', response);
              // setOrganizations(organizations_response.data.org_list)
              // setTotal(organizations_response.data.total_count)
              setDepartments(response.data.content);
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
          const get_users = async (filters, req, res) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/getusers', 
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


        /**
         * save
         * @param {*} req 
         * @param {*} res 
         */
                const save_acl_users = async (dataset, req, res) => {
                try {
                    let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/saveuseracls', 
                        {
                            data: dataset,
                            _token: CSRF_TOKEN
                        });
                        if (response && response.data){
                            // get_users();
                        }
                } catch (e) {
                    console.log(e)
                } finally {
                    // setLoadingOrgs(false)
                }
            }

        /**
         * save dep
         * @param {*} req 
         * @param {*} res 
         */
        const save_acl_departs = async (dataset, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/savedepartacls', 
                {
                    data: dataset,
                    _token: CSRF_TOKEN
                });
                if (response && response.data){
                    // get_departments();
                }
        } catch (e) {
            console.log(e)
        } finally {
            // setLoadingOrgs(false)
        }
    }
      /** ------------------ FETCHES END ---------------- */



    const handleCooxDepart = (id, shift)=> {
        console.log(id, cooxStateDeparts);
        let newd = JSON.parse(JSON.stringify(cooxStateDeparts)) ;
        if (cooxStateDeparts.includes(id)){
            newd = newd.filter((iden) => iden !== id);
        } else {
            newd.push(id);
            console.log(id);
        }   
        if (!shift){
            console.log('newds',newd);
            setCooxStateDepars(newd);
        }

        if (shift){
            let invertedDepart = [];
            for (let i = 0; i < userCollection.length; i++) {
                const element = userCollection[i];
                if (element.department_id === id){
                    if (cooxStateDeparts.includes(element.id) ||  cooxStateDeparts.includes(element.user_id)){

                        invertedDepart.push(element.id ? element.id : element.user_id);
                    } else {
                        
                    }
                } else {
                    if (userCollection.includes(element.id ? element.id : element.user_id)){
                        invertedDepart.push(element.id ? element.id : element.user_id);
                    }
                }
            }
            setCooxStateDepars(invertedDepart);   
        } else {
            
        }
    }

    const handleCooxUsers = (id)=> {
        let newd = JSON.parse(JSON.stringify(cooxStateUsers)) ;
        if (cooxStateUsers.includes(id)){
            newd = newd.filter((iden) => iden !== id);
        } else {
            newd.push(id);
        }
        setCooxStateUsers(newd);
    }

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

    const toggleTemplatesOpen = (state) => {
        console.log(state, "HELJDLKFJ");
        setTriggerTemplates(state);
      }

      const options = [
        { label: 'Arstel', value: 2 },
        { label: 'Rondo', value: 3 },
      ];


      const handleVisibleCompanyChange = (ev) =>
      {
        // console.log(ev);
        setVisibleCompany(ev.target.value);
      }

      const handleCopyRows = (type, id, object) => {
        // console.log(type, id, object);
      }

      const handlePasteRows = (type, id, object) => {
        // console.log(type, id, object);
      }

      const handleClearRows = (type, id, object) => {
        // console.log(type, id, object);
      }

      const handleChangeAcls = (data) => {
            console.log(data);
            data.id_company = visibleCompany;
            if (data.table === 'users'){
                save_acl_users(data);

                setBaseUserCollection(prev => prev.map(element => {
                    if (element.id === data.id) {
                        // Только нужный элемент обновляем
                        return {
                            ...element,
                            acls: {
                                ...element.acls,
                                [data.type]: {
                                    ...element.acls[data.type],
                                    items: data.values
                                }
                            }
                        };
                    }
                    return element;
                }));

            } else {
                save_acl_departs(data);

                setDepartments(prev => prev.map(element => {
                    if (element.id === data.id) {
                        // Только нужный элемент обновляем
                        return {
                            ...element,
                            acls: {
                                ...element.acls,
                                [data.type]: {
                                    ...element.acls[data.type],
                                    items: data.values
                                }
                            }
                        };
                    }
                    return element;
                }));
            }
      }

  return (
    <div className='sk-page-body'>
        <div style={{padding: '6px'}} className={'sk-mw-1400'}>
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
                    options={options}
                    defaultValue={2}
                    value={visibleCompany}
                    optionType="button"
                    buttonStyle="solid"
                    onChange={handleVisibleCompanyChange}
                />
                        </div>
                </div>
                <div className={'sk-flex'}>
                    <div className={'sk-select-visicom'}>Показать сотрудников компании: </div>
                    <div>
                        <Select
                            options={options}
                            />
                    </div>
                </div>
            </div>
        </div>

            <br/>

               
        <div style={{padding: '6px'}} className={'sk-mw-1400'} key={'fashdjkfjaklsjdf'}>

            <div className={'sk-table-aclskud'}>
                <Affix offsetTop={0}>                
                    <div className={'sk-table-aclskud-row sk-table-aclskud-header'}>
                        <div>
                            {/* <Checkbox></Checkbox> */}
                        </div>
                    <div>
                        <div className='sk-cooxer-arrow' onClick={toggleAllDepCooxed}>
                            <DownSquareOutlined />
                        </div>
                    </div>
                    <div>
                        <div>
                            Имя сотрудника
                        </div>
                    </div>
                    <div className={'sk-table-aclskud-groupcol'}>
                        <div className={'sk-teble-prehead'}>
                            <div style={{padding: '3px'}}>Личные заявки</div>
                            <div style={{padding: '3px'}}>Заявки подчиненных</div>
                            <div style={{padding: '3px'}}>Заявки всех пользователей</div>
                        </div>
                        <div className={'sk-table-aclskud-multicol'}>
                            <div title='Создание '>Созд.<DiffOutlined /></div>
                            <div title='Редактирование'>Ред.<EditOutlined /></div>
                            <div title='Согласование и отклонение'>Согл.<CheckCircleOutlined /></div>
                            <div title='Создание'>Созд.<DiffOutlined /></div>
                            <div title='Редактирование'>Ред.<EditOutlined /></div>
                            <div title='Согласование и отклонение'>Согл.<CheckCircleOutlined /></div>
                            <div title='Создание'>Созд.<DiffOutlined /></div>
                            <div title='Редактирование'>Ред.<EditOutlined /></div>
                            <div title='Согласование и отклонение'>Согл.<CheckCircleOutlined /></div>
                        </div>
                    </div>

                    <div>

                    </div>
                </div>
                </Affix>

                {userCollection.map((user)=>
                    !user.type && cooxStateDeparts.includes(user.id_departament) ? (
                        ""
                    ) : (
                        <AclSkudCardRow data={user}
                            on_dep_coox={handleCooxDepart}
                            on_user_coox={handleCooxUsers}
                            cooxed_users={cooxStateUsers}
                            cooxed_departs={cooxStateDeparts}
                            key={'rower_' + user.id}
                            trigger_templates={triggerTemplates}
                            on_toggle_all_templates={toggleTemplatesOpen}
                            on_copy_rows={handleCopyRows}
                            on_paste_rows={handlePasteRows}
                            on_clear_rows={handleClearRows}
                            on_change_acls={handleChangeAcls}
                        />
                    )
                
            )}

            </div>
        </div>
    </div>
  );
};

export default AclSkud;
import React, {useEffect, useState } from "react";

import UserListToolbar from "./components/userlist/UserlistToolbar";
import { Table } from "antd";
import '../../components/TimeSkud/Style/timeskud.css';
import { DS_DEFAULT_USERS, DS_DEPARTMENTS } from "../../CONFIG/DEFAULTSTATE";
import UserModal from "./components/usermodal";
import { ShortName } from "../../GlobalComponents/Helpers/TextHelpers";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../API/API";


const UserList = (props)=>{
  const { userdata } = props;
  const [ currentUserId, setCurrentUserId] = useState((userdata && userdata.user) ? userdata.user.id : null);

  const [baseUserListData, setBaseUserListData] = useState(!PRODMODE ? DS_DEFAULT_USERS : []);
  const [userListData, setUserListData] = useState(baseUserListData.sort((a, b) => b.department - a.department));

  const [departments, setDepartments]  = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortBy, setSortBy ] = useState(null);

  const openUserCard = (id) => {
    console.log('id' + ' => ' + id);
      setSelectedUserId(id); // Устанавливаем выбранный ID
      setIsModalVisible(true); // Открываем модальное окно
    };
      

    // const fet = {
    //     "status" : если null|0 - работающие (status=0), если 1 - уволенные (status=1)

    // }

    const columns = [
      {
        title: 'ФИО',
        key: 'namekey',
        render: (text, record) => {
            if (record.type && record.type === 'header') {
                return <span>{record.name} {record.id}</span>; // Отображаем имя для заголовка
            } else {
              if (record.name != ""){
                return (
                  <a onClick={() => openUserCard(record.id)} title={`${record.surname} ${record.name} ${record.patronymic}`}>
                    <span className="sk-table-username"><span className="sk-table-state-badge"> </span>  {ShortName(record.surname, record.name, record.patronymic)}</span>
                  </a>
              );
              } else {
                return (
                  <a onClick={() => openUserCard(record.id)} title={`${record.surname} ${record.name} ${record.patronymic}`}>
                      <strong>test user</strong>
                  </a>
              );
              }

            }
        },
        onCell: (record) => {
            return {
                colSpan: record.type && record.type === 'header' ? 5 : 1,
            };
        },
    },
      {
          title: 'Тел',
          dataIndex: 'phone',
          key: 'ponekey',
          onCell: (record) => {
            return {
                colSpan: record.type && record.type === 'header' ? 0 : 1,
            };
        },
      },
      {
          title: 'Время входа',
          dataIndex: 'enter',
          key: 'enterkey',
          onCell: (record) => {
            return {
                colSpan: record.type && record.type === 'header' ? 0 : 1,
            };
        },
      },
      {
          title: 'Время выхода',
          dataIndex: 'exit',
          key: 'exitkey',
          onCell: (record) => {
            return {
                colSpan: record.type && record.type === 'header' ? 0 : 1,
            };
        },
      },
      {
          title: 'Потерянное время',
          dataIndex: 'losttime',
          key: 'losttimekey',
          onCell: (record) => {
            return {
                colSpan: record.type && record.type === 'header' ? 0 : 1,
            };
        },
      },
  ];


    
  /** ------------------ FETCHES ---------------- */
    /**
     * Получение списка отделов
     * @param {*} req 
     * @param {*} res 
     */
    const get_departments = async (req, res) => {
      try {
          let response = await PROD_AXIOS_INSTANCE.get('/api/timeskud/departaments/departaments?_token=' + CSRF_TOKEN);
          console.log('departs', response);
          // setOrganizations(organizations_response.data.org_list)
          // setTotal(organizations_response.data.total_count)
          setDepartments(response.data.data);
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
            setBaseUserListData(response.data.data);
        } catch (e) {
            console.log(e)
        } finally {
            // setLoadingOrgs(false)
        }
    }
  /** ------------------ FETCHES END ---------------- */


  useEffect(()=>{
    setUserListData(baseUserListData.sort((a, b) => b.department - a.department));
  }, [baseUserListData])


  useEffect(() => {
    if (PRODMODE){
      get_departments();
      get_users();
    } else {
      setDepartments(DS_DEPARTMENTS);
    }

  },[])


      
    // Функция для определения класса строки
    const rowClassName = (record) => {
      let classname = '';
      switch (record.state) {
          case 0:
            classname =  'sk_state_outside';
            break;
          case 10:
            classname =  'sk_state_active';
            break;
          case 5:
            classname =  'sk_state_somewhere';
            break;
          default:
            classname =  '';
            break;
      }
      if (record.type){
        classname += ' sk_table_headrow';
      }
      if (record.id == currentUserId){
        classname += ' sk-table-current-user';
      }
      return classname;
  };


  const SortFilterChanged = (userList) => {
    setUserListData(userList);
  }




    return (
        <div>
            <br/>
            <UserListToolbar
              // onSortBy={sortUserList}
              departments={departments}
              baseUsers={baseUserListData}
              onChange={SortFilterChanged}
              userData={userdata}
            />
            
            <Table 
            sticky={true}
            dataSource={userListData}
            columns={columns}
            rowClassName={rowClassName}
            pagination={false}
            className={'sk-flight-table'}
             />
            
            <UserModal
            userId={selectedUserId} 
            visible={isModalVisible} 
            onClose={() => setIsModalVisible(false)} 
            />
            {/* // if sortBy == undefined || null || department_desc - insert custom row with depart name before show belongs rows */}
        </div>
    )
}


export default UserList;
import React, {useEffect, useState } from "react";

import UserListToolbar from "../components/userlist/UserlistToolbar";
import { Table } from "antd";
import '../style/timeskud.css';
import { DS_DEFAULT_USERS, DS_DEPARTMENTS } from "../../../CONFIG/DEFAULTSTATE";
import UserModal from "./components/usermodal";
import { ShortName } from "../../../GlobalComponents/Helpers/TextHelpers";

const UserList = ()=>{

  const [userListData, setUserListData] = useState(DS_DEFAULT_USERS.sort((a, b) => b.department - a.department));
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortBy, setSortBy ] = useState(null);

  const openUserCard = (id) => {
    console.log('id' + ' => ' + id);
      setSelectedUserId(id); // Устанавливаем выбранный ID
      setIsModalVisible(true); // Открываем модальное окно
    };
      
      // const OpenUserCard = (event)=>{
      //   alert('Hello')
      //   console.log('event', event);
      // }


    const columns = [
      {
        title: 'ФИО',
        key: 'namekey',
        render: (text, record) => {
            if (record.type && record.type === 'header') {
                return <span>{record.name} {record.id}</span>; // Отображаем имя для заголовка
            } else {
                return (
                    <a onClick={() => openUserCard(record.id)} title={`${record.surname} ${record.name} ${record.patronymic}`}>
                        <strong>{ShortName(record.surname, record.name, record.patronymic)}</strong>
                    </a>
                );
            }
        },
        onCell: (record) => {
            return {
                colSpan: record.type && record.type === 'header' ? 1 : 1,
            };
        },
    },
      {
          title: 'Время входа',
          dataIndex: 'enter',
          key: 'enterkey',
      },
      {
          title: 'Время выхода',
          dataIndex: 'exit',
          key: 'exitkey',
      },
      {
          title: 'Потерянное время',
          dataIndex: 'losttime',
          key: 'losttimekey',
      },
  ];


    
      
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
        classname += ' sk_table_headrow'
      }
      return classname;
  };



   const sortUserList = (sortByValue) => {
    console.log('sortBy' + ' => ' + sortByValue);
    // await setUserListData(DS_DEFAULT_USERS.sort((a, b) => b.department - a.department));
    // Копируем текущие данные для сортировки
    let sortedData = DS_DEFAULT_USERS.sort((a, b) => b.department - a.department);
    setSortBy(sortByValue);
    switch (sortByValue) {
        case "department_asc":
            sortedData.sort((a, b) => a.department - b.department);
            sortedData = insertDepartmentNames(sortedData);
            break;

        case "department_desc":
            sortedData.sort((a, b) => b.department - a.department);
            break;

        case "name_asc":
            sortedData.sort((a, b) => a.name.localeCompare(b.name));
            break;

        case "name_desc":
            sortedData.sort((a, b) => b.name.localeCompare(a.name));
            break;

        case "surname_asc":
            sortedData.sort((a, b) => a.surname.localeCompare(b.surname));
            break;

        case "surname_desc":
            sortedData.sort((a, b) => b.surname.localeCompare(a.surname));
            break;

        case "state_asc":
            sortedData.sort((a, b) => a.state - b.state);
            break;

        case "state_desc":
          sortedData.sort((a, b) => b.state - a.state);
          break;

        default:
            // Сортировка по умолчанию (например, по department ASC)
            sortedData.sort((a, b) => a.department - b.department);
            break;
    }

    // Обновляем состояние с отсортированными данными
      setUserListData(sortedData);
  }


  const insertDepartmentNames = (dataArray) => {
    let newDataArray = [];
    let next = -1; // next department ID

    for (let i = 0; i < dataArray.length; i++){
      let dep_id = dataArray[i].department;
      
      if (dep_id != next){
        // insert custom row
        let crow = customRow(dep_id);
        console.log('crow', crow);
        newDataArray.push(crow);
      }
      if (i < dataArray.length - 1){
        next = dep_id;
      }; 
        newDataArray.push(dataArray[i]);
      }
    
    console.log('dataArray' + ' => ' + newDataArray);
    return newDataArray;
  }

    const getDepartmentNameById = (id) => {
      const department = DS_DEPARTMENTS.find(dept => dept.id === id);
      return department ? department.name : null; // Возвращаем имя или null, если не найдено
  };

  // Добавляем кастомную строку в зависимости от значения sortBy
  const customRow = (dep_id) => {
    return {
      key: `custom_row_dep_${dep_id}`, // Уникальный ключ для строки
      name: getDepartmentNameById(dep_id) ? getDepartmentNameById(dep_id) : '<департамент удалён>',
      surname: null,
      patronymic: null,
      enter: '', // Пустые значения для других полей
      exit: '',
      losttime: '',
      type: 'header'
      };
  };

  const finalDataSource = () => {
    if (!sortBy || sortBy === "department_desc") {
        return [customRow, ...userListData]; // Добавляем кастомную строку перед основными данными
    }
    return userListData; // Возвращаем только основные данные
  };


    return (
        <div>
            <UserListToolbar
              onSortBy={sortUserList}
            />
            
            <Table dataSource={userListData}
            columns={columns}
            rowClassName={rowClassName}
            pagination={false} 
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
import React, { useEffect, useState } from 'react';
import './components/style/aclskud.css';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, DiffOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { PRODMODE } from '../../../CONFIG/config';
import { DS_USERLIST_USERS } from '../../../CONFIG/DEFAULTSTATE';
import AclSkudCardRow from './components/AclSkudCardRow';

const AclSkud = (props) => {

    const [baseUserCollection, setBaseUserCollection] = useState([]);
    const [userCollection, setUserCollection] = useState([]);


    useEffect(() => {
      if (PRODMODE){

      } else {

      }
      setBaseUserCollection(DS_USERLIST_USERS);
    }, []);


    useEffect(() => {
      setUserCollection(baseUserCollection);
      console.log('base', baseUserCollection)
    }, [baseUserCollection]);


  return (
    <div className='sk-dark sk-page-body'>
        <div style={{padding: '6px'}} className={'sk-mw-1400'}>
            <br/>
            <div>AclSkud</div>
                <br/>

            <div className={'sk-table-aclskud'}>
                <div className={'sk-table-aclskud-row sk-table-aclskud-header'}>
                        <div>
                            <Checkbox></Checkbox>
                        </div>
                    <div>
                        <div>
                            id
                        </div>
                    </div>
                    <div>
                        <div>
                            Имя сотрудника
                        </div>
                    </div>
                    <div className={'sk-table-aclskud-groupcol'}>
                        <div>
                            Личные
                        </div>
                        <div className={'sk-table-aclskud-multicol'}>
                            <div title='Просмотр'><EyeOutlined /></div>
                            <div title='Создание'><DiffOutlined /></div>
                            <div title='Редактирование'><EditOutlined /></div>
                            <div title='Удаление'><DeleteOutlined /></div>
                            <div title='Согласование и отклонение'><CheckCircleOutlined /></div>
                        </div>
                    </div>
                    <div className={'sk-table-aclskud-groupcol'}>
                        <div>
                            Свой отдел
                        </div>
                        <div className={'sk-table-aclskud-multicol'}>
                            <div title='Просмотр'><EyeOutlined /></div>
                            <div title='Создание'><DiffOutlined /></div>
                            <div title='Редактирование'><EditOutlined /></div>
                            <div title='Удаление'><DeleteOutlined /></div>
                            <div title='Согласование и отклонение'><CheckCircleOutlined /></div>
                        </div>
                    </div>
                    <div className={'sk-table-aclskud-groupcol'}>
                        <div>
                            Подчиненные
                        </div>
                        <div className={'sk-table-aclskud-multicol'}>
                            <div title='Просмотр'><EyeOutlined /></div>
                            <div title='Создание'><DiffOutlined /></div>
                            <div title='Редактирование'><EditOutlined /></div>
                            <div title='Удаление'><DeleteOutlined /></div>
                            <div title='Согласование и отклонение'><CheckCircleOutlined /></div>
                        </div>
                    </div>
                    <div className={'sk-table-aclskud-groupcol'}>
                        <div>
                            Любые
                        </div>
                        <div className={'sk-table-aclskud-multicol'}>
                            <div title='Просмотр'><EyeOutlined /></div>
                            <div title='Создание'><DiffOutlined /></div>
                            <div title='Редактирование'><EditOutlined /></div>
                            <div title='Удаление'><DeleteOutlined /></div>
                            <div title='Согласование и отклонение'><CheckCircleOutlined /></div>
                        </div>
                    </div>
                </div>

                {userCollection.map((user)=>(
                    <AclSkudCardRow data={user}></AclSkudCardRow>
                ))}

            </div>
        </div>
    </div>
  );
};

export default AclSkud;
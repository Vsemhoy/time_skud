import { ClearOutlined, CopyOutlined, DiffOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';


const AclSkudCardRow = (props) => {
    const [itemId, setItemId] = useState(props.data?.iser_id);


  return (
    <div className={'sk-table-aclskud-row sk-table-aclskud-data'}>
                        <div>
                            <Checkbox></Checkbox>
                        </div>
                    <div>
                        <div>
                            {itemId}
                        </div>
                    </div>
                    <div>
                        <div>
                            {props.data?.user_name}
                        </div>
                    </div>
                    <div>
                        <div className={'sk-table-aclskud-multicol'}>
                            <div title='Просмотр'><Checkbox></Checkbox></div>
                            <div title='Создание'><Checkbox></Checkbox></div>
                            <div title='Редактирование'><Checkbox></Checkbox></div>
                            <div title='Удаление'><Checkbox></Checkbox></div>
                            <div title='Согласование и отклонение'><Checkbox></Checkbox></div>
                        </div>
                    </div>
                    <div>
                        <div className={'sk-table-aclskud-multicol'}>
                            <div title='Просмотр'><Checkbox></Checkbox></div>
                            <div title='Создание'><Checkbox></Checkbox></div>
                            <div title='Редактирование'><Checkbox></Checkbox></div>
                            <div title='Удаление'><Checkbox></Checkbox></div>
                            <div title='Согласование и отклонение'><Checkbox></Checkbox></div>
                        </div>
                    </div>
                   <div>
                        <div className={'sk-table-aclskud-multicol'}>
                            <div title='Просмотр'><Checkbox></Checkbox></div>
                            <div title='Создание'><Checkbox></Checkbox></div>
                            <div title='Редактирование'><Checkbox></Checkbox></div>
                            <div title='Удаление'><Checkbox></Checkbox></div>
                            <div title='Согласование и отклонение'><Checkbox></Checkbox></div>
                        </div>
                    </div>
                    <div>
                        <div className={'sk-table-aclskud-multicol'}>
                            <div title='Просмотр'><Checkbox></Checkbox></div>
                            <div title='Создание'><Checkbox></Checkbox></div>
                            <div title='Редактирование'><Checkbox></Checkbox></div>
                            <div title='Удаление'><Checkbox></Checkbox></div>
                            <div title='Согласование и отклонение'><Checkbox></Checkbox></div>
                        </div>
                    </div>
                    <div className='sk-flex'>
                        <div><CopyOutlined /></div>
                        <div><DiffOutlined /></div>
                        <div><ClearOutlined /></div>
                    </div>
                </div>
  );
};

export default AclSkudCardRow;
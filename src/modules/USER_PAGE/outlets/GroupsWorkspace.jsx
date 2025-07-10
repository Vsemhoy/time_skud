import React, {useEffect, useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {Affix, Button, Input, Spin} from "antd";
import styles from "../style/user_page.module.css";
import {ClearOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";
import TableTransfer from "../components/TableTransfer";
import {POSSIBLE_GROUPS, USER_GROUPS} from "../mock/mock";
import {CSRF_TOKEN, PRODMODE} from "../../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import TextArea from "antd/es/input/TextArea";

function GroupsWorkspace(props) {
    const navigate = useNavigate();
    const { userIdState } = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const [userGroups, setUserGroups] = useState([]);
    const [possibleGroups, setPossibleGroups] = useState([]);

    const [editGroupId, setEditGroupId] = useState(0);
    const [editGroupName, setEditGroupName] = useState('');
    const [editGroupDescription, setEditGroupDescription] = useState('');

    const [targetKeys, setTargetKeys] = useState([]);

    useEffect(() => {
        if (!isMounted) {
            fetchInfo().then();
            setIsMounted(true);
        }
    }, []);

    // Установка targetKeys при получении userGroups
    useEffect(() => {
        if (isMounted && userGroups.length > 0) {
            const userGroupKeys = userGroups.map(group => group.id);
            setTargetKeys(userGroupKeys);
        }
    }, [userGroups]);

    useEffect(() => {
        if (userIdState === 'new') {
            navigate(`/hr/users/${userIdState}`);
        }
    }, [userIdState]);

    const fetchInfo = async () => {
        setIsLoading(true);
        await fetchGroupsInfo();
        setTimeout(() => setIsLoading(false), 500);
    }

    const fetchGroupsInfo = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/usergroups/${userIdState}`,
                    {
                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content) {
                    const content = serverResponse.data.content;
                    setPossibleGroups(content.possibleGroups);
                    setUserGroups(content.userGroups);
                }
            } catch (error) {
                console.error('Error fetching remove user rule:', error);
            }
        } else {
            setPossibleGroups(POSSIBLE_GROUPS);
            setUserGroups(USER_GROUPS);
        }
    };

    const toEditGroup = (group) => {
        setEditGroupId(group.id);
        setEditGroupName(group.title || group.name); // Используйте group.title или group.name в зависимости от структуры данных
        setEditGroupDescription(group.description);
    };
    const column = [{
        dataIndex: 'title',
        title: 'Группа, описание',
        render: (title, record) => (
            <div className={`${styles.sk_group} ${+editGroupId === +record.id ? styles.sk_group_active : ''}`}>
                <div className={styles.sk_rule_name_container}>
                    <p className={styles.sk_rule_name}>{title}</p>
                    {+editGroupId !== +record.id ? (
                        <Button color={'default'}
                             variant={'outlined'}
                             shape="circle"
                             icon={<EditOutlined/>}
                             onClick={(e) => {
                                 e.stopPropagation();
                                 toEditGroup(record)
                             }}
                        ></Button>
                    ) : (
                        <Button color={'default'}
                            variant={'outlined'}
                            shape="circle"
                            icon={<CloseOutlined/>}
                            onClick={(e) => {
                                e.stopPropagation();
                                clearEditGroup()
                            }}
                        ></Button>
                )}
                </div>
                <p className={styles.sk_rule_description}>{record.description}</p>
            </div>
        )
    }];
    const prepareGroups = (groups) => {
        if (groups && groups.length > 0) {
            return groups.map(group => {
                return {
                    key: group.id,
                    id: group.id,
                    title: group.name,
                    description: group.description,
                };
            })
        } else {
            return [];
        }
    }
    const filterOption = (input, item) => {
        var _a, _b;
        return (
            ((_a = item.title) === null || _a === void 0 ? void 0 : _a.includes(input)) ||
            ((_b = item.tag) === null || _b === void 0 ? void 0 : _b.includes(input))
        );
    };
    // Объединение possibleGroups и userGroups для dataSource
    const allGroups = [...prepareGroups(possibleGroups), ...prepareGroups(userGroups)];
    const onChange = (nextTargetKeys, direction, moveKeys) => {
        setTargetKeys(nextTargetKeys);
        if (direction === 'right') {
            console.log('Добавлены элементы:', moveKeys);
            fetchAddGroups(moveKeys).then();
        } else {
            console.log('Удалены элементы:', moveKeys);
            fetchRemoveGroups(moveKeys).then();
        }
    };
    const fetchAddGroups = async (moveKeys) => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/usergroupsadd/${userIdState}`,
                    {
                        data: { addGroups: moveKeys },
                        _token: CSRF_TOKEN
                    }
                );
            } catch (error) {
                console.error('Error fetching add groups to user:', error);
            }
        }
    };
    const fetchRemoveGroups = async (moveKeys) => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/usergroupsremove/${userIdState}`,
                    {
                        data: { removeGroups: moveKeys },
                        _token: CSRF_TOKEN
                    }
                );
            } catch (error) {
                console.error('Error fetching remove groups from user:', error);
            }
        }
    };
    const deleteGroup = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.delete(`/api/hr/usergroupsdelete/${editGroupId}`,
                    {
                        _token: CSRF_TOKEN
                    }
                );
                await fetchInfo();
                clearEditGroup();
            } catch (error) {
                console.error('Error fetching delete groups:', error);
            }
        } else {
            await fetchInfo();
            clearEditGroup();
        }
    };
    const updateGroup = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/usergroupsupdate/${editGroupId}`,
                    {
                        data: {name: editGroupName, description: editGroupDescription},
                        _token: CSRF_TOKEN
                    }
                );
                await fetchInfo();
                clearEditGroup();
            } catch (error) {
                console.error('Error fetching update groups:', error);
            }
        } else {
            await fetchInfo();
            clearEditGroup();
        }
    };
    const createGroup = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/usergroupscreate`,
                    {
                        data: {name: editGroupName, description: editGroupDescription},
                        _token: CSRF_TOKEN
                    }
                );
                await fetchInfo();
                clearEditGroup();
            } catch (error) {
                console.error('Error fetching create groups:', error);
            }
        } else {
            await fetchInfo();
            clearEditGroup();
        }
    };
    const clearEditGroup = () => {
        setEditGroupId(0);
        setEditGroupName('');
        setEditGroupDescription('');
    };
    const isCantAdd = () => {
        return !(editGroupName && editGroupDescription);
    };
    return (
        <Spin spinning={isLoading}>
            <div className={styles.sk_groups_workspace}>
                <div className={styles.sk_groups_container}>
                    <TableTransfer
                        dataSource={allGroups}   // Все группы
                        targetKeys={targetKeys}  // Ключи групп в правой колонке
                        disabled={false}
                        showSearch={true}
                        showSelectAll={false}
                        onChange={onChange}
                        filterOption={filterOption}
                        leftColumns={column}
                        rightColumns={column}
                    />
                </div>
                <Affix offsetTop={10 + 10 + 52 + 52} style={{width: '100%'}}>
                    <div className={styles.sk_groups_linker}>
                        <div style={{width: '100%'}}>
                            <div className={styles.sk_flex_space}>
                                <span className={'sk-totoro'}>Редактирование/создание группы</span>
                                <span onClick={() => clearEditGroup()}>
                                    <ClearOutlined/>
                                </span>
                            </div>
                            <br/>
                            <div className={styles.sk_label_select}>Название</div>
                            <Input
                                placeholder={'Введите название'}
                                style={{width: '100%'}}
                                value={editGroupName}
                                onChange={(e) => setEditGroupName(e.target.value)}
                            />
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <div className={styles.sk_label_select}>Описание</div>
                            <TextArea placeholder="Введите описание"
                                      rows={4}
                                      maxLength={6}
                                      value={editGroupDescription}
                                      onChange={(e) => setEditGroupDescription(e.target.value)}
                            />
                            <br/>
                            <br/>
                            <Button block
                                    onClick={() => (editGroupId ? updateGroup() : createGroup())}
                                    disabled={isCantAdd()}
                            >{!editGroupId ? 'Привязать группу' : 'Обновить группу'}</Button>
                        </div>
                        <div style={{width: '100%'}}>
                            <Button block
                                    color="danger"
                                    variant="outlined"
                                    onClick={() => deleteGroup()}
                                    disabled={!editGroupId}
                            >Отвязать и удалить группу</Button>
                        </div>
                    </div>
                </Affix>
            </div>
        </Spin>
    );
}

export default GroupsWorkspace;

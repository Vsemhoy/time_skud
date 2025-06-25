import React, {useEffect, useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {Affix, Button, Select, Spin, Table, Tag, Transfer} from "antd";
import styles from "../style/user_page.module.css";
import {ClearOutlined, EditOutlined} from "@ant-design/icons";
import TableTransfer from "./TableTransfer";

function GroupsWorkspace(props) {
    const navigate = useNavigate();
    const { userIdState, userFIO } = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetchGroupsInfo();
    }, []);
    useEffect(() => {
        if (userIdState === 'new') {
            navigate(`/hr/users/${userIdState}`);
        }
    }, [userIdState]);
    const fetchGroupsInfo = () => {
        setIsLoading(true);

        setTimeout(() => setIsLoading(false), 500);
    };
    const [groupList, setGroupList] = useState([]);
    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;

        // Находим соответствующий group в groupList по value
        const group = groupList.find(item => item.value === value);
        const color = group?.color; // Получаем цвет из найденного group

        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <Tag
                color={color}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginInlineEnd: 4 }}
            >
                {label}
            </Tag>
        );
    };
    /* GROUPS-INFO-----------------------------------------------------------------------------------*/
    const [targetKeys, setTargetKeys] = useState([]);
    const mockData = Array.from({ length: 20 }).map((_, i) => ({
        key: i.toString(),
        title: `Группа${i + 1}`,
        description: `Описание группы${i + 1}`,
    }));
    const column = [{
        dataIndex: 'title',
        title: 'Группа, описание',
        render: (title, record) => (
            /*<div className={`${styles.sk_group} ${styles.sk_group_active}`}>*/
            <div className={`${styles.sk_group}`}>
                <div className={styles.sk_rule_name_container}>
                    <p className={styles.sk_rule_name}>{title}</p>
                    <Button color={'default'}
                            variant={'outlined'}
                            shape="circle"
                            icon={<EditOutlined/>}
                            onClick={(e) => e.stopPropagation()}
                    ></Button>
                </div>
                <p className={styles.sk_rule_description}>{record.description}</p>
            </div>
        )
    }];
    const onChange = nextTargetKeys => {
        setTargetKeys(nextTargetKeys);
    };
    const filterOption = (input, item) => {
        var _a, _b;
        return (
            ((_a = item.title) === null || _a === void 0 ? void 0 : _a.includes(input)) ||
            ((_b = item.tag) === null || _b === void 0 ? void 0 : _b.includes(input))
        );
    };
    return (
        <Spin spinning={isLoading}>
            <div className={styles.sk_groups_workspace}>
                <div className={styles.sk_groups_container}>
                    <TableTransfer
                        dataSource={mockData}
                        targetKeys={targetKeys}
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
                                <span className={'sk-totoro'}>Группы </span>
                                <span
                                    onClick={() => {
                                    }}
                                >
                                    <ClearOutlined/>
                                </span>
                            </div>
                            <br/>
                            <div className={styles.sk_label_select}>Тип привязываемого графика</div>
                            <Select
                                placeholder={'Группы'}
                                mode={'multiple'}
                                options={[]}
                                style={{width: '100%'}}
                                onChange={(ev) => {
                                }}
                                tagRender={tagRender}
                            />
                            <br/>
                            <br/>
                            <div className={styles.sk_label_select}>Название графика (селект с поиском)</div>
                            <Select
                                placeholder={'Группы'}
                                mode={'multiple'}
                                options={[]}
                                style={{width: '100%'}}
                                onChange={(ev) => {
                                }}
                                tagRender={tagRender}
                            />
                            <br/>
                            <br/>
                            <div className={styles.sk_label_select}>Дата начала действия графика</div>
                            <Select
                                placeholder={'Группы'}
                                mode={'multiple'}
                                options={[]}
                                style={{width: '100%'}}
                                onChange={(ev) => {
                                }}
                                tagRender={tagRender}
                            />
                            <br/>
                            <br/>
                            <div className={styles.sk_label_select}>Дата окончания графика</div>
                            <Select
                                placeholder={'Группы'}
                                mode={'multiple'}
                                options={[]}
                                style={{width: '100%'}}
                                onChange={(ev) => {
                                }}
                                tagRender={tagRender}
                            />
                            <br/>
                            <br/>
                            <Button block>Привязать графики</Button>
                        </div>
                    </div>
                </Affix>
            </div>
        </Spin>
    );
}

export default GroupsWorkspace;

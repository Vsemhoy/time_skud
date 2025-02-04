import { Button, Card, Checkbox, Tag, Transfer } from "antd";
import React, { useEffect, useState } from "react";
import "./style/groupcard.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const GroupCardItem = (props)=>{
    const group_id = props.data.id;
    const [opened, setOpened] = useState(false);
    const [editName, setEditName] = useState(false);

    const [name, setName] = useState('New item');
    const [userList, setUserList] = useState([]);
    const [userCount, setUserCount] = useState(0);


    useEffect(()=>{
        setUserList(props.base_users);
    },[props.base_users]);
    
    useEffect(()=>{
        setName(props.data.name);
    },[props.data]);

    useEffect(()=>{setOpened(props.opened); },[props.opened]);

    useEffect(()=>{getMock(); },[userList]);

    const [mockData, setMockData] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);

  const getMock = () => {
    let newMockData   = [];
    let newTargetKeys = [];
    let userco = 0;
    for (let i = 0; i < userList.length; i++) {
        const element = userList[i];
        let key = `mocky${element.id}item`;
        if (element.user_group_id === group_id){
            console.log(group_id);
            element.chosen = true;
            element.titile = element.name;
            element.key = key;
            newMockData.push(element);
            newTargetKeys.push(element);
            userco++;
        } else if (element.user_group_id === 0){
            element.chosen = false;
            element.titile = element.name;
            element.key = key;
            newMockData.push(element);
            userco++;
        };
    };
    setMockData(newMockData);
    setTargetKeys(newTargetKeys);
    setUserCount(userco);
  };
//   useEffect(() => {
//     getMock();
//   }, []);

  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  const renderFooter = (_, info) => {
    if (info?.direction === 'left') {
      return (
        <Button
          size="small"
          style={{
            display: 'flex',
            margin: 8,
            marginInlineEnd: 'auto',
          }}
          onClick={getMock}
        >
          Left button reload
        </Button>
      );
    }
    return (
      <Button
        size="small"
        style={{
          display: 'flex',
          margin: 8,
          marginInlineStart: 'auto',
        }}
        onClick={getMock}
      >
        Right button reload
      </Button>
    );
  };




  const onOpenCooxer = () => {
    if (!opened && props.on_open_cooxer){
        props.on_open_cooxer(props.data.id);
    }
    setOpened(!opened);
  }



    return (
        <Card className={"ant-card-small"} > 
        <div className={`sk-group-card ${opened ? "opened" : "cooxed"}`}>
            <div className={'sk-grp-card-head'}>
            <div>
                <Checkbox 
                    className={'sk-large-checkbox'}
                />
                    </div>
                    <div>
                        {name}
                    </div>
                    <div>
                        {userCount}
                    </div>
                    <div>
                        h
                    </div>
                    <div>
                        <div className={'sk-card-cooxer'}
                            onClick={onOpenCooxer}
                        >
                            <div className={'sk-card-cooxer-cooxed'}>
                                <DownOutlined />
                            </div>
                            <div className={'sk-card-cooxer-opened'}>
                                <UpOutlined />
                            </div>
                        </div>
                        
                    </div>
            </div>
            <div className={'sk-grp-card-body'}>
                <div className={'sk-grp-user-items-stack'}>

                <Transfer
                    dataSource={mockData}
                    showSearch
                    listStyle={{
                        
                        height: 500,
                    }}
                    operations={['Удалить', 'Добавить']}
                    titles={['Пользователи в группе', 'Пользователи без группы']}
                    targetKeys={targetKeys}
                    onChange={handleChange}
                    render={(item) => `${item.title}-${item.description}`}
                    footer={renderFooter}
                    
                    />

                </div>
            </div>
        </div>
            </Card>
    )

}

export default GroupCardItem;
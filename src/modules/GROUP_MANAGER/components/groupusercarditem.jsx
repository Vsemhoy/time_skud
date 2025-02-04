import { Card, Checkbox, Tag } from "antd";
import React from "react";
import "./style/groupcard.css";

const GroupUserCardItem = (props)=>{

    return (
        
        <Card className={"ant-card-small"} > 
                <div className={"sk-gruser-card"}>
                <div>
                    <Checkbox 
                        className={'sk-large-checkbox'}
                    />
                </div>
                <div>
                    {props.user_data.name}
                </div>
                <div>
                
                </div>
                <div>
                    <Tag color="volcano">Супер-группа 1</Tag>
                </div>
                </div>
            </Card>
    )
}

export default GroupUserCardItem;
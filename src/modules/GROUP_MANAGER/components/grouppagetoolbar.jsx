import { Button, Input } from "antd";
import React from "react";

const GroupPageToolbar = ()=>{

    return (
        <div>
            <div className={'sk-flex-gap'}>
                <Input placeholder="Новая группа" />
                <Button size="medium">Создать</Button>
            </div>
        </div>
    )
}

export default GroupPageToolbar;
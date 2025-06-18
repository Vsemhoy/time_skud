import React from "react";
import {useParams} from "react-router-dom";

const UserPage = () => {
    const { userId } = useParams();

    return (
        <div>
            <h1>Пользователь с ID: {userId}</h1>
        </div>
    )
}

export default UserPage;
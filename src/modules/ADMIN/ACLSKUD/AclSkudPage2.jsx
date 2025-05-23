import React, { useEffect, useState } from 'react';
import './components/style/aclskud.css';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, DiffOutlined, DownSquareOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { AimOutlined, BlockOutlined, BugOutlined, CarOutlined, DockerOutlined, DollarOutlined, MedicineBoxOutlined, MoonOutlined, PlusCircleOutlined, PlusOutlined, RocketOutlined, SmileOutlined, TruckOutlined } from "@ant-design/icons";
import { Affix, Checkbox, Radio, Select, Tabs } from 'antd';
import { CSRF_TOKEN, PRODMODE } from '../../../CONFIG/config';
import { DS_DEPARTMENTS, DS_USERLIST_USERS } from '../../../CONFIG/DEFAULTSTATE';
import AclSkudCardRow from './components/AclSkudCardRow';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';
import { ACL_DEPARTS, ACL_SK_USERS } from './components/AclSkudData';



const AclSkudPage2 = (props) => {

    const [baseUserCollection, setBaseUserCollection] = useState([]);
    const [userCollection, setUserCollection] = useState([]);
    const [departments, setDepartments]  = useState([]);

    const [cooxStateDeparts, setCooxStateDepars] = useState([]);
    const [cooxStateUsers, setCooxStateUsers] = useState([]);

    const [visibleCompany, setVisibleCompany] = useState(2);

    const [triggerTemplates, setTriggerTemplates] = useState(false);

    const [copyRows, setCopyRows] = useState([]);

    const [pageLoaded, setPageLoaded] = useState(false);



    
    useEffect(() => {
      if (PRODMODE){
        //   get_departments();
        //   get_users();
        //   get_departs2();
        //   get_departtemplates();
        //   get_states();
        //   get_departusers();
      } else {
        //   setDepartments(ACL_DEPARTS);
        //   setBaseUserCollection(ACL_SK_USERS);

      }
    }, []);

    useEffect(() => {
        // get_departments();
        // get_users();
    }, [visibleCompany]);


    return (
        <div>Hello</div>
    )

}

export default AclSkudPage2;
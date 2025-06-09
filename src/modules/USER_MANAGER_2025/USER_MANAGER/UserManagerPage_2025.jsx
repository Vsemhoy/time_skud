import React, {useState} from 'react';
import UserManagerExtraTools from "./components/UserManagerExtraTools";


const UserManagerPage_2025 = (props) => {
    const [baseGroupList, setBaseGroupList] = useState([]);
    const setFilters = (ev) => {

    }

    const setSelectedGroups = (val) => {

    }

    return (
        <div>
            <div>Hellow Woolfffff</div>
            <UserManagerExtraTools
                companies={props.userdata?.companies}
                groups={baseGroupList}
                onChangeFilter={(ev) => {
                    setFilters(ev)
                }}
                onSelectAllUsers={null}
                onSelectGroups={(val) => {
                    setSelectedGroups(val)
                }}
                onCallToSelectGroups={null}
                onCallToClearGroups={null}
                selected_users={[]}
                rules={[]}
                schedules={[]}
                selectedCompany={null}

                schedTypes={[]}
                ruleTypes={[]}
                onBidnRules={null}
                onBidnSchedules={null}
            />
        </div>
    );
}

export default UserManagerPage_2025;

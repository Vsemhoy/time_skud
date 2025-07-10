// import React from "react";
//
// {baseRuleList.map((rule, index) => (
//     <div key={`${rule.id}-${index}`}
//          className="sk-department-block"
//     >
//
//         <div className="sk-department-header"
//              onDoubleClick={() => openCloseRules(rule.id)}
//         >
//             <div className="sk-department-header-hover-container">
//                 <p className="sk-department-header-p">{rule.id}</p>
//                 <p className="sk-department-header-p">{rule.name}</p>
//             </div>
//         </div>
//         {/*{!closedDepartments.find(item => item === department.id) && (*/}
//         {/*    <div className="sk-person-rows">*/}
//         {/*        {users.map((user, idx) => {*/}
//         {/*            if (+user.departament === +department.id) {*/}
//         {/*                return (*/}
//         {/*                    <div key={`${user.id}-${idx}`}*/}
//         {/*                         className={`sk-person-row ${checkedUsers.find(item => item === user.id) ? "sk-row-selected" : ""}`}*/}
//         {/*                    >*/}
//         {/*                        <div className="sk-person-row-basic"*/}
//         {/*                             onDoubleClick={(e) => openCloseUserRules(e, user.id)}*/}
//         {/*                        >*/}
//         {/*                            <div className="sk-person-row-basic-hover-container">*/}
//         {/*                                <Checkbox checked={checkedUsers.find(item => item === user.id)}*/}
//         {/*                                          onChange={() => checkUncheckUser(user.id)}*/}
//         {/*                                />*/}
//         {/*                                <p className="sk-person-row-p">{user.id}</p>*/}
//         {/*                                <div className="sk-person-row-content">*/}
//         {/*                                    <p className="sk-person-row-p">{`${user.surname} ${user.name} ${user.patronymic}`}</p>*/}
//         {/*                                    <p className="sk-person-row-p occupy">{user.occupy}</p>*/}
//         {/*                                </div>*/}
//         {/*                                <NavLink to={'/hr/users/' + user.id}>*/}
//         {/*                                    <Button color={'default'}*/}
//         {/*                                            variant={'outlined'}*/}
//         {/*                                            icon={<EditOutlined/>}*/}
//         {/*                                    >Редактировать</Button>*/}
//         {/*                                </NavLink>*/}
//         {/*                            </div>*/}
//         {/*                            {user.groups && user.groups.length > 0 && (*/}
//         {/*                                <div*/}
//         {/*                                    className="sk-person-row-basic-groups">*/}
//         {/*                                    {user.groups.map((groupId, idx) => {*/}
//         {/*                                        if (groups.find(item => item.id === groupId)) {*/}
//         {/*                                            return (*/}
//         {/*                                                <Tag*/}
//         {/*                                                    key={`group-tag-${user.id}-${groupId}`}*/}
//         {/*                                                    style={{*/}
//         {/*                                                        color: '#757575',*/}
//         {/*                                                        borderBottom: '1px solid #FF6200',*/}
//         {/*                                                        margin: '0'*/}
//         {/*                                                    }}*/}
//         {/*                                                    closeIcon*/}
//         {/*                                                    onClose={(e) => removeGroup(e, groupId, user.id)}>*/}
//         {/*                                                    {groups.find(item => item.id === groupId)?.name}*/}
//         {/*                                                </Tag>*/}
//         {/*                                            );*/}
//         {/*                                        } else return '';*/}
//         {/*                                    })}*/}
//         {/*                                </div>*/}
//         {/*                            )}*/}
//         {/*                        </div>*/}
//         {/*                        {openRules.find(item => item === user.id) && user.linked_schedule && (*/}
//         {/*                            <div className="sk-person-rules">*/}
//         {/*                                <div className="sk-person-schedule">*/}
//         {/*                                    <div*/}
//         {/*                                        className="sk-person-schedule-hover-container">*/}
//         {/*                                        <div className="sk-schedule-cell">*/}
//         {/*                                            <CalendarOutlined />*/}
//         {/*                                            <p>{user.linked_schedule.skud_schedule.name}</p>*/}
//         {/*                                        </div>*/}
//         {/*                                        <p className="sk-schedule-cell sk-schedule-cell-center">*/}
//         {/*                                            {dayjs()*/}
//         {/*                                                .startOf('day')*/}
//         {/*                                                .add(user.linked_schedule.skud_schedule.start_time, 'seconds')*/}
//         {/*                                                .format('HH:mm')}*/}
//         {/*                                            -*/}
//         {/*                                            {dayjs()*/}
//         {/*                                                .startOf('day')*/}
//         {/*                                                .add(user.linked_schedule.skud_schedule.end_time, 'seconds')*/}
//         {/*                                                .format('HH:mm')}*/}
//         {/*                                        </p>*/}
//         {/*                                        <p className="sk-schedule-cell sk-schedule-cell-center">*/}
//         {/*                                            {dayjs()*/}
//         {/*                                                .startOf('day')*/}
//         {/*                                                .add(user.linked_schedule.skud_schedule.lunch_start, 'seconds')*/}
//         {/*                                                .format('HH:mm')}*/}
//         {/*                                            -*/}
//         {/*                                            {dayjs()*/}
//         {/*                                                .startOf('day')*/}
//         {/*                                                .add(user.linked_schedule.skud_schedule.lunch_end, 'seconds')*/}
//         {/*                                                .format('HH:mm')}*/}
//         {/*                                        </p>*/}
//         {/*                                        <p className="sk-schedule-cell sk-schedule-cell-center">*/}
//         {/*                                            {dayjs()*/}
//         {/*                                                .startOf('day')*/}
//         {/*                                                .add(user.linked_schedule.skud_schedule.target_time, 'seconds')*/}
//         {/*                                                .format('HH:mm')} / день</p>*/}
//         {/*                                    </div>*/}
//         {/*                                </div>*/}
//         {/*                                {user.linked_rules.map((rule, idx) => (*/}
//         {/*                                    <div className="sk-person-rule" key={`${user.id}-${rule.id}`}>*/}
//         {/*                                        <div className="sk-person-rule-hover-container">*/}
//         {/*                                            <div className="sk-schedule-cell">*/}
//         {/*                                                <HistoryOutlined />*/}
//         {/*                                                <p>{rule.name}</p>*/}
//         {/*                                            </div>*/}
//         {/*                                            <p className="sk-schedule-cell sk-schedule-cell-center">*/}
//         {/*                                                {dayjs()*/}
//         {/*                                                    .startOf('day')*/}
//         {/*                                                    .add(rule.duration_time, 'seconds')*/}
//         {/*                                                    .format('HH:mm')}*/}
//         {/*                                            </p>*/}
//         {/*                                        </div>*/}
//         {/*                                    </div>*/}
//         {/*                                ))}*/}
//         {/*                            </div>*/}
//         {/*                        )}*/}
//         {/*                    </div>*/}
//         {/*                );*/}
//         {/*            }*/}
//         {/*            return '';*/}
//         {/*        })}*/}
//         {/*    </div>*/}
//         {/*)}*/}
//     </div>
// ))}

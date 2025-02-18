import React, { useEffect, useState } from "react";
import { DS_PROD_CALENDARS, DS_RULE_TYPES, DS_RULES, DS_SCHEDULE_ENTITIES, DS_USER } from "../../CONFIG/DEFAULTSTATE";
import RuleToolbar from "./components/RuleToolbar";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import RuleCardItem from "./components/rulecarditem";
import RuleEditorModal from "./components/ruleeditormodal";
import './components/style/rulemanager.css';
import { PROD_AXIOS_INSTANCE } from "../../API/API";


const RuleManagerPage = (props) => {
    const { userdata } = props;
        const [companies, setCompanies] = useState([
            ...DS_USER.companies.map((com) => ({
                key: com.id,
                value: Number(com.id),
                label: com.name,
            })),
        ]);

    const [ruleTypes, setRuleTypes] = useState([]);
    const [baseEntityList, setBaseEntityList] = useState([]);
    const [entityList, setEntityList] = useState([]);

    const [baseRuleList, setBaseRuleList] = useState([]);
    const [ruleList, setRuleList] = useState([]);

        const [openedCooxer, setOpenedCooxer] = useState(0);
        const [ctrlKey, setCtrlKey] = useState(false);
    
        const [editorOpened, setEditorOpened] = useState(false);
        const [editedRuleId, setEditedRuleId] = useState(0);
    
        const [filters, setFilters] = useState([]);

    useEffect(()=>{
        if (PRODMODE){
            setBaseEntityList(DS_SCHEDULE_ENTITIES);
            setRuleTypes(DS_RULE_TYPES);
            setBaseRuleList(DS_RULES);
        } else {
            get_ruleTypes();
            get_entityList();
            get_ruleList();
        } 
    },[]);


    useEffect(()=>{
        setEntityList(baseEntityList);
        console.log(baseEntityList);
    },[baseEntityList]);

    useEffect(() => {
        if (filters.length == 0)
        {
            setRuleList(baseRuleList);

        } else {
            let filteredData = JSON.parse(JSON.stringify(baseRuleList));
            for (let i = 0; i < filters.length; i++) {
                const filter = filters[i];
                if (filter.type === 'filter'){
                    filteredData = filteredData.filter((item)=> item[filter.key] == filter.value);
                }

                if (filter.type === 'text_filter'){
                    let newFiltered = [];
                    for (let n = 0; n < filteredData.length; n++) {
                        const group = filteredData[n];
                        let found = false;
                        if (group.name.toUpperCase().includes(filter.value.toUpperCase()) ||
                        group.description.toUpperCase().includes(filter.value.toUpperCase()) ){
                            found = true;
                            console.log('I found em', filter.value);
                        };

                        if (!found){
                            // если нет совпадений в группе, ищем в поиске
                            for (let index = 0; index < baseRuleList.length; index++) {
                                const user = baseRuleList[index];
                                console.log(user);
                                if (user.name.toUpperCase().includes(filter.value.toUpperCase())
                                || user.surname.toUpperCase().includes(filter.value.toUpperCase()) ||
                                user.patronymic.toUpperCase().includes(filter.value.toUpperCase())
                                ){
                                    if (group.id === user.user_group_id){
                                        found = true;
                                        console.log('FOUND', user);
                                        break;
                                    }
                                };
                            }
                        }
                        if (found){
                            newFiltered.push(group);
                        }
                    }
                    filteredData = newFiltered;
                }
            }
            setRuleList(filteredData);
        }

        // console.log(baseScheduleList);
    }, [baseRuleList, filters]);



  /** ------------------ FETCHES ---------------- */
    /**
     * Получение сущностей
     * @param {*} req 
     * @param {*} res 
     */
    const get_entityList = async (req, res) => {
      try {
          let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/rules/entities_get', 
            {
                data: {
                    status: 0,
                    deleted: 0,
                },
                _token: CSRF_TOKEN
            });
            setBaseEntityList(response.data.data);
            console.log('get_calendarList => ', response.data);
      } catch (e) {
          console.log(e)
      } finally {
          
      }
    }

    /**
     * Получение списка правил
     * @param {*} req 
     * @param {*} res 
     */
    const get_ruleTypes = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/rules/types_get', 
              {
                  data: {
                    deleted: 0
                  },
                  _token: CSRF_TOKEN
              });
              setRuleTypes(response.data.data);
              console.log('get_calendarList => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
            
        }
    }

    /**
     * Получение списка правил
     * @param {*} req 
     * @param {*} res 
     */
        const get_ruleList = async (req, res) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/rules/rules_get', 
                  {
                      data: {
                        id_company: null
                      },
                      _token: CSRF_TOKEN
                  });
                  setBaseRuleList(response.data.data);
                  console.log('get_calendarList => ', response.data);
            } catch (e) {
                console.log(e)
            } finally {
                
            }
        }


    /**
         * создание правила
         * @param {*} req 
         * @param {*} res 
         */
        const create_rule = async (body, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/rules/rules',
                {
                    data: body, 
                    _token: CSRF_TOKEN
                });
            console.log('users', response);
            setBaseRuleList([...baseRuleList, response.data.data]);
        } catch (e) {
            console.log(e)
        } finally {
            get_ruleList();
        }
    }
    
  
    /**
     *  Обновление данных правила
     * @param {*} req 
     * @param {*} res 
     */
    const update_rule = async (body, req, res) => {
        console.log('body',body);
        try {
            let response = await PROD_AXIOS_INSTANCE.put('/api/timeskud/rules/rules/' + body.id,
                {   
                    data: body, 
                    _token: CSRF_TOKEN
                }
            );
            console.log('users', response);
            // setBaseUserListData(response.data.data);
        } catch (e) {
            console.log(e)
        } finally {
            setBaseRuleList(prevList => 
                prevList.map(item => 
                    item.id === body.id ? { ...item, ...body } : item // Заменяем объект по id
                )
            );
        }
    }



    /**
     * Перелинковка юзеров с гурппами
     * @param {*} req 
     * @param {*} res 
     */
        const update_links = async (body, req, res) => {
            console.log('body',body);
            try {
                let response = await PROD_AXIOS_INSTANCE.put('/api/timeskud/rules/links/' + body.rule_id,
                    {   
                        data: body, 
                        _token: CSRF_TOKEN
                    }
                );
                console.log('users', response);
                // setBaseUserListData(response.data.data);
            } catch (e) {
                console.log(e)
            } finally {

            }
        }

    /**
       * удаление правила
       * @param {*} req 
       * @param {*} res 
       */
    const delete_rule = async (rule_id, req, res) => {

        try {
            let response = await PROD_AXIOS_INSTANCE.delete('/api/timeskud/rules/rules/' + rule_id,
                {   
                    data: { "id" : rule_id}, 
                    _token: CSRF_TOKEN
                }
            );
            console.log('response.data', response.data);
            if (response.data.status === 0){
                get_ruleList();
            }
        } catch (e) {
            console.log(e)
        } finally {
            setBaseRuleList(baseRuleList.filter((item)=>{return item.id !== rule_id}));
        }
    }

  /** ------------------ FETCHES END ---------------- */


    const openModal = () => {
        setEditedRuleId(null);
        setEditorOpened(true);
    }


    const openModalEditor = (group_id, event) => {
        if (event && event.ctrlKey){
            setCtrlKey(true);
        } else {
            setCtrlKey(false);
        }
        setEditedRuleId(group_id);
        setEditorOpened(true);
    }

    const cancelModalEditor = ()=>{
        setCtrlKey(false);
        setEditedRuleId(0);
        setEditorOpened(false);
    }

    const deleteRule = (rule_id) => {
        delete_rule(rule_id);
        setEditedRuleId(0);
        setEditorOpened(false);
    }

    const saveRule = (data) => {
        if (data.duration_time !== 0){
            data.duration_time = data.duration_time * 60;
        }
        if (data.id === null || data.id === 0){
            // create
            create_rule(data);
        } else {
            // update
            update_rule(data);
        }
        setEditedRuleId(0);
        setEditorOpened(false);
    }

    const openBlankEditor = () => {
        setEditedRuleId(null);
        setEditorOpened(true);
    }


    const onSetFilters = (filters) => {
        setFilters(filters);
    }

    const updateEntityLinks = (data) => {
        console.log("updated" , data);
        const rule_id = data[0];
        const rule_type = data[1];
        const toUpdate = data[2];
        const toDelete = data[3];

        console.log("toUpdatae", toUpdate);

        const addUsers = [];
        const addGroups = [];
        const rmUsers = [];
        const rmGroups = [];

        let baseClone = JSON.parse(JSON.stringify(baseEntityList));

        for (let i = 0; i < baseEntityList.length; i++) {
            const element = baseEntityList[i];
            if (element.type === 3){
                for (const item of toUpdate) {
                    
                    if (item.type === 3 && item.entity_id === element.id){

                        addUsers.push(baseEntityList[i].id);
                        baseClone[i].rule_links.push({type: rule_type, rule_id: rule_id});
                        console.log(baseClone[i]);
                        break;
                    }
                }
                for (const item of toDelete) {
                    if (item.type === 3 && item.entity_id === element.id){
                        rmUsers.push(baseEntityList[i].id);
                        baseClone[i].rule_links = baseClone[i].rule_links.filter((elem)=> elem.type !== rule_type);
                        break;
                    }
                }
            }
            if (element.type === 2){
                for (const item of toUpdate) {
                    if (item.type === 2 && item.entity_id === element.id){
                        addGroups.push(baseEntityList[i].id);
                        baseClone[i].rule_links.push({type: rule_type, rule_id: rule_id});
                        break;
                    }
                }
                for (const item of toDelete) {
                    if (item.type === 2 && item.entity_id === element.id){
                        rmGroups.push(baseEntityList[i].id);
                        baseClone[i].rule_links = baseClone[i].rule_links.filter((elem)=> elem.type !== rule_type);
                        break;
                    }
                }
            }
        }
        setBaseEntityList(baseClone);

        update_links(
        {
            rule_id: rule_id,
            linked_users : addUsers,
            unlinked_users: rmUsers,
            linked_groups : addGroups,
            unlinked_groups: rmGroups,
        });
    }

        useEffect(()=>{
            console.log("BLM", baseEntityList);
        },[baseEntityList]);

    return (
        <div className={'sk-mw-1000'}>
            <br/>
            <h2>Правила учёта рабочего времени</h2>
                <RuleToolbar
                    companies={companies}
                    userData={userdata}
                    ruleTypes={ruleTypes}
                    onChangeFilter={onSetFilters}
                    onAddNewClick={openModal}
                />
            {/* <ProdCalToolbar 
                onChangeCompany={changeCompany}
            /> */}
            <br/> 

            <div className={'sk-calendar-list'}>
            <div>
            </div>
                {
                    ruleList.map((group)=>(
                        <RuleCardItem
                        key={`grocard_${group.id}`}
                        data={group}
                        opened={openedCooxer === group.id}
                        on_open_cooxer={(value)=>{setOpenedCooxer(value)}}
                        base_entities={baseEntityList}
                        on_link_update={updateEntityLinks}
                        on_open_editor={openModalEditor}
                        on_manage_entities={updateEntityLinks}
                        user_data={userdata}
                        />
                    ))
                }


            </div>
                <RuleEditorModal
                    open={editorOpened}
                    item_list={baseRuleList}
                    target_id={editedRuleId}
                    on_cancel={cancelModalEditor}
                    ctrl_key={ctrlKey}
                    on_delete={deleteRule}
                    user_data={userdata}
                    on_save={saveRule}
                    type_list={ruleTypes}
            />
        </div>
    )
};

export default RuleManagerPage;


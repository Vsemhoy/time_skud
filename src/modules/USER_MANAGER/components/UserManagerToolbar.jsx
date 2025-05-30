import { Button, Select, Tag } from "antd";
import Search from "antd/es/transfer/search";
import React, { useEffect, useState } from "react";
import { DS_SKUD_GROUPS } from "../../../CONFIG/DEFAULTSTATE";
import dayjs from "dayjs";



const UserManagerToolbar = (props)=>{

const sortByOptions = [
    {
        key: `sort_null`,
        label: "Без сортировки",
        value: ''
    },
    {
        key: `sort_id_asc`,
        label: "По id увеличение",
        value: 'id_asc'
    },
    {
        key: `sort_id_desc`,
        label: "По id уменьшение",
        value: 'id_desc'
    },
    {
        key: `sort_username_asc`,
        label: "Имя А-Z",
        value: 'username_asc'
    },
    {
        key: `sort_username_desc`,
        label: "Имя Z-А",
        value: 'username_desc'
    },
    {
        key: `sort_surname_asc`,
        label: "Фамилия А-Z",
        value: 'surname_asc'
    },
    {
        key: `sort_surname_desc`,
        label: "Фамилия Z-А",
        value: 'surname_desc'
    },
    {
        key: `sort_department`,
        label: "Отдел по id",
        value: 'department_asc'
    },
];

const [companiesList, setCompaniesList] = useState([]);
const [groupList, setGroupList] = useState([]);


const [selectedSortBy, setSelectedSortBy] = useState("");
const [selectedCompany, setSelectedCompany] = useState(0);
const [selectedGroups, setSelectedGroups] = useState([]);
const [filterText, setFilterText] = useState('');





useEffect(()=>{
    console.log(props.companies);
    if (props.companies?.length){
        let coms = props.companies.filter((item)=>{return item.id !== 1});
        if (coms.length > 1){
            coms.push({
                id: 0,
                name: 'Все компании',
            });

            coms = coms.sort((a, b)=> {return a.id - b.id});
            setCompaniesList(coms.map(item => ({
                key: item.id.toString(), // Преобразование в строку для безопасности
                label: item.name,
                value: item.id,
                
              })));
        }

        console.log(coms);
    }
},[props.companies]);


useEffect(()=>{
    console.log( props.groups);
    setSelectedGroups([]);
    let grop = props.groups;
    if (selectedCompany !== 0)
    {
        grop = grop.filter((item)=>{return item.id_company === selectedCompany});
    }
    setGroupList(
        grop.map(item => ({
            key: item.id,
            label: item.name,
            value: item.id,
            color: item.company_color
        }))
    )
},[props.groups, selectedCompany]);



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


    useEffect(()=>{
        console.log('ev', selectedCompany)
        if (props.onChangeCompany){
        if (selectedCompany > 1) {
                props.onChangeCompany(selectedCompany);
            } else {
                props.onChangeCompany(0);
            }
        };
    },[selectedCompany]);
    

    useEffect(()=>{
        const t = setTimeout(() => {
            let filters = [];

            if (selectedGroups != null && selectedGroups.length > 0)
            {
                let fil1 = {type: 'filter', key: 'group_id', value: selectedGroups};
                filters.push(fil1);
            };
            if (selectedCompany != null && selectedCompany !== 0)
            {
                let fil1 = {type: 'filter', key: 'id_company', value: selectedCompany};
                filters.push(fil1);
            }
            if (filterText != null && filterText.trim() !== "" && filterText.trim().length > 0)
            {
                let splitext = filterText.toLowerCase().split('+');
                for (let i = 0; i < splitext.length; i++) {
                    const text = splitext[i];
                    let fil1 = {type: 'filter', key: 'text_filter_' + i, value: text.toLowerCase()};
                    filters.push(fil1);
                }
            }

            if (selectedSortBy != null && selectedSortBy !== '')
            {
                let fil1 = {type: 'sorter', key: 'sort_by', value: selectedSortBy};
                filters.push(fil1);
            }

            if (props.onChangeFilter){
                props.onChangeFilter(filters);
            }
            console.log(filters);
        }, 100);
        return () => clearTimeout(t);
    }, [selectedGroups, selectedCompany, filterText, selectedSortBy]);


    return (
        <div>
            <div className={'sk-flex'}>
                <Select
                    options={companiesList}
                    value={selectedCompany}
                    onChange={(ev)=>{setSelectedCompany(ev)}}
                    />
                <Search
                    placeholder="Поиск по имени, фамилии или должности"
                    value={filterText}
                    onChange={(ev)=>{setFilterText(ev.target.value);}}
                />
                <Select
                    style={{width: '140px'}}
                    value={selectedSortBy}
                    options={sortByOptions}
                    onChange={(ev)=>{setSelectedSortBy(ev)}}
                    />
            </div>
            <br />
            <div className={'sk-flex'}>
                <Select
                    placeholder={'Фильтр по группам, включающим пользователей'}
                    value={selectedGroups}
                    mode={'multiple'}
                    options={groupList}
                    style={{ width: '100%' }}
                    onChange={(ev)=>{setSelectedGroups(ev)}}
                    tagRender={tagRender}
                />
            <Button
                onClick={()=>{setSelectedGroups([])}}
            >Очистить</Button>
            </div>
        </div>
    );
};

export default UserManagerToolbar;
import { useContext, useEffect, useId, useState } from 'react';
import { StateContext } from '../ComStateProvider25/ComStateProvider25';
import Her from './Her';

const BreadCrumber = (props) => {
    const {state, setState} = useContext(StateContext);
    const [links, setLinks] = useState([]);
    
    useEffect(()=>{
        const result = [];
        if (state.location == '' || state.location.toLowerCase() == 'home'){
            result.push(<Her href='home'>главная</Her>);
        };

        // if (state.location.toLowerCase() == 'mtrack'){
        //     result.push(<Her href='mtrack'>mtrack</Her>);
        // };

        // Insert 1st level Her
        if (state.location.toLowerCase() == 'claims' ||
            state.location.toLowerCase() == 'executor' ||
            state.location.toLowerCase() == 'mtrack' ||
            state.location.toLowerCase() == 'questions' ||
            state.location.toLowerCase() == 'settings' ||
            state.location.toLowerCase() == 'releases' ||
            state.location.toLowerCase() == 'claimeditor' ||
            state.location.toLowerCase() == 'claimpage' ||
            state.location.toLowerCase() == 'board' ||
            state.location.toLowerCase() == 'taskeditor' ||
            state.location.toLowerCase() == 'releaseeditor' ||
            state.location.toLowerCase() == 'claimeditor' ||
            state.location.toLowerCase() == 'execeditor' ||
            state.location.toLowerCase() == 'releaseeditor' ||
            state.location.toLowerCase() == 'releasepage'
        ){
            result.push(<Her key={`refer_257834`} href='mtrack'>mtrack</Her>);
        };

        // Second level Her
        if (state.location.toLowerCase() == 'claims'){
            result.push(<a key={`refer_2f34`}>заявки</a>);
        }

        if ( state.location.toLowerCase() == 'claimpage'
        || state.location.toLowerCase() == 'claimeditor'
        ){
            result.push(<Her key={`refer_2534`} href='claims'>заявки</Her>);
            if (state.location.toLowerCase() == 'claimpage' && state.target_claim_id != 0){
                result.push(<Her key={`refer_56344`} href='claims/editor'>заявка {state.target_claim_id}</Her>);
            }
        };

        if (state.location.toLowerCase() == 'claimeditor'
        ){
            result.push(<Her key={`refer_25rw34`} href='claims/editor'>редактор</Her>);
            if (state.target_claim_id != 0){
                result.push(<a key={`refer_2wt34`}>заявка {state.target_claim_id}</a>);
            }
        };


        if (state.location.toLowerCase() == 'releases'){
            result.push(<a key={`refer_2fd34`}>релизы</a>);
        }

        if (state.location.toLowerCase() == 'questions'){
            result.push(<a key={`refer_2fd5634`}>вопросы</a>);
        }

        if (state.location.toLowerCase() == 'settings'){
            result.push(<a key={`refer_2f554d34`}>настройки</a>);
        }

        if (state.location.toLowerCase() == 'executor'){
            result.push(<a key={`refer_2f54d34`}>исполнитель</a>);
        }

        // result.push(<Her key={`refer_25534`} href='mtrack'></Her>);
        
        setLinks(result);
    }, [state])

    useEffect(()=>{
        console.log('links', links)
    }, [links])

    return (
        <>
            {links.map((loc, index)=>(<div key={`kefir${index}`}>{loc}</div>))}
        </>
    );
}


export default BreadCrumber;
import { useContext } from "react";
import { StateContext } from "../ComStateProvider25/ComStateProvider25";
import dayjs from "dayjs";



export const ParseRoute = (url, setNewState = false) => {
    console.log('path', url)
    let params = url;
    // const {state, setState} = useContext(StateContext);

    let result = {
            text: '',
            target_user_id: 0,
            target_claim_id: 0,
            target_task_id: 0,
            target_release_id: 0,
            target_comment_id: 0,
            target_question_id: 0,
            target_tab_id: 0,
            current_location: '',
            location: '', // Defines jsx template
            open_quest_modal: false,
            open_task_modal: false,
            target_project: 0,
            target_section: 0,
            date: '',
        };

    if (params.includes('?')){
        params = url.split('?');
        params = params[1];
    };

    params = params.split('&');


    let qp = [];
    for (let i = 0; i < params.length; i++) {
        const element = params[i];
        const qv = element.split('=');
        qp.push({param: qv[0], value: qv[1]});
    };

    for (let i = 0; i < qp.length; i++) {
        const element = qp[i];
        if (element.param.toLowerCase() === 'location')
        {
            result = getLocationName(element.value, result);
        };

        if (element.param.toLowerCase() === 'claim'){
            result.target_claim_id = parseInt(element.value);
        } else

        if (element.param.toLowerCase() === 'release'){
            result.target_release_id = parseInt(element.value);
        } else

        if (element.param.toLowerCase() === 'task'){
            console.log('result', result)
            result.target_task_id = parseInt(element.value);
        } else

        if (element.param.toLowerCase() === 'question'){
            result.target_question_id = parseInt(element.value);
        } else

        if (element.param.toLowerCase() === 'comment'){
            result.target_comment_id = parseInt(element.value);
        } else

        if (element.param.toLowerCase() === 'tab'){
            result.target_tab_id = parseInt(element.value);
        } else

        if (element.param.toLowerCase() === 'user'){
            result.target_user_id = parseInt(element.value);
        };

        if (element.param.toLowerCase() === 'qmodal'){
            result.open_quest_modal = true;
        };
        if (element.param.toLowerCase() === 'tskmodal'){
            result.open_task_modal = true;
        };
        if (element.param.toLowerCase() === 'project'){
            result.target_project = true;
        };
        if (element.param.toLowerCase() === 'section'){
            result.target_section = true;
        };
        if (element.param.toLowerCase() === 'date'){
            result.date = dayjs().unix(element.value);
        };
    }

    console.log('PARAMS', result);
    if (setNewState){
        // setState(result);
    }
    return result;

}


export default ParseRoute;

const getLocationName = (loc, result) => {
    let divider = '/';
    console.log('loc', loc);
    if (loc.includes('%2F')){
        divider = '%2F';
    }
    let q = loc.split(divider);
    if (q.length === 1){
        if (q[0] == '' || q[0].toLowerCase() == 'home')
        {
            result.location = '';
            return result;
        } else {
            result.location = q[0];
            return result;
        };
    };

    if (q.length > 1){
        const req2 = q[1].toLowerCase();
        if (q[0].toLowerCase() == 'pro'){
            if (req2 == 'eventmonitor'){
                result.location = 'eventmonitor';
                return result;
            }
        }

        if (q[0].toLowerCase() == 'manager'){
            if (req2 == 'usermanager'){
                result.location = 'usermanager';
                return result;
            } else if (req2 == 'claims'){
                result.location = 'claims';
                return result;
            } else if (req2 == 'rules'){
                result.location = 'rules';
                return result;
            } else if (req2 == 'schedules'){
                result.location = 'schedules';
                return result;
            } else if (req2 == 'calendars'){
                result.location = 'calendars';
                return result;
            } else if (req2 == 'groups'){
                result.location = 'groups';
                return result;
            }
        }

       
    };

    if (q.length === 3){

    };

    if (loc == 'home')
    {

    }
}
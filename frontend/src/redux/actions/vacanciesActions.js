import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";



function addVacancies (data) {
    return {
        type: 'ADD_VACANCIES',
        payload: data.data

    }
}

export function getVacancies() {
    return (dispatch) => {
        fetch('/api/v1/vacancies',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                switch (response.status){
                    case 200:
                    case 201:
                        return response.json();

                    default:
                        return {data: []}
                }
            })
            .then(data => {
                console.log('DATA: ', data);
                dispatch(addVacancies(data));
            })
            .catch((error) => {
                dispatch(makeNote({
                    status: 'danger',
                    text: 'Error: ' + error,
                    hide: false
                }))
            })
    }
}


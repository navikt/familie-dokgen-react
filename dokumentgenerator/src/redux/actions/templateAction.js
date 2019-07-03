import axios from 'axios';

export const SET_TEMPLATE_TYPE = 'SET_TEMPLATE_TYPE';
export const GET_TEMPLATE_NAMES = 'GET_TEMPLATE_NAMES';

export const setTemplateType = (selected) => dispatch => {
    dispatch({
     type: SET_TEMPLATE_TYPE,
     payload: selected
    })
   }

   export const getTemplateNames = () => dispatch => {
    axios.get("http://localhost:8080/maler").then(res => 
        dispatch({
            type: GET_TEMPLATE_NAMES,
            payload: res.data
        })
    );
};

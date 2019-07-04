import axios from 'axios';

export const SET_TEMPLATE_TYPE = 'SET_TEMPLATE_TYPE';
export const GET_TEMPLATE_NAMES = 'GET_TEMPLATE_NAMES';
export const GET_TEMPLATE_CONTENT = 'GET_TEMPLATE_CONTENT';

export const setTemplateType = (selected) => dispatch => {
    dispatch({
     type: SET_TEMPLATE_TYPE,
     payload: selected
    })
    dispatch(getTemplateContent(selected));
   };

   export const getTemplateNames = () => dispatch => {
    axios.get("http://localhost:8080/maler").then(res => 
        dispatch({
            type: GET_TEMPLATE_NAMES,
            payload: res.data
        })
    );
    };

    export const getTemplateContent = (name) => dispatch => {
        console.log("http://localhost:8080/maler/" + name)
        axios.get("http://localhost:8080/maler/" + name).then(res => 
            dispatch({
                type: GET_TEMPLATE_CONTENT,
                payload: res.data
            })
        );
        };

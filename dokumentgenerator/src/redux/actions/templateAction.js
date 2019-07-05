import axios from 'axios';

export const SET_TEMPLATE_TYPE = 'SET_TEMPLATE_TYPE';
export const GET_TEMPLATE_NAMES = 'GET_TEMPLATE_NAMES';
export const GET_TEMPLATE_CONTENT_MARKDOWN = 'GET_TEMPLATE_CONTENT_MARKDOWN';
export const GET_TEMPLATE_CONTENT_HTML = 'GET_TEMPLATE_CONTENT_HTML';

export const setTemplateType = (selected) => dispatch => {
    dispatch({
        type: SET_TEMPLATE_TYPE,
        payload: selected
    });
    dispatch(getTemplateContentInMarkdown(selected));
    dispatch(getTemplateContentInHTML(selected));
};

export const getTemplateNames = () => dispatch => {
    axios.get("maler").then(res =>
        dispatch({
            type: GET_TEMPLATE_NAMES,
            payload: res.data
        })
    );
};

export const getTemplateContentInMarkdown = (name) => dispatch => {
    axios.get("maler/markdown/" + name).then(res =>
        dispatch({
            type: GET_TEMPLATE_CONTENT_MARKDOWN,
            payload: res.data
        })
    );
};

export const getTemplateContentInHTML = (name) => dispatch => {
    console.log("Here");
    axios.get("maler/html/" + name).then(res =>
        dispatch({
            type: GET_TEMPLATE_CONTENT_HTML,
            payload: res.data
        })
    );
};

export const updateTemplateContent = (name, content) => {
    console.log("jeg kjører");
    axios.post("maler/" + name, content, {
        headers: {'Content-Type': 'text/plain'}
    })
};

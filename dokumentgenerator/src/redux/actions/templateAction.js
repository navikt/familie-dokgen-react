import axios from 'axios';
import {GET_ALL_TEMPLATE_NAMES, GET_TEMPLATE, POST_LETTER, PUT_TEMPLATE} from "../../API/url";
import {json} from "./json";

export const SELECTED_TEMPLATE = 'SELECTED_TEMPLATE';
export const GET_TEMPLATE_NAMES = 'GET_TEMPLATE_NAMES';
export const GET_TEMPLATE_CONTENT_MARKDOWN = 'GET_TEMPLATE_CONTENT_MARKDOWN';
export const GET_TEMPLATE_CONTENT_HTML = 'GET_TEMPLATE_CONTENT_HTML';
export const UPDATE_EDITOR_CONTENT = 'UPDATE_EDITOR_CONTENT';
export const CLEAR_EDITOR_AND_PREVIEW = 'CLEAR_EDITOR_AND_PREVIEW';
export const UPDATE_PREVIEW_URL = 'UPDATE_PREVIEW_URL';

export const selectedTemplate = (selected) => dispatch => {
    dispatch({
        type: SELECTED_TEMPLATE,
        payload: selected
    });
    if(selected===""){
        dispatch(clearEditorAndPreview());
    } else { 
        dispatch(getTemplateContentInMarkdown(selected));
        dispatch(updatePreviewURL(selected));
    }
};

export const getTemplateNames = () => dispatch => {
    axios.get(GET_ALL_TEMPLATE_NAMES).then(res =>
        dispatch({
            type: GET_TEMPLATE_NAMES,
            payload: res.data
        })
    );
};

export const getTemplateContentInMarkdown = (name) => dispatch => {
    axios.get(`${GET_TEMPLATE}/?templateName=${name}`).then(res =>
        dispatch({
            type: GET_TEMPLATE_CONTENT_MARKDOWN,
            payload: res.data
        })
    );
};

export const getTemplateContentInHTML = (name) => dispatch => {
    axios.post(
        POST_LETTER,
        {
            "templateName": name,
            "interleavingFields": {},
            "format": "html"
        },
        {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            dispatch({
                type: GET_TEMPLATE_CONTENT_HTML,
                payload: res.data
            })
        });
};

export const updateTemplateContent = (name, content) => dispatch => {
    return axios.put(
        PUT_TEMPLATE,
        {
            "templateName": name,
            "interleavingFields": {},
            "markdownContent": content,
            "format": "html"
        },
        {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            dispatch({
                type: GET_TEMPLATE_CONTENT_HTML,
                payload: res.data
            })
        });
};

export const updateEditorContent = (content) => dispatch => {
    dispatch({
        type: UPDATE_EDITOR_CONTENT,
        payload: content
    });

};

export const clearEditorAndPreview = () => dispatch => {
    dispatch({
        type: CLEAR_EDITOR_AND_PREVIEW
    })
};

export const updatePreviewURL = (name) => dispatch => {
    dispatch({
        type: UPDATE_PREVIEW_URL,
        payload: name
    })
};

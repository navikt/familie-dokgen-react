import axios from 'axios';
import {letterGenJson} from "../../API/requestDataFormats";
import {GET_ALL_TEMPLATE_NAMES, GET_TEMPLATE, POST_LETTER, PUT_TEMPLATE} from "../../API/url";

export const SELECTED_TEMPLATE = 'SELECTED_TEMPLATE';
export const GET_TEMPLATE_NAMES = 'GET_TEMPLATE_NAMES';
export const GET_TEMPLATE_CONTENT_MARKDOWN = 'GET_TEMPLATE_CONTENT_MARKDOWN';
export const GET_TEMPLATE_CONTENT_HTML = 'GET_TEMPLATE_CONTENT_HTML';
export const UPDATE_EDITOR_CONTENT = 'UPDATE_EDITOR_CONTENT';
export const CLEAR_EDITOR_AND_PREVIEW = 'CLEAR_EDITOR_AND_PREVIEW';
export const GET_PDF = 'GET_PDF';
export const SET_PDF_CONTENT = 'SET_PDF_CONTENT';


export const selectedTemplate = (selected) => dispatch => {
    dispatch({
        type: SELECTED_TEMPLATE,
        payload: selected
    });
    if(selected===""){
        dispatch(clearEditorAndPreview());
    } else { 
        dispatch(getTemplateContentInMarkdown(selected));
        dispatch(getTemplateContentInHTML(selected));
        dispatch(getPDF(selected))
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

export const updateTemplateContent = (name, interleavingFields, markdownContent, format) => dispatch => {
    return axios.put(
        PUT_TEMPLATE,
        letterGenJson(name, interleavingFields, markdownContent, format),
        {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            if(res.headers['content-type'] === 'application/pdf'){
                let blob = new window.Blob([data], { type: 'application/pdf' });
                dispatch({
                    type: SET_PDF_CONTENT,
                    payload: window.URL.createObjectURL(blob)
                })
            }
            else if(res.headers['content-type'] === 'text/plain'){
                dispatch({
                    type: GET_TEMPLATE_CONTENT_HTML,
                    payload: res.data
                })
            }
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

export const getPDF = (name) => dispatch => {
    return axios.get('maler/pdf/' + name, {
        responseType: 'blob',
        transformResponse: [function (data) {
            let blob = new window.Blob([data], { type: 'application/pdf' });
            dispatch(setPDFContent(window.URL.createObjectURL(blob))); 
        }]
    })
};

export const setPDFContent = (content) => dispatch => {
    dispatch({
        type: SET_PDF_CONTENT,
        payload: content
    })
};

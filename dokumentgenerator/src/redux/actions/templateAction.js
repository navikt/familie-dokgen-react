import axios from 'axios';
import requestDataFormats from "../../API/requestDataFormats";
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
        dispatch(getTemplateContentInHTML(selected, {}));
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

export const getTemplateContentInHTML = (name, interleavingFields, markdownContent="", format="html") => dispatch => {
    axios.post(
        POST_LETTER,
        requestDataFormats.letterGenJsonParams(name, interleavingFields, markdownContent, format),
        requestDataFormats.letterGenJsonHeaders(format)
    )
        .then(res => {
            dispatch({
                type: GET_TEMPLATE_CONTENT_HTML,
                payload: res.data
            })
        });
};

export const updateTemplateContent = (name, interleavingFields, markdownContent, format="html") => dispatch => {
    return axios.put(
        PUT_TEMPLATE,
        requestDataFormats.letterGenJsonParams(name, interleavingFields, markdownContent, format),
        requestDataFormats.letterGenJsonHeaders(format)
    )
        .then(res => {
            if(res.headers['content-type'] === 'application/pdf'){
                dispatch({
                    type: SET_PDF_CONTENT,
                    payload: window.URL.createObjectURL(res.data)
                })
            }
            else if(res.headers['content-type'] === 'text/html; charset=utf-8'){
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

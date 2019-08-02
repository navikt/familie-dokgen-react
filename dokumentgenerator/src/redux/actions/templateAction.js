import axios from 'axios';
import requestDataFormats from "../../API/requestDataFormats";
import {GET_ALL_TEMPLATE_NAMES, GET_TEMPLATE, POST_TEMPLATE, PUT_TEMPLATE, TEST_SET} from "../../API/url";

export const SELECTED_TEMPLATE = 'SELECTED_TEMPLATE';
export const FORMAT_CHANGE = 'FORMAT_CHANGE';
export const GET_TEMPLATE_NAMES = 'GET_TEMPLATE_NAMES';
export const GET_TEMPLATE_CONTENT_MARKDOWN = 'GET_TEMPLATE_CONTENT_MARKDOWN';
export const GET_TEMPLATE_CONTENT_HTML = 'GET_TEMPLATE_CONTENT_HTML';
export const UPDATE_EDITOR_CONTENT = 'UPDATE_EDITOR_CONTENT';
export const CLEAR_EDITOR_AND_PREVIEW = 'CLEAR_EDITOR_AND_PREVIEW';
export const GET_PDF = 'GET_PDF';
export const SET_PDF_CONTENT = 'SET_PDF_CONTENT';
export const GET_TEST_DATA_NAMES = 'GET_TEST_SET_NAMES';
export const ADD_TEST_DATA_NAME = 'ADD_TEST_DATA_NAME';
export const SET_SELECTED_TEST_DATA = 'SET_SELECTED_TEST_DATA';
export const GET_EMPTY_TEST_SET = 'GET_EMPTY_TEST_SET';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';


export const selectedTemplate = (selected, format) => dispatch => {
    dispatch({
        type: SELECTED_TEMPLATE,
        payload: selected
    });
    if(selected===""){
        dispatch(clearEditorAndPreview());
    } else {
        dispatch(getTemplateContentInMarkdown(selected));
        dispatch(getTestDataNames(selected, format));
        dispatch(getEmptyTestSet(selected));
    }
};

export const updatePreviewFormat = (format) => dispatch => {
    dispatch({
        type: FORMAT_CHANGE,
        payload: format
    })
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
    axios.get(`${GET_TEMPLATE}${name}`).then(res =>
        dispatch({
            type: GET_TEMPLATE_CONTENT_MARKDOWN,
            payload: res.data
        })
    );
};

export const getTemplateContentInHTML = (name, testSetName, markdownContent="", format="html") => dispatch => {
    return axios.post(
        `${POST_TEMPLATE}${format}/${name}`,
        requestDataFormats.letterGenJsonParamsTestset(testSetName, markdownContent),
        requestDataFormats.letterGenJsonHeaders(format)
    )
        .then(res => {
            if(res.headers['content-type'] === 'application/pdf'){
                dispatch({
                    type: SET_PDF_CONTENT,
                    payload: window.URL.createObjectURL(res.data)
                })
            }
            else if(res.headers['content-type'] === 'text/html'){
                dispatch({
                    type: GET_TEMPLATE_CONTENT_HTML,
                    payload: res.data
                })
            }
        });
};

export const updateTemplateContent = (name, testSetName, markdownContent, format="html") => dispatch => {
    return axios.put(
        `${PUT_TEMPLATE}${format}/${name}`,
        requestDataFormats.letterGenJsonParamsTestset(testSetName, markdownContent),
        requestDataFormats.letterGenJsonHeaders(format)
    )
        .then(res => {
            if(res.headers['content-type'] === 'application/pdf'){
                dispatch({
                    type: SET_PDF_CONTENT,
                    payload: window.URL.createObjectURL(res.data)
                })
            }
            else if(res.headers['content-type'] === 'text/html'){
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

export const getTestDataNames = (name, format) => dispatch => {
    axios.get(TEST_SET + name + "/testdata").then(res => {
        dispatch({
            type: GET_TEST_DATA_NAMES,
            payload: res.data
        });
        dispatch(getTemplateContentInHTML(name, res.data[0], "", format))
    }
    )
};

export const setSelectedTestData = (testDataName) => dispatch => {
    dispatch({
        type: SET_SELECTED_TEST_DATA,
        payload: testDataName
    })
};

export const getEmptyTestSet = (templateName) => dispatch => {
    axios.get(TEST_SET + templateName + "/tomtTestSett").then(res => {
        dispatch({
            type: GET_EMPTY_TEST_SET,
            payload: res.data
        })
    })
};

export const saveNewTestSet = (templateName, content, name) => dispatch => {
    axios.post(
        TEST_SET + templateName + "/nyttTestSett",
        {
            content : JSON.parse(content),
            name : name
        },
        {
            headers: {'Content-Type': 'application/json'}
        }
    ).then(res => {
            dispatch({
                type: ADD_TEST_DATA_NAME,
                payload: res.data
            });
    }).catch((error) => {
        const errorData = error.response.data;

        /*
        if(errorData["causingExceptions"]) {
            errorString = errorData["causingExceptions"]
                .map(obj => {
                    console.log(obj)
                    return Object.entries(obj)
                        .filter(key => {
                            //JSON.parse(key.);
                            console.log(key[0])
                            return key[0] === "message" || key[0] === "pointerToViolation"
                    })
                })
        }
        else {
            errorString = Object.entries(errorData)
                .filter(key => {
                    console.log(key)
                    return key === "message" || key === "pointerToViolation"
                })
        }*/

        const prettyString = JSON.stringify(errorData, undefined, 2);

        dispatch({
            type: VALIDATION_ERROR,
            payload: prettyString
        })
    })
};

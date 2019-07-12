import axios from 'axios';

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
    console.log("Henter HTML versjonen");
    axios.get("maler/html/" + name).then(res =>
        dispatch({
            type: GET_TEMPLATE_CONTENT_HTML,
            payload: res.data
        })
    );

};

export const updateTemplateContent = (name, content) => {
    return axios.post("maler/" + name, content, {
        headers: {'Content-Type': 'text/plain'}
    });
};

export const updateEditorContent = (content) => dispatch => {
    dispatch({
        type: UPDATE_EDITOR_CONTENT,
        payload: content
    });

}

export const clearEditorAndPreview = () => dispatch => {
    dispatch({
        type: CLEAR_EDITOR_AND_PREVIEW
    })
}

export const getPDF = (name) => dispatch => {
    return axios.get('maler/pdf/' + name, {
        responseType: 'blob',
        transformResponse: [function (data) {
            let blob = new window.Blob([data], { type: 'application/pdf' })
            dispatch(setPDFContent(window.URL.createObjectURL(blob))); 
        }]
    })
    }

export const setPDFContent = (content) => dispatch => {
    dispatch({
        type: SET_PDF_CONTENT,
        payload: content
    })
}


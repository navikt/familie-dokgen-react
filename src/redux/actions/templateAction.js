import axios from 'axios';
import requestDataFormats from '../../API/requestDataFormats';
import {BREV, MAL, TEMPLATE_LIST_URL} from '../../API/url';
import {FELLESMAL} from '../../AppConstants';
import {emptyTestDataFromSchema} from '../../utils/testdata';

export const ADD_TEST_DATA_NAME = 'ADD_TEST_DATA_NAME';
export const CLEAR_EDITOR_AND_PREVIEW = 'CLEAR_EDITOR_AND_PREVIEW';
export const FORMAT_CHANGE = 'FORMAT_CHANGE';
export const GET_EMPTY_TEST_SET = 'GET_EMPTY_TEST_SET';
export const GET_PDF = 'GET_PDF';
export const GET_TEMPLATE_CONTENT_HTML = 'GET_TEMPLATE_CONTENT_HTML';
export const GET_TEMPLATE_CONTENT_MARKDOWN = 'GET_TEMPLATE_CONTENT_MARKDOWN';
export const GET_TEMPLATES = 'GET_TEMPLATE_NAMES';
export const GET_TEST_DATA_NAMES = 'GET_TEST_SET_NAMES';
export const PREVIEW_ERROR = 'PREVIEW_ERROR';
export const SELECTED_TEMPLATE = 'SELECTED_TEMPLATE';
export const SET_AKTIV_TAB = 'SET_AKTIV_TAB';
export const SET_PDF_CONTENT = 'SET_PDF_CONTENT';
export const SET_SELECTED_TEST_DATA = 'SET_SELECTED_TEST_DATA';
export const UPDATE_EDITOR_CONTENT = 'UPDATE_EDITOR_CONTENT';

const hateoas = {
  links: {},
  get: (key) => {
    return hateoas.links[JSON.stringify(key)];
  },
  set: (key, link) => {
    hateoas.links[JSON.stringify(key)] = link;
  },
};

export const selectedTemplate = (selectedTemplate, selectedFormat) => dispatch => {
  dispatch({
    type: SELECTED_TEMPLATE,
    payload: selectedTemplate,
  });
  dispatch(setAktivTab(0, selectedTemplate));
  if (selectedTemplate !== '') {
    dispatch(fetchTestDataList(selectedTemplate, selectedFormat));
    dispatch(fetchEmptyTestSet(selectedTemplate));
  }
};

export const setAktivTab = (tabNr, activeTemplate) => dispatch => {
  dispatch({
    type: SET_AKTIV_TAB,
    payload: tabNr,
  });
  if (tabNr === 1) {
    dispatch(fetchTemplateMarkdown(FELLESMAL));
  } else if (activeTemplate !== '') {
    dispatch(fetchTemplateMarkdown(activeTemplate));
  } else {
    dispatch(clearEditorAndPreview());
  }
};

export const fetchTemplates = () => dispatch => {
  axios.get(TEMPLATE_LIST_URL).then(res => {
    res.data.forEach(tpl => {
      tpl.links.forEach(link => {
        hateoas.set([tpl.name, link.rel], link.href);
      });
    });
    dispatch({
      type: GET_TEMPLATES,
      payload: res.data,
    });
  });
};

export const fetchTestDataList = (templateName, format) => dispatch => {
  axios.get(hateoas.get([templateName, 'testdatas'])).then(res => {
        res.data.forEach(tpl => {
          tpl.links.forEach(link => {
            hateoas.set([tpl.templateName, tpl.testDataName, link.rel], link.href);
          });
        });
        dispatch({
          type: GET_TEST_DATA_NAMES,
          payload: res.data,
        });
      },
  );
};

export const fetchEmptyTestSet = (templateName) => dispatch => {
  axios.get(hateoas.get([templateName, 'schema'])).then(res => {
    dispatch({
      type: GET_EMPTY_TEST_SET,
      payload: emptyTestDataFromSchema(res.data),
    });
  });
};

export const fetchTemplateMarkdown = (templateName) => dispatch => {
  axios.get(hateoas.get([templateName, 'self'])).then(res =>
      dispatch({
        type: GET_TEMPLATE_CONTENT_MARKDOWN,
        payload: res.data,
      }),
  );
};

export const getTemplatePreview = (templateName, testDataName, previewFormat) => dispatch => {
  const url = hateoas.get([templateName, testDataName, previewFormat]);
  if (url) {
    if (previewFormat === 'preview-pdf') {
      return dispatch({
        type: SET_PDF_CONTENT,
        payload: url,
      });
    } else {
      return axios.get(url).then(res => {
        dispatch({
          type: GET_TEMPLATE_CONTENT_HTML,
          payload: res.data,
        });
      }).catch((error) => {
        console.log(error);
        const errorData = error.response;
        const prettyString = JSON.stringify(errorData, undefined, 2);
        dispatch({
          type: PREVIEW_ERROR,
          payload: prettyString,
        });
      });
    }
  }
};

export const updateTemplateContent = (templateName, testDataName, previewFormat, markdownContent) => dispatch => {
  const url = hateoas.get([templateName, testDataName, previewFormat]);
  const responseType = previewFormat === 'preview-pdf' ? 'blob' : 'text';
  return axios.post(url, markdownContent, {
    headers: {'Content-Type': 'text/plain'},
    responseType: responseType,
  }).then(res => {
    if (previewFormat === 'preview-pdf') {
      dispatch({
        type: SET_PDF_CONTENT,
        payload: new Blob([res.data], {type: 'application/pdf'}),
      });
    } else if (previewFormat === 'preview-html') {
      dispatch({
        type: GET_TEMPLATE_CONTENT_HTML,
        payload: res.data,
      });
    }
  }).catch((error) => {
    if (error.response) {
      const errorData = error.response.data;
      const prettyString = JSON.stringify(errorData, undefined, 2);
      dispatch({
        type: PREVIEW_ERROR,
        payload: prettyString,
      });
    } else {
      dispatch({
        type: PREVIEW_ERROR,
        payload: JSON.stringify(error.message),
      });
    }

  });
};

export const downloadPdf = (malNavn, testSetNavn) => dispatch => {
  return axios.post(`${BREV}${malNavn}/download`,
      requestDataFormats.letterDownloadPdfParamsTestset(testSetNavn, true),
      requestDataFormats.letterGenJsonHeaders('pdf'),
  ).then(res => {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(res.data);
    a.download = `${malNavn}_${testSetNavn}.pdf`;
    a.click();
  }).catch(error => {
    dispatch({
      type: PREVIEW_ERROR,
      payload: error.message,
    });
  });
};
export const upsertTestData = (malNavn, content, name) => dispatch => {
  axios.post(`${MAL}${malNavn}/nyttTestSett`,
      {
        content: JSON.parse(content),
        name: name,
      },
      {
        headers: {'Content-Type': 'application/json'},
      },
  ).then(res => {
    dispatch({
      type: ADD_TEST_DATA_NAME,
      payload: res.data,
    });
  }).catch((error) => {
    const errorData = error.response.data;
    const prettyString = JSON.stringify(errorData, undefined, 2);
    dispatch({
      type: PREVIEW_ERROR,
      payload: prettyString,
    });
  });
};

export const setEditorContent = (content) => dispatch => {
  dispatch({
    type: UPDATE_EDITOR_CONTENT,
    payload: content,
  });

};

export const clearEditorAndPreview = () => dispatch => {
  dispatch({
    type: CLEAR_EDITOR_AND_PREVIEW,
  });
};

export const setSelectedTestData = (testDataName) => dispatch => {
  dispatch({
    type: SET_SELECTED_TEST_DATA,
    payload: testDataName,
  });
};

export const setPreviewFormat = (format) => dispatch => {
  dispatch({
    type: FORMAT_CHANGE,
    payload: format,
  });
};



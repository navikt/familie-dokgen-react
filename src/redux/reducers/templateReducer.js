import {
    ADD_TEST_DATA_NAME,
    CLEAR_EDITOR_AND_PREVIEW,
    FORMAT_CHANGE,
    GET_EMPTY_TEST_SET,
    GET_PDF,
    GET_TEMPLATE_CONTENT_HTML,
    GET_TEMPLATE_CONTENT_MARKDOWN,
    GET_TEMPLATES,
    GET_TEST_DATA_NAMES,
    PREVIEW_ERROR,
    SELECTED_TEMPLATE,
    SET_AKTIV_TAB,
    SET_PDF_CONTENT,
    SET_SELECTED_TEST_DATA,
    UPDATE_EDITOR_CONTENT,
} from '../actions/templateAction';

const initialState = {
  aktivTab: 0,
  editorContent: '',
  emptyTestSet: '',
  errorContent: null,
  pdfContent: null,
  previewContent: '',
  previewFormat: 'preview-html',
  readOnly: true,
  selectedTemplate: '',
  selectedTestData: '',
  templateIsSelected: false,
  templates: [],
  testDataList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_TEMPLATE:
      return {
        ...state,
        selectedTemplate: action.payload,
        readOnly: false,
      };
    case FORMAT_CHANGE:
      return {
        ...state,
        previewFormat: action.payload,
      };
    case GET_TEMPLATES:
      return {
        ...state,
        templates: action.payload,
      };
    case GET_TEMPLATE_CONTENT_MARKDOWN:
      return {
        ...state,
        editorContent: action.payload,
        templateIsSelected: true,
      };
    case GET_TEMPLATE_CONTENT_HTML:
      return {
        ...state,
        previewContent: action.payload,
        errorContent: null,
      };
    case UPDATE_EDITOR_CONTENT:
      return {
        ...state,
        editorContent: action.payload,
      };
    case CLEAR_EDITOR_AND_PREVIEW:
      return {
        ...state,
        editorContent: '',
        previewContent: '',
        pdfArray: null,
        pdfContent: '',
        readOnly: true,
        templateIsSelected: false,
        emptyTestSet: '',
        selectedTestData: '',
        errorContent: null,
      };
    case GET_PDF:
      return {
        ...state,
        pdfArray: action.payload,
      };
    case SET_PDF_CONTENT:
      return {
        ...state,
        pdfContent: action.payload,
        errorContent: null,
      };
    case GET_TEST_DATA_NAMES:
      console.log(GET_TEST_DATA_NAMES,action);
      return {
        ...state,
        testDataList: action.payload,
        selectedTestData: action.payload[0].testDataName,
      };
    case ADD_TEST_DATA_NAME:
      console.log(ADD_TEST_DATA_NAME,action);
      const appendedList = state.testDataList.concat(action.payload);
      return {
        ...state,
        testDataList: appendedList,
        selectedTestData: action.payload[0],
      };
    case SET_SELECTED_TEST_DATA:
      console.log(SET_SELECTED_TEST_DATA,action);
      return {
        ...state,
        selectedTestData: action.payload,
      };
    case GET_EMPTY_TEST_SET:
      return {
        ...state,
        emptyTestSet: action.payload,
      };
    case PREVIEW_ERROR:
      return {
        ...state,
        errorContent: action.payload,
      };
    case SET_AKTIV_TAB:
      return {
        ...state,
        aktivTab: action.payload,
        readOnly: action.payload === 1,
      };
    default:
      return state;
  }
}

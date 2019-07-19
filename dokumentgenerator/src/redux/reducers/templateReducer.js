import {
    SELECTED_TEMPLATE,
    GET_TEMPLATE_NAMES,
    GET_TEMPLATE_CONTENT_MARKDOWN,
    GET_TEMPLATE_CONTENT_HTML,
    UPDATE_EDITOR_CONTENT,
    CLEAR_EDITOR_AND_PREVIEW,
    GET_PDF,
    SET_PDF_CONTENT,
    FORMAT_CHANGE,
    GET_TEST_DATA_NAMES,
    SET_SELECTED_TEST_DATA

} from "../actions/templateAction";

const initialState = { 
    selectedTemplate : "",
    templateIsSelected: false,
    templateNames : [],
    editorContent : "",
    previewContent : "",
    readOnly: true,
    pdfContent : null,
    previewFormat : "html",
    testDataNames : [],
    selectedTestData : ""
};

export default (state = initialState, action) => {
    switch (action.type) {
     case SELECTED_TEMPLATE:
      return {
        ...state, 
       selectedTemplate: action.payload,
       readOnly: false
      };
    case FORMAT_CHANGE:
        return {
            ...state,
            previewFormat: action.payload
        };
    case GET_TEMPLATE_NAMES:
        return {
            ...state,
            templateNames: action.payload
        };
    case GET_TEMPLATE_CONTENT_MARKDOWN:
      return {
          ...state,
          editorContent: action.payload,
          templateIsSelected: true
      };
    case GET_TEMPLATE_CONTENT_HTML:
        return {
            ...state,
            previewContent: action.payload
        };
    case UPDATE_EDITOR_CONTENT:
        return {
            ...state,
            editorContent: action.payload
        };
    case CLEAR_EDITOR_AND_PREVIEW:
        return {
            ...state,
            editorContent : "",
            previewContent: "",
            pdfArray : null,
            pdfContent : "",
            readOnly: true,
            templateIsSelected : false
        }
    case GET_PDF:
        return {
            ...state,
            pdfArray: action.payload
        }
    case SET_PDF_CONTENT: 
        return {
            ...state,
            pdfContent : action.payload

        }
    case GET_TEST_DATA_NAMES: 
    return {
        ...state,
        testDataNames : action.payload,
        selectedTestData : action.payload[0]
    }
    case SET_SELECTED_TEST_DATA:
        return {
            ...state,
            selectedTestData : action.payload
        }
     default:
      return state
    }
   }

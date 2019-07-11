import {
    SELECTED_TEMPLATE,
    GET_TEMPLATE_NAMES,
    GET_TEMPLATE_CONTENT_MARKDOWN,
    GET_TEMPLATE_CONTENT_HTML,
    UPDATE_EDITOR_CONTENT,
    CLEAR_EDITOR_AND_PREVIEW,
    UPDATE_PREVIEW_URL
} from "../actions/templateAction";

const initialState = { 
    selectedTemplate : "",
    templateNames : [],
    editorContent : "",
    previewContent : "",
    readOnly: true,
    previewURL: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
     case SELECTED_TEMPLATE:
      return {
        ...state, 
       selectedTemplate: action.payload,
       readOnly: false
      };
    case GET_TEMPLATE_NAMES:
        return {
            ...state,
            templateNames: action.payload
        };
    case GET_TEMPLATE_CONTENT_MARKDOWN:
      return {
          ...state,
          editorContent: action.payload
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
            previewURL: "",
            readOnly: true
        }
    case UPDATE_PREVIEW_URL:
        return {
            ...state, 
            previewURL: "http://localhost:8080/maler/html/" + action.payload
        }
     default:
      return state
    }
   }
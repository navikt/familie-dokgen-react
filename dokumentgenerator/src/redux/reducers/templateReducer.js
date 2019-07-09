import {
    SELECTED_TEMPLATE,
    GET_TEMPLATE_NAMES,
    GET_TEMPLATE_CONTENT_MARKDOWN,
    GET_TEMPLATE_CONTENT_HTML,
    UPDATE_EDITOR_CONTENT
} from "../actions/templateAction";

const initialState = { 
    selectedTemplate : "",
    templateNames : [],
    editorContent : "",
    previewContent : ""
}

export default (state = initialState, action) => {
    switch (action.type) {
     case SELECTED_TEMPLATE:
      return {
        ...state, 
       selectedTemplate: action.payload
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
     default:
      return state
    }
   }
import { SET_TEMPLATE_TYPE, GET_TEMPLATE_NAMES, GET_TEMPLATE_CONTENT_MARKDOWN, GET_TEMPLATE_CONTENT_HTML } from "../actions/templateAction";

const initialState = { 
    selectedTemplate : "",
    templateNames : [],
    editorContent : "",
    previewContent : ""
}

export default (state = initialState, action) => {
    switch (action.type) {
     case SET_TEMPLATE_TYPE:
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
     default:
      return state
    }
   }
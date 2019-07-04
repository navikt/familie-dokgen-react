import { SET_TEMPLATE_TYPE, GET_TEMPLATE_NAMES, GET_TEMPLATE_CONTENT } from "../actions/templateAction";

const initialState = { 
    selectedTemplate : "",
    templateNames : [],
    templateContent : ""
}

export default (state = initialState, action) => {
    switch (action.type) {
     case SET_TEMPLATE_TYPE:
      return {
        ...state, 
       selectedTemplate: action.payload
      }
    case GET_TEMPLATE_NAMES:
        return {
            ...state,
            templateNames: action.payload
        }
    case GET_TEMPLATE_CONTENT:
      return {
          ...state,
          templateContent: action.payload
      }
     default:
      return state
    }
   }
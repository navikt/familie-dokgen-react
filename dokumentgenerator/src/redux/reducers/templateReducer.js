import { SET_TEMPLATE_TYPE, GET_TEMPLATE_NAMES } from "../actions/templateAction";

const initialState = { 
    selectedTemplate : "",
    templateNames : []
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
     default:
      return state
    }
   }
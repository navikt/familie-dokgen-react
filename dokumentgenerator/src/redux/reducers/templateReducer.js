import { SET_TEMPLATE_TYPE } from "../actions/templateAction";

const initialState = { 
    selectedTemplate : ""
}

export default (state = initialState, action) => {
    switch (action.type) {
     case SET_TEMPLATE_TYPE:
      return {
        ...state, 
       selectedTemplate: action.payload
      }
     default:
      return state
    }
   }
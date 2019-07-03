export const SET_TEMPLATE_TYPE = 'SET_TEMPLATE_TYPE';

export const setTemplateType = (selected) => dispatch => {
    dispatch({
     type: SET_TEMPLATE_TYPE,
     payload: selected
    })
   }
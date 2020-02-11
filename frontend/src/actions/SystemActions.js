export function loading() {
  return { type: 'LOADING_START' }
}
export function doneLoading() {
  return { type: 'LOADING_DONE' }
}


export function updateRoute(route) {
  return async (dispatch) => {
    try {      
     await dispatch(_updateRoute(route))
    }
    catch (err) {
      console.log('update route action err:',err)
      throw err;
    }

  }
}
function _updateRoute(route) {
  return {
    type: 'UPDATE_ROUTE',
    route
  };
}
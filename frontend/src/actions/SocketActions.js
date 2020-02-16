export function initSocket(socket) {
    return async (dispatch) => {
        try {      
         await dispatch({ type: 'INIT_SOCKET',socket })
        }
        catch (err) {
          console.log('initSocket action err:',err)
          throw err;
        }
    
      }
}
export function removeSocket() {
    return async (dispatch) => {
        try {      
         await dispatch({type: 'REMOVE_SOCKET'})
        }
        catch (err) {
          console.log('initSocket action err:',err)
          throw err;
        }
    
      }
}

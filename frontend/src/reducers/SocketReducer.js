const initialState = {
    socket: null,
};

export default function (state = initialState, action = {}) {
    var retObj;
    switch (action.type) {
        case 'INIT_SOCKET':
            retObj = { ...state, socket: action.socket };
            console.log('new state socket reducer: ', retObj)
            return retObj
        case 'REMOVE_SOCKET':
            retObj = { ...state, socket: null };
            console.log('new state socket reducer: ', retObj)
            return retObj
        default: return state;
    }
}

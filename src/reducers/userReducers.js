const GET_REALTIME_USERS_REQUEST= 'GET_REALTIME_USERS_REQUEST',
GET_REALTIME_USERS_SUCCESS='GET_REALTIME_USERS_SUCCESS',
GET_REALTIME_MESSAGES='GET_REALTIME_MESSAGES',
GET_REALTIME_MESSAGES_FAILURE='GET_REALTIME_MESSAGES_FAILURE';

const intiState = {
    users: [],
    conversations: []
}

const userReducers= (state = intiState, action) => {

    switch(action.type){
        case GET_REALTIME_USERS_REQUEST:
            return state;
        case GET_REALTIME_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload.users
            }
        case GET_REALTIME_MESSAGES:
            return {
                ...state,
                conversations: action.payload.conversations
            }
        case GET_REALTIME_MESSAGES_FAILURE:
            return {
                ...state,
                conversations: []
            }
            default: return state;
        
    }
        

   

}

export default userReducers
import firebase from 'firebase';

const GET_REALTIME_USERS_REQUEST= 'GET_REALTIME_USERS_REQUEST',
GET_REALTIME_USERS_SUCCESS='GET_REALTIME_USERS_SUCCESS',
GET_REALTIME_MESSAGES='GET_REALTIME_MESSAGES',
GET_REALTIME_MESSAGES_FAILURE='GET_REALTIME_MESSAGES_FAILURE';

export const getRealtimeUsers = (uid) => {
    return async (dispatch) => {
        dispatch({ type: GET_REALTIME_USERS_REQUEST });
        const db = firebase.firestore()
        const unsubscribe = db.collection("users")
        .onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.forEach(function(doc) {
                if(doc.data().uid !==uid){   
                     users.push(doc.data());
                }
            });
            //console.log(users);
            dispatch({ 
                type: GET_REALTIME_USERS_SUCCESS,
                payload: { users }
            });

        });
        return unsubscribe;
    }
    }
  

export const updateMessage = (msgObj) => {
    return async dispatch => {
        const db = firebase.firestore();
        db.collection('conversations')
        .add({
            ...msgObj,
            isView: false,
            createdAt: new Date()
        })
        .then((data) => {
            // console.log(data)
            //success
        })
        .catch(error => {
            console.log(error)
        });

    }
}

export const getRealtimeConversations = (user) => {
    return async dispatch => {

        const db = firebase.firestore();
        db.collection('conversations')
        .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
        .orderBy('createdAt', 'asc')
        .onSnapshot((querySnapshot) => {

            const conversations = [];

            querySnapshot.forEach(doc => {

                if(
                    (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
                    || 
                    (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
                ){
                    conversations.push(doc.data())
                }

                if(conversations.length > 0){
                    dispatch({
                        type: GET_REALTIME_MESSAGES,
                        payload: { conversations }
                    })
        
                }else{
                    dispatch({
                        type:GET_REALTIME_MESSAGES_FAILURE,
                        payload: { conversations }
                    })
                }



                
            });
        })
    }
}
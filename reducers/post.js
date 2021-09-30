export const initialState = {
    posts: [],
    postDetail: null,
    loading: false,
}

/* Redux Actions */
// 상수로 설정, 오류 발생 시 찾기가 편함
export const GET_POST_REQUEST = "GET_POST_REQUEST";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAIL = "GET_POST_FAIL";

export const GET_POST = () => {
    return{
        type: GET_POST_REQUEST,
    }
}

export const GET_POST_DETAIL_REQUEST = "GET_POST_DETAIL_REQUEST";
export const GET_POST_DETAIL_SUCCESS = "GET_POST_DETAIL_SUCCESS";
export const GET_POST_DETAIL_FAIL = "GET_POST_DETAIL_FAIL";

export const GET_POST_DETAIL = data => {
    return{
        type: GET_POST_DETAIL_REQUEST,
        data,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POST_REQUEST:
            console.log('P REQUEST');
            return{
                ...state,
                loading: true,
            }
        case GET_POST_SUCCESS:
            console.log('P SUCCESS');
            return{
                ...state,
                posts:[...state.posts, ...action.data],
                loading: false,
            }
        case GET_POST_FAIL:
            console.log('P FAIL');
            return{
                ...state,
                loading: false,
            }
        case GET_POST_DETAIL_REQUEST:
            console.log('P D REQUEST');
            return{
                ...state,
                loading: true,
            }
        case GET_POST_DETAIL_SUCCESS:
            console.log('P D SUCCESS');
            return{
                ...state,
                postDetail: action.data,
                loading: false,
            }
        case GET_POST_DETAIL_FAIL:
            console.log('P D FAIL');
            return{
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

export default reducer;
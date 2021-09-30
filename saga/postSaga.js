import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
    GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAIL,
    GET_POST_DETAIL_REQUEST, GET_POST_DETAIL_SUCCESS, GET_POST_DETAIL_FAIL,
} from '../reducers/post';

           // if                            // else
// let BaseURL = process.env.NODE_ENV.backURL || 'http://localhost:3001';
let BaseURL = process.env.NODE_ENV.backURL || 'https://jsonplaceholder.typicode.com';

async function getPostAPI(data = ""){
    const response = await axios.get(`${BaseURL}/posts/${data}`);
    return response;
}

function* getPosts(){
    // API 통신, Web Server와 통신을 하게 됨
    try{
        const { data } = yield call(getPostAPI);
        // console.log('postSaga..s data : ', data);
        yield put({
            type: GET_POST_SUCCESS,
            data,
        })
    } catch (e){
        yield put({
            type: GET_POST_FAIL,
            data: 'ERROR',
        })
    }
}

function* getPostDetail(action){
    try{
        const { data } = yield call(getPostAPI, action.data);
        yield put({
            type: GET_POST_DETAIL_SUCCESS,
            data,
        })
    } catch (e){
        yield put({
            type: GET_POST_DETAIL_FAIL,
            data: 'ERROR',
        })
    }
}

function* watchPosts(){
    // takeLatest == 마지막에 대한 요청만 보내는
    yield takeLatest(GET_POST_REQUEST, getPosts);

    // 위 아래 같은 코드
    // if (actionChannel.type == "GET_POST_REQUEST"){
    //     getPosts()
    // }
}

function* watchPostDetail(){
    yield takeLatest(GET_POST_DETAIL_REQUEST, getPostDetail);
}

export default function * postSaga(){
    yield all([
        fork(watchPosts), // 안의 인자값(함수)를 실행시키는 역할
        fork(watchPostDetail),
    ]);
}
import { all, fork } from 'redux-saga/effects';
import postSaga from './postSaga';

export default function* rootSaga(){
    yield all([
        fork(postSaga) // 안의 인자값(함수)를 실행시키는 역할
    ])
}
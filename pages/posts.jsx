import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import Link from 'next/link';

import wrapper from "../Providers/createCtx";
import { GET_POST } from "../reducers/post";


const posts = () => {
    const dispatch = useDispatch();
    const {posts} = useSelector(state => state.post);

    const postLink = posts.map((v,k) => {
        return(
            <li key={k}>
                {/* <h2><Link href="/posts/[id]" as={`/posts/${v.id}`}><a>{v.title}</a></Link></h2> */}
                <h2><Link href={`/posts/${v.id}`}><a>{v.title}</a></Link></h2>
                <span>{v.body}</span>
            </li>
        )
    })

    useEffect(() => {
        function scrollFn(){
            // console.log('scroll check');
            // console.log('scrollY : ', window.scrollY);                         // 스크롤의 위치
            // console.log('cHeight : ', document.documentElement.clientHeight);  // 보이는 높이
            // console.log('sHeight : ', document.documentElement.scrollHeight);  // 총 높이
            if ( (window.scrollY + document.documentElement.clientHeight) === document.documentElement.scrollHeight){
                // console.log('the end..');
                dispatch(GET_POST());
            }
        }
        window.addEventListener('scroll', scrollFn);
        return () => {
            window.removeEventListener('scroll', scrollFn);
        }
    }, [])

    return(
        <>
            <h1>Posts ({posts.length})</h1>
            <ul>
                {postLink}
            </ul>
        </>
    )
}

// useEffect 같은 느낌이지만 사용 방법이 다름
export const getServerSideProps = wrapper.getServerSideProps( (Store) => async (req,res) => {
    // 1. dispatch로 API 요청을 보낸 후 상태를 변경
    Store.dispatch(GET_POST());
    Store.dispatch(END);
    await Store.sagaTask.toPromise();
});

export default posts;
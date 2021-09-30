import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Link from 'next/link';

import wrapper from '../../Providers/createCtx';
import { GET_POST_DETAIL } from '../../reducers/post';


const Post = () => {
    const { postDetail } = useSelector(state => state.post);

    return(
        <>
            <h3>{postDetail.title}</h3>
            <dl>
                <dt>{postDetail.userId}</dt>
                <dd>{postDetail.body}</dd>
            </dl>
            <Link href="/posts"><a>목록으로</a></Link>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps( (Store) => async (req,res) => {
    const { id } = req.params;
    // console.log('/post/id : ', id);
    Store.dispatch(GET_POST_DETAIL(id));
    Store.dispatch(END);
    await Store.sagaTask.toPromise();
});

export default Post;
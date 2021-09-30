import Link from 'next/link';
import styled from "styled-components";

const Gnb = styled.ul`
    display: flex;
    flex-direction: row;
    & > li {
        margin-left: 20px;
    }
`

const Navigation = () => {
    return(
        <Gnb>
            <li><Link href="/"><a>HOME</a></Link></li>
            <li><Link href="/posts"><a>POST</a></Link></li>
        </Gnb>
    )
}

export default Navigation;
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'

import AuthContext from '../store/authContext'

const Home = () => {
    const {userId} = useContext(AuthContext)

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('/posts')
        .then(res => {
            if (userId) {
                //@ts-ignore
                const otherUsersPosts = res.data.filter(post => userId !== post.userId)
                setPosts(otherUsersPosts)
            } else {
                setPosts(res.data)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, [userId])

    const mappedPosts = posts.map(post => {
        return (
            //@ts-ignore
            <div key={post.id} className='post-card'>
                {/*@ts-ignore */}
                <h2>{post.title}</h2>
                {/*@ts-ignore */}
                <h4>{post.user.username}</h4>
                {/*@ts-ignore */}
                <p>{post.content}</p>
            </div>
        )
    })

    return mappedPosts.length >= 1 ? (
        <main>
            {mappedPosts}
        </main>
    ) : (
        <main>
            <h1>There are no posts yet!</h1>
        </main>
    )
}

export default Home
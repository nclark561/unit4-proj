import {useContext, useEffect, useState, useCallback} from 'react'
import axios from 'axios'

import AuthContext from '../store/authContext'

const Profile = () => {
    const {userId, token} = useContext(AuthContext)

    const [posts, setPosts] = useState([])

    const getUserPosts = useCallback(() => {
        axios.get(`/userposts/${userId}`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
    }, [userId])

    useEffect(() => {
        getUserPosts()
    }, [getUserPosts])

    const updatePost = (id: number, status: boolean) => {
        axios.put(`/posts/${id}`, {status: !status}, {
            headers: {
                authorization: token
            }
        })
            .then(() => {
                getUserPosts()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deletePost = (id: number) => {
        axios.delete(`/posts/${id}`, {
            headers: {
                authorization: token
            }
        })
            .then(() => {
                getUserPosts()
            })
            .catch(err => {
                console.log(err)
            })
    }

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
                {
                    //@ts-ignore
                    userId === post.userId &&
                    <div>
                        {/*@ts-ignore */}
                        <button className='form-btn' onClick={() => updatePost(post.id, post.privateStatus)}>
                            {/*@ts-ignore */}
                            {post.privateStatus ? 'make public' : 'make private'}
                        </button>
                        {/*@ts-ignore */}
                        <button className='form-btn' style={{marginLeft: 10}} onClick={() => deletePost(post.id)}>
                            delete post
                        </button>
                    </div>
                }
            </div>
        )
    })

    return mappedPosts.length >= 1 ? (
        <main>
            {mappedPosts}
        </main>
    ) : (
        <main>
            <h1>You haven't posted yet!</h1>
        </main>
    )
}

export default Profile
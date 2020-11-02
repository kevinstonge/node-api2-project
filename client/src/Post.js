function Post({ post }) {
    return (<>
        {post ?
            (<div className="post" >
                <h2>{post.title}</h2>
                <p>{post.contents}</p>
            </div>) :
            (<p>no posts found</p>)
        }
    </>)
}
export default Post;
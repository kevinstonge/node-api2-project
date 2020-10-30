import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/api/posts").then(r=>setPosts(r.data))
  },[])
  return (
    <>
      {posts.map(post => <Post post={post} />)}
    </>
  );
}

export default App;

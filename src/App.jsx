import { useState } from "react";
import "./App.css";

const initialComments = [
  { id: 1, author: "Sara", text: "Great explanation of components!", likes: 5 },
  { id: 2, author: "Omar", text: "Props finally make sense to me.", likes: 2 },
  { id: 3, author: "Ali", text: "Can we do a lab on useState next week?", likes: 7 },
  { id: 4, author: "You", text: "Thanks for the lab, this was fun!", likes: 0 },
];

// Child component: receives everything it needs through props
function Comment({ author, text, likes, onLike }) {
  return (
    <div className="comment">
      <div className="avatar">{author[0].toUpperCase()}</div>
      <div className="bubble">
        <strong className="author">{author}</strong>
        <p className="text">{text}</p>
        <button className="like-btn" onClick={onLike}>
          <span className="heart">♥</span> {likes}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [comments, setComments] = useState(initialComments);
  const [draft, setDraft] = useState("");

  const handlePost = () => {
    const text = draft.trim();
    if (!text) return;
    const newComment = { id: Date.now(), author: "You", text, likes: 0 };
    setComments([...comments, newComment]); // new comments go at the bottom, like the screenshot
    setDraft("");
  };

  const handleLike = (id) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <div className="comments">
      <h2>Comments ({comments.length})</h2>

      <div className="composer">
        <input
          type="text"
          placeholder="Write a comment..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePost()}
        />
        <button className="post-btn" onClick={handlePost}>
          Post
        </button>
      </div>

      {comments.map((c) => (
        <Comment
          key={c.id}
          author={c.author}
          text={c.text}
          likes={c.likes}
          onLike={() => handleLike(c.id)}
        />
      ))}
    </div>
  );
}

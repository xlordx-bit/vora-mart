import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from '../assets/blogData';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="blog-not-found">
        <h2>Blog Post Not Found</h2>
        <button onClick={() => navigate('/blog')}>Back to Blog</button>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <button className="back-to-blog" onClick={() => navigate('/blog')}>
        ← Back to Blog
      </button>

      <article className="blog-post">
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <div className="author-info">
              <span className="author">{post.author}</span>
              <span className="date">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="post-category">{post.category}</div>
          </div>
        </header>

        <div className="post-image">
          <img src={post.image} alt={post.title} />
        </div>

        <div className="post-content">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <footer className="post-footer">
          <div className="tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          
          <div className="share-buttons">
            <button onClick={() => window.share?.()}>Share</button>
          </div>
        </footer>
      </article>

      <div className="related-posts">
        <h2>Related Posts</h2>
        <div className="related-grid">
          {blogPosts
            .filter(p => p.id !== post.id && p.category === post.category)
            .slice(0, 3)
            .map(relatedPost => (
              <div 
                key={relatedPost.id} 
                className="related-post-card"
                onClick={() => navigate(`/blog/${relatedPost.id}`)}
              >
                <img src={relatedPost.image} alt={relatedPost.title} />
                <h3>{relatedPost.title}</h3>
                <p>{relatedPost.summary}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

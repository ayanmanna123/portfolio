import React, { useContext } from "react";
import "./BlogCard.css";
import StyleContext from "../../contexts/StyleContext";

export default function BlogCard({ blog }) {
  const { isDark } = useContext(StyleContext);
  return (
    <div className="blog-container">
      <a className="blog-card" href={blog.url} target="_blank" rel="noopener noreferrer">
        <h3
          className={
            isDark
              ? "dark-mode blog-title"
              : "blog-title"
          }
        >
          {blog.title}
        </h3>
        <p
          className={
            isDark
              ? "dark-mode blog-subtitle"
              : "blog-subtitle"
          }
        >
          {blog.description}
        </p>
      </a>
    </div>
  );
}
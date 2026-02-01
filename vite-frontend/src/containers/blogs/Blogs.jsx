import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./Blog.css";
import BlogCard from "../../components/blogCard/BlogCard";
import { blogSection } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Blogs() {
  const { isDark } = useContext(StyleContext);
  if (!blogSection.display) {
    return null;
  }
  return (
    <div className="main" id="blog">
      <Fade bottom duration={1000} distance="20px">
        <div className="blog-heading-div">
          <h1
            className={
              isDark
                ? "dark-mode heading blog-title"
                : "heading blog-title"
            }
          >
            {blogSection.title}
          </h1>
          <p
            className={
              isDark
                ? "dark-mode blog-subtitle"
                : "blog-subtitle"
            }
          >
            {blogSection.subtitle}
          </p>
        </div>
        <div className="blog-main-div">
          <div className="blog-text-div">
            {blogSection.blogs.map((blog, i) => {
              return <BlogCard key={i} blog={blog} />;
            })}
          </div>
        </div>
      </Fade>
    </div>
  );
}
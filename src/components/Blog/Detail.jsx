import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaArrowLeft, FaTag, FaClock } from 'react-icons/fa';
import { fetchPosts } from '../../firebase';

// Safely normalize tags
const getTags = (post) => {
  if (!post.tags) return [];
  if (Array.isArray(post.tags)) return post.tags;
  if (typeof post.tags === 'string') return post.tags.split(',').map(t => t.trim()).filter(Boolean);
  return [];
};

// Dependency-free custom markdown parser to convert Markdown structures safely to React components
const renderMarkdown = (content) => {
  if (!content) return null;
  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeLines = [];
  let parsedComponents = [];
  let currentParagraph = [];

  const flushParagraph = (key) => {
    if (currentParagraph.length > 0) {
      parsedComponents.push(
        <p key={`p-${key}`} className="text-neutral-300 leading-relaxed text-sm sm:text-base mb-6 poppins-regular">
          {currentParagraph.join(' ')}
        </p>
      );
      currentParagraph = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End of block
        parsedComponents.push(
          <pre key={`code-${i}`} className="bg-neutral-900 border border-neutral-850 p-4 rounded-2xl overflow-x-auto my-6 text-xs sm:text-sm font-mono text-neutral-300">
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        // Start of block
        flushParagraph(i);
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(lines[i]); // Keep original formatting/spacing for code
      continue;
    }

    // Check headers
    if (line.startsWith('### ')) {
      flushParagraph(i);
      parsedComponents.push(
        <h3 key={`h3-${i}`} className="text-xl sm:text-2xl font-bold text-neutral-100 mt-8 mb-4 poppins-bold">
          {line.replace('### ', '')}
        </h3>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph(i);
      parsedComponents.push(
        <h2 key={`h2-${i}`} className="text-2xl sm:text-3xl font-bold text-neutral-100 mt-10 mb-4 poppins-bold">
          {line.replace('## ', '')}
        </h2>
      );
      continue;
    }

    // Check bullet lists
    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushParagraph(i);
      // We look ahead to gather consecutive list items
      let listItems = [];
      let j = i;
      while (j < lines.length && (lines[j].trim().startsWith('- ') || lines[j].trim().startsWith('* '))) {
        listItems.push(lines[j].trim().substring(2));
        j++;
      }
      i = j - 1; // Update outer loop index
      parsedComponents.push(
        <ul key={`ul-${i}`} className="list-disc pl-6 space-y-2 mb-6 text-neutral-300 text-sm sm:text-base poppins-regular">
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty lines represent paragraph breaks
    if (line === '') {
      flushParagraph(i);
      continue;
    }

    // Accumulate standard text lines
    currentParagraph.push(line);
  }

  flushParagraph(lines.length);
  return parsedComponents;
};

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPostData = async () => {
      try {
        const postsData = await fetchPosts();
        const found = postsData.find(p => p.slug === slug);
        setPost(found);
      } catch (err) {
        console.error("Error loading blog details:", err);
      } finally {
        setLoading(false);
      }
    };
    getPostData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-neutral-950 flex items-center justify-center">
        <div className="shimmer-bg h-12 w-12 rounded-full" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-neutral-950 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold text-neutral-100 mb-4">Post Not Found</h2>
        <p className="text-neutral-400 mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link to="/blog" className="btn-primary py-3 px-8 rounded-full font-semibold flex items-center gap-2">
          <FaArrowLeft size={14} />
          Back to Blog
        </Link>
      </div>
    );
  }

  // Calculate read time roughly
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-24 bg-neutral-950 relative overflow-hidden"
    >
      {/* Decorative Glows - REMOVED for clean monochrome */}

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        
        {/* Navigation Button */}
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-neutral-50 transition-colors mb-10 group"
        >
          <FaArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Articles
        </button>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-neutral-900">
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-500 mb-4">
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt size={12} />
              {post.date}
            </span>
            <span className="text-neutral-850">•</span>
            <span className="flex items-center gap-1.5">
              <FaClock size={12} />
              {readTime} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold poppins-bold text-neutral-50 leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {getTags(post).map((tag) => (
              <span 
                key={tag}
                className="flex items-center gap-1 bg-neutral-900 border border-neutral-850 text-neutral-300 text-xs px-3.5 py-1.5 rounded-full font-semibold poppins-medium"
              >
                <FaTag size={10} className="text-neutral-600" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none mb-16">
          {renderMarkdown(post.content)}
        </article>

        {/* Author box */}
        <div className="glass-panel rounded-2xl p-6 border border-neutral-900 flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-800">
            <img src={post.authorImage || "/aljasonch.png"} alt="Author" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-200 text-sm sm:text-base">Alfonsus Jason Christian</h4>
            <p className="text-xs text-neutral-500 mt-0.5">Software Engineering student specializing in full-stack applications and Odoo customizations.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;

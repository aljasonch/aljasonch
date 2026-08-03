import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaSearch, FaChevronRight } from 'react-icons/fa';
import { fetchPosts } from '../../firebase';

const BlogShimmer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2].map((n) => (
        <div key={n} className="glass-card rounded-[24px] overflow-hidden p-6 space-y-4 border border-neutral-900">
          <div className="shimmer-bg h-48 w-full rounded-xl" />
          <div className="shimmer-bg h-6 w-3/4 rounded" />
          <div className="shimmer-bg h-4 w-1/2 rounded" />
          <div className="shimmer-bg h-12 w-full rounded" />
          <div className="flex justify-between items-center pt-2">
            <div className="shimmer-bg h-8 w-24 rounded-full" />
            <div className="shimmer-bg h-5 w-20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Safely normalize tags — Firestore may store them as a string
const getTags = (post) => {
  if (!post.tags) return [];
  if (Array.isArray(post.tags)) return post.tags;
  if (typeof post.tags === 'string') return post.tags.split(',').map(t => t.trim()).filter(Boolean);
  return [];
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (err) {
        console.error("Error loading blog posts:", err);
      } finally {
        setLoading(false);
      }
    };
    getBlogData();
  }, []);

  // Filter logic
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || getTags(post).includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Extract all unique tags
  const allTags = ['All', ...new Set(posts.flatMap(post => getTags(post)))];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-24 bg-neutral-950 relative overflow-hidden"
    >
      {/* Background glow effects - REMOVED for clean monochrome */}

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold poppins-bold text-neutral-50 mb-4">
            Blog
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
            Thoughts, stories, and ideas — from tech and projects to life and everything in between.
          </p>
          <div className="w-16 h-[2px] bg-theme mx-auto mt-5 rounded-full" />
        </div>

        {/* Search & Tag Filter Grid */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-neutral-900">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold poppins-medium transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-theme text-white shadow-lg'
                    : 'text-neutral-400 hover:text-theme border border-transparent hover:border-theme'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-xs order-1 md:order-2">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-neutral-200 placeholder-neutral-500 pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Content list */}
        {loading ? (
          <BlogShimmer />
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-[24px] overflow-hidden flex flex-col h-full backdrop-blur-sm border border-neutral-900/80 p-6 hover:shadow-2xl group"
              >
                <div className="flex items-center gap-3 text-xs text-neutral-500 mb-4">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt size={12} className="text-neutral-600" />
                    {post.date}
                  </span>
                  <span className="text-neutral-850">•</span>
                  <div className="flex gap-1.5">
                    {getTags(post).slice(0, 2).map(tag => (
                      <span key={tag} className="text-neutral-400 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-neutral-50 mb-3 group-hover:text-neutral-100 transition-colors duration-300 leading-tight">
                  {post.title}
                </h2>

                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 flex-1 poppins-regular">
                  {post.excerpt}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-neutral-900">
                  <div className="flex flex-wrap gap-1.5">
                    {getTags(post).map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-neutral-400 text-[10px] px-2.5 py-1 rounded-md font-semibold">
                        <FaTag size={8} className="text-neutral-600" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-xs font-semibold text-neutral-300 hover:text-neutral-50 transition-colors duration-200"
                  >
                    Read More
                    <FaChevronRight size={9} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-neutral-500">
            {posts.length === 0 ? (
              <>
                <p className="text-lg mb-2">No articles published yet.</p>
                <p className="text-sm">Check back soon — new posts will appear here.</p>
              </>
            ) : (
              <>
                <p className="text-lg mb-2">No articles found.</p>
                <p className="text-sm">Try resetting your search query or tag selection filters.</p>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;

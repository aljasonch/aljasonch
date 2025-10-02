import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError('');
        const q = query(collection(db, 'blogPosts'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
            date: data.date?.toDate ? data.date.toDate() : data.date ? new Date(data.date) : null,
          };
        });
        setPosts(data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [posts, searchTerm]);

  return (
    <motion.section
      id="blog"
      className="pt-32 pb-20 section-gradient relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 right-16 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-16 left-16 w-40 h-40 bg-secondary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <motion.div className="text-center mb-2" variants={sectionVariants}>
          <motion.h1
            className="text-4xl md:text-5xl poppins-bold text-green-600 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Blog
          </motion.h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mt-8 rounded-full"></div>
          <div className="mt-6 flex justify-center">
            <div className="relative w-full max-w-sm shadow-md rounded-3xl">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-3 rounded-2xl border border-white/50 bg-white/60 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="border border-white/40 rounded-3xl p-4 md:p-10 flex flex-col gap-8"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="border-t border-white/20 pt-2 flex flex-col gap-6 min-h-[200px]">
            <div className="flex-1">
              {loading ? (
                <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl overflow-hidden border border-white/50 bg-gradient-to-b from-white to-neutral-100 shadow-lg p-0"
                      >
                        <Skeleton height={160} />
                        <div className="p-5">
                          <Skeleton width={120} height={16} />
                          <Skeleton className="mt-3" height={24} />
                          <Skeleton className="mt-3" count={3} />
                          <Skeleton className="mt-5" width={100} height={32} />
                        </div>
                      </div>
                    ))}
                  </div>
                </SkeletonTheme>
              ) : filteredPosts.length ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredPosts.map((article) => {
                    const truncatedExcerpt = article.excerpt && article.excerpt.length > 120
                      ? `${article.excerpt.slice(0, 117).trim()}...`
                      : article.excerpt;
                    const hasImage = Boolean(article.image);

                    return (
                      <motion.article
                        key={article.id}
                        className="rounded-2xl border border-white/60 bg-gradient-to-b from-white to-neutral-100 shadow-lg hover:shadow-2xl overflow-hidden flex flex-col h-full min-h-[360px] transition-transform duration-300 hover:-translate-y-1"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="h-40 w-full overflow-hidden bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-50">
                          {hasImage ? (
                            <img
                              src={article.image}
                              alt={article.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : null}
                        </div>
                        <div className="flex flex-col flex-1 px-5 pb-6 pt-6">
                          <div className="flex items-center gap-3 text-sm text-neutral-500 poppins-medium">
                            <span>
                              {article.date ? article.date.toLocaleDateString() : 'Unscheduled'}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                            <span>{article.readTime || '—'}</span>
                          </div>

                          <h2 className="mt-4 text-lg poppins-bold text-neutral-900 leading-tight">
                            {article.title}
                          </h2>

                          <p className="mt-3 text-neutral-600 text-sm text-justify poppins-regular flex-1 leading-relaxed">
                            {truncatedExcerpt}
                          </p>

                          <motion.div className="mt-6" whileHover={{ x: 4 }}>
                            <Link
                              to={`/blog/${article.slug}`}
                              className="inline-flex items-center gap-2 text-green-600 poppins-semibold hover:text-green-500 transition-colors"
                            >
                              Read Story
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </motion.div>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              ) : (
                <div className="rounded-2xl p-12 text-center text-neutral-500 poppins-medium bg-white/40 border border-white/30">
                  No blog posts match your filters.
                </div>
              )}
            </div>
            <p className="text-xs text-neutral-500 self-start">
              {loading
                ? 'Loading articles...'
                : `Showing ${filteredPosts.length} of ${posts.length} blogs`}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Blog;

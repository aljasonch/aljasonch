import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTrash, 
  FaEdit, 
  FaPlus, 
  FaSignOutAlt, 
  FaEye, 
  FaSave, 
  FaArrowLeft, 
  FaLock,
  FaFileAlt
} from 'react-icons/fa';
import {
  fetchPosts,
  savePost,
  deletePost,
  signInAdmin,
  signOutAdmin,
  subscribeToAuth,
  isAuthEnabled,
} from '../../firebase';

// Safely normalize tags
const getTags = (post) => {
  if (!post.tags) return [];
  if (Array.isArray(post.tags)) return post.tags;
  if (typeof post.tags === 'string') return post.tags.split(',').map(t => t.trim()).filter(Boolean);
  return [];
};

// Simple Markdown parser for Preview mode
const renderPreviewMarkdown = (content) => {
  if (!content) return <p className="text-neutral-500 italic">No content written yet...</p>;
  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeLines = [];
  let parsedComponents = [];
  let currentParagraph = [];

  const flushParagraph = (key) => {
    if (currentParagraph.length > 0) {
      parsedComponents.push(
        <p key={`p-${key}`} className="text-neutral-300 leading-relaxed text-sm mb-4 poppins-regular">
          {currentParagraph.join(' ')}
        </p>
      );
      currentParagraph = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        parsedComponents.push(
          <pre key={`code-${i}`} className="border border-neutral-850 p-4 rounded-xl overflow-x-auto my-4 text-xs font-mono text-neutral-300">
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        flushParagraph(i);
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(lines[i]);
      continue;
    }

    if (line.startsWith('### ')) {
      flushParagraph(i);
      parsedComponents.push(
        <h3 key={`h3-${i}`} className="text-lg font-bold text-neutral-100 mt-6 mb-3 poppins-bold">
          {line.replace('### ', '')}
        </h3>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph(i);
      parsedComponents.push(
        <h2 key={`h2-${i}`} className="text-xl font-bold text-neutral-100 mt-8 mb-3 poppins-bold">
          {line.replace('## ', '')}
        </h2>
      );
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushParagraph(i);
      let listItems = [];
      let j = i;
      while (j < lines.length && (lines[j].trim().startsWith('- ') || lines[j].trim().startsWith('* '))) {
        listItems.push(lines[j].trim().substring(2));
        j++;
      }
      i = j - 1;
      parsedComponents.push(
        <ul key={`ul-${i}`} className="list-disc pl-6 space-y-1 mb-4 text-neutral-300 text-sm poppins-regular">
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (line === '') {
      flushParagraph(i);
      continue;
    }

    currentParagraph.push(line);
  }

  flushParagraph(lines.length);
  return parsedComponents;
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Blog Form State
  const [formTitle, setFormTitle] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formMode, setFormMode] = useState('write'); // 'write' or 'preview'

  // Fetch blogs on load
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (err) {
        console.error("Error loading blog posts:", err);
      }
    };
    loadBlogData();
  }, []);

  // Track Firebase auth state — keeps the admin signed in across reloads.
  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setIsAuthenticated(!!user);
      setAuthReady(true);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isAuthEnabled()) {
      setError('Authentication is not configured. Add your Firebase credentials to the .env file.');
      return;
    }
    setIsSigningIn(true);
    setError('');
    try {
      await signInAdmin(email.trim(), password);
      // onAuthStateChanged will flip isAuthenticated.
    } catch (err) {
      const code = err?.code || '';
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setError('Incorrect email or password. Please try again.');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait a moment and try again.');
      } else {
        setError('Unable to sign in. Please try again.');
        console.error('Login failed:', err);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutAdmin();
    } catch (err) {
      console.error('Logout failed:', err);
    }
    setEmail('');
    setPassword('');
  };

  // Form Initializations
  const initCreateForm = () => {
    setIsCreating(true);
    setEditingPost(null);
    setFormTitle('');
    setFormExcerpt('');
    setFormContent('');
    setFormTags('React, Javascript');
    
    // Auto populate today's date formatted nicely
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setFormDate(today.toLocaleDateString('en-US', options));
    setFormSlug('');
    setFormMode('write');
  };

  const initEditForm = (post) => {
    setEditingPost(post);
    setIsCreating(false);
    setFormTitle(post.title);
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormTags(getTags(post).join(', '));
    setFormDate(post.date);
    setFormSlug(post.slug);
    setFormMode('write');
  };

  const cancelForm = () => {
    setEditingPost(null);
    setIsCreating(false);
  };

  // Auto-generate slug from title
  const handleTitleChange = (val) => {
    setFormTitle(val);
    if (!editingPost) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormSlug(generatedSlug);
    }
  };

  // Create or Update actions using Firebase
  const handleSavePost = async (e) => {
    e.preventDefault();
    if (!formTitle || !formContent || !formSlug) {
      alert('Title, Content, and Slug are required fields.');
      return;
    }

    const tagsArray = formTags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    // Check duplicate slug only on new post
    if (isCreating && posts.some(p => p.slug === formSlug)) {
      alert('An article with this slug already exists. Please choose a unique title or slug.');
      return;
    }

    const postData = {
      id: editingPost ? editingPost.id : (posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1),
      title: formTitle,
      excerpt: formExcerpt || formContent.slice(0, 120) + '...',
      content: formContent,
      tags: tagsArray,
      slug: formSlug,
      date: formDate
    };

    try {
      await savePost(postData);
      const updated = await fetchPosts();
      setPosts(updated);
      cancelForm();
    } catch (err) {
      console.error("Failed to save post:", err);
      alert("Error saving post to backend.");
    }
  };

  // Delete action using Firebase
  const handleDeletePost = async (post) => {
    if (window.confirm('Are you sure you want to permanently delete this blog post?')) {
      try {
        await deletePost(post);
        const updated = await fetchPosts();
        setPosts(updated);
      } catch (err) {
        console.error("Failed to delete post:", err);
        alert("Error deleting post from backend.");
      }
    }
  };

  // Wait for Firebase to report the current auth state before deciding what to show.
  if (!authReady) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="shimmer-bg h-12 w-12 rounded-full" />
      </div>
    );
  }

  // Render Login state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6 relative overflow-hidden">
        {/* Subtle dotted backdrop (solid dots, no gradient) */}
        <div className="absolute inset-0 dot-grid opacity-[0.3] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel border border-neutral-900 rounded-[28px] max-w-sm w-full p-8 relative z-10 text-center"
        >
          <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center text-neutral-100 mb-6">
            <FaLock size={20} />
          </div>

          <h2 className="text-2xl font-bold poppins-bold text-neutral-100 mb-2">Admin Dashboard</h2>
          <p className="text-neutral-400 text-xs sm:text-sm mb-6">Sign in with your admin account to manage blog posts.</p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs uppercase font-semibold text-neutral-500 tracking-wider block mb-2">
                Email
              </label>
              <input
                type="email"
                autoComplete="username"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-neutral-200 placeholder-neutral-600 px-4 py-3 rounded-xl focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="text-xs uppercase font-semibold text-neutral-500 tracking-wider block mb-2">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-neutral-200 placeholder-neutral-600 px-4 py-3 rounded-xl focus:outline-none transition-colors"
                required
              />
            </div>

            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full btn-primary py-3 rounded-xl font-bold mt-2 hover:shadow-lg transition-shadow flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSigningIn ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Render CRUD panels (Create/Edit mode)
  if (isCreating || editingPost) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-neutral-950 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-900 mb-8">
            <button
              onClick={cancelForm}
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-neutral-50 transition-colors"
            >
              <FaArrowLeft size={12} />
              Cancel Changes
            </button>
            <h2 className="text-xl font-bold text-neutral-100 poppins-bold">
              {isCreating ? 'Write New Post' : `Edit: ${editingPost.title}`}
            </h2>
          </div>

          <form onSubmit={handleSavePost} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Inputs Panel */}
            <div className="space-y-6">
              <div>
                <label className="text-xs uppercase font-semibold text-neutral-400 tracking-wider block mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Setting Up an Odoo Instance"
                  value={formTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full text-neutral-200 px-4 py-2.5 rounded-xl focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-semibold text-neutral-400 tracking-wider block mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full text-neutral-200 px-4 py-2.5 rounded-xl focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-semibold text-neutral-400 tracking-wider block mb-2">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    className="w-full text-neutral-200 px-4 py-2.5 rounded-xl focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-400 tracking-wider block mb-2">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Backend, Javascript"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  className="w-full text-neutral-200 px-4 py-2.5 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-semibold text-neutral-400 tracking-wider block mb-2">
                  Excerpt (Summary preview)
                </label>
                <textarea
                  rows="2"
                  placeholder="Brief summary of the article..."
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  className="w-full text-neutral-200 px-4 py-2.5 rounded-xl focus:outline-none resize-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
                    Content (Markdown)
                  </label>
                  <div className="flex gap-2 p-0.5 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setFormMode('write')}
                      className={`px-3 py-1 text-xs rounded-md font-semibold transition-all ${
                        formMode === 'write' ? 'bg-theme text-on-accent' : 'text-neutral-400 hover:text-neutral-250'
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormMode('preview')}
                      className={`px-3 py-1 text-xs rounded-md font-semibold transition-all ${
                        formMode === 'preview' ? 'bg-theme text-on-accent' : 'text-neutral-400 hover:text-neutral-250'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <FaEye size={10} />
                        Preview
                      </span>
                    </button>
                  </div>
                </div>

                {formMode === 'write' ? (
                  <textarea
                    rows="14"
                    placeholder="Write article details here using markdown tags..."
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="w-full text-neutral-200 px-4 py-3 rounded-xl focus:outline-none font-mono text-sm resize-y"
                    required
                  />
                ) : (
                  <div className="w-full h-[324px] rounded-xl px-4 py-3 overflow-y-auto text-left">
                    {renderPreviewMarkdown(formContent)}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="btn-secondary px-6 py-2.5 rounded-xl text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold"
                >
                  <FaSave size={14} />
                  Save Post
                </button>
              </div>
            </div>

            {/* Split Preview Panel (Desktop only visible) */}
            <div className="hidden lg:block backdrop-blur-sm rounded-[24px] p-8 overflow-y-auto max-h-[660px]">
              <div className="pb-4 border-b border-neutral-900 mb-6">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-widest block mb-2">
                  Live Page View
                </span>
                <h1 className="text-3xl font-bold text-neutral-50 poppins-bold leading-tight">
                  {formTitle || 'Untitled Article'}
                </h1>
                <p className="text-xs text-neutral-500 mt-2">
                  Date: {formDate} | Slug: {formSlug}
                </p>
              </div>
              <div className="prose prose-invert">
                {renderPreviewMarkdown(formContent)}
              </div>
            </div>

          </form>

        </div>
      </div>
    );
  }

  // Render Dashboard Home (Posts overview table)
  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-950 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900 mb-10">
          <div>
            <h1 className="text-3xl font-bold poppins-bold text-neutral-50">
              Admin Workspace
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Manage blog posts and publish updates.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={initCreateForm}
              className="btn-primary flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl text-sm"
            >
              <FaPlus size={12} />
              New Article
            </button>
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center gap-2 font-semibold px-4 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-neutral-250"
            >
              <FaSignOutAlt size={12} />
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Posts List */}
        {posts.length > 0 ? (
          <div className="glass-panel border border-neutral-900 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-900 text-xs uppercase font-bold text-neutral-500 tracking-wider">
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Tags</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-300">
                  {posts.map((post) => (
                    <tr key={post.id} className="transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-neutral-100 text-sm sm:text-base">
                          {post.title}
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          slug: {post.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs sm:text-sm whitespace-nowrap">
                        {post.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {getTags(post).map((tag) => (
                            <span 
                              key={tag} 
                              className="text-neutral-400 text-[10px] px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => initEditForm(post)}
                            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-100 transition-all"
                            title="Edit Post"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post)}
                            className="p-2 rounded-lg text-neutral-400 hover:text-red-500 transition-all"
                            title="Delete Post"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass-panel border border-neutral-900 rounded-3xl p-16 text-center text-neutral-500">
            <FaFileAlt size={40} className="mx-auto mb-4 text-neutral-700" />
            <p className="text-lg font-bold text-neutral-400 mb-1">No articles yet</p>
            <p className="text-sm mb-6">Create your first technical post to showcase on your blog.</p>
            <button
              onClick={initCreateForm}
              className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold"
            >
              <FaPlus size={12} />
              Write First Post
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;

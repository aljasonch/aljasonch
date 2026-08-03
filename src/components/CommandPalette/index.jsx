import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaHome,
  FaFolderOpen,
  FaPenNib,
  FaFileAlt,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaPalette,
  FaArrowRight,
  FaRegFilePdf,
  FaSun,
  FaMoon,
} from 'react-icons/fa';
import { useTheme, ACCENTS } from '../../context/ThemeContext';
import { personalInfo } from '../../data/content';

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const { setAccent, accentId, isDark, toggleMode } = useTheme();

  const close = useCallback(() => {
    setIsOpen(false);
    setQueryText('');
    setActiveIndex(0);
  }, []);

  // Build the action list
  const actions = useMemo(() => {
    const nav = (path) => () => {
      navigate(path);
      close();
    };
    const ext = (url) => () => {
      window.open(url, '_blank', 'noopener,noreferrer');
      close();
    };

    const navigation = [
      { id: 'home', label: 'Go to Home', hint: 'Page', icon: FaHome, group: 'Navigation', run: nav('/') },
      { id: 'portfolio', label: 'Go to Portfolio', hint: 'Page', icon: FaFolderOpen, group: 'Navigation', run: nav('/portfolio') },
      { id: 'blog', label: 'Read the Blog', hint: 'Page', icon: FaPenNib, group: 'Navigation', run: nav('/blog') },
      { id: 'cv', label: 'View CV / Resume', hint: 'Page', icon: FaFileAlt, group: 'Navigation', run: nav('/cv') },
      { id: 'contact', label: 'Go to Contact', hint: 'Page', icon: FaEnvelope, group: 'Navigation', run: nav('/contact') },
    ];

    const quick = [
      { id: 'email', label: 'Email me', hint: personalInfo.email, icon: FaEnvelope, group: 'Quick actions', run: () => { window.location.href = `mailto:${personalInfo.email}`; close(); } },
      { id: 'resume', label: 'Download my Resume (PDF)', hint: 'File', icon: FaRegFilePdf, group: 'Quick actions', run: () => { window.open('/CV_Alfonsus Jason Christian.pdf', '_blank'); close(); } },
      { id: 'github', label: 'Open GitHub', hint: 'External', icon: FaGithub, group: 'Quick actions', run: ext(personalInfo.github) },
      { id: 'instagram', label: 'Open Instagram', hint: 'External', icon: FaInstagram, group: 'Quick actions', run: ext(personalInfo.instagram) },
    ];

    const themes = ACCENTS.map((a) => ({
      id: `theme-${a.id}`,
      label: `Set accent: ${a.name}`,
      hint: accentId === a.id ? 'Active' : 'Theme',
      icon: FaPalette,
      group: 'Appearance',
      swatch: a.hex,
      run: () => { setAccent(a.id); },
    }));

    const modeAction = [
      {
        id: 'toggle-mode',
        label: isDark ? 'Switch to Light mode' : 'Switch to Dark mode',
        hint: isDark ? 'Dark' : 'Light',
        icon: isDark ? FaSun : FaMoon,
        group: 'Appearance',
        run: () => { toggleMode(); },
      },
    ];

    return [...navigation, ...quick, ...modeAction, ...themes];
  }, [navigate, close, setAccent, accentId, isDark, toggleMode]);

  // Fuzzy-ish filter: matches if all query chars appear in order
  const filtered = useMemo(() => {
    const q = queryText.trim().toLowerCase();
    if (!q) return actions;
    const matches = (text) => {
      const t = text.toLowerCase();
      let i = 0;
      for (const ch of q) {
        i = t.indexOf(ch, i);
        if (i === -1) return false;
        i += 1;
      }
      return true;
    };
    return actions.filter((a) => matches(a.label) || matches(a.hint || '') || matches(a.group));
  }, [queryText, actions]);

  // Group results for rendering, but keep a flat index for keyboard nav
  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach((item) => {
      (groups[item.group] = groups[item.group] || []).push(item);
    });
    return groups;
  }, [filtered]);

  // Toggle with Ctrl/Cmd + K, also "/" when not typing
  useEffect(() => {
    const handler = (e) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isCmdK) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }
      const typingInField = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
      if (!isOpen && e.key === '/' && !typingInField) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (isOpen && e.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  // Allow other components (e.g. navbar button) to open the palette
  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener('open-command-palette', open);
    return () => window.removeEventListener('open-command-palette', open);
  }, []);

  // Focus input on open + lock scroll
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      const id = setTimeout(() => inputRef.current?.focus(), 40);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(id);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Reset selection when results change
  useEffect(() => setActiveIndex(0), [queryText]);

  // Keyboard navigation within the list
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[activeIndex]?.run();
    }
  };

  // Keep the active item scrolled into view
  useEffect(() => {
    const node = listRef.current?.querySelector(`[data-idx="${activeIndex}"]`);
    node?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  let runningIndex = -1;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Backdrop */}
          <div
            className="command-palette-backdrop absolute inset-0 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="command-palette-panel relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onKeyDown={onKeyDown}
          >
            {/* Search input */}
            <div className="command-palette-section flex items-center gap-3 px-4 py-3.5">
              <FaSearch className="text-neutral-500 flex-shrink-0" size={15} />
              <input
                ref={inputRef}
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder="Search pages, actions, or change the accent color..."
                className="command-palette-input flex-1 bg-transparent text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none poppins-regular"
              />
              <span className="kbd">Esc</span>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="command-palette-empty px-4 py-10 text-center text-neutral-500 text-sm">
                  No results for "{queryText}"
                </div>
              ) : (
                Object.entries(grouped).map(([group, items]) => (
                  <div key={group} className="mb-1">
                    <p className="command-palette-group-label px-4 pt-2 pb-1 text-[10px] uppercase tracking-widest font-semibold text-neutral-600">
                      {group}
                    </p>
                    {items.map((item) => {
                      runningIndex += 1;
                      const idx = runningIndex;
                      const isActive = idx === activeIndex;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          data-idx={idx}
                          onClick={item.run}
                          onMouseMove={() => setActiveIndex(idx)}
                          className={`command-palette-item w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                            isActive ? 'bg-theme-soft' : ''
                          }`}
                        >
                          <span
                            className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                              isActive ? '' : ''
                            }`}
                          >
                            {item.swatch ? (
                              <span
                                className="w-3.5 h-3.5 rounded-full"
                                style={{ backgroundColor: item.swatch }}
                              />
                            ) : (
                              <Icon size={13} className={`command-palette-item-icon ${isActive ? 'text-theme' : 'text-neutral-400'}`} />
                            )}
                          </span>
                          <span className="command-palette-item-label flex-1 text-sm text-neutral-200 poppins-medium">
                            {item.label}
                          </span>
                          {item.hint && (
                            <span className="command-palette-item-hint text-[11px] text-neutral-500">{item.hint}</span>
                          )}
                          {isActive && <FaArrowRight size={11} className="text-theme" />}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="command-palette-footer flex items-center justify-between px-4 py-2.5 text-[11px] text-neutral-500">
              <span className="flex items-center gap-2">
                <span className="kbd">↑</span>
                <span className="kbd">↓</span>
                to navigate
              </span>
              <span className="flex items-center gap-2">
                <span className="kbd">↵</span>
                to select
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CommandPalette;

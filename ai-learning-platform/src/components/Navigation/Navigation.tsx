import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useProgress } from '../../contexts/ProgressContext';

interface NavigationProps {
  onMenuClick: () => void;
}

const Navigation = ({ onMenuClick }: NavigationProps) => {
  const { theme, toggleTheme } = useTheme();
  const { progress } = useProgress();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl">🧠</div>
              <div>
                <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  Deep Learning Hub
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Master 150+ AI Architectures
                </p>
              </div>
            </Link>
          </div>

          {/* Center section - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <Link to="/search" className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search architectures..."
                  className="w-full px-4 py-2 pl-10 bg-slate-100 dark:bg-slate-700 border border-transparent focus:border-primary-500 rounded-lg outline-none transition-colors"
                  onFocus={(e) => e.preventDefault()}
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            {/* Progress indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 rounded-full">
              <svg className="w-4 h-4 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                {progress.learnedArchitectures.length} learned
              </span>
            </div>

            {/* Bookmarks */}
            <Link
              to="/?filter=bookmarked"
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative"
              title="Bookmarks"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {progress.bookmarkedArchitectures.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center">
                  {progress.bookmarkedArchitectures.length}
                </span>
              )}
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Learning Paths */}
            <Link
              to="/learning-paths"
              className="hidden lg:block btn-primary text-sm"
            >
              Learning Paths
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

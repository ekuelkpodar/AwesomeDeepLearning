import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { getAllArchitectures } from '../data/architectures';
import { useProgress } from '../contexts/ProgressContext';

const HomePage = () => {
  const architectures = getAllArchitectures();
  const { progress } = useProgress();

  const featuredArchitectures = architectures.slice(0, 6);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Master Deep Learning Architectures
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Comprehensive, interactive guide to 150+ neural network architectures.
          From CNNs to Transformers, GANs to Graph Neural Networks.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/learning-paths" className="btn-primary">
            Start Learning
          </Link>
          <Link to="/compare" className="btn-outline">
            Compare Architectures
          </Link>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
            150+
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Architectures
          </div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-secondary-600 dark:text-secondary-400">
            12
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Categories
          </div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-accent-600 dark:text-accent-400">
            {progress.learnedArchitectures.length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Learned
          </div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
            {progress.bookmarkedArchitectures.length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Bookmarked
          </div>
        </div>
      </section>

      {/* Featured Architectures */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Architectures</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArchitectures.map(arch => (
            <Link
              key={arch.id}
              to={`/architecture/${arch.id}`}
              className="card hover:shadow-xl transition-shadow duration-200 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {arch.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {arch.year}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                      {arch.difficulty}
                    </span>
                  </div>
                </div>
                {progress.learnedArchitectures.includes(arch.id) && (
                  <svg className="w-6 h-6 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4">
                {arch.plainEnglish}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{arch.architecture.parameters.toLocaleString()} params</span>
                <span>{arch.architecture.depth} layers</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Explore by Category</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => (
            <div
              key={category.id}
              className="card hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start space-x-3">
                <div className="text-4xl">{category.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories.slice(0, 3).map(sub => (
                      <span
                        key={sub.id}
                        className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 rounded"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="px-2 py-1 text-xs text-slate-500">
                        +{category.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Paths Teaser */}
      <section className="card bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-200 dark:border-primary-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to Start Learning?</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Follow curated learning paths designed to take you from beginner to expert.
            </p>
            <Link to="/learning-paths" className="btn-primary">
              Explore Learning Paths
            </Link>
          </div>
          <div className="hidden lg:block text-6xl">📚</div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

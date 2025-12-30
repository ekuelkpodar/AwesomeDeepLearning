import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllArchitectures } from '../data/architectures';
import { categories } from '../data/categories';
import { Architecture, ArchitectureCategory } from '../types';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ArchitectureCategory[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([2012, 2024]);

  const allArchitectures = getAllArchitectures();

  const filteredArchitectures = useMemo(() => {
    return allArchitectures.filter(arch => {
      // Text search
      const matchesQuery = !query ||
        arch.name.toLowerCase().includes(query.toLowerCase()) ||
        arch.description.toLowerCase().includes(query.toLowerCase()) ||
        arch.plainEnglish.toLowerCase().includes(query.toLowerCase()) ||
        arch.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(arch.category);

      // Difficulty filter
      const matchesDifficulty = selectedDifficulty.length === 0 ||
        selectedDifficulty.includes(arch.difficulty);

      // Year filter
      const matchesYear = arch.year >= yearRange[0] && arch.year <= yearRange[1];

      return matchesQuery && matchesCategory && matchesDifficulty && matchesYear;
    });
  }, [query, selectedCategories, selectedDifficulty, yearRange, allArchitectures]);

  const toggleCategory = (category: ArchitectureCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty(prev =>
      prev.includes(difficulty) ? prev.filter(d => d !== difficulty) : [...prev, difficulty]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card">
        <h1 className="text-3xl font-bold mb-6">Search Architectures</h1>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, description, or tags..."
            className="w-full px-4 py-3 pl-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-primary-500 text-lg"
            autoFocus
          />
          <svg
            className="absolute left-4 top-4 w-6 h-6 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          {/* Category Filters */}
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategories.includes(cat.id)
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.icon} {cat.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filters */}
          <div>
            <h3 className="font-semibold mb-2">Difficulty</h3>
            <div className="flex gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map(diff => (
                <button
                  key={diff}
                  onClick={() => toggleDifficulty(diff)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDifficulty.includes(diff)
                      ? 'bg-secondary-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Year Range */}
          <div>
            <h3 className="font-semibold mb-2">Year Range: {yearRange[0]} - {yearRange[1]}</h3>
            <div className="flex gap-4 items-center">
              <input
                type="range"
                min="2012"
                max="2024"
                value={yearRange[0]}
                onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                className="flex-1"
              />
              <input
                type="range"
                min="2012"
                max="2024"
                value={yearRange[1]}
                onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedCategories.length > 0 || selectedDifficulty.length > 0 || query) && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategories([]);
                setSelectedDifficulty([]);
                setYearRange([2012, 2024]);
              }}
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            Results ({filteredArchitectures.length})
          </h2>
        </div>

        {filteredArchitectures.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg">No architectures found matching your criteria</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArchitectures.map(arch => (
              <ArchitectureCard key={arch.id} architecture={arch} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ArchitectureCard = ({ architecture }: { architecture: Architecture }) => (
  <Link
    to={`/architecture/${architecture.id}`}
    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:shadow-lg transition-shadow"
  >
    <div className="flex items-start justify-between mb-2">
      <h3 className="font-semibold text-lg">{architecture.name}</h3>
      <span className="px-2 py-0.5 text-xs font-medium rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
        {architecture.year}
      </span>
    </div>
    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
      {architecture.description}
    </p>
    <div className="flex items-center justify-between text-xs">
      <span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded">
        {architecture.difficulty}
      </span>
      <span className="text-slate-500">{architecture.architecture.depth} layers</span>
    </div>
  </Link>
);

export default SearchPage;

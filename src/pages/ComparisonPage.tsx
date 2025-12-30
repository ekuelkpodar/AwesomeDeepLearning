import { useState } from 'react';
import { getAllArchitectures, getArchitectureById } from '../data/architectures';

const ComparisonPage = () => {
  const allArchitectures = getAllArchitectures();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedArchitectures = selectedIds.map(id => getArchitectureById(id)).filter(Boolean);

  const toggleArchitecture = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card">
        <h1 className="text-3xl font-bold mb-2">Compare Architectures</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Select up to 4 architectures to compare side-by-side
        </p>

        {/* Architecture Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Selected: {selectedIds.length} / 4
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
            {allArchitectures.map(arch => (
              <button
                key={arch.id}
                onClick={() => toggleArchitecture(arch.id)}
                disabled={!selectedIds.includes(arch.id) && selectedIds.length >= 4}
                className={`p-2 text-left text-sm rounded transition-colors ${
                  selectedIds.includes(arch.id)
                    ? 'bg-primary-500 text-white'
                    : 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {arch.name}
              </button>
            ))}
          </div>
        </div>

        {selectedIds.length > 0 && (
          <button
            onClick={() => setSelectedIds([])}
            className="text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            Clear selection
          </button>
        )}
      </div>

      {/* Comparison Table */}
      {selectedArchitectures.length > 0 && (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-semibold sticky left-0 bg-white dark:bg-slate-800">
                  Attribute
                </th>
                {selectedArchitectures.map(arch => arch && (
                  <th key={arch.id} className="text-left py-3 px-4 font-semibold min-w-[200px]">
                    {arch.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Basic Info */}
              <ComparisonRow
                label="Year"
                values={selectedArchitectures.map(a => a?.year.toString() || '-')}
              />
              <ComparisonRow
                label="Category"
                values={selectedArchitectures.map(a => a?.category || '-')}
              />
              <ComparisonRow
                label="Difficulty"
                values={selectedArchitectures.map(a => a?.difficulty || '-')}
              />

              {/* Architecture Details */}
              <tr className="bg-slate-50 dark:bg-slate-900">
                <td colSpan={selectedArchitectures.length + 1} className="py-2 px-4 font-semibold">
                  Architecture Details
                </td>
              </tr>
              <ComparisonRow
                label="Total Layers"
                values={selectedArchitectures.map(a => a?.architecture.depth.toString() || '-')}
              />
              <ComparisonRow
                label="Parameters"
                values={selectedArchitectures.map(a =>
                  a ? `${(a.architecture.parameters / 1_000_000).toFixed(1)}M` : '-'
                )}
              />
              <ComparisonRow
                label="Input Shape"
                values={selectedArchitectures.map(a =>
                  a?.architecture.inputShape?.join(' × ') || '-'
                )}
              />

              {/* Performance */}
              <tr className="bg-slate-50 dark:bg-slate-900">
                <td colSpan={selectedArchitectures.length + 1} className="py-2 px-4 font-semibold">
                  Performance
                </td>
              </tr>
              <ComparisonRow
                label="Speed"
                values={selectedArchitectures.map(a => a?.benchmarks.performance.speed || '-')}
              />
              <ComparisonRow
                label="Memory"
                values={selectedArchitectures.map(a => a?.benchmarks.performance.memory || '-')}
              />
              <ComparisonRow
                label="Accuracy"
                values={selectedArchitectures.map(a => a?.benchmarks.performance.accuracy || '-')}
              />

              {/* Key Innovation */}
              <tr className="bg-slate-50 dark:bg-slate-900">
                <td colSpan={selectedArchitectures.length + 1} className="py-2 px-4 font-semibold">
                  Key Features
                </td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-3 px-4 font-medium sticky left-0 bg-white dark:bg-slate-800">
                  Key Innovation
                </td>
                {selectedArchitectures.map(arch => arch && (
                  <td key={arch.id} className="py-3 px-4 text-sm">
                    {arch.keyInnovation}
                  </td>
                ))}
              </tr>

              {/* Requirements */}
              <tr className="bg-slate-50 dark:bg-slate-900">
                <td colSpan={selectedArchitectures.length + 1} className="py-2 px-4 font-semibold">
                  Requirements
                </td>
              </tr>
              <ComparisonRow
                label="Min GPU"
                values={selectedArchitectures.map(a => a?.computationalRequirements.minGPU || 'CPU')}
              />
              <ComparisonRow
                label="Min RAM"
                values={selectedArchitectures.map(a => a?.computationalRequirements.minRAM || '-')}
              />
            </tbody>
          </table>
        </div>
      )}

      {selectedArchitectures.length === 0 && (
        <div className="card text-center py-12 text-slate-500 dark:text-slate-400">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-lg">Select architectures above to start comparing</p>
        </div>
      )}
    </div>
  );
};

const ComparisonRow = ({ label, values }: { label: string; values: string[] }) => (
  <tr className="border-b border-slate-200 dark:border-slate-700">
    <td className="py-3 px-4 font-medium sticky left-0 bg-white dark:bg-slate-800">{label}</td>
    {values.map((value, idx) => (
      <td key={idx} className="py-3 px-4">
        {value}
      </td>
    ))}
  </tr>
);

export default ComparisonPage;

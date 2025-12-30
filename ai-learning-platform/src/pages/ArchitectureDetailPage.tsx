import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getArchitectureById } from '../data/architectures';
import { useProgress } from '../contexts/ProgressContext';
import CodeBlock from '../components/CodeEditor/CodeBlock';
import NetworkVisualization from '../components/Visualization/NetworkVisualization';
import MathSection from '../components/ArchitecturePage/MathSection';

const ArchitectureDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const architecture = id ? getArchitectureById(id) : undefined;
  const { progress, markAsLearned, toggleBookmark, addNote } = useProgress();
  const [activeTab, setActiveTab] = useState<'pytorch' | 'tensorflow' | 'jax'>('pytorch');
  const [noteText, setNoteText] = useState(progress.notes[id || ''] || '');

  if (!architecture) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-300">
          Architecture not found
        </h1>
        <Link to="/" className="btn-primary mt-4 inline-block">
          Go Home
        </Link>
      </div>
    );
  }

  const isLearned = progress.learnedArchitectures.includes(architecture.id);
  const isBookmarked = progress.bookmarkedArchitectures.includes(architecture.id);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">{architecture.name}</h1>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                {architecture.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {architecture.year}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {architecture.authors.join(', ')}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => markAsLearned(architecture.id)}
              className={`p-2 rounded-lg transition-colors ${
                isLearned
                  ? 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              title="Mark as learned"
            >
              <svg className="w-6 h-6" fill={isLearned ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              onClick={() => toggleBookmark(architecture.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              title="Bookmark"
            >
              <svg className="w-6 h-6" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">
          {architecture.description}
        </p>

        <a
          href={architecture.paperUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Read Paper: {architecture.paper}
        </a>
      </div>

      {/* Plain English Explanation */}
      <div className="card bg-blue-50 dark:bg-blue-900/20 border-l-4 border-primary-500">
        <h2 className="text-2xl font-bold mb-3 flex items-center">
          <span className="text-2xl mr-2">💡</span>
          In Plain English
        </h2>
        <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
          {architecture.plainEnglish}
        </p>
      </div>

      {/* Key Innovation */}
      <div className="card bg-secondary-50 dark:bg-secondary-900/20 border-l-4 border-secondary-500">
        <h2 className="text-2xl font-bold mb-3 flex items-center">
          <span className="text-2xl mr-2">🚀</span>
          Key Innovation
        </h2>
        <p className="text-slate-700 dark:text-slate-300 text-lg">
          {architecture.keyInnovation}
        </p>
      </div>

      {/* Architecture Visualization */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Architecture Visualization</h2>
        <NetworkVisualization architecture={architecture} />
      </div>

      {/* Mathematical Foundation */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Mathematical Foundation</h2>
        <MathSection mathematics={architecture.mathematics} />
      </div>

      {/* Code Implementation */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Implementation</h2>

        {/* Framework Tabs */}
        <div className="flex gap-2 mb-4 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('pytorch')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'pytorch'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            PyTorch
          </button>
          {architecture.code.tensorflow && (
            <button
              onClick={() => setActiveTab('tensorflow')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'tensorflow'
                  ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              TensorFlow / Keras
            </button>
          )}
          {architecture.code.jax && (
            <button
              onClick={() => setActiveTab('jax')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'jax'
                  ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              JAX
            </button>
          )}
        </div>

        <CodeBlock
          code={
            activeTab === 'pytorch'
              ? (typeof architecture.code.pytorch === 'string' ? architecture.code.pytorch : architecture.code.pytorch.minimal || '')
              : activeTab === 'tensorflow'
              ? (architecture.code.tensorflow ? (typeof architecture.code.tensorflow === 'string' ? architecture.code.tensorflow : architecture.code.tensorflow.minimal || '') : '')
              : (architecture.code.jax || '')
          }
          language="python"
        />
      </div>

      {/* Use Cases */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Use Cases & Applications</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {architecture.useCases.map((useCase, idx) => (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                {useCase.description}
              </p>
              {useCase.examples && (
                <ul className="space-y-1">
                  {useCase.examples.map((example, eidx) => (
                    <li key={eidx} className="text-sm flex items-start">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-secondary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    <span>{example}</span>
                  </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Training Tips */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Training Tips</h2>

        <div className="space-y-4">
          {architecture.trainingTips.hyperparameters && (
            <div>
              <h3 className="font-semibold mb-2">Recommended Hyperparameters</h3>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm">
                {Array.isArray(architecture.trainingTips.hyperparameters)
                  ? architecture.trainingTips.hyperparameters.map((param, idx) => (
                      <div key={idx} className="mb-2">
                        <div className="font-semibold">{param.parameter}</div>
                        <div className="text-sm">{param.recommendedValue}</div>
                      </div>
                    ))
                  : Object.entries(architecture.trainingTips.hyperparameters).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1">
                        <span className="text-slate-600 dark:text-slate-400">{key}:</span>
                        <span className="font-medium">{typeof value === 'object' ? JSON.stringify(value) : value}</span>
                      </div>
                    ))
                }
              </div>
            </div>
          )}

          {architecture.trainingTips.commonIssues && (
            <div>
              <h3 className="font-semibold mb-2">Common Issues & Solutions</h3>
              <div className="space-y-2">
                {architecture.trainingTips.commonIssues.map((issue, idx) => (
                  <div key={idx} className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
                    <div className="font-medium text-amber-900 dark:text-amber-200 mb-1">
                      ⚠️ {issue.problem}
                    </div>
                    <div className="text-sm text-amber-800 dark:text-amber-300">
                      ✅ {issue.solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Data Requirements</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {architecture.trainingTips.dataRequirements}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training Time</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {architecture.trainingTips.trainingTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmarks */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Performance Benchmarks</h2>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-2 px-4 font-semibold">Dataset</th>
                  <th className="text-right py-2 px-4 font-semibold">Accuracy (%)</th>
                </tr>
              </thead>
              <tbody>
                {architecture.benchmarks.datasets.map((dataset, idx) => (
                  <tr key={idx} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-2 px-4">{dataset.name}</td>
                    <td className="text-right py-2 px-4 font-mono">{dataset.accuracy}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {architecture.benchmarks.performance && (
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Speed</div>
                <div className="font-semibold">{architecture.benchmarks.performance.speed}</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Memory</div>
                <div className="font-semibold">{architecture.benchmarks.performance.memory}</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Accuracy</div>
                <div className="font-semibold">{architecture.benchmarks.performance.accuracy}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notes Section */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onBlur={() => addNote(architecture.id, noteText)}
          placeholder="Add your personal notes about this architecture..."
          className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-primary-500"
        />
      </div>

      {/* Resources */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {architecture.resources.map((resource, idx) => (
            <a
              key={idx}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3">
                {resource.type === 'paper' && '📄'}
                {resource.type === 'tutorial' && '📚'}
                {resource.type === 'implementation' && '💻'}
                {resource.type === 'video' && '🎥'}
                {resource.type === 'blog' && '✍️'}
              </div>
              <div className="flex-1">
                <div className="font-medium">{resource.title}</div>
                {resource.author && (
                  <div className="text-sm text-slate-600 dark:text-slate-400">{resource.author}</div>
                )}
              </div>
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDetailPage;

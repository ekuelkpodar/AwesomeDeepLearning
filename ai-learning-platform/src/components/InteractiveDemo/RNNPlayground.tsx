import { useState } from 'react';

const RNNPlayground = () => {
  const [rnnType, setRnnType] = useState<'vanilla' | 'lstm' | 'gru'>('lstm');
  const [hiddenSize, setHiddenSize] = useState(128);
  const [numLayers, setNumLayers] = useState(2);
  const [sequenceLength, setSequenceLength] = useState(20);
  const [taskType, setTaskType] = useState<'classification' | 'generation' | 'translation'>('classification');

  const getParamCount = () => {
    const inputSize = 100; // embedding dim
    const outputSize = 10;
    let params = 0;

    for (let i = 0; i < numLayers; i++) {
      const inSize = i === 0 ? inputSize : hiddenSize;

      if (rnnType === 'vanilla') {
        params += hiddenSize * (inSize + hiddenSize + 1); // W_xh, W_hh, bias
      } else if (rnnType === 'lstm') {
        params += 4 * hiddenSize * (inSize + hiddenSize + 1); // 4 gates
      } else { // gru
        params += 3 * hiddenSize * (inSize + hiddenSize + 1); // 3 gates
      }
    }

    params += hiddenSize * outputSize + outputSize; // output layer
    return params;
  };

  const getRNNColor = (type: string) => {
    if (type === 'vanilla') return 'from-blue-500 to-blue-600';
    if (type === 'lstm') return 'from-purple-500 to-purple-600';
    return 'from-green-500 to-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          <span className="text-3xl mr-3">🔄</span>
          Interactive RNN Playground
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Explore different RNN architectures! Build Vanilla RNN, LSTM, or GRU networks and see how they handle sequences.
        </p>
      </div>

      {/* Architecture Selection */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Select RNN Type</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {(['vanilla', 'lstm', 'gru'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setRnnType(type)}
              className={`p-6 rounded-lg border-2 transition-all ${
                rnnType === type
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${getRNNColor(type)} flex items-center justify-center text-white text-2xl font-bold`}>
                {type === 'vanilla' ? 'R' : type === 'lstm' ? 'L' : 'G'}
              </div>
              <div className="font-bold text-lg capitalize mb-2">{type === 'vanilla' ? 'Vanilla RNN' : type.toUpperCase()}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {type === 'vanilla' && 'Simple • Fast • Short memory'}
                {type === 'lstm' && 'Complex • Powerful • Long memory'}
                {type === 'gru' && 'Balanced • Efficient • Good memory'}
              </div>
              <div className="mt-3 text-xs font-mono text-slate-500">
                {type === 'vanilla' && '2 weights per layer'}
                {type === 'lstm' && '4 gates • Cell state'}
                {type === 'gru' && '2 gates • Simpler'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Configuration */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Network Configuration</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Hidden Size */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Hidden Size: <span className="text-primary-600 font-bold">{hiddenSize}</span>
            </label>
            <input
              type="range"
              min="32"
              max="512"
              step="32"
              value={hiddenSize}
              onChange={(e) => setHiddenSize(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>32 (tiny)</span>
              <span>256 (medium)</span>
              <span>512 (large)</span>
            </div>
          </div>

          {/* Number of Layers */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Number of Layers: <span className="text-primary-600 font-bold">{numLayers}</span>
            </label>
            <input
              type="range"
              min="1"
              max="4"
              value={numLayers}
              onChange={(e) => setNumLayers(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1 (shallow)</span>
              <span>2-3 (typical)</span>
              <span>4 (deep)</span>
            </div>
          </div>

          {/* Sequence Length */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Max Sequence Length: <span className="text-primary-600 font-bold">{sequenceLength}</span>
            </label>
            <input
              type="range"
              min="10"
              max="200"
              step="10"
              value={sequenceLength}
              onChange={(e) => setSequenceLength(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>10 (short)</span>
              <span>100 (medium)</span>
              <span>200 (long)</span>
            </div>
            {rnnType === 'vanilla' && sequenceLength > 50 && (
              <div className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                ⚠️ Vanilla RNN struggles with sequences longer than 30-50 steps
              </div>
            )}
          </div>

          {/* Task Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Task Type</label>
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
            >
              <option value="classification">Sequence Classification</option>
              <option value="generation">Text Generation</option>
              <option value="translation">Seq2Seq Translation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Layers</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{numLayers}</div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Hidden Size</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{hiddenSize}</div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Parameters</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {(getParamCount() / 1000).toFixed(0)}K
          </div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Memory Span</div>
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {rnnType === 'vanilla' ? '~10' : rnnType === 'lstm' ? '~100' : '~80'}
          </div>
        </div>
      </div>

      {/* RNN Architecture Comparison */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">How {rnnType === 'vanilla' ? 'Vanilla RNN' : rnnType.toUpperCase()} Works</h3>

        {rnnType === 'vanilla' && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-bold mb-2">✅ Strengths:</h4>
              <ul className="text-sm space-y-1">
                <li>• Simple architecture - easiest to understand and implement</li>
                <li>• Fast training - fewer parameters than LSTM/GRU</li>
                <li>• Good for short sequences ({"<"}20 steps)</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-bold mb-2">❌ Limitations:</h4>
              <ul className="text-sm space-y-1">
                <li>• Vanishing gradients - can't learn long-term dependencies</li>
                <li>• Exploding gradients - requires careful gradient clipping</li>
                <li>• Limited memory span (~10-20 steps max)</li>
              </ul>
            </div>
          </div>
        )}

        {rnnType === 'lstm' && (
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-bold mb-2">🔑 Key Components:</h4>
              <div className="grid md:grid-cols-3 gap-3 text-sm mt-2">
                <div className="p-2 bg-white dark:bg-slate-800 rounded">
                  <div className="font-bold text-red-600">Forget Gate</div>
                  <div className="text-xs">Decides what to remove from cell state</div>
                </div>
                <div className="p-2 bg-white dark:bg-slate-800 rounded">
                  <div className="font-bold text-green-600">Input Gate</div>
                  <div className="text-xs">Decides what new info to store</div>
                </div>
                <div className="p-2 bg-white dark:bg-slate-800 rounded">
                  <div className="font-bold text-blue-600">Output Gate</div>
                  <div className="text-xs">Decides what to output</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-bold mb-2">✅ Advantages:</h4>
              <ul className="text-sm space-y-1">
                <li>• Cell state with additive updates - gradients flow for 100+ steps</li>
                <li>• Can learn very long-term dependencies</li>
                <li>• Industry standard for sequence tasks (2015-2020)</li>
              </ul>
            </div>
          </div>
        )}

        {rnnType === 'gru' && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-bold mb-2">🔑 Key Components:</h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm mt-2">
                <div className="p-2 bg-white dark:bg-slate-800 rounded">
                  <div className="font-bold text-purple-600">Update Gate</div>
                  <div className="text-xs">Controls old vs new memory (combines LSTM's forget + input)</div>
                </div>
                <div className="p-2 bg-white dark:bg-slate-800 rounded">
                  <div className="font-bold text-orange-600">Reset Gate</div>
                  <div className="text-xs">Decides how much past to forget</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-bold mb-2">✅ Advantages:</h4>
              <ul className="text-sm space-y-1">
                <li>• 25% fewer parameters than LSTM - faster training</li>
                <li>• Similar performance to LSTM on most tasks</li>
                <li>• Simpler architecture - easier to implement and modify</li>
                <li>• Often better on smaller datasets (less overfitting)</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Sequence Flow Visualization */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Sequence Processing Flow</h3>

        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4">
          {[0, 1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`w-20 h-20 rounded-lg bg-gradient-to-br ${getRNNColor(rnnType)} flex flex-col items-center justify-center text-white shadow-lg`}>
                  <div className="text-xs font-bold">{rnnType === 'vanilla' ? 'RNN' : rnnType.toUpperCase()}</div>
                  <div className="text-xl font-bold">t={step}</div>
                </div>
                <div className="text-center mt-2 text-xs text-slate-600 dark:text-slate-400">
                  x_{step}
                </div>
              </div>
              {step < 4 && (
                <div className="flex-shrink-0 mx-2">
                  <svg className="w-8 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
          <div className="flex-shrink-0 text-slate-400 text-2xl">...</div>
        </div>

        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="text-sm">
            <div className="font-bold mb-2">At each time step t:</div>
            <ol className="space-y-1 ml-4 list-decimal">
              <li>Receive input x_t (e.g., word embedding)</li>
              <li>Combine with previous hidden state h_(t-1)</li>
              {rnnType === 'lstm' && <li>Update cell state C_t using gates</li>}
              {rnnType === 'gru' && <li>Update hidden state using update & reset gates</li>}
              <li>Compute new hidden state h_t</li>
              <li>Optionally output prediction y_t</li>
              <li>Pass h_t to next time step</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Training Tips */}
      <div className="card bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
        <h3 className="font-bold mb-3">💡 Training Tips for {rnnType === 'vanilla' ? 'Vanilla RNN' : rnnType.toUpperCase()}</h3>
        <div className="space-y-2 text-sm">
          {rnnType === 'vanilla' && (
            <>
              <div className="flex items-start gap-2">
                <span className="text-lg">🔸</span>
                <span><strong>Gradient clipping is CRITICAL</strong> - clip to norm ≤ 5.0 to prevent exploding gradients</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">🔸</span>
                <span><strong>Truncate sequences</strong> to 20-30 steps - longer sequences won't learn anything useful</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">🔸</span>
                <span><strong>Initialize W_hh orthogonally</strong> to improve gradient flow</span>
              </div>
            </>
          )}
          {rnnType === 'lstm' && (
            <>
              <div className="flex items-start gap-2">
                <span className="text-lg">🔸</span>
                <span><strong>Gradient clipping still recommended</strong> (norm ≤ 5-10)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">🔸</span>
                <span><strong>Can handle 100-200 step sequences</strong> effectively</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">🔸</span>
                <span><strong>Use forget gate bias = 1</strong> initially (helps learning)</span>
              </div>
            </>
          )}
          {rnnType === 'gru' && (
            <>
              <div className="flex items-start gap-2">
                <span className="text-lg">🔸</span>
                <span><strong>Trains ~25% faster than LSTM</strong> with similar performance</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">🔸</span>
                <span><strong>Great choice for smaller datasets</strong> (fewer parameters = less overfitting)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">🔸</span>
                <span><strong>Try both GRU and LSTM</strong> - no clear winner, task-dependent</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RNNPlayground;

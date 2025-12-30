import { useState } from 'react';

type GNNType = 'gcn' | 'gat' | 'graphsage';

export default function GNNPlayground() {
  const [gnnType, setGnnType] = useState<GNNType>('gcn');
  const [numLayers, setNumLayers] = useState(2);
  const [hiddenDim, setHiddenDim] = useState(64);
  const [numNodes, setNumNodes] = useState(2708);
  const [avgDegree, setAvgDegree] = useState(4);

  // GAT-specific
  const [numHeads, setNumHeads] = useState(8);
  const [headDim, setHeadDim] = useState(8);

  // GraphSAGE-specific
  const [sampleSize, setSampleSize] = useState(25);
  const [aggregator, setAggregator] = useState<'mean' | 'pool' | 'lstm'>('mean');

  const getParamCount = () => {
    const inputDim = 1433; // Typical for Cora dataset
    const outputDim = 7; // Number of classes
    let params = 0;

    if (gnnType === 'gcn') {
      // First layer: input → hidden
      params += inputDim * hiddenDim + hiddenDim;

      // Hidden layers
      for (let i = 1; i < numLayers - 1; i++) {
        params += hiddenDim * hiddenDim + hiddenDim;
      }

      // Output layer: hidden → output
      if (numLayers > 1) {
        params += hiddenDim * outputDim + outputDim;
      } else {
        params = inputDim * outputDim + outputDim;
      }
    } else if (gnnType === 'gat') {
      // First layer: K heads, each with input → head_dim
      const firstLayerOut = numHeads * headDim;
      // W (input → head_dim) + attention vector a (2*head_dim → 1)
      params += numHeads * (inputDim * headDim + 2 * headDim);

      // Hidden layers (if any)
      for (let i = 1; i < numLayers - 1; i++) {
        params += numHeads * (firstLayerOut * headDim + 2 * headDim);
      }

      // Output layer: 1 head (averaging)
      params += firstLayerOut * outputDim + 2 * outputDim;
    } else { // graphsage
      // First layer: concatenate [self || neighbors] → hidden
      params += 2 * inputDim * hiddenDim + hiddenDim;

      if (aggregator === 'pool') {
        params += inputDim * inputDim + inputDim; // Pool MLP
      }

      // Hidden layers
      for (let i = 1; i < numLayers - 1; i++) {
        params += 2 * hiddenDim * hiddenDim + hiddenDim;
        if (aggregator === 'pool') {
          params += hiddenDim * hiddenDim + hiddenDim;
        }
      }

      // Output layer
      if (numLayers > 1) {
        params += 2 * hiddenDim * outputDim + outputDim;
      }
    }

    return params;
  };

  const getMemoryFootprint = () => {
    const params = getParamCount();
    const edges = numNodes * avgDegree;

    // Model parameters (fp32)
    const modelMemory = params * 4;

    // Graph structure (sparse, ~8 bytes per edge for CSR format)
    const graphMemory = edges * 8;

    // Node features during forward pass (fp32)
    const featureMemory = numNodes * hiddenDim * numLayers * 4;

    const totalMB = (modelMemory + graphMemory + featureMemory) / (1024 * 1024);
    return totalMB.toFixed(0);
  };

  const getComputeComplexity = () => {
    const edges = numNodes * avgDegree;

    if (gnnType === 'gcn') {
      // O(|E| × d_in × d_out) per layer
      return `~${((edges * hiddenDim * hiddenDim) / 1e9).toFixed(2)}B FLOPs`;
    } else if (gnnType === 'gat') {
      // O(|E| × K × d²) for K attention heads
      return `~${((edges * numHeads * headDim * headDim) / 1e9).toFixed(2)}B FLOPs`;
    } else { // graphsage
      // O(k^L × d²) per node, k = sample size
      const totalSamples = Math.pow(sampleSize, numLayers);
      return `~${((numNodes * totalSamples * hiddenDim * hiddenDim) / 1e9).toFixed(2)}B FLOPs`;
    }
  };

  const getReceptiveField = () => {
    if (gnnType === 'graphsage') {
      // Fixed-size sampling: k^L
      return Math.pow(sampleSize, numLayers);
    } else {
      // Full neighborhood aggregation: d^L (average)
      return Math.pow(avgDegree, numLayers);
    }
  };

  const getTrainingTime = () => {
    const complexity = parseFloat(getComputeComplexity().split('B')[0].replace('~', ''));

    if (numNodes < 5000) {
      return complexity < 0.5 ? '< 1 min' : '1-3 min';
    } else if (numNodes < 50000) {
      return complexity < 2 ? '5-10 min' : '10-30 min';
    } else {
      return gnnType === 'graphsage' ? '30-60 min (with sampling)' : '1-3 hours (full batch)';
    }
  };

  const gnnTypes: Array<{ type: GNNType; name: string; color: string; description: string }> = [
    {
      type: 'gcn',
      name: 'GCN',
      color: 'from-blue-500 to-cyan-500',
      description: 'Spectral convolution with symmetric normalization',
    },
    {
      type: 'gat',
      name: 'GAT',
      color: 'from-purple-500 to-pink-500',
      description: 'Multi-head attention for neighbor aggregation',
    },
    {
      type: 'graphsage',
      name: 'GraphSAGE',
      color: 'from-green-500 to-emerald-500',
      description: 'Scalable sampling-based inductive learning',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Graph Neural Network Playground
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Explore different GNN architectures and see how parameters affect scalability
        </p>
      </div>

      {/* GNN Type Selection */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          GNN Architecture
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gnnTypes.map((model) => (
            <button
              key={model.type}
              onClick={() => setGnnType(model.type)}
              className={`p-4 rounded-lg border-2 transition-all ${
                gnnType === model.type
                  ? 'border-blue-500 dark:border-blue-400 shadow-md'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${model.color} text-white text-sm font-semibold mb-2`}>
                {model.name}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 text-left">
                {model.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Common Parameters */}
      <div className="space-y-6 mb-8">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Number of Layers
            </label>
            <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{numLayers}</span>
          </div>
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={numLayers}
            onChange={(e) => setNumLayers(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Each layer aggregates from {numLayers}-hop neighbors
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Hidden Dimension
            </label>
            <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{hiddenDim}</span>
          </div>
          <input
            type="range"
            min="16"
            max="256"
            step="16"
            value={hiddenDim}
            onChange={(e) => setHiddenDim(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Feature dimension for node embeddings
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Number of Nodes
            </label>
            <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{numNodes.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={numNodes}
            onChange={(e) => setNumNodes(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Graph size (Cora: 2,708, Reddit: 232,965)
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Average Degree
            </label>
            <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{avgDegree}</span>
          </div>
          <input
            type="range"
            min="2"
            max="50"
            step="1"
            value={avgDegree}
            onChange={(e) => setAvgDegree(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Average neighbors per node (affects compute)
          </p>
        </div>

        {/* GAT-specific parameters */}
        {gnnType === 'gat' && (
          <>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Number of Attention Heads
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{numHeads}</span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={numHeads}
                onChange={(e) => setNumHeads(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Multi-head attention for diverse patterns (typical: 8)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Dimension per Head
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{headDim} (total: {numHeads * headDim})</span>
              </div>
              <input
                type="range"
                min="4"
                max="32"
                step="4"
                value={headDim}
                onChange={(e) => setHeadDim(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Features per attention head (concatenated across heads)
              </p>
            </div>
          </>
        )}

        {/* GraphSAGE-specific parameters */}
        {gnnType === 'graphsage' && (
          <>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Neighbor Sample Size
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{sampleSize}</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={sampleSize}
                onChange={(e) => setSampleSize(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Fixed number of neighbors sampled per layer (enables scalability)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Aggregator Type
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['mean', 'pool', 'lstm'].map((agg) => (
                  <button
                    key={agg}
                    onClick={() => setAggregator(agg as 'mean' | 'pool' | 'lstm')}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                      aggregator === agg
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {agg.toUpperCase()}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                How to aggregate neighbor features (mean: simple, pool: learnable, LSTM: sequential)
              </p>
            </div>
          </>
        )}
      </div>

      {/* Stats Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Parameters</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {(getParamCount() / 1_000).toFixed(1)}K
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Memory: ~{getMemoryFootprint()} MB (includes graph)
          </div>
        </div>

        <div className="bg-green-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Compute Complexity</div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {getComputeComplexity()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Training time: {getTrainingTime()} (Cora-scale)
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Receptive Field</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {getReceptiveField() > 1000 ? `${(getReceptiveField() / 1000).toFixed(1)}K` : getReceptiveField()} nodes
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {gnnType === 'graphsage' ? `${sampleSize}^${numLayers} (sampled)` : `${avgDegree}^${numLayers} (full neighborhood)`}
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Scalability</div>
          <div className="text-sm font-semibold text-orange-600 dark:text-orange-400">
            {gnnType === 'gcn' && 'Good for small-medium graphs'}
            {gnnType === 'gat' && 'Good with attention pruning'}
            {gnnType === 'graphsage' && 'Excellent - billion-scale'}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {gnnType === 'gcn' && 'Requires full graph in memory'}
            {gnnType === 'gat' && `${numHeads}× compute of GCN`}
            {gnnType === 'graphsage' && 'Constant memory per node'}
          </div>
        </div>
      </div>

      {/* Architecture Flow */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/30 dark:to-slate-800/30 rounded-lg p-6">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Message Passing Flow
        </h4>

        {gnnType === 'gcn' && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded font-mono text-blue-700 dark:text-blue-300">
                X (n×1433)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-cyan-100 dark:bg-cyan-900/30 px-3 py-1 rounded font-mono text-cyan-700 dark:text-cyan-300">
                D̃^(-½) Ã D̃^(-½)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded font-mono text-purple-700 dark:text-purple-300">
                GCN({hiddenDim}d)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded font-mono text-green-700 dark:text-green-300">
                ...×{numLayers}
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Symmetric normalization prevents high-degree nodes from dominating. Each layer sees {numLayers}-hop neighborhood.
            </p>
          </div>
        )}

        {gnnType === 'gat' && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded font-mono text-purple-700 dark:text-purple-300">
                X (n×1433)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-pink-100 dark:bg-pink-900/30 px-3 py-1 rounded font-mono text-pink-700 dark:text-pink-300">
                {numHeads} Attention Heads
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded font-mono text-blue-700 dark:text-blue-300">
                α_ij = softmax(e_ij)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded font-mono text-green-700 dark:text-green-300">
                Σ α_ij W h_j
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p>Each head learns different attention patterns. Output: {numHeads}×{headDim} = {numHeads * headDim} features.</p>
              <p>Attention weights α_ij are interpretable: show which neighbors matter most.</p>
            </div>
          </div>
        )}

        {gnnType === 'graphsage' && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded font-mono text-green-700 dark:text-green-300">
                Sample {sampleSize} neighbors
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded font-mono text-emerald-700 dark:text-emerald-300">
                {aggregator.toUpperCase()}(neighbors)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded font-mono text-blue-700 dark:text-blue-300">
                [h_v || h_N(v)]
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded font-mono text-purple-700 dark:text-purple-300">
                W × concat
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p>Fixed sampling: {sampleSize}^{numLayers} = {Math.pow(sampleSize, numLayers)} total neighbors (constant!).</p>
              <p>Concatenation preserves self info. {aggregator === 'mean' ? 'Mean: simple average.' : aggregator === 'pool' ? 'Pool: learnable max-pooling.' : 'LSTM: sequential aggregation.'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Training Tips */}
      <div className="mt-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Training Tips
        </h4>
        <ul className="text-xs text-amber-800 dark:text-amber-200 space-y-1">
          {gnnType === 'gcn' && (
            <>
              <li>• Limit depth to 2-3 layers to avoid over-smoothing (all nodes become similar)</li>
              <li>• Use dropout 0.5 and weight decay 5e-4 for small labeled sets</li>
              <li>• Precompute Â = D̃^(-½) Ã D̃^(-½) once before training (saves time)</li>
              <li>• For large graphs, use ClusterGCN or GraphSAINT for minibatch training</li>
            </>
          )}
          {gnnType === 'gat' && (
            <>
              <li>• Use 8 heads for first layer, 1 head (averaging) for output layer</li>
              <li>• Higher dropout (0.6) on both features and attention weights</li>
              <li>• Small head dimension (8-16) encourages head specialization</li>
              <li>• If attention collapses, try GATv2 or add entropy regularization</li>
            </>
          )}
          {gnnType === 'graphsage' && (
            <>
              <li>• Use [25, 10] sampling for 2 layers (250 total neighbors per node)</li>
              <li>• Start with mean aggregator (simple, effective), try pool if underfitting</li>
              <li>• Use NeighborLoader in PyTorch Geometric for efficient minibatch training</li>
              <li>• For billion-scale graphs, reduce samples ([10, 5]) or use FastGCN</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

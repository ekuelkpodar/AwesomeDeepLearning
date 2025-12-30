import { useState } from 'react';

const TransformerPlayground = () => {
  const [modelType, setModelType] = useState<'transformer' | 'bert' | 'gpt'>('transformer');
  const [dModel, setDModel] = useState(512);
  const [numHeads, setNumHeads] = useState(8);
  const [numLayers, setNumLayers] = useState(6);
  const [dFF, setDFF] = useState(2048);
  const [vocabSize, setVocabSize] = useState(30000);
  const [maxSeqLen, setMaxSeqLen] = useState(512);

  const getParamCount = () => {
    let params = 0;

    // Embeddings
    const tokenEmbedding = vocabSize * dModel;
    const posEmbedding = maxSeqLen * dModel;
    params += tokenEmbedding + posEmbedding;

    // Each layer parameters
    const attentionParams = 4 * dModel * dModel; // Q, K, V, O projections
    const ffnParams = dModel * dFF + dFF + dFF * dModel + dModel; // W1, b1, W2, b2
    const layerNormParams = 2 * dModel * 2; // 2 layer norms per layer
    const layerParams = attentionParams + ffnParams + layerNormParams;

    if (modelType === 'transformer') {
      // Encoder + Decoder
      params += layerParams * numLayers * 2;
      // Cross-attention in decoder
      params += numLayers * attentionParams;
    } else if (modelType === 'bert') {
      // Encoder only
      params += layerParams * numLayers;
      // Pooler
      params += dModel * dModel + dModel;
    } else { // gpt
      // Decoder only (no cross-attention)
      params += layerParams * numLayers;
    }

    // Output projection (often weight-tied with embeddings, but counted separately)
    params += dModel * vocabSize + vocabSize;

    return params;
  };

  const getMemoryFootprint = () => {
    const params = getParamCount();
    const bytesPerParam = 4; // fp32
    const megabytes = (params * bytesPerParam) / (1024 * 1024);
    return megabytes.toFixed(0);
  };

  const getFlopsPerToken = () => {
    // Rough estimate: ~6N FLOPs per token for forward pass (N = parameters)
    const params = getParamCount();
    const flops = 6 * params;
    if (flops > 1e9) return `${(flops / 1e9).toFixed(1)}B`;
    if (flops > 1e6) return `${(flops / 1e6).toFixed(1)}M`;
    return `${(flops / 1e3).toFixed(1)}K`;
  };

  const getAttentionComplexity = () => {
    // O(n^2 * d) for self-attention
    const n = maxSeqLen;
    const d = dModel;
    const complexity = n * n * d;
    if (complexity > 1e9) return `${(complexity / 1e9).toFixed(1)}B`;
    if (complexity > 1e6) return `${(complexity / 1e6).toFixed(1)}M`;
    return `${(complexity / 1e3).toFixed(1)}K`;
  };

  const modelConfigs = {
    transformer: {
      name: 'Transformer (Encoder-Decoder)',
      color: 'from-purple-500 to-pink-500',
      description: 'Original attention-based architecture for sequence-to-sequence tasks',
      useCases: ['Machine Translation', 'Summarization', 'Text-to-Text'],
      strengths: ['Parallel processing', 'Long-range dependencies', 'Bidirectional encoding'],
      limitations: ['Quadratic complexity in sequence length', 'No inherent position info', 'High memory usage'],
    },
    bert: {
      name: 'BERT (Encoder-Only)',
      color: 'from-blue-500 to-cyan-500',
      description: 'Bidirectional encoder for understanding tasks via masked language modeling',
      useCases: ['Classification', 'Question Answering', 'Named Entity Recognition'],
      strengths: ['Bidirectional context', 'Transfer learning', 'Strong understanding'],
      limitations: ['Cannot generate text', 'Fixed context length', 'Requires fine-tuning'],
    },
    gpt: {
      name: 'GPT (Decoder-Only)',
      color: 'from-green-500 to-emerald-500',
      description: 'Autoregressive decoder for generation via next-token prediction',
      useCases: ['Text Generation', 'Chatbots', 'Code Completion'],
      strengths: ['Natural generation', 'Few-shot learning', 'Scales to billions of params'],
      limitations: ['Left-to-right only', 'Slower inference', 'May hallucinate'],
    },
  };

  const config = modelConfigs[modelType];

  return (
    <div className="space-y-6">
      {/* Model Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Architecture Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['transformer', 'bert', 'gpt'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setModelType(type)}
              className={`p-4 rounded-xl border-2 transition-all ${
                modelType === type
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className={`text-lg font-bold bg-gradient-to-r ${modelConfigs[type].color} bg-clip-text text-transparent mb-1`}>
                {type === 'transformer' ? 'Transformer' : type === 'bert' ? 'BERT' : 'GPT'}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {type === 'transformer' ? 'Enc-Dec' : type === 'bert' ? 'Encoder' : 'Decoder'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model Dimension */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Model Dimension (d_model): {dModel}
          </label>
          <input
            type="range"
            min="128"
            max="1024"
            step="128"
            value={dModel}
            onChange={(e) => setDModel(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>128</span>
            <span>1024</span>
          </div>
        </div>

        {/* Number of Heads */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Number of Heads: {numHeads} {dModel % numHeads !== 0 && <span className="text-red-500 text-xs">(⚠️ must divide d_model)</span>}
          </label>
          <input
            type="range"
            min="1"
            max="16"
            step="1"
            value={numHeads}
            onChange={(e) => setNumHeads(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>1</span>
            <span>16</span>
          </div>
        </div>

        {/* Number of Layers */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Number of Layers: {numLayers}
          </label>
          <input
            type="range"
            min="1"
            max="24"
            step="1"
            value={numLayers}
            onChange={(e) => setNumLayers(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>1</span>
            <span>24</span>
          </div>
        </div>

        {/* Feed-Forward Dimension */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Feed-Forward Dimension (d_ff): {dFF}
          </label>
          <input
            type="range"
            min="512"
            max="4096"
            step="512"
            value={dFF}
            onChange={(e) => setDFF(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>512</span>
            <span>4096</span>
          </div>
        </div>

        {/* Vocabulary Size */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Vocabulary Size: {vocabSize.toLocaleString()}
          </label>
          <input
            type="range"
            min="10000"
            max="100000"
            step="10000"
            value={vocabSize}
            onChange={(e) => setVocabSize(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>10K</span>
            <span>100K</span>
          </div>
        </div>

        {/* Max Sequence Length */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Max Sequence Length: {maxSeqLen}
          </label>
          <input
            type="range"
            min="128"
            max="2048"
            step="128"
            value={maxSeqLen}
            onChange={(e) => setMaxSeqLen(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>128</span>
            <span>2048</span>
          </div>
        </div>
      </div>

      {/* Model Statistics */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Model Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {(getParamCount() / 1e6).toFixed(1)}M
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Total Parameters</div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {getMemoryFootprint()} MB
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Memory (FP32)</div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {getFlopsPerToken()}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">FLOPs/Token</div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              O(n²·d)
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Attention Cost</div>
          </div>
        </div>

        {dModel % numHeads !== 0 && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">
              ⚠️ <strong>Invalid Configuration:</strong> d_model ({dModel}) must be divisible by num_heads ({numHeads}).
              Each head will have dimension {dModel}/{numHeads} = {(dModel/numHeads).toFixed(2)}.
            </p>
          </div>
        )}

        {maxSeqLen > 1024 && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ <strong>Long Context Warning:</strong> Sequence lengths &gt;1024 require significant memory
              ({getAttentionComplexity()} attention operations). Consider using efficient attention mechanisms (Flash Attention, Linformer).
            </p>
          </div>
        )}
      </div>

      {/* Architecture Details */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className={`text-xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent mb-2`}>
          {config.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{config.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Use Cases</h4>
            <ul className="space-y-1">
              {config.useCases.map((useCase, idx) => (
                <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                  <span className="mr-2">•</span>
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Strengths</h4>
            <ul className="space-y-1">
              {config.strengths.map((strength, idx) => (
                <li key={idx} className="text-sm text-green-600 dark:text-green-400 flex items-start">
                  <span className="mr-2">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Limitations</h4>
            <ul className="space-y-1">
              {config.limitations.map((limitation, idx) => (
                <li key={idx} className="text-sm text-orange-600 dark:text-orange-400 flex items-start">
                  <span className="mr-2">⚠</span>
                  {limitation}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Attention Visualization */}
        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Multi-Head Attention</h4>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: Math.min(numHeads, 16) }).map((_, idx) => (
              <div
                key={idx}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold"
                title={`Head ${idx + 1}: dimension ${dModel / numHeads}`}
              >
                H{idx + 1}
              </div>
            ))}
            {numHeads > 16 && (
              <div className="w-12 h-12 rounded-lg bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 text-xs">
                +{numHeads - 16}
              </div>
            )}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            Each head attends to different aspects: syntax, semantics, coreference, etc.
            Head dimension: {(dModel / numHeads).toFixed(0)}
          </p>
        </div>
      </div>

      {/* Training Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Training Tips</h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start">
            <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Learning Rate:</strong> Use warmup for first 4000-10000 steps, then cosine/linear decay. Critical for training stability!</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Batch Size:</strong> Larger is better for stability. Use gradient accumulation if GPU memory limited.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Dropout:</strong> 0.1 for base models, 0.3 for large models. Apply to attention, residuals, embeddings.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Mixed Precision:</strong> Use FP16/BF16 to save memory and speed up training (2-3× faster).</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Gradient Clipping:</strong> Max norm 1.0 prevents exploding gradients in deep models.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TransformerPlayground;

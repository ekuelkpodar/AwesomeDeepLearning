import { useState } from 'react';

type ModelType = 'simclr' | 'byol' | 'moco';

interface ModelConfig {
  name: string;
  color: string;
  description: string;
}

const models: Record<ModelType, ModelConfig> = {
  simclr: {
    name: 'SimCLR',
    color: 'blue',
    description: 'Contrastive learning with large batches and strong augmentation'
  },
  byol: {
    name: 'BYOL',
    color: 'purple',
    description: 'Bootstrap learning without negatives using momentum encoder'
  },
  moco: {
    name: 'MoCo',
    color: 'green',
    description: 'Momentum contrast with queue-based dictionary'
  }
};

export default function SelfSupervisedPlayground() {
  const [modelType, setModelType] = useState<ModelType>('simclr');

  // SimCLR parameters
  const [batchSize, setBatchSize] = useState(4096);
  const [temperature, setTemperature] = useState(0.5);
  const [projectionDim, setProjectionDim] = useState(128);

  // BYOL parameters
  const [momentumCoeff, setMomentumCoeff] = useState(0.996);
  const [byolBatchSize, setByolBatchSize] = useState(512);

  // MoCo parameters
  const [queueSize, setQueueSize] = useState(65536);
  const [mocoMomentum, setMocoMomentum] = useState(0.999);
  const [mocoTemperature, setMocoTemperature] = useState(0.07);

  const getParamCount = () => {
    const baseEncoder = 25.6e6; // ResNet-50
    if (modelType === 'simclr') {
      const projector = 2048 * 2048 + 2048 * projectionDim;
      return baseEncoder + projector;
    } else if (modelType === 'byol') {
      const projector = 2048 * 4096 + 4096 * 256;
      const predictor = 256 * 4096 + 4096 * 256;
      const targetEncoder = baseEncoder + projector;
      return baseEncoder + projector + predictor + targetEncoder;
    } else {
      const projector = 2048 * 2048 + 2048 * 128;
      const keyEncoder = baseEncoder + projector;
      return baseEncoder + projector + keyEncoder;
    }
  };

  const getMemoryUsage = () => {
    const params = getParamCount();
    const modelMemory = (params * 4) / (1024 * 1024);

    if (modelType === 'simclr') {
      const activations = (batchSize * 2 * 2048 * 4) / (1024 * 1024);
      const similarityMatrix = (batchSize * 2 * batchSize * 2 * 4) / (1024 * 1024);
      return (modelMemory + activations + similarityMatrix).toFixed(0);
    } else if (modelType === 'byol') {
      const activations = (byolBatchSize * 2 * 2048 * 4) / (1024 * 1024);
      return (modelMemory + activations).toFixed(0);
    } else {
      const queueMemory = (queueSize * 128 * 4) / (1024 * 1024);
      return (modelMemory + queueMemory).toFixed(0);
    }
  };

  const getNegativeSamples = () => {
    if (modelType === 'simclr') {
      return (batchSize * 2 - 2).toLocaleString();
    } else if (modelType === 'byol') {
      return '0 (no negatives!)';
    } else {
      return queueSize.toLocaleString();
    }
  };

  const getTrainingTime = () => {
    if (modelType === 'simclr') {
      const baseTime = 800;
      const batchFactor = 4096 / batchSize;
      return (baseTime * batchFactor).toFixed(0);
    } else if (modelType === 'byol') {
      return '300';
    } else {
      return '200';
    }
  };

  const getKeyFeature = () => {
    if (modelType === 'simclr') {
      return `Temperature τ=${temperature} controls hard negative mining`;
    } else if (modelType === 'byol') {
      return `Momentum τ=${momentumCoeff.toFixed(3)} prevents collapse`;
    } else {
      return `Queue size ${(queueSize / 1000).toFixed(0)}K decouples batch from negatives`;
    }
  };

  const renderModelSpecificControls = () => {
    if (modelType === 'simclr') {
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Batch Size: {batchSize.toLocaleString()}
            </label>
            <input
              type="range"
              min="256"
              max="8192"
              step="256"
              value={batchSize}
              onChange={(e) => setBatchSize(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">Larger = more negatives = better performance</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Temperature (τ): {temperature.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">Lower = focus on hard negatives</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Projection Dim: {projectionDim}
            </label>
            <input
              type="range"
              min="64"
              max="512"
              step="64"
              value={projectionDim}
              onChange={(e) => setProjectionDim(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      );
    } else if (modelType === 'byol') {
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Momentum Coefficient (τ): {momentumCoeff.toFixed(3)}
            </label>
            <input
              type="range"
              min="0.990"
              max="0.999"
              step="0.001"
              value={momentumCoeff}
              onChange={(e) => setMomentumCoeff(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">Higher = slower target update</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Batch Size: {byolBatchSize}
            </label>
            <input
              type="range"
              min="128"
              max="2048"
              step="128"
              value={byolBatchSize}
              onChange={(e) => setByolBatchSize(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">Can be much smaller than SimCLR!</div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Queue Size (K): {(queueSize / 1000).toFixed(0)}K
            </label>
            <input
              type="range"
              min="4096"
              max="131072"
              step="4096"
              value={queueSize}
              onChange={(e) => setQueueSize(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">Stores negatives from past batches</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Momentum (m): {mocoMomentum.toFixed(3)}
            </label>
            <input
              type="range"
              min="0.990"
              max="0.9999"
              step="0.0001"
              value={mocoMomentum}
              onChange={(e) => setMocoMomentum(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">Keeps queue keys consistent</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Temperature (T): {mocoTemperature.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.01"
              max="0.2"
              step="0.01"
              value={mocoTemperature}
              onChange={(e) => setMocoTemperature(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      );
    }
  };

  const renderVisualization = () => {
    if (modelType === 'simclr') {
      return (
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">
              Similarity Matrix ({batchSize * 2} × {batchSize * 2})
            </div>
            <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${Math.min(batchSize / 128, 32)}, minmax(0, 1fr))` }}>
              {Array.from({ length: Math.min((batchSize * 2) / 128, 32) }).map((_, i) =>
                Array.from({ length: Math.min((batchSize * 2) / 128, 32) }).map((_, j) => {
                  const isPositive = (i === j + 16 && i >= 16) || (j === i + 16 && j >= 16);
                  return (
                    <div
                      key={`${i}-${j}`}
                      className={`aspect-square rounded-sm ${
                        isPositive ? 'bg-blue-500' : 'bg-gray-700'
                      }`}
                      style={{ opacity: isPositive ? 1 : 0.2 + Math.random() * 0.3 }}
                    />
                  );
                })
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">Blue = positive pairs, Gray = negatives</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">
              Contrastive Loss Distribution (τ={temperature})
            </div>
            <div className="flex gap-1 items-end h-24">
              {Array.from({ length: 50 }).map((_, i) => {
                const x = (i - 25) / 5;
                const height = Math.exp(-x * x / (2 * temperature)) * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 bg-blue-500 rounded-sm"
                    style={{ height: `${height}%`, opacity: 0.6 + Math.random() * 0.4 }}
                  />
                );
              })}
            </div>
            <div className="text-xs text-gray-500 mt-1">Lower temperature = sharper distribution</div>
          </div>
        </div>
      );
    } else if (modelType === 'byol') {
      return (
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">
              Network Architecture (Online + Target)
            </div>
            <div className="flex gap-4">
              <div className="flex-1 bg-purple-500/20 border-2 border-purple-500 rounded-lg p-4">
                <div className="text-sm font-semibold text-purple-300 mb-2">Online Network</div>
                <div className="space-y-2">
                  <div className="bg-purple-600 rounded p-2 text-xs text-white">Encoder f_θ</div>
                  <div className="bg-purple-600 rounded p-2 text-xs text-white">Projector g_θ</div>
                  <div className="bg-purple-700 rounded p-2 text-xs text-white font-bold">Predictor h_θ ⭐</div>
                </div>
                <div className="text-xs text-gray-400 mt-2">Updated by SGD</div>
              </div>
              <div className="flex items-center">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <div className="flex-1 bg-purple-500/10 border-2 border-purple-400 border-dashed rounded-lg p-4">
                <div className="text-sm font-semibold text-purple-300 mb-2">Target Network</div>
                <div className="space-y-2">
                  <div className="bg-purple-500/50 rounded p-2 text-xs text-white">Encoder f_ξ</div>
                  <div className="bg-purple-500/50 rounded p-2 text-xs text-white">Projector g_ξ</div>
                  <div className="bg-gray-700 rounded p-2 text-xs text-gray-500">No predictor</div>
                </div>
                <div className="text-xs text-gray-400 mt-2">Momentum update (τ={momentumCoeff.toFixed(3)})</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">
              Momentum Update Schedule
            </div>
            <div className="relative h-20 bg-gray-800 rounded">
              <svg className="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
                <path
                  d="M 0,60 Q 100,58 200,50 T 400,10"
                  fill="none"
                  stroke="rgb(168, 85, 247)"
                  strokeWidth="2"
                />
              </svg>
              <div className="absolute bottom-2 left-2 text-xs text-gray-400">τ = 0.996</div>
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">τ → 1.0</div>
              <div className="absolute top-2 left-2 text-xs text-purple-400">Cosine schedule</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">
              Queue-Based Dictionary (FIFO)
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-xs text-green-400 font-semibold">Query Encoder (SGD)</div>
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="text-xs text-gray-400">Backprop</div>
              </div>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-12 rounded ${
                      i < 5 ? 'bg-green-500' : 'bg-gray-700'
                    }`}
                    style={{ opacity: i < 5 ? 1 : 0.3 + Math.random() * 0.4 }}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-500 mb-3">
                Green = new keys (enqueued), Gray = old negatives (queue)
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-green-400 font-semibold">Key Encoder (Momentum)</div>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                <div className="text-xs text-gray-400">No backprop</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">
              Queue Size Effect ({(queueSize / 1000).toFixed(0)}K negatives)
            </div>
            <div className="flex gap-2 items-end h-24">
              {[4096, 16384, 32768, 65536, 131072].map((size) => {
                const height = Math.min((size / 131072) * 100, 100);
                const accuracy = 60 + (size / 131072) * 15;
                return (
                  <div key={size} className="flex-1">
                    <div
                      className={`bg-green-500 rounded-t ${
                        size === queueSize ? 'opacity-100 ring-2 ring-green-400' : 'opacity-50'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs text-center text-gray-400 mt-1">
                      {size / 1000}K
                    </div>
                    <div className="text-xs text-center text-green-400">
                      {accuracy.toFixed(0)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
      {/* Model Selection */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Select Self-Supervised Model</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(models) as ModelType[]).map((type) => {
            const model = models[type];
            return (
              <button
                key={type}
                onClick={() => setModelType(type)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  modelType === type
                    ? `border-${model.color}-500 bg-${model.color}-500/10`
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="mb-2">
                  <span className="font-medium text-white">{model.name}</span>
                </div>
                <p className="text-sm text-gray-400">{model.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Model Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-white">Model Parameters</h4>
          {renderModelSpecificControls()}
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <h4 className="font-medium text-white">Computed Metrics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-400">Parameters</div>
              <div className="text-2xl font-bold text-white">{(getParamCount() / 1e6).toFixed(1)}M</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-400">Memory</div>
              <div className="text-2xl font-bold text-white">{getMemoryUsage()} MB</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-400">Negatives</div>
              <div className="text-lg font-bold text-white">{getNegativeSamples()}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-400">Training (epochs)</div>
              <div className="text-2xl font-bold text-white">{getTrainingTime()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div>
        <h4 className="font-medium text-white mb-4">Architecture Visualization</h4>
        {renderVisualization()}
      </div>

      {/* Key Feature */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <div className="font-medium text-white mb-1">Key Feature</div>
            <p className="text-sm text-gray-300">{getKeyFeature()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

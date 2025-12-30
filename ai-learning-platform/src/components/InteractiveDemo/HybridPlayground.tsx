import { useState } from 'react';

type ModelType = 'ntm' | 'capsnet' | 'neural_ode';

interface ModelConfig {
  name: string;
  color: string;
  description: string;
}

const models: Record<ModelType, ModelConfig> = {
  ntm: {
    name: 'Neural Turing Machine',
    color: 'purple',
    description: 'Differentiable external memory with content & location addressing'
  },
  capsnet: {
    name: 'Capsule Network',
    color: 'blue',
    description: 'Dynamic routing between capsules encoding part-whole hierarchies'
  },
  neural_ode: {
    name: 'Neural ODE',
    color: 'green',
    description: 'Continuous-depth network with ODE dynamics and adjoint backprop'
  }
};

export default function HybridPlayground() {
  const [modelType, setModelType] = useState<ModelType>('ntm');

  // NTM parameters
  const [memorySize, setMemorySize] = useState(128);
  const [memoryWidth, setMemoryWidth] = useState(20);
  const [numHeads, setNumHeads] = useState(1);

  // CapsNet parameters
  const [numCapsules, setNumCapsules] = useState(10);
  const [capsuleDim, setCapsuleDim] = useState(16);
  const [routingIterations, setRoutingIterations] = useState(3);

  // Neural ODE parameters
  const [hiddenDim, setHiddenDim] = useState(64);
  const [tolerance, setTolerance] = useState(0.001);
  const [integrationTime, setIntegrationTime] = useState(1.0);

  const getParamCount = () => {
    if (modelType === 'ntm') {
      const controllerParams = 256 * 128 + 128 * 128;
      const headParams = numHeads * (memoryWidth * 5 + 10);
      const memoryParams = memorySize * memoryWidth;
      return controllerParams + headParams + memoryParams;
    } else if (modelType === 'capsnet') {
      const primaryCaps = 1152 * 8;
      const digitCaps = numCapsules * 1152 * capsuleDim * 8;
      const decoder = capsuleDim * 512 + 512 * 1024 + 1024 * 784;
      return primaryCaps + digitCaps + decoder;
    } else {
      const layer1 = hiddenDim * 128 + 128;
      const layer2 = 128 * 128 + 128;
      const layer3 = 128 * hiddenDim + hiddenDim;
      return layer1 + layer2 + layer3;
    }
  };

  const getMemoryUsage = () => {
    const params = getParamCount();
    const modelMemory = (params * 4) / (1024 * 1024);

    if (modelType === 'ntm') {
      const externalMemory = (memorySize * memoryWidth * 4) / (1024 * 1024);
      const readVectors = (numHeads * memoryWidth * 4) / (1024 * 1024);
      return (modelMemory + externalMemory + readVectors).toFixed(1);
    } else if (modelType === 'capsnet') {
      const routingBuffer = (numCapsules * 1152 * 4) / (1024 * 1024);
      return (modelMemory + routingBuffer).toFixed(1);
    } else {
      const stateBuffer = (hiddenDim * 4 * 50) / (1024 * 1024);
      return (modelMemory + stateBuffer).toFixed(1);
    }
  };

  const getTrainingTime = () => {
    if (modelType === 'ntm') {
      const baseTime = 3;
      const memoryFactor = (memorySize / 128) * (memoryWidth / 20);
      const headFactor = numHeads;
      return (baseTime * memoryFactor * headFactor).toFixed(1);
    } else if (modelType === 'capsnet') {
      const baseTime = 2;
      const capsuleFactor = (numCapsules / 10) * (capsuleDim / 16);
      const routingFactor = routingIterations / 3;
      return (baseTime * capsuleFactor * routingFactor).toFixed(1);
    } else {
      const baseTime = 2.5;
      const nfeFactor = tolerance <= 0.0001 ? 3 : tolerance <= 0.001 ? 2 : 1;
      const timeFactor = integrationTime;
      return (baseTime * nfeFactor * timeFactor).toFixed(1);
    }
  };

  const getUniqueFeature = () => {
    if (modelType === 'ntm') {
      const addressingOps = memorySize * numHeads;
      return `${addressingOps.toLocaleString()} addressing ops/step`;
    } else if (modelType === 'capsnet') {
      const agreements = numCapsules * 1152 * routingIterations;
      return `${(agreements / 1e6).toFixed(2)}M agreements`;
    } else {
      const estimatedNFE = tolerance <= 0.0001 ? 150 : tolerance <= 0.001 ? 100 : 50;
      return `~${estimatedNFE} NFE (function evals)`;
    }
  };

  const getKeyAdvantage = () => {
    if (modelType === 'ntm') {
      return 'Differentiable memory enables algorithmic reasoning (copy, sort, associative recall)';
    } else if (modelType === 'capsnet') {
      return 'Viewpoint equivariance: generalizes across rotations without augmentation';
    } else {
      return 'Memory-efficient backprop via adjoint method: O(1) memory regardless of depth';
    }
  };

  const renderModelSpecificControls = () => {
    if (modelType === 'ntm') {
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Memory Size (N): {memorySize}
            </label>
            <input
              type="range"
              min="32"
              max="512"
              step="32"
              value={memorySize}
              onChange={(e) => setMemorySize(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Memory Width (M): {memoryWidth}
            </label>
            <input
              type="range"
              min="10"
              max="128"
              step="10"
              value={memoryWidth}
              onChange={(e) => setMemoryWidth(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Read/Write Heads: {numHeads}
            </label>
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              value={numHeads}
              onChange={(e) => setNumHeads(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      );
    } else if (modelType === 'capsnet') {
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Digit Capsules: {numCapsules}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              value={numCapsules}
              onChange={(e) => setNumCapsules(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Capsule Dimension: {capsuleDim}
            </label>
            <input
              type="range"
              min="8"
              max="32"
              step="8"
              value={capsuleDim}
              onChange={(e) => setCapsuleDim(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Routing Iterations: {routingIterations}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={routingIterations}
              onChange={(e) => setRoutingIterations(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hidden Dimension: {hiddenDim}
            </label>
            <input
              type="range"
              min="32"
              max="256"
              step="32"
              value={hiddenDim}
              onChange={(e) => setHiddenDim(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tolerance: {tolerance.toExponential(1)}
            </label>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={-Math.log10(tolerance) * 10}
              onChange={(e) => setTolerance(Math.pow(10, -Number(e.target.value) / 10))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Integration Time: {integrationTime.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.1"
              value={integrationTime}
              onChange={(e) => setIntegrationTime(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      );
    }
  };

  const renderVisualization = () => {
    if (modelType === 'ntm') {
      return (
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">Memory Matrix ({memorySize} × {memoryWidth})</div>
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(memoryWidth, 20)}, minmax(0, 1fr))` }}>
              {Array.from({ length: Math.min(memorySize, 10) }).map((_, i) =>
                Array.from({ length: Math.min(memoryWidth, 20) }).map((_, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="aspect-square bg-purple-500/20 rounded-sm"
                    style={{ opacity: 0.3 + Math.random() * 0.5 }}
                  />
                ))
              )}
            </div>
            {memorySize > 10 && <div className="text-xs text-gray-500 mt-1">Showing first 10/{memorySize} rows</div>}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">Attention Weights (Head {numHeads})</div>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(memorySize, 40) }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-purple-500 rounded-sm"
                  style={{ height: `${20 + Math.random() * 60}px`, opacity: 0.4 + Math.random() * 0.6 }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    } else if (modelType === 'capsnet') {
      return (
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">Capsule Activations (length = probability)</div>
            <div className="flex gap-2">
              {Array.from({ length: numCapsules }).map((_, i) => (
                <div key={i} className="flex-1">
                  <div className="h-32 bg-gray-700 rounded relative overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full bg-blue-500"
                      style={{ height: `${30 + Math.random() * 70}%` }}
                    />
                  </div>
                  <div className="text-xs text-center mt-1 text-gray-400">{i}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">Routing Coefficients (iteration {routingIterations})</div>
            <div className="grid grid-cols-10 gap-1">
              {Array.from({ length: Math.min(numCapsules * 10, 100) }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-blue-500 rounded-sm"
                  style={{ opacity: 0.2 + Math.random() * 0.6 }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      const nfeEstimate = tolerance <= 0.0001 ? 150 : tolerance <= 0.001 ? 100 : 50;
      return (
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">ODE Trajectory (h(t) over time)</div>
            <div className="relative h-40 bg-gray-800 rounded">
              <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                <path
                  d={`M 0,80 Q 100,${60 + Math.random() * 40} 200,${70 + Math.random() * 20} T 400,${75 + Math.random() * 10}`}
                  fill="none"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="2"
                />
                <path
                  d={`M 0,80 Q 100,${100 + Math.random() * 40} 200,${90 + Math.random() * 20} T 400,${85 + Math.random() * 10}`}
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                />
              </svg>
              <div className="absolute bottom-2 left-2 text-xs text-gray-400">t = 0</div>
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">t = {integrationTime}</div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-300 mb-2">Adaptive Step Sizes (NFE ≈ {nfeEstimate})</div>
            <div className="flex gap-1 items-end h-20">
              {Array.from({ length: Math.min(nfeEstimate, 50) }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-green-500 rounded-sm"
                  style={{ height: `${30 + Math.random() * 70}%`, opacity: 0.5 + Math.random() * 0.5 }}
                />
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-1">Lower tolerance → more steps → higher accuracy</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
      {/* Model Selection */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Select Hybrid/Specialized Model</h3>
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
              <div className="text-2xl font-bold text-white">{(getParamCount() / 1e6).toFixed(2)}M</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-400">Memory Usage</div>
              <div className="text-2xl font-bold text-white">{getMemoryUsage()} MB</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-400">Training Time</div>
              <div className="text-2xl font-bold text-white">{getTrainingTime()}h</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-400">Unique Metric</div>
              <div className="text-lg font-bold text-white">{getUniqueFeature()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div>
        <h4 className="font-medium text-white mb-4">Architecture Visualization</h4>
        {renderVisualization()}
      </div>

      {/* Key Advantage */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/20">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <div className="font-medium text-white mb-1">Key Advantage</div>
            <p className="text-sm text-gray-300">{getKeyAdvantage()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

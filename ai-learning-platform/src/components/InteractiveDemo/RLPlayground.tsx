import { useState } from 'react';

type RLType = 'dqn' | 'ppo' | 'a3c';

export default function RLPlayground() {
  const [rlType, setRlType] = useState<RLType>('dqn');
  const [hiddenDim, setHiddenDim] = useState(512);
  const [numLayers, setNumLayers] = useState(3);
  const [envComplexity, setEnvComplexity] = useState<'simple' | 'atari' | 'continuous'>('atari');

  // DQN-specific
  const [bufferSize, setBufferSize] = useState(1000000);
  const [targetUpdateFreq, setTargetUpdateFreq] = useState(10000);

  // PPO-specific
  const [numEpochs, setNumEpochs] = useState(10);
  const [batchSize, setBatchSize] = useState(64);
  const [gaeLambda, setGaeLambda] = useState(0.95);

  // A3C-specific
  const [numWorkers, setNumWorkers] = useState(16);
  const [nStep, setNStep] = useState(5);

  const getInputShape = () => {
    if (envComplexity === 'simple') return [4]; // CartPole state
    if (envComplexity === 'atari') return [4, 84, 84]; // Stacked frames
    return [17]; // MuJoCo HalfCheetah
  };

  const getOutputShape = () => {
    if (envComplexity === 'simple') return 2; // Left/Right
    if (envComplexity === 'atari') return 18; // Atari actions
    return 6; // Continuous actions
  };

  const getParamCount = () => {
    const inputShape = getInputShape();
    const outputShape = getOutputShape();
    let params = 0;

    if (rlType === 'dqn') {
      if (envComplexity === 'atari') {
        // Conv layers
        params += 4 * 32 * 8 * 8 + 32; // Conv1
        params += 32 * 64 * 4 * 4 + 64; // Conv2
        params += 64 * 64 * 3 * 3 + 64; // Conv3
        const convOut = 3136; // 7×7×64

        // FC layers
        params += convOut * hiddenDim + hiddenDim;
        params += hiddenDim * outputShape + outputShape;
      } else {
        // Simple MLP
        const input = Array.isArray(inputShape) ? inputShape[0] : inputShape;
        params += input * hiddenDim + hiddenDim;
        for (let i = 1; i < numLayers - 1; i++) {
          params += hiddenDim * hiddenDim + hiddenDim;
        }
        params += hiddenDim * outputShape + outputShape;
      }

      // Target network (same size)
      params *= 2;
    } else if (rlType === 'ppo') {
      // Shared network
      const input = Array.isArray(inputShape) ? (inputShape.length > 1 ? 3136 : inputShape[0]) : inputShape;
      params += input * hiddenDim + hiddenDim;
      params += hiddenDim * hiddenDim + hiddenDim;

      // Actor head
      params += hiddenDim * outputShape + outputShape;

      // Critic head
      params += hiddenDim * 1 + 1;
    } else { // a3c
      if (envComplexity === 'atari') {
        // Conv layers
        params += 4 * 16 * 8 * 8 + 16;
        params += 16 * 32 * 4 * 4 + 32;
        const convOut = 2560;

        // LSTM
        params += 4 * 256 * (convOut + 256 + 1);

        // Actor + Critic heads
        params += 256 * outputShape + outputShape;
        params += 256 * 1 + 1;
      } else {
        const input = Array.isArray(inputShape) ? inputShape[0] : inputShape;
        params += input * hiddenDim + hiddenDim;
        params += hiddenDim * hiddenDim + hiddenDim;
        params += hiddenDim * outputShape + outputShape;
        params += hiddenDim * 1 + 1;
      }

      // Multiply by workers (each has copy)
      params *= (numWorkers + 1); // Workers + global
    }

    return params;
  };

  const getMemoryUsage = () => {
    const modelMemory = (getParamCount() * 4) / (1024 * 1024); // fp32 in MB

    if (rlType === 'dqn') {
      // Replay buffer: (state, action, reward, next_state, done)
      const stateSize = envComplexity === 'atari' ? 4 * 84 * 84 : 4;
      const transitionSize = stateSize * 2 + 3; // 2 states + action + reward + done
      const bufferMemory = (bufferSize * transitionSize * 4) / (1024 * 1024);
      return (modelMemory + bufferMemory).toFixed(0);
    } else if (rlType === 'ppo') {
      // Rollout buffer: much smaller (2048-4096 transitions)
      const rolloutSize = batchSize * numEpochs;
      const bufferMemory = (rolloutSize * 100 * 4) / (1024 * 1024); // Estimate
      return (modelMemory + bufferMemory).toFixed(0);
    } else { // a3c
      // No replay buffer, just model copies
      return modelMemory.toFixed(0);
    }
  };

  const getTrainingTime = () => {
    if (rlType === 'dqn') {
      return envComplexity === 'atari' ? '8-12 hours' : '30-60 min';
    } else if (rlType === 'ppo') {
      return envComplexity === 'continuous' ? '2-4 hours' : envComplexity === 'atari' ? '6-10 hours' : '20-40 min';
    } else { // a3c
      return envComplexity === 'atari' ? `1 day (${numWorkers} workers)` : '2-4 hours';
    }
  };

  const getSampleEfficiency = () => {
    if (rlType === 'dqn') return 'Moderate (replay buffer reuse)';
    if (rlType === 'ppo') return `High (${numEpochs}× reuse per batch)`;
    return 'Low (on-policy, no reuse)';
  };

  const rlTypes: Array<{ type: RLType; name: string; color: string; description: string }> = [
    {
      type: 'dqn',
      name: 'DQN',
      color: 'from-blue-500 to-cyan-500',
      description: 'Value-based with experience replay',
    },
    {
      type: 'ppo',
      name: 'PPO',
      color: 'from-purple-500 to-pink-500',
      description: 'Policy gradient with clipped objective',
    },
    {
      type: 'a3c',
      name: 'A3C',
      color: 'from-green-500 to-emerald-500',
      description: 'Asynchronous actor-critic',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Reinforcement Learning Playground
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Compare RL algorithms and explore their trade-offs
        </p>
      </div>

      {/* RL Type Selection */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          RL Algorithm
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rlTypes.map((model) => (
            <button
              key={model.type}
              onClick={() => setRlType(model.type)}
              className={`p-4 rounded-lg border-2 transition-all ${
                rlType === model.type
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

      {/* Environment Complexity */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Environment Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'simple', label: 'Simple (CartPole)' },
            { value: 'atari', label: 'Atari (Vision)' },
            { value: 'continuous', label: 'Continuous (MuJoCo)' },
          ].map((env) => (
            <button
              key={env.value}
              onClick={() => setEnvComplexity(env.value as any)}
              className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                envComplexity === env.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {env.label}
            </button>
          ))}
        </div>
      </div>

      {/* Common Parameters */}
      <div className="space-y-6 mb-8">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Hidden Dimension
            </label>
            <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{hiddenDim}</span>
          </div>
          <input
            type="range"
            min="128"
            max="1024"
            step="128"
            value={hiddenDim}
            onChange={(e) => setHiddenDim(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Network capacity (larger = more expressive, slower)
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Number of Layers
            </label>
            <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{numLayers}</span>
          </div>
          <input
            type="range"
            min="2"
            max="5"
            step="1"
            value={numLayers}
            onChange={(e) => setNumLayers(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Network depth (deeper = more complex patterns)
          </p>
        </div>

        {/* DQN-specific parameters */}
        {rlType === 'dqn' && (
          <>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Replay Buffer Size
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{(bufferSize / 1000).toFixed(0)}K</span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={bufferSize}
                onChange={(e) => setBufferSize(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Experience replay capacity (larger = more decorrelation, more memory)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Target Network Update Freq
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{(targetUpdateFreq / 1000).toFixed(0)}K steps</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={targetUpdateFreq}
                onChange={(e) => setTargetUpdateFreq(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                How often to sync target network (higher = more stable, slower learning)
              </p>
            </div>
          </>
        )}

        {/* PPO-specific parameters */}
        {rlType === 'ppo' && (
          <>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Training Epochs per Batch
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{numEpochs}</span>
              </div>
              <input
                type="range"
                min="3"
                max="20"
                step="1"
                value={numEpochs}
                onChange={(e) => setNumEpochs(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Reuse same data for better sample efficiency (3-10 typical)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Minibatch Size
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{batchSize}</span>
              </div>
              <input
                type="range"
                min="32"
                max="256"
                step="32"
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Batch size for gradient updates
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  GAE Lambda (λ)
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{gaeLambda.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.9"
                max="0.99"
                step="0.01"
                value={gaeLambda}
                onChange={(e) => setGaeLambda(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Advantage estimation bias-variance trade-off (0.95 typical)
              </p>
            </div>
          </>
        )}

        {/* A3C-specific parameters */}
        {rlType === 'a3c' && (
          <>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Number of Workers
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{numWorkers}</span>
              </div>
              <input
                type="range"
                min="4"
                max="32"
                step="4"
                value={numWorkers}
                onChange={(e) => setNumWorkers(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Parallel agents for asynchronous training (use CPU core count)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  N-Step Return
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{nStep}</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={nStep}
                onChange={(e) => setNStep(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Steps for return computation (5-20, balances bias-variance)
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
            {(getParamCount() / 1_000_000).toFixed(1)}M
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Memory: ~{getMemoryUsage()} MB
          </div>
        </div>

        <div className="bg-green-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Training Time</div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {getTrainingTime()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            On GPU ({envComplexity === 'simple' ? '50K' : envComplexity === 'atari' ? '50M' : '1M'} steps)
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Sample Efficiency</div>
          <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
            {getSampleEfficiency()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {rlType === 'dqn' && 'Experience replay enables reuse'}
            {rlType === 'ppo' && `${numEpochs}× data reuse per batch`}
            {rlType === 'a3c' && 'On-policy, fresh data each step'}
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Key Strength</div>
          <div className="text-sm font-semibold text-orange-600 dark:text-orange-400">
            {rlType === 'dqn' && 'Stable, proven on Atari'}
            {rlType === 'ppo' && 'Versatile, industry standard'}
            {rlType === 'a3c' && `Fast wall-clock (${numWorkers}× parallel)`}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {rlType === 'dqn' && 'Off-policy, discrete actions'}
            {rlType === 'ppo' && 'Continuous control, RLHF'}
            {rlType === 'a3c' && 'CPU-friendly, no replay buffer'}
          </div>
        </div>
      </div>

      {/* Algorithm Flow */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/30 dark:to-slate-800/30 rounded-lg p-6">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Algorithm Flow
        </h4>

        {rlType === 'dqn' && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded font-mono text-blue-700 dark:text-blue-300">
                State (s)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-cyan-100 dark:bg-cyan-900/30 px-3 py-1 rounded font-mono text-cyan-700 dark:text-cyan-300">
                Q(s,a) for all a
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded font-mono text-purple-700 dark:text-purple-300">
                a = argmax Q(s,·)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded font-mono text-green-700 dark:text-green-300">
                Store in replay
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p>Sample minibatch → compute target y = r + γ max Q̂(s',a') → train Q-network</p>
              <p>Update target network every {(targetUpdateFreq / 1000).toFixed(0)}K steps. Buffer size: {(bufferSize / 1000).toFixed(0)}K transitions.</p>
            </div>
          </div>
        )}

        {rlType === 'ppo' && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded font-mono text-purple-700 dark:text-purple-300">
                Collect {batchSize}×{numEpochs} steps
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-pink-100 dark:bg-pink-900/30 px-3 py-1 rounded font-mono text-pink-700 dark:text-pink-300">
                Compute GAE(λ={gaeLambda})
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded font-mono text-blue-700 dark:text-blue-300">
                Train {numEpochs} epochs
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p>Clip ratio r = π_new/π_old to [0.8, 1.2]. Prevents large policy changes.</p>
              <p>{numEpochs}× reuse of same data via clipped objective. Sample-efficient!</p>
            </div>
          </div>
        )}

        {rlType === 'a3c' && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded font-mono text-green-700 dark:text-green-300">
                {numWorkers} workers
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded font-mono text-emerald-700 dark:text-emerald-300">
                Each: {nStep}-step rollout
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded font-mono text-blue-700 dark:text-blue-300">
                Async update global
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded font-mono text-purple-700 dark:text-purple-300">
                Sync local
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <p>Workers update global network asynchronously (no waiting). Natural decorrelation.</p>
              <p>N-step return: R = Σ γ^k r_k + γ^{nStep} V(s_{nStep}). Balances bias-variance.</p>
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
          {rlType === 'dqn' && (
            <>
              <li>• Start training after buffer has {(bufferSize * 0.05 / 1000).toFixed(0)}K transitions (5% full) for diversity</li>
              <li>• Use Huber loss (smooth L1) instead of MSE for robustness to outliers</li>
              <li>• Clip rewards to [-1, 1] for Atari to normalize across games</li>
              <li>• ε-greedy: anneal 1.0 → 0.1 over 1M steps for exploration</li>
            </>
          )}
          {rlType === 'ppo' && (
            <>
              <li>• Use {numEpochs} epochs but monitor KL divergence—stop if KL &gt; 0.015 (policy changed too much)</li>
              <li>• Normalize advantages: (A - mean(A)) / std(A) for stable gradients</li>
              <li>• Add entropy bonus (coef=0.01) to prevent premature convergence</li>
              <li>• Use parallel environments (8-16) for faster data collection</li>
            </>
          )}
          {rlType === 'a3c' && (
            <>
              <li>• Use {numWorkers} workers = number of CPU cores for best parallelism</li>
              <li>• Clip gradients (max_norm=40) to prevent instability with asynchronous updates</li>
              <li>• N-step={nStep}: lower for stable tasks, higher (10-20) for complex environments</li>
              <li>• Use A2C (synchronous) for GPU training—more sample-efficient</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

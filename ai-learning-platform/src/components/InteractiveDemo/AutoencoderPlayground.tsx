import { useState } from 'react';

const AutoencoderPlayground = () => {
  const [aeType, setAeType] = useState<'vanilla' | 'vae' | 'denoising'>('vanilla');
  const [inputDim, setInputDim] = useState(784); // MNIST default
  const [latentDim, setLatentDim] = useState(32);
  const [hiddenDim, setHiddenDim] = useState(256);
  const [numLayers, setNumLayers] = useState(2);
  const [noiseLevel, setNoiseLevel] = useState(0.3);
  const [betaVAE, setBetaVAE] = useState(1.0);

  const getParamCount = () => {
    let params = 0;

    // Encoder path
    params += inputDim * hiddenDim + hiddenDim; // First layer
    for (let i = 1; i < numLayers - 1; i++) {
      params += hiddenDim * hiddenDim + hiddenDim;
    }

    if (aeType === 'vae') {
      // VAE: two outputs (mu and logvar)
      params += (hiddenDim * latentDim + latentDim) * 2;
    } else {
      params += hiddenDim * latentDim + latentDim;
    }

    // Decoder path
    params += latentDim * hiddenDim + hiddenDim;
    for (let i = 1; i < numLayers - 1; i++) {
      params += hiddenDim * hiddenDim + hiddenDim;
    }
    params += hiddenDim * inputDim + inputDim; // Output layer

    return params;
  };

  const getCompressionRatio = () => {
    return (inputDim / latentDim).toFixed(1);
  };

  const getMemoryFootprint = () => {
    const params = getParamCount();
    const megabytes = (params * 4) / (1024 * 1024); // fp32
    return megabytes.toFixed(1);
  };

  const getReconstructionQuality = () => {
    // Simulated based on latent dim
    const ratio = latentDim / inputDim;
    if (ratio > 0.5) return 'Excellent';
    if (ratio > 0.2) return 'Good';
    if (ratio > 0.05) return 'Fair';
    return 'Poor';
  };

  const aeConfigs = {
    vanilla: {
      name: 'Vanilla Autoencoder',
      color: 'from-blue-500 to-cyan-500',
      description: 'Deterministic compression and reconstruction via bottleneck layer',
      useCases: ['Dimensionality Reduction', 'Feature Learning', 'Anomaly Detection'],
      strengths: ['Simple to train', 'Fast inference', 'Good for compression'],
      limitations: ['Cannot generate new samples', 'May overfit to training data', 'Blurry reconstructions'],
    },
    vae: {
      name: 'Variational Autoencoder (VAE)',
      color: 'from-purple-500 to-pink-500',
      description: 'Probabilistic model that learns distribution over latent codes',
      useCases: ['Image Generation', 'Drug Discovery', 'Data Augmentation'],
      strengths: ['Can generate new samples', 'Smooth latent space', 'Probabilistic framework'],
      limitations: ['Blurrier than GANs', 'Posterior collapse risk', 'Slower training'],
    },
    denoising: {
      name: 'Denoising Autoencoder',
      color: 'from-green-500 to-emerald-500',
      description: 'Learns robust features by reconstructing clean data from corrupted input',
      useCases: ['Image Denoising', 'Feature Learning', 'Inpainting'],
      strengths: ['Robust features', 'Works with noisy data', 'Better generalization'],
      limitations: ['Needs corruption strategy', 'Slower training', 'May over-smooth'],
    },
  };

  const config = aeConfigs[aeType];

  return (
    <div className="space-y-6">
      {/* Architecture Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Autoencoder Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['vanilla', 'vae', 'denoising'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setAeType(type)}
              className={`p-4 rounded-xl border-2 transition-all ${
                aeType === type
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className={`text-lg font-bold bg-gradient-to-r ${aeConfigs[type].color} bg-clip-text text-transparent mb-1`}>
                {type === 'vanilla' ? 'Vanilla' : type === 'vae' ? 'VAE' : 'Denoising'}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {type === 'vanilla' ? 'Deterministic' : type === 'vae' ? 'Probabilistic' : 'Robust'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Dimension */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Input Dimension: {inputDim}
          </label>
          <input
            type="range"
            min="100"
            max="4096"
            step="100"
            value={inputDim}
            onChange={(e) => setInputDim(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>100</span>
            <span>4096</span>
          </div>
        </div>

        {/* Latent Dimension */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Latent Dimension: {latentDim} (Compression: {getCompressionRatio()}×)
          </label>
          <input
            type="range"
            min="2"
            max="512"
            step="2"
            value={latentDim}
            onChange={(e) => setLatentDim(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>2</span>
            <span>512</span>
          </div>
        </div>

        {/* Hidden Dimension */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Hidden Layer Size: {hiddenDim}
          </label>
          <input
            type="range"
            min="64"
            max="1024"
            step="64"
            value={hiddenDim}
            onChange={(e) => setHiddenDim(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>64</span>
            <span>1024</span>
          </div>
        </div>

        {/* Number of Layers */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Encoder/Decoder Layers: {numLayers}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={numLayers}
            onChange={(e) => setNumLayers(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>1</span>
            <span>5</span>
          </div>
        </div>

        {/* VAE-specific: Beta */}
        {aeType === 'vae' && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              β (KL Weight): {betaVAE.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={betaVAE}
              onChange={(e) => setBetaVAE(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>0.1 (Sharp)</span>
              <span>10 (Disentangled)</span>
            </div>
          </div>
        )}

        {/* Denoising-specific: Noise Level */}
        {aeType === 'denoising' && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Noise Level: {(noiseLevel * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={noiseLevel}
              onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>10%</span>
              <span>90%</span>
            </div>
          </div>
        )}
      </div>

      {/* Model Statistics */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Model Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {(getParamCount() / 1e6).toFixed(2)}M
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Parameters</div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {getMemoryFootprint()} MB
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Memory (FP32)</div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {getCompressionRatio()}×
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Compression</div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {getReconstructionQuality()}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Est. Quality</div>
          </div>
        </div>

        {latentDim < 8 && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ <strong>Very Low Latent Dimension:</strong> {latentDim} dimensions may not capture enough information for good reconstruction.
              {aeType === 'vae' && ' VAE generation quality will be limited.'}
            </p>
          </div>
        )}

        {latentDim > inputDim / 2 && (
          <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <p className="text-sm text-orange-800 dark:text-orange-200">
              ⚠️ <strong>Minimal Compression:</strong> Latent dimension ({latentDim}) is more than 50% of input ({inputDim}).
              Consider reducing for better feature learning.
            </p>
          </div>
        )}

        {aeType === 'vae' && betaVAE > 5 && (
          <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <p className="text-sm text-purple-800 dark:text-purple-200">
              💡 <strong>High β ({betaVAE}):</strong> Encourages disentangled representations but may sacrifice reconstruction quality.
              Good for controllable generation!
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

        {/* Architecture Visualization */}
        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Architecture Flow</h4>
          <div className="flex items-center justify-between text-xs">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold mb-1">
                {inputDim}
              </div>
              <span className="text-slate-600 dark:text-slate-400">Input</span>
            </div>
            <div className="flex-1 mx-2 border-t-2 border-dashed border-slate-300 dark:border-slate-600"></div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mb-1">
                {hiddenDim}
              </div>
              <span className="text-slate-600 dark:text-slate-400">Hidden</span>
            </div>
            <div className="flex-1 mx-2 border-t-2 border-dashed border-slate-300 dark:border-slate-600"></div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold mb-1">
                {latentDim}
              </div>
              <span className="text-slate-600 dark:text-slate-400">Latent</span>
            </div>
            <div className="flex-1 mx-2 border-t-2 border-dashed border-slate-300 dark:border-slate-600"></div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mb-1">
                {hiddenDim}
              </div>
              <span className="text-slate-600 dark:text-slate-400">Hidden</span>
            </div>
            <div className="flex-1 mx-2 border-t-2 border-dashed border-slate-300 dark:border-slate-600"></div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold mb-1">
                {inputDim}
              </div>
              <span className="text-slate-600 dark:text-slate-400">Output</span>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 text-center">
            Encoder compresses {inputDim} → {latentDim}, Decoder reconstructs {latentDim} → {inputDim}
          </p>
        </div>
      </div>

      {/* Training Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Training Tips</h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start">
            <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Loss Function:</strong> Use MSE for continuous data, BCE for binary/normalized images. Consider perceptual loss for sharper reconstructions.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Regularization:</strong> {aeType === 'vae' ? 'β controls trade-off between reconstruction and disentanglement. Start with β=1.' : aeType === 'denoising' ? 'Noise level of 0.3 is a good starting point. Match expected test corruption.' : 'Add L1/L2 on latent codes for sparsity, or contractive regularization.'}</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Initialization:</strong> Use Xavier/He initialization. Batch normalization helps with deep autoencoders.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Learning Rate:</strong> Adam with LR=1e-3 is standard. Reduce to 1e-4 if training unstable. Use LR scheduling.</span>
          </li>
          {aeType === 'vae' && (
            <li className="flex items-start">
              <span className="mr-2 text-purple-600 dark:text-purple-400">•</span>
              <span><strong>KL Annealing:</strong> Start β=0, gradually increase to final value over 10-20 epochs to prevent posterior collapse.</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AutoencoderPlayground;

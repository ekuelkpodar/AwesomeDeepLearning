import { useState } from 'react';

type ModelType = 'gan' | 'diffusion' | 'stylegan';

export default function GenerativeModelsPlayground() {
  const [modelType, setModelType] = useState<ModelType>('gan');
  const [latentDim, setLatentDim] = useState(100);
  const [hiddenDim, setHiddenDim] = useState(512);
  const [numLayers, setNumLayers] = useState(3);

  // Diffusion-specific
  const [timesteps, setTimesteps] = useState(1000);
  const [samplingSteps, setSamplingSteps] = useState(50);

  // StyleGAN-specific
  const [mappingLayers, setMappingLayers] = useState(8);
  const [targetResolution, setTargetResolution] = useState(256);

  const getParamCount = () => {
    const imgSize = modelType === 'stylegan' ? targetResolution : 64;
    const imgDim = imgSize * imgSize * 3;

    if (modelType === 'gan') {
      // Generator parameters
      let genParams = latentDim * hiddenDim + hiddenDim; // First layer
      for (let i = 1; i < numLayers; i++) {
        genParams += hiddenDim * hiddenDim + hiddenDim;
      }
      genParams += hiddenDim * imgDim + imgDim; // Output layer

      // Discriminator parameters
      let discParams = imgDim * hiddenDim + hiddenDim; // First layer
      for (let i = 1; i < numLayers; i++) {
        discParams += hiddenDim * hiddenDim + hiddenDim;
      }
      discParams += hiddenDim + 1; // Output layer

      return genParams + discParams;
    } else if (modelType === 'diffusion') {
      // U-Net architecture for diffusion
      const channels = [128, 256, 512, 512];
      let params = 0;

      // Timestep embedding
      params += 512 * 4; // Simple embedding

      // Encoder
      params += 3 * channels[0] * 3 * 3 + channels[0]; // Input conv
      for (let i = 0; i < channels.length - 1; i++) {
        params += channels[i] * channels[i+1] * 3 * 3 + channels[i+1]; // Downsampling
        params += channels[i+1] * channels[i+1] * 3 * 3 + channels[i+1]; // Conv block
      }

      // Decoder (symmetric)
      for (let i = channels.length - 1; i > 0; i--) {
        params += channels[i] * channels[i-1] * 3 * 3 + channels[i-1]; // Upsampling
        params += channels[i-1] * channels[i-1] * 3 * 3 + channels[i-1]; // Conv block
      }

      // Output
      params += channels[0] * 3 * 3 * 3 + 3;

      return params;
    } else { // stylegan
      // Mapping network
      let mappingParams = latentDim * 512 + 512;
      for (let i = 1; i < mappingLayers; i++) {
        mappingParams += 512 * 512 + 512;
      }

      // Synthesis network (progressive)
      const resolutions = [4, 8, 16, 32, 64, 128, 256, 512, 1024];
      const targetIdx = resolutions.indexOf(targetResolution);
      const channelMap = [512, 512, 512, 512, 256, 128, 64, 32, 16];

      let synthesisParams = 512 * 4 * 4; // Learned constant

      for (let i = 0; i <= targetIdx; i++) {
        const inChannels = i === 0 ? 512 : channelMap[i-1];
        const outChannels = channelMap[i];

        // Two conv layers per block
        synthesisParams += inChannels * outChannels * 3 * 3 + outChannels;
        synthesisParams += outChannels * outChannels * 3 * 3 + outChannels;

        // AdaIN parameters (2 per conv)
        synthesisParams += (512 * outChannels + outChannels) * 2 * 2; // Scale and bias

        // Noise injection weights
        synthesisParams += outChannels * 2;
      }

      // ToRGB layer
      synthesisParams += channelMap[targetIdx] * 3 * 1 * 1 + 3;

      // Discriminator (progressive)
      let discParams = 0;
      for (let i = targetIdx; i >= 0; i--) {
        const inChannels = i === targetIdx ? 3 : channelMap[i+1];
        const outChannels = channelMap[i];
        discParams += inChannels * outChannels * 3 * 3 + outChannels;
        discParams += outChannels * outChannels * 3 * 3 + outChannels;
      }
      discParams += 512 + 1; // Final classification

      return mappingParams + synthesisParams + discParams;
    }
  };

  const getMemoryFootprint = () => {
    const params = getParamCount();
    return (params * 4 / (1024 * 1024)).toFixed(0); // fp32 in MB
  };

  const getTrainingTime = () => {
    if (modelType === 'gan') {
      const complexity = (hiddenDim * numLayers) / 1536; // Normalized
      return complexity < 0.8 ? '2-4 hours' : complexity < 1.5 ? '4-8 hours' : '8-24 hours';
    } else if (modelType === 'diffusion') {
      return timesteps > 500 ? '2-4 days' : '1-2 days';
    } else { // stylegan
      return targetResolution >= 512 ? '1-2 weeks' : targetResolution >= 256 ? '3-7 days' : '1-3 days';
    }
  };

  const getSamplingSpeed = () => {
    if (modelType === 'gan' || modelType === 'stylegan') {
      return 'Real-time (single forward pass)';
    } else { // diffusion
      const stepsPerSec = samplingSteps <= 50 ? '~5-10' : samplingSteps <= 250 ? '~2-5' : '~1';
      return `${stepsPerSec} sec per image (${samplingSteps} steps)`;
    }
  };

  const getQualityMetric = () => {
    if (modelType === 'gan') {
      return { metric: 'FID', value: '25-30 (vanilla), 5-10 (DCGAN)', note: 'Lower is better' };
    } else if (modelType === 'diffusion') {
      return { metric: 'FID', value: '~3.17 (CIFAR-10)', note: 'Beats GANs in quality' };
    } else { // stylegan
      return { metric: 'FID', value: targetResolution >= 512 ? '~2.84 (1024px)' : '~4.40 (256px)', note: 'SOTA photorealism' };
    }
  };

  const modelTypes: Array<{ type: ModelType; name: string; color: string; description: string }> = [
    {
      type: 'gan',
      name: 'GAN',
      color: 'from-purple-500 to-pink-500',
      description: 'Adversarial training: Generator vs Discriminator',
    },
    {
      type: 'diffusion',
      name: 'Diffusion Model',
      color: 'from-blue-500 to-cyan-500',
      description: 'Iterative denoising from pure noise',
    },
    {
      type: 'stylegan',
      name: 'StyleGAN',
      color: 'from-orange-500 to-red-500',
      description: 'Style-based generation with fine control',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Generative Models Playground
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Experiment with different generative architectures and see how parameters affect model capacity
        </p>
      </div>

      {/* Model Type Selection */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Model Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modelTypes.map((model) => (
            <button
              key={model.type}
              onClick={() => setModelType(model.type)}
              className={`p-4 rounded-lg border-2 transition-all ${
                modelType === model.type
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
              {modelType === 'stylegan' ? 'Latent Dimension (Z)' : 'Latent Dimension'}
            </label>
            <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{latentDim}</span>
          </div>
          <input
            type="range"
            min="64"
            max="512"
            step="64"
            value={latentDim}
            onChange={(e) => setLatentDim(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dimensionality of input noise vector
          </p>
        </div>

        {modelType !== 'stylegan' && (
          <>
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
                Width of hidden layers in {modelType === 'gan' ? 'G/D' : 'U-Net'}
              </p>
            </div>

            {modelType === 'gan' && (
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
                  max="6"
                  step="1"
                  value={numLayers}
                  onChange={(e) => setNumLayers(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Depth of Generator and Discriminator
                </p>
              </div>
            )}
          </>
        )}

        {/* Diffusion-specific parameters */}
        {modelType === 'diffusion' && (
          <>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Training Timesteps
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{timesteps}</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={timesteps}
                onChange={(e) => setTimesteps(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Number of noise steps in forward diffusion (typical: 1000)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Sampling Steps (DDIM)
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{samplingSteps}</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={samplingSteps}
                onChange={(e) => setSamplingSteps(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Denoising steps during sampling (DDIM: 50, DDPM: 1000)
              </p>
            </div>
          </>
        )}

        {/* StyleGAN-specific parameters */}
        {modelType === 'stylegan' && (
          <>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Mapping Network Layers
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{mappingLayers}</span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="1"
                value={mappingLayers}
                onChange={(e) => setMappingLayers(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Depth of Z→W mapping network (more layers = better disentanglement)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Target Resolution
                </label>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{targetResolution}×{targetResolution}</span>
              </div>
              <input
                type="range"
                min="64"
                max="1024"
                step="64"
                value={targetResolution}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  // Snap to powers of 2
                  const validResolutions = [64, 128, 256, 512, 1024];
                  const closest = validResolutions.reduce((prev, curr) =>
                    Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
                  );
                  setTargetResolution(closest);
                }}
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Output image resolution (progressive: 4×4 → {targetResolution}×{targetResolution})
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
            Memory: ~{getMemoryFootprint()} MB (fp32)
          </div>
        </div>

        <div className="bg-green-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
            {modelType === 'diffusion' ? 'Sampling Speed' : 'Generation Speed'}
          </div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {getSamplingSpeed()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Training: {getTrainingTime()} (CIFAR-10 on V100)
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Quality Metric</div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {getQualityMetric().metric}: {getQualityMetric().value}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {getQualityMetric().note}
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Model Characteristics</div>
          <div className="text-sm font-semibold text-orange-600 dark:text-orange-400">
            {modelType === 'gan' && 'Adversarial, sharp outputs'}
            {modelType === 'diffusion' && 'Stable training, mode coverage'}
            {modelType === 'stylegan' && 'Controllable, disentangled'}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {modelType === 'gan' && 'Challenge: Mode collapse, training instability'}
            {modelType === 'diffusion' && 'Challenge: Slow sampling (many steps)'}
            {modelType === 'stylegan' && 'Challenge: Training complexity, compute cost'}
          </div>
        </div>
      </div>

      {/* Architecture Flow */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/30 dark:to-slate-800/30 rounded-lg p-6">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Architecture Flow
        </h4>

        {modelType === 'gan' && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded font-mono text-purple-700 dark:text-purple-300">
                z ~ N(0,1) [{latentDim}]
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-pink-100 dark:bg-pink-900/30 px-3 py-1 rounded font-mono text-pink-700 dark:text-pink-300">
                Generator ({numLayers} layers, {hiddenDim}d)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded font-mono text-blue-700 dark:text-blue-300">
                Fake Image
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded font-mono text-green-700 dark:text-green-300">
                Real/Fake Images
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded font-mono text-red-700 dark:text-red-300">
                Discriminator ({numLayers} layers, {hiddenDim}d)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded font-mono text-yellow-700 dark:text-yellow-300">
                P(real) ∈ [0,1]
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Minimax game: Generator tries to fool Discriminator, Discriminator learns to detect fakes
            </p>
          </div>
        )}

        {modelType === 'diffusion' && (
          <div className="space-y-3 text-sm">
            <div className="mb-2 font-semibold text-slate-600 dark:text-slate-400">Forward (Training):</div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded font-mono text-green-700 dark:text-green-300">
                x₀ (real image)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded font-mono text-blue-700 dark:text-blue-300">
                +noise ({timesteps} steps)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-gray-100 dark:bg-gray-900/30 px-3 py-1 rounded font-mono text-gray-700 dark:text-gray-300">
                x_T ~ N(0,1)
              </div>
            </div>
            <div className="mb-2 font-semibold text-slate-600 dark:text-slate-400 mt-4">Reverse (Sampling):</div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 dark:bg-gray-900/30 px-3 py-1 rounded font-mono text-gray-700 dark:text-gray-300">
                x_T ~ N(0,1)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded font-mono text-purple-700 dark:text-purple-300">
                U-Net denoising ({samplingSteps} steps)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded font-mono text-green-700 dark:text-green-300">
                x₀ (generated)
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Train model to predict noise ε at each step. Sample by iteratively removing predicted noise.
            </p>
          </div>
        )}

        {modelType === 'stylegan' && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded font-mono text-purple-700 dark:text-purple-300">
                z ~ N(0,1) [{latentDim}]
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded font-mono text-blue-700 dark:text-blue-300">
                Mapping ({mappingLayers}×512d)
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 rounded font-mono text-indigo-700 dark:text-indigo-300">
                w ∈ W [512]
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded font-mono text-orange-700 dark:text-orange-300">
                Const 4×4
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-pink-100 dark:bg-pink-900/30 px-3 py-1 rounded font-mono text-pink-700 dark:text-pink-300">
                AdaIN(w) + noise
              </div>
              <span className="text-slate-400">→</span>
              <div className="bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded font-mono text-red-700 dark:text-red-300">
                ... → {targetResolution}×{targetResolution}
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Style w injected at each resolution via AdaIN. Early: pose/structure. Middle: features. Late: texture/color.
            </p>
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
          {modelType === 'gan' && (
            <>
              <li>• Use label smoothing (real=0.9, fake=0.1) to prevent discriminator overconfidence</li>
              <li>• Balance G/D updates. Start with 1:1 ratio, adjust if one dominates</li>
              <li>• Monitor for mode collapse: check sample diversity every few epochs</li>
              <li>• Try Wasserstein loss (WGAN-GP) or Spectral Normalization for stability</li>
            </>
          )}
          {modelType === 'diffusion' && (
            <>
              <li>• Use cosine variance schedule for better high-res results</li>
              <li>• DDIM sampling: 50 steps gives good quality/speed trade-off (20× faster than DDPM)</li>
              <li>• For text-to-image: classifier-free guidance scale ~7.5 balances quality and prompt adherence</li>
              <li>• Consider latent diffusion (Stable Diffusion) for 8× memory/speed improvement</li>
            </>
          )}
          {modelType === 'stylegan' && (
            <>
              <li>• Enable style mixing (prob=0.9) during training for better disentanglement</li>
              <li>• Use truncation trick (ψ=0.7) for demos, ψ=1.0 for full diversity</li>
              <li>• Monitor PPL (Perceptual Path Length) - lower means better disentanglement</li>
              <li>• StyleGAN2 fixes blob artifacts - use it instead of StyleGAN1</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

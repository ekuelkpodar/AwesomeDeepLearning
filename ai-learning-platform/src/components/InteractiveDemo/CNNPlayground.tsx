import { useState } from 'react';

interface LayerConfig {
  type: 'conv' | 'pool' | 'fc';
  filters?: number;
  kernelSize?: number;
  poolSize?: number;
  activation?: 'relu' | 'sigmoid' | 'tanh';
}

const CNNPlayground = () => {
  const [layers, setLayers] = useState<LayerConfig[]>([
    { type: 'conv', filters: 32, kernelSize: 3, activation: 'relu' },
    { type: 'pool', poolSize: 2 },
    { type: 'conv', filters: 64, kernelSize: 3, activation: 'relu' },
    { type: 'pool', poolSize: 2 },
    { type: 'fc' }
  ]);

  const [inputSize, setInputSize] = useState<number>(28); // MNIST-like
  const [selectedFilter, setSelectedFilter] = useState<'edge' | 'blur' | 'sharpen' | 'custom'>('edge');

  const addLayer = (type: 'conv' | 'pool') => {
    const newLayers = [...layers];
    // Insert before FC layer
    const newLayer: LayerConfig = type === 'conv'
      ? { type: 'conv', filters: 32, kernelSize: 3, activation: 'relu' }
      : { type: 'pool', poolSize: 2 };

    newLayers.splice(newLayers.length - 1, 0, newLayer);
    setLayers(newLayers);
  };

  const removeLayer = (index: number) => {
    if (layers.length > 2) {  // Keep at least conv + fc
      setLayers(layers.filter((_, i) => i !== index));
    }
  };

  const updateLayer = (index: number, updates: Partial<LayerConfig>) => {
    const newLayers = [...layers];
    newLayers[index] = { ...newLayers[index], ...updates };
    setLayers(newLayers);
  };

  const calculateOutputSize = () => {
    let size = inputSize;
    const sizes: number[] = [size];

    for (const layer of layers) {
      if (layer.type === 'conv') {
        // With padding='same', size stays the same
        size = size;
      } else if (layer.type === 'pool') {
        size = Math.floor(size / (layer.poolSize || 2));
      }
      sizes.push(size);
    }

    return sizes;
  };

  const calculateTotalParams = () => {
    let total = 0;
    let prevFilters = 1; // Grayscale input

    for (const layer of layers) {
      if (layer.type === 'conv' && layer.filters && layer.kernelSize) {
        // params = (kernel_size * kernel_size * in_channels + 1) * out_channels
        total += (layer.kernelSize * layer.kernelSize * prevFilters + 1) * layer.filters;
        prevFilters = layer.filters;
      }
    }

    // FC layer at the end
    const finalSize = calculateOutputSize()[calculateOutputSize().length - 1];
    const fcInput = prevFilters * finalSize * finalSize;
    total += fcInput * 10 + 10; // Assume 10 output classes

    return total;
  };

  const getLayerColor = (type: string) => {
    switch(type) {
      case 'conv': return 'bg-blue-500';
      case 'pool': return 'bg-yellow-500';
      case 'fc': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getLayerIcon = (type: string) => {
    switch(type) {
      case 'conv': return '⊞';
      case 'pool': return '↓';
      case 'fc': return '◉';
      default: return '?';
    }
  };

  // Predefined filter kernels
  const filterKernels = {
    edge: [
      [-1, -1, -1],
      [-1,  8, -1],
      [-1, -1, -1]
    ],
    blur: [
      [1/9, 1/9, 1/9],
      [1/9, 1/9, 1/9],
      [1/9, 1/9, 1/9]
    ],
    sharpen: [
      [ 0, -1,  0],
      [-1,  5, -1],
      [ 0, -1,  0]
    ],
    custom: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ]
  };

  const outputSizes = calculateOutputSize();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          <span className="text-3xl mr-3">🔬</span>
          Interactive CNN Playground
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Build your own convolutional neural network! Experiment with different layers, filter sizes, and visualize how convolutions transform images.
        </p>
      </div>

      {/* Input Size Control */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Input Image</h3>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Input Size:</label>
          <select
            value={inputSize}
            onChange={(e) => setInputSize(parseInt(e.target.value))}
            className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
          >
            <option value="28">28×28 (MNIST)</option>
            <option value="32">32×32 (CIFAR-10)</option>
            <option value="64">64×64</option>
            <option value="128">128×128</option>
            <option value="224">224×224 (ImageNet)</option>
          </select>

          <div className="ml-auto">
            <div className="w-20 h-20 border-2 border-blue-500 rounded flex items-center justify-center bg-blue-50 dark:bg-blue-900/20">
              <span className="text-xs font-mono">{inputSize}×{inputSize}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Network Architecture Builder */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Network Architecture</h3>

        <div className="space-y-4">
          {layers.map((layer, index) => (
            <div key={index} className="relative">
              <div className="flex items-center gap-4">
                {/* Layer Type Badge */}
                <div className={`w-32 px-4 py-3 rounded-lg ${getLayerColor(layer.type)} text-white font-bold flex items-center justify-between`}>
                  <span className="text-2xl">{getLayerIcon(layer.type)}</span>
                  <span className="uppercase text-sm">
                    {layer.type === 'conv' ? 'Conv2D' : layer.type === 'pool' ? 'MaxPool' : 'Dense'}
                  </span>
                </div>

                {/* Layer Configuration */}
                <div className="flex-1 flex items-center gap-4">
                  {layer.type === 'conv' && (
                    <>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-slate-600 dark:text-slate-400">Filters:</label>
                        <input
                          type="number"
                          min="1"
                          max="512"
                          value={layer.filters}
                          onChange={(e) => updateLayer(index, { filters: parseInt(e.target.value) || 1 })}
                          className="w-20 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-sm text-slate-600 dark:text-slate-400">Kernel:</label>
                        <select
                          value={layer.kernelSize}
                          onChange={(e) => updateLayer(index, { kernelSize: parseInt(e.target.value) })}
                          className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
                        >
                          <option value="1">1×1</option>
                          <option value="3">3×3</option>
                          <option value="5">5×5</option>
                          <option value="7">7×7</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-sm text-slate-600 dark:text-slate-400">Activation:</label>
                        <select
                          value={layer.activation}
                          onChange={(e) => updateLayer(index, { activation: e.target.value as 'relu' | 'sigmoid' | 'tanh' })}
                          className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
                        >
                          <option value="relu">ReLU</option>
                          <option value="sigmoid">Sigmoid</option>
                          <option value="tanh">Tanh</option>
                        </select>
                      </div>
                    </>
                  )}

                  {layer.type === 'pool' && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-slate-600 dark:text-slate-400">Pool Size:</label>
                      <select
                        value={layer.poolSize}
                        onChange={(e) => updateLayer(index, { poolSize: parseInt(e.target.value) })}
                        className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
                      >
                        <option value="2">2×2</option>
                        <option value="3">3×3</option>
                        <option value="4">4×4</option>
                      </select>
                    </div>
                  )}

                  {layer.type === 'fc' && (
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Fully Connected Layer → 10 classes
                    </div>
                  )}
                </div>

                {/* Output Size Display */}
                <div className="w-24 text-center">
                  <div className="text-xs text-slate-500 dark:text-slate-500 mb-1">Output</div>
                  <div className="px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded font-mono text-sm">
                    {layer.type !== 'fc' ? `${outputSizes[index + 1]}×${outputSizes[index + 1]}` : '10'}
                  </div>
                  {layer.type === 'conv' && (
                    <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      {layer.filters} filters
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                {layer.type !== 'fc' && layers.length > 2 && (
                  <button
                    onClick={() => removeLayer(index)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    title="Remove layer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Connection Arrow */}
              {index < layers.length - 1 && (
                <div className="flex justify-center my-2">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Layer Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => addLayer('conv')}
            className="btn-outline flex items-center gap-2 flex-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Conv Layer
          </button>
          <button
            onClick={() => addLayer('pool')}
            className="btn-outline flex items-center gap-2 flex-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Pooling Layer
          </button>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Layers</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{layers.length}</div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Conv Layers</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {layers.filter(l => l.type === 'conv').length}
          </div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Pooling Layers</div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {layers.filter(l => l.type === 'pool').length}
          </div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Parameters</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {calculateTotalParams().toLocaleString()}
          </div>
        </div>
      </div>

      {/* Convolution Visualization */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Convolution Filter Visualization</h3>

        <div className="flex items-start gap-6">
          {/* Filter Selection */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Select Filter Type:</label>
            <div className="grid grid-cols-2 gap-3">
              {(['edge', 'blur', 'sharpen', 'custom'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedFilter === filter
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="font-bold capitalize">{filter}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {filter === 'edge' && 'Detects edges'}
                    {filter === 'blur' && 'Smooths image'}
                    {filter === 'sharpen' && 'Enhances details'}
                    {filter === 'custom' && 'Custom kernel'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Kernel Display */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">3×3 Kernel:</label>
            <div className="inline-block p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <div className="grid grid-cols-3 gap-2">
                {filterKernels[selectedFilter].map((row, i) =>
                  row.map((val, j) => (
                    <div
                      key={`${i}-${j}`}
                      className="w-16 h-16 flex items-center justify-center bg-white dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600 font-mono text-sm"
                    >
                      {typeof val === 'number' ? val.toFixed(2) : val}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Convolution Operation Explanation */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-bold mb-2">How Convolution Works:</h4>
          <ol className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <li>1. The kernel (filter) slides across the input image from left to right, top to bottom</li>
            <li>2. At each position, we perform element-wise multiplication between kernel and image patch</li>
            <li>3. Sum all the products to get a single output value</li>
            <li>4. This creates a feature map that highlights specific patterns (edges, textures, etc.)</li>
            <li>5. Multiple filters learn different features, creating multiple feature maps</li>
          </ol>
        </div>
      </div>

      {/* Pooling Visualization */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Max Pooling Visualization</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before Pooling */}
          <div>
            <label className="block text-sm font-medium mb-2">Before Pooling (4×4):</label>
            <div className="inline-block p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <div className="grid grid-cols-4 gap-1">
                {[5, 3, 8, 2, 1, 9, 4, 7, 6, 2, 5, 1, 3, 8, 2, 6].map((val, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 flex items-center justify-center rounded font-bold ${
                      // Highlight max values in each 2×2 block
                      (i === 0 && val === 9) || (i === 2 && val === 8) ||
                      (i === 8 && val === 8) || (i === 10 && val === 6)
                        ? 'bg-green-500 text-white'
                        : i % 4 < 2 && Math.floor(i / 4) < 2
                        ? 'bg-red-100 dark:bg-red-900/30'
                        : i % 4 >= 2 && Math.floor(i / 4) < 2
                        ? 'bg-blue-100 dark:bg-blue-900/30'
                        : i % 4 < 2 && Math.floor(i / 4) >= 2
                        ? 'bg-yellow-100 dark:bg-yellow-900/30'
                        : 'bg-purple-100 dark:bg-purple-900/30'
                    }`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* After Pooling */}
          <div>
            <label className="block text-sm font-medium mb-2">After Max Pooling (2×2, stride=2):</label>
            <div className="inline-block p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <div className="grid grid-cols-2 gap-1">
                {[9, 8, 8, 6].map((val, i) => (
                  <div
                    key={i}
                    className="w-24 h-24 flex items-center justify-center bg-green-500 text-white rounded font-bold text-xl"
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h4 className="font-bold mb-2">Max Pooling Effect:</h4>
          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <li>• Reduces spatial dimensions (4×4 → 2×2) while retaining important features</li>
            <li>• Takes the maximum value from each region (shown in green)</li>
            <li>• Provides translation invariance - small shifts in input don't affect output</li>
            <li>• Reduces computation and parameters in deeper layers</li>
            <li>• Common pool sizes: 2×2 (most popular), 3×3</li>
          </ul>
        </div>
      </div>

      {/* Architecture Presets */}
      <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
        <h3 className="font-bold mb-3">Famous CNN Architectures</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <h4 className="font-bold text-sm mb-1">LeNet-5 (1998)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Conv(6,5×5) → Pool → Conv(16,5×5) → Pool → FC
            </p>
            <div className="text-xs text-slate-500">~60K parameters • MNIST</div>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <h4 className="font-bold text-sm mb-1">AlexNet (2012)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              5 Conv layers + 3 FC layers • ReLU • Dropout
            </p>
            <div className="text-xs text-slate-500">~60M parameters • ImageNet</div>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <h4 className="font-bold text-sm mb-1">VGG-16 (2014)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              13 Conv(3×3) + 3 FC • Very deep • Simple design
            </p>
            <div className="text-xs text-slate-500">~138M parameters • ImageNet</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CNNPlayground;

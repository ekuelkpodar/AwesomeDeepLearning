import { useState } from 'react';

interface LayerConfig {
  neurons: number;
  activation?: 'relu' | 'sigmoid' | 'tanh' | 'linear';
}

const FeedforwardPlayground = () => {
  const [layers, setLayers] = useState<LayerConfig[]>([
    { neurons: 2 },
    { neurons: 4, activation: 'relu' },
    { neurons: 1, activation: 'sigmoid' }
  ]);
  const [inputValues, setInputValues] = useState<number[]>([0.5, 0.5]);
  const [trainingData, setTrainingData] = useState<'xor' | 'and' | 'or' | 'custom'>('xor');

  const addLayer = () => {
    const newLayers = [...layers];
    // Insert before output layer
    newLayers.splice(newLayers.length - 1, 0, { neurons: 3, activation: 'relu' });
    setLayers(newLayers);
  };

  const removeLayer = (index: number) => {
    if (layers.length > 2) {  // Keep at least input and output
      setLayers(layers.filter((_, i) => i !== index));
    }
  };

  const updateNeurons = (index: number, neurons: number) => {
    const newLayers = [...layers];
    newLayers[index].neurons = Math.max(1, Math.min(20, neurons));
    setLayers(newLayers);
  };

  const updateActivation = (index: number, activation: 'relu' | 'sigmoid' | 'tanh' | 'linear') => {
    const newLayers = [...layers];
    newLayers[index].activation = activation;
    setLayers(newLayers);
  };

  const calculateTotalParams = () => {
    let total = 0;
    for (let i = 1; i < layers.length; i++) {
      // weights + biases
      total += layers[i-1].neurons * layers[i].neurons + layers[i].neurons;
    }
    return total;
  };

  const getActivationColor = (activation?: string) => {
    switch(activation) {
      case 'relu': return 'bg-green-500';
      case 'sigmoid': return 'bg-blue-500';
      case 'tanh': return 'bg-purple-500';
      case 'linear': return 'bg-gray-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          <span className="text-3xl mr-3">🎮</span>
          Interactive Feedforward Network Playground
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Build and visualize your own neural network! Add layers, change activations, and see how it affects the architecture.
        </p>
      </div>

      {/* Network Builder */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Network Architecture</h3>

        <div className="space-y-4">
          {layers.map((layer, index) => (
            <div key={index} className="relative">
              <div className="flex items-center gap-4">
                {/* Layer Label */}
                <div className="w-24 text-sm font-medium">
                  {index === 0 ? 'Input' :
                   index === layers.length - 1 ? 'Output' :
                   `Hidden ${index}`}
                </div>

                {/* Neurons Control */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600 dark:text-slate-400">Neurons:</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={layer.neurons}
                    onChange={(e) => updateNeurons(index, parseInt(e.target.value) || 1)}
                    disabled={index === 0}
                    className="w-20 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 disabled:opacity-50"
                  />
                  <div className="flex gap-1">
                    {[...Array(Math.min(layer.neurons, 10))].map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full ${getActivationColor(layer.activation)} flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {layer.neurons > 10 && i === 9 ? '+' : i + 1}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activation Function */}
                {index > 0 && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-slate-600 dark:text-slate-400">Activation:</label>
                    <select
                      value={layer.activation || 'linear'}
                      onChange={(e) => updateActivation(index, e.target.value as any)}
                      className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
                    >
                      <option value="relu">ReLU</option>
                      <option value="sigmoid">Sigmoid</option>
                      <option value="tanh">Tanh</option>
                      <option value="linear">Linear</option>
                    </select>
                  </div>
                )}

                {/* Remove Button */}
                {index > 0 && index < layers.length - 1 && layers.length > 2 && (
                  <button
                    onClick={() => removeLayer(index)}
                    className="ml-auto p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
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

        {/* Add Layer Button */}
        <button
          onClick={addLayer}
          className="mt-4 btn-outline w-full flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Hidden Layer
        </button>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Layers</div>
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{layers.length}</div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Hidden Layers</div>
          <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400">{layers.length - 2}</div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Neurons</div>
          <div className="text-3xl font-bold text-accent-600 dark:text-accent-400">
            {layers.reduce((sum, layer) => sum + layer.neurons, 0)}
          </div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Parameters</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {calculateTotalParams().toLocaleString()}
          </div>
        </div>
      </div>

      {/* Input Controls */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Test Inputs</h3>
        <div className="space-y-3">
          {inputValues.map((value, index) => (
            <div key={index} className="flex items-center gap-4">
              <label className="w-20 text-sm font-medium">Input {index + 1}:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={value}
                onChange={(e) => {
                  const newValues = [...inputValues];
                  newValues[index] = parseFloat(e.target.value);
                  setInputValues(newValues);
                }}
                className="flex-1"
              />
              <span className="w-16 text-sm font-mono">{value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Training Data Selection */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Training Problem</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['xor', 'and', 'or', 'custom'] as const).map((problem) => (
            <button
              key={problem}
              onClick={() => setTrainingData(problem)}
              className={`p-4 rounded-lg border-2 transition-all ${
                trainingData === problem
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="font-bold uppercase">{problem}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {problem === 'xor' && 'Non-linear (needs hidden layer)'}
                {problem === 'and' && 'Linearly separable'}
                {problem === 'or' && 'Linearly separable'}
                {problem === 'custom' && 'Upload your own data'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Activation Functions Legend */}
      <div className="card bg-slate-50 dark:bg-slate-800">
        <h3 className="font-bold mb-3">Activation Functions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'ReLU', formula: 'max(0, x)', color: 'bg-green-500', desc: 'Most popular - fast & effective' },
            { name: 'Sigmoid', formula: '1/(1+e⁻ˣ)', color: 'bg-blue-500', desc: 'Output: 0 to 1' },
            { name: 'Tanh', formula: 'tanh(x)', color: 'bg-purple-500', desc: 'Output: -1 to 1' },
            { name: 'Linear', formula: 'x', color: 'bg-gray-500', desc: 'No activation' },
          ].map((activation) => (
            <div key={activation.name} className="flex items-start gap-2">
              <div className={`w-6 h-6 rounded ${activation.color} flex-shrink-0`}></div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{activation.name}</div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400">{activation.formula}</div>
                <div className="text-xs text-slate-500 dark:text-slate-500">{activation.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="card border-l-4 border-accent-500 bg-accent-50 dark:bg-accent-900/20">
        <h3 className="font-bold mb-2">💡 Tips for Building Networks</h3>
        <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>• Start simple - try 1-2 hidden layers first</li>
          <li>• ReLU is usually the best activation for hidden layers</li>
          <li>• Use sigmoid for binary classification output</li>
          <li>• More neurons = more capacity but slower training</li>
          <li>• XOR problem requires at least 1 hidden layer (try 4 neurons)</li>
          <li>• Too many layers can cause vanishing gradients</li>
        </ul>
      </div>
    </div>
  );
};

export default FeedforwardPlayground;

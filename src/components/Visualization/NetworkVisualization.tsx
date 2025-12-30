import { Architecture } from '../../types';

interface NetworkVisualizationProps {
  architecture: Architecture;
}

const NetworkVisualization = ({ architecture }: NetworkVisualizationProps) => {
  const layers = architecture.architecture.layers;

  // Color mapping for different layer types
  const getLayerColor = (type: string): string => {
    const colorMap: Record<string, string> = {
      'conv': 'bg-green-500',
      'maxpool': 'bg-yellow-500',
      'avgpool': 'bg-yellow-400',
      'fc': 'bg-orange-500',
      'linear': 'bg-orange-500',
      'residual_block': 'bg-purple-500',
      'embedding': 'bg-blue-500',
      'positional_encoding': 'bg-cyan-500',
      'encoder': 'bg-indigo-500',
      'decoder': 'bg-pink-500',
      'attention': 'bg-red-500',
      'default': 'bg-slate-500',
    };

    return colorMap[type.toLowerCase()] || colorMap['default'];
  };

  const getLayerIcon = (type: string): string => {
    const iconMap: Record<string, string> = {
      'conv': '⊞',
      'maxpool': '▽',
      'avgpool': '▼',
      'fc': '◉',
      'linear': '◉',
      'residual_block': '⟲',
      'embedding': '📝',
      'positional_encoding': '📍',
      'encoder': '🔒',
      'decoder': '🔓',
      'attention': '👁️',
    };

    return iconMap[type.toLowerCase()] || '◼︎';
  };

  return (
    <div className="space-y-6">
      {/* Network Architecture Display */}
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
        <div className="flex flex-col space-y-4">
          {layers.map((layer, idx) => (
            <div key={idx} className="group">
              {/* Layer Box */}
              <div className="flex items-center gap-4">
                {/* Layer Number */}
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>

                {/* Layer Card */}
                <div className="flex-1 bg-white dark:bg-slate-700 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Layer Type Icon */}
                      <div className={`w-12 h-12 rounded-lg ${getLayerColor(layer.type)} flex items-center justify-center text-white text-2xl`}>
                        {getLayerIcon(layer.type)}
                      </div>

                      {/* Layer Info */}
                      <div>
                        <div className="font-semibold text-lg">{layer.name}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Type: <span className="font-mono">{layer.type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Output Shape */}
                    {layer.outputShape && (
                      <div className="text-right">
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Output Shape</div>
                        <div className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded">
                          {layer.outputShape.join(' × ')}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Layer Parameters */}
                  {layer.params && Object.keys(layer.params).length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(layer.params).map(([key, value]) => (
                          <span key={key} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
                            <span className="text-slate-600 dark:text-slate-400">{key}:</span>{' '}
                            <span className="font-mono font-medium">
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Layer Description */}
                  {layer.description && (
                    <div className="mt-2 text-sm text-slate-600 dark:text-slate-400 italic">
                      {layer.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Connection Arrow */}
              {idx < layers.length - 1 && (
                <div className="flex justify-center my-2">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Layers</div>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {architecture.architecture.depth}
          </div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Parameters</div>
          <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
            {(architecture.architecture.parameters / 1_000_000).toFixed(1)}M
          </div>
        </div>
        {architecture.architecture.inputShape && (
          <div className="card text-center">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Input Shape</div>
            <div className="text-lg font-mono font-bold text-accent-600 dark:text-accent-400">
              {architecture.architecture.inputShape.join(' × ')}
            </div>
          </div>
        )}
        {architecture.architecture.outputShape && (
          <div className="card text-center">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Output Shape</div>
            <div className="text-lg font-mono font-bold text-purple-600 dark:text-purple-400">
              {architecture.architecture.outputShape.join(' × ')}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="card bg-slate-50 dark:bg-slate-800">
        <h3 className="font-semibold mb-3">Layer Types Legend</h3>
        <div className="flex flex-wrap gap-3">
          {['conv', 'maxpool', 'fc', 'residual_block', 'encoder', 'decoder', 'attention'].map(type => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded ${getLayerColor(type)} flex items-center justify-center text-white`}>
                {getLayerIcon(type)}
              </div>
              <span className="text-sm capitalize">{type.replace('_', ' ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkVisualization;

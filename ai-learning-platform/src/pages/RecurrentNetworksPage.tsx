import { Link } from 'react-router-dom';
import { getArchitecturesByCategory } from '../data/architectures';
import RNNPlayground from '../components/InteractiveDemo/RNNPlayground';
import { useProgress } from '../contexts/ProgressContext';

const RecurrentNetworksPage = () => {
  const rnnArchs = getArchitecturesByCategory('rnn');
  const { progress } = useProgress();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4 flex items-center">
              <span className="text-4xl mr-3">🔄</span>
              Recurrent Neural Networks (RNNs)
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
              The memory of neural networks. RNNs process sequences step-by-step, maintaining a hidden state that captures information from previous steps. From vanilla RNNs to LSTMs and GRUs, these architectures powered NLP and speech recognition for decades before Transformers emerged.
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400">Architectures</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{rnnArchs.length}</div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400">Your Progress</div>
                <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                  {rnnArchs.filter(a => progress.learnedArchitectures.includes(a.id)).length}/{rnnArchs.length}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block text-8xl">⏰</div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Core RNN Concepts</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center">
              <span className="text-2xl mr-2">🔁</span>
              Recurrent Connections
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Unlike feedforward networks, RNNs have loops where output feeds back as input. The same weights are reused at every time step, enabling processing of variable-length sequences with fixed parameters.
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center">
              <span className="text-2xl mr-2">💾</span>
              Hidden State Memory
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              The hidden state acts as memory, carrying information across time steps. At each step, it's updated based on the current input and previous state, creating a compressed representation of sequence history.
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center">
              <span className="text-2xl mr-2">🚪</span>
              Gating Mechanisms
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              LSTM and GRU use gates (forget, input, output/update, reset) to control information flow. Gates learn what to remember, what to forget, and what to output, solving the vanishing gradient problem.
            </p>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center">
              <span className="text-2xl mr-2">📉</span>
              Vanishing Gradients
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Vanilla RNNs suffer from vanishing gradients when backpropagating through many time steps, limiting memory to ~10-20 steps. LSTMs/GRUs solve this with additive cell state updates that preserve gradient flow.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive RNN Playground */}
      <RNNPlayground />

      {/* Architecture Cards */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Explore RNN Architectures</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {rnnArchs.map(arch => {
            const isLearned = progress.learnedArchitectures.includes(arch.id);
            const isBookmarked = progress.bookmarkedArchitectures.includes(arch.id);

            return (
              <Link
                key={arch.id}
                to={`/architecture/${arch.id}`}
                className="card hover:shadow-xl transition-all duration-200 relative overflow-hidden group"
              >
                <div className="absolute top-4 right-4 flex gap-2">
                  {isLearned && (
                    <div className="w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  {isBookmarked && (
                    <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {arch.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                      {arch.year}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm">
                      {arch.difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                  {arch.plainEnglish}
                </p>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-600 dark:text-slate-400">
                        {arch.architecture.depth} layers
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {(arch.architecture.parameters / 1000).toFixed(0)}K params
                      </span>
                    </div>
                    <div className="text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
                      Learn →
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* RNN Timeline */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">RNN Evolution Timeline</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              1986
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">Vanilla RNN</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Backpropagation extended to recurrent connections. Simple hidden state updated at each time step, but suffered from vanishing gradients limiting memory to ~10-20 steps.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              1997
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">LSTM (Long Short-Term Memory)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Hochreiter & Schmidhuber solved vanishing gradients with cell state and gates. Enabled learning dependencies spanning 100-1000 steps. Dominated sequence modeling for 20 years.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              2014
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">GRU (Gated Recurrent Unit)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Simplified LSTM with 2 gates instead of 3, 25% fewer parameters. Similar performance to LSTM, faster training. Became popular for resource-constrained applications.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              2017+
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">Transformers Take Over</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Attention mechanisms and Transformers started replacing RNNs for many tasks due to better parallelization and even longer-range dependencies. But RNNs remain relevant for streaming/online scenarios.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Applications */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <h2 className="text-2xl font-bold mb-4">Real-World RNN Applications</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-bold mb-2">Language Modeling</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Predicting next word in a sequence. Powers autocomplete, text generation, and pre-BERT language models. LSTMs dominated 2015-2018.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-3xl mb-2">🗣️</div>
            <h3 className="font-bold mb-2">Speech Recognition</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Bidirectional LSTMs process audio frames forward and backward. Used in Siri, Google Voice, Alexa before Transformer-based models.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-3xl mb-2">🌐</div>
            <h3 className="font-bold mb-2">Machine Translation</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Seq2seq with attention (encoder-decoder LSTMs) powered Google Translate 2016-2019, achieving near-human quality for many languages.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-bold mb-2">Time Series Forecasting</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Stock prices, weather, sensor data—RNNs model temporal patterns. LSTMs capture both short and long-term trends in sequential data.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-3xl mb-2">🎵</div>
            <h3 className="font-bold mb-2">Music Generation</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              LSTMs learn musical patterns (melodies, harmonies, rhythms) and generate novel compositions. Google Magenta, OpenAI MuseNet used RNN variants.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-3xl mb-2">🎬</div>
            <h3 className="font-bold mb-2">Video Captioning</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              CNN extracts features from each frame, LSTM processes the sequence to generate text descriptions. Used in accessibility tools and video search.
            </p>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-200 dark:border-primary-800">
        <h2 className="text-2xl font-bold mb-4">📚 Recommended Learning Path</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <h3 className="font-bold">Start with Vanilla RNN</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Understand the basics: recurrent connections, hidden state, and backpropagation through time. Learn about the vanishing gradient problem firsthand.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <h3 className="font-bold">Master LSTM</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Learn how gates solve long-term dependencies. Understand cell state, forget/input/output gates, and why LSTMs became the industry standard.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <h3 className="font-bold">Compare with GRU</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                See how GRU simplifies LSTM. Learn when to choose GRU vs LSTM based on dataset size, sequence length, and computational constraints.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
            <div>
              <h3 className="font-bold">Explore the Playground</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Experiment with different architectures, hidden sizes, and sequence lengths. See how vanilla RNN fails on long sequences while LSTM/GRU succeed.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">5</div>
            <div>
              <h3 className="font-bold">Understand Limitations & Transformers</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Learn why Transformers replaced RNNs for many tasks (parallelization, attention). But also understand where RNNs still excel (streaming, online learning).
              </p>
            </div>
          </div>
        </div>

        <Link to="/learning-paths" className="btn-primary mt-6 inline-block">
          View Full Learning Path
        </Link>
      </div>
    </div>
  );
};

export default RecurrentNetworksPage;

import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import TransformerPlayground from '../components/InteractiveDemo/TransformerPlayground';

const TransformersPage = () => {
  const { progress } = useProgress();

  const architectures = [
    {
      id: 'transformer',
      name: 'Transformer',
      year: 2017,
      description: 'Original encoder-decoder architecture with self-attention',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'bert',
      name: 'BERT',
      year: 2018,
      description: 'Bidirectional encoder for understanding via masked language modeling',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'gpt',
      name: 'GPT',
      year: 2018,
      description: 'Autoregressive decoder for generation via next-token prediction',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const getCompletedCount = () => {
    return architectures.filter(arch => progress.learnedArchitectures.includes(arch.id)).length;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
        <div className="relative z-10">
          <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
            Transformers & Attention
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Transformer Models
          </h1>
          <p className="text-lg md:text-xl text-purple-100 mb-6 max-w-3xl">
            Revolutionized AI with self-attention mechanisms. The foundation of modern NLP, powering ChatGPT, BERT, and beyond.
            "Attention Is All You Need" — and it truly was!
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">{getCompletedCount()}/{architectures.length}</div>
              <div className="text-sm text-purple-200">Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">2017+</div>
              <div className="text-sm text-purple-200">Era Begins</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">O(n²)</div>
              <div className="text-sm text-purple-200">Attention Cost</div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Core Concepts */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">Core Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Self-Attention Mechanism</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Each token can attend to every other token in the sequence, computing relevance scores via query-key-value operations.
              Enables capturing long-range dependencies in parallel, unlike sequential RNNs.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Multi-Head Attention</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Multiple parallel attention heads learn different representation subspaces. One head might focus on syntax,
              another on semantics, another on coreference. Concatenated outputs are projected back together.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Positional Encoding</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Since attention has no notion of position (it's permutation-invariant), positional encodings inject sequence order.
              Sinusoidal functions or learned embeddings enable the model to use positional information.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Parallel Processing</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Unlike RNNs, all positions are processed simultaneously. This enables 10-100× faster training on GPUs/TPUs
              and efficient scaling to billions of parameters. The key to the LLM era!
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Playground */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">Interactive Playground</h2>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Experiment with different Transformer configurations. See how model size, attention heads, and sequence length
            affect parameters, memory, and computational cost.
          </p>
          <TransformerPlayground />
        </div>
      </div>

      {/* Architecture Cards */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">Architectures</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {architectures.map((arch) => {
            const isLearned = progress.learnedArchitectures.includes(arch.id);
            return (
              <Link
                key={arch.id}
                to={`/architecture/${arch.id}`}
                className="group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400"
              >
                <div className={`h-2 bg-gradient-to-r ${arch.gradient}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {arch.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{arch.year}</p>
                    </div>
                    {isLearned && (
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{arch.description}</p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-semibold">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">Evolution Timeline</h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500"></div>
          <div className="space-y-8">
            <div className="relative pl-20">
              <div className="absolute left-5 w-6 h-6 bg-purple-500 rounded-full border-4 border-white dark:border-slate-900"></div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-1">2017</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Transformer (Attention Is All You Need)</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Vaswani et al. introduce the Transformer, replacing RNNs with self-attention. Achieves SOTA on machine translation
                  with 10× faster training. The birth of modern NLP.
                </p>
              </div>
            </div>

            <div className="relative pl-20">
              <div className="absolute left-5 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-slate-900"></div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">2018</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">BERT & GPT Era Begins</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Google releases BERT (bidirectional encoder for understanding). OpenAI releases GPT (autoregressive decoder for generation).
                  Both show that pre-training + fine-tuning beats task-specific models. Transfer learning comes to NLP.
                </p>
              </div>
            </div>

            <div className="relative pl-20">
              <div className="absolute left-5 w-6 h-6 bg-cyan-500 rounded-full border-4 border-white dark:border-slate-900"></div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-1">2019-2020</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Scaling & Optimization</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  RoBERTa, ALBERT, T5, DistilBERT optimize BERT. GPT-2 (1.5B) and GPT-3 (175B) show emergent capabilities from scale.
                  Transformers expand beyond NLP: Vision Transformers (ViT) for images, AlphaFold for protein folding.
                </p>
              </div>
            </div>

            <div className="relative pl-20">
              <div className="absolute left-5 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900"></div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">2022-2024</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">LLM Era & Multimodality</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  ChatGPT (GPT-3.5 + RLHF) reaches 100M users in 2 months. GPT-4, Claude, Gemini, Llama push boundaries.
                  Multimodal Transformers (GPT-4V, Gemini) unify vision and language. Efficient attention (Flash Attention) enables 128k+ context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Applications */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">Real-World Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Conversational AI</h3>
            <p className="text-sm text-blue-100">ChatGPT, Claude, Gemini — billions of conversations powered by Transformer LLMs</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Code Generation</h3>
            <p className="text-sm text-green-100">GitHub Copilot, ChatGPT Code Interpreter — writing 40% of code in files where enabled</p>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Search & Discovery</h3>
            <p className="text-sm text-pink-100">Google Search (BERT), Bing (GPT-4) — understanding 1 in 10 queries with Transformers</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Image Generation</h3>
            <p className="text-sm text-yellow-100">DALL-E, Midjourney, Stable Diffusion — Transformer-based diffusion for photorealistic images</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Scientific Discovery</h3>
            <p className="text-sm text-indigo-100">AlphaFold 2 (protein folding) — Nobel Prize 2024 for solving 50-year biology problem</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Multimodal AI</h3>
            <p className="text-sm text-cyan-100">GPT-4V, Gemini — unified vision + language for image understanding and generation</p>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 border border-slate-200 dark:border-slate-600">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">Learning Path</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Start with the Transformer</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Understand the original encoder-decoder architecture, self-attention mechanism, and positional encoding.
                Read "Attention Is All You Need" and The Illustrated Transformer.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Explore BERT for Understanding</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Learn bidirectional pre-training via masked language modeling. Fine-tune BERT on a classification task
                using Hugging Face Transformers. Understand transfer learning.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Master GPT for Generation</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Learn autoregressive language modeling and causal attention. Experiment with GPT-2/3 for text generation.
                Understand few-shot learning and prompting techniques.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Dive into Advanced Variants</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Explore RoBERTa, T5, DeBERTa (BERT variants). Study GPT-3, GPT-4, Claude (GPT scaling). Learn efficient
                attention: Flash Attention, Linformer, Performer for long contexts.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">5</div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Build & Fine-tune LLMs</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Train a small Transformer from scratch (nanoGPT). Fine-tune open models (Llama, Mistral) with LoRA/QLoRA.
                Experiment with RLHF and alignment techniques. Deploy your own chatbot!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransformersPage;

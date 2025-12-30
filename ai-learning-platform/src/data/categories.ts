import type { CategoryInfo } from '../types';

export const categories: CategoryInfo[] = [
  {
    id: 'feedforward',
    name: 'Feedforward & Fully Connected Networks',
    description: 'Foundation of neural networks - simple architectures where information flows in one direction',
    icon: '🔄',
    subcategories: [
      { id: 'basic', name: 'Basic Networks', description: 'Perceptron, MLP, DNN' },
      { id: 'specialized', name: 'Specialized', description: 'RBF, Probabilistic NN' },
    ],
  },
  {
    id: 'cnn',
    name: 'Convolutional Neural Networks',
    description: 'Specialized for visual and spatial data processing',
    icon: '🖼️',
    subcategories: [
      { id: 'classic', name: 'Classic CNNs', description: 'LeNet, AlexNet, VGG, GoogLeNet, Inception' },
      { id: 'residual', name: 'Residual Networks', description: 'ResNet, ResNeXt, DenseNet, WideResNet' },
      { id: 'efficient', name: 'Efficient Models', description: 'EfficientNet, MobileNet, ShuffleNet, SqueezeNet' },
      { id: 'detection', name: 'Object Detection', description: 'R-CNN family, YOLO, SSD, RetinaNet' },
      { id: 'segmentation', name: 'Segmentation', description: 'U-Net, DeepLab, PSPNet, FCN, Mask R-CNN' },
    ],
  },
  {
    id: 'rnn',
    name: 'Recurrent & Sequence Models',
    description: 'Models for sequential and temporal data',
    icon: '📊',
    subcategories: [
      { id: 'basic', name: 'Basic RNNs', description: 'Vanilla RNN, Bidirectional RNN' },
      { id: 'gated', name: 'Gated Units', description: 'LSTM, GRU, variants' },
      { id: 'advanced', name: 'Advanced Sequence', description: 'Seq2Seq, Attention RNN, TCN' },
    ],
  },
  {
    id: 'transformer',
    name: 'Transformer Models',
    description: 'Modern attention-based architectures for NLP and vision',
    icon: '🤖',
    subcategories: [
      { id: 'core', name: 'Core Transformers', description: 'Vanilla Transformer, Encoder, Decoder' },
      { id: 'nlp', name: 'NLP Models', description: 'BERT, GPT, T5, LLaMA, Mistral, Claude' },
      { id: 'vision', name: 'Vision Transformers', description: 'ViT, Swin, BEiT, DeiT' },
      { id: 'multimodal', name: 'Multimodal', description: 'CLIP, BLIP, GPT-4V, LLaVA, Gemini' },
    ],
  },
  {
    id: 'autoencoder',
    name: 'Autoencoders & Representation Learning',
    description: 'Unsupervised learning for feature extraction and compression',
    icon: '🔀',
    subcategories: [
      { id: 'standard', name: 'Standard Autoencoders', description: 'AE, Sparse AE, Denoising AE' },
      { id: 'variational', name: 'Variational', description: 'VAE, β-VAE, Conditional VAE, VQ-VAE' },
    ],
  },
  {
    id: 'generative',
    name: 'Generative Models',
    description: 'Models that create new data - images, text, audio',
    icon: '🎨',
    subcategories: [
      { id: 'gan', name: 'GANs', description: 'GAN, DCGAN, StyleGAN, CycleGAN, BigGAN' },
      { id: 'diffusion', name: 'Diffusion Models', description: 'DDPM, DDIM, Stable Diffusion, DALL·E' },
    ],
  },
  {
    id: 'gnn',
    name: 'Graph Neural Networks',
    description: 'Processing graph-structured data and relationships',
    icon: '🕸️',
    subcategories: [
      { id: 'basic', name: 'Basic GNNs', description: 'GNN, GCN, GAT' },
      { id: 'advanced', name: 'Advanced', description: 'GraphSAGE, GIN, Temporal GNN' },
    ],
  },
  {
    id: 'reinforcement',
    name: 'Reinforcement Learning',
    description: 'Learning through interaction and rewards',
    icon: '🎮',
    subcategories: [
      { id: 'value', name: 'Value-Based', description: 'DQN, Double DQN, Dueling DQN, Rainbow' },
      { id: 'policy', name: 'Policy-Based', description: 'Policy Gradient, A3C, PPO, TRPO' },
      { id: 'actor-critic', name: 'Actor-Critic', description: 'DDPG, TD3, SAC' },
      { id: 'model-based', name: 'Model-Based', description: 'AlphaZero, MuZero' },
    ],
  },
  {
    id: 'energy-based',
    name: 'Energy-Based & Probabilistic Models',
    description: 'Models based on energy functions and probability',
    icon: '⚡',
    subcategories: [
      { id: 'boltzmann', name: 'Boltzmann Machines', description: 'BM, RBM, DBN, DBM' },
      { id: 'probabilistic', name: 'Probabilistic', description: 'Bayesian NN, Hopfield Network' },
      { id: 'differential', name: 'Differential', description: 'Neural ODE, Hamiltonian NN' },
    ],
  },
  {
    id: 'spiking',
    name: 'Spiking & Neuromorphic Models',
    description: 'Brain-inspired computing with spike timing',
    icon: '🧠',
    subcategories: [
      { id: 'spiking', name: 'Spiking Networks', description: 'SNN, Leaky Integrate-and-Fire' },
      { id: 'reservoir', name: 'Reservoir Computing', description: 'LSM, ESN, Reservoir Computing' },
    ],
  },
  {
    id: 'hybrid',
    name: 'Hybrid & Specialized Models',
    description: 'Combinations and specialized architectures',
    icon: '🔧',
    subcategories: [
      { id: 'hybrid', name: 'Hybrid Models', description: 'CRNN, TrOCR' },
      { id: 'memory', name: 'Memory Augmented', description: 'Memory Networks, NTM, DNC' },
      { id: 'mixture', name: 'Mixture of Experts', description: 'MoE, Switch Transformer' },
      { id: 'retrieval', name: 'Retrieval Augmented', description: 'RAG, RETRO' },
    ],
  },
  {
    id: 'self-supervised',
    name: 'Self-Supervised & Contrastive Learning',
    description: 'Learning without labels through contrastive methods',
    icon: '🔍',
    subcategories: [
      { id: 'contrastive', name: 'Contrastive', description: 'SimCLR, MoCo, BYOL' },
      { id: 'masked', name: 'Masked Modeling', description: 'MAE, DINO' },
    ],
  },
];

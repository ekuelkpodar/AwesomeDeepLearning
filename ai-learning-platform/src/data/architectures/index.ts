import type { Architecture } from '../../types';
import resnet50 from './resnet50.json';
import transformer from './transformer.json';
import perceptron from './perceptron.json';
import mlp from './mlp.json';
import lenet5 from './lenet5.json';
import alexnet from './alexnet.json';
import vgg16 from './vgg16.json';
import vanillaRnn from './vanilla-rnn.json';
import lstm from './lstm.json';
import gru from './gru.json';
import bert from './bert.json';
import gpt from './gpt.json';
import autoencoder from './autoencoder.json';
import vae from './vae.json';
import denoisingAutoencoder from './denoising-autoencoder.json';
import gan from './gan.json';
import diffusion from './diffusion.json';
import stylegan from './stylegan.json';
import gcn from './gcn.json';
import gat from './gat.json';
import graphsage from './graphsage.json';
import dqn from './dqn.json';
import ppo from './ppo.json';
import a3c from './a3c.json';
import ebm from './ebm.json';
import rbm from './rbm.json';
import hopfield from './hopfield.json';
import snn from './snn.json';
import lif from './lif.json';
import stdp from './stdp.json';
import ntm from './ntm.json';
import capsnet from './capsnet.json';
import neural_ode from './neural_ode.json';
import simclr from './simclr.json';
import byol from './byol.json';
import moco from './moco.json';

// Import other architecture JSON files as they're created
// This is the main registry of all architectures

export const architectures: Record<string, Architecture> = {
  // Feedforward & Fully Connected
  perceptron: perceptron as Architecture,
  mlp: mlp as Architecture,

  // CNNs
  lenet5: lenet5 as Architecture,
  alexnet: alexnet as Architecture,
  vgg16: vgg16 as Architecture,
  resnet50: resnet50 as Architecture,

  // RNNs
  'vanilla-rnn': vanillaRnn as Architecture,
  lstm: lstm as Architecture,
  gru: gru as Architecture,

  // Transformers
  transformer: transformer as Architecture,
  bert: bert as Architecture,
  gpt: gpt as Architecture,

  // Autoencoders
  autoencoder: autoencoder as Architecture,
  vae: vae as Architecture,
  'denoising-autoencoder': denoisingAutoencoder as Architecture,

  // Generative Models
  gan: gan as Architecture,
  diffusion: diffusion as Architecture,
  stylegan: stylegan as Architecture,

  // Graph Neural Networks
  gcn: gcn as Architecture,
  gat: gat as Architecture,
  graphsage: graphsage as Architecture,

  // Reinforcement Learning
  dqn: dqn as Architecture,
  ppo: ppo as Architecture,
  a3c: a3c as Architecture,

  // Energy-Based & Probabilistic Models
  ebm: ebm as unknown as Architecture,
  rbm: rbm as unknown as Architecture,
  hopfield: hopfield as unknown as Architecture,

  // Spiking & Neuromorphic Models
  snn: snn as unknown as Architecture,
  lif: lif as unknown as Architecture,
  stdp: stdp as unknown as Architecture,

  // Hybrid & Specialized Models
  ntm: ntm as unknown as Architecture,
  capsnet: capsnet as unknown as Architecture,
  neural_ode: neural_ode as unknown as Architecture,

  // Self-Supervised & Contrastive Models
  simclr: simclr as unknown as Architecture,
  byol: byol as unknown as Architecture,
  moco: moco as unknown as Architecture,

  // Additional architectures will be added here
};

// Helper function to get all architectures
export const getAllArchitectures = (): Architecture[] => {
  return Object.values(architectures);
};

// Helper function to get architecture by ID
export const getArchitectureById = (id: string): Architecture | undefined => {
  return architectures[id];
};

// Helper function to get architectures by category
export const getArchitecturesByCategory = (category: string): Architecture[] => {
  return getAllArchitectures().filter(arch => arch.category === category);
};

// Helper function to search architectures
export const searchArchitectures = (query: string): Architecture[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllArchitectures().filter(arch =>
    arch.name.toLowerCase().includes(lowercaseQuery) ||
    arch.description.toLowerCase().includes(lowercaseQuery) ||
    arch.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export default architectures;

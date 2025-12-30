import { Architecture } from '../../types';
import resnet50 from './resnet50.json';
import transformer from './transformer.json';

// Import other architecture JSON files as they're created
// This is the main registry of all architectures

export const architectures: Record<string, Architecture> = {
  resnet50: resnet50 as Architecture,
  transformer: transformer as Architecture,
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

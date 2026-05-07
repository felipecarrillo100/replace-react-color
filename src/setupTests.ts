console.log('Setup Tests Loaded');
import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('@icons/material/CheckIcon', () => ({
  default: () => 'CheckIcon'
}));
// Removed reactcss mock

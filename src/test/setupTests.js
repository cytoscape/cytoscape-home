import '@testing-library/jest-dom'

// Mock ResizeObserver used by @headlessui/react in tests
class ResizeObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver

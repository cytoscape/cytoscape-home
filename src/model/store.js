import { create } from 'zustand';


export const useSearchStateStore = create((set) => ({
  terms: null,
  
  setTerms: (newTerms) => set(() => {
    return { terms: Array.isArray(newTerms) ? [...newTerms] : null }
  }),
  clearTerms: () => set(() => ({ terms: null })),
  getTerms: () => {
    const state = useSearchStateStore.getState();
    return state.terms ? Array.from(state.terms) : [];
  },
  getText: () => {
    const state = useSearchStateStore.getState();
    return state.terms != null ? Array.from(state.terms).map(String).join(' ') : null
  },
  getTermsCount: () => {
    const state = useSearchStateStore.getState();
    return state.terms?.length || 0;
  },
}))

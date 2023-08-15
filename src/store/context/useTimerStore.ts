import {create} from 'zustand';

interface TimerStoreState {
  isRunning: boolean;
  remainingTime: number;
  startTimer: () => void;
  stopTimer: () => void;
}

const useTimerStore = create<TimerStoreState>((set) => ({
  isRunning: false,
  remainingTime: 5 * 60,

  startTimer: () => {
    set({ isRunning: true });
    const interval = setInterval(() => {
      set((state) => {
        if (state.remainingTime > 0) {
          return { remainingTime: state.remainingTime - 1 };
        } else {
          clearInterval(interval);
          return { isRunning: false, remainingTime: 5 * 60 };
        }
      });
    }, 1000);
  },

  stopTimer: () => {
    set({ isRunning: false, remainingTime: 5 * 60 });
  },
}));

export default useTimerStore;

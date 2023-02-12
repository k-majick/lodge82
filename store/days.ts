import { defineStore } from 'pinia';
import Day from '@/types/common';

interface IDaysState {
  daysSelected: Day[];
}

export const useDaysStore = defineStore({
  id: 'days-store',
  state: (): IDaysState => ({
    daysSelected: [],
  }),
  actions: {
    addSelectedDay(day: Day) {
      this.daysSelected.push(day);
    },

    removeSelectedDay(date: string) {
      this.daysSelected = this.daysSelected.filter(day => day.date !== date);
    },

    resetSelectedDays() {
      this.daysSelected = [];
    },
  },
  getters: {
    selectedDays: state => state.daysSelected,
  },
});

import { customRef, ref } from "vue";

const debounce = (fn: CallableFunction, delay = 0, immediate = false) => {
  let timeout: number;
  return (...args: Array<unknown>) => {
    if (immediate && !timeout) fn(...args);
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const useDebouncedRef = (
  initialValue: unknown,
  delay: number,
  immediate: boolean
) => {
  const state = ref(initialValue);
  return customRef((track, trigger) => ({
    get() {
      track();
      return state.value;
    },
    set: debounce(
      (value: unknown) => {
        state.value = value;
        trigger();
      },
      delay,
      immediate
    ),
  }));
};

export default useDebouncedRef;

import { customRef, ref } from 'vue';

const debounce = (fn: any, delay: any = 0, immediate: boolean = false) => {
    let timeout: any;
    return (...args: any) => {
        if (immediate && !timeout) fn(...args)
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

const useDebouncedRef = (initialValue: any, delay: any, immediate: any) => {
    const state = ref(initialValue)
    return customRef((track, trigger) => ({
        get() {
            track()
            return state.value
        },
        set: debounce(
            (value: any) => {
                state.value = value
                trigger()
            },
            delay,
            immediate,
        ),
    }));
};

export default useDebouncedRef;

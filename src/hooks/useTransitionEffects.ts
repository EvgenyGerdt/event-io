import gsap from "gsap";

export default function useTransitionEffects() {
    function onBeforeEnter(el: any) {
        el.style.opacity = 0
        el.style.height = 0
    }

    function onEnter(el: any, done: any) {
        gsap.to(el, {
            opacity: 1,
            height: '1.6em',
            delay: el.dataset.index * 0.15,
            onComplete: done
        })
    }

    function onLeave(el: any, done: any) {
        gsap.to(el, {
            opacity: 0,
            height: 0,
            delay: el.dataset.index * 0.15,
            onComplete: done
        })
    }

    return {
        onBeforeEnter,
        onEnter,
        onLeave,
    };
}

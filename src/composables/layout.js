import { shallowRef, onMounted, onUnmounted, defineAsyncComponent } from 'vue'

export function useLayout() {
    const layout = shallowRef(null)

    const onRize = () => {
        const width = window.innerWidth
        if (width < 768) {
            layout.value = defineAsyncComponent(() => import('@/layouts/LayoutSmall.vue'))
        } else if (width < 1200) {
            layout.value = defineAsyncComponent(() => import('@/layouts/LayoutMedium.vue'))
        } else {
            layout.value = defineAsyncComponent(() => import('@/layouts/LayoutLarge.vue'))
        }
    }


    onMounted(() => {
        window.addEventListener('resize', onRize)
        onRize()
    })

    onUnmounted(() => {
        window.removeEventListener('resize', onRize)
    })

    return { layout }
}
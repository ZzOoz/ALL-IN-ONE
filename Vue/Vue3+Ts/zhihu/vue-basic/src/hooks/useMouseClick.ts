import { ref, onMounted, onUnmounted } from 'vue'
function MouseEvent() {
    const x = ref(0);
    const y = ref(0);
    const mouseClick = (e: MouseEvent) => {
        x.value = e.pageX;
        y.value = e.pageY;
    };
    onMounted(() => {
        document.addEventListener("click", mouseClick);
    });

    onUnmounted(() => {
        document.addEventListener("click", mouseClick);
    });

    return {
        x,
        y
    }
}

export default MouseEvent
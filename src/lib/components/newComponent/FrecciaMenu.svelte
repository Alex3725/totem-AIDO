<script lang="ts">
	type ButtonHandler = (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;

	let {
		onPrev = () => {},
		onNext = () => {}
	}: {
		onPrev?: ButtonHandler;
		onNext?: ButtonHandler;
	} = $props();
</script>

<div class="flex justify-between items-center w-full">
    <button
        onclick={onPrev}
        aria-label="Precedente"
        class="flex items-center justify-center rounded-full bg-white border-2 border-slate-600 shadow-md cursor-pointer transition-transform active:scale-95 size-12"
    >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="15 18 9 12 15 6" stroke="#334155" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>

    <button
        onclick={onNext}
        aria-label="Successivo"
        class="flex items-center justify-center rounded-full bg-white border-2 border-slate-600 shadow-md cursor-pointer transition-transform active:scale-95 size-12"
    >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9 18 15 12 9 6" stroke="#334155" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
</div>

<script lang="ts" context="module">
  function isNumber(value: unknown): value is number {
    return typeof value === 'number';
  }

  function range(start: number, end: number, step = 1) {
    if (start + step >= end) return [start];
    return [start, ...range(start + step, end)];
  }

  function resolveClassName(className: { selected: string; unselected: string }) {
    const { selected, unselected } = className;
    return function (isSelected: boolean) {
      return isSelected ? selected : unselected;
    };
  }
</script>

<script lang="ts">
  import { iStar, illustrationThankYou } from '$assets';
  import { fade } from 'svelte/transition';

  let rating: number | undefined;
  let state: 'idle' | 'submitted' = 'idle';

  function handleSubmit() {
    if (isNumber(rating)) state = 'submitted';
  }

  const getClassName = resolveClassName({
    unselected: 'text-slate-500 bg-slate-500/15 hover:(bg-slate-500 text-white)',
    selected: 'bg-orange text-white',
  });
</script>

<main class="overflow-hidden">
  {#if state === 'idle'}
    <div
      class="absolute over-center w-full max-w-xs sm:max-w-sm p-8 | bg-slate-800/80 rounded-2xl"
      transition:fade
    >
      <form class="flex flex-col gap-6" on:submit|preventDefault={handleSubmit}>
        <div
          class="h-10 w-10 min-w-10 sm:(h-12 w-12 min-w-12) | grid place-content-center | bg-slate-500/15 rounded-full"
        >
          <img src={iStar} alt="" />
        </div>
        <div class="flex flex-col gap-3">
          <span class="text-2xl font-bold text-white">How did we do?</span>
          <p class="text-[15px] leading-relaxed">
            Please let us know how we did with your support request. All feedback is appreciated to
            help us improve our offering!
          </p>
        </div>
        <div class="flex justify-between">
          {#each range(1, 6) as index}
            <button
              class="h-10 w-10 min-w-10 sm:(h-12 w-12 min-w-12) {getClassName(
                index === rating
              )} | flex items-center justify-center | rounded-full text-sm"
              type="button"
              on:click={() => (rating = index)}
            >
              {index}
            </button>
          {/each}
        </div>
        <button
          class="py-3 | bg-orange rounded-full sm:text-lg text-white uppercase tracking-wider hover:(bg-white text-orange)"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  {:else}
    <div
      class="absolute over-center w-full max-w-xs sm:max-w-sm p-8 | bg-slate-800/80 rounded-2xl"
      transition:fade={{ delay: 300 }}
    >
      <div class="flex flex-col items-center gap-6">
        <img src={illustrationThankYou} alt="" />
        <div class="px-4 py-2 | bg-slate-500/15 rounded-full text-orange">
          <span> You selected out {rating} of 5</span>
        </div>
        <div class="flex flex-col items-center gap-3">
          <span class="text-2xl font-bold text-white">Thank you!</span>
          <p class="text-[15px] text-center leading-relaxed">
            We appreciate you taking the time to give a rating. If you ever need more support, don’t
            hesitate to get in touch!
          </p>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  .over-center {
    @apply top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2;
  }
</style>

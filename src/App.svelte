<script lang="ts" context="module">
  function range(start: number, end: number, step = 1): number[] {
    if (start + step >= end) return [start];
    return [start, ...range(start + step, end)];
  }
</script>

<script lang="ts">
  import { Rating, RatingButton } from '@components';
  import { iStar, illustrationThankYou } from '@assets';
  import { fade } from 'svelte/transition';
</script>

<h1 class="sr-only">Support Rating Form</h1>

<Rating as="main" class="overflow-hidden" let:rate let:form let:state>
  {#if state === 'IDLE'}
    <section
      class="absolute position-center max-w-xs w-full p-8 | bg-slate-800/80 rounded-2xl | sm:max-w-sm"
      transition:fade
    >
      <form class="flex flex-col gap-6" use:form>
        <div
          class="h-10 min-w-10 w-10 | grid place-content-center | bg-slate-500/15 rounded-full | sm:(h-12 min-w-12 w-12)"
        >
          <img src={iStar} alt="" />
        </div>
        <div class="flex flex-col gap-3">
          <h2 class="text-2xl text-white font-bold">How did we do?</h2>
          <p class="text-[15px] leading-relaxed">
            Please let us know how we did with your support request. All feedback is appreciated to
            help us improve our offering!
          </p>
        </div>
        <div class="flex justify-between">
          {#each range(1, 6) as index}
            <RatingButton
              class={{
                base: 'h-10 w-10 min-w-10 | grid place-content-center | rounded-full text-sm | sm:(h-12 min-w-12 w-12)',
                selected: {
                  off: 'bg-slate-500/15 text-slate-500 | hover:(bg-slate-500 text-white)',
                  on: 'bg-orange text-white',
                },
              }}
              rating={index}
            />
          {/each}
        </div>
        <button
          class="py-3 | bg-orange rounded-full text-white uppercase tracking-wider | hover:(bg-white text-orange) | sm:text-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  {:else}
    <section
      class="absolute position-center w-full max-w-xs p-8 | bg-slate-800/80 rounded-2xl | sm:max-w-sm"
      transition:fade={{ delay: 300 }}
    >
      <div class="flex flex-col items-center gap-6">
        <img src={illustrationThankYou} alt="" />
        <div class="px-4 py-2 | bg-slate-500/15 rounded-full text-orange">
          <span> You selected out {rate} of 5</span>
        </div>
        <div class="flex flex-col items-center gap-3">
          <h2 class="sr-only">Support Rating Form Results</h2>
          <span class="text-2xl text-white font-bold">Thank you!</span>
          <p class="text-[15px] text-center leading-relaxed">
            We appreciate you taking the time to give a rating. If you ever need more support, don't
            hesitate to get in touch!
          </p>
        </div>
      </div>
    </section>
  {/if}
</Rating>

<style>
  .position-center {
    @apply top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2;
  }
</style>

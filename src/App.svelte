<script lang="ts" context="module">
  function range(start: number, end: number, step = 1) {
    if (start + step >= end) return [start];
    return [start, ...range(start + step, end)];
  }
</script>

<script>
  import iconStar from './assets/icon-star.svg';
  import illustationThankYou from './assets/illustration-thank-you.svg';
</script>

<main>
  <form>
    <div>
      <img src={iconStar} alt="" />
    </div>
    <div>
      <span>How did we do?</span>
      <p>
        Please let us know how we did with your support request. All feedback is
        appreciated to help us improve our offering!
      </p>
    </div>
    <div>
      {#each range(1, 6) as rating}
        <button type="button">
          {rating}
        </button>
      {/each}
    </div>
    <button type="submit"> Submit </button>
  </form>
  <div>
    <img src={illustationThankYou} alt="" />
    <div>
      <span> You selected out $rating of 5</span>
    </div>
    <div>
      <span>Thank you!</span>
      <p>
        We appreciate you taking the time to give a rating. If you ever need more support,
        don’t hesitate to get in touch!
      </p>
    </div>
  </div>
</main>

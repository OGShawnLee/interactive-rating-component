<script lang="ts">
  import Rating from './state';
  import type { Nullable, RenderElementTagName } from 'malachite-ui/types';
  import { Render } from 'malachite-ui/components';
  import { storable } from 'malachite-ui/stores';

  export let rate: Nullable<number> = null;

  const { Rate, State, form } = new Rating({ Rate: storable({ Store: rate, initialValue: null }) });

  let className: Nullable<string> = undefined;

  export { className as class };
  export let as: RenderElementTagName = 'button';
</script>

<Render {as} class={className} {...$$restProps}>
  <slot rate={$Rate} state={$State} form={form.action} />
</Render>

<script lang="ts">
  import { Context } from './state';
  import type { ClassName, RenderElementTagName } from 'malachite-ui/types';
  import { Render } from 'malachite-ui/components';
  import { useClassNameResolver } from 'malachite-ui/hooks';
  import { Bridge } from 'malachite-ui/stores';

  const { Rate, initButton } = Context.getContext();
  const Proxy = new Bridge();
  const button = initButton(Proxy).action;

  let className: ClassName<'isSelected'>;

  export { className as class };
  export let rating: number;
  export let as: RenderElementTagName = 'button';

  $: isSelected = rating === $Rate;
  $: finalClassName = useClassNameResolver(className)({ isSelected: rating === $Rate });
</script>

<Render
  {as}
  class={finalClassName}
  type="button"
  use={[[button, rating]]}
  {...$$restProps}
  on:click
>
  <slot rate={$Rate} {rating} {isSelected} {button}>
    <span>
      {rating}
    </span>
  </slot>
</Render>

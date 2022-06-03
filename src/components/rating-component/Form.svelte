<script lang="ts">
  import { Context } from './state';
  import { Render } from 'malachite-ui/components';
  import type { Nullable, RenderElementTagName } from 'malachite-ui/types';

  const { Rate, State, form } = Context.getContext();

  let className: Nullable<string> = undefined;

  export { className as class };
  export let as: RenderElementTagName = 'button';
</script>

<Render {as} class={className} use={[[form.action]]} {...$$restProps}>
  <slot rate={$Rate} state={$State} form={form.action} />
</Render>

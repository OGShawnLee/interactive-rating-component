import type { Expand, ExtractContext, Store } from 'malachite-ui/types';
import type { Bridge } from 'malachite-ui/stores';
import { Component, defineActionComponentWithParams } from 'malachite-ui/core';
import { useContext, useListener } from 'malachite-ui/hooks';
import { isNumber, isObject } from 'malachite-ui/predicate';
import { writable } from 'svelte/store';
import { onMount } from 'svelte';

export default class RatingComponent extends Component {
  readonly Rate: Store<number | null>;
  readonly State = writable<'IDLE' | 'SUBMITTED'>('IDLE');

  protected readonly primitive: { rate: number | null } = {
    rate: null,
  };

  constructor({ Rate }: Expand<Options>) {
    super({ component: 'rating', index: RatingComponent.generateIndex() });
    this.Rate = Rate;

    Context.setContext({
      Rate: this.Rate,
      State: this.State,
      form: this.form,
      initButton: this.initButton.bind(this),
    });

    onMount(() => this.Rate.subscribe((rate) => (this.primitive.rate = rate)));
  }

  get subscribe() {
    return this.Rate.subscribe;
  }

  get form() {
    return this.defineActionComponent({
      onMount: this.nameChild('form'),
      destroy: ({ element }) =>
        useListener(element, 'submit', (event) => {
          event.preventDefault();
          if (isNumber(this.primitive.rate)) this.State.set('SUBMITTED');
        }),
    });
  }

  initButton(Button: Bridge) {
    const index = RatingComponent.generateButtonIndex();
    return defineActionComponentWithParams<number>({
      Bridge: Button,
      onMount: () => this.nameChild({ name: 'button', index }),
      destroy: ({ element, parameter }) =>
        useListener(element, 'click', () => this.Rate.set(parameter.value)),
    });
  }

  private static generateIndex = this.initIndexGenerator();
  private static generateButtonIndex = this.initIndexGenerator();
}

interface Options {
  Rate: Store<number>;
}

type Context = ExtractContext<RatingComponent, 'Rate' | 'State' | 'form' | 'initButton'>;

export const Context = useContext({
  component: 'rating',
  predicate: (val): val is Context => isObject(val, ['Rate', 'State', 'form', 'initButton']),
});

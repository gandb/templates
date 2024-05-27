import { Component, Prop,Watch } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

 @Watch('middle')
  watchHandler(newValue: boolean, oldValue: boolean) {
    console.log('The old value of middle is: ' , oldValue);
    console.log('The new value of middle is: ', newValue);
  }

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div class="my-component">Hello, World! Eu sou um {this.getText()}</div>;
  }
}

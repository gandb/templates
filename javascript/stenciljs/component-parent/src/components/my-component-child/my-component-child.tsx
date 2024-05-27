import { Component, Prop } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component-child',
  styleUrl: 'my-component-child.css',
  shadow: true
})
export class MyComponentChild {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div class="my-component-child">Hello, World Filho! Eu sou um {this.getText()}</div>;
  }
}

import { Component, Prop } from '@stencil/core';
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

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  private calc():string
  {
      return " : " + this.getText();
  }

  render() {
    return  <div class="my-component">Hello, World! Eu sou um {this.getText()}    
      <my-component-child first="Component 2" last={ this.calc()}></my-component-child>
      <div class="my-component-child">Sem vazamentos</div>
    </div>;
  }
}

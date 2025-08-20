import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

import * as PIXI from 'pixi.js';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.getElementById('game').appendChild(app.view);

const texture = PIXI.Texture.fromImage('/img/bunny.png');
const bunny = new PIXI.Sprite(texture);
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;
bunny.position.x = 400;
bunny.position.y = 300;
bunny.scale.x = 2;
bunny.scale.y = 2;
app.stage.addChild(bunny);

// Listen for frame updates
app.ticker.add(() => {
     // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;
});


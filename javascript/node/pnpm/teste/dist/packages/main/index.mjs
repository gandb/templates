/* import('../../../dist/index.js').catch((err) => {
    console.error("Failed to load the module:", err);
  });
  */
import { somar } from 'mono-repo-project-01';
import { xisto } from 'mono-repo-project-02';
console.log(somar(2, 3), xisto.name); // 5

//https://cli.vuejs.org/config/#vue-config-js
// vue.config.js
module.exports = {
   pages: {
    index: {
      // entry for the page
      entry: 'src/main.ts',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page' 
    },
     anotherPage: {
      // entry for the page
      entry: 'src/another.ts',
      // the source template
      template: 'public/anotherPage.html',
      // output as dist/index.html
      filename: 'anotherPage.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Another Page' 
    } 
  }
}

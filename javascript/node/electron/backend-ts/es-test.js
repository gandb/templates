const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

console.log("Elastic Search Test");	

// promise API
client.search({
  index: 'movies',
  body: {
    query: {
      match: { title: 'star' }
    }
  }
}).then((result)=>{
	console.log("Result", result);	
	console.log("Result Hits", JSON.stringfy(result));	
});









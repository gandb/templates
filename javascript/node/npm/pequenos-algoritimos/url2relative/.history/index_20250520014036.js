
function urlToLocal(candidate,marker) {
  if(marker==undefined)
  {
    let ret = urlToLocal(candidate,"/main/");  
    if(ret==candidate ){
      ret = urlToLocal(candidate,"/img/");  
      return ret;
    }
    return ret;
  }

  let url;
  try {    
      // ex: "/5etools-img/main/items/XPHB/Maul.webp"
      const idx = candidate.indexOf(marker);
      if (idx === -1) {
        log(`URL sem marker: ${candidate}`);
        return candidate;
      }
    log(`URL tem marker: ${candidate}`);
      const relPath = candidate.substring(idx + marker.length); 
       log(`relPath: ${relPath}`);
       const ret = 'modules\\common-assets\\images\\5etools\\' + relPath.split('/').join('\\');
      return ret;
      
  } catch (e) { 
    log(`Erro ao converter: ${candidate} erro `,e);
    return candidate;
  }  
}

const url1="https://tools.banetavern.com/img/adventure/CoS/000-cos01-01.png";
const url1="https://raw.githubusercontent.com/5etools-mirror-2/5etools-img/main/items/XPHB/Maul.webp";

console.log(url1,"=",urlToLocal(url1));
console.log(urlToLocal(url2));
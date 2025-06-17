"user strict";


function extractUrls(text) {
  const urlRegex = /https?:\/\/[^\s"'<>]+/g;
  const matches = text.match(urlRegex);
  return matches || [];
}

const text = `

`;
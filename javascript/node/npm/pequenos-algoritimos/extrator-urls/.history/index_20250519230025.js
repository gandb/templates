"user strict";


function extractUrls(text) {
  const urlRegex = /https?:\/\/[^\s"'<>]+/g;
  const matches = text.match(urlRegex);
  return matches || [];
}

const text = `Here are some links: https://example.com, http://example.org, and https://sub.example.com/path?query=string.`;
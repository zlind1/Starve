let deployed = false;
let deployURL = 'https://some-api.com';
let devURL = 'http://localhost:5000';
let apiURL = deployed ? deployURL : devURL;

export async function GET(path, query=null) {
  let queryStr = (query === null ? '' :
   '?'+Object.entries(query).map(entry => entry[0]+'='+entry[1]).join('&'));
  let response = await fetch(apiURL+path+queryStr);
  return await response.json();
}

export async function POST(path, body) {
  let response = await fetch(apiURL+path, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(body)
  });
  return await response.json();
}

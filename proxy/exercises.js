export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { bodyPart, name, limit = 40, offset = 0 } = req.query;
  
  let url;
  if (bodyPart) url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(bodyPart)}?limit=${limit}&offset=${offset}`;
  else if (name) url = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(name)}?limit=1&offset=0`;
  else { res.status(400).json({ error: 'Missing bodyPart or name param' }); return; }

  try {
    const r = await fetch(url, {
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

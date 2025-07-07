// api/exchange.js

export default async function handler(req:any, res:any) {
  try {
    const response = await fetch(
      'https://agrobank.uz/api/v1/?action=pages&code=uz%2Fperson%2Fexchange_rates'
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Agrobank API' });
  }
}

// @ts-nocheck
// TODO: Remove the ts-nocheck comment and fix TS issues, @akselsf?

export default async function handler(req, res) {
  const portfolioId = process.env.SHAREVILLE_PORTFOLIO_ID;
  const fetchlink = `https://www.shareville.no/api/v1/portfolios/${portfolioId}/positions`;

  try {
    const data = await fetch(fetchlink).then((res) => res.json());
    if (data) {
      res.status(200).json({ data: data });
    } else res.status(404).json({ error: `Data not found` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

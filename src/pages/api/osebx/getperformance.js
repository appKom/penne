export default async function handler(req, res) {
  const index = "OSEBX";
  try {
    const data = await fetch(
      `https://api.prod.nntech.io/market-data/price-time-series/v2/period/YEAR_5/identifier/${index}?resolution=DAY`,
      {
        headers: { Origin: "https://www.shareville.no" },
      },
    ).then((res) => res.json());
    if (data && data.pricePoints) {
      let result = [];
      data.pricePoints.forEach((element) => {
        result.push({
          value: element.last / 10,
          date: new Date(element.timeStamp).toISOString(),
        });
      });
      res.status(200).json({ data: result });
    } else res.status(404).json({ error: `Data not found` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

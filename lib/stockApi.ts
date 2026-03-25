export const getMarketData = async (index: string) => {
  try {
    const res = await fetch(
      `https://api.prod.nntech.io/market-data/price-time-series/v2/period/YEAR_5/identifier/${index}?resolution=DAY`,
      {
        headers: { Origin: 'https://www.shareville.no' },
      },
    );

    if (!res.ok) {
      console.error(`Market data API returned ${res.status}`);
      return null;
    }

    const data = await res.json();

    if (data && data.pricePoints) {
      interface PricePoint {
        last: number;
        timeStamp: Date;
      }
      const result: { value: number; date: Date}[] = [];
      data.pricePoints.forEach((element: PricePoint) => {
        result.push({
          value: element.last / 10,
          date: new Date(element.timeStamp),
        });
      });
      return result;
    }

    console.error('Market data response missing pricePoints');
    return null;
  } catch (error) {
    console.error(`Failed to fetch market data: ${error}`);
    return null;
  }
}
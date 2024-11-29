export const getMarketData = async (index: string) => {
  try {
    const data = await fetch(
      `https://api.prod.nntech.io/market-data/price-time-series/v2/period/YEAR_5/identifier/${index}?resolution=DAY`,
      {
        headers: { Origin: 'https://www.shareville.no' },
      },
    ).then((res) => res.json());

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
      return result
    } else
      throw new Error('No data found');
  } catch (error) {
    throw new Error(`Failed to fetch market data: ${error}`);
  }
}
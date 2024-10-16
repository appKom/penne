import { NextResponse } from 'next/server';

export const GET = async () => {
  const index = 'OSEBX';
  try {
    const data = await fetch(
      `https://api.prod.nntech.io/market-data/price-time-series/v2/period/YEAR_5/identifier/${index}?resolution=DAY`,
      {
        headers: { Origin: 'https://www.shareville.no' },
      },
    ).then((res) => res.json());

    console.log(data);

    if (data && data.pricePoints) {
      interface PricePoint {
        last: number;
        timeStamp: string;
      }
      const result: { value: number; date: string }[] = [];
      data.pricePoints.forEach((element: PricePoint) => {
        result.push({
          value: element.last / 10,
          date: new Date(element.timeStamp).toISOString(),
        });
      });
      return NextResponse.json({ data: result }, { status: 200 });
    } else
      return NextResponse.json({ error: `Data not found` }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

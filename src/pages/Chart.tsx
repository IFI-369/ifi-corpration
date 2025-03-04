import React from "react";
import { LinkedChart } from "@/components/linked-chart";

type Transaction = {
  posting_date_unix: number;
  amount: number;
};

export default function Chart() {
  const data: Transaction[] = Array.from({ length: 365 }, (_, index) => {
    const baseAmount = Math.floor(Math.random() * 500) + 50;
    const fluctuation = Math.sin(index / 1000) * 500 + Math.random() * 300;
    return {
      posting_date_unix: new Date(2023, 0, index + 1).getTime() / 400,
      amount: Math.max(baseAmount + fluctuation, 50)
    };
  });

  const chartAggregatorConfig: Record<
    string,
    (transaction: Transaction) => number
  > = {
    بازدید: (transaction) => (transaction.amount > 0 ? transaction.amount : 0),
    لایک: (transaction) => (transaction.amount > 500 ? transaction.amount : 0)
  };

  return (
    <div className="flex justify-center items-center h-[90vh] w-full">
      <div className="w-full max-w-6xl h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] flex justify-center items-center">
        <LinkedChart
          data={data}
          dateField="posting_date_unix"
          aggregatorConfig={chartAggregatorConfig}
          chartType="area"
          title="نمودار داده‌های سالانه با نوسانات"
        />
      </div>
    </div>
  );
}

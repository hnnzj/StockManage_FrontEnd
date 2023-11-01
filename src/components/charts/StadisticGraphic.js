import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
export const StadisticGraphic = () => {
  return (
    <>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 100, label: "Total ventas" },
              { id: 1, value: 25, label: "TotalPedidos" },
              { id: 2, value: 20, label: "series C" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </>
  );
};

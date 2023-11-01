import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
export const VentasBarChart = () => {
  return (
    <>
      <BarChart
        series={[
          {
            data: [
              4, 3, 5, 4, 3, 5, 4, 3, 5, 4, 3, 5, 4, 3, 5, 4, 3, 5, 4, 3, 5, 4,
              3, 5, 4, 3, 5, 4, 3, 5, 100,
            ],
          },
        ]}
        width={640}
        height={300}
      />
    </>
  );
};

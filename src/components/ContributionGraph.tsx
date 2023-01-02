import { Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function ContributionGraph(props: {
  labels: Array<string>;
  data: Array<{
    label: string;
    data: Array<number>;
    borderColor: string;
    backgroundColor: string;
  }>;
}) {
  return (
    <Box>
      <Line
        datasetIdKey="id"
        data={{
          labels: props.labels,
          datasets: props.data,
        }}
      />
    </Box>
  );
}

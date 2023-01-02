import { useQuery } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { GET_CONTRIBUTIONS } from "../logic/github";
import { ContributionGraph } from "./ContributionGraph";

export function DisplayStats({
  userName,
  from,
  to,
}: {
  userName: string;
  from: string;
  to: string;
}) {
  const { loading, error, data } = useQuery(GET_CONTRIBUTIONS, {
    variables: {
      userName: userName,
      from: from,
      to: to,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const totalContributions =
    data?.user?.contributionsCollection.contributionCalendar.totalContributions;
  const days =
    data?.user?.contributionsCollection.contributionCalendar.weeks
      .flatMap((e) => e.contributionDays)
      .map((e) => {
        const splits = (e.date as string).split("-");
        return {
          count: e.contributionCount,
          yearmonth: `${splits[0]}-${splits[1]}`,
        };
      }) ?? [];
  const group = groupBy(days, (v) => v.yearmonth);
  const labels = Object.keys(group);
  const numbers = Object.values(group).map((e) => {
    return e
      .map((e) => e.count)
      .reduce((accumulator, current) => {
        return accumulator + current;
      }, 0);
  });

  return (
    <Box>
      <Typography>Total contributions {totalContributions}</Typography>
      <ContributionGraph
        labels={labels}
        data={[
          {
            label: "current",
            data: numbers,
            borderColor: "#36A2EB",
            backgroundColor: "#9BD0F5",
          },
        ]}
      />
    </Box>
  );
}

function groupBy<T>(arr: T[], fn: (item: T) => string) {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
}

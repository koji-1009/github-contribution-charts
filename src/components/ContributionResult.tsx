import { useQuery } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { formatISO, subYears } from "date-fns";
import { GET_CONTRIBUTIONS } from "../logic/github";
import { convert } from "../util/Converters";
import { ContributionsCollection } from "../__generated__/graphql";
import { ContributionGraph } from "./ContributionGraph";

export function ContributionResult({
  username,
  to,
}: {
  username: string;
  to: Date;
}) {
  const { previous, current } = {
    previous: useQuery(GET_CONTRIBUTIONS, {
      variables: {
        userName: username,
        from: formatISO(subYears(to, 2)),
        to: formatISO(subYears(to, 1)),
      },
    }),
    current: useQuery(GET_CONTRIBUTIONS, {
      variables: {
        userName: username,
        from: formatISO(subYears(to, 1)),
        to: formatISO(to),
      },
    }),
  };

  if (previous.loading || current.loading) return <p>Loading...</p>;
  if (previous.error) return <p>Error : {previous.error.message}</p>;
  if (current.error) return <p>Error : {current.error.message}</p>;

  const previousData = previous.data?.user?.contributionsCollection;
  const currentData = current.data?.user?.contributionsCollection;
  if (!previousData || !currentData) return <p>Data is empty</p>;

  const { previousCollection, currentCollection } = {
    previousCollection: convert(previousData as ContributionsCollection),
    currentCollection: convert(currentData as ContributionsCollection),
  };

  return (
    <Box>
      <Typography>
        Current total contributions {previousCollection.totalContributions}
      </Typography>
      <Typography>
        Previous total contributions {currentCollection.totalContributions}
      </Typography>
      <ContributionGraph
        labels={currentCollection.labels}
        data={[
          {
            label: "current",
            data: currentCollection.numbers,
            borderColor: "#36A2EB",
            backgroundColor: "#9BD0F5",
          },
          {
            label: "previous",
            data: previousCollection.numbers,
            borderColor: "#FF6384",
            backgroundColor: "#FFB1C1",
          },
        ]}
      />
    </Box>
  );
}

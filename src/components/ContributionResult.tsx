import { useQuery } from "@apollo/client";
import { Box, Grid, Typography } from "@mui/material";
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
    <Box paddingY={2}>
      <Grid container alignItems={"center"} textAlign={"center"}>
        <Grid item xs>
          <Typography>
            {currentCollection.labels[0]}~
            {currentCollection.labels[currentCollection.labels.length - 1]} :
            {currentCollection.totalContributions}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography>
            {previousCollection.labels[0]}~
            {previousCollection.labels[previousCollection.labels.length - 1]} :
            {previousCollection.totalContributions}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ContributionGraph
            labels={currentCollection.labels}
            data={[
              {
                label: currentCollection.labels[0],
                data: currentCollection.numbers,
                borderColor: "#36A2EB",
                backgroundColor: "#9BD0F5",
              },
              {
                label: previousCollection.labels[0],
                data: previousCollection.numbers,
                borderColor: "#FF6384",
                backgroundColor: "#FFB1C1",
              },
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

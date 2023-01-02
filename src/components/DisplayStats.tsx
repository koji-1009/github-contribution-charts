import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { GET_CONTRIBUTIONS } from "../logic/github";

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

  return (
    <Box>
      <p>
        pass{" "}
        {
          data?.user?.contributionsCollection.contributionCalendar
            .totalContributions
        }
      </p>
    </Box>
  );
}

import {
  gql,
  request,
} from "https://deno.land/x/graphql_request@v4.1.0/mod.ts";

export interface Contributions {
  user: User;
}

export interface User {
  contributionsCollection: ContributionsCollection;
}

export interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: Array<ContributionDays>;
}

export interface ContributionDays {
  contributionDays: ContributionDay;
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
}

export async function fetchContribution(
  { userName, from, to, token }: {
    userName: string;
    from: string;
    to: string;
    token: string;
  },
) {
  return await request<Contributions>(
    "https://api.github.com/graphql",
    query,
    {
      userName: userName,
      from: from,
      to: to,
    },
    {
      Authorization: `Bearer ${token}`,
    },
  );
}

const query = gql`
  query($userName:String!,$from:DateTime!, $to:DateTime!) {
    user(login: $userName){
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

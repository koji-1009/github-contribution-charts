export interface Contributions {
  data: GraphQLData;
}

export interface GraphQLData {
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
  const result = await fetch(
    "https://api.github.com/graphql",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        query: query,
        variables: {
          userName: userName,
          from: from,
          to: to,
        },
      }),
    },
  );

  return await result.json() as Contributions;
}

const query = `
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

import { ContributionsCollection } from "../__generated__/graphql";

export function convert(collection: ContributionsCollection | null) {
  const totalContributions =
    collection?.contributionCalendar.totalContributions ?? 0;
  const days =
    collection?.contributionCalendar.weeks
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

  return { totalContributions, labels, numbers };
}

function groupBy<T>(arr: T[], fn: (item: T) => string) {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
}

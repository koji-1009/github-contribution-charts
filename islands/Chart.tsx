import { useEffect, useState } from "preact/hooks";
import { Contributions, fetchContribution } from "../logic/github.ts";

interface ChartProps {
  userName: string;
  from: string;
  to: string;
  token: string;
}

export default function Chart(props: ChartProps) {
  const [state, setState] = useState<Contributions | null>();

  useEffect(() => {
    fetchContribution({
      userName: props.userName,
      from: props.from,
      to: props.to,
      token: props.token,
    }).then((contributions) => {
      setState(contributions);
    }).catch((reason) => {
      console.warn(reason);
    });

    return;
  }, [props]);

  return (
    <>
      <p>Sample</p>
      <p>
        {state?.data.user.contributionsCollection.contributionCalendar
          .totalContributions}
      </p>
    </>
  );
}

import { useEffect, useState } from "preact/hooks";
import { format } from "datetime/mod.ts";
import { debounce } from "async/mod.ts";
import Graph from "../components/Graph.tsx";
import { Contributions, fetchContribution } from "../logic/github.ts";

export default function Statstics() {
  const [state, setState] = useState<Contributions | null>();

  const [userName, setUserName] = useState("koji-1009");
  const [from, setFrom] = useState(format(new Date(), "yyyy-MM-dd"));
  const [to, setTo] = useState(format(new Date(), "yyyy-MM-dd"));
  const [token, setToken] = useState(
    "",
  );

  console.log(token);

  useEffect(() => {
    console.log("start effect");
    if (userName.length > 0 && token.length > 0) {
      console.log("start fetch");
      fetchContribution({
        userName: userName,
        from: `${from}T00:00:00Z`,
        to: `${to}T00:00:00Z`,
        token: token,
      }).then((contributions) => {
        console.log("set data");
        setState(contributions);
      }).catch((reason) => {
        console.warn(reason);
      });
    }

    return;
  }, [userName, from, to, token]);

  return (
    <>
      <h2>Parameters</h2>
      <input
        type="text"
        value={userName}
        onChange={(e) => {
          debounce((event) => {
            setUserName((e.target as HTMLInputElement).value);
          }, 1000);
        }}
      />
      <input
        type="text"
        value={token}
        onChange={(e) => {
          debounce((event) => {
            setToken((e.target as HTMLInputElement).value);
          }, 1000);
        }}
      />
      <input
        type="date"
        value={from}
        onChange={(e) => setFrom((e.target as HTMLInputElement).value)}
      />
      <input
        type="date"
        value={to}
        onChange={(e) => setTo((e.target as HTMLInputElement).value)}
      />

      <h2>Contributions</h2>
      <p>
        Total Contributions:{" "}
        {state?.data.user.contributionsCollection.contributionCalendar
          .totalContributions}
      </p>
      <Graph
        contributions={state?.data.user.contributionsCollection
          .contributionCalendar.weeks.map((element) =>
            element.contributionDays
          ) ??
          []}
      />
    </>
  );
}

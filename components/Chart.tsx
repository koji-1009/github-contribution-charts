import { Handlers, PageProps } from "$fresh/server.ts";
import { Contributions, fetchContribution } from "../logic/github.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { userName, from, to, token } = ctx.params;
    const data = await fetchContribution({
      userName: userName,
      from: from,
      to: to,
      token: token,
    });

    return ctx.render(data);
  },
};

export default function Chart({ data }: PageProps<Contributions | null>) {
  if (!data) {
    return <h1>data not found</h1>;
  }

  return (
    <>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1>
          {data.user.contributionsCollection.contributionCalendar
            .totalContributions}
        </h1>
      </div>
    </>
  );
}

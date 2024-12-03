import { TSprint } from "../sprint-schema";

export const SprintsList = ({ data }: { data: TSprint[] }) => {
  return (
    <div>
      <h1>Sprints List</h1>

      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>
  );
};

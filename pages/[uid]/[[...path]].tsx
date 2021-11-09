import { useRouter } from "next/router";

const Listing = () => {
  const { query } = useRouter();
  const { uid, path } = query;
  const filepath = path ? (path as string[]).join("/") : "";
  const location = `/${filepath}`;
  return (
    <p>
      {uid} {location}
    </p>
  );
};

export default Listing;

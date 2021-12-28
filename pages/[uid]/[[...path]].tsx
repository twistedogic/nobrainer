import { useRouter } from "next/router";
import { useUser } from "../../components/context/AppContext";

const Listing = () => {
  const { query } = useRouter();
  const { displayName } = useUser();
  const { uid, path } = query;
  const filepath = path ? (path as string[]).join("/") : "";
  const location = `/${filepath}`;
  return (
    <p>
      {uid} {location} {displayName}
    </p>
  );
};

export default Listing;

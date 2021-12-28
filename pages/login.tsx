import { useRouter } from "next/router";
import { useUser } from "../components/context/AppContext";

const Login = () => {
  const user = useUser();
  const router = useRouter();
  if (user) {
    router.push(`/${user.uid}`);
  } else {
    router.push(`/`);
  }
  return null;
};

export default Login;

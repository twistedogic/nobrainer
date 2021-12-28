import { logout } from "../firebase/client";

const Home = () => {
  const onClick = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <div>
      <button onClick={onClick}>logout</button>
    </div>
  );
};

export default Home;

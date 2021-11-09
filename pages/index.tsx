import Link from "next/link";

const SideBar = () => {
  return (
    <nav>
      <ul>
        <Link href="what/test/ok">link</Link>
      </ul>
    </nav>
  );
};

const Home = () => (
  <div>
    <SideBar />
  </div>
);

export default Home;

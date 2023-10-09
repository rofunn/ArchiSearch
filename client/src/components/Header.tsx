import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="flex gap-2 items-center bg-g/50 p-4">
      <img src={logo} width={50} />
      <p className="text-2xl text-b font-bold">ARCHISEARCH</p>
    </header>
  );
};

export default Header;

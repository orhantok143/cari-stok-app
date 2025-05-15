import { Link, useLocation} from "react-router-dom";

const Navbar = () => {
  const location = useLocation()

  const navItems = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Gelir ", path: "/gelirler" },
    { name: "Gider", path: "/giderler" },
    { name: "Stok", path: "/stocks" },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`hover:text-yellow-400 transition ${
                location.pathname === item.path ? "text-yellow-400 font-semibold" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

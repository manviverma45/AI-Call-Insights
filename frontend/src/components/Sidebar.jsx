import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Upload Audio", path: "/upload" },
    { label: "Live Calls", path: "/live-calls" },
    { label: "Insights", path: "/insight/sample-id" }, // test route
    { label: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-64 bg-gray-800 p-5 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-green-400">📞 Call Insights</h2>
      <nav className="space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-3 py-2 rounded hover:bg-gray-700 transition ${
              location.pathname === item.path ? "bg-gray-700 text-green-300" : "text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

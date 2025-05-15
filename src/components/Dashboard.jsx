import { FaUsers, FaMoneyBillWave, FaMoneyCheckAlt, FaBoxes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate()
  const dashboardItems = [
    {
      label: "Cari Hareketleri",
      icon: <FaUsers className="text-blue-600 text-3xl" />,
      bg: "bg-blue-100",
      text: "text-blue-500",
      onClick: ()=> navigate("/cariler")
    },
    {
      label: "Gelir",
      icon: <FaMoneyBillWave className="text-green-600 text-3xl" />,
      bg: "bg-green-100",
      text: "text-green-500",
      onClick: ()=> navigate("/gelirler")
    },
    {
      label: "Gider",
      icon: <FaMoneyCheckAlt className="text-red-600 text-3xl" />,
      bg: "bg-red-100",
      text: "text-red-500",
      onClick: ()=> navigate("/giderler")
    },
    {
      label: "Stok",
      icon: <FaBoxes className="text-yellow-600 text-3xl" />,
      bg: "bg-yellow-100",
      text: "text-yellow-500",
      onClick: ()=> navigate("/stocks")
    },
  ];
  return (
    <div className="h-screen w-full cursor-pointer">
      <h2 className="text-2xl p-6 font-bold" >Ana Sayfa</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-6">
      {dashboardItems.map((item, index) => (
        <div key={index} onClick={item.onClick} className={`rounded-xl shadow-md p-4 h-30 flex items-center gap-4 ${item.bg}`}>
          <div>{item.icon}</div>
          <div className={`text-lg ${item.text} font-semibold`}>{item.label}</div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Dashboard;

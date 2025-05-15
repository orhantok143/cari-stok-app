import React, { useEffect, useState } from "react";
import { FaUsers, FaMoneyBillWave, FaMoneyCheckAlt, FaBoxes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getGelirler } from "../redux/gelir/gelirSlice";
import { getStockler } from "../redux/stock/stockSlice";
import { getGiderler } from "../redux/gider/giderSlice";


const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const gel= []
const gelirler = useSelector(state => state.gelir.gelirler);
const giderler = useSelector(state => state.gider.giderler);
const stock = useSelector(state => state.stock.stockler);

const totalGelir = gelirler?.filter(item=>item.tur==="Gelir").reduce((sum, item) => sum + item.tutar, 0) ?? 0;
const totalGider = giderler?.filter(item=>item.tur==="Gider").reduce((sum, item) => sum + item.tutar, 0) ?? 0;
const totalStock = stock?.reduce((sum, item) => sum + item.tutar*item.adet, 0) ?? 0;


const dashboardItems = [
  {
    label: "Cari Hareketleri",
    icon: <FaUsers className="text-blue-600 text-3xl" />,
    bg: "bg-blue-100",
    text: "text-blue-500",
    value: null,
    onClick: () => navigate("/cariler")
  },
  {
    label: "Gelir",
    icon: <FaMoneyBillWave className="text-green-600 text-3xl" />,
    bg: "bg-green-100",
    text: "text-green-500",
    value: totalGelir.toLocaleString() + " ₺",
    onClick: () => navigate("/gelirler")
  },
  {
    label: "Gider",
    icon: <FaMoneyCheckAlt className="text-red-600 text-3xl" />,
    bg: "bg-red-100",
    text: "text-red-500",
    value: totalGider.toLocaleString() + " ₺",
    onClick: () => navigate("/giderler")
  },
  {
    label: "Stok",
    icon: <FaBoxes className="text-yellow-600 text-3xl" />,
    bg: "bg-yellow-100",
    text: "text-yellow-500",
    value: totalStock.toLocaleString() + " ₺",
    onClick: () => navigate("/stocks")
  },
];


useEffect(() => {
  if (!gelirler || gelirler.length === 0) {
    dispatch(getGelirler());
  }
  if (!giderler || giderler.length === 0) {
    dispatch(getGiderler());
  }
  if (!stock || stock.length === 0) {
    dispatch(getStockler());
  }
}, [dispatch]);




  return (
    <div className="h-screen w-full cursor-pointer">
      <h2 className="text-2xl p-6 font-bold" >Ana Sayfa</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-6">
      {dashboardItems.map((item, index) => (
        <React.Fragment key={index}>
        <div  onClick={item.onClick} className={`rounded-xl shadow-md p-4 h-30 flex items-center gap-4 justify-between ${item.bg}`}>
         <div className="flex items-start gap-4">
           <div>{item.icon}</div>
          <div className={`text-lg ${item.text} font-semibold`}>{item.label}</div>
         </div>
        {
          item.value?
          <div className={`${item.text} p-2 bg-gray-800 rounded-xl`}>
         {item.value}
        </div>
        :null
        }
        </div>
        </React.Fragment>
      ))}
    </div>
    </div>
  );
};

export default Dashboard;

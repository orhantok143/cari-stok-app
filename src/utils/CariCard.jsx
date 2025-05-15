import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaShop } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CariCard = ({ cari, handleSil, handleFaturaEkle, handleDuzenle }) => {
  const navigate = useNavigate();
  return (
    <div className={`relative bg-gray-800 p-6 rounded-2xl mt-6 cursor-pointer`}>
      <div className="flex justify-between">
        <div
          onClick={() => navigate(`/cariler/${cari._id}`)}
          className="flex-1"
        >
          <div className="flex items-center gap-2 mb-2">
            {" "}
            <FaShop
              size={34}
              className={`p-1 rounded-md border ${
                cari.status === "Borçlu"
                  ? "bg-green-500/15 text-green-500"
                  : "bg-red-500/15 text-red-500"
              }`}
            />
            <h2 className="text-xl"> {cari.title} </h2>
          </div>
          <p className="text-gray-500 text-xs mb-1"> {cari.name} </p>
          <p className="text-gray-500 text-xs"> {cari.phone} </p>
        </div>
        <div className="flex flex-col items-end justify-between ">
          <div className="flex items-centerjustify-between">
            <MdDelete
              onClick={() => handleSil(cari._id)}
              size={22}
              className="text-red-500"
            />
            <AiFillEdit
              onClick={() => handleDuzenle(cari)}
              size={22}
              className="text-yellow-500"
            />
          </div>
          <button
            onClick={() => handleFaturaEkle(cari._id)}
            className="bg-blue-500 py-1 px-2 rounded-lg text-sm font-normal "
          >
            Fatura Ekle
          </button>
        </div>
      </div>

      {cari.bakiye === 0 ?null:(
        <>
          <div
            className={`absolute -top-3 right-0 px-2 py-1 rounded-lg font-medium text-xs ${
              cari.status === "Borçlu"
                ? "bg-green-500/15 text-green-500"
                : "bg-red-500/15 text-red-500"
            } `}
          >
            {" "}
            {cari.status}: {cari.bakiye}
          </div>
        </>
      )}
    </div>
  );
};

export default CariCard;

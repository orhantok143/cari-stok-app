import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit} from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getCariFaturaler, removeCariFatura } from "../redux/cariFatura/cariFaturaSlice";
import { useParams } from "react-router-dom";

const CariFaturaListesi = () => {
  const dispatch = useDispatch();
  const params = useParams()
  const {cariId} = params
  const [faturalar, setFaturalar] = useState(
    useSelector((state) => state.cariFatura.cariFaturalar)
  );
  const {loading} = useSelector((state) => state.cariFatura.cariFaturalar)

  useEffect(() => {
    if (faturalar.length === 0) {
      dispatch(getCariFaturaler()).then((data)=>{
        setFaturalar(data.payload)
      })
    }
    
  }, []);

  const deleteCariFatura = (id)=>{
    if (confirm("Faturayı silmek istediğinizden emin misinzi?")) {
      const updatedCariFaturalar= faturalar.filter(item=>item._id !== id)
    setFaturalar(updatedCariFaturalar)
    dispatch(removeCariFatura(id))
    }
  }

// const updatedCariFatura = (data)=>{
//   if (confirm("Faturayı değiştirmek istediğinizden emin misiniz?")) {
//     const findIndex = faturalar.findIndex(item=>item._id !==data._id)
    
//   }

// }

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Fatura Listesi</h2>

      {loading ? (
        <div className="text-gray-400">Yükleniyor...</div>
      ) : faturalar.length === 0 ? (
        <div className="text-gray-500">Bu cariye ait fatura bulunamadı.</div>
      ) : (
        <div className="overflow-x-auto rounded-md text-xs font-medium">
          <table className="w-full text-xs table-auto border-collapse bg-gray-800 rounded-md overflow-hidden">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="p-3 text-left">Tarih</th>
                <th className="p-3 text-left">Açıklama</th>
                <th className="p-3 text-right">Tutar (₺)</th>
                {/* <th className="p-3 text-center">Tur</th> */}
                <th className="p-3 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {faturalar.filter(item=>item.cari===cariId).map((fatura) => (
                <tr
                  key={fatura._id}
                  className={`border-t border-gray-600 hover:bg-gray-700 transition  ${fatura.faturaTuru ==="Gelir Faturası"
                          ? "bg-green-600/10 text-white"
                          : "bg-red-600/10 text-white"}`}
                >
                  <td className="p-3">
                    {new Date(fatura.tarih).toLocaleDateString()}
                  </td>
                  <td className="p-3"> {fatura.aciklama} </td>
                  <td className="p-3 text-right">{fatura.tutar.toFixed(2)}</td>
                  {/* <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs text-nowrap ${
                        fatura.faturaTuru ==="Gelir Faturası"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {fatura.faturaTuru}
                    </span>
                  </td> */}
                  <td className="px-4 py-2 text-center space-x-2 flex items-center justify-center">
                    <AiFillEdit
                      size={25}
                      className="bg-yellow-500/10 text-yellow-500 p-1 rounded-md hover:bg-yellow-600 transition"
                    />
                    <MdDelete
                    onClick={()=>deleteCariFatura(fatura._id)}
                      size={25}
                      className="bg-red-500/10 text-red-400 p-1 rounded-md hover:bg-red-600 transition"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CariFaturaListesi;

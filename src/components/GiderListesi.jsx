import { useEffect, useState } from "react";
import GiderEkleModal from "./GiderEkleModal"; // uygun path ile
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { addGider, getGiderler, removeGider, setEditGider } from "../redux/gider/giderSlice";
import { useDispatch, useSelector } from "react-redux";

const GiderListesi = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [giderler, setGiderler] = useState(useSelector(state=>state.gider.giderler));
  const {loading} = useSelector(state=>state.gider)

  useEffect(()=>{
    if (giderler.length === 0) {
      dispatch(getGiderler()).then(data=>{
        setGiderler(data.payload)
      })
    }
  },[])

  const [modalAcik, setModalAcik] = useState(false);

  const handleSil = async (id) => {
    if (confirm("Silmek istediğinizden emin misiniz")) {
      
      const updateGiderler = giderler.filter(item=>item._id !==id)
      setGiderler(updateGiderler)
      dispatch(removeGider(id))
    }
  };

const handleEdit= (gider)=>{
  dispatch(setEditGider(gider))
  navigate(`/giderler/${gider._id}`)
}

  const handleSubmit = async (form) => {
    try {
      dispatch(addGider(form)).then(data=>{
        setGiderler(prev=>[...prev,data.payload])
      })
    } catch (err) {
      console.error("Gider eklenemedi:", err);
    }
  };

  return (
    <div className="p-4 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Gider Listesi</h2>
        <button
          onClick={() => setModalAcik(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Yeni Gider Ekle
        </button>
      </div>

       {loading ? (
        <div className="text-gray-400">Yükleniyor...</div>
      ) : giderler.filter(item=>item.tur==="Gider").length === 0 ? (
        <div className="text-gray-500">Kayıtlı gelir bulunamadı.</div>
      ) : (
        <div className="overflow-x-auto rounded-md text-sm font-medium">
        <table className="w-full text-xs table-auto border-collapse bg-gray-800 rounded-md overflow-hidden">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="p-3 text-left">Tarih</th>
              <th className="p-3 text-left">Açıklama</th>
              <th className="p-3 text-left">Tür</th>
              <th className="p-3 text-left">Tutar (₺)</th>
              <th className="p-3  text-center"></th>
            </tr>
          </thead>
          <tbody>
            {giderler.filter(item=>item.tur==="Gider").map((gider) => (
              <tr key={gider._id} className="border-t border-gray-600 hover:bg-gray-700 transition">
                <td className="p-3 text-left"> {new Date(gider.tarih).toLocaleDateString()}</td>
                <td className="p-3 text-left">{gider?.aciklama}</td>
                <td className="p-3 text-left">{gider?.faturaTuru}</td>
                <td className="p-3 text-left">
                  {parseFloat(gider?.tutar).toFixed(2)} ₺
                </td>
                <td className="px-4 py-2 text-center space-x-2 flex items-center justify-center">
                  <AiFillEdit
                    size={25}
                    onClick={()=>handleEdit(gider)}
                    className="bg-yellow-500/10 text-yellow-500 p-1 rounded-md hover:bg-yellow-600 transition"
                  />
                  <MdDelete
                    size={25}
                    onClick={() => handleSil(gider._id)}
                    className="bg-red-500/10 text-red-400 p-1 rounded-md hover:bg-red-600 transition"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

    
      <GiderEkleModal
        open={modalAcik}
        onClose={() => setModalAcik(false)}
        onSuccess={handleSubmit}
      />
    </div>
  );
};

export default GiderListesi;

import { useEffect, useState } from "react";
import { AiOutlinePlus, AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import GelirEkleModal from "./GelirEkleModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addGelir, getGelirler, removeGelir, setEditGelir } from "../redux/gelir/gelirSlice";

const GelirListesi = () => {
  const navigate = useNavigate();
const dispatch = useDispatch()
  const [gelirler, setGelirler] = useState(useSelector(state=>state.gelir.gelirler));
  const [modalAcik, setModalAcik] = useState(false);
  const {loading} = useSelector(state=>state.gelir)

  useEffect(()=>{
    if (gelirler.length === 0) {
      dispatch(getGelirler()).then(data=>{
        setGelirler(data.payload)
      })
    }
  },[])

  const handleSubmit = async (form) => {
    try {
      dispatch(addGelir(form)).then(data=>{
        setGelirler(prev=>[...prev,data.payload])
      })
    } catch (err) {
      console.error("Gelir eklenemedi:", err);
    }
  };

  const handleSil = async (id) => {
    if (confirm("Silmek istediğinizden emin misiniz")) {
      
      const updateGelirler = gelirler.filter(item=>item._id !==id)
      setGelirler(updateGelirler)
      dispatch(removeGelir(id))
    }
  };
const handleEdit= (gelir)=>{
  dispatch(setEditGelir(gelir))
  navigate(`/gelirler/${gelir._id}`)
}
  return (
    <div className="p-4 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Gelir Listesi</h2>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center gap-2"
          onClick={() => setModalAcik(true)}
        >
          <AiOutlinePlus /> Yeni Gelir Ekle
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400">Yükleniyor...</div>
      ) : gelirler.filter(item=>item.tur==="Gelir").length === 0 ? (
        <div className="text-gray-500">Kayıtlı gelir bulunamadı.</div>
      ) : (
       <div className=" overflow-x-auto rounded-md text-sm font-medium" >

        <table className="w-full text-xs table-auto border-collapse bg-gray-800 rounded-md overflow-hidden">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="p-3 text-left">Tarih</th>
              <th className="p-3 text-left">Açıklama</th>
              <th className="p-3 text-left">Tür</th>
              <th className="p-3 text-right">Tutar (₺)</th>
              <th className="p-3 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {gelirler.filter(item=>item.tur==="Gelir").map((gelir) => (
              <tr
                key={gelir._id}
                className="border-t border-gray-600 hover:bg-gray-700 transition"
              >
                <td className="p-3">
                  {new Date(gelir.tarih).toLocaleDateString()}
                </td>
                <td className="p-3">{gelir.aciklama}</td>
                <td className="p-3">{gelir.tur}</td>
                <td className="p-3 text-right">{gelir.tutar.toFixed(2)}</td>
                <td className="p-3 text-center space-x-2 flex item-center justify-center">
                  <AiFillEdit
                    onClick={()=>handleEdit(gelir)}
                    size={25}
                    className="bg-yellow-500/10 text-yellow-500 p-1 rounded-md hover:bg-yellow-600 transition"
                  />
                  <MdDelete
                    size={25}
                    onClick={() => handleSil(gelir._id)}
                    className="bg-red-500/10 text-red-400 p-1 rounded-md hover:bg-red-600 transition"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
      )}
      <GelirEkleModal
        open={modalAcik}
        onClose={() => setModalAcik(false)}
        onSuccess={handleSubmit}
      />
    </div>
  );
};

export default GelirListesi;

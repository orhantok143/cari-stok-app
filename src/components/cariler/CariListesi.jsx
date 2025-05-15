import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CariCard from "../../utils/CariCard";
import { useDispatch, useSelector } from "react-redux";
import { getCariler, removeCari, setEditCari } from "../../redux/cari/cariSlice";



const CariListesi = () => {
  const [cariler, setCariler] = useState(useSelector(state=>state.cari.cariler));
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(cariler.length === 0){
     dispatch(getCariler()).then(data=>{
       setCariler(data.payload)
     })
    }
  }, []);


  const handleEkle = () => navigate("/cariler/ekle");
  const handleDuzenle = (data) =>{ 
    dispatch(setEditCari(data))
    navigate(`/cariler/duzenle/${data._id}`)

  };
  const handleFaturaEkle = (id) => navigate(`/cariler/fatura-ekle/${id}`);
  const handleSil = (id) => {
    if (confirm("Silmek istediğine emin misin?")) {
      // TODO: API ile sil
      setCariler(cariler.filter((c) => c._id !== id));
      dispatch(removeCari(id))
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Cari Listesi</h2>
        <button
          onClick={handleEkle}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Cari Ekle
        </button>
      </div>
      {cariler.map((item, index) => (
        <div key={index}>
          <CariCard
            cari={item}
            handleDuzenle={handleDuzenle}
            handleFaturaEkle={handleFaturaEkle}
            handleSil={handleSil}
          />
        </div>
      ))}
    </div>
  );
};

export default CariListesi;

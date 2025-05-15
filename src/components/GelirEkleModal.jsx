import { useState } from "react";
import { useSelector } from "react-redux";

const GelirEkleModal = ({ open, onClose, onSuccess }) => {

  const [form, setForm] = useState({
    tarih: new Date().toISOString().slice(0, 10),
    aciklama: "",
    faturaTuru: "Nakit",
    tutar: "",
  });
  

  const {loading} = useSelector((state)=>state.gelir)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit=(e)=>{
     e.preventDefault();
    onSuccess(form)
    onClose()
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-800 rounded-xl w-full max-w-md p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Yeni Gelir Ekle</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-100">
          <div>
            <label className="block mb-1">Tarih</label>
            <input
              type="date"
              name="tarih"
              value={form.tarih}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Açıklama</label>
            <input
              type="text"
              name="aciklama"
              value={form.aciklama}
              onChange={handleChange}
              placeholder="Örn: Kasa girişi"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Tür</label>
            <select
              name="tur"
              value={form.tur}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              required
            >
              <option>Nakit</option>
              <option>Havale</option>
              <option>Kredi Kartı</option>
              <option>Online</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Tutar (₺)</label>
            <input
              type="number"
              name="tutar"
              value={form.tutar}
              onChange={handleChange}
              step="0.01"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GelirEkleModal;

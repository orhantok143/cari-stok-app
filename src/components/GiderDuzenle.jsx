import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editGider } from "../redux/gider/giderSlice";
import { useDispatch, useSelector } from "react-redux";

const GiderDuzenle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { editedGider } = useSelector((state) => state.gider);
  const { loading } = useSelector((state) => state.gider);
  const [form, setForm] = useState(editedGider);

  useEffect(() => {
    if (!editedGider) {
      navigate("/giderler");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(editGider(form)).then((data) => {
      navigate("/giderler");
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-4">Gideri Düzenle</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-200">
        <div>
          <label className="block mb-1">Tarih</label>
          <input
            type="date"
            name="tarih"
            value={
              form?.tarih
                ? new Date(form.tarih).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Açıklama</label>
          <input
            type="text"
            name="aciklama"
            value={form?.aciklama}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Tür</label>
          <select
            name="faturaTuru"
            value={form?.faturaTuru}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            required
          >
            <option>Gıda</option>
            <option>Fatura</option>
            <option>Temizlik</option>
            <option>Maaş</option>
            <option>Diğer</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Tutar (₺)</label>
          <input
            type="number"
            name="tutar"
            value={form?.tutar}
            onChange={handleChange}
            step="0.01"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/giderler")}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          >
            Vazgeç
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
  );
};

export default GiderDuzenle;

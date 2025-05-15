import { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdDelete } from "react-icons/md";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import LoadingSvg from "../assets/infinite-spinner.svg";
import { useDispatch, useSelector } from "react-redux";
import { addStock, editStock, getStockler, removeStock } from "../redux/stock/stockSlice";

const StokSayfasi = () => {
  const dispatch = useDispatch();
  const [stoklar, setStoklar] = useState(
    useSelector((state) => state.stock.stockler)
  );
  const { loading } = useSelector((state) => state.stock);
  const [duzenlenecekStok, setDuzenlenecekStok] = useState(null);
  const [modalAcik, setModalAcik] = useState(false);

  const stokSchema = Yup.object({
    isim: Yup.string().required("Ürün adı zorunludur"),
    adet: Yup.number().min(0, "Negatif olamaz").required("Adet zorunludur"),
  });

  useEffect(() => {
    if (stoklar.length === 0) {
      dispatch(getStockler()).then((data) => {
        setStoklar(data.payload);
      });
    }
  }, []);

const stokSil = async (id) => {
  const updateStok = stoklar.filter((item) => item._id !== id);
  setStoklar(updateStok);
  
  try {
    const result = await dispatch(removeStock(id));
    
    if (removeStock.fulfilled.match(result)) {
      console.log("Stok başarıyla silindi");
    } else {
      console.error("Silme başarısız:", result.error);
    }
  } catch (error) {
    console.error("Silme sırasında hata oluştu:", error.message);
  }
};


  const modalKapat = () => {
    setModalAcik(false);
    setDuzenlenecekStok(null);
    setisSubmitting(!isSubmitting);
  };

  return (
    <div className=" mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl  font-semibold text-gray-300">Stok Listesi</h2>
        <button
          onClick={() => {
            setModalAcik(true);
          }}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg transition transform hover:scale-105 focus:outline-none flex items-center gap-2"
        >
           <AiOutlinePlus />
           Ekle
        </button>
      </div>
 {loading ? (
        <div className="text-gray-400">Yükleniyor...</div>
      ) : stoklar.length === 0 ? (
        <div className="text-gray-500">Kayıtlı stok bulunamadı.</div>
      ) : (

        <table className="w-full border-collapse table-auto bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-700 text-white">
          <tr className="text-left">
            <th className="p-3">Ürün Adı</th>
            <th className="p-3">Adet</th>
            <th className="p-3 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {stoklar?.map((stok) => (
            <tr key={stok._id} className="hover:bg-gray-500">
              <td className="border-t p-3 border-gray-300/20">{stok.isim}</td>
              <td className="border-t p-3 border-gray-300/20">{stok.adet}</td>
              <td className="flex border-t p-3 space-x-4 border-gray-300/20">
                <MdDelete
                  size={25}
                  onClick={() => stokSil(stok._id)}
                  className="bg-red-500/10 text-red-400 p-1 rounded-md hover:bg-red-600 transition"
                />

                <AiFillEdit
                  size={25}
                  onClick={() => {
                    setDuzenlenecekStok(stok);
                    setModalAcik(true);
                  }}
                  className="bg-yellow-500/10 text-yellow-500 p-1 rounded-md hover:bg-yellow-600 transition"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}


      {modalAcik && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center z-20">
          <div className="bg-gray-800 p-6 rounded-lg w-96 relative shadow-lg">
            <button
              onClick={modalKapat}
              className="absolute top-2 right-2 text-xl font-bold text-gray-300"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-6 text-gray-300">
              {duzenlenecekStok ? "Stok Düzenle" : "Yeni Stok Ekle"}
            </h3>

            <Formik
              initialValues={{
                isim: duzenlenecekStok?.isim || "",
                adet: duzenlenecekStok?.adet || 0,
              }}
              validationSchema={stokSchema}
              onSubmit={async (values, { resetForm }) => {
                if (duzenlenecekStok) {
                  const id = duzenlenecekStok._id;

                  dispatch(editStock({ id, values })).then((data) => {
                    const updated = stoklar.map((item) =>
                      item._id === id ? data.payload : item
                    );
                    setStoklar(updated);
                  });
                } else {
                  dispatch(addStock(values)).then((data) => {
                    setStoklar((prev) => [...prev, data.payload]);
                  });
                }
                resetForm();
                modalKapat();
              }}
            >
              <Form className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-600">Ürün Adı</label>
                  <Field
                    name="isim"
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="isim"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-600">Adet</label>
                  <Field
                    type="number"
                    name="adet"
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="adet"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                  >
                    {loading ? (
                      <img
                        src={LoadingSvg}
                        alt="Yükleniyor..."
                        className="w-6 h-6 inline-block"
                      />
                    ) : (
                      "Kaydet"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={modalKapat}
                    className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
                  >
                    Vazgeç
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default StokSayfasi;

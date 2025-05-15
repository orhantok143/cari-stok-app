import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {editCari} from "../../redux/cari/cariSlice"

const CariDuzenle = () => {
  const { id } = useParams(); // /cariler/duzenle/:id
  const {editedCari,cariler} = useSelector(state=>state.cari);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(!editedCari){
      navigate(-1)
    }
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("İsim zorunludur"),
    title: Yup.string().required("Unvan zorunludur"),
    phone: Yup.string()
      .matches(/^[0-9+ ()-]+$/, "Geçerli bir telefon girin")
      .required("Telefon zorunludur"),
    address: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = values
    try {
      dispatch(editCari({id,data}))
      alert("Cari başarıyla güncellendi.");
      navigate("/cariler");
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      alert("Bir hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!editedCari) return <div className="p-4">Yükleniyor...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Cari Düzenle</h2>

      <Formik
        initialValues={{
          name: editedCari.name || "",
          title: editedCari.title || "",
          phone: editedCari.phone || "",
          address: editedCari.address || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">İsim *</label>
              <Field
                name="name"
                type="text"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

             <div>
              <label className="block font-medium mb-1">Ünvan *</label>
              <Field
                name="title"
                type="text"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Telefon *</label>
              <Field
                name="phone"
                type="text"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">address</label>
              <Field
                name="address"
                as="textarea"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Güncelle
              </button>
              <button
                type="button"
                onClick={() => navigate("/cariler")}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                İptal
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CariDuzenle;

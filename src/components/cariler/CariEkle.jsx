import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCari } from "../../redux/cari/cariSlice";

const CariEkle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const initialValues = {
    name: "",
    title:"",
    phone: "",
    address: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("İsim zorunludur"),
    title: Yup.string().required("Ünvan zorunludur"),
    phone: Yup.string()
      .matches(/^[0-9+ ()-]+$/, "Geçerli bir telefon girin")
      .required("Telefon zorunludur"),
    address: Yup.string(),
  });

const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    await dispatch(addCari(values)).unwrap(); // thunk'ı çağır
    resetForm();
    navigate("/cariler");
  } catch (error) {
    console.error("Cari eklenirken hata:", error);
  }
};

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Yeni Cari Ekle</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">İsim *</label>
              <Field
                name="name"
                type="text"
                className="w-full bg-gray-800 p-2 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
             <div>
              <label className="block font-medium mb-1">Ünvan *</label>
              <Field
                name="title"
                type="text"
                className="w-full bg-gray-800 p-2 rounded"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Telefon *</label>
              <Field
                name="phone"
                type="text"
                className="w-full bg-gray-800 p-2 rounded"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Adres</label>
              <Field
                name="address"
                as="textarea"
                rows="3"
                className="w-full bg-gray-800 p-2 rounded"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                Kaydet
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

export default CariEkle;

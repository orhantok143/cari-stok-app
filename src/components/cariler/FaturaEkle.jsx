import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCariler } from "../../redux/cari/cariSlice";
import { addCariFatura } from "../../redux/cariFatura/cariFaturaSlice";

const FaturaEkle = () => {
  const [cariler, setCariler] = useState(useSelector(state=>state.cari.cariler));
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const params = useParams()
  const {id} = params
  
  useEffect(() => {
    if(cariler.length === 0){
     dispatch(getCariler()).then(data=>{
       setCariler(data.payload)
     })
    }
    if (!cariler) {
      navigate("/cariler");
    }
  }, []);



  const validationSchema = Yup.object({
    cari: Yup.string().required("Cari seçimi zorunludur"),
    faturaTuru: Yup.string().oneOf(["Gelir Faturası", "Gider Faturası","Ödeme"]).required("Fatura türü zorunlu"),
    tutar: Yup.number()
      .required("Tutar girilmelidir")
      .min(0, "Tutar 0'dan büyük olmalı"),
    aciklama: Yup.string(),
    tarih: Yup.date().required("Tarih girilmelidir"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    dispatch(addCariFatura(values)).then(()=>{
      navigate("/cariler")
    })

    resetForm()
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Fatura Ekle</h2>

      <Formik
        initialValues={{
          cari: id,
          faturaTuru: "",
          tutar: "",
          aciklama: "",
          tarih: new Date().toISOString().split("T")[0],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Cari Seç *</label>
              <Field
                as="select"
                name="cari"
                className="w-full border p-2 rounded bg-gray-800"
              >
                <option disabled value="">Seçiniz</option>
                {cariler.map((cari) => (
                  <option key={cari._id} value={cari._id}>
                    {cari.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="cari"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Fatura Türü *</label>
              <Field
                as="select"
                name="faturaTuru"
                className="w-full border p-2 rounded bg-gray-800"
               
              >
                <option value="">Fatura Tipi seç</option>
                <option value="Gelir Faturası">Gelir Faturası</option>
                <option value="Gider Faturası">Gider Faturası</option>
                <option value="Ödeme">Ödeme</option>

              </Field>
              <ErrorMessage
                name="faturaTuru"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Tutar *</label>
              <Field
                name="tutar"
                type="number"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="tutar"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Açıklama</label>
              <Field
                name="aciklama"
                as="textarea"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Tarih *</label>
              <Field
                name="tarih"
                type="date"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="tarih"
                component="div"
                className="text-red-500 text-sm"
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
                onClick={() => navigate(-1)}
                className="bg-gray-800 px-4 py-2 rounded"
              >
                Geri
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};


export default FaturaEkle
import React, { useContext, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useLogin } from "../apis/auth";
import { LoginForm } from "../types/auth";
import { useNavigate } from "react-router";
import { AuthContext, AuthContextType } from "../context/authContext";
// import ColorStain from "../components/ui/ColorStain";
import { getAuthToken } from "../utils/cookie";
import { useTranslation } from "react-i18next";

const Login = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext) as AuthContextType;
  const authToken = getAuthToken();  
  const { t } = useTranslation();
 
  useEffect(() => {
    if (authToken) {
      navigate("/cabinet");
    }
  }, []);

  const handleSubmit = (values: LoginForm) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        signIn();
        navigate("/cabinet");
      },
    });
  };

  return (
    <>
      {/* <ColorStain size={100} color="orange" className="u-left-75" /> */}
      <div className="h-full w-full flex justify-center items-center">
        <div className="blur-bg rounded-lg place-content-center w-full md:w-1/2">
          <div className="p-8">
            <h2 className="text-center font-bold text-3xl">{t("authorization")}</h2>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().required(t("base.required")),
                password: Yup.string() .required(t("base.required")),
              })}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="mt-6">
                  <Field
                    name="email"
                    placeholder="Email"
                    className="rounded-lg bg-main w-full p-3 text-black"
                  />
                  <ErrorMessage name="email" />
                </div>
                <div className="mt-6">
                  <Field
                    name="password"
                    placeholder="Password"
                    className="rounded-lg bg-main w-full p-3 text-black"
                  />
                  <ErrorMessage name="password" />
                </div>
                <button
                  type="submit"
                  className="rounded-lg mt-6 bg-accent text-white w-full py-3 transition"
                >
                  {t("signIn")}
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      {/* <ColorStain size={300} color="blue" /> */}
    </>
  );
};

export default Login;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
    fullname: "",
    email: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(6).max(20).required(),
    password: Yup.string().min(9).required(),
    fullname: Yup.string().required(),
    email: Yup.string().email(),
  });
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
    if(response.data.error) {
        alert(response.data.error)
      }
      else {
        navigate("/");
      }
      
    });
  };
  return (
    <div className="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
            <img src="https://media.istockphoto.com/vectors/people-register-online-set-registration-or-sign-up-user-interface-vector-id1210117007?k=20&m=1210117007&s=612x612&w=0&h=RUWBusayhB1HpaQ5Z0GQAoJ_Hs4tf74ZsA2qa-Tpg38="
                class="img-fluid p-5" alt="Sample"></img>
        </div>

        <div class="col-md-3 col-lg-6 col-xl-4 offset-xl-1">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <div class="form-outline mb-4"> 
                <label class = "h5" htmlFor="username"> Username: </label>
                <ErrorMessage class = "h5" name="username" component="span" />
                <Field class="form-control form-control-lg" placeholder="Username" id="username" name="username"></Field>
              </div>
             
              <div class="form-outline mb-4"> 
                <label class = "h5"  htmlFor="password"> Password: </label>
                <ErrorMessage class = "h5"  name="password" component="span" />
                <Field class="form-control form-control-lg" placeholder="Password" type="password" id="password" name="password"></Field>
              </div>
                
              <div class="form-outline mb-4"> 
              <label class = "h5" htmlFor="fullname"> Full Name: </label>
                <ErrorMessage class = "h5" name="fullname" component="span" />
                <Field class="form-control form-control-lg" placeholder="Full Name" id="fullname" name="fullname"></Field>
              </div>

              <div class="form-outline mb-4"> 
                <label class = "h5" htmlFor="email"> Email: </label>
                <ErrorMessage class = "h5" name="email:" component="span" />
                <Field class="form-control form-control-lg" placeholder="Email Address" id="email" name="email" type="email"></Field>
              </div>

              <div class="form-outline mb-4"> 
                <button class="btn btn-primary btn-lg btn-block p-3 px-5" type="submit">Register</button>
              </div>
              
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;

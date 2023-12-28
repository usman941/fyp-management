import { useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login({setUser}) {
  const [loginState, setLoginState] = useState(fieldsState);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", loginState)
    try {
      const response = await axios.post(`http://localhost:3000/user/login`, {
        gmail: loginState.email,
        password: loginState.password,
      });
      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error)
    }
  };
 

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={
              field.type === "password"
                ? passwordShown
                  ? "text"
                  : "password"
                : field.type
            }
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra TogglePassword={togglePassword} />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}

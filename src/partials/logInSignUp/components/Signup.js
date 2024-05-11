import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const navigate = useNavigate();

  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("states", signupState);
   try {
      const res=await axios.post(`http://localhost:3000/user/register`,signupState);
      console.log("res",res);
      if(res.status===200 || res.status===201){
        toast.success("Signup Successful");
        navigate("/login");
      }
   } catch (error) {
    toast.error("Something went wrong");
    console.log("error", error);
   }

  }

  //handle Signup API Integration here


  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map(field =>
          (field.id !== 'role' && field.id!=='gender') ? (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ) : (
            <div key={field.id}>
              <select
                id={field.id}
                name={field.name}
                autoComplete={field.autoComplete}
                required={field.isRequired}
                onChange={handleChange} // Changed from handleChange to onChange
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {field.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )
        )}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>

  )
}
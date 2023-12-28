import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const navigate = useNavigate();

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("states",signupState);
    if(signupState.password===signupState.confirmPassword){
    try {
      const restult= await axios.post(`${process.env}/user/register`,{
        name:signupState.username,
        email:signupState.email,
        role:"Admin",
        password:signupState.password
      });
      console.log("restult",restult.data);
    } catch (error) {
    alert('Something went wrong!!!');
    }
  }else{
    alert('Password and Confirm Password do not match');
  }
  }

  //handle Signup API Integration here
 

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
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
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}
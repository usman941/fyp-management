import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../utils/alert';
import { toast } from 'react-toastify';

const Settings = () => {
    const { id } = useParams();


    const [alert, setAlert] = useState({});
    const [isAlert, setIsAlert] = useState(false);
    const navigate=useNavigate();
    var [isUpdate, setIsUpdate] = useState(false);
    useEffect(() => {
        id &&
            axios
                .get("http://localhost:3000/supervisor/getOneSupervisor/" + id)
                .then((res) => {
                    setPerson(res.data);
                    setIsUpdate(true);
                });
    }, [id])

    const [Input, setPerson] = useState(
        {
            fname: "",
            lname: "",
            regno: "",
            contact: "",
            gmail: "",
            gender: "Male",
            role: "Student",
            newpassword: "",
            confirmpassword: ""
        }
    );

    const addPersonHandler = async () => {
        if (Input.newpassword !== Input.confirmpassword) {
            toast.error("Password do not match")
            return;
        }
        await axios.put("http://localhost:3000/user/update-password", {
            newPassword:Input.confirmpassword
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(res => {
            if (res.status === 201 || res.status === 200) {
             toast.success("Password Updated Successfully")
        }
        }).catch(err => {
            toast.error("Error Updating Password")
            // setAlert({ message: err?.response?.data?.error })
            // setAlert(true)
            console.log("error", err?.response?.data.error);
        });
    }

    const updatePersonHandler = async (id) => {
        await axios.put("http://localhost:3000/supervisor/updateSupervisor/" + id, {

            name: String(Input.name),
            email: String(Input.email),
            contact: String(Input.contact),
            gender: String(Input.gender),
            password: String(Input.password),
            role: String(Input.role),
            description: String(Input.description)
        }).then(res => {

            if (res.status === 200) {
                
                setAlert({ redirect: '/user/advisors', message: Input.role + " updated Successfully" })
                setIsAlert(true)
            }
        }
        ).catch(err => {

            console.log(err);
        });
    }

    const handleChange = (e) => {
        setPerson((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isUpdate) {
            addPersonHandler();
        }
        else {
            updatePersonHandler(Input._id);

        }
    }
    return (
        <div>
            {isAlert && <Alert redirect={alert.redirect} message={alert.message} />}
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <h1 className='mb-4 font-bold'>Update Password</h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            New Password
                        </label>
                        <input type="password" value={Input.newpassword} onChange={handleChange} name='newpassword' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" placeholder="new password" required />
                    </div>
                  
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Confirm Password
                        </label>
                        <input value={Input.confirmpassword} onChange={handleChange} name='confirmpassword' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password" placeholder="confirm password" required />
                    </div>
                   
                </div>
             



              

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isUpdate ? 'Update' : 'Update'}</button>
            </form>

        </div>
    )
}

export default Settings
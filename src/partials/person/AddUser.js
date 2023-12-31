import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../utils/alert';
import { toast } from 'react-toastify';

const AddUser = () => {
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
        }
    );

    const addPersonHandler = async () => {
        await axios.post("http://localhost:3000/user/register", Input, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(res => {
            if (res.status === 201) {
                console.log(res.data)
                toast.success(Input.role + " Added Successfully")
                if(Input.role==='Student'){
                    navigate('/user/students')
                }
                if(Input.role==='Advisor'){
                    navigate('/user/advisors')
                } 
                if(Input.role==='Teacher'){
                navigate('/user/supervisers')
            }
            if(Input.role==='IndustryPerson'){
                navigate('/user/industry-persons')
            }
        }
        }).catch(err => {
            toast.error(err?.response?.data?.error)
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
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            First Name
                        </label>
                        <input value={Input.fname} onChange={handleChange} name='fname' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Last Name
                        </label>
                        <input value={Input.lname} onChange={handleChange} name='lname' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" required />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Registration Number
                        </label>
                        <input value={Input.regno} onChange={handleChange} name='regno' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Contact Number
                        </label>
                        <input value={Input.contact} onChange={handleChange} name='contact' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" required />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input value={Input.gmail} onChange={handleChange} name="gmail" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="@uet.edu.pk" required />
                    </div>
                </div>



                <div className="flex flex-wrap -mx-3 mb-2">

                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            Gender
                        </label>
                        <div className="relative">
                            <select value={Input.gender} onChange={handleChange} name='gender' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            Role
                        </label>
                        <div className="relative">
                            <select value={Input.role} onChange={handleChange} name='role' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option value='Advisor'>Advisor</option>
                                <option value='IndustryPerson'>Industry Person</option>
                                <option value='Teacher'>Teacher</option>
                                <option value='Student'>Student</option>

                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isUpdate ? 'Update' : 'Register'}</button>
            </form>

        </div>
    )
}

export default AddUser
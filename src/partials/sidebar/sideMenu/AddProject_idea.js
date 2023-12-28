import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../../utils/alert';
import { toast } from 'react-toastify';

const AddProject_idea = () => {
    const {id}=useParams();
    

const navigate=useNavigate();
    const [alert, setAlert] = useState({});
    const [isAlert, setIsAlert] = useState(false);
    var [isUpdate, setIsUpdate] = useState(false);
    useEffect(() => {
        id &&
            axios
                .get("http://localhost:3000/project/getbyID/" + id,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
                )
                .then((res) => {
                    console.log("get by id:",res)
                     setPerson(res?.data?.project);
                    setIsUpdate(true);
                });
    }, [id])

    const [Input, setPerson] = useState(
        {
           title:"",
           description:"",
           status:""
        }
    );

    const addPersonHandler = async () => {
        await axios.post("http://localhost:3000/project/create", Input, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(res => {
            if (res.status === 201) {
                console.log(res.data)
                toast.success("Project Idea Added Successfully")
                navigate('/project/all')
            }

        }).catch(err => {
            toast.error(err?.response?.data?.error)
          
            console.log("error", err.response.data.error);
        });
    }

    const updatePersonHandler = async (id) => {
        await axios.put("http://localhost:3000/project/reject/" + id, Input, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            } 
        }
        ).then(res => {
console.log("updated res:",res);
            if (res.status === 200) {
                
                toast.success("Project Idea status Updated Successfully")
                navigate('/project/all')
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
            <div className='flex mb-2'>
                <h1>Add Project Idea</h1>
            </div>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full  px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Title
                        </label>
                        <input value={Input.title} onChange={handleChange} name='title' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" disabled={isUpdate} required />
                    </div>
                    
                </div>
                {
                    isUpdate &&
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full  px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Status
                        </label>
                        <select value={Input.status} onChange={handleChange} name='status' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text">
                    
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    
                </div>
                }
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                            Description
                        </label>
                        <textarea rows={6} value={Input.description} onChange={handleChange} name="description" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="" disabled={isUpdate}  required />
                    </div>
                </div>
 


               
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isUpdate ? 'Update' : 'Register'}</button>
                <button  className="text-black bg-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>navigate('/project/all')}>Cancel</button>

            </form>

        </div>
    )
}

export default AddProject_idea
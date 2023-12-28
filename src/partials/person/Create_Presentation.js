import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../utils/alert';
import { toast } from 'react-toastify';

const Create_Presentation = () => {
    const { id } = useParams();


    const [alert, setAlert] = useState({});
    const [isAlert, setIsAlert] = useState(false);
    const navigate=useNavigate();
    var [isUpdate, setIsUpdate] = useState(false);
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        id &&
            axios
                .get("http://localhost:3000/presentation/get/" + id)
                .then((res) => {
                    setPerson(res?.data?.presentation);
                    setIsUpdate(true);
                });
    }, [id])

    const [Input, setPerson] = useState(
        {
            name: "",
            location: "",
            time: "",
            date: "",
            group: "",
        }
    );
    // get all groups
    const getAllGroups = async () => {
        const res = await axios.get("http://localhost:3000/group/getall", {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }

        })
        console.log(res?.data?.groups)
        setGroups(res?.data?.groups)
    }
    useEffect(() => {
        getAllGroups()
    },[])

    const addPersonHandler = async () => {
        await axios.post("http://localhost:3000/presentation/create", Input, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(res => {
            if (res.status === 201) {
                console.log(res.data)
                toast.success(" Presentation Created Successfully")
               navigate('/presentation/all')
        }
        }).catch(err => {
            toast.error(err?.response?.data?.error)
            // setAlert({ message: err?.response?.data?.error })
            // setAlert(true)
            console.log("error", err?.response?.data.error);
        });
    }

    const updatePersonHandler = async (id) => {
        await axios.put("http://localhost:3000/presentation/update/" + id, Input,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(res => {

           toast.success(" Presentation Updated Successfully")
           navigate('/presentation/all')
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
                    <div className="w-full  px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Presentation Name
                        </label>
                        <input value={Input.name} onChange={handleChange} name='name' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Name" required />
                    </div>
                   
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full  px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Location
                        </label>
                        <input value={Input.location} onChange={handleChange} name='location' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="location" required />
                    </div>
                  
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
          Date
        </label>
        <input
          type="date"
          value={Input.date}
          onChange={handleChange}
          name="date"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          placeholder=""
          required
        />
      </div>
      <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Time
      </label>
      <input
        type="time"
        value={Input.time}
        onChange={handleChange}
        name="time"  
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-last-name"
        required
      />
    </div>
    </div>
               



                <div className="flex flex-wrap -mx-3 mb-2">

                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            Group
                        </label>
                        <div className="relative">
                            <select value={Input.group} onChange={handleChange} name='group' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option value="" disabled>Select Group</option>
                                {
                                    
                                    groups.map((group) => {
                                        return (
                                            <option value={group._id}>{group.name}</option>
                                        )
                                    })
                                }
                              
                                
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                  

                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isUpdate ? 'Update' : 'Create'}</button>
            </form>

        </div>
    )
}

export default Create_Presentation
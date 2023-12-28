import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../utils/alert';
import { toast } from 'react-toastify';

const Upload_temp = () => {
    const { id } = useParams();


    const [alert, setAlert] = useState({});
    const [isAlert, setIsAlert] = useState(false);
    const navigate = useNavigate();
    var [isUpdate, setIsUpdate] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileDescerption, setFileDescription] = useState('')
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Check if a file is selected
        if (file) {
            // Check if the selected file type is either PDF or Word
            if (file.type === 'application/pdf' || file.type === 'application/msword') {
                setSelectedFile(file);
            } else {
                toast.error('Please select a PDF or Word document.');
                // Clear the file input
                event.target.value = null;
            }
        }
    };
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
        console.log("selectedFile:", selectedFile)
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('fileName', fileDescerption);
        await axios.post("http://localhost:3000/file/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                toast.success( "File Uploaded Successfully")
                navigate('/template/download')
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
                    <div className="w-full  px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            File Name
                        </label>
                        <input value={fileDescerption} onChange={(e) => setFileDescription(e.target.value)} name='fileDescription' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Write about file" required />
                    </div>
                    <div className="w-full  px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Select File
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            name="selectedFile"
                            id="file-input"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            required
                        />
                    </div>

                </div>



                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isUpdate ? 'Update' : 'Upload'}</button>
            </form>

        </div>
    )
}

export default Upload_temp
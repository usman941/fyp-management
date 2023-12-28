import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../../utils/alert';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
const Superviser_evaluate = () => {
    const { id } = useParams();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];
    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [name, setName] = useState("");

    const handleChangeDrop = (event) => {
        console.log("event:", event)
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const navigate = useNavigate();
    const [alert, setAlert] = useState({});
    const [isAlert, setIsAlert] = useState(false);
    var [isUpdate, setIsUpdate] = useState(false);
    const [students, setStudents] = useState([]);
    const [inputValues, setInputValues] = useState({});

    const [data, setData] = useState({});
    const inputHandleChange = (memberid, value) => {
        setInputValues(preVal => ({
            ...preVal,
            [memberid]: value
        }))
    }
    useEffect(() => {
        id &&
            axios
                .get("http://localhost:3000/group/" + id,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                .then((res) => {
                    console.log("get by id:", res)
                    setData(res?.data?.group);
                    setIsUpdate(true);
                });
    }, [id])
    // get all students 
    useEffect(() => {
        getStudents()
    }, [])
    // get all students function
    const getStudents = async () => {
        const url = 'http://localhost:3000/user/getAllStudents'
        try {
            return await axios.get(url).then(res => {
                console.log("students:", res.data.students)
                setStudents(res.data.students)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const [Input, setPerson] = useState(
        {
            title: "",
            members: [],
        }
    );
    // handle setPerson members array
    const handleMembers = (e) => {
        setPerson((prevState) => ({
            ...prevState,
            members: [...prevState.members, e.target.value]
        }));
    }
    const addPersonHandler = async () => {
        await axios.post("http://localhost:3000/group/create", {
            name: name,
            members: personName

        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(res => {
            if (res.status === 201) {
                console.log(res.data)
                toast.success("Group Created Successfully")
                navigate('/groups/all')
            }

        }).catch(err => {
            toast.error(err?.response?.data?.error)

            console.log("error", err.response.data.error);
        });
    }

    const updatePersonHandler = async (id) => {

        await axios.post("http://localhost:3000/evaluation/supervisor-evaluation", {
            groupId: id,
            marks: inputValues
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(res => {

            if (res.status === 200) {
                toast.success("Evaluated Successfully")
                navigate('/superviser/evaluation')
            }
        }
        ).catch(err => {

            console.log(err);
            toast.error(err?.response?.data?.error)
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
            updatePersonHandler(id);

        }
    }
    return (
        <div>
            {isAlert && <Alert redirect={alert.redirect} message={alert.message} />}
            <div className='flex mb-2'>
                <h1>Evaluate Group</h1>
            </div>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                {
                    data?.members?.length > 0 ?
                        data?.members?.map((item, index) => (


                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full  px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                        {item.fname + ' ' + item.lname}
                                    </label>
                                    <input type="number" onChange={(e) => inputHandleChange(item._id, e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" required />
                                </div>

                            </div>))
                        : ''
                }


                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isUpdate ? 'Evaluate' : 'Register'}</button>
                <button className="text-black bg-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => navigate('/superviser/evaluation')}>Cancel</button>

            </form>

        </div>
    )
}

export default Superviser_evaluate
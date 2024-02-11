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
const Create_evl2 = () => {
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
const [comment,setComment]=useState("");
    const updatePersonHandler = async (id) => {
       
        await axios.post("http://localhost:3000/evaluation/evaluation2", {
            groupId: id,
            remarks:isYesChecked?"yes":"no",
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(res => {

            if (res.status === 200) {
                toast.success("Evaluated Successfully")
                navigate('/committe/evaluation')
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
    const url = 'http://localhost:3000/marks/getTotalMarks'
    const getConfigMarks = async () => {
        try {
            return await axios.get(url,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
                ).then(res => res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getConfigMarks().then(data => {
            console.log("marks configgg:", data);
            const proposalMarks = data?.marksConfig?.evaluation1Marks
            || {};
            setMaxMarks({
                problemStatement: proposalMarks.problemStatement || "",
                solutionValidity: proposalMarks.solutionValidity || "",
                motivation: proposalMarks.motivation || "",
                modules: proposalMarks.modules || "",
                taskManagement: proposalMarks.taskManagement || "",
                systemAnalysis: proposalMarks.systemAnalysis || "",
                documentFormat: proposalMarks.documentFormat || "",
                plagiarismReport: proposalMarks.plagiarismReport || ""

            });
        });
    }, []);
    const [marks, setMarks] = useState({});
    const [maxMarks,setMaxMarks] =useState({
        problemStatement:0,
        solutionValidity:0,
        motivation:0,
        modules:0,
        taskManagement:0,
        systemAnalysis:0,
        documentFormat:0,
        plagiarismReport:0

      });
    const inputHandleChange = (memberId, criterion, value) => {
        const newValue = parseInt(value, 10) || 0;
        const clampedValue = Math.min(newValue, maxMarks[criterion]);
    
        setMarks((prevMarks) => ({
          ...prevMarks,
          [memberId]: {
            ...prevMarks[memberId],
            [criterion]: clampedValue,
          },
        }));
      };
  
      const calculateTotalMarks = (memberId) => {
        const memberMarks = marks[memberId] || {};
        const totalMarks = Object.values(memberMarks).reduce((acc, mark) => acc + mark, 0);
        return totalMarks;
      };
      const [isYesChecked, setIsYesChecked] = useState(false);
      const [isNoChecked, setIsNoChecked] = useState(false);
    
      const handleYesChange = () => {
        setIsYesChecked(!isYesChecked);
        // Uncheck "No" if "Yes" is checked
        if (!isYesChecked) {
          setIsNoChecked(false);
        }
      };
    
      const handleNoChange = () => {
        setIsNoChecked(!isNoChecked);
        // Uncheck "Yes" if "No" is checked
        if (!isNoChecked) {
          setIsYesChecked(false);
        }
      };

    return (
        <div>
        {isAlert && <Alert redirect={alert.redirect} message={alert.message} />}
        <div className='flex flex-col mb-2'>
        <lable className="font-bold">Evaluation 2</lable>

            <lable className="font-bold">Evaluate Group</lable>
        </div>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isYesChecked}
            onChange={handleYesChange}
          />
          Yes
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isNoChecked}
            onChange={handleNoChange}
          />
          No
        </label>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isUpdate ? 'Evaluate' : 'Register'}</button>
    </form>

    </div>
    )
}

export default Create_evl2
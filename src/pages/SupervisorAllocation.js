import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../utils/alert';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SupervisorAllocation = () => {
    const {id}=useParams();
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
  const [personName, setPersonName] = React.useState("");
  const [superArr,setSuper]=useState("");
  const [projetArr,setProjectArr]=useState("");
  const [name, setName] = useState("");

  const handleChangeDrop = (event) => {
    console.log("event:",event)
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleSuperDrop = (event) => {
    console.log("event:",event)
    const {
      target: { value },
    } = event;
    setSuper(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleProjectDrop = (event) => {
    console.log("event:",event)
    const {
      target: { value },
    } = event;
    setProjectArr(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

const navigate=useNavigate();
    const [alert, setAlert] = useState({});
    const [isAlert, setIsAlert] = useState(false);
    var [isUpdate, setIsUpdate] = useState(false);
    const [students, setStudents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [supervisers, setSupervisers] = useState([]);
    const [projects, setProjects] = useState([]);


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
// get all students 
    useEffect(() => {
        getStudents()
        getGroups()
        getSupervisers()
        getProjects()
    },[])
    // get all students function
    const getStudents = async () => {
         const url = 'http://localhost:3000/user/getAllStudents'
        try {
            return await axios.get(url,
              {
                headers: {
                    
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
              ).then(res => {
                console.log("students:",res.data.students)
                setStudents(res.data.students)
            })
        } catch (error) {
            console.log(error)
        }
    }
    // get all groups 
    const getGroups = async () => {
      const url = 'http://localhost:3000/group/getall'
     try {
         return await axios.get(url,
          {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
          ).then(res => {
             console.log("students:",res.data.groups)
             setGroups(res.data.groups)
         })
     } catch (error) {
         console.log(error)
     }
 }
    // get all supervisers
    const getSupervisers = async () => {
      const url = 'http://localhost:3000/user/getallsupervisors'
     try {
         return await axios.get(url,
          {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
          ).then(res => {
             console.log("supervisers:",res.data.supervisors)
             setSupervisers(res.data.supervisors)
         })
     } catch (error) {
         console.log(error)
     }
 }
//  get all projects
const getProjects = async () => {
  const url = 'http://localhost:3000/project/getall'
 try {
     return await axios.get(url,
      {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
      ).then(res => {
         console.log("projects:",res.data)
         setProjects(res.data)
     })
 } catch (error) {
     console.log(error)
 }
}
    const [Input, setPerson] = useState(
        {
           title:"",
           members:[],
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
        await axios.post("http://localhost:3000/group/assign-supervisor", {
          groupId: personName,
          supervisorId:superArr,
          projectId:projetArr
        
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                toast.success("Supervisor and Project Assigned Successfully")
                navigate('/groups/all')
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
                <h1>Assign Supervisor and Project</h1>
            </div>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
              
            <div className="flex flex-wrap -mx-3 mb-6">
                <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Select Superviser</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          // multiple
          value={superArr}
          onChange={handleSuperDrop}
          input={<OutlinedInput label="Add Group Members" />}
          MenuProps={MenuProps}
        >
          {supervisers.map((item,i) => (
            <MenuItem
              key={item._id}
              value={item._id}
              style={getStyles(item.fname, personName, theme)}
            >
              {item.fname+' '+item.lname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Select Project Idea</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          // multiple
          value={projetArr}
          onChange={handleProjectDrop}
          input={<OutlinedInput label="Select project idea" />}
          MenuProps={MenuProps}
        >
          {projects.map((item,i) => (
            <MenuItem
              key={item?.project?._id}
              value={item?.project?._id}
              style={getStyles(item?.project?.title, personName, theme)}
            >
              {
                item?.project?.status!=='Rejected'?
                item?.project?.title:''
              }
            </MenuItem>
          ))}
        </Select>
      </FormControl>
                    </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Assign To Group</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          // multiple
          value={personName}
          onChange={handleChangeDrop}
          input={<OutlinedInput label="Assign to" />}
          MenuProps={MenuProps}
        >
          {groups.map((item,i) => (
            <MenuItem
              key={item._id}
              value={item._id}
              style={getStyles(item.name, personName, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
                    </div>
 


               
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isUpdate ? 'Update' : 'Allocate'}</button>
                <button  className="text-black bg-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>navigate('/groups/all')}>Cancel</button>

            </form>

        </div>
    )
}

export default SupervisorAllocation
import React, { useContext } from 'react'
import { useEffect, useState, useMemo,useCallback } from 'react'
import axios from 'axios'
import GenderCell from '../../../components/tableCells/genderCell'
import EditCell from '../../../components/tableCells/editCell'
import DeleteCell from '../../../components/tableCells/deleteCell'
import Detail from '../../../partials/detail'
import { FaUserPlus } from 'react-icons/fa'
import CreateNew from '../../../components/createNew'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../context/AuthContext'
import { useParams } from 'react-router-dom'

const Marks_list = () => {
    const [persons, setPersons] = useState([])
    const {user}=useContext(AuthContext);
    
    const jsonObject = JSON.parse(user);
    useEffect(() => {
        getPersons().then(data => {
            console.log("students marks list new:",data)
            setPersons(data?.studentEvaluationDetails)
        })
    }, [])

    const url = 'http://localhost:3000/evaluation/getEvaluationmarksForAll'
    const getPersons = async () => {
        try {
            return await axios.get(url,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
                ).then(res => res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = useCallback(async id => {
        const url = 'http://localhost:3000/group/delete/' + id
        await axios.delete(url,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
            ).then(res => {
            toast.success("Group Deleted Successfully")

            setPersons(
                persons.filter((value, index, arr) => {
                    return value._id !== id
                })
            )
        })
    }, [persons]);

   
    const column = useMemo(() => [
        {
            name: '#',
            selector: row => row?.name,
            sortable: true,
            filterable: true,
            cell: (row, index) => index + 1,
        },
        {
            name: 'Student Name',
            selector: row => row && row?.Name,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Proposel Marks',
            selector: row => row?.ProposelMarks!=null?row?.ProposelMarks:"Not Evaluated",
            sortable: true,
            filterable: true,
        },
        {
            name: 'Supervisor Marks',
            selector: row => row?.SupervisorMarks!=null?row?.SupervisorMarks:"Not Evaluated",
            sortable: true,
            filterable: true,
        },
        {
            name: 'Evaluation Marks',
            selector: row => row?.Evaluation1Marks!=null?row?.Evaluation1Marks:"Not Evaluated",
            sortable: true,
            filterable: true,
        },
        {
            name: 'Total Obtained Marks',
            selector: row => row?.TotalObtainedMarks!=null?row?.TotalObtainedMarks:"Not Evaluated",
            sortable: true,
            filterable: true,
        },

    ], [handleDelete]);
    const [search, setSearch] = useState('');

    const filterFunction = (search, data) => {
        return data.filter((row) =>
            row?.Name?.toLowerCase().includes(search.toLowerCase())
            );
    };
    return (

        <Detail title={'Students Marks List'} column={column} data={filterFunction(search,persons)} search={search} setSearch={setSearch}>
            {/* <CreateNew title={'Add New'} path={'/evaluation/evaluate-proposel'} >
                <FaUserPlus size={17} className='text-white' />
            </CreateNew> */}
       </Detail>  
        
    )
}

export default Marks_list

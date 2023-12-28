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
import Evaluation_marks from './Evaluation_marks'

const EvaluationTable = ({ data }) => {
    const cellStyle = {
        padding: '8px', // Adjust the padding as needed
        textAlign: 'center',
      };
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={cellStyle}>Proposal Marks</th>
            <th style={cellStyle}>Supervisor Marks</th>
            <th style={cellStyle}>Evaluation1 Marks</th>
            <th style={cellStyle}>Total Obtained Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}>{data.ProposalMarks !== null ? data.ProposalMarks : 'Not Evaluated'}</td>
            <td style={cellStyle}>{data.SupervisorMarks !== null ? data.SupervisorMarks : 'Not Evaluated'}</td>
            <td style={cellStyle}>{data.Evaluation1Marks !== null ? data.Evaluation1Marks : 'Not Evaluated'}</td>
            <td style={cellStyle}>{data.TotalObtainedMarks !== null ? data.TotalObtainedMarks : 'Not Evaluated'}</td>
          </tr>
        </tbody>
      </table>
    );
  };

const Evaluation_marks_list = () => {
    const [persons, setPersons] = useState({})
    const {user}=useContext(AuthContext);
    
    const jsonObject = JSON.parse(user);
    console.log("jsonObject:",jsonObject)
    useEffect(() => {
        getPersons().then(data => {
            console.log(" lists of marks:",data)
            setPersons(data)
        })
    }, [])

    const url = 'http://localhost:3000/evaluation/getEvaluationmarks'
    const getPersons = async () => {
        try {
            return await axios.get(`http://localhost:3000/evaluation/getEvaluationmarks`,
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
            selector: row => row.name,
            sortable: true,
            filterable: true,
            cell: (row, index) => index + 1,
        },
        {
            name: 'Proposal Marks',
            selector: row => row?.ProposalMarks!=null?row?.ProposalMarks:"Not Evaluated",
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
            name: 'Evaluation1 Marks',
            selector: row => row?.Evaluation1Marks!=null?row?.Evaluation1Marks:"Not Evaluated",
            sortable: true,
            filterable: true,
        },
        {
            name: 'Total Marks',
            selector: row => row?.TotalObtainedMarks!=null?row?.TotalObtainedMarks:"Not Evaluated",
            sortable: true,
            filterable: true,
        },

    ], [handleDelete]);
    const [search, setSearch] = useState('');
    return (

        <div>
        <h1 style={{fontSize: '24px',fontWeight: 'bold'}}>My Evaluation Marks Details</h1>
        <EvaluationTable data={persons} />
      </div>  
        
    )
}

export default Evaluation_marks_list

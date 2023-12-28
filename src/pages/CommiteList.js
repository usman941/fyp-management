import React, { useContext } from 'react'
import { useEffect, useState, useMemo,useCallback } from 'react'
import axios from 'axios'
import GenderCell from '../components/tableCells/genderCell'
import EditCell from '../components/tableCells/editCell'
import DeleteCell from '../components/tableCells/deleteCell'
import Detail from '../partials/detail'
import { FaUserPlus } from 'react-icons/fa'
import CreateNew from '../components/createNew'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'

const CommitteList = () => {
    const [persons, setPersons] = useState([])
    const {user}=useContext(AuthContext);
    
    const jsonObject = JSON.parse(user);
    console.log("jsonObject:",jsonObject)
    useEffect(() => {
        getPersons().then(data => {
            console.log("committees lists:",data.committees)
            setPersons(data.committees)
        })
    }, [])

    const url = 'http://localhost:3000/committee/getAllCommitte'
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
        const url = 'http://localhost:3000/committee/delete/' + id
        await axios.delete(url,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
            ).then(res => {
            toast.success("Committe Deleted Successfully")

            setPersons(
                persons.filter((value, index, arr) => {
                    return value._id !== id
                })
            )
        })
    }, [persons]);

    //   const generateCSV = () => {
    //     const tableElement = document.querySelector('#table')
    //     let csv = ''
    //     for (const row of tableElement.rows) {
    //       for (const cell of row.cells) {
    //         if (cell.innerText !== '' && cell.innerText !== 'ACTIONS') {
    //           csv += cell.innerText + ','
    //         }
    //       }
    //       csv += '\n'
    //     }
    //     return csv
    //   }

    //   const downloadCSV = () => {
    //     const csv = generateCSV()
    //     console.log(csv)
    //     const blob = new Blob([csv], { type: 'text/csv' })
    //     const url = URL.createObjectURL(blob)
    //     const a = document.createElement('a')
    //     a.href = url
    //     a.download = 'supervisor.csv'
    //     document.body.appendChild(a)
    //     a.click()
    //     document.body.removeChild(a)
    //   }
    const column = useMemo(() => [
        {
            name: '#',
            selector: row => row.name,
            sortable: true,
            filterable: true,
            cell: (row, index) => index + 1,
        },
        {
            name: 'Members Name',
            selector: row => row?.members.map((member,index)=>member.fname+' '+member.lname).join(', ') ,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Members ID',
            selector: row => row?.members.map((member,index)=>member.regno+' ').join(', '),
            sortable: true,
            filterable: true,
        },
        {
            name: 'Members Emails',
            selector: row => row?.members.map((member,index)=>member.gmail+' ').join(', '),
            sortable: true,
            filterable: true,
        },
        {
            name: 'Members Contacts',
            selector: row => row?.members.map((member,index)=>member.contact,' ').join(', '),
            sortable: true,
            filterable: true,
        },
        {
            name: 'Members Contacts',
            selector: row => row?.members.map((member,index)=>member.gender,' ').join(', '),
            sortable: true,
            filterable: true,
        },
     
        {
            name: '',
            cell: (person) => <div className='flex gap-2'>
                {jsonObject?.role==='Admin'?<>
            <DeleteCell Event={handleDelete} param={person?._id} /> </>:''}    

            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },

    ], [handleDelete]);
    const [search, setSearch] = useState('');

    const filterFunction = (search, data) => {
        return data.filter((row) =>
            row.members.map((member,index)=>member.fname+' '+member.lname).join(', ').toLowerCase().includes(search.toLowerCase()) ||
            row.members.map((member,index)=>member.regno).join(', ').toLowerCase().includes(search.toLowerCase()) 
            );
    };
    return (

        <Detail title={'Committe List'} column={column} data={filterFunction(search,persons)} search={search} setSearch={setSearch}>
            {
                jsonObject?.role==='Admin'?
                <CreateNew title={'Add New'} path={'/committe/create'} >
                <FaUserPlus size={17} className='text-white' />
            </CreateNew>
                :""
            }
            
       </Detail>  
        
    )
}

export default CommitteList

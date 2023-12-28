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

const IdeasList = () => {
    const [persons, setPersons] = useState([])
    const {user,setUser}=useContext(AuthContext);
    
    const jsonObject = JSON.parse(user);
    useEffect(() => {
        getPersons().then(data => {
            console.log("ideas lists:",data)
            setPersons(data)
        })
    }, [])

    const url = 'http://localhost:3000/project/getall'
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
        const url = 'http://localhost:3000/project/delete/' + id
        await axios.delete(url,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
            ).then(res => {
            toast.success("Project Idea Deleted Successfully")

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
            name: 'Title',
            selector: row => row.project.title,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Description',
            selector: row => row.project.description,
            sortable: true,
            filterable: true,
        },
      
        {
            name: 'Status',
            selector: row => row.project.status,
            filterable: true,
            sortable: true,
        },
        {
            name: 'Posted By',
            selector: row => row?.project?.postedBy?.fname + ' ' + row?.project?.postedBy?.lname,
            filterable: true,
            sortable: true,
        },
        {
            name: '',
            cell: (person) => <div className='flex gap-2'>{jsonObject?.role==='Admin'?<>
                <EditCell path={'/project/update/' + person.project._id} />
            <DeleteCell Event={handleDelete} param={person.project._id} /> </>:''}    

            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },

    ], [handleDelete]);
    const [search, setSearch] = useState('');

    const filterFunction = (search, data) => {
        return data.filter((row) =>
            row.project.title.toLowerCase().includes(search.toLowerCase()) ||
            row.project.description.toLowerCase().includes(search.toLowerCase()) ||
            row.project.status.toLowerCase().includes(search.toLowerCase())  
        );
    };
    return (

        <Detail title={'Project Ideas'} column={column} data={filterFunction(search,persons)} search={search} setSearch={setSearch}>
            <CreateNew title={'Add New'} path={'/project/add'} >
                <FaUserPlus size={17} className='text-white' />
            </CreateNew>
       </Detail>  
        
    )
}

export default IdeasList

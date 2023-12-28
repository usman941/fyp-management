import React from 'react'
import { useEffect, useState, useMemo,useCallback } from 'react'
import axios from 'axios'
import GenderCell from '../../components/tableCells/genderCell'
import EditCell from '../../components/tableCells/editCell'
import DeleteCell from '../../components/tableCells/deleteCell'
import Detail from '../../partials/detail'
import { FaUserPlus } from 'react-icons/fa'
import CreateNew from '../../components/createNew'
import { toast } from 'react-toastify'

const Supervisor = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        getPersons().then(data => {
            console.log("supervisers:",data)
            setPersons(data.supervisors)
        })
    }, [])

    const url = 'http://localhost:3000/user/getallsupervisors'
    const getPersons = async () => {
        try {
            return await axios.get(url).then(res => res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = useCallback(async id => {
        const url = 'http://localhost:3000/user/deleteuser/' + id
        await axios.delete(url,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(res => {
            setPersons(
                persons.filter((value, index, arr) => {
                    return value._id !== id
                })
            )
            toast.success("User deleted successfully")
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
            name: 'Rigistration Number',
            selector: row => row.regno,
            sortable: true,
            filterable: true,
        },
        {
            name: 'First Name',
            selector: row => row.fname,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.lname,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Email',
            selector: row => row.gmail,
            filterable: true,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            filterable: true,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.gender,
            filterable: true,
            sortable: true,
            cell: row => <GenderCell gender={row.gender} />

        },
        {
            name: '',
            cell: (person) => <div className='flex gap-2'>
               
                <DeleteCell Event={handleDelete} param={person._id} />

            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },

    ], [handleDelete]);
    const [search, setSearch] = useState('');

    const filterFunction = (search, data) => {
        return data.filter((row) =>
            row.fname.toLowerCase().includes(search.toLowerCase()) ||
            row.lname.toLowerCase().includes(search.toLowerCase()) ||
            row.role.toLowerCase().includes(search.toLowerCase()) ||
            row.gmail.toLowerCase().includes(search.toLowerCase()) ||
            row.gender.toLowerCase().includes(search.toLowerCase())
        );
    };
    return (
   

        <Detail title={'Supervisors'} column={column} data={filterFunction(search,persons)} search={search} setSearch={setSearch}>
            <CreateNew title={'Add New'} path={'/user/add'} >
                <FaUserPlus size={17} className='text-white' />
            </CreateNew>
       </Detail>  
        
    )
}

export default Supervisor

import React, { useContext } from 'react'
import { useEffect, useState, useMemo,useCallback } from 'react'
import axios from 'axios'
import GenderCell from '../../components/tableCells/genderCell'
import EditCell from '../../components/tableCells/editCell'
import DeleteCell from '../../components/tableCells/deleteCell'
import Detail from '../../partials/detail'
import { FaUserPlus } from 'react-icons/fa'
import CreateNew from '../../components/createNew'
import moment from 'moment/moment'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'

const Presentations = () => {
    const [persons, setPersons] = useState([])
const {user}=useContext(AuthContext)
const userJsonObj=JSON.parse(user)
    useEffect(() => {
        getPersons().then(data => {
            console.log("students:",data)
            setPersons(data.presentations)
        })
    }, [])

    const url = 'http://localhost:3000/presentation/getall'
    const getPersons = async () => {
        try {
            return await axios.get(url).then(res => res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = useCallback(async id => {
        const url = 'http://localhost:3000/presentation/delete/' + id
        await axios.delete(url).then(res => {
            setPersons(
                persons.filter((value, index, arr) => {
                    return value._id !== id
                })
            )
            toast.success('Presentation deleted successfully', )
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
            name: 'Name',
            selector: row => row?.name,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Location',
            selector: row => row?.location,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Date',
            selector: row => moment(row?.date).format('DD/MM/YYYY'),
            sortable: true,
            filterable: true,
        },
        {
            name: 'Time',
            selector: row => row?.time,
            filterable: true,
            sortable: true,
        },
        {
            name: 'Group Name',
            selector: row => row?.group?.name,
            filterable: true,
            sortable: true,
        },
        
        {
            name: '',
            cell: (person) => <div className='flex gap-2'>
{
    userJsonObj.role==='Admin'?<>
        <EditCell path={'/presentation/update/' + person._id} />
        <DeleteCell Event={handleDelete} param={person._id} />
        </>:""
}
               

            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },

    ], [handleDelete]);
    const [search, setSearch] = useState('');

    const filterFunction = (search, data) => {
        return data.filter((row) =>
            row?.name?.toLowerCase().includes(search.toLowerCase()) ||
            row?.location?.toLowerCase().includes(search.toLowerCase()) ||
            row?.group?.name?.toLowerCase().includes(search.toLowerCase())
            
        );
    };
    return (

        <Detail title={'Presentations'} column={column} data={filterFunction(search,persons)} search={search} setSearch={setSearch}>
           {
            userJsonObj.role==='Admin'?
            <CreateNew title={'Create Pressentation'} path={'/presentation/create'} >
            <FaUserPlus size={17} className='text-white' />
        </CreateNew>
            :""
           }
          
       </Detail>  
        
    )
}

export default Presentations

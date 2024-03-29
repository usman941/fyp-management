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


const Evaluation2 = () => {
    const [persons, setPersons] = useState([])
    const {user}=useContext(AuthContext);
    
    const jsonObject = JSON.parse(user);
    console.log("jsonObject:",jsonObject)
    useEffect(() => {
        getPersons().then(data => {
            console.log("groups lists:",data.groups)
            setPersons(data.groups)
        })
    }, [])

    const url = 'http://localhost:3000/group/getall'
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
            selector: row => row.name,
            sortable: true,
            filterable: true,
            cell: (row, index) => index + 1,
        },
        {
            name: 'Group Name',
            selector: row => row.name,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Members',
            selector: row => row.members.map((member,index)=>member.fname+' '+member.lname).join(', '),
            sortable: true,
            filterable: true,
        },
        {
            name: 'Supervisor',
            selector: row => row?.supervisor?.fname? row?.supervisor?.fname+' '+row?.supervisor?.lname:"Not Assigned",
            sortable: true,
            filterable: true,
        },
        {
            name: 'Action',
            cell: (person) => <div className='flex gap-2'>
                {jsonObject?.role==='Admin'?<>
            <DeleteCell Event={handleDelete} param={person?._id} />
             </>
            :''}
                {jsonObject?.role==='Teacher'?<>
                <EditCell path={'/committe/evaluate2/'+person?._id}/>
             </>
            :''}
             
            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },

    ], [handleDelete]);
    const [search, setSearch] = useState('');

    const filterFunction = (search, data) => {
        return data.filter((row) =>
            row.name.toLowerCase().includes(search.toLowerCase()) ||
            row.members.map((member,index)=>member.fname+' '+member.lname).join(', ').toLowerCase().includes(search.toLowerCase()) ||
            row?.supervisor?.fname? row?.supervisor?.fname+' '+row?.supervisor?.lname:"Not Assigned".toLowerCase().includes(search.toLowerCase())
            );
    };
    return (

        <Detail title={'Evaluation 2'} column={column} data={filterFunction(search,persons)} search={search} setSearch={setSearch}>
            {/* <CreateNew title={'Add New'} path={'/evaluation/evaluate-proposel'} >
                <FaUserPlus size={17} className='text-white' />
            </CreateNew> */}
       </Detail>  
        
    )
}

export default Evaluation2

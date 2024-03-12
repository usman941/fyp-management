import React, { useContext, useRef } from 'react'
import { useEffect,Fragment, useState, useMemo,useCallback } from 'react'
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
import { Dialog, Transition } from '@headlessui/react'
import { Button } from '@mui/material'
const GroupsLists = () => {
    const [persons, setPersons] = useState([])
    const {user}=useContext(AuthContext);
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [reqSuperviser,setReqSuperviser]=useState('')
    const [reqIdea,setReqIdea]=useState('')
    const [reqId,setReqId]=useState('')
    const handleApprove = (id,project,superviser) => {
        setReqId(id)
        setOpen(true)
        setReqIdea(project);
        setReqSuperviser(superviser)
    }
    
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

const handleArroveRequest=async()=>{
    try {
        const resp=axios.put(`http://localhost:3000/group/changeStatus`,{
            groupId:reqId,
            newStatus:"Approved"
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log("resp of change status",resp);
        
            toast.success("Group request approved successfully")
            setOpen(false)
            getPersons();
     
    } catch (error) {
        console.log("error in approving group request",error);
        toast.error("Something went wrong")
    }

}
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
            name: 'Project',
            selector: row => row?.project?.title? row?.project?.title:"Not Assigned",
            sortable: true,
            filterable: true,
        },
        {
            name: 'Status',
            selector: row => row?.status? row?.status:"Not Assigned",
            sortable: true,
            filterable: true,
        },
        {
            name: 'Actions',
            cell: (person) => <div className='flex gap-2'>
                {jsonObject?.role==='Admin'?<>
            <DeleteCell Event={handleDelete} param={person?._id} />    
            <Button
                    variant="contained"
                    size='small'
                    sx={{
                        width:"100px",
                        mr:1
                    }}
                    onClick={()=>handleApprove(person?._id,person?.project?.title,person?.supervisor?.fname+' '+person?.supervisor?.lname)}
                >
                    Approve
                </Button></>:''} 
            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },

    ], [handleDelete,handleApprove]);
    const [search, setSearch] = useState('');

    const filterFunction = (search, data) => {
        return data.filter((row) =>
            row.name.toLowerCase().includes(search.toLowerCase()) ||
            row.members.map((member,index)=>member.fname+' '+member.lname).join(', ').toLowerCase().includes(search.toLowerCase()) ||
            row?.supervisor?.fname? row?.supervisor?.fname+' '+row?.supervisor?.lname:"Not Assigned".toLowerCase().includes(search.toLowerCase())
            );
    };
    return (

        <Detail title={'Groups'} column={column} data={filterFunction(search,persons)} search={search} setSearch={setSearch}>
    {
    (jsonObject?.role === 'Student' || jsonObject?.role === 'Admin') ? (
        <CreateNew title={'Add New'} path={'/groups/create'}>
            <FaUserPlus size={17} className='text-white' />
        </CreateNew>
    ) : null
}

<Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">

                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Are you sure you want to approve this group request for project idea "{reqIdea}" and superviser "{reqSuperviser}"?
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                <p className="text-sm text-gray-700">By approving this group request, the group will be able to start working on their project.</p>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
   
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-[#6366F1] px-3 py-2 mr-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50  sm:mt-0 sm:w-auto"
                                            onClick={handleArroveRequest}
                                            
                                        >
                                            Approve
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            
       </Detail>  
        
    )
}

export default GroupsLists

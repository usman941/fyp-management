import React, { useContext } from 'react'
import { useEffect, useState, useMemo,useCallback } from 'react'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Detail from '../../../partials/detail'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../context/AuthContext'
import { Button } from '@mui/material'


const Marks_list = () => {
    const [persons, setPersons] = useState([])
    const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)
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
    const [viewArray,setViewArray]=useState([])
   const HandleOpenView=(data)=>{
    console.log("data:",data)
         setOpen(true)
            setViewArray(data)
   }
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
            name: 'Evaluation 1 Marks',
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
        {
            name: 'Evaluation 2 ',
            selector: row => row?.Evaluation2Result!=null?row?.Evaluation2Result:"Not Evaluated",
            sortable: true,
            filterable: true,
        },
        {
            name: 'Proposal Comments ',
            selector: row => row?.ProposalComments?.length>0?(
                <Button
                size='small'
                variant='contained'
                onClick={()=>HandleOpenView(row?.ProposalComments)}
                >
                    View
                </Button>
            ):"Not Evaluated",
            sortable: true,
            filterable: true,
        },
        {
            name: 'Evaluation 1 Comments ',
            selector: row => row?.Evaluation1Comments.length>0?(
                <Button
                size='small'
                variant='contained'
                onClick={()=>HandleOpenView(row?.Evaluation1Comments)}
                >
                    View
                </Button>
            ):"Not Evaluated",
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
<>
        <Detail title={'Students Marks List'} column={column} data={filterFunction(search,persons)} search={search} setSearch={setSearch}>
            {/* <CreateNew title={'Add New'} path={'/evaluation/evaluate-proposel'} >
                <FaUserPlus size={17} className='text-white' />
            </CreateNew> */}
       </Detail> 

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
                        Comments
                      </Dialog.Title>
                      <div className="mt-2">
        {viewArray.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-2 mt-2 rounded-md">
            <p className="text-sm text-gray-900 font-medium">{comment.evaluatorName}</p>
            <p className="text-sm text-gray-700">{comment.text}</p>
          </div>
        ))}
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
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
       </>
        
    )
}

export default Marks_list

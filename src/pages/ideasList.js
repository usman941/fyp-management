import React, { Fragment, useContext, useRef } from 'react'
import { useEffect, useState, useMemo, useCallback } from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import EditCell from '../components/tableCells/editCell'
import DeleteCell from '../components/tableCells/deleteCell'
import Detail from '../partials/detail'
import { FaUserPlus } from 'react-icons/fa'
import CreateNew from '../components/createNew'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'

const IdeasList = () => {
    const [persons, setPersons] = useState([])
    const { user, setUser } = useContext(AuthContext);
    const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null)
    const jsonObject = JSON.parse(user);
    useEffect(() => {
        getPersons().then(data => {
            console.log("ideas lists:", data)
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
    const [viewDesp, setViewDesp] = useState('')
    const handleView = (data) => {
        setOpen(true)
        setViewDesp(data)
    }

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
            selector: row => row?.project?.description?(
                <Button
                    variant="contained"
                    size='small'
                    onClick={()=>handleView(row?.project?.description)}
                >
                    View
                </Button>
            ):"Not Available",
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
            cell: (person) => <div className='flex gap-2'>{jsonObject?.role === 'Admin' ? <>
                <EditCell path={'/project/update/' + person.project._id} />
                <DeleteCell Event={handleDelete} param={person.project._id} /> </> : ''}

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
        <>
            <Detail title={'Project Ideas'} column={column} data={filterFunction(search, persons)} search={search} setSearch={setSearch}>
                <CreateNew title={'Add New'} path={'/project/add'} >
                    <FaUserPlus size={17} className='text-white' />
                </CreateNew>
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
                                                    Description
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                <p className="text-sm text-gray-700">{viewDesp}</p>
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

export default IdeasList

import React, { useContext } from 'react'
import { useEffect, useState, useMemo,useCallback } from 'react'
import axios from 'axios'
import GenderCell from '../../components/tableCells/genderCell'
import EditCell from '../../components/tableCells/editCell'
import DeleteCell from '../../components/tableCells/deleteCell'
import DownloadIcon from '@mui/icons-material/Download';
import Detail from '../../partials/detail'
import { FaUserPlus } from 'react-icons/fa'
import CreateNew from '../../components/createNew'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'

const Download_temp = () => {
    const [persons, setPersons] = useState([])
    const {user,setUser}=useContext(AuthContext);
    
    const jsonObject = JSON.parse(user);
    useEffect(() => {
        getPersons().then(data => {
            console.log("files:",data.files)
            setPersons(data.files)
        })
    }, [])

    const url = 'http://localhost:3000/file/getall'
    const getPersons = async () => {
        try {
            return await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = useCallback(async id => {
        const url = 'http://localhost:3000/file/' + id
        await axios.delete(url,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setPersons(
                persons.filter((value, index, arr) => {
                    return value._id !== id
                })
            )
            toast.success("File Deleted Successfully")
        })
    }, [persons]);

 
    const handleDownload = (fileUrl) => {
        // Assuming row has a 'fileUrl' property containing the download URL
        if (fileUrl) {
            // Check if the file URL ends with .pdf or .docx
            if (fileUrl.toLowerCase().endsWith('.pdf') || fileUrl.toLowerCase().endsWith('.docx')) {
                // If it's a PDF or Word file, open it in a new tab or window
                window.open(fileUrl, '_blank');
            } else {
                // For other file types, you might want to provide a download link
                toast.error('Unsupported file type. Provide a download link or handle accordingly.');
            }
        } else {
            console.error('Invalid file URL.');
        }
    };
    const column = useMemo(() => [
        {
            name: '#',
            selector: row => row.name,
            sortable: true,
            filterable: true,
            cell: (row, index) => index + 1,
        },
        {
            name: 'File Name',
            selector: row => row?.fileName,
            sortable: true,
            filterable: true,
        },
        {
            name: 'View',
            cell: (row) => (
              <div className='flex gap-2'>
                <DownloadIcon onClick={() => handleDownload(`http://localhost:3000${row?.fileUrl}`)} />
              </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
          {
            name: 'Action',
            cell: (person) => <div className='flex gap-2'>{jsonObject?.role==='Admin'?<>
            <DeleteCell Event={handleDelete} param={person._id} /> </>:''}    

            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },

    ], [handleDelete]);
    const [search, setSearch] = useState('');

    const filterFunction = (search, data) => {
        return data.filter((row) =>
            row?.fileName?.toLowerCase().includes(search.toLowerCase()) 
           
        );
    };
    return (
   

        <Detail title={'Download Templates'} column={column} data={filterFunction(search,persons)} search={search} setSearch={setSearch}>
            {/* <CreateNew title={'Add New'} path={'/user/add'} >
                <FaUserPlus size={17} className='text-white' />
            </CreateNew> */}
       </Detail>  
        
    )
}

export default Download_temp

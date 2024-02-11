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
import { useNavigate } from 'react-router-dom'

const GetMarksConfig = () => {
  
    const [marksObj, setMarksObj] = useState(null)
  
    useEffect(() => {
        getPersons().then(data => {
            console.log("markss config:",data)
            setMarksObj(data.marksConfig)
        })
    }, [])

    const url = 'http://localhost:3000/marks/getTotalMarks'
    const getPersons = async () => {
        try {
            return await axios.get(url,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
                ).then(res => res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const navigate=useNavigate();

    return (
   
<>
        <div className=''>
            <h1 className='text-2xl font-bold text-gray-900'>Evaluations Marks</h1>
   
        </div> 
                 <div className="w-full mt-12 overflow-hidden border border-gray-300 rounded-lg">
                 <table className="w-full ">
                   <thead className="bg-[#1E293B] text-white"> {/* Modify the classes here */}
                     <tr>
                       <th className="px-4 py-2">Evaluation Marks</th>
                       <th className="px-4 py-2">Proposal Marks</th>
                       <th className="px-4 py-2">Supervisor Evaluation Marks</th>
                       <th className="px-4 py-2">Action</th>

                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td className="border px-4 py-2">{marksObj?.evaluation1TotalMarks}</td>
                       <td className="border px-4 py-2">{marksObj?.proposalTotalMarks}</td>
                       <td className="border px-4 py-2">{marksObj?.supervisorEvaluationTotalMarks}</td>
                       <td className="border px-4 py-2 text-blue-600 cursor-pointer" onClick={()=>navigate(`/user/create_config/${marksObj?._id}`,
                        {
                          state:{
                            evaluation1Input:marksObj?.evaluation1Marks,
                            propInput:marksObj?.proposalMarks,
                            supervisorEvaluationTotalMarks:marksObj?.supervisorEvaluationTotalMarks
                          }
                        }
                        )}>Edit</td>

                     </tr>
                   </tbody>
                 </table>
               </div>
               </>
    )
}

export default GetMarksConfig

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Alert from '../../utils/alert';
import { toast } from 'react-toastify';

const SetTotalMarks = () => {
    const { id } = useParams();


    const [alert, setAlert] = useState({});
    const [isAlert, setIsAlert] = useState(false);
    const navigate=useNavigate();
    var [isUpdate, setIsUpdate] = useState(false);
    const location = useLocation();
    useEffect(() => {
        setPropInput(location?.state?.propInput)
        setEvaluation1Input(location?.state?.evaluation1Input)
        setSupervisorEvaluationTotalMarks(location?.state?.supervisorEvaluationTotalMarks)
    }, [location])


    const [Input, setPerson] = useState(
        {
            fname: "",
            lname: "",
            regno: "",
            contact: "",
            gmail: "",
            gender: "Male",
            role: "Student",
        }
    );
    const [propInput,setPropInput]=useState({
        problemStatement:"",
        solutionValidity:"",
        motivation:"",
        modules:"",
        taskManagement:"",
        systemAnalysis:"",
        documentFormat:""
    })
    const [evaluation1Input,setEvaluation1Input]=useState({
        problemStatement:"",
        solutionValidity:"",
        motivation:"",
        modules:"",
        taskManagement:"",
        systemAnalysis:"",
        documentFormat:"",
        plagiarismReport:""
    })
    const [supervisorEvaluationTotalMarks,setSupervisorEvaluationTotalMarks]=useState("")

   

    // const updatePersonHandler = async (id) => {
    //     await axios.post("http://localhost:3000/marks/configureTotalMarks", {
    //         evaluation1Marks:evaluation1Input,
    //         proposalMarks:propInput,
    //         supervisorEvaluationTotalMarks
       
    //     },{
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         }
    //     }
    //     ).then(res => {

    //         if (res.status === 200) {
                
    //          toast.success("Marks Configured Successfully")
    //         }
    //     }
    //     ).catch(err => {

    //         console.log(err);
    //     });
    // }
    // submit handler
    const SubmitPersonHandler = async () => {
        await axios.post("http://localhost:3000/marks/configureTotalMarks", {
            evaluation1Marks:evaluation1Input,
            proposalMarks:propInput,
            supervisorEvaluationTotalMarks
       
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(res => {

            if (res.status === 200) {
                
             toast.success("Marks Configured Successfully")
            }
        }
        ).catch(err => {

            console.log(err);
        });
    }

    const handleChangeProp = (e) => {
        setPropInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const handleChangeEval1=(e) => {
        setEvaluation1Input((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    //   if(id){
    //     updatePersonHandler("4234");

    //   }
        SubmitPersonHandler()
    }
    return (
        <>
        <div className='flex justify-between'>
           <form className="w-full max-w-lg" >
            <lable className="font-bold mb-6">Rubrics for FYP-1 Evaluation</lable>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Problem Statement
                        </label>
                        <input value={evaluation1Input.problemStatement} onChange={handleChangeEval1} name='problemStatement' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Solution Validity
                        </label>
                        <input value={evaluation1Input.solutionValidity} onChange={handleChangeEval1} name='solutionValidity' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Motivation
                        </label>
                        <input value={evaluation1Input.motivation} onChange={handleChangeEval1} name='motivation' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Modules
                        </label>
                        <input value={evaluation1Input.modules} onChange={handleChangeEval1} name='modules' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        System Analysis
                        </label>
                        <input value={evaluation1Input.systemAnalysis} onChange={handleChangeEval1} name='systemAnalysis' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Document Format
                        </label>
                        <input value={evaluation1Input.documentFormat} onChange={handleChangeEval1} name='documentFormat' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        plagiarism Report
                        </label>
                        <input value={evaluation1Input.plagiarismReport} onChange={handleChangeEval1} name='plagiarismReport' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Task Managment
                        </label>
                        <input value={evaluation1Input.taskManagement} onChange={handleChangeEval1} name='taskManagement' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                </div>


            </form> 

           
            <form className="w-full max-w-lg" >
            <lable className="font-bold mb-6">Rubrics for Proposal Evaluation</lable>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Problem Statement
                        </label>
                        <input value={propInput.problemStatement} onChange={handleChangeProp} name='problemStatement' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Solution Validity
                        </label>
                        <input value={propInput.solutionValidity} onChange={handleChangeProp} name='solutionValidity' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Motivation
                        </label>
                        <input value={propInput.motivation} onChange={handleChangeProp} name='motivation' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Modules
                        </label>
                        <input value={propInput.modules} onChange={handleChangeProp} name='modules' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        System Analysis
                        </label>
                        <input value={propInput.systemAnalysis} onChange={handleChangeProp} name='systemAnalysis' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Document Format
                        </label>
                        <input value={propInput.documentFormat} onChange={handleChangeProp} name='documentFormat' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Task Managment
                        </label>
                        <input value={propInput.taskManagement} onChange={handleChangeProp} name='taskManagement' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>
                </div>


            </form>
            
        </div>
        <div>
        <form className="w-full max-w-lg" >
            <lable className="font-bold mb-6">Superviser Evaluation Marks</lable>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Total Marks
                        </label>
                        <input value={supervisorEvaluationTotalMarks} onChange={(e)=>setSupervisorEvaluationTotalMarks(e.target.value)} name='supervisorEvaluationTotalMarks' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"  required />
                    </div>

                </div>
                <button type="submit" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleSubmit}>{isUpdate ? 'Update' : 'Submit'}</button>

                
              

          
               


            </form> 
        </div>
        </>
    )
}

export default SetTotalMarks
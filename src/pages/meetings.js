import React from 'react'
import { FiEdit } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import axios from "axios";
import { NavLink } from "react-router-dom";
import ShowModel from "../utils/showModel";


const Meetings = () => {

    const [meetings, setMeetings] = React.useState([]);
    const role = JSON.parse(localStorage.getItem("user")).model;

    React.useEffect(() => {
        const fetchMeetings = async () => {
            await axios
                .get("http://localhost:3000/meeting/getMeeting")
                .then((res) => {
                    setMeetings(res.data.meeeting);
                    console.log(res.data.meeeting);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchMeetings();
    }, []);

    const deleteMeeting = async (meetingId, url) => {
        try {
            // Send a DELETE request using Axios to the specified URL and meetingId
            const response = await axios.delete(url + meetingId);
            // Log the response if the request is successful
            console.log(response);
        } catch (error) {
            // Log any errors that occur during the DELETE request
            console.log(error);
        }
    };
    const handleMeetingDelete = (meeting) => {
        const deleteMeetingURL = "http://localhost:3000/meeting/";
        deleteMeeting(meeting._id, deleteMeetingURL);
    
        const deleteMeetingFileURL = "http://localhost:3000/meeting/removefile/";
        // Assuming there's a property 'fileId' within the meeting object representing the file associated with the meeting
        deleteMeeting(meeting.fileId, deleteMeetingFileURL);
    
        setMeetings(meetings.filter((m) => m._id !== meeting._id));
    };
    


   








  return (
    <div>
    <div className="w-full bg-gray-100 py-10 px-5 md:px-0">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-col">
                <div className="my-4">
                    <h1 className="text-3xl font-bolder leading-tight text-gray-900">Presentations </h1>
                </div>
                <div className="-mb-2 py-4 flex flex-wrap flex-grow justify-between">
                    <div className="flex items-center py-2">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-search" type="text" placeholder="Search" />
                    </div>
                    { role === "Admin" &&
                    <div className="flex items-center py-2">
                        <NavLink to={"/meeting/new/"} className="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline">
                            Create new Presentation
                        </NavLink>

                    </div>
}
                </div>
                <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                        <table className="table-auto w-full">

                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                                    <th className="p-2 md:px-6 md:py-3 text-left font-medium">
                                        Group
                                    </th>
                                    <th className="p-2 md:px-6 md:py-3 text-left font-medium">
                                        committee
                                    </th>
                                    <th className="p-2 md:px-6 md:py-3 text-left font-medium">
                                        Date 
                                    </th>
                                    <th className="p-2 md:px-6 md:py-3 text-left font-medium">
                                        Time
                                    </th>
                                    <th className="p-2 md:px-6 md:py-3 text-left font-medium">
                                        Location
                                    </th>
                                    <th className=" md:px-0 md:py-0 text-left font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {meetings.length >0 && meetings.map((m) => (
                                    <tr id={m._id} key={meetings.indexOf(m) + 1}>
                                        <td className="p-2 text-sm md:px-6 md:py-4 whitespace-no-wrap border-b border-gray-200">
                                            {m.group.students.map(s=>s.regno).join()}
                                        </td>
                                        <td className="p-2 md:px-6 md:py-4 whitespace-no-wrap border-b border-gray-200">
                                            {m.committee.members.map(a=>a.name).join()}
                                        </td>
                                        <td className="p-2 md:px-6 md:py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">
                                                {m.time.split('T')[0]}
                                            </div>
                                        </td>
                                        <td className="p-2 md:px-6 md:py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">
                                            {m.time.split('T')[1]}
                                            </div>
                                        </td>
                                        
                                        <td className="p-2 md:px-6 md:py-4 whitespace-no-wrap border-b border-gray-200">
                                                    {m.location.length >= 30 ? m.location.slice(0, 30) + '...' : m.location}
                                                </td>


                                        <td className=" whitespace-no-wrap border-b border-gray-200">
                                            <div style={{
                                                display: "flex",
                                                gap: "1rem"
                                            }}>
                                                <div className="text-indigo-600 hover:text-indigo-900 focus:outline-none  text-lg focus:underline">
                                                            <ShowModel group={m.group} committee={m.committee} />
                                                        </div>
                                                {/* <NavLink to={"#"}
                                                    className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline text-lg" >
                                                    <FiEdit />
                                                </NavLink> */}
                                                {role === "Admin" &&
                                                            <NavLink to="#"
                                                                className="text-indigo-600 hover:text-indigo-900 focus:outline-none  text-lg focus:underline" >
                                                                {/* <FaTrash onClick={
                                                                    
                                                                    () => handleMeetingDelete(m)
                                                                } /> */}
                                                            </NavLink>
                                                        }
                                            </div>
                                        </td>
                                        {/* <td className="ml-4  pr-2 md:pr-3 whitespace-no-wrap border-b border-gray-200">
                                        </td> */}


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


</div>
  )
}

export default Meetings
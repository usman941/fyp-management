import React, { useState } from 'react'
import Sidebar from '../partials/sidebar'
import WelcomeBanner from '../partials/dashboard/welcomeBanner'
import Header from '../partials/header'
import Page404 from './page404'

import {
    Routes,
    Route,
    Navigate,
    json
} from 'react-router-dom';
import SupervisorAllocation from './SupervisorAllocation'
import Student from './person/student'
import Supervisor from './person/supervisor'
import StudentDetail from '../partials/person/studentDetail'
import SupervisorDetail from '../partials/person/supervisorDetail'
import StudentsUnderAdvisor from '../partials/studentsUnderAdvisor'
import FormatUpload from '../partials/formatUpload'
import Formats from './formats'
import PostIdea from '../partials/postIdea'
import IdeasList from './ideasList'
import Groups from './person/group/groups'

import Commtiee from './person/committee/committee'
import Milestones from './milestones'
import Department from './department'
import Meeting from '../partials/meeting'
import Meetings from './meetings'
import FAQ from '../partials/FAQ'
import Evaluation from '../partials/evaluation'
import StudentGroup from './studentGroup';
import AddUser from '../partials/person/AddUser'
import Adviser from './person/Adviser'
import IndustryPerson from './person/IndustryPerson'
import AddProject_idea from '../partials/sidebar/sideMenu/AddProject_idea'
import GroupsLists from './GroupsLists'
import CreateGroup from '../partials/sidebar/sideMenu/CreateGroup'
import CommitteList from './CommiteList'
import CreateCommitte from '../partials/sidebar/sideMenu/CreateCommitte'
import CreateEvaluation from '../partials/sidebar/sideMenu/CreateEvaluation'
import Superviser_evaluation from '../partials/sidebar/sideMenu/Superviser_evaluation'
import Superviser_evaluate from '../partials/sidebar/sideMenu/Superviser_evalate'
import Committe_evaluation from '../partials/sidebar/sideMenu/Committe_evaluation'
import Create_Committe_eval from '../partials/sidebar/sideMenu/Create_Committe_eval'
import Evaluation_marks_list from '../partials/sidebar/sideMenu/Evaluation_marks_list'
import Marks_list from '../partials/sidebar/sideMenu/Marks_list'
import Upload_temp from '../partials/person/Upload_temp'
import Download_temp from './person/Download_temp'
import Create_Presentation from '../partials/person/Create_Presentation'
import Presentations from './person/Presentations'
import Proposel_Evaluation from '../partials/sidebar/sideMenu/Proposel_Evaluation'
import GetMarksConfig from './person/GetMarksConfig'
import SetTotalMarks from '../partials/person/SetTotalMarks'
import Evaluation2 from '../partials/sidebar/sideMenu/Evaluation2'
import Create_evl2 from '../partials/sidebar/sideMenu/Create_evl2'
import Settings from '../partials/person/Settings'
import StudentReq from './StudentReq'

const Dashboard = ({ user }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (


        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar role={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        {/* Welcome banner */}
                        <Routes>

                            <Route exact path="/" element={<WelcomeBanner user={user} />} />
                            <Route exact path="/user/students" element={<Student />} />
                            <Route exact path="/user/supervisers" element={<Supervisor />} />
                            <Route exact path="/user/advisors" element={<Adviser />} />
                            <Route exact path="/user/industry-persons" element={<IndustryPerson />} />
                            {/* marks config */}
                            <Route exact path="/user/get-marks-config" element={<GetMarksConfig/>} />
                            <Route exact path="/user/create_config/:id" element={<SetTotalMarks/>} />



                            <Route exact path="/user/groups" element={<Groups />} />
                            <Route exact path="/user/committee" element={<Commtiee />} />
                            <Route exact path="/user/student/new" element={<StudentDetail />} />
                            <Route exact path="/user/advisor/new" element={<SupervisorDetail />} />

                            <Route exact path="/user/add" element={<AddUser />} />
                            <Route exact path="/presentation/create" element={<Create_Presentation />} />
                            <Route exact path="/presentation/update/:id" element={<Create_Presentation />} />

                            <Route exact path="/presentation/all" element={<Presentations/>} />
                            <Route exact path="/setting" element={<Settings/>} />



                            <Route exact path="/user/student/update/:id" element={<StudentDetail />} />
                            <Route exact path="/user/advisor/update/:id" element={<SupervisorDetail />} />
                            <Route exact path="/meeting/new" element={<Meeting />} />
                            <Route exact path="/meeting/all" element={<Meetings />} />
                            <Route exact path="/milestone/new" element={<Milestones />} />
                            <Route exact path="/group" element={<StudentGroup />} />
                            <Route exact path="/allocation/groups" element={<h1>Hello Groups</h1>} />
                            <Route exact path="/myStudents" element={<StudentsUnderAdvisor />} />
                            <Route exact path="/allocation/supervisors" element={<SupervisorAllocation />} />
                            <Route exact path="/allocation/projects" element={<h1>Hello projects</h1>} />
                            <Route exact path="/template/download" element={<Download_temp />} />
                            <Route exact path="/formats/upload" element={<FormatUpload />} />
                            <Route exact path="/project/new" element={<PostIdea />} />
                            {/* project  */}
                            <Route exact path="/project/all" element={<IdeasList />} />
                            <Route exact path="/project/add" element={<AddProject_idea />} />
                            <Route exact path="/project/update/:id" element={<AddProject_idea />} />
                            {/*groups  */}
                            <Route exact path="/groups/all" element={<GroupsLists />} />
                            <Route exact path="/groups/create" element={<CreateGroup />} />
                            <Route exact path="/groups/update/:id" element={<CreateGroup />} />
                            <Route exact path="/upload/template" element={<Upload_temp />} />

                            <Route exact path="/request/student" element={<StudentReq/>} />

                            {/* committe */}
                            <Route exact path="/committe/all" element={<CommitteList />} />
                            <Route exact path="/committe/create" element={<CreateCommitte />} />


                            <Route exact path="/evaluation" element={<Evaluation />} />
                            <Route exact path="/evaluation/evaluate-proposel/:id" element={<CreateEvaluation />} />

                            <Route exact path="/superviser/evaluation" element={<Superviser_evaluation />} />
                            <Route exact path="/superviser/proposel" element={<Proposel_Evaluation />} />

                            <Route exact path="/evaluation/evaluate-superviser/:id" element={<Superviser_evaluate />} />
                            <Route exact path="/committe/evaluation" element={<Committe_evaluation />} />
                            <Route exact path="/committe/evaluation2" element={<Evaluation2/>} />

                            <Route exact path="/committe/evaluate/:id" element={<Create_Committe_eval />} />
                            <Route exact path="/committe/evaluate2/:id" element={<Create_evl2 />} />

                            <Route exact path="/evaluation/marks" element={<Evaluation_marks_list />} />
                            <Route exact path="/evaluation/marks-list" element={<Marks_list />} />
                            
                            <Route exact path="/faq" element={<FAQ />} />
                            <Route exact path="/*" element={<Page404 />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard
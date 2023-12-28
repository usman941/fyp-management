import React from 'react'
import SidebarLinkGroup from '../sidebar/sideMenu/sidebarLinkGroup'
import SupervisedStudents from '../sidebar/sideMenu/supervisedStudents'
import MeetingMenu from "../sidebar/sideMenu/meetingMenu";


const AdvisorSection = ({pathname,sidebarExpanded,setSidebarExpanded}) => {
  return (
    <>
    <SidebarLinkGroup
      activecondition={pathname === "/users" || pathname.includes("users")}
    >
      {(handleClick, open) => {
        return (
          <SupervisedStudents
            handleClick={handleClick}
            open={open}
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
          />
        );
      }}
    </SidebarLinkGroup>
    {/* <SidebarLinkGroup
        activecondition={
          pathname === "/meeting/all" || pathname.includes("meetings")
        }
      >
        {(handleClick, open) => {
          return (
            <MeetingMenu
              handleClick={handleClick}
              open={open}
              sidebarExpanded={sidebarExpanded}
              setSidebarExpanded={setSidebarExpanded}
            />
          );
        }}
      </SidebarLinkGroup> */}
 </>
  )
}

export default AdvisorSection
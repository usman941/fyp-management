import React from "react";
import SideMenu from "./sideMenu";
const FaqMenu = ({
  handleClick,
  open,
  sidebarExpanded,
  setSidebarExpanded,
}) => {
  return (
    <SideMenu
      title={"FAQ"}
      pathname={"/faq"}
      checkUrl={"/faq"}
      checkPathName={"faq"}
      icon={
        "data:image/png;base64,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"
      }
      handleClick={handleClick}
      open={open}
      sidebarExpanded={sidebarExpanded}
      setSidebarExpanded={setSidebarExpanded}
      subMenus={[]}
    />
  );
};

export default FaqMenu;

import React from "react";
import SideMenu from "./sideMenu";
const FormatUploaderMenu = ({
  handleClick,
  open,
  sidebarExpanded,
  setSidebarExpanded,
}) => {
  return (
    <SideMenu
      title={"Downloads Template"}
      pathname={"/template/download"}
      checkUrl={"/template/download"}
      checkPathName={"formats"}
      icon={
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABHNCSVQICAgIfAhkiAAABf5JREFUeJztnV1sVEUYht9vztoK2sJug3pDiNHadstPmsKNEUTQImAwpsafRLywCZYEMFqtK1Cz2hgSIYGQSBCiN3Al0gRRGtqlRNQbEo2R7rYVY0QuTFTEtLFAd898XhSiFnvamT3bM2c7TzIX3Z5555t5+82ZnfNTwGKxWCwWi8VisVgsFovFMl0gvwWXnknH4dC7DCwFc7nf+oFANAjgDLn8+hfLajO+Svspdv9X5+6JuM7XIJ7lp65B/Cnh1n+5dOGPfglG/BICgFty4gDAs8B+qhrFbAfOQQAr/RL0LQMe6ultZEEf+6VnMiT5ydMr5h/1RcsPkdUnzpdeu3VkAMA8P/RCwIXSqyVVnWsqr+UrJPyIZqQk20qMecTANCnzRkqyrX6MXd4Z0HDy3FwpnAGAZ/gRUHigK0K6VV2rFlzMRyXvkzCT2CV4ug0+APAMJrELwNP5qOSVAQ0nM8uI+fMJDruci4jKUw/XXMqnralmZaqvIpKT5wFEvY5joge7VsXP6LajfQ5IJlkIyXtJAl4FoLawDT4AjMZMbRP1T0jem0yy9jhqVzy7JLNBSCwSDIxfqLd8sGa/bhtBUz5Ys18w9Xr2UWLR2SWZDbptaE1Baz/9LgqOnAe4wus4yVjZua62Ry80M1j9SXqFIJzyPoougXKVnz228LKqvlYGkBtpJ0YFMWH8gqNhH3wA6FxX20OMoxP0tYLcSLuOvrIBazsy8wWj2XNuZFyVWWrRCchEZJZaiHHV81zAaF7bkZmvqq1sQISwnRiO17xIEjtPNMYvqGqbyonG+AWS2OnZZ4YTAbapaisbQJIbvFcGfLE0W7ZDVdd0SrNlO0jyxQkyv0FVV/mLGEnyXBcDNDdHQ8NPHPF12zxwchgCyQnXLDFVXWUDRPFuNQeCRgYUIozpi7oBNgN8RX0KshngKzYDAsaeAwLGroICxmZAwFgDAsZOQQFjMyBg1Dfjgr8lBMT4Vrj8XAk7c0rYmUOS15NErwFxKRO6DCBCemRm9oFDzy/6618fH37hg/5jNCK/YeDewILTQDkDvK8BF75AYvuYwQcAfNhUPUTMbwUenyKhy4BrV7Ld4/2uVIrOkZDdGaxxQSbYcui1m//6b/DepppLQcenStEtQ02Pbyyhm4ImwvT4xlJ0u6GmxzcWmwEBYw0IGDsFBYzNgIBRf0DD9A6aHt8YbAYEjDUgYNSnINNPcqbHNwbzMoBxmBxqL0f1D8mkemt7kvGbbuBMJllczg1UCpJJEJ7xJ1B/MMoAZnTufie+3m/d60YOAHj2lW2ZChAe8bsNXYwygBgHCqd+vQ2JfaE2oKDLPMYfBVQfRfLvIN/f0qONUd+EGVgGQPuZ28lBy036tmzUBRkhaWtra//iQnQUAFpb+xcLiTdMuiBjlAEkeQZc2ZVo6atX74o3iZa+eriyiyRmhtoAyIKXqGTu9tOEREtfvWTuhkS04PErYlgGXC8uopzj7sSW/E1IbOmr5xx3k4voVMSuisk3ZkXB+ZmQ2JyuY3AXMaKm3phl4hT0T2FEIfVMSGxO1xFTiiRiUxqzImZOQf8tUcpxd2Lj5E1INKfrhKQUJGJTHa8qYTAAJBEVzF2J5nTdpAYflII79YNfzAaAJGKOpFSbhwltzek6R45OO0HFWXADwIGWGLuUamu62YS2pnQdu5QCIxZojIoYtRk3SWIM6tnWlN7w/WC8AwCqyzKNDNoPiag5uzyTQ+ddEYWIQ5XZBPqo+vb+0Z9YhO5uiBuEMQOKiuK7JBkybAYEjI4BQwDKChBLMTCkWkHDAP4ZoFrVetMCwk+qVZQNYEmnCLAG/A9MGPfxqfFQf0LGlQcgxCb49Ob1ooE5x+wcVK2mtahvb8zsA2ijTt1ihZn3vNkRf1m1ntbb0++oGH7p199uuxvAozr1iw0CH6uK1LyqV1eT5PLTkUj5nTuJaDMDjq5OmCHAZWD3fSXViaeOkKupkR9vP963wGG8CMYaEO4Co8j/lwAPg/ALMY4Dzvtbj1f1Bx2RxWKxWCwWi8VisVgsFoslHPwN6t1OigSZ/Y4AAAAASUVORK5CYII="
      }
      handleClick={handleClick}
      open={open}
      sidebarExpanded={sidebarExpanded}
      setSidebarExpanded={setSidebarExpanded}
      subMenus={[]}
    />
  );
};

export default FormatUploaderMenu;

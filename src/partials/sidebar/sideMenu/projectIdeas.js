import React from "react";
import SideMenu from "./sideMenu";
const ProjectIdeas = ({
  handleClick,
  open,
  sidebarExpanded,
  setSidebarExpanded,
}) => {
  const subMenus = [
    // {
    //   path: "/allocation/groups",
    //   title: "Groups Allocation",
    // },
    {
      path: "/project/all",
      title: "Project Ideas",
    },
    // {
    //   path: "/allocation/projects",
    //   title: "Projects Allocation",
    // },
  ];

  return (
    <SideMenu
    title={"Project Ideas"}
    pathname={"/project/all"}
    checkUrl={"/all"}
    checkPathName={"all"}
      icon={
        "data:image/png;base64,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"
      }
      handleClick={handleClick}
      open={open}
      sidebarExpanded={sidebarExpanded}
      setSidebarExpanded={setSidebarExpanded}
      subMenus={subMenus}
    />
  );
};

export default ProjectIdeas;



// import React from "react";
// import SideMenu from "./sideMenu";
// const ProjectIdeas = ({
//   handleClick,
//   open,
//   sidebarExpanded,
//   setSidebarExpanded,
// }) => {
//   return (
//     <SideMenu
//       title={"Project Ideas"}
//       pathname={"/project/all"}
//       checkUrl={"/all"}
//       checkPathName={"all"}
//       icon={
//         "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABHNCSVQICAgIfAhkiAAADGdJREFUeJztnXl0VNUdx7+/O5OEgAQsKgq1m0WYGVAUEQxboqCACxRNFDkCymmoojmWXUAZKIUgiSBiWQQFKS4JLq0IonDClgSRFhdmJoE/2uoRAxogLALJvPvrH5Aaknmz5d43w+l8zrl/ZN573999v9/c/d4JkCBBggQJEiRIkCBBggTWQqoFe3zmfYjB6QAqbUn2NWVdO36r2kYs6fXP8nZ+vzGKCdcAXLane+c3VeorDUjPPZ71AO6v91EVS3n7pz27fKnSTqxI3+PpKoGtAH5W9xkx1pf1cGWpsqEsIOm7vQ8xuPG3hai0rIezV1P1B208mHL8iprezNSNmDsDcBHhGmZqDnCLC8ZOA3waQCUADxPtF+C9raqSSzYN7nCuqXlI3+0pY6BnowuE7LIerqKm6gOAXYUIAEByTwoUXubuWYWFtqLsbCNSyVs/9bVJMuRwJgytRm06GUglcD1t4KK/wa0AtALQDsDNxOevVV9ee6ZXmaeEQe8y89tl6a6jkeYlo7jYXsu4JdA1YroNQHwFhIBKkgEvVEUajL4l3r4GeAL55WAAdmIAFzk+UjgVQH8C92fCot6l3g2SKb+0l6MsXIVtmZn+XiWeKgG0DXD5cBMydxFClZCEfS1JqiYG6idh4MVwNfrs8NzRZ5dnJzNvF4z7iM8HQ2USEskkeZiNZWmfXd7iXjs9vcPNn03SkkaaEseZxdrovNYYZQEpS+/4rTBokGDsJ0aNkKiCxFzhP5If6tleu8rb9d3hfYuALSTRmyRgTeIMG2Nnvx2e19NLvrgqVD6F/3AeMfKERBUxakjSVzaiQSW9Ox1S40UN3d5IydjufZCBFQROi2U+GDgG5lHbMzp/EMt8xCwggzYeTDnbrGYhCI/HKg8BYAYKgCPPbMvM9MciAzEJSEbxvtaCk/8GoG8s7IeEsUkKZG/LdJ2y2rTlAblz81fXGjbxEQCn1bYjZJ/N8A/8+K4bj1hp1NKA3LHF10ZIuQuETlbajRYG9p1JtfUr6d3ppFU2LQvInZu/aMFkLyZGdw3yHwEYqEEXAIpbVWNgUbarRpP+RSjr9oY0JO3LhUR31eMKYvilkOM16NalzBNp9LxlfrLCyF0feh8BY4SOsYSQWLZlQBef1vEKI3fQRs8gK3ylPSD3fFDR3ga8LBhQnYhxVArMBNRrX5QkExir797w5eW6/aVuctEEhn8hSbTUoU0E96aB5ycKA86jqbQFXAXY/wzgCZ12tJaQez7w3EFMWcQE9Qnlp1scWVpnS4+NRjZzBr/n6arTZ1pLCBmYq0ubQRPqj6Z1l5AL2OyEWQCG6DKgrYQMed/bXzDdqqle/3jDUOfGi15EZxtSL4Hp3iHv+7ro8pu2EkIGT9QyzCH2E+TTjT62poSAAAJ4EoCROvS1lJCswor2QtIALeMCScvfG9bF19CmxnFIoyQkD8sq9Fymw3daSoiEfAQMQaxYmPg428TMgJcsKiEXrLWQTPcDWKNaWUtAiPkBLXMykmatz3JUBbokVAc/dGaGQUNAlFdZQ1/b15okbtIwWq74oe3hJWZ2rVtlrEvUL6uQbar9p7yEJKekZIA1tE1Mk4ItGimvHkPTimo8NwP4TKWo8oAIybey4t4VET55a4Qj6NKqtW1IHaI74j0gxORQGQ4G+8mPP4a6z/o2BGCijqo1QwbksVXlLc8mcToANKul0lfHBF+sIcmdVI4/iGj5G6OdnpD3Ma+OWJwxGKCQu01MbYJDLrRF7L9gF4ev8d0mJK8Hod2Fm79lxgPrHnXuNntmxGrvDwDahMpoOBD4uJFs7/Dmwx1/UKFXn0de93aWEp8DiLphJmD/X0c7TUft0fjPtPHNKmSbzZCFgtFOnF93AEm0F8yFbjebPickp9bd39REkmbrCAYAwM8vCglbU/IH+dOma2X+M7uQesLbTTD9vPFIla79V/vym8yeI6ZmakbkOJBa+6NpN7cpjFrluY+YbleQT9P1kWj9Z9qGCEYKmzWUZDQze44YfjCSza6HDfOkFWNvqW2yTgNylu9NOiepQEUrR2Re3UXrP9MS0rwG++j8lsmG39wqmWx8bppJAycVfPM+WZPj+ruZjaZwDqm5xPitmjktnFDtP9OA/GWc65QADxWMQ/+rNxmHbFIOWTvyxtNmzxHjZNPaDRg2A+PDd3H4PPrqwSsFMENZG8cw7TFF7b9QLzFi8cG0Zsk16YIFG8mhu21jlnpLAdwWStcMBh8hYGPoOy9m1eOuR0PdM2ap92WoXIJl7Fr1hLNPsFsi9V/Icci63A4ncH7fU1gQ4wA4+oDQ+XHB6CgeDRqQMUu9nUlibFSZMoGAA6HuidR/6kfqkiqadrhGD8LAC2jCmCMQDJSr1AM0BMTGKDPtXcSIsYt990LyANW6RLJUtabygMjk0yXibPNTALSsqEVKzvK9STjL+crXZxjVVe1cpiPuaFE+Tb5i7C21gvGJ1esTZth+bD5OSFyv3CawqSibIj7IGgotK4bCoHWS+Hc6tCMhJ7/iCsHGTB01KElap0FW0xJukn0D1dQeA8ynFqwgGcYslmitfjmZjlx5qjLsnlMkaNl18lJuh3NgrIxllfVUvscJiRwt9piXu916jrxp2yiXVIOFxDhn1dachrBBi0jDsWpI/JhCtsW6/KYtIIumO78jg1ZAApakejyV572bJAbosCOAJQUTNS0JQPPe3rMi+dlUWfMgM0e9Khcpbnex/aiBAh3aBHyTlFw7W4d2HVp3v6+Yel01S55oZZV11NZ2HDE6arEjkZs/yXxiUAXaD+wsnuFcSxKbrGjUx831tREMtxZ9xtuLnnW+r9tf2g/sAAAJ2+/Zb+wH0FqnneQa6WaQchsEVBJY60GderasYfxzniwGFerSZ2k4Sdi+hPovGUPQwIVux8eKdQNi6Tn18TO8K0EYo0ObgU0EKD+YyUwFC+c4JqrWNcOSKquO2uqkcUlptV0BdFOtrSMYBOxIS6qcqlo3hE1rmTLF8wtDiL0MvtJq25FAwNecYutW4NY35jCxaz0Tpnj7AthCQFIs7IfBaUnc54U81z6rDVv2Sw71KZjv3CEkngAD8ZiYaWQsggHEqITUMXmi70UG58YyD40gmr5ggUPb6eGQ5lWKTZhQ0V3AmEtADwCVYKxqnna4wGxmNCuLbb+51reRgTtV5iN66M3nX3A8bHbV7S62nznZdjwzxoBwDRi7BdEzeQWOf6jKgbIqa+rTvl/ZpbFVSPQniZYk0YEYeWeqr55m9kxRERlISsmGpAqrZoVNp14Ye5qnNXss2DueqW47ExLziXE9SbQkxgCWXDwl1/MLVX5U2YaMhkTLADOkTwV7aP7866pZ8r0wqNqymeHG6ZCdMdTt/vXZoG8o8WSAZ1uCaGSYPgqJsoCwwa1MFnPSsrKCn8VbsNh5UDAes3JB66dEhjBE9txFzu+C5dHtLraTxGUB57kkKVsZVRYQYtoVMLMGlRYVhd4MMO8lx7skabHlAWGeNm9Jp5JQ+XO7M/2QKA2kIZh3KnEiFAYkb4njHTCtb9CFrBIGB62y6nNK2CeD4bGqe0uMHfOWOBaEmz8mehKMqgY6hfOWqJsFVt7tnT7W+6AkSgfwHUleM3dF8KqgIVP/4LlJgPZA+7QOVRtS3jB/hevrSJ6a/GR5O3stj2LC1QRZMneZS+mEacx/SDkQM3K8sxl4VqcNEpQzZ5njFZ02oiEmI/VQ2I/xHJLwaayqts9Z1mmlpS8VJnEZEHeRq4bAYzU15H4DlIOAe1ViT1wGBAD+tNK1kxhvkSSoTJC0at4rjpDHCGKFpeshkWI7lzTJsPuDD9YiRBo8S6VeggQJEiRIkCBBgkuBuJw6qc/s+32vqdR77h1HyPPssSSuxyEAQBzVmfVgJALSFOo2Uv+/kAhInBH3AYHE9wDU7HIkVvYvUnURt5OLdQjJe5XtLjFI6S+I6iDuAyLBq5UdupFQ2mPTQdx3ewFg3kDfNjD6NUWDgM1TNzt0/Sc3ZcR9CQEAJnsWMT6NtqoSjBK21w6P9XuEwyURkGmbOnx/edXpPkLyeJL8TdjVlIF/QyL3TE1lxjMf3nAs1u8RDpdEldWQ+f0POMByOJjNNkLMMghvTNsavyuDZlySAQGA5zM8V4PEfxr9AirhXK3w/3L61i5x38UNxCVRZQVi8jZXJUmeE+CnL2ZfqsEALuESUkd+X98wZmQCAIG3Ttyp/yx5ggQJEiQAAPwXxyoCtuJZCgMAAAAASUVORK5CYII="
//       }
//       handleClick={handleClick}
//       open={open}
//       sidebarExpanded={sidebarExpanded}
//       setSidebarExpanded={setSidebarExpanded}
//       subMenus={[]}
//     />
//   );
// };

// export default ProjectIdeas;

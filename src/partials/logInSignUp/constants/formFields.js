const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    }
]

const signupFields=[
    {
        labelText:"First Name",
        labelFor:"fname",
        id:"fname",
        name:"fname",
        type:"text",
        autoComplete:"fname",
        isRequired:true,
        placeholder:"First Name"   
    },
    {
        labelText:"Last Name",
        labelFor:"lname",
        id:"lname",
        name:"lname",
        type:"text",
        autoComplete:"lname",
        isRequired:true,
        placeholder:"Last Name"   
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"gmail",
        name:"gmail",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"regno",
        labelFor:"regno",
        id:"regno",
        name:"regno",
        type:"text",
        autoComplete:"regno",
        isRequired:true,
        placeholder:"Registration Number"   
    },
    {
        labelText:"contact",
        labelFor:"contact",
        id:"contact",
        name:"contact",
        type:"number",
        autoComplete:"contact",
        isRequired:true,
        placeholder:"Contact Number"   
    },
    {
        labelText:"gender",
        labelFor:"gender",
        id:"gender",
        name:"gender",
        type:"select",
        autoComplete:"gender",
        isRequired:true,
        placeholder:"Gender",
        options:[
            {value:"",label:"Select Gender"},
            {value:"male",label:"Male"},
            {value:"female",label:"Female"},
            {value:"other",label:"Other"},
        ]
    },
    {
        labelText:"Role",
        labelFor:"role",
        id:"role",
        name:"role",
        type:"select",
        autoComplete:"role",
        isRequired:true,
        placeholder:"Role",
        options:[
            {value:"",label:"Select Role"},
            {value:"Student",label:"Student"},
            {value:"Advisor",label:"Advisor"},
            {value:"IndustryPerson",label:"Industry Person"},
            {value:"Teacher",label:"Supervisor"},
        ]
    }  
]

export {loginFields,signupFields}
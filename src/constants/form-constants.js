export const LOGIN = {
    title: "Sign in to continue",
    form_fields: [
      { type: "email", placeholder: "Email Address" ,style:'border-input'},
      {
        type: "password",
        placeholder: "Password",
        style:'border-input'
      },
    ],
    button: "Sign In",
    error_message:'Invalid Credentials'
  };
 
  export const LOCATION = {
    title: 'Select Office',
    branch: [
      {
        url: 'Chennai',
        branch: 'CHENNAI',
        name: 'Chennai',
        src:'/images/chennai.svg'
        
      },
      {
        url: 'Bengaluru',
        branch: 'BENGALURU',
        name: 'Bengaluru',
        src:'/images/bengaluru.svg'
        
      },
      {
        url: 'Hyderabad',
        branch: 'HYDERABAD',
        name: 'Hyderabad',
        src:'/images/hyderabad.svg'
        
      },
    ]
  }
  
  export const TEMPERATURE = {
    title: 'Record Temperature',
    fields: [
    
      {
        placeholder: 'Temperature (F)',
        style: 'border-less-input',
        type:'number'
      }
    ],
    button:"Add Record"
  }

  export const LOGIN_INFO = {
    email: 'mathiarasi@gmail.com',
    password:'Mathi@2002'
}
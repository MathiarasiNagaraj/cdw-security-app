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
        url: 'chennai',
        branch: 'CHENNAI',
        name: 'Chennai',
        src:'/images/chennai.svg'
        
      },
      {
        url: 'bengaluru',
        branch: 'BENGALURU',
        name: 'Bengaluru',
        src:'/images/bengaluru.svg'
        
      },
      {
        url: 'hyderabad',
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
        type: 'number',
        max:99,
        min:97.00
      }
    ],
    button: "Add Record",
    message: 
      {
        missing_fields:(data)=> {return `Enter ${data}`},
        already_present: "Co-Worker details  already present in today's record ",
        
      }
    
  }

  export const LOGIN_INFO = {
    email: 'nijin.vinodan@cdw.com',
    password:'Nijin@cdw'
}
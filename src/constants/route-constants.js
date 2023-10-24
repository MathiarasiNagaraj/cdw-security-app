export const SIDEBAR_ROUTES = [
    {
        name: 'DASHBOARD',
        url: (location) => `/${location}/`,
    },
    { name: 'RECORD TEMPERATURE',  url:(location)=> `/${location}/`},
    {name :'SWITCH OFFICE', url:(location)=> '/location'}
]

export const TOPBAR_ROUTE = (route) => {
    if (route === 'viewrecords') return 'TEMPERATURE RECORDS';
    if (route === 'Chennai'||'Bengaluru'||'Hyderabad') return 'RECORD TEMPERATURE';
        
    
}

export const SIDEBAR_FILTER = {
    title: 'Filter Records',
    fields: [
         {
            label: 'Select Date',
            type: 'date',
             styleName:'filter-input'
        }, {
            label: 'Filter By Co-worker',
            type:'text',
            styleName:'filter-input'
        }
    ],
    button: {
        name: 'APPLY FILTER',
        styleName:'secondary-btn'
    }
}
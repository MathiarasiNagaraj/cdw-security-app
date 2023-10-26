export const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };
  export const getCurrentTime = () => {
    const currentDate = new Date();
    const timeFormatOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // or false based on your preference
    };
    const formattedTime = currentDate.toLocaleTimeString(
      "en-US",
      timeFormatOptions
    );
    return formattedTime;
  };
  

  export const  formatDate=(inputDate:any)=> {
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };
    
    const formattedDate = new Date(inputDate).toLocaleDateString(undefined, dateFormatOptions);

    
    // Replace hyphens with spaces and update formattedDate
    const formattedDateWithSpaces = formattedDate.replace(/-/g, ' ');
   
    
    return formattedDateWithSpaces;
  }
  
  
  
  export   const convertTimeToSortableFormat=(time:any) =>{
    const [hours, minutes, amPm] = time.match(/(\d+):(\d+) ([APap][Mm])/)?.slice(1);
    let hh24 = parseInt(hours, 10);
  
    if (amPm.toLowerCase() === 'pm' && hh24 !== 12) {
      hh24 += 12;
    } else if (amPm.toLowerCase() === 'am' && hh24 === 12) {
      hh24 = 0;
    }
  
    return `${hh24.toString().padStart(2, '0')}:${minutes}`;
  }
  
  
  export function customAscendingSort(a:any, b:any) {
    const timeA = convertTimeToSortableFormat(a[3]);
    const timeB = convertTimeToSortableFormat(b[3]);

    return timeA.localeCompare(timeB);
  }
  export function customDescendingSort(a:any, b:any) {
    const timeA = convertTimeToSortableFormat(a[3]);
    const timeB = convertTimeToSortableFormat(b[3]);
    return timeB.localeCompare(timeA);
  }

  export function toTitleCase(input:string) {
    return input.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
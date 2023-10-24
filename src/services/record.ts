
let currentDateRecords: any[] = [];
export const getAllRecordsByBranch = async(branch:string) => {
    const response = await fetch(`/api/${branch}/ `, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
       
    });

    const recordStatus = await response.json();
  let data = recordStatus.data;
  data?.shift();
  data = data?.slice().reverse();
  return data;
    
}


export const getRecordByBranchAndDate = async (branch:string, date:string) => {
    const data: string[][] = await getAllRecordsByBranch(branch); 

const  filteredData = data?.filter((data) => data[data?.length - 1] === date);

  currentDateRecords = filteredData;
  return filteredData;
}
export const getRecordByBranchAndDateAndEmpID = async (branch:string, date:string, id:string) => {
  const data:string[][] =  await getAllRecordsByBranch(branch);
  let filteredData = [];

  filteredData = data?.filter((data) => (id ? data[data.length - 1] === date && data[0] === id : data[data.length - 1] === date));

  return filteredData;
}

export const isEmployeeIDPresentToday = (employeeId:string) => {

  const isPresent = currentDateRecords?.some((data) => data.includes(employeeId));
  return isPresent;
}
export const getCountByBranch = async(branch:string) => {
  const response = await getAllRecordsByBranch(branch);

  return response?.length+1;
}

export const addRecordForBranch = async (data:object) => {

    const response = await fetch(`/api/${data.branch}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
      body: JSON.stringify(data)
    })
  const responseStatus = response;

    return responseStatus.status;
}

export const editRecordForBranch = async (data:object) => {
    const response = await fetch(`/api/${data.branch}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })

    const responseStatus = response;
    return responseStatus.status;
}
export const deleteRecordForBranch = async (data:object) => {

    const response = await fetch(`/api/${data.branch}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })
    const responseStatus = response;
    return responseStatus.status;
}


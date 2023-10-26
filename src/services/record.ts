let currentDateRecords: any[] = [];

//function for getting all records based on branch
export const getAllRecordsByBranch = async (branch: string) => {
  const response = await fetch(`/api/${branch}/ `, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
// return record in reversed form and it will remove the label 
  const recordStatus = await response.json();
  let data = recordStatus.data;
  data?.shift();
  data = data?.slice().reverse();
  return data;
};

//function for getting all records based on branch and date
export const getRecordByBranchAndDate = async (
  branch: string,
  date: string
) => {
  const data: string[][] = await getAllRecordsByBranch(branch);
  const filteredData = data?.filter((data) => data[data?.length - 1] === date);
  currentDateRecords = filteredData;
  return filteredData;
};

//function for getting all records based on branch ,Co-worker ID and date 
export const getRecordByBranchAndDateAndEmpID = async (
  branch: string,
  date: string,
  id: string
) => {
  const data: string[][] = await getAllRecordsByBranch(branch);
  let filteredData = [];

  filteredData = data?.filter((data) =>
    id
      ? data[data.length - 1] === date && data[0] === id
      : data[data.length - 1] === date
  );

  return filteredData;
};

//function for checking if the employee is already exists
export const isEmployeeIDPresentToday = (employeeId: string) => {
  const isPresent = currentDateRecords?.some((data) =>
    data.includes(employeeId)
  );
  return isPresent;
};

export const getCountByBranch = async (branch: string) => {
  const response = await getAllRecordsByBranch(branch);
  return response?.length + 1;
};


//function adding record into provided branch
export const addRecordForBranch = async (data: any) => {
  const response = await fetch(`/api/${data.branch}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseStatus = response;

  return responseStatus.status;
};

//function editing record in provided branch
export const editRecordForBranch = async (data: any) => {
  const response = await fetch(`/api/${data.branch}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseStatus = response;
  return responseStatus.status;
};
//function deleting record from provided branch
export const deleteRecordForBranch = async (data: any) => {
  const response = await fetch(`/api/${data.branch}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseStatus = response;
  return responseStatus.status;
};

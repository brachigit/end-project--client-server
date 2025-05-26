import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import {useGetUsersQuery} from './UserApiSlice'
import { useEffect,useState } from 'react';
import { Button,Box} from '@mui/material';
import UserDialog from './UserDialog'



 



const columns = [

  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Name', headerName: 'Name', flex:1 },
  { field: 'Username', headerName: 'Username', flex:1 },
  { field: 'email', headerName: 'Email', flex:1 },
  { field: 'address', headerName: 'Address', flex:1},
  { field: 'phone', headerName: 'Phone', flex:1 },
  { field: 'role', headerName: 'Role', flex:1 },
  
    //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  
];

const paginationModel = { page: 0, pageSize: 5 };

const UserTable=()=>{
 
const [open, setOpen] = useState(false); 
const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

 
  const skip = paginationModel.page * paginationModel.pageSize;

const { data: userQuery, error, isLoading, isSuccess, isError } = useGetUsersQuery({ skip, limit: paginationModel.pageSize });


if (isLoading) return <div>load...</div>;
if (isError) {
    
    return <div>Eror in load users</div>;
  }
  

const rows=
    userQuery.data.map((val)=>(
        {id:val._id,Name:val.name,Username:val.username,email:val.email,address:val.address,phone:val.phone,role:val.roles}
    ))


    
   
    return(
      <>
   <Paper sx={{ height: 'calc(100vh - 100px)', width: '100%', overflowX: 'auto' }}>
     
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={userQuery.totalCount}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10]}
        paginationMode="server"
        
      />
      <UserDialog open={open} setOpen={setOpen}/>
      
    </Paper>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          הוסף מנהל חדש
        </Button>
      </Box>
     </>)
}
export default UserTable
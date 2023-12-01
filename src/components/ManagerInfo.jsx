import { Grid } from "@mui/material";
import { Label } from "./Label";
import { InputBox } from "./InputBox";

export const ManagerInfo = ( props ) => {
  const { rkey, array, func } = props;

  const modifyArray = (array, index, value) => {
    const newArray = [...array];
    newArray[index] = value;
    return newArray;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Label text={"Manager" + (rkey + 1) + " Email"} />
        <InputBox value={array[rkey].email} func={newEmail => func(
          modifyArray(array, rkey, { 
            email: newEmail,
            phone: array[rkey].phone
          })
        )} />
      </Grid>
      <Grid item xs={6}>
        <Label text={"Manager" + (rkey + 1) + " Phone"} />
        <InputBox value={array[rkey].phone} func={newPhone => func(
          modifyArray(array, rkey, { 
            email: array[rkey].email,
            phone: newPhone
          })
        )} />
      </Grid>
    </Grid>
  )
}
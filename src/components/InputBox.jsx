import { TextField } from "@mui/material";

export const InputBox = (props) => {
  const {value, func, multiline, password} = props;

  return (
    <>
      <TextField
        id="outlined-multiline-static"
        label=""
        placeholder="Write reviews or sugestions."
        multiline={multiline}
        rows={5}
        fullWidth
        defaultValue=""
        value={value}
        color="primary"
        onChange={ event => {
          func(event.target.value);
        }}
      />
    </>
  )
}
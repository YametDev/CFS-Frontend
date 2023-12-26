import { TextField } from "@mui/material";
import { useState } from "react";

export const InputBox = (props) => {
  const [error, setError] = useState(false);
  const { value, func, regexp, multiline, type, placeholder } = props;
  const filterValue = (str) => {
    if(regexp){
      setError(!regexp.test(str));
    }
  }

  return (
    <>
      <TextField
        sx={{
          "& .MuiInputLabel-root": {color: 'black'},
          "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: "black" },
          },
        }}
        label=""
        placeholder={placeholder}
        multiline={multiline}
        type={type}
        rows={5}
        required={true}
        error={error}
        fullWidth
        value={value}
        color="primary"
        onChange={(event) => {
          filterValue(event.target.value);
          func(event.target.value);
        }}
      />
    </>
  );
};

import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from "react";
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import { Input }  from '@mui/material';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000-000-0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="$"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const InputBoxPhone = (props) => {
  const [error, setError] = useState(false);
  const { value, func, regexp, multiline, type, placeholder } = props;
  const filterValue = (str) => {
    if(regexp){
      setError(!regexp.test(str));
    }
  }
  const [values, setValues] = React.useState({
    textmask: '',
    numberformat: '1320',
  });
  return (
    <>
      <Input  
        style={{
          border: '1px solid ',
          borderRadius: '5px',
          height: '3.5em',
          padding: '16.5px 14px'
        }}
        disableUnderline
        label=""
        name="textmask"
        placeholder={placeholder}
        multiline={multiline}
        type={type}
        rows={5}
        required={true}
        error={error}
        fullWidth
        value={values.textmask}
        color="primary"
        onChange={(event) => {
          filterValue(event.target.value);
          func(event.target.value);
          console.log(value)
          setValues({
            ...values,
            [event.target.name]: event.target.value,
          });
          console.log(values)
        }}
        inputComponent={TextMaskCustom}
      />
    </>
  );
};

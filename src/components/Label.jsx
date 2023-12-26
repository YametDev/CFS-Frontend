import { Typography } from "@mui/material"

export const Label = (props) => {
  const { text, lineHeight, fontWeight, fontSize } = props;

  return (
    <Typography
      component="h1"
      sx={{
        fontSize: fontSize||18,
        fontFamily: "Arial Light",
        fontWeight: fontWeight||800,
        mb: 2,
        letterSpacing: 1,
        mt: 3,
        lineHeight: lineHeight,
      }}
    >
      {text.split('\n').map((val, index) => <p key={index}>{val}</p>)}
    </Typography>
  )
}
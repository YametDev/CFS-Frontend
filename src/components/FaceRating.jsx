
import styled from "@emotion/styled";
import { Box, Rating } from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    fontSize: '40px'
  },
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
  '& .MuiRating-iconFilled .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
    borderRadius: "50%",
    backgroundColor: '#FFC000'
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
  },
  2: {
    icon: <SentimentSatisfiedIcon />,
  },
  3: {
    icon: <SentimentSatisfiedAltIcon />,
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{value !== null ? customIcons[value].icon : null}</span>;
}

export const FaceRating = (props) => {
  const { text, rkey, value, func } = props;
  
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          my: 1
        }}
      >
        <StyledRating
          value={value[rkey]}
          onChange={(event, newValue) => {
            func({
              ...value,
              [rkey]: newValue || 0
            });
          }}
          max={3}
          IconContainerComponent={IconContainer}
          highlightSelectedOnly
          size="large"
          style={{ fontSize: '40px' }}
        />
        <Box sx={{ ml: 2 }}> {text} </Box>
      </Box>
    </>
  )
}
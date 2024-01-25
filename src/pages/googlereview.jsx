import { Label, SubmitButton, BoxContainer } from "../components";
import GoogleSearch from "../assets/images/google.png";
export const GoogleReviewPage = (props) => {
  const { onSubmit, hasGoogle, button, logo } = props;

  const onClick = () => {
    window.open(
      hasGoogle
    );
    onSubmit();
  };

  return (
    <BoxContainer>
      <br />
      <div style={{textAlign: "center"}}>
        {(logo !== null && logo!==undefined && logo!=='') && <img src={logo} style={{width: '350px'}} alt="logo" />}
      </div>
      <br />
      {/* <br />
      <Label text="We appreciate your feedback and 5-star rating! Our team aims to make our customers happy. Thank you. 🙂" /> */}
      <br />
      {hasGoogle && (
        <>
          <Label text="Please leave a comment on Google, tell everyone what you liked.👇" />
          <SubmitButton onClick={onClick} color={button}>
            
            <img src={GoogleSearch} style={{ height: "25px"}} alt="Logo" />
            &nbsp;&nbsp;Review on Google
          </SubmitButton>
        </>
      )}
    </BoxContainer>
  );
};

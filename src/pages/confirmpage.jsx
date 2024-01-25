import {
  Label,
  BoxContainer,
} from "../components";

export const ConfirmPage = ( props ) => {
  const { logo } = props;
  return (
    <BoxContainer>
      <br />
      <div style={{textAlign: "center"}}>
        {(logo !== null && logo!==undefined && logo!=='') && <img src={logo} style={{width: '350px'}} alt="logo" />}
      </div>
      <br />
      <br />
      <Label text="We appreciate your feedback! 🙂" />
    </BoxContainer>
  );
};
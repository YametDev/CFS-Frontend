
import { detailReviewKey } from "../constants";
import {
  Label,
  FaceRating,
  SubmitButton,
  InputBox,
  BoxContainer,
} from "../components";

export const ReviewPage = ( props ) => {
  const { rating, setRating, review, setReview, onSubmit, button, logo} = props;

  const onClick = () => {
    if(
      rating.cleanliness &&
      rating.friendliness &&
      rating.price &&
      rating.quality &&
      rating.wait
    ) {
      onSubmit();
    } else {
      alert("Please rate the services.");
    }
  }

  return (
    <BoxContainer>
      <br />
      {(logo !== null && logo!==undefined && logo!=='') && <img src={logo} style={{width: '350px'}} alt="logo" />}
      <br />
      <br />
      <Label text="How was our service?" lineHeight={0} />
      <Label text="(Pick a reaction for each)" lineHeight={0} fontSize={15} fontWeight={500} />
      
      { detailReviewKey.map(val => 
        <FaceRating
          text={val.text}
          rkey={val.rkey}
          value={rating}
          func={setRating}
        />
      )}

      <Label text="What can we improve?" />
      <InputBox value={review} func={setReview} multiline placeholder="Additional comments or suggestions"/>

      <SubmitButton onClick={onClick} color={button} >
        Submit
      </SubmitButton>
    </BoxContainer>
  );
};
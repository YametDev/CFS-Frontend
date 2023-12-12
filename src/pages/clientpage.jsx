import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { detailReviewRating } from "../constants";
import { modify, send } from "../redux/actions";
import {
  Homepage,
  GoogleReviewPage,
  ReviewPage,
  InfoPage,
  ConfirmPage,
} from "./";
import { PageContainer, PageBox } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { exists } from "../redux/actions/user";

export const ClientPage = () => {
  const navigate = useNavigate();

  const params = useParams();
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();

  const [exist, setExist] = useState(0);
  const [google, setGoogle] = useState("");
  const [button, setButton] = useState("");
  const [logo, setLogo] = useState("");
  const [star, setStar] = useState("");

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const [drating, setDRating] = useState(detailReviewRating);
  const [dreview, setDReview] = useState("");

  const [infoID, setInfoID] = useState("");
  const [sign, setSign] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmitReview = () => {
    send(
      {
        company: params.id,
        rating: rating,
        review: review,
        review_score: drating,
        review_text: dreview,
      },
      (id) => {
        setInfoID(id);
        dispatch({ type: "Status", payload: 3 });
      }
    );
  };

  const onSubmitConfirm = () => {
    dispatch({
      type: "Status",
      payload: 0,
    });
  };

  const onSubmitInfo = () => {
    modify(
      {
        id: infoID,
        name: sign,
        email: email,
        phone: phone,
      },
      () => {
        dispatch({ type: "Status", payload: 4 });
      }
    );
  };

  useEffect(() => {
    console.log(status);
  }, [status]);

  useEffect(() => {
    exists(
      params.id,
      (result) => {
        setGoogle(result.google);
        setLogo(result.logo);
        setStar(result.star);
        setButton(result.button);
      },
      (result) => setExist(result + 1)
    );
  }, [params.id]);

  useEffect(() => {
    // console.log("EXIST", exist);
    if (exist === 1) navigate("/" + params.id + "/admin");
  }, [exist, navigate, params.id]);

  return (
    <PageContainer>
      <PageBox>
        {status === 0 && exist === 2 && (
          <Homepage
            rating={rating}
            setRating={setRating}
            review={review}
            setReview={setReview}
            logo={logo}
            star={star}
            button={button}
          />
        )}
        {status === 1 && exist === 2 && (
          <GoogleReviewPage
            hasGoogle={google}
            button={button}
            logo={logo}
            onSubmit={onSubmitReview}
          />
        )}
        {status === 2 && exist === 2 && (
          <ReviewPage
            logo={logo}
            rating={drating}
            setRating={setDRating}
            review={dreview}
            setReview={setDReview}
            onSubmit={onSubmitReview}
            button={button}
          />
        )}
        {status === 3 && exist === 2 && (
          <InfoPage
            logo={logo}
            name={sign}
            setName={setSign}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            onSubmit={onSubmitInfo}
            button={button}
          />
        )}
        {status === 4 && exist === 2 && (
          <ConfirmPage onSubmit={onSubmitConfirm} logo={logo} />
        )}
      </PageBox>
    </PageContainer>
  );
};

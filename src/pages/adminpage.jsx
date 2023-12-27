import { Container } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { receive, receiveDetailReview, receiveRecent } from "../redux/actions";
import "./../App.css";
import { sampleManagerInfo, series, title } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import { exists } from "../redux/actions/user";
import {
  BoxContainer,
  InputBox,
  PageContainer,
  SubmitButton,
} from "../components";

const valueFormatter = (value) => `${value === null ? "0" : value.toFixed(1)}%`;

export const AdminPage = () => {
  const chartSetting = {
    width: 350,
    height: 270,
  };

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isPaid = true; /*useSelector(state => state.company.isPaid);*/
  // const company = useSelector(state => state.company);
  const review_normal = useSelector((state) => state.review);
  const review_detail = useSelector((state) => state.reviewdetail);
  const recent = useSelector((state) => state.reviewrecent);
  const locked = useSelector((state) => state.login);
  const [loaded, setLoaded] = useState(false);
  const [detail, setDetail] = useState(series);
  const [average, setAverage] = useState(0);
  const [logo, setLogo] = useState("");
  const [googleCount, setGoogleCount] = useState(0);
  const [button, setButton] = useState("");
  const [password, setPassword] = useState("");
  const [managers, setManagers] = useState(sampleManagerInfo);

  const handleUnlock = () => {
    document.cookie = `lfologin=${password};path=/`;
    if(!unlockWithPassword(password, managers)){
      alert('Wrong password !');
    }
  };

  const unlockWithPassword = (password, managers) => {
    if (password === "Leavefeedback2024$") {
      dispatch({ type: "Login", payload: true });
      return true;
    } else {
      const res = managers.some((manager) => manager.email === password);
      if (res) {
        dispatch({ type: "Login", payload: true });
        return true;
      } else return false;
    }
  };

  useEffect(() => {
    const shape = document.getElementsByTagName("svg")[1];
    shape?.setAttribute("viewBox", "-70 0 350 270");
  })

  useEffect(() => {
    dispatch(receive(params.id));
    dispatch(receiveDetailReview(params.id));
    dispatch(receiveRecent(params.id, 0x7fff));
    exists(
      params.id,
      (result) => {
        setLogo(result.logo);
        setButton(result.button);
        setManagers(result.managers);
        let cookie = decodeURIComponent(document.cookie).split(';').find(c => c.trim().startsWith('lfologin='));
        if(cookie !== null && cookie !== undefined && cookie !== '') unlockWithPassword(cookie.slice(9), result.managers);
      },
      (result) => {
        if (result) setLoaded(true);
        else navigate(`/${params.id}/admin`);
      }
    );
  }, [dispatch, params.id, navigate]);

  useEffect(() => {
    setDetail(
      review_detail.map((val) => ({
        ...val,
        valueFormatter,
      }))
    );
  }, [review_detail]);

  // useEffect(() => {
  //   if(company !== params.id){
  //     const id = params.id;
  //     navigate(`/admin?id=${id}`);
  //   }
  // })

  useEffect(() => {
    var sum = 0.0;
    review_normal.forEach((val, index) => {
      const plus = (val.percentage * (5 - index)) / 100;
      if (!index) setGoogleCount(val.percentage);
      sum = sum + plus;
    });
    setAverage(sum.toFixed(1));
  }, [review_normal]);

  return (
    <>
      {loaded &&
        (locked ? (
          <Container
            maxWidth={false}
            sx={{
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "18px",
                justifyContent: "end",
                padding: "20px",
                color: "black",
                textDecoration: "none",
              }}
            >
              <a
                style={{textDecoration: "none" }}
                href={`/${params.id}/dashboard`}
              >
                <b>
                  <u>Dashboard</u>
                </b>
              </a>
              <span> / </span>
              <a style={{textDecoration: "none" }} href={`/${params.id}/admin`}>
                Admin
              </a>
              <span> / </span>
              <a
                style={{textDecoration: "none" }}
                href={`/${params.id}/payments`}
              >
                Payment
              </a>
            </div>
            {logo !== null && logo !== undefined && logo !== "" && (
              <img src={logo} style={{ width: "350px" }} alt="logo" />
            )}
            <h1>Feedback Dashboard</h1>
            <h2>Results Summary:</h2>
            <p>Total Reviews: {recent.length}</p>
            <p>Google Review Clicks: {(googleCount * recent.length) / 100}</p>
            <p>Average ⭐ Stars:&nbsp;{average}</p>
            <BarChart
              dataset={review_normal}
              yAxis={[
                {
                  scaleType: "band",
                  dataKey: "level",
                },
              ]}
              series={[
                {
                  dataKey: "percentage",
                  label: "⭐",
                  color: "#D9D9D9",
                  valueFormatter,
                },
              ]}
              xAxis={[
                {
                  label: "Percentage (%)",
                  min: 0,
                  max: 100,
                },
              ]}
              layout="horizontal"
              {...chartSetting}
            />
            <br />
            <h2>Reactions to Services:</h2>
            <div style={{ marginRight: `calc(100vw)`, minWidth: 500 }}>
              <BarChart
                width={350}
                height={270}
                series={detail}
                yAxis={[
                  {
                    scaleType: "band",
                    data: title,
                  },
                ]}
                xAxis={[
                  {
                    label: "Percentage (%)",
                    min: 0,
                    max: 100,
                  },
                ]}
                layout="horizontal"
                // {...chartSetting}
              ></BarChart>
            </div>

            <br />
            <h2>Table of Comments:</h2>
            <div>
              <table className="cfstable">
                <thead className="cfsrow">
                  <tr>
                    <td className="cfscell">Stars</td>
                    <td className="cfscell">Comments</td>
                    <td className="cfscell">Time</td>
                    <td className="cfscell">Date</td>
                    <td className="cfscell">Contact Info</td>
                  </tr>
                </thead>
                <tbody>
                  {recent.reverse().map((val, index) => (
                    <tr key={index} className="cfsrow">
                      <td className="cfscell">{val.rating}</td>
                      <td className="cfscell">
                        {val.review} <br /> {val.review_text}
                      </td>
                      <td className="cfscell">{val.createdAt.time}</td>
                      <td className="cfscell">{val.createdAt.date}</td>
                      {isPaid ? (
                        <td className="cfscell">
                          {val.name} <br /> {val.email} <br /> {val.phone}
                        </td>
                      ) : (
                        <td className="cfscell" style={{ fontWeight: "bold" }}>
                          "Upgrade Plan to Turn On"
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        ) : (
          <PageContainer>
            <BoxContainer>
              <InputBox type="password" value={password} func={setPassword} />
              <SubmitButton color={button} onClick={handleUnlock}>
                Unlock
              </SubmitButton>
            </BoxContainer>
          </PageContainer>
        ))}
    </>
  );
};

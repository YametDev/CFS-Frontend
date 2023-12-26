import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { exists } from "../redux/actions/user";
import {
  Label,
  BoxContainer,
  SubmitButton,
  InputBox,
  PageContainer,
} from "../components";
import ColorPicker from "mui-color-picker";
import { companyDetail } from "../redux/actions";
import { ManagerInfo } from "../components/ManagerInfo";
import { sampleManagerInfo } from "../constants";
import { Alert, Checkbox, Grid, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export const UploadPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const locked = useSelector((state) => state.login);
  const [loaded, setLoaded] = useState(false);
  const [logo, setLogo] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState("");

  const [star, setStar] = useState("#1677ff");
  const [button, setButton] = useState("#1677ff");
  const [managers, setManagers] = useState(sampleManagerInfo);
  const [googleId, setGoogleId] = useState("");
  const [emailAlert, setEmailAlert] = useState(false);
  const [smsAlert, setSmsAlert] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUnlock = () => {
    document.cookie = `lfologin=${password};`;
    unlockWithPassword(password);
  };

  const unlockWithPassword = password => {
    if (password === "Leavefeedback2024$") {
      dispatch({ type: "Login", payload: true });
    } else {
      const res = managers.some((manager) => manager.email === password);
      if (res) dispatch({ type: "Login", payload: true });
      else alert("Wrong password !");
    }
  }

  const onSubmitUpload = () => {
    companyDetail(
      {
        company: params.id,
        display: display,
        star: star,
        button: button,
        manager: managers,
        googleId:
          "http://search.google.com/local/writereview?placeid=" + googleId,
        logo: logo,
        alertSMS: smsAlert,
        alertEmail: emailAlert,
      },
      (newState) => setUploadStatus(newState + 1)
    );
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setLogo(reader.result);
    };
  };

  const handleSetEmailAlert = (event) => {
    setEmailAlert(event.target.checked);
  };

  const handleSetSmsAlert = (event) => {
    setSmsAlert(event.target.checked);
  };

  useEffect(() => {
    if (uploadStatus) {
      setOpen(true);
      setTimeout(setUploadStatus, 3500, 0);
    }
  }, [uploadStatus]);

  useEffect(() => {
    exists(
      params.id,
      (result) => {
        setLogo(result.logo);
        setStar(result.star);
        setButton(result.button);
        setGoogleId(result.google.split("=")[1]);
        setManagers(result.managers);
        setEmailAlert(result.alertEmail);
        setSmsAlert(result.alertSMS);
        setDisplay(result.display);
        let cookie = decodeURIComponent(document.cookie).split(';').find(c => c.trim().startsWith('lfologin='));
        if(cookie !== null && cookie !== undefined && cookie !== '') unlockWithPassword(cookie.slice(9));
      },
      () => setLoaded(true)
    );
  }, [params.id]);

  return (
    <PageContainer>
      {loaded && (
        <BoxContainer>
          {locked ? (
            <>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "18px",
                  justifyContent: "end",
                  padding: "20px",
                }}
              >
                <a
                  style={{ textDecoration: "none" }}
                  href={`/${params.id}/dashboard`}
                >
                  Dashboard
                </a>
                <span> / </span>
                <a
                  style={{ textDecoration: "none" }}
                  href={`/${params.id}/admin`}
                >
                  <b>
                    <u>Admin</u>
                  </b>
                </a>
                <span> / </span>
                <a
                  style={{ textDecoration: "none" }}
                  href={`/${params.id}/payments`}
                >
                  Payment
                </a>
              </div>
              {logo !== undefined && logo !== null && logo !== "" ? (
                <img
                  src={logo}
                  style={{ width: "350px" }}
                  alt="Please upload company logo."
                />
              ) : (
                <Label text="Please upload company logo." />
              )}
              <br />
              <br />
              <div>
                <button onClick={() => document.getElementById('getFile').click()}>Choose Logo Picture</button>
                <input type='file' id="getFile" style={{display:'none'}} accept="image/*" onChange={handleImageUpload}/>
              </div>
              {(logo === undefined || logo === null || logo === "") && ' No image has selected'}

              <Label text="Company Name" />
              <InputBox value={display} func={setDisplay} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Label text="Star Color" />
                  <ColorPicker
                    id="starColorPicker"
                    value={star}
                    onChange={setStar}
                    label={star}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Label text="Button Color" />
                  <ColorPicker
                    id="buttonColorPicker"
                    value={button}
                    onChange={(color) => setButton(color)}
                    label={button}
                    fullWidth
                  />
                </Grid>
              </Grid>

              {managers.map((manager, index) => (
                <ManagerInfo
                  key={index}
                  rkey={index}
                  array={managers}
                  func={setManagers}
                />
              ))}
              <Label text="Google review placeID" />
              <InputBox value={googleId} func={setGoogleId} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Checkbox
                    checked={emailAlert}
                    onChange={handleSetEmailAlert}
                  />
                  Send Email
                </Grid>
                <Grid item xs={6}>
                  <Checkbox checked={smsAlert} onChange={handleSetSmsAlert} />
                  Send SMS
                </Grid>
              </Grid>
              <SubmitButton color={button} onClick={onSubmitUpload}>
                Save Changes
              </SubmitButton>
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity={uploadStatus === 2 ? "success" : "error"}
                  sx={{ width: "100%" }}
                >
                  {uploadStatus === 1
                    ? "Failed to save."
                    : "Successfully saved!"}
                </Alert>
              </Snackbar>
            </>
          ) : (
            <>
              <InputBox type="password" value={password} func={setPassword} />
              <SubmitButton color={button} onClick={handleUnlock}>
                Unlock
              </SubmitButton>
            </>
          )}
        </BoxContainer>
      )}
    </PageContainer>
  );
};

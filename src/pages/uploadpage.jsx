import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { exists } from "../redux/actions/user";
import { Label, BoxContainer, SubmitButton, InputBox, PageContainer } from '../components';
import ColorPicker from 'mui-color-picker'
import { companyDetail } from "../redux/actions";
import { ManagerInfo } from "../components/ManagerInfo";
import { sampleManagerInfo } from "../constants";
import { Checkbox, Grid } from "@mui/material";

export const UploadPage = () => {
  const params = useParams();

  const [logo, setLogo] = useState('');
  const [lock, setLock] = useState(false);
  const [password, setPassword] = useState('');
  const [loaded, setLoaded] = useState(false);
  
  const [star, setStar] = useState('#1677ff');
  const [button, setButton] = useState('#1677ff');
  const [managers, setManagers] = useState(sampleManagerInfo);
  const [goolgeId, setGoogleId] = useState('');
  const [emailAlert, setEmailAlert] = useState(false);
  const [smsAlert, setSmsAlert] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(0);

  const handleUnlock = () => {
    if(password === "Leavefeedback2024$") {
      setLock(true);
    } else {
      alert("Wrong password !");
    }
  }

  const onSubmitUpload = () => {
    companyDetail(
      {
        company: params.id,
        star: star,
        button: button,
        manager: managers,
        googleId: 'http://search.google.com/local/writereview?placeid=' + goolgeId,
        logo: logo,
        alertSMS: smsAlert,
        alertEmail: emailAlert
      },
      newState => setUploadStatus(newState + 1)
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

  const handleSetEmailAlert = event => {
    setEmailAlert(event.target.checked);
  }

  const handleSetSmsAlert = event => {
    setSmsAlert(event.target.checked);
  }

  useEffect(() => {
    if(uploadStatus) setTimeout(setUploadStatus, 3000, 0);
  }, [uploadStatus]);

  useEffect(() => {
    exists(
      params.id,
      (result) => {
        setLogo(result.logo);
        setStar(result.star);
        setButton(result.button);
        setGoogleId(result.google.split('=')[1]);
        setManagers(result.managers);
        setEmailAlert(result.alertEmail);
        setSmsAlert(result.alertSMS);
      },
      () => setLoaded(true)
    );
  }, [params.id]);

  return (
    <PageContainer>
      { loaded && 
        <BoxContainer>
          { lock
              ? <>
              <br />
              {logo !== undefined && <img src={logo} style={{width: '350px'}} alt="Please upload company logo." />}
              <br />
              <br />
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              
              <Label text="Star Color" />
              <ColorPicker
                id="starColorPicker"
                value={star}
                onChange={setStar}
                label={star}
              />
              <Label text="Button Color" />
              <ColorPicker
                id="buttonColorPicker"
                value={button}
                onChange={color => setButton(color)}
                label={button}
              />
              { managers.map( ( manager, index) =>
                <ManagerInfo key={index} rkey={index} array={managers} func={setManagers} />
              )}
              <Label text="Google review placeID" />
              <InputBox value={goolgeId} func={setGoogleId} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Checkbox checked={emailAlert} onChange={handleSetEmailAlert}/>Send Email
                </Grid>
                <Grid item xs={6}>
                  <Checkbox checked={smsAlert} onChange={handleSetSmsAlert}/>Send SMS
                </Grid>
              </Grid>
              <SubmitButton color={button} onClick={onSubmitUpload}>
                Change
              </SubmitButton>
              {uploadStatus===1 && <p>Failed to save.</p>}
              {uploadStatus===2 && <p>Successfully saved!</p>}
            </>
            : <>
              <InputBox type="password" value={password} func={setPassword} />
              <SubmitButton color={button} onClick={handleUnlock}>
                Unlock
              </SubmitButton>
            </>
          }
        </BoxContainer>
      }
    </PageContainer>
  );
};
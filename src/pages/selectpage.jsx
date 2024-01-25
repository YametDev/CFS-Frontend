import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { exists } from "../redux/actions";
import { BoxContainer, PageBox, PageContainer, SubmitButton } from "../components";

export const SelectPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [logo, setLogo] = useState('');
  const [button, setButton] = useState('');
  const buttons = [
    {url: "/", title: "Leave Feedback"},
    {url: "/menu", title: "See Menu"},
    {url: "/deals", title: "Get Deals"},
    {url: "/games", title: "Play Games"},
    {url: "/jobs", title: "We're Hiring!"},
  ];

  useEffect(() => {
    exists(params.id, data => {
      setLogo(data.logo);
      setButton(data.button);
    })
  }, [params.id])
  return (
    <PageContainer>
      <PageBox>
        <BoxContainer>
          <div style={{textAlign: "center"}}>
            {(logo !== null && logo!==undefined && logo!=='') && <img src={logo} style={{width: '350px'}} alt="logo" />}
          </div>
          {buttons.map(btn => 
            <SubmitButton color={button} onClick={() => navigate(`/${params.id}${btn.url}`)} >
              {btn.title}
            </SubmitButton>
          )}
        </BoxContainer>
      </PageBox>
    </PageContainer>
  )
}
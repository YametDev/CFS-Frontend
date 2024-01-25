import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { exists } from "../redux/actions";
import { BoxContainer, PageBox, PageContainer } from "../components";

export const JobPage = () => {
  const params = useParams();
  const [logo, setLogo] = useState('');

  useEffect(() => {
    exists(params.id, data => {
      setLogo(data.logo);
    })
  }, [params.id])
  return (
    <PageContainer>
      <PageBox>
        <BoxContainer>
          <div style={{textAlign: "center"}}>
            {(logo !== null && logo!==undefined && logo!=='') && <img src={logo} style={{width: '350px'}} alt="logo" />}
          </div>
        </BoxContainer>
      </PageBox>
    </PageContainer>
  )
}
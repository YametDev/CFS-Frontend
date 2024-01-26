import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { exists } from "../redux/actions";
import { BoxContainer, PageBox, PageContainer, SubmitButton } from "../components";

const defaultMenu = {url: "/", title: "Leave Feedback"};

export const EditPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [logo, setLogo] = useState('');
  const [button, setButton] = useState('');
  const [menu, setMenu] = useState([]);
  const [exist, setExist] = useState(0);

  useEffect(() => {
    console.log(window.location);
    exists(params.id, data => {
      setLogo(data.logo);
      setButton(data.button);
      setMenu([defaultMenu, ...data.menu]);
      
    }, status => setExist(status + 1));
  }, [params.id])

  const handleNavigate = index => {
    const preUrl = (menu[index].url.startsWith('/') ? `/${params.id}` : "");
    navigate(preUrl + menu[index].url);
  }

  return (
    <PageContainer>
      <PageBox>
        {(exist === 2) && 
          <BoxContainer>
            <div style={{textAlign: "center"}}>
              {(logo !== null && logo!==undefined && logo!=='') && <img src={logo} style={{width: '350px'}} alt="logo" />}
            </div>
            {menu.map((btn, index) => 
              <SubmitButton key={index} color={button} onClick={() => handleNavigate(index)} >
                {btn.title}
              </SubmitButton>
            )}
          </BoxContainer>
        }
      </PageBox>
    </PageContainer>
  )
}
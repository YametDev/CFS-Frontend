import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { companyDetail, exists } from "../redux/actions";
import {
  BoxContainer,
  InputBox,
  PageBox,
  PageContainer,
  SubmitButton,
} from "../components";
import { Checkbox } from "@mui/material";

const defaultMenu = { visible: true, url: "/", title: "Leave Feedback" };

export const SelectPage = () => {
  const params = useParams();
  const [logo, setLogo] = useState("");
  const [button, setButton] = useState("");
  const [menu, setMenu] = useState([]);
  const [exist, setExist] = useState(0);
  const [legal, setLegal] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    exists(
      params.id,
      (data) => {
        setLogo(data.logo);
        setButton(data.button);
        setMenu([defaultMenu, ...data.menu]);

        let cookie = decodeURIComponent(document.cookie)
          .split(";")
          .find((c) => c.trim().startsWith("lfologin="));
        if (cookie !== null && cookie !== undefined && cookie !== "") {
          cookie = cookie.trim().slice(9);
          if (cookie === "Leavefeedback2024$") setLegal(true);
          else
            setLegal(data.managers.some((manager) => manager.email === cookie));
        }
      },
      (status) => setExist(status + 1)
    );
  }, [params.id]);

  const getExactPath = (path) => {
    const preUrl = path.startsWith("/") ? `/${params.id}` : "";
    return preUrl + path;
  };

  const handleEdit = () => {
    if (editing) {
      companyDetail({ company: params.id, menu: menu.slice(1) }, () => {});
    }
    setEditing(!editing);
  };

  const handleChange = (index, key, value) => {
    if (index === 0) return;
    const newMenu = [...menu];
    newMenu[index] = {
      ...newMenu[index],
      [key]: value,
    };
    setMenu(newMenu);
  };

  return (
    <PageContainer>
      <PageBox>
        {exist === 2 && (
          <BoxContainer>
            <div style={{ textAlign: "center" }}>
              {logo !== null && logo !== undefined && logo !== "" && (
                <img src={logo} style={{ width: "350px" }} alt="logo" />
              )}
              {legal && (
                <p>
                  <u onClick={handleEdit} style={{ cursor: "pointer" }}>
                    {editing ? "Save changes" : "Edit Page"}
                  </u>
                </p>
              )}
            </div>
            {menu.map((btn, index) => (
              <>
                {(btn.visible || editing) && (
                  <Link to={getExactPath(btn.url)}>
                    <SubmitButton key={index} color={button}>
                      {btn.title}
                    </SubmitButton>
                  </Link>
                )}
                {editing && (
                  <>
                    <InputBox
                      value={btn.title}
                      func={(str) => handleChange(index, "title", str)}
                    ></InputBox>
                    <InputBox
                      value={btn.url}
                      func={(str) => handleChange(index, "url", str)}
                    ></InputBox>
                    <Checkbox
                      checked={btn.visible}
                      onChange={(e) =>
                        handleChange(index, "visible", e.target.checked)
                      }
                    />
                  </>
                )}
              </>
            ))}
          </BoxContainer>
        )}
      </PageBox>
    </PageContainer>
  );
};

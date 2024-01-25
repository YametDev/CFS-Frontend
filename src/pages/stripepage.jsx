import { useParams } from "react-router-dom";
import {
  BoxContainer,
  PageContainer,
} from "../components";

export const StripePage = () => {
  const params = useParams();

  return (
    <PageContainer>
      <BoxContainer>
        {params.id && (
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
              style={{ textDecoration: "none" }}
              href={`/${params.id}/dashboard`}
            >
              Dashboard
            </a>
            <span> / </span>
            <a style={{ textDecoration: "none" }} href={`/${params.id}/admin`}>
              Admin
            </a>
            <span> / </span>
            <a
              style={{ textDecoration: "none" }}
              href={`/${params.id}/payments`}
            >
              <b>
                <u>Payment</u>
              </b>
            </a>
          </div>
        )}
        <p style={{ textAlign: "center" }}>
          Manage your account subscription on the payment portal, powered by{" "}
          <b>stripe</b>
        </p>
        <p style={{ textAlign: "center" }}>
          <a href="https://billing.stripe.com/p/login/bIY7vA6ucggL15m4gg">
            <u>https://billing.stripe.com/p/login/bIY7vA6ucggL15m4gg</u>
          </a>
        </p>
      </BoxContainer>
    </PageContainer>
  );
};

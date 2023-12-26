// import { productPlans } from "../constants";
// import { useState } from "react";
// import { Alert, Grid, Snackbar } from "@mui/material";
// import { subscribe } from "../redux/actions";
// import StripeCheckout from "react-stripe-checkout";

import { useParams } from "react-router-dom";
import {
  BoxContainer,
  // CurrencySymbol,
  // SubscriptionPlansWrapper,
  // SubscriptionPlanCard,
  // SubscriptionPlanCardHeading,
  // SubscriptionPlanCardPrice,
  // SubscriptionPlanCardSubHeading,
  // SubmitButton,
  PageContainer,
} from "../components";

// const STRIPE_PUBLISHABLE_KEY =
//   "pk_test_51OApasEAnKVKf2tCD5SJjYYnzS1qlGqmRa9RqMcnxYWGMKUvZhoc2iYLZ0cTJQkMiRBp9GCa3o5xghrJCypBmZiM00DV9HPkja";

export const StripePage = () => {
  // const [error, showError] = useState("");
  // const [message, showMessage] = useState("");

  // const subscribeToProductPlan = (token, productPlan) => {
  //   const params = {
  //     stripeToken: token.id,
  //     email: token.email,
  //     productPlan,
  //   };

  //   subscribe(params, (data) => {
  //     if (data.result) {
  //       showMessage("Subscription successful");
  //       console.log(data.data);
  //     } else {
  //       showError("Subscription failed");
  //       console.log(data.data);
  //     }
  //   });
  // };
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

        {/* <SubscriptionPlansWrapper>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {productPlans.map((product, i) => (
              <Grid item xs={12} md={4} lg={4} key={i}>
                <SubscriptionPlanCard>
                  <SubscriptionPlanCardHeading>
                    {product.name}
                  </SubscriptionPlanCardHeading>

                  <SubscriptionPlanCardPrice>
                    <CurrencySymbol>$</CurrencySymbol>&nbsp;{product.price}
                  </SubscriptionPlanCardPrice>

                  <SubscriptionPlanCardSubHeading>
                    billed monthly
                  </SubscriptionPlanCardSubHeading>

                  <SubscriptionPlanCardSubHeading>
                    {product.description}
                  </SubscriptionPlanCardSubHeading>
                  <br />
                  <br />
                  <StripeCheckout
                    name="Feedback Capture"
                    token={(token) => subscribeToProductPlan(token, product.id)}
                    panelLabel="Subscribe"
                    stripeKey={STRIPE_PUBLISHABLE_KEY}
                  >
                    <SubmitButton>Submit</SubmitButton>
                  </StripeCheckout>
                </SubscriptionPlanCard>
              </Grid>
            ))}
          </Grid>

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={error !== ""}
            onClose={() => showError('')}
            message={error}
            key="error"
          >
            <Alert onClose={() => showError('')} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={message !== ""}
            onClose={() => showMessage('')}
            message={message}
            key="message"
          >
            <Alert onClose={() => showMessage('')} severity="success" sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </SubscriptionPlansWrapper> */}
      </BoxContainer>
    </PageContainer>
  );
};

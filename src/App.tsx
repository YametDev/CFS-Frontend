import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/reducers";
import { AdminPage, UploadPage, ClientPage, RegisterPage, LandingPage, StripePage } from "./pages";
import { Footer } from "./components";

const theme = createTheme({

});

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/:id/dashboard/" element={<AdminPage />} />
              <Route path="/:id/admin/" element={<UploadPage />} />
              <Route path="/:id/" element={<ClientPage />} />
              <Route path="/admin" element={<RegisterPage />} />
              <Route path="/payments" element={<StripePage />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>

      <Footer />
    </>
  );
}

export default App;

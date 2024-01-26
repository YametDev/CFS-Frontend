import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/reducers";
import { AdminPage, UploadPage, ClientPage, RegisterPage, LandingPage, StripePage, SelectPage, MenuPage, JobPage, DealPage, GamePage, EditPage } from "./pages";
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
              <Route path="/admin" element={<RegisterPage />} />
              <Route path="/payments" element={<StripePage />} />
              <Route path="/:id/" element={<ClientPage />} />
              <Route path="/:id/dashboard/" element={<AdminPage />} />
              <Route path="/:id/admin/" element={<UploadPage />} />
              <Route path="/:id/payments" element={<StripePage />} />
              <Route path="/:id/select" element={<SelectPage />} />
              <Route path="/:id/edit" element={<EditPage />} />
              <Route path="/:id/menu" element={<MenuPage />} />
              <Route path="/:id/deals" element={<DealPage />} />
              <Route path="/:id/games" element={<GamePage />} />
              <Route path="/:id/jobs" element={<JobPage />} />
              {/* <Route path="/:id/select" element={<MenuPage />} />
              <Route path="/:id/select" element={<DealsPage />} />
              <Route path="/:id/select" element={<GamesPage />} />
              <Route path="/:id/select" element={<JobsPage />} /> */}
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>

      <Footer />
    </>
  );
}

export default App;

import React from "react";
import {
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Loading from "./common/Loading";
import { AuthProvider } from "./module/AuthContext";

const LoginPage = React.lazy(() =>
  import(
    /* webpackChunkName: "LoginPage", webpackPrefetch: true */ "./module/LoginPage"
  )
);

const RegisterPage = React.lazy(() =>
  import(
    /* webpackChunkName: "RegisterPage", webpackPrefetch: true */ "./module/RegisterPage"
  )
);

const Apps = React.lazy(() =>
  import(
    /* webpackChunkName: "AppsPage", webpackPrefetch: true */ "./pages/Home"
  )
);

function App() {
  return (
    <AuthProvider>
        <React.Suspense fallback={<Loading />}>
            <Routes>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route
                path="/*"
                element={<Apps />}
              />
              <Route
                path="/"
                element={<Navigate to="/login" />}
              />
            </Routes>
        </React.Suspense>
    </AuthProvider>
  );
}

export default App;

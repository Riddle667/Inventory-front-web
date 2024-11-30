import { BrowserRouter as Router, Route, Navigate} from 'react-router-dom';
import { Login, Private, Register } from './pages';
import { PrivateRoutes } from './models';
import { RouteWithNotFound } from './utilities';
import { PublicRoutes } from './models';
import AuthGuard from './guard/Auth.guard';
import { useThemeContext} from './context/themes/themesContext';
import { themes } from './context';

function App() {
  const { theme } = useThemeContext();

  return (
    <>
      <div style={{ background: themes[theme].background.general }}>
        <Router>
        <RouteWithNotFound>
          <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} /> } />
          <Route path={PublicRoutes.LOGIN} element={<Login email={''} password={''} />} />
          <Route path={PublicRoutes.REGISTER} element={<Register />} />
          <Route element={<AuthGuard privateValidation={true}/>} >
            <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
          </Route>
        </ RouteWithNotFound>
      </Router>
      </div>
    </>
  )
}

export default App

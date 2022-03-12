import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Dashboard, Login } from 'pages';

// workaround for routing when deploying to gh pages
const isLocalDevelopment = NODE_ENV === 'development';
export const BASE_ROUTE = isLocalDevelopment ? '' : '/atlas';

// note to self:
// npm run deploy

// TODO: THEME... STEAL FROM DAISYUI AND PLUG INTO CHAKRA
// TODO: AUTHENTICATION
// TODO: ROUTE TO LOGGED_OUT V LOGGED_IN
// TODO: 1-LAYOUT
// TODO: SIDEBAR OF CATEGORIES
// TODO: SEARCH BAR
// TODO: NOTES CANVAS
// TODO: CRUD ACTIONS W/ BE SUPPORT
// TODO: REACT-QUERY ONCE BE BUILT
// const CYBER_YELLOW = '#FFEE00';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${BASE_ROUTE}/dashboard`} element={<Dashboard />} />
        <Route exact path={`${BASE_ROUTE}/`} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

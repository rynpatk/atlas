import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Dashboard, Login } from 'pages';

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
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route element={<Text>Oops!</Text>} status={404} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

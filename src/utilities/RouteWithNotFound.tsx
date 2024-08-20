import { Route, Routes } from 'react-router-dom';

interface props {
    children: JSX.Element[] | JSX.Element;
}

export const RouteWithNotFound = ({children}: props) => {
  return (
    <Routes>
        {children}
        <Route path='*' element={<div>Not found</div>} />
    </Routes>
  )
}

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '../header/Header';
import { ImageDispalyTab } from '../imagestab/ImageDispalyTab';
import { VedioDisplayTab } from  '../videotab/VideoDisplayTab'
export const Main = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Header />}>
        <Route path="images" element={<ImageDispalyTab />} />
        <Route path="vedios" element={<VedioDisplayTab />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

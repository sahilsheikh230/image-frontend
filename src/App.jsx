
import './App.css'
import Home from './components/Home'
import {Routes,Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'

import Login from './components/Login'
import Signup from './components/signup'
import Upload from './components/upload'
import Transform from './components/Transform'
import JPGTOPDF from './components/pdfcomponents/jpgtopdf'
import WORDTOPDF from './components/pdfcomponents/wordtopdf'
import PPTTOPDF from './components/pdfcomponents/ppttopdf'
import HTMLTOPDF from './components/pdfcomponents/htmltopdf'
import PDFTOJPG from './components/pdfcomponents/pdftojpg'
import PDFTOWORD from './components/pdfcomponents/pdftoword'
import PDFTOPPT from './components/pdfcomponents/pdftoPPT'
function App() {


  return (
    <div>
    <BrowserRouter>
    <Navbar></Navbar>
  <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/dashboard" element={<Upload></Upload>}></Route>
        <Route path="/transform/:imageId" element={<Transform></Transform>}></Route>
        <Route path="/jpgtopdf" element={<JPGTOPDF></JPGTOPDF>}></Route>
        <Route path="/wordtopdf" element={<WORDTOPDF></WORDTOPDF>}></Route>
        <Route path="/ppttopdf" element={<PPTTOPDF></PPTTOPDF>}></Route>
        <Route path="/htmltopdf" element={<HTMLTOPDF></HTMLTOPDF>}></Route>
        <Route path="/pdftojpg" element={<PDFTOJPG></PDFTOJPG>}>
        </Route>
        <Route path="/pdftoword" element={<PDFTOWORD></PDFTOWORD>}></Route>
        <Route path="/pdftoppt" element={<PDFTOPPT></PDFTOPPT>}></Route>
      </Routes>
   </BrowserRouter>
    </div>
  )
}

export default App


import React from 'react'
import {Outlet} from "react-router-dom"

 const Layout=()=> {
  return (
    <div>
      <header><h3>smile!!!!!!!!!!</h3></header>
      <main>
     <Outlet/>
      </main>
      <footer><h3>You can do it!!!</h3></footer>
    </div>
  )
}

export default Layout
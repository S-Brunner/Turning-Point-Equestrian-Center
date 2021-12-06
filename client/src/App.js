import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalStyles from "./Components/GlobalStyles";

import HomePage from "./Components/HomePage";
import AboutUs from "./Components/AbousUs";
import TherapeuticRiding from "./Components/TherapeuticRiding";
import EquestrianActivites from "./Components/EquestrianActivites";
import Volunteers from "./Components/Volunteers";
import OurHorses from "./Components/OurHorses";
import Partnership from "./Components/Partnership";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";

const App = () => {
  
  return (
    <div style={{ height: "100%"}}>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
          <Switch>

            <Route exact path="/">
              <HomePage />
            </Route>
            
            <Route exact path="/about-us">
              <AboutUs />
            </Route>
            
            <Route exact path="/therapeutic-riding">
              <TherapeuticRiding />
            </Route>
            
            <Route exact path="/equestrian-rec-activities">
              <EquestrianActivites />
            </Route>
            
            <Route exact path="/volunteers">
              <Volunteers />
            </Route>
          
            <Route exact path="/our-horses">
              <OurHorses />
            </Route>

            <Route exact path="/partnership">
              <Partnership />
            </Route>

          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

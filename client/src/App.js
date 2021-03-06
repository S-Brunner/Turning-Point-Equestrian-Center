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
import BookAppointment from "./Components/BookAppointment";
import UserProfile from "./Components/UserProfile";
import ListClients from "./Components/Management-Links/ListClients";
import AppointmentList from "./Components/Management-Links/AppointmentList";

const App = () => {
  
  return (
    <div style={{ height: "100%"}}>
      <BrowserRouter>
        <GlobalStyles />
          <Switch>

            <Route exact path="/">
              <Header />
              <HomePage />
            </Route>
            
            <Route exact path="/about-us">
              <Header />
              <AboutUs />
            </Route>
            
            <Route exact path="/therapeutic-riding">
              <Header />
              <TherapeuticRiding />
            </Route>
            
            <Route exact path="/equestrian-rec-activities">
              <Header />
              <EquestrianActivites />
            </Route>
            
            <Route exact path="/volunteers">
              <Header />
              <Volunteers />
            </Route>
          
            <Route exact path="/our-horses">
              <Header />
              <OurHorses />
            </Route>

            <Route exact path="/partnership">
              <Header />
              <Partnership />
            </Route>

            <Route exact path="/book-appointment">
              <Header />
              <BookAppointment />
            </Route>

            <Route exact path="/profile/:name">
              <Header />
              <UserProfile />
            </Route>

            <Route exact path="/list/clients">
              <Header />
              <ListClients />
            </Route>

            <Route exact path="/list/appointments">
              <Header />
              <AppointmentList />
            </Route>

          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

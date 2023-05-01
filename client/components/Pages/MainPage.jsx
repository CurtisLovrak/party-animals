import React, { useState, useEffect } from "react";
import MapPage from "./MapPage.jsx"

// submit button sends request to server, then app receives the data and stores as props app component and passing it to maps
// button also need to change state so it reveals the map component.

function MainPage(props) {
  const [borough, setBorough] = useState("MANHATTAN")
  const [day, setDay] = useState('0')
  
  const [showMap, setShowMap] = useState(false);
  const [partySpots, setPartySpots] = useState([]);
  console.log('showMap', showMap);

  const handleSubmit = (event) => {
    console.log('HANDLER')
    event.preventDefault();
    setShowMap(true);

    // extract value from form.
    // const borough = event.currentTarget.boroughSelect.value;
    // const day = event.currentTarget.day.value;

    console.log(day)
    console.log(borough)

    // construct the request body.
    const requestBody = {
      borough : borough,
      day : day,
    }

    fetch("/party/party-spots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPartySpots(data);
        setShowMap(true);
      })
      .catch((error) => {
        console.error("Error fetching party spots:", error);
      });
  }

  // if showMap is true, return MapPage component.
  if (showMap) {
    return <MapPage partySpots={partySpots} />
  }

  // otherwise return the contents of MainPage.
  return (
    <>
      <h1>Main Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="boroughBox">Show me party spots in </label>
        <select id="boroughSelect" onChange={(e) => setBorough(e.target.value)}>
          <option value="MANHATTAN">Manhattan</option>
          <option value="BROOKLYN">Brooklyn</option>
          <option value="BRONX">The Bronx</option>
          <option value="QUEENS">Queens</option>
          <option value="STATENISLAND">Staten Island</option>
          <option value="ALL">ALL OF NYC!!!</option>
        </select>
        <label htmlFor="daySelect"> on </label>
        <select id="daySelect" onChange={(e) => setDay(e.target.value)}>
          <option value="1">Mondays.</option>
          <option value="2">Tuesdays.</option>
          <option value="3">Wednesdays.</option>
          <option value="4">Thursdays.</option>
          <option value="5">FRIDAYS!</option>
          <option value="6">SATURDAYS!</option>
          <option value="0">Sundays?</option>
        </select>
        <input type="submit" value="GO" />
      </form>
      <button onClick={() => setShowMap(true)}>Test Button</button>
    </>
  );
}

export default MainPage;

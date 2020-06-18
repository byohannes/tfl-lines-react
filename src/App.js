import React, {useState, useEffect} from 'react';
import Header from './Header';
import Dropdown from './components/Dropdown';
import './App.css';

function App () {
  const [modes, setModes] = useState ([]);
  const [selectedModeName, setSelectedModeName] = useState (null);
  const [transportLines, setTransportLines] = useState ([]);
  const [selectedLineData, setSelectedLineData] = useState (null);

  useEffect (() => {
    fetch ('https://api.tfl.gov.uk/Line/Meta/Modes')
      .then (results => results.json ())
      .then (data => setModes (data));
  }, []);

  const handleModeChange = newModeName => {
    setSelectedModeName (newModeName);
    setSelectedLineData (null);
    setTransportLines ([]);
    fetch (`https://api.tfl.gov.uk/Line/Mode/${newModeName}`)
      .then (results => results.json ())
      .then (data => {
        setTransportLines (data);
      });
  };

  const handleLineChange = newLineId => {
    fetch (`https://api.tfl.gov.uk/Line/${newLineId}/Route`)
      .then (results => results.json ())
      .then (data => {
        if (data.routeSections) {
          setSelectedLineData (data.routeSections[0]);
        } else {
          alert ('There is no destination information for ' + newLineId);
        }
      });
  };

  return (
    <div className="App">
      <Header />

      <p className="route">
        Choose Mean of Transport :
        <span>
          <Dropdown
            defaultOption="Choose a Mode of Transport..."
            options={modes}
            changeHandler={handleModeChange}
            labelFieldName={'modeName'}
          />
        </span>
      </p>
      <p className="route">
        Choose Line of Transport :
        <span>
          {transportLines.length > 0 &&
            <Dropdown
              defaultOption="Choose a Line..."
              options={transportLines}
              changeHandler={handleLineChange}
              labelFieldName={'name'}
            />}
        </span>
      </p>

      {selectedModeName &&
        <p className="info">

          The Selected mode of transport is :

          <span className="info-span">
            {selectedModeName.toUpperCase ()}
          </span>

        </p>}
      {selectedLineData &&
        <React.Fragment>
          <p className="route">
            Start of Line :
            <span className="route-span">
              {' '}{selectedLineData.originationName}{' '}
            </span>
          </p>
          <p className="route">
            End of Line :
            {' '}
            <span className="route-span">
              {' '}{selectedLineData.destinationName}{' '}
            </span>
          </p>
        </React.Fragment>}

    </div>
  );
}

export default App;

import React from 'react';
import Router from './routes/Routes';
import RouteChangeTracker from './routes/RouteChangeTracker';
/*
./는 현재 디렉토리를 나타내고, ../는 상위 디렉토리를 나타냅니다. 따라서 import Router from "./routes/Routes";는 현재 디렉토리의 routes/Routes 모듈을 import하고, import Router from "../routes/Routes";는 상위 디렉토리의 routes/Routes 모듈을 import합니다.
*/

function App() {
  return (
    <div className="App">
      <RouteChangeTracker/>
        <Router />
    </div>
  );
}

export default App;

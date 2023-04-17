import React from 'react';
import Router from './routes/Routes';
// import RouteChangeTracker from './routes/RouteChangeTracker';
/*
./는 현재 디렉토리를 나타내고, ../는 상위 디렉토리를 나타냅니다. 따라서 import Router from "./routes/Routes";는 현재 디렉토리의 routes/Routes 모듈을 import하고, import Router from "../routes/Routes";는 상위 디렉토리의 routes/Routes 모듈을 import합니다.
*/

function App() {
  return (
    <div className="App">
      {/* 기존 App.jsx 에서 통합적으로 사용자 분석 정보를 트래킹 했다면 Main과 One 페이지에서 각각 분석 정보를 얻기 위해 수정 */}
      {/* <RouteChangeTracker/> */}
      <Router />
    </div>
  );
}

export default App;

// TODO: 이대로 배포해서 테스트 해보고 withRouter사용해서 바꿔보기
// TODO: 웹페이지에서 테스트 한 사람의 수 체크하는 방법? 아니면 애널리틱스 활용해서 표시할 수 있나 알아보기

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

// 성공!! 페이지 구분해서 된다..
//TODO: 각 컴포넌트마다 넣지 않아도 됨 각 컴포넌트마다 RouteChangeTracker컴포넌트를 추가하면 initialized 상태가 변경될 때마다 ReactGA.initialize 메소드를 호출하여 초기화하기 때문에, 매번 페이지를 이동할 때마다 초기화가 발생하여 비효율적일 수 있습니다. 보통 App.js와 같은 최상위 컴포넌트에서 호출하며, 해당 컴포넌트가 마운트 될 때 한번만 호출되도록 설정해야 합니다. 이렇게 하면 페이지 이동할 때마다 ReactGA.initialize 메소드가 호출되는 문제를 해결할 수 있습니다.

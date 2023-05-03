import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

/**
 * uri 변경 추적 컴포넌트
 * uri가 변경될 때마다 pageview 이벤트 전송
 */
const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // localhost는 기록하지 않음
  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
      setInitialized(true);
    }
  }, []);

  // location 변경 감지시 pageview 이벤트 전송
  useEffect(() => {
    if (initialized) {
      // 현재 페이지의 경로 정보를 설정하고, 이를 ReactGA.send(pageview); 코드와 함께 호출하여 현재 페이지가 본격적으로 로드되었다는 이벤트를 전송합니다. 이를 통해 Google Analytics에서 해당 페이지에 대한 방문자 수, 이동 경로, 이탈률 등의 정보를 수집할 수 있습니다.
      ReactGA.set({ page: location.pathname });
      // 페이지뷰 이벤트를 전송합니다. 이 코드가 있으면 Google Analytics에서 해당 페이지를 방문한 사용자 수, 세션 수, 페이지 뷰 수 등을 추적할 수 있습니다.
      ReactGA.send(`pageview`);
    }
  }, [initialized, location]);

  // // 개발용
  // useEffect(() => {
  //   ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
  //   ReactGA.set({ page: location.pathname });
  //   ReactGA.send('pageview');
  // }, [location]);
};

export default RouteChangeTracker;

// 코드 설명
// TODO: 코드설명 추가하기

// 각각의 페이지를 구분해서 추적을 할 수 있는 이유
// location.pathname은 현재 브라우저의 URL 경로 중에서, pathname 부분만을 가져오는 속성입니다. 예를 들어 https://www.example.com/about 이라는 URL이 있다면, location.pathname은 /about이 됩니다.
//

import React from 'react';
import RouteChangeTracker from '../routes/RouteChangeTracker';
const One = () => {
  return (
    <div>
      <RouteChangeTracker pageName="One" />
      <div>테스트 페이지</div>
    </div>
  );
};

export default One;

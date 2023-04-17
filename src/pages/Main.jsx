import React from 'react';
import Question from '../conponents/QuestionContainer';
import RouteChangeTracker from './routes/RouteChangeTracker';


const Main = () => {
  return (
    <div>
            <RouteChangeTracker pageName="main"/>

      <Question></Question>
    </div>
  );
};

export default Main;

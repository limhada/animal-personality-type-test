import React from 'react';
import styled from 'styled-components';
import Question from '../conponents/QuestionContainer';
// import 고양이 from '../assets/img/고양이.jpeg'

// const LogoPng = styled.img`
//   height: 500px;
//   width: 500px;
//   margin-bottom: 20px;
//   border-radius: 20px;
// `;

// TODO: 시작 페이지 만들고 설문지 문항 차례대로 질문 페이지 만들기
// FIXME: 사진 제거하기

const Main = () => {
  return (
    <div>
      {/* <div>고양이!!</div> 
      그림아래
      <LogoPng src={고양이}></LogoPng> */}
      <Question></Question>
    </div>
  );
};

export default Main;

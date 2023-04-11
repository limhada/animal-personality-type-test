import React, { useState } from 'react';
import styled from 'styled-components';
import Checkbox from './Checkbox';

const Question = styled.div`
  width: 50%;
  height: 30%;
  padding: 10px;
  color: rgb(88 101 242);
  // color: #1E4;
  // background: white;
  background: ${(props) => props.color || 'white'};
  font-size: 13px;
  font-weight: 600;
  border: 2px solid;
  border-radius: 5px;
  margin-bottom: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  // &:hover {
  //   background-color: rgb(71 82 196);
  //   color: white;
  // }
`;

// 질문 리스트
const questions = [
  {
    id: '1',
    content: (
      <Question color="#ff7eb3">
        1. Openness
        <br /> - Do you enjoy new experiences?
        <br /> - Do you like and enjoy artistic experiences?
        <br /> - Do you like trying out new ideas or methods?
      </Question>
    ),
  },
  {
    id: '2',
    content: (
      <Question color="#764ba2">
        2. Conscientiousness
        <br /> - Are you reliable and dependable?
        <br /> - Do you have good self-discipline?
        <br /> - Are you well-organized?
      </Question>
    ),
  },
  {
    id: '3',
    content: (
      <Question color="#66a6ff">
        3. Extraversion
        <br /> - Are you outgoing and sociable?
        <br /> - Do you enjoy being the center of attention?
        <br /> - Do you like meeting new people?
      </Question>
    ),
  },
  {
    id: '4',
    content: (
      <Question color="#ffecd2">
        4. Agreeableness
        <br /> - Are you considerate and cooperative?
        <br /> - Do you value harmony in your relationships?
        <br /> - Do you have empathy for others?
      </Question>
    ),
  },
  {
    id: '5',
    content: (
      <Question color="#b7f8db">
        5. Neuroticism
        <br /> - Do you experience strong negative emotions?
        <br /> - Do you worry a lot?
        <br /> - Are you easily stressed?
      </Question>
    ),
  },
];

// TODO: previous 버튼 1번 문항일때는 비활성화 시키기 + 마지막 문항일때는 next 버튼 비활성화 시키기
const QuestionContainer = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // next 버튼 로직
  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // previous 버튼 로직
  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div>
      {/* 화면에 해당 인덱스의 컨텐츠를 띄워주는 로직 */}
      {/* {questions[currentQuestionIndex].content} */}
      {questions[currentQuestionIndex].content}
      <Checkbox></Checkbox>
      <button onClick={handlePreviousClick}>Previous</button>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default QuestionContainer;

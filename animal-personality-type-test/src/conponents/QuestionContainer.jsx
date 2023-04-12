import React, { useState } from 'react';
import styled from 'styled-components';

// 질문 리스트
const questions = [
  {
    id: 0,
    title: '첫번째 질문',
    content: {
      0: '000000000000000000000000',
      1: '00000you like and enjoy artistic experiences?',
      2: '00000Do you like trying out new ideas or methods?',
    },
  },
  {
    id: 1,
    content: {
      0: '두 번째 질문',
      1: '11111Do you like and enjoy artistic experiences?',
      2: '111Do you like trying out new ideas or methods?',
    },
  },
  {
    id: 2,
    content: {
      0: '세 번째 질문',
      1: '22222Do you like and enjoy artistic experiences?',
      2: '2222Do you like trying out new ideas or methods?',
    },
  },
  {
    id: 3,
    content: {
      0: '네 번째 질문',
      1: '22222Do you like and enjoy artistic experiences?',
      2: '2222Do you like trying out new ideas or methods?',
    },
  },
  {
    id: 4,
    content: {
      0: '다섯 번째 질문',
      1: '22222Do you like and enjoy artistic experiences?',
      2: '2222Do you like trying out new ideas or methods?',
    },
  },
];

// TODO: previous 버튼 1번 문항일때는 비활성화 시키기 + 마지막 문항일때는 next 버튼 비활성화 시키기
const QuestionContainer = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswerSubmit = (answer) => {
    // userAnswers 배열에 새로운 answer를 추가
    setUserAnswers([...userAnswers, answer]);
    // 현재 문제의 인덱스를 1 증가시킴
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const generateButtons = (numButtons) => {
    const buttons = []; // 버튼들을 저장할 배열을 초기화합니다.
    for (let i = 0; i < numButtons; i++) {
      // numButtons 만큼 반복문을 실행합니다.
      buttons.push(
        // 배열에 버튼을 추가합니다.
        <button key={i} onClick={() => handleAnswerSubmit(`Button ${i + 1}`)}>
          Button {i + 1}
        </button>,
      );
    }
    return buttons; // 완성된 버튼 배열을 반환합니다.
  };

  return (
    <div>
      {/* 아직 답해야 할 질문이 남아있는 경우 */}
      {currentQuestionIndex < questions.length ? (
        <>
          {/* 현재 질문 번호 표시 */}
          <h1>Question {currentQuestionIndex + 1}</h1>

          {/* FIXME: 확인하고 지울지 활용할지 생각해보기 */}
          {/* 타이틀을 렌더링함 없으면 그냥 빈칸으로 렌더링 */}
          {/* <h1>타이틀 = {questions[currentQuestionIndex].title}</h1> */}
          {/* questions[currentQuestionIndex].title이 있으면 화면에 title을 렌더링 함 */}
          {questions[currentQuestionIndex].title && (
            <h1>타이틀 = {questions[currentQuestionIndex].title}</h1>
          )}
          {/* 현재 질문 내용 표시 */}
          <ul>
            {/* 'Object.values(questions[currentQuestionIndex].content)'는 각 질문의 텍스트 콘텐츠를 포함하는 현재 질문 개체의 모든 속성 값의 배열 */}
            {/* .map()은 배열의 각 값을 반복하고 각 값에 대해 값을 표시하는 새로운 <li> 요소를 반환 */}
            {Object.values(questions[currentQuestionIndex].content).map(
              (question, index) => (
                <li key={index}>{question}</li>
              ),
            )}
          </ul>
          {/* 답변 버튼 표시 */}
          {generateButtons(5)}
        </>
      ) : (
        <>
          {/* 모든 질문에 대한 답변이 완료된 경우 */}
          <h1>Quiz complete!</h1>
          {/* "Answers" 제목 표시 */}
          <h2>Answers:</h2>
          {/* 사용자의 답변 표시 */}
          {/* 정렬되지 않은 목록 <ul>을 만들고 userAnswers 배열의 값을 기반으로 목록 항목 <li>로 동적으로 채웁 */}
          <ul>
            {/* Array.prototype.map() 메서드를 사용하여 userAnswers 배열을 매핑하여 목록 항목의 새 배열을 생성 
            여기서 각 항목은 userAnswers 배열의 답변에 해당
            'key' 속성은 각 목록 항목에 고유한 식별자를 부여하는 데 사용되며 이는 React가 목록 렌더링을 최적화하는 데 도움이 된다
            */}
            {userAnswers.map((answer, index) => (
              //  <li> 태그에 전달된 answer 변수에는 userAnswers 배열의 각 답변 값이 포함되며, 이는 목록 항목의 텍스트 콘텐츠로 표시
              <li key={index}>{answer}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default QuestionContainer;

import React, { useState } from 'react';
import styled from 'styled-components';

// 질문 리스트
const questions = [
  {
    id: 0,
    title: '첫번째 질문',
    content: {
      0: '1번 카테고리 1번',
      1: '1번 카테고리 2번',
      2: '1번 카테고리 3번',
    },
  },
  {
    id: 1,
    content: {
      0: '2번 카테고리 1번',
      1: '2번 카테고리 2번',
      2: '2번 카테고리 3번',
    },
  },
  {
    id: 2,
    content: {
      0: '3번 카테고리 1번',
      1: '3번 카테고리 2번',
      2: '3번 카테고리 3번',
    },
  },
  {
    id: 3,
    content: {
      0: '4번 카테고리 1번',
      1: '4번 카테고리 2번',
      2: '4번 카테고리 3번',
    },
  },
  {
    id: 4,
    content: {
      0: '5번 카테고리 1번',
      1: '5번 카테고리 2번',
      2: '5번 카테고리 3번',
    },
  },
];

// TODO: previous 버튼 1번 문항일때는 비활성화 시키기 + 마지막 문항일때는 next 버튼 비활성화 시키기
const QuestionContainer = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // 컨텐츠 인덱스
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  // 답변 상태 변수
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswerSubmit = (answer) => {
    // userAnswers 배열에 새로운 answer를 추가

    // FIXME: 수정
    // setUserAnswers([...userAnswers, answer]);
    setUserAnswers([...userAnswers, answer]);

    // 현재 문제의 인덱스를 1 증가시킴 문제를 하나씩 다음 문제로 이동
    // FIXME: 다시 활성화하기 밑에 테스트해보고
    // setCurrentQuestionIndex(currentQuestionIndex + 1);

    // 현재 질문을 가져옵니다.
    const currentQuestion = questions[currentQuestionIndex];
    // 컨텐츠의 길이를 가져옵니다.
    const contentLength = Object.keys(currentQuestion.content).length;
    // 현재 컨텐츠 인덱스가 컨텐츠의 길이보다 작으면
    if (currentContentIndex + 1 < contentLength) {
      // 컨텐츠 인덱스를 증가시킵니다.
      setCurrentContentIndex(currentContentIndex + 1);
    } else {
      // 그렇지 않으면 컨텐츠 인덱스를 0으로 설정하고
      setCurrentContentIndex(0);
      // 질문 인덱스를 증가시킵니다.
      // setCurrentQuestionIndex((currentQuestionIndex + 1) % questions.length);
      // FIXME: 수정
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

  };

  // 버튼 생성 버전 2
  const buttonNames = ['매우 아님', '아님', '보통', '그렇다', '매우 그렇다'];

  return (
    <div>
      {/* {console.log(questions.length)} */}
      {console.log(currentQuestionIndex, currentContentIndex)}
      {console.log(userAnswers)}
      
      {/* 아직 답해야 할 질문이 남아있는 경우 */}
      {/* {!(currentQuestionIndex === questions.length-1 && currentContentIndex === questions[currentContentIndex].content.length-1) ? (   */}
      {currentQuestionIndex < questions.length ? (
      
        <>
          {/* 현재 질문 번호 표시 */}
          {/* <h1>Question {currentQuestionIndex + 1}</h1> */}

          {/* FIXME: 확인하고 지울지 활용할지 생각해보기 */}
          {/* 타이틀을 렌더링함 없으면 그냥 빈칸으로 렌더링 */}
          {/* <h1>타이틀 = {questions[currentQuestionIndex].title}</h1> */}
          {/* questions[currentQuestionIndex].title이 있으면 화면에 title을 렌더링 함 */}
          {questions[currentQuestionIndex].title && (
            <h1>타이틀 = {questions[currentQuestionIndex].title}</h1>
          )}
          {/* 현재 질문 내용 표시 */}
          <ul>
            {/* 질문 세개 한번에 다 보여주기 */}
            {/* {Object.values(questions[currentQuestionIndex].content).map(
              (question, index) => (
                <li key={index}>{question}</li>
              ),
            )} */}
            {/* 한번에 한가지 질문 */}
            {/* {questions[currentQuestionIndex].content[0]} */}

            <div>
              {questions[currentQuestionIndex].content[currentContentIndex]}
            </div>

          </ul>
          {/* 답변 버튼 표시 */}
          {/* 초기버튼 */}
          {/* {generateButtons(5)} */}

          {/* // FIXME: 버튼 생성 버전2 */}
          <div>
            {buttonNames.map((name, index) => (
              <button
                key={index}
                // 여기가 답변으로 보내는 데이터
                onClick={() =>
                  // handleAnswerSubmit(`Button ${index + 1} 이게 답변에 나오는 데이터!!! name으로 고치면 버튼이름을 전달`,)
                  handleAnswerSubmit(
                    `${
                      index + 1
                    } 이게 답변에 나오는 데이터!!! name으로 고치면 버튼이름을 전달`,
                  )
                }
              >
                {name}
              </button>
            ))}
          </div>
          {/* 여기까지 버튼 생성 버전2 */}
        </>
      ) : (
        <>
          <h1>Quiz complete!</h1>
          <h2>Answers:</h2>
          <ul>
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

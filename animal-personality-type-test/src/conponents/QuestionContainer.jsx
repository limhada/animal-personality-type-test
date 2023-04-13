import React, { useState } from 'react';
import styled from 'styled-components';

// 질문 리스트
const questions = [
  {
    id: 0,
    type: '개방성',
    content: {
      0: '새로운 경험을 즐기는 편인가요?',
      1: '예술적인 경험을 좋아하고 즐기시나요?',
      2: '새로운 아이디어나 방법을 시도해 보는 것을 좋아하시나요?',
    },
  },
  {
    id: 1,
    type: '성실성',
    content: {
      0: '일을 미루기보다는 빨리 처리하는 편인가요?',
      1: '계획을 세우고 그 계획에 따라 일을 처리하시나요?',
      2: '약속 시간을 잘 지키시나요?',
    },
  },
  {
    id: 2,
    type: '외향성',
    content: {
      0: '사람들과 함께 있는 것을 좋아하시나요?',
      1: '대화를 시작하기 쉬운 편인가요?',
      2: '새로운 사람들을 만나는 것을 좋아하시나요?',
    },
  },
  {
    id: 3,
    type: '우호성',
    content: {
      0: '다른 사람들의 감정에 민감하게 반응하시나요?',
      1: '다른 사람들을 쉽게 돕고 지원하시나요?',
      2: '다른 사람들과 관계 맺고 유지하는 것이 쉽나요?',
    },
  },
  {
    id: 4,
    type: '신경성',
    content: {
      0: '일이나 상황에 대해 예민하게 반응하시나요?',
      1: '사소한 일을 할때도 걱정이 많은 편인가요?',
      2: '어려운 일이나 문제에 대처하는 것이 어려우신가요?',
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

  // userAnswers 값을 3개씩 더하고 3으로 나눠서 result 배열에 넣는다
  // TODO: 문항의 답변을 1번카테고리의 2번까지만 답변을 선택할 경우 NaN 값이 되고 3번째 답변까지 선택해야 정상동작함 모든 질문에 대한 답변을 선택해야 하므로 결과적으로는 문제가 되지 않음 추후 이런 부분을 보완하면 좋을것 같음
  const result = [];
  for (let i = 0; i < userAnswers.length; i += 3) {
    let sum = userAnswers[i] + userAnswers[i + 1] + userAnswers[i + 2];
    result.push(sum / 3);
  }

  console.log('이건 언제 실행되나', result);

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

  function getImageSrc(value) {
    let 동물 = [
      { name: '고양이', min: 0, max: 2.5 },
      { name: '나무늘보', min: 2.5, max: 4.5 },
      { name: '고릴라', min: 4.5, max: 5 },
    ];
    let animal = 동물.find((item) => value >= item.min && value < item.max);
    return animal ? animal.name + '.jpeg' : '';
  }
  let imageSrc = getImageSrc(result[0]);

  // const images = [
  //   '고슴도치.jpeg',
  //   '고양이.jpeg',
  //   '곰.jpeg',
  //   '나무늘보.jpeg',
  //   '당나귀.jpeg',
  //   '독수리.jpeg',
  //   '랫서팬더.jpeg',
  //   '벌새.jpeg',
  //   '악어.jpeg',
  //   '알파카.jpeg',
  //   '앵무새.jpeg',
  //   '원숭이.jpeg',
  //   '코끼리.jpeg',
  //   '코알라.jpeg',
  //   '토끼.jpeg',
  // ];

  return (
    <div>
      {/* {console.log(questions.length)} */}
      {/* {console.log(currentQuestionIndex, currentContentIndex)}
      {console.log(userAnswers)} */}

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
                    // `${index + 1} 이게 답변에 나오는 데이터!!! name으로 고치면 버튼이름을 전달`,
                    index + 1,
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
            {/* FIXME: 사용자가 선택한 모든 결과값을 나타냄 화면에 렌더링 할 필요는 없음 */}
            {/* {userAnswers.map((answer, index) => (
              //  <li> 태그에 전달된 answer 변수에는 userAnswers 배열의 각 답변 값이 포함되며, 이는 목록 항목의 텍스트 콘텐츠로 표시
              <li key={index}>{answer}</li>
            ))} */}
            {/* 최종 반환할 값 */}
            {`결과 = ${result}`}
            <img src={imageSrc} alt="animal" />;
          </ul>
        </>
      )}
    </div>
  );
};

export default QuestionContainer;

import React, { useState } from 'react';
import styled from 'styled-components';

import 고슴도치 from '../assets/img/고슴도치.png';
import 고양이 from '../assets/img/고양이.png';
import 곰 from '../assets/img/곰.png';
import 나무늘보 from '../assets/img/나무늘보.png';
import 당나귀 from '../assets/img/당나귀.png';
import 독수리 from '../assets/img/독수리.png';
import 랫서팬더 from '../assets/img/랫서팬더.png';
import 벌새 from '../assets/img/벌새.png';
import 악어 from '../assets/img/악어.png';
import 알파카 from '../assets/img/알파카.png';
import 앵무새 from '../assets/img/앵무새.png';
import 원숭이 from '../assets/img/원숭이.png';
import 코끼리 from '../assets/img/코끼리.png';
import 코알라 from '../assets/img/코알라.png';
import 토끼 from '../assets/img/토끼.png';

import 배경_숲 from '../assets/img/배경_숲.jpeg';

import html2canvas from 'html2canvas';

// FIXME: 문항에 대한 답변을 선택하지 않았을 경우 ex 15개의 질문 중 1개만 답변했을 경우 2번째 3번째 답변까지 즉, 1~3번 질문이 한 카테고리인데 1번만 응답했을 시 1 + ? + ? / 3 이라서 NaN이 되어버림 이 문제는 추후에 해결하고자 한다

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

// 버튼 이름
const buttonNames = ['매우 아님', '아님', '보통', '그렇다', '매우 그렇다'];

// min: 4.25, max: 6 에서 max값을 5로해서 에러가 났었음
const animal = [
  {
    id: 0,
    type: '개방성',
    content: [
      { name: '당나귀', min: 0, max: 3.25 },
      { name: '곰', min: 3.25, max: 4.25 },
      { name: '원숭이', min: 4.25, max: 6 },
    ],
  },
  {
    id: 1,
    type: '성실성',
    content: [
      { name: '나무늘보', min: 0, max: 3.25 },
      { name: '코끼리', min: 3.25, max: 4.25 },
      { name: '벌새', min: 4.25, max: 6 },
    ],
  },
  {
    id: 2,
    type: '외향성',
    content: [
      { name: '고슴도치', min: 0, max: 3.25 },
      { name: '고양이', min: 3.25, max: 4.25 },
      { name: '앵무새', min: 4.25, max: 6 },
    ],
  },
  {
    id: 3,
    type: '우호성',
    content: [
      { name: '알파카', min: 0, max: 3.25 },
      { name: '악어', min: 3.25, max: 4.25 },
      { name: '랫서팬더', min: 4.25, max: 6 },
    ],
  },
  {
    id: 4,
    type: '신경성',
    content: [
      { name: '독수리', min: 0, max: 3.25 },
      { name: '코알라', min: 3.25, max: 4.25 },
      { name: '토끼', min: 4.25, max: 6 },
    ],
  },
];

// TODO: 성공코드!!
const animalIndex = {
  고슴도치: 고슴도치,
  고양이: 고양이,
  곰: 곰,
  나무늘보: 나무늘보,
  당나귀: 당나귀,
  독수리: 독수리,
  랫서팬더: 랫서팬더,
  벌새: 벌새,
  악어: 악어,
  알파카: 알파카,
  앵무새: 앵무새,
  원숭이: 원숭이,
  코끼리: 코끼리,
  코알라: 코알라,
  토끼: 토끼,
};

// 최상위 컨테이너 - 배경 설정
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${배경_숲});
  background-size: cover;
  // 이미지 반복 x
  background-repeat: no-repeat;
  background-position: center;
  // 배경 이미지가 스크롤되지 않고 화면에 고정
  background-attachment: fixed;
`;

// 질문과 버튼이 들어있는 박스
const QuestionsContent = styled.div`
  display: flex;
  // 응답 버튼을 세로로 = 이런식으로 정렬
  flex-direction: column;
  // 세로정렬 답변버튼 가운데 정렬
  align-items: center;

  // 질문과 버튼이 담긴 박스의 배경색
  /* background-color: #4122; */

  // 하위 모든 자식 요소에 적용 // 여기선 버튼에 적용됨
  /* & > * {
    flex: 1;
  } */
`;

// 동물 이미지가 들어있는 컴포넌트
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  width: 100%;
  height: 100%;
`;

// 결과 동물 이미지
const AnimalImg = styled.img`
  width: 7rem;
  height: 7rem;
`;

// 답변버튼
const AnswerButton = styled.button`
  width: 7rem;
  height: 2rem;
  // 답변 버튼 색
  background-color: #aea18f;

  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  // 위 오른쪽 아래 왼쪽
  margin: 0.5rem 1rem 0.5rem 1rem;
`;

// 질문 컴포넌트
const Question = styled.div`
  /* 핸드폰 */
  background-color: #aea18f;
  // 배경 투명도
  opacity: 0.93;
  border-radius: 1rem;
  font-size: 2rem;
  color: white;
  // FIXME: 마진을 넣을지 컴포넌트를 센터로 맞출지 생각해보기
  margin: 5rem 1rem 1rem 1rem;
  /* 태블릿 */
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 3rem;
    background-color: #667eea;
  }

  /* 데스크탑 모니터 */
  @media (min-width: 1024px) {
    font-size: 5rem;
  }
`;

const QuestionContainer = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // 컨텐츠 인덱스
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  // 답변 상태 변수
  const [userAnswers, setUserAnswers] = useState([]);

  // userAnswers 값을 3개씩 더하고 3으로 나눠서 result 배열에 넣는다
  // TODO: 문항의 답변을 1번카테고리의 2번까지만 답변을 선택할 경우 NaN 값이 되고 3번째 답변까지 선택해야 정상동작함 모든 질문에 대한 답변을 선택해야 하므로 결과적으로는 문제가 되지 않음 추후 이런 부분을 보완하면 좋을것 같음
  // FIXME: ex) 1번 2번 3번 문항을 응답해서 1, 2, 3 과 같이 3개의 요소가 있을때 실행하기 안그럼 값이 없어서 NaN이 나옴...
  const result = [];
  for (let i = 0; i < userAnswers.length; i += 3) {
    const sum = userAnswers[i] + userAnswers[i + 1] + userAnswers[i + 2];
    result.push(sum / 3);
  }

  const handleAnswerSubmit = (answer) => {
    setUserAnswers([...userAnswers, answer]);
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
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const finalResult = result.map((value, index) => {
    const animalType = animal.find((animal) => animal.id === index);
    const animalContent = animalType.content.find(
      (content) => value >= content.min && value < content.max,
    );
    // FIXME: 수정하기 확인하고
    return animalContent ? animalContent.name : '';
  });

  const renderImages = () =>
    finalResult.map((animal) => (
      <AnimalImg src={animalIndex[animal]} alt={animal} />
    ));

  // 방법1 - 성공- 컴포넌트를 캡처해서 이미지로 화면에 띄움
  // const [image, setImage] = useState(null);
  // const handleDownloadClick = () => {
  //   html2canvas(document.querySelector("#main_capture")).then(canvas => {
  //     setImage(canvas.toDataURL('image/png'));
  //   });
  // };

  // 방법2 - 성공 - 컴포넌트를 캡처해서 버튼 클릭 시 다운로드 함
  const handleDownloadClick = () => {
    html2canvas(document.querySelector('#main_capture')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'my_image.png';
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <Container id="main_capture">
      {/* 아직 답해야 할 질문이 남아있는 경우 */}
      {currentQuestionIndex < questions.length ? (
        <QuestionsContent>
          <Question>
            {questions[currentQuestionIndex].content[currentContentIndex]}
          </Question>
          {buttonNames.map((name, index) => (
            <AnswerButton
              key={index}
              // 여기가 답변으로 보내는 데이터
              onClick={() =>
                handleAnswerSubmit(
                  // `${index + 1} 이게 답변에 나오는 데이터!!! name으로 고치면 버튼이름을 전달`,
                  index + 1,
                )
              }
            >
              {name} {/* 버튼이름 */}
            </AnswerButton>
          ))}
        </QuestionsContent>
      ) : (
        <>
          {/* TODO: 성공코드!! 동물 이미지 렌더링 */}
          <Content>
            <h1> 나의 성격을 나타내는 동물은?! </h1>
            <div>{renderImages()}</div>

            {/* 방법1 */}
            {/* {image && <img src={image} alt="Downloaded image" />} */}

            {/* 방법2는 그냥 클릭하면 된다 */}
            <button onClick={handleDownloadClick}>Download</button>
          </Content>
        </>
      )}
    </Container>
  );
};

export default QuestionContainer;

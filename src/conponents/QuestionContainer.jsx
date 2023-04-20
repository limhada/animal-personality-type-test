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
import 강아지 from '../assets/img/강아지.png';
import 코끼리 from '../assets/img/코끼리.png';
import 코알라 from '../assets/img/코알라.png';
import 토끼 from '../assets/img/토끼.png';
import 배경_숲 from '../assets/img/배경_숲.jpeg';

import html2canvas from 'html2canvas';
import { Link } from 'react-scroll';

// FIXME: 문항에 대한 답변을 선택하지 않았을 경우 ex 15개의 질문 중 1개만 답변했을 경우 2번째 3번째 답변까지 즉, 1~3번 질문이 한 카테고리인데 1번만 응답했을 시 1 + ? + ? / 3 이라서 NaN이 되어버림 이 문제는 추후에 해결하고자 한다

// 질문 리스트
const questions = [
  {
    id: 0,
    type: '개방성',
    content: {
      0: '새로운 경험을 즐기시나요?',
      1: '전시회와 같은 예술적인 경험을 좋아하나요?',
      2: '새로운 일을 시도하는 것을 좋아하시나요?',
    },
  },
  {
    id: 1,
    type: '성실성',
    content: {
      0: '일을 미루기보다는 빨리 처리하는 편인가요?',
      1: '계획을 세우고 잘 지키는 편인가요?',
      2: '약속 시간을 잘 지키시나요?',
    },
  },
  // {
  //   id: 2,
  //   type: '외향성',
  //   content: {
  //     0: '사람들과 함께 있는 것을 좋아하시나요?',
  //     1: '대화를 시작하기 쉬운 편인가요?',
  //     1: '처음 보는 사람에게 먼저 다가가는 편인가요?',
  //     2: '새로운 사람들을 만나는 것을 좋아하시나요?',
  //   },
  // },
  // {
  //   id: 3,
  //   type: '우호성',
  //   content: {
  //     0: '다른 사람들의 감정에 민감하게 반응하시나요?',
  //     1: '다른 사람들을 잘 도와주시나요?',
  //     2: '다른 사람들과 원만한 관계를 유지하시나요?',
  //   },
  // },
  // {
  //   id: 4,
  //   type: '신경성',
  //   content: {
  //     0: '어떤 일이나 상황에 대해 예민하게 반응하시나요?',
  //     1: '어려운 일이나 상황을 이겨내기 힘든가요?',
  //     2: '사소한 일을 할때도 걱정이 많은 편인가요?',
  //   },
  // },
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
      { name: '강아지', min: 4.25, max: 6 },
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

// import한 값을 키값에 넣어 저장
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
  강아지: 강아지,
  코끼리: 코끼리,
  코알라: 코알라,
  토끼: 토끼,
};

// FIXME: 내용 매끄럽게 수정하기
// 해설 내용

const explanation = {
  강아지:
    '새로운 아이디어나 경험에 대해 열려있으므로, 호기심이 많은 강아지와 어울릴 수 있습니다.',
  곰: '새로운 아이디어나 경험에 대해 어느 정도 열려있지만, 전통적인 방식을 선호하는 경우도 있으므로, 균형 잡힌 곰과 어울릴 수 있습니다.',
  당나귀:
    '새로운 아이디어나 경험보다는 전통적인 방식을 선호하는 경우가 많으므로, 집요한 당나귀와 어울릴 수 있습니다.',
  벌새: '계획적이고 체계적으로 일을 처리하는 경우가 많으므로, 부지런한 벌새와 어울릴 수 있습니다.',
  코끼리:
    '계획적으로 일을 처리하는 경우도 있지만, 때때로 일을 미루는 경우도 있으므로, 융통성 있는 코끼리와 어울릴 수 있습니다.',
  나무늘보:
    '일을 처리하는데 있어서 계획적이지 않은 경우가 많으며, 때때로 일을 미루는 경우도 있으므로, 나른한 나무늘보와 어울릴 수 있습니다.',
  앵무새:
    '외향성이 높은 사람은 사람들과 함께하는 것을 좋아하므로, 사회적인 동물인 앵무새와 어울릴 수 있습니다.',
  고양이: '때때로 혼자 있는 것도 좋아하므로, 고양이와 어울릴 수 있습니다.',
  고슴도치:
    '혼자 있는 것을 좋아하므로, 겁이 많은 고슴도치와 어울릴 수 있습니다.',
  랫서팬더:
    '다른 사람들의 감정에 민감하게 반응하며, 다른 사람들을 쉽게 돕고 지원하는 경우가 많으므로, 친절한 랫서팬더와 어울릴 수 있습니다.',
  악어: '다른 사람들의 감정에 어느 정도 반응하지만, 때때로 자신의 의견을 단호하게 표현하는 경우도 있으므로, 자기주장이 강한 악어와 어울릴 수 있습니다.',
  알파카:
    '다른 사람들의 감정에 둔감한 경우가 많으며, 자신의 의견을 단호하게 표현하는 경우가 많으므로, 고집스러운 알파카와 어울릴 수 있습니다.',
  토끼: '일이나 상황에 대해 예민하게 반응하며, 자주 걱정하는 경우가 많으므로, 겁이 많은 토끼와 어울릴 수 있습니다.',
  코알라:
    '일이나 상황에 대해 어느 정도 예민하게 반응하지만, 때때로 차분하게 대처하는 경우도 있으므로, 차분한 코알라와 어울릴 수 있습니다.',
  독수리:
    '일이나 상황에 대해 둔감한 경우가 많으며, 차분하게 대처하는 경우가 많으므로, 냉정한 독수리와 어울릴 수 있습니다.',
};

// 최상위 컨테이너 - 배경 설정
const Container = styled.div`
  /* width 100vw 하면 가로스크롤 생기는 이유 
width: 100vw;는 뷰포트 너비(viewport width)를 100%로 설정하는 것입니다. 뷰포트 너비는 브라우저에서 보이는 화면의 너비를 말합니다. 하지만 이 경우 브라우저 창의 너비가 수평 스크롤바까지 포함되므로 수평 스크롤바가 생성됩니다.

반면에 width: 100%;는 부모 요소의 너비를 100%로 설정하는 것입니다. 이 경우 부모 요소가 수평 스크롤바를 가지고 있다면, 자식 요소도 같이 스크롤되므로 수평 스크롤바가 생성되지 않습니다. 그러나 부모 요소가 스크롤바를 가지고 있지 않다면, 자식 요소는 부모 요소의 너비를 100%로 채우게 되므로 가로 스크롤바가 생기지 않습니다. */
  width: 100%;
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

const ShareResultsbutton = styled.button`
  width: 7rem;
  height: 2rem;
  color: white;
  background-color: #aea18f;
  font-size: 0.8rem;
  font-weight: bold;
  /* border: none; */
  cursor: pointer;
`;

// 해설 결과 전체 컨테이너
const ResultContainer = styled.div`
  background-color: #aea18f;
  width: 100%;
  height: 50rem;
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

  // 결과화면에 이미지 그려주기
  const renderImages = () =>
    finalResult.map((animal) => (
      <AnimalImg src={animalIndex[animal]} alt={animal} />
    ));

  // 결과 화면에 해석 보여주기
  const renderExplanation = () =>
    // 동적으로 아이디 만드는법 정리해서 포스팅하기
    finalResult.map((animal, i) => (
      <div id={`explanation${i}`}>{explanation[animal]}</div>
    ));

  //FIXME: 방법 12 jpeg로 452kb 이걸로 선택!! 용량이 2번째로 적음 1번째로적은 webp형식은 안도르이드에서 문제가 있음 해결방법을 찾으면 webp로 수정하기
  const handleShareClick12 = () => {
    html2canvas(document.querySelector('#main_capture'), {
      scale: window.devicePixelRatio,
      // FIXME: true로 설정 시 배경 이미지 포함 안됨!!!
      foreignObjectRendering: false,
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        if (navigator.share) {
          navigator
            .share({
              title: '동물성격유형테스트',
              text: 'https://limhada.com/',
              // 생성된 Blob 객체를 files에 전달
              files: [new File([blob], 'image.jpg', { type: 'image/jpeg' })],
            })
            .then(() => console.log('이미지 공유 완료'))
            .catch((error) => console.error('이미지 공유 실패: ', error));
        } else {
          console.log('이미지 공유 기능을 지원하지 않는 브라우저입니다.');
        }
      }, 'image/jpeg');
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
            {/* 결과 이미지 */}
            <div>{renderImages()}</div>

            <ShareResultsbutton onClick={handleShareClick12}>
              결과 공유하기
            </ShareResultsbutton>
            <Link to="explanation0" smooth={true} offset={-300} duration={500}>
              <ShareResultsbutton>결과로 이동</ShareResultsbutton>
            </Link>
          </Content>
          {/* 해설내용 */}
          {/* 중괄호 두번쓰는 이유 : 스타일 속성 값으로 JavaScript 객체를 사용하려면, 객체 리터럴 문법으로 작성된 객체를 중괄호로 감싸야 합니다. 이때, 중괄호는 객체 리터럴을 JSX에서 인식하도록 하는 역할을 하기 때문에 두 번 사용됩니다. */}
          {/* #으로 색을 표현하는 것을 Hexadecimal Color 또는 Hex Color라고 부릅니다. 이는 16진수 값으로 표현된 RGB 색상 값을 나타내며, CSS에서 가장 일반적으로 사용되는 색상 표현 방법 중 하나 */}
          {/* #으로 시작하는 문자열은 CSS에서 색상을 표현할 때 사용됩니다. 하지만, React에서 JSX 문법을 사용할 때는 #으로 시작하는 숫자를 직접 사용할 수 없습니다. 이는 JSX에서 중괄호({})를 사용하여 JavaScript 표현식을 삽입할 수 있는데, 중괄호 내부에서 #으로 시작하는 숫자는 JavaScript에서 잘못된 표현식으로 인식되기 때문입니다.따라서, JSX에서 CSS 색상 값을 지정할 때는 # 대신에 rgb(), rgba(), hsl(), hsla()와 같은 CSS 색상 함수를 사용하거나, CSS에서 지정 가능한 색상 이름을 사용해야 합니다. */}
          <ResultContainer>{renderExplanation()}</ResultContainer>
        </>
      )}
    </Container>
  );
};

export default QuestionContainer;

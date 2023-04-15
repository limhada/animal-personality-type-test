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

// 배경 설정
const Container = styled.div`
  /* width: 1000px;
  height: 1000;
  */

  /* width: 100%;
  height: 100vh;
  background-image: url(${배경_숲});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; */

  width: 100vw;
  height: 100vh;
  background-image: url(${배경_숲});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  // 배경 이미지가 스크롤되지 않고 화면에 고정
  background-attachment: fixed;
`;

// const Backround = styled.div`
//   background-image: url(${배경_숲});
//   width: 1000px;
//   height: 1000px;
//   background-repeat: no-repeat;
//   background-position: top center;
//   background-size: cover;
//   background-attachment: fixed;
// `;

const QuestionsContent = styled.div`
  // FIXME:  모바일의 경우 버튼을 ㅁㅁㅁㅁㅁ 이런식으로 가로로 배치하면 불편할것 같음 = 이런식으로 세로로 버튼이 있는게 좋을 것 같기도 함 고민해보기

  // 비활성화 해야 됨
  display: flex;
  // 버튼을 세로로 =이런식으로 정렬
  flex-direction: column;
  // 가로 정렬
  /* justify-content: center; */

  // 세로정렬 답변버튼 가운데 정렬
  align-items: center;

  // 질문과 버튼이 담긴 박스의 배경색
  /* background-color: #4122; */

  // 하위 모든 자식 요소에 적용
  /* & > * {
    flex: 1;
  } */
`;
// const Background = styled.div`
//   /* background-image: rul(${배경_숲}); */

//   // 배경 이미지 반복 x

//   display: flex;
//   flex-direction: column;
//   // 가로 정렬
//   justify-content: center;
//   // 세로정렬
//   align-items: center;

//   // 글자 색
//   /* color: #1b3b30; */
//   width: 100%;
//   height: 100%;
//   /* height: 1000px; */
// `;

// 동물 이미지가 들어있는 컴포넌트
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  width: 100%;
  height: 100%;
`;

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

  // 총 결과값인 [ 1, 2.5, 3, 2, 5] 가 들어있는 배열
  // console.log('이건 언제 실행되나', result);

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

  // function getImageSrc(value) {
  // min: 4.25, max: 6 에서 max값을 5로해서 에러가 났었음
  const 동물 = [
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
  // let animal = 동물.find((item) => value >= item.min && value < item.max);
  // return animal ? animal.name + '.jpeg' : '';
  // }
  // let imageSrc = getImageSrc(result[0]);

  // FIXME: 수정하기
  // FIXME: 수정하기
  // FIXME: 수정하기
  let finalResult = result.map((value, index) => {
    let animalType = 동물.find((animal) => animal.id === index);
    let animalContent = animalType.content.find(
      (content) => value >= content.min && value < content.max,
    );
    // FIXME: 수정하기 확인하고
    // return animalContent ? animalContent.name : 'Not found';
    return animalContent ? animalContent.name : '';
  });

  // FIXME: 지울거 근데 마지막에 .name을 붙이면 될때도 있고 안될때도 있음 해결해보던가 지우우고 바로 위 코드로 사용하기
  // let finalResult = result.map((value, index) => {
  //   let animalType = 동물.find((animal) => animal.id === index);
  //   let animalName = animalType.content.find(
  //     (content) => value >= content.min && value < content.max,
  //   ).name; // 이부분에 마지막에 .name를 하지 않으면 인덱스에 해당하는 객체를 통째로 가져옴 name min max가 다들어있음
  //   return animalName;
  // });

  // 최종결과의 neme만 들어있는 변수
  // console.log(finalResult);

  // FIXME: 수정할거!!
  // FIXME: 수정할거!! 확인하고 지우기
  // images 배열은 이미지 파일의 경로를 저장
  // const images = finalResult.map(
  //   (name) => require(`../assets/img/${name}.jpeg`).default,
  // );

  // FIXME: 수정할거!!
  // FIXME: 수정할거!!확인하고 지우기
  // let images = [];
  // if (finalResult.every((element) => typeof element === NaN)) {
  //   images = finalResult.map(
  //     (name) => require(`../assets/img/${name}.jpeg`).default,
  //   );
  // }
  // // 이 배열을 <img> 태그의 src 속성에 지정하여 이미지를 렌더링할 수 있습니다.
  // const imageElements = images.map((image) => <img src={image} alt="" />);

  // console.log(images, imageElements, '확인중');

  // FIXME: 수정할거!!
  // FIXME: 수정할거!!
  // FIXME: 수정할거!!

  // const renderImages = () =>
  //   finalResult.map((animal) => {
  //     const imagePath = `../assets/img/${animal}.jpeg`;
  //     return (
  //       <div>
  //         <img src={imagePath} alt={animal} />
  //       </div>
  //     );
  //   });

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

  const AnimalImg = styled.img`
    /* flex-basis: 0; */
    width: 7rem;
    height: 7rem;
  `;

  const renderImages = () =>
    finalResult.map((animal) => (
      <AnimalImg src={animalIndex[animal]} alt={animal} />
    ));

  // FIXME: 실패코드
  // const animalIndex2 = {
  //   고슴도치: require('../assets/img/고슴도치.jpeg').default,
  //   고양이: require('../assets/img/고양이.jpeg').default,
  //   곰: require('../assets/img/곰.jpeg').default,
  //   나무늘보: require('../assets/img/나무늘보.jpeg').default,
  //   당나귀: require('../assets/img/당나귀.jpeg').default,
  //   독수리: `${require('../assets/img/독수리.jpeg').default}`,
  //   랫서팬더: require('../assets/img/랫서팬더.jpeg').default,
  //   벌새: require('../assets/img/벌새.jpeg').default,
  //   악어: require('../assets/img/악어.jpeg').default,
  //   알파카: require('../assets/img/알파카.jpeg').default,
  //   앵무새: require('../assets/img/앵무새.jpeg').default,
  //   원숭이: require('../assets/img/원숭이.jpeg').default,
  //   코끼리: require('../assets/img/코끼리.jpeg').default,
  //   코알라: require('../assets/img/코알라.jpeg').default,
  //   토끼: require('../assets/img/토끼.jpeg').default,
  // };
  // const renderImages2 = () =>
  // finalResult.map((animal) => (
  //   <div>
  //     <img src={animalIndex2[animal]} alt={animal} />
  //   </div>
  // ));

  // console.log(finalResult, '여기 확인줄!~');
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

  // let result2 = a.flatMap((aItem) => {
  //   // aItem은 a 배열의 각 요소입니다.
  //   console.log('aItem:', aItem);

  //   let filteredAnimals = 동물.filter((item) => item.id === aItem.id);
  //   // filteredAnimals는 동물 배열에서 id가 aItem의 id와 일치하는 요소들입니다.
  //   console.log('filteredAnimals:', filteredAnimals);

  //   let contents = filteredAnimals.flatMap((item) => item.content);
  //   // contents는 filteredAnimals의 각 요소의 content 속성 값들입니다.
  //   console.log('contents:', contents);

  //   let filteredContents = contents.filter(
  //     (item) => aItem.value >= item.min && aItem.value <= item.max
  //   );
  //   // filteredContents는 contents에서 value가 min~max 범위에 있는 요소들입니다.
  //   console.log('filteredContents:', filteredContents);

  //   let names = filteredContents.map((item) => item.name);
  //   // names는 filteredContents의 각 요소의 name 속성 값들입니다.
  //   console.log('names:', names);

  //   return names;
  // });

  // 답변버튼
  const AnswerButton = styled.button`
    width: 7rem;
    height: 2rem;
    // 답변 버튼 색
    background-color: #aea18f;
    /* #7e9181 레세다 그린 
    #DBD8C8
      #b3aca1
      #FAEDCD
      #E9EDC9
      #CCD5AE

    */

    // 버튼 색 그라디언효과 넣기
    /* background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); */
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

    /* 태블릿 */
    @media (min-width: 768px) and (max-width: 1023px) {
      /* 스타일 */
      font-size: 3rem;
      background-color: #667eea;
    }

    /* 데스크탑 모니터 */
    @media (min-width: 1024px) {
      /* 스타일 */
      font-size: 5rem;
      /* background-color: #522700; */
    }

    //
    background-color: #aea18f;
    // 배경 투명도
    opacity: 0.93;
    border-radius: 1rem;
    font-size: 2rem;

    /* color: #1b3b30; */
    color: white;
    /* color: #522700; */
    /* background-color: #667eea;
    background-color: #aea18f;
    background-color: #522700; */

    // top
    // FIXME: 마진을 넣을지 컴포넌트를 센터로 맞출지 생각해보기
    margin: 5rem 1rem 1rem 1rem;
    /* margin-bottom: 2rem; */
  `;

  return (
    <Container>
      {/* {console.log(questions.length)} */}
      {/* {console.log(currentQuestionIndex, currentContentIndex)}
      {console.log(userAnswers)} */}

      {/* 아직 답해야 할 질문이 남아있는 경우 */}
      {/* {!(currentQuestionIndex === questions.length-1 && currentContentIndex === questions[currentContentIndex].content.length-1) ? (   */}
      {currentQuestionIndex < questions.length ? (
        <QuestionsContent>
          {/* 현재 질문 번호 표시 */}
          {/* <h1>Question {currentQuestionIndex + 1}</h1> */}

          {/* FIXME: 확인하고 지울지 활용할지 생각해보기 */}
          {/* 타이틀을 렌더링함 없으면 그냥 빈칸으로 렌더링 */}
          {/* <h1>타이틀 = {questions[currentQuestionIndex].title}</h1> */}

          {/* questions[currentQuestionIndex].title이 있으면 화면에 title을 렌더링 함 */}
          {/* {questions[currentQuestionIndex].title && (
            <h1>타이틀 = {questions[currentQuestionIndex].title}</h1>
          )} */}

          {/* 현재 질문 내용 표시 */}

          {/* 질문 세개 한번에 다 보여주기 */}
          {/* {Object.values(questions[currentQuestionIndex].content).map(
              (question, index) => (
                <li key={index}>{question}</li>
              ),
            )} */}

          {/* 한번에 한가지 질문 */}
          {/* {questions[currentQuestionIndex].content[0]} */}

          {/* <div> */}
          {/* {questions[currentQuestionIndex].content[currentContentIndex]} */}
          {/* </div> */}

          {/* 답변 버튼 표시 */}
          {/* 초기버튼 */}
          {/* {generateButtons(5)} */}

          {/* // FIXME: 버튼 생성 버전2 */}
          {/* <div> */}
          <Question>
            {questions[currentQuestionIndex].content[currentContentIndex]}
          </Question>
          {buttonNames.map((name, index) => (
            <AnswerButton
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
            </AnswerButton>
          ))}
          {/* </div> */}
          {/* 여기까지 버튼 생성 버전2 */}
        </QuestionsContent>
      ) : (
        <>
          {/* 결과 페이지 제목 */}

          {/* <h2>Answers:</h2> */}

          {/* FIXME: 사용자가 선택한 모든 결과값을 나타냄 화면에 렌더링 할 필요는 없음 */}
          {/* {userAnswers.map((answer, index) => (
              //  <li> 태그에 전달된 answer 변수에는 userAnswers 배열의 각 답변 값이 포함되며, 이는 목록 항목의 텍스트 콘텐츠로 표시
              <li key={index}>{answer}</li>
            ))} */}

          {/* FIXME: 확인하고 지우기! */}
          {/* 최종 반환값 - 5개 카테고리별 평균값 */}
          {/* {`결과 = ${result}`} */}

          {/* <img src={imageSrc} alt="animal" />; */}

          {/* result의 각 요소에 대응하는 동물 ex) result에서 외향성 값이 4 라면 곰 name: '곰', min: 3.25, max: 4.25 } */}
          {/* result에 대응하는 동물이름이 들어있는 배열 */}
          {/* {finalResult} */}

          {/* <div>{imageElements}</div> */}
          {/* TODO: 지울거 */}
          {/* <img src={require('../assets/img/고슴도치.jpeg').default} alt="hedgehog" style={{width: '100px', height: '100px'}}/> */}
          {/* <img src={고슴도치} alt="고슴도치" /> */}

          {/* TODO: 성공코드!! 동물 이미지 렌더링 */}

          <Content>
            <h1> 나의 성격을 나타내는 동물은?! </h1>
            <div>{renderImages()}</div>
          </Content>
        </>
      )}
    </Container>
  );
};

export default QuestionContainer;

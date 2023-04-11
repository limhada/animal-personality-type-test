import React, { useState } from 'react';
import styled from 'styled-components';

// TODO: sum값을 각 항목별로 저장하고 1번에서 2번으로 넘어가면 체크박스랑 sum값 초기화 시키기 체크박스만 초기화 하면 sum값도 초기화 될듯?
// FIXME: 크기 수정
const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1b3b30;
  color: white;
  width: 700px;
`;

const Checkbox = () => {
  const [checkedIndex, setCheckedIndex] = useState(null);
  const [sum, setSum] = useState(0);

  // 변경 전
  // const handleChekboxChange = (index) => {
  //   setCheckedIndex(index);
  //   if (index >= 0) {
  //     // 확인란 1이 선택되어 있으면 인덱스 + 1
  //     setSum(index + 1);
  //   } else {
  //     setSum(sum);
  //   }
  // };
  // 변경 후 체크박스 체크 해제 가능!
  const handleChekboxChange = (index) => {
    if (checkedIndex === index) {
      setCheckedIndex(null);
      setSum(0);
    } else {
      setCheckedIndex(index);
      setSum(index + 1);
    }
  };

  return (
    <div>
      <CheckboxContainer>
        {[...Array(5)].map((_, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={checkedIndex === index}
              onChange={() => handleChekboxChange(index)}
            />
            <label>Checkbox {index + 1}</label>
          </div>
        ))}
      </CheckboxContainer>
      <p>Sum: {sum}</p>
    </div>
  );
};

export default Checkbox;

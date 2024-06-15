// "use client";
// import React, { useState } from "react";
// import styled from "styled-components";
// import useCounter from "./hooks/useCounter";

// function page() {
//   const fruits = [
//     { text: "복숭아", value: 0 },
//     { text: "레몬", value: 1 },
//     { text: "사과", value: 2 },
//   ];
//   const [selectedFruit, setSelectedFruit] = useState<number | null>(null);
//   const onChangeRadio = (e: any) => {
//     let number = Number(e.target?.value);
//     setSelectedFruit(number);
//   };

//   const count = useCounter();

//   return (
//     <>
//       <div>
//         <button name="increase" id="increase" onClick={count.increase}>
//           증가 버튼
//         </button>
//       </div>
//       <div>
//         <button name="decrease" id="decrease" onClick={count.decrease}>
//           감소 버튼
//         </button>
//       </div>
//       현재 카운트 : {count.count}
//       <RadioWrap>
//         {fruits.map((fruit, idx) => (
//           <label key={idx}>
//             <input
//               type="radio"
//               name="fruits"
//               value={fruit.value}
//               onChange={onChangeRadio}
//               checked={idx === selectedFruit}
//             />
//             <span
//               className="fruit"
//               style={{
//                 border:
//                   idx === selectedFruit
//                     ? "1px solid pink"
//                     : "1px solid lightgray",
//                 backgroundColor: idx === selectedFruit ? "pink" : "lightgray",
//               }}>
//               {fruit.text}
//             </span>
//           </label>
//         ))}
//       </RadioWrap>
//       <TestRadioCustomWrap>
//         <div className="wrap">
//           <label htmlFor="email_radio">이메일</label>
//           <input
//             value="email"
//             name="contact"
//             type="radio"
//             id="email_radio"
//             defaultChecked
//           />
//         </div>
//         <div className="wrap">
//           <label htmlFor="phone_radio">전화</label>
//           <input value="phone" name="contact" type="radio" id="phone_radio" />
//         </div>
//         <div className="wrap">
//           <label htmlFor="fax_radio">팩스</label>
//           <input
//             value="fax"
//             name="contact"
//             type="radio"
//             id="fax_radio"
//             disabled
//           />
//         </div>
//         <div className="wrap">
//           <label htmlFor="mail_radio">우편</label>
//           <input value="mail" name="contact" type="radio" id="mail_radio" />
//         </div>
//       </TestRadioCustomWrap>
//     </>
//   );
// }

// export default page;

// const TestRadioCustomWrap = styled.fieldset`
//   display: flex;

//   .wrap {
//     display: flex;
//     align-items: center;
//     margin-right: 12px;
//   }

//   label {
//     font-size: 20px;
//     line-height: 2rem;
//     padding: 0 4px;
//   }

//   label:hover {
//     cursor: pointer;
//   }

//   [type="radio"] {
//     appearance: none;
//     border: 1px solid gray;
//     border-radius: 50%;
//     width: 1.25rem;
//     height: 1.25rem;
//     /* transition: outline 0.5s ease-in-out; */
//   }

//   [type="radio"]:checked {
//     /* border: 4px solid #ffa520; */
//     background: #ffa520;

//     /* outline 속성은 요소 주위에 테두리 형태의 외곽선을 추가하는 데 사용된다. */
//     outline: 2px solid #fff;
//     outline-offset: -4px;
//   }

//   /* 키보드로 포커스를 변경했을 때 보여지는 css. 클릭했을 때는 보이지 않는다. */
//   [type="radio"]:focus-visible {
//     outline: 2px dotted tomato;
//     outline-offset: 2px;
//   }

//   /* 라디오버튼에 커서를 가져다 대었을 때 css */
//   [type="radio"]:hover {
//     box-shadow: 0 0 0 4px yellowgreen;
//     cursor: pointer;
//   }

//   /* 선택할 수 없는 라디오 버튼의 css */
//   [type="radio"]:disabled {
//     background: lightgray;
//     box-shadow: none;
//     cursor: not-allowed;
//     opacity: 0.5;
//   }
// `;

// const RadioWrap = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   margin-top: 30px;

//   input {
//     border: 0;
//     clip: rect(0 0 0 0);
//     height: 1px;
//     margin: -1px;
//     overflow: hidden;
//     padding: 0;
//     position: absolute;
//     width: 1px;
//   }
//   .fruit {
//     border: 1px solid red;
//     height: 30px;
//     line-height: 30px;
//     border-radius: 5px;
//     font-size: 14px;
//     background-color: #fafafa;
//     margin: 4px;
//     text-align: center;
//     padding: 4px 16px;
//   }
// `;

export default function page() {
  return null;
}

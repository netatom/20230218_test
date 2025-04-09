import { useState, useMemo, useCallback } from "react";

const calAverage = numbers => {
    if (numbers.length === 0) {
        return 0;
    } else {
        const sum = numbers.reduce((a, b) => a + b);
        const result = sum / numbers.length;
        return result;
    }
  };
  
  const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState(``);
   
    // const onNumber = e => {
    //   setNumber(e.target.value);
    // };

    const onNumber = useCallback(e => {
        setNumber(e.target.value);
      },[]);

    // const onInsert = e => {
    //   const nextList = list.concat(parseInt(number));
    //   setList(nextList);
    //   setNumber(``);
    // };

    const onInsert = useCallback(e => {
      const nextList = list.concat(parseInt(number) || 0); // 숫자가 아니면 0으로 입력
      setList(nextList);
      setNumber(``);
    },[number])

    const avg = useMemo(() => calAverage(list), [list]); // useMemo 사용
   
    return (
      <div>
        <input value={number} onChange={onNumber} />
        <button onClick={onInsert}>등록</button>
        <ul>
          {list.map((value, index) => (
            <li key={index}>입력값: {value}</li>
          ))}
        </ul>
        <div>
          {/* <b>평균값:</b> {calAverage(list)} */}
          <b>평균값:</b> {avg}
        </div>
      </div>
    );
  };
  
  export default Average;
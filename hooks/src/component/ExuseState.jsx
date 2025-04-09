import { useState } from "react";

const Info = () => {
  const [name, settingName] = useState(``);
  const [nickname, setttingNickname] = useState(``);
 
  const onChangeName = e => {
    settingName(e.target.value );
  };
 
  const onChangeNickname = e => {
    setttingNickname(e.target.value);
  };
 
  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
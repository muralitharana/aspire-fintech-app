import React, {useState} from 'react';

const useToggleState = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  function toggling() {
    setToggle(prev => !prev);
  }
  return {toggle, toggling};
};

export default useToggleState;

import React, {useState} from 'react';

const useToggleState = (initialState = false) => {
  const [toggle, setToggle] = useState<boolean>(initialState);

  function toggling() {
    setToggle(prev => !prev);
  }
  return {toggle, toggling};
};

export default useToggleState;

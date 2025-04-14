import React, {useState} from 'react';

const useToggleState = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  return {toggle, setToggle};
};

export default useToggleState;

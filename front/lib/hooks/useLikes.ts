import { useState, useEffect } from 'react';
import { putLike, putRemoveLike } from '../api/putLike';

export const useLikes = (id: number, num: number) => {
  const [displayNum, setDisplayNum] = useState<number>(num ? num : 0);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleClick = (checked: boolean) => {
    if (checked) {
      setDisplayNum(displayNum + 1);
      putLike(id);
    } else {
      setDisplayNum(displayNum - 1);
      putRemoveLike(id);
    }
    setIsChecked(checked);
  };

  useEffect(() => {
    if (num) setDisplayNum(num);
  }, [num]);

  return { displayNum, isChecked, handleClick };
};

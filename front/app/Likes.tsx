import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

type Props = {
  num: number;
  handleLike: () => void;
  handleRemoveLike: () => void;
};

export default function Likes({ num, handleLike, handleRemoveLike }: Props) {
  const [displayNum, setDisplayNum] = useState<number>(num);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleClick = (checked: boolean) => {
    if (checked) {
      setDisplayNum(displayNum + 1);
      handleLike();
    } else {
      setDisplayNum(displayNum - 1);
      handleRemoveLike();
    }
    setIsChecked(checked);
  };
  const textColor = isChecked ? 'text-white' : 'text-slate-400';
  const bgColor = isChecked ? 'bg-red-500' : 'bg-slate-200';

  return (
    <label
      className={`${bgColor} ${textColor} flex w-fit items-center gap-1 rounded-lg pl-2 pr-2`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => handleClick(e.target.checked)}
        className="sr-only"
      />
      <FontAwesomeIcon icon={faHeart} />
      <p className="font-semibold">{displayNum}</p>
    </label>
  );
}

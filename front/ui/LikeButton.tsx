import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useLikes } from '@/lib/hooks/useLikes';

type Props = {
  id: number;
  num: number;
};

export default function LikeButton({ id, num }: Props) {
  const { displayNum, isChecked, handleClick } = useLikes(id, num);

  const textColor = isChecked ? 'text-white' : 'text-slate-400';
  const bgColor = isChecked ? 'bg-red-500' : 'bg-slate-200';

  return (
    <label
      className={`${bgColor} ${textColor} flex w-fit items-center gap-1 rounded-lg pl-2 pr-2 transition-all`}
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

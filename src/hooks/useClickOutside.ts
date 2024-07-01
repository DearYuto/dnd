import { useEffect } from 'react';

const isClickInsideColumnOrItem = (target: HTMLElement): boolean => {
  return Boolean(target.closest('.column')) || Boolean(target.closest('.item'));
};

export const useClickOutside = (callback: () => void) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const target = e.target as HTMLElement;

      if (isClickInsideColumnOrItem(target)) return;

      callback();
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [callback]);
};

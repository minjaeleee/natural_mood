import { useEffect } from 'react';

export const useKeyEscClose = (closeThing) => {
  useEffect(() => {
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        closeThing();
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

import { useEffect } from 'react';

export const useKeyEscClose = (closeFunction: ()=>void) => {

  useEffect(() => {
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        closeFunction()
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

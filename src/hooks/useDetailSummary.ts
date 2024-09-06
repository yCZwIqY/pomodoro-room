import { useCallback, useState } from 'react';

export const useDetailSummary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = useCallback((e) => {
    setIsOpen(e.target.open);
  }, []);

  return [isOpen, onToggle];
};

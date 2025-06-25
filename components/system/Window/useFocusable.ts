import { useProcesses } from 'contexts/process';
import { useSession } from 'contexts/session';
import { useCallback, useEffect, useMemo } from 'react';

type Focusable = {
  onBlur: (event: React.FocusEvent<HTMLElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLElement>) => void;
  tabIndex: number;
  zIndex: number;
};

const useFocusable = (
  id: string,
  windowRef: React.MutableRefObject<HTMLElement | null>
): Focusable => {
  const { foregroundId, setForegroundId, setStackOrder, stackOrder } =
    useSession();
  const {
    processes: { [id]: { minimized = false, taskbarEntry = undefined } = {} }
  } = useProcesses();
  const zIndex = useMemo(
    () => stackOrder.length + (minimized ? 1 : -stackOrder.indexOf(id)) + 1,
    [id, minimized, stackOrder]
  );
  const isForeground = useMemo(() => id === foregroundId, [foregroundId, id]);
  const onBlur = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      const { relatedTarget } = event;
      if (isForeground && relatedTarget !== taskbarEntry) setForegroundId('');
    },
    [isForeground, setForegroundId, taskbarEntry]
  );
  const moveToFront = useCallback(
    (event?: React.FocusEvent<HTMLElement>) => {
      const relatedTarget = event?.relatedTarget;
      if (windowRef.current?.contains(document.activeElement)) {
        setStackOrder((currentStackOrder) => [
          id,
          ...currentStackOrder.filter((stackId) => stackId !== id)
        ]);
        setForegroundId(id);
      } else if (!relatedTarget || document.activeElement === taskbarEntry) {
        windowRef.current?.focus();
      }
    },
    [id, setForegroundId, setStackOrder, taskbarEntry, windowRef]
  );

  useEffect(() => {
    if (isForeground) moveToFront();
  }, [isForeground, moveToFront]);

  useEffect(moveToFront, [moveToFront]);

  return {
    onBlur,
    onFocus: moveToFront,
    tabIndex: -1,
    zIndex
  };
};

export default useFocusable;

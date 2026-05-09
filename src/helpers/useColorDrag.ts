import { useRef, useEffect, useCallback } from 'react'

export interface DragEvent {
  e: any;
  container: HTMLElement;
}

/**
 * A reusable hook for handling color picker dragging (sliders and squares).
 * It uses refs to avoid stale closures and listener churn, ensuring stable 
 * performance and bullet-proof interaction.
 */
export function useColorDrag(
  containerRef: React.RefObject<HTMLElement | null>,
  onDrag: (event: DragEvent) => void
) {
  const onDragRef = useRef(onDrag)
  onDragRef.current = onDrag
  const frameRef = useRef<number | null>(null)
  const lastEventRef = useRef<any>(null)

  const handleDrag = useCallback((e: any) => {
    // Prevent default synchronously in the event handler
    if (e.cancelable) e.preventDefault()
    
    // Always keep track of the absolute latest event
    lastEventRef.current = e.nativeEvent || e

    if (frameRef.current !== null) return

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null
      if (containerRef.current && lastEventRef.current) {
        // Use the LATEST event captured since the last frame
        onDragRef.current({ e: lastEventRef.current, container: containerRef.current })
      }
    })
  }, [containerRef])

  const handleStop = useCallback(() => {
    window.removeEventListener('mousemove', handleDrag)
    window.removeEventListener('mouseup', handleStop)
    window.removeEventListener('touchmove', handleDrag)
    window.removeEventListener('touchend', handleStop)
    
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    lastEventRef.current = null
  }, [handleDrag])

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if ('button' in e && e.button !== 0) return

    if (e.cancelable) e.preventDefault()
    
    const nativeEvent = (e as any).nativeEvent || e
    lastEventRef.current = nativeEvent
    
    if (containerRef.current) {
      onDragRef.current({ e: nativeEvent, container: containerRef.current })
    }
    
    window.addEventListener('mousemove', handleDrag)
    window.addEventListener('mouseup', handleStop)
    window.addEventListener('touchmove', handleDrag, { passive: false })
    window.addEventListener('touchend', handleStop)
  }, [handleDrag, handleStop, containerRef])

  useEffect(() => {
    return () => {
      handleStop()
    }
  }, [handleStop])

  return {
    handleMouseDown: handleStart,
    handleTouchStart: handleStart,
  }
}

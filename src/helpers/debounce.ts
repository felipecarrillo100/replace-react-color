export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null;
  const debounced = function(this: any, ...args: any[]) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  } as T & { cancel: () => void };
  debounced.cancel = () => { if (timeout) clearTimeout(timeout); timeout = null; };
  return debounced;
}

export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T & { cancel: () => void } {
  let inThrottle: boolean;
  const throttled = function(this: any, ...args: any[]) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  } as T & { cancel: () => void };
  throttled.cancel = () => { inThrottle = false; };
  return throttled;
}

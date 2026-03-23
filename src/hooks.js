import { useState, useEffect, useRef } from "react";
export function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setV(true); io.disconnect(); }
    }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, v];
}

import { useEffect, useRef } from "react";
import { LuX } from "react-icons/lu";
import "@Styles/Lightbox.css";

interface Props {
  imagelink: any;
  handlecross: any;
}

export default function Lightboximage({ imagelink, handlecross }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handlecross?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [handlecross]);

  return (
    <div
      className="parent-container"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={(e) => {
        if (e.target === e.currentTarget) handlecross?.();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="icon-btn lightbox-cross"
        onClick={handlecross}
        aria-label="Close preview"
      >
        <LuX aria-hidden />
      </button>
      <img src={imagelink} alt="Enlarged preview" className="lightbox-img" />
    </div>
  );
}

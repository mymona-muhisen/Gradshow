//---------الملف بالكامل إضافي------
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const images = [
  // "/img-1.jpg",
  // "/img-2.jpg",
  // "/img-3.jpg",
  // "/img-4.jpg",
  // "/img-5.jpg",
  "/img-6.gif",
  "/img-7.gif",
  "/img-88.gif",
];

export default function CursorAnimation() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const indexRef = useRef(0);

  const lastX = useRef(0);
  const lastY = useRef(0);  
  const [distanceThreshold, setdistanceThreshold] = useState(window.innerWidth > 900 ? 90 : 150);

const createTrail = (x, y) => {
    const img = document.createElement("img");
    img.className = "image";
    img.src = images[indexRef.current];
    indexRef.current = (indexRef.current + 1) % images.length;
    if(containerRef.current) {
      containerRef.current.appendChild(img);
    }
    gsap.set(img, { x, y, scale: 0, opacity: 0, rotation: gsap.utils.random(-20, 20) });
    
    gsap.to(img, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(img, { scale: 0.2, opacity: 0, duration: 1, ease: "power2.in", delay: 0.3, onComplete: () => { img.remove(); } });
};


useEffect(() => {
    const handleMouseMove = (e) => {
        const dx = e.clientX - lastX.current;
        const dy = e.clientY - lastY.current;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > distanceThreshold) {
            createTrail(e.clientX, e.clientY);
            lastX.current = e.clientX;
            lastY.current = e.clientY;
        }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {window.removeEventListener("mousemove", handleMouseMove);};
}, [distanceThreshold]);

  return (
    <>
    <section className="container" ref={containerRef}>
      <div className="text">
        <h1>GRADSHOW</h1>
        <p>Showcase your projects, skills, and achievements.
Connect graduates with companies through real work,
evaluations, and portfolio-based hiring.</p>
      
      <button  className="primary-btn" onClick={() => navigate("/dashboard")}>
        EXPLORE  
      </button>
    </div>
    </section>
    
    </>
  );
}
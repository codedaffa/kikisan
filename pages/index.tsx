import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Script from "next/script";
import Modal from "@/components/Modal";
import Form from "@/components/Form";
import {
  ScissorsIcon,
} from "@heroicons/react/24/solid";

const Index: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const onModalClose = () => {
    setIsModalOpen(false);
    // setIsConfettiActive(true);
  };

  useEffect(() => {
    if (isConfettiActive) {
      const duration = 10 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const frame = () => {
        const timeLeft = animationEnd - Date.now();

        (window as any).confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: Math.max(200, 500 * (timeLeft / duration)),
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2,
          },
          colors: [
            "#26ccff",
            "#a25afd",
            "#ff5e7e",
            "#88ff5a",
            "#fcff42",
            "#ffa62d",
            "#ff36ff",
          ],
          shapes: ["square", "circle"],
          gravity: randomInRange(0.4, 0.6),
          scalar: randomInRange(0.8, 1.2),
          drift: randomInRange(-0.1, 0.1),
        });

        if (timeLeft > 0) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isConfettiActive]);

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.9.3/tsparticles.confetti.bundle.min.js" />

      <Head>
        <title>Kikisan.site</title>
        <meta name="description" content="Scraping by Kikisan.site." />
      </Head>

      {isModalOpen && <Modal onClose={onModalClose} />}
      <Form />

      {/* Render your landing page content here */}
    </>
  );
};

export default Index;

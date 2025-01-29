'use client'

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Head from "next/head";
import { EffectFade } from "swiper/modules";

const timeline = [
  { year: "2023", text: "Esse ano foi quando essa pessoa resolveu aparecer na minha vida!", image: "/images/3.jpg" },
  { year: "2023", text: "Nunca imaginei que depois do nosso primeiro contato iriamos começar a passar tanto tempo juntos!", image: "/images/1.jpg" },
  { year: "2023", text: "E principalmente nos momentos em que eu mais precisava!", image: "/images/4.jpg" },
  { year: "2023", text: "Nos divertimos bastante também!", image: "/images/5.jpg" },
  { year: "2024", text: "Eae começou um outro ano, e você ainda estava lá!", image: "/images/6.jpg" },
  { year: "2024", text: "E festajamos bastante nesse...", image: "/images/7.jpg" },
  { year: "2024", text: "Em todas as datas passamos juntos.", image: "/images/8.jpg" },
  { year: "2025", text: "Nesse ano você conheceu minha família.", image: "/images/12.jpg" },
  { year: "2025", text: "E mostrou que é uma pilota de fuga", image: "/images/9.jpg" },
  { year: "2025", text: "Viajamos um pouco mais, e tudo isso me mostrou uma coisa", image: "/images/14.jpg" },
  { year: "2025", text: "Isso me fez ver o quanto eu sou feliz ao seu lado e que...", image: "/images/13.jpg" },
  { year: "2025", text: "Quando penso que não posso te amar mais, eu acabo te amando", image: "/images/15.jpg" },
  { year: "2025", text: 'Feliz Aniversário meu amor! Que todos seus sonhos se realizem! Eu vou está aqui para tentar relizar com você\n TE AMO MIL MILHÕES 💖', image: "/images/fim.jpg" },
];

export default function Home() {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonMusic, setButtonMusic] = useState(true);
  const [openImage, setOpenImage] = useState<string | null>(null); // Estado para controlar a imagem aberta

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newAudio = new Audio("/music/love-song.mp3");
      newAudio.loop = true;
      setAudio(newAudio);
      newAudio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        console.log("Autoplay bloqueado, aguardando interação do usuário.");
      });
    }
  }, []);

  const toggleMusic = () => {
    setButtonMusic(false);
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => console.log("Autoplay bloqueado!"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const closeImage = () => {
    setOpenImage(null); // Fecha a imagem quando clicada fora
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden"
      style={{
        backgroundImage: "url('/gif/estrelas.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>

      <div className="absolute inset-0 w-full h-full bg-black opacity-50 z-1" />

      <h1 className="absolute top-8 text-5xl font-bold mt-10 z-10 mb-4 sm:relative sm:top-0">Nossa História 💖</h1>

      <Swiper spaceBetween={20} slidesPerView={1} className="relative w-3/4 sm:w-1/3 mt-10 z-10 items-center justify-center">
        {timeline.map((item, index) => (
          <SwiperSlide key={index} className="relative flex flex-col items-center justify-center sm:w-1/3">
            <div className="w-full overflow-hidden rounded-lg shadow-lg bg-gray-700 flex items-center justify-center aspect-square">
              <button onClick={() => setOpenImage(item.image)}>
                <img src={item.image} alt={item.year} className="object-cover w-full h-full" />
              </button>
            </div>
            <h2 className="text-2xl font-semibold mt-4">{item.year}</h2>
            {item.text.split('\n').map((line, index) => (
              <span key={index} className="text-lg italic mt-2 text-center">
                {line}
                <br/>
              </span>
            ))}
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={toggleMusic}
        className="absolute bottom-8 sm:relative mt-6 px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition z-10 "
      >
        {isPlaying ? "Pausar Música ⏸" : "Tocar Música 🎶"}
      </button>
      {buttonMusic &&
        <button
          onClick={toggleMusic}
          className="absolute inset-0 w-full h-full opacity-0 z-20"
        >
        </button>
      }

      {/* Modal de imagem */}
      {openImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-30">
          <div className="relative">
            <img src={openImage} alt="Imagem Ampliada" className="max-w-xs max-h-3xl object-contain rounded-lg" />
            <button
              onClick={closeImage}
              className="border rounded-full border-gray-800 bg-slate-700 opacity-60 absolute top-2 right-2 text-white font-bold text-2xl p-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

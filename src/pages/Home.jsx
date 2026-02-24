import { useEffect } from "react";
import HeroSection from "../components/sections/HeroSection";
import StorySection from "../components/sections/StorySection"
import CapturedMoments from "../components/sections/CapturedMoments";

export default function Home() {
  useEffect(() => {
  document.title =
    "Wedding Photographer in Bangalore | 35 Frames Photography";

  const metaDescription = document.querySelector(
    "meta[name='description']"
  );

  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      "Best wedding photographer in Bangalore offering candid, traditional and cinematic wedding photography services."
    );
  }
}, []);

  return (
    <>
      <HeroSection />
      <StorySection />
      <CapturedMoments />
    </>
  );
}

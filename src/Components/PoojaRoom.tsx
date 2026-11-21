import ServicePage from "@Components/ServicePage/ServicePage";
import hero from "@Assets/PoojaRoom/hero.jpg";
import {
  FeaturesPoojaRoomData,
  HowWeDesignPoojaRoom,
  PoojaRoomProject,
  AccordianPoojaRoom,
} from "@Data/PoojaRoom";

export default function PoojaRoom() {
  return (
    <ServicePage
      path="/Pooja-Room"
      name="Pooja room"
      title="Crafting Tranquility in Your Pooja Room"
      titleAccent="Tranquility"
      subtitle="Elevate your spiritual sanctuary with timeless design."
      heroImage={hero}
      subject="pooja rooms"
      features={FeaturesPoojaRoomData}
      process={HowWeDesignPoojaRoom}
      gallery={PoojaRoomProject}
      faqs={AccordianPoojaRoom}
    />
  );
}

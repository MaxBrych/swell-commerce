import React from 'react'

export default function Karte() {
  return (
    <div className="px-4 md:px-8 lg:px-16 ">
      <h1 className="py-6 text-3xl font-semibold text-center">
        Lass dich Vorort beraten
      </h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2380.1903661234505!2d12.603554015768516!3d53.37564328021764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a9551f03a7d6c1%3A0x79557130cae33f59!2sM%C3%BCritzPhone!5e0!3m2!1sde!2sde!4v1679595106061!5m2!1sde!2sde"
        className="w-full h-[400px] rounded-2xl"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>
  )
}

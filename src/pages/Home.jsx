import { useEffect, useState } from "react";

export default function Home() {
  const [galleryData, setGalleryData] = useState(null);
  const [newsData, setNewsData] = useState(null);

  async function fetchData() {
    try {
      const galleryResponse = await fetch(
        "https://api.truckyapp.com/v2/wot/gallery/random"
      );
      const newsResponse = await fetch(
        "https://api.truckyapp.com/v3/rss/truckersMP"
      );
      const galleryData = await galleryResponse.json();
      const newsData = await newsResponse.json();
      setGalleryData(galleryData.response);
      setNewsData(newsData.response);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    document.title = "TCT - Home";
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <div className=" w-3/4 h-1/2 bg-white/5 border border-black rounded-2xl p-5 text-center shadow-lg shadow-white/15 mt-3">
        <h1 className="newsHeader pb-4">NEWS</h1>
        <hr />
        <p className="pt-2 pb-2 text-justify h-5/6 pr-2 overflow-auto">
          {newsData && newsData[0].description}
        </p>
        <hr />
      </div>
      <div className="flex h-1/2 w-3/4 gap-2 overflow-auto shadow-xl shadow-white/50 rounded-t-2xl">
        {galleryData &&
          galleryData.gallery.map((img) => (
            <img
              key={img.id}
              src={img.fullImageUrl}
              className="border-4 border-white/15 border-double rounded-t-2xl"
              alt="image"
              height={300}
              width={600}
            />
          ))}
      </div>
    </div>
  );
}

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
    <div className="flex flex-col gap-10 items-center">
      <div className=" w-3/4 h-2/3 bg-white/5 rounded-2xl p-5 text-center">
        <h1 className="newsHeader pb-4">NEWS</h1>
        <hr />
        <p className="pt-3 pb-3 text-justify">
          {newsData && newsData[0].description}
        </p>
        <hr />
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {galleryData &&
          galleryData.gallery.map((img) => (
            <img
              key={img.id}
              src={img.fullImageUrl}
              alt="image"
              height={300}
              width={500}
            />
          ))}
      </div>
    </div>
  );
}

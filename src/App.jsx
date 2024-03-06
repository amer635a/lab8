import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [enlargedImage, setEnlargedImage] = useState(null);

  useEffect(() => {
    // Fetch random images
    const fetchImages = async () => {
      const imageArray = [];
      for (let i = 0; i < 20; i++) {
        try {
          const response = await fetch(`https://picsum.photos/400?random=${i}`);
          if (response.ok) {
            const url = response.url;
            imageArray.push({ url });
          } else {
            console.error('Failed to fetch image:', response.status);
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
      setImages(imageArray);
    };

    fetchImages();
  }, []);

  const enlargeImage = (image) => {
    setEnlargedImage(image.url);
  };

  const closeImage = () => {
    setEnlargedImage(null);
  };

  return (
    <div>
      <div className="image-container"> {/* Container for images */}
        {images.map((image, index) => (
          <div className="thumbnail" key={index} onClick={() => enlargeImage(image)}>
            <img src={image.url} alt="Random Image" />
          </div>
        ))}
      </div>

      {enlargedImage && (
        <div className="enlarged">
          <img src={enlargedImage} alt="Enlarged Image" onClick={closeImage} />
        </div>
      )}
    </div>
  );
}

export default App;

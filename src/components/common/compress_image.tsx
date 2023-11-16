import React, { useEffect, useState } from 'react';
import { compressImage } from '~/utils/helper';
import Image from 'next/image';
const CompressImage = () => {
  const [image, setImage] = useState<any>(null);
  const [optimized, setOptimized] = useState<any>(null);

  async function imageChange(e: any) {
    const optimizedFile = await compressImage(e.target.files[0]);
    // setSelectedImage(e.target.files[0]);
    setImage(optimizedFile);
    // if (e.target.files && e.target.files.length > 0) {
    // }
  }

  async function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    const file =  e?.target?.files ? e?.target?.files[0]: null
    if(!file ) return
    const optimizedFile = await compressImage(file);
    const imgUrl = URL.createObjectURL(optimizedFile)
    setImage(imgUrl);
  }

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {/* <NextImage src={image} alt="/" width={400} height={400} /> */}
      {image && (
        <Image
          src={image}
          // style={styles.image}
          alt="Thumb"
          width={400}
          height={400}
        />
      )}
    </div>
  );
};

export default CompressImage;

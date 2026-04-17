import clsx from 'clsx';
import Container from '../../../Container';
import styles from './nature.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './swiper-custom.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Nature = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchNature = async () => {
      try {
        const request = await axios.get('https://pixabay.com/api/', {
          params: {
            key: '42150706-1b2d033081ca078debbf13082',
            q: 'nature',
            image_type: 'photo',
            category: 'nature',
          },
        });
        setImages(request.data.hits);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNature();
  }, []);
  return (
    <section className={clsx(styles.nature)}>
      <Container
        className={clsx(styles.natureContent)}
        dataAnimate="fadeInLeft"
      >
        <h2 className={clsx(styles.natureContentTitle)}>Beautiful nature</h2>
        {images.length > 0 ? (
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            observer={true}
            observeParents={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 2,
              slideShadows: true,
            }}
            modules={[Autoplay, EffectCoverflow]}
          >
            {images.slice(0, 10).map((item) => (
              <SwiperSlide key={item.id} className={styles.mySlide}>
                <img
                  src={item.webformatURL}
                  alt={item.tags}
                  className="swiperImg"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.loader}>Loading...</div>
        )}
      </Container>
    </section>
  );
};

export default Nature;

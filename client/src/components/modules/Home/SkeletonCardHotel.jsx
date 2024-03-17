import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./SkeletonCardHotel.module.css";

const HotelCardSkeleton = () => {
  return (
    <>
    <li className="flex justify-center">
      <div className={styles.hotelCard}>
        <div className={styles.imgDiv}>
          <button>
            
          </button>
        </div>

        <div className={styles.hotelDetails}>
          <div className={styles.hotelDetailsLeft}>
            <section>
              <div>
                <button></button>
              </div>
            </section>
          </div>

          <div className={styles.hotelDetailsRight}>
            <div className="h-2/3 flex justify-between"></div>

            <div className="flex justify-between pl-4">
              <p className={styles.hotelPrice}>
                <strong className="text-3xl"></strong>
              </p>
              <button className={styles.bookNowBtn}></button>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li className="flex justify-center">
      <div className={styles.hotelCard}>
        <div className={styles.imgDiv}>
          <button>
            
          </button>
        </div>

        <div className={styles.hotelDetails}>
          <div className={styles.hotelDetailsLeft}>
            <section>
              <div>
                <button></button>
              </div>
            </section>
          </div>

          <div className={styles.hotelDetailsRight}>
            <div className="h-2/3 flex justify-between"></div>

            <div className="flex justify-between pl-4">
              <p className={styles.hotelPrice}>
                <strong className="text-3xl"></strong>
              </p>
              <button className={styles.bookNowBtn}></button>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li className="flex justify-center">
      <div className={styles.hotelCard}>
        <div className={styles.imgDiv}>
          <button>
            
          </button>
        </div>

        <div className={styles.hotelDetails}>
          <div className={styles.hotelDetailsLeft}>
            <section>
              <div>
                <button></button>
              </div>
            </section>
          </div>

          <div className={styles.hotelDetailsRight}>
            <div className="h-2/3 flex justify-between"></div>

            <div className="flex justify-between pl-4">
              <p className={styles.hotelPrice}>
                <strong className="text-3xl"></strong>
              </p>
              <button className={styles.bookNowBtn}></button>
            </div>
          </div>
        </div>
      </div>
    </li>
    </>
  );
};

export default HotelCardSkeleton;

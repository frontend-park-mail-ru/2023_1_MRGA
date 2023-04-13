import {User} from "@/store/user";
import {Tinder} from "@/api/api";
import styles from './recommendProfile.module.css'

import photoDot from "assets/svg/photoDot.svg"

import prevPhotoArrow from "assets/svg/prevPhotoArrow.svg"

import nextPhotoArrow from "assets/svg/nextPhotoArrow.svg"
import locationPoint from "assets/svg/locationPoint.svg"

import dislike from "assets/svg/dislike.svg"
import like from "assets/svg/like.svg"

import woman from "assets/img/woman.png";

import {Link} from "@/lib/jsx/components/link/link";
import {useRef} from "@/lib/jsx/hooks/useRef";




export const RecommendProfile = () => {
    return (
        <div className={styles.content}>
            <div className={styles.avatarSide}>
                <img className={styles.avatar} src={woman} alt=""/>
                    <div className={styles.avatarShadow}>
                        <a className={styles.swipeBtn} href="#" style="margin-right: 16px;">
                            <img src={dislike}></img>
                        </a>
                        <a className={styles.swipeBtn} href="#">
                            <img src={like}></img>
                        </a>
                    </div>

                    <div className={styles.photoDots}>
                        {/*<div className={[styles.name, styles.photoDot, styles.photoDot].join(' ')}> пример стилей  </div>*/}
                    {/*    user.photos.map(photo => {*/}
                    {/*    <img src={photoDot} onClick={"поставь фотку эту"}></img>*/}
                    {/*});*/}
                        <img src={photoDot} className={styles['photo-dot']}></img>
                        <img src={photoDot} className={styles['photo-dot']}></img>
                        <img src={photoDot} className={styles['photo-dot']}></img>
                        <img src={photoDot} className={styles['photo-dot']}></img>
                        <img src={photoDot} className={styles['photo-dot']}></img>
                        <img src={photoDot} className={styles['photo-dot']}></img>
                    </div>


                    <Link href="/" style="
                        position: absolute;
                        left: 8px;
                        ">
                        <img src={prevPhotoArrow}></img>

                    </Link>

                    <Link href="/" style="
                        position: absolute;
                        right: 8px;
                        ">
                        <img src={nextPhotoArrow}></img>
                    </Link>
            </div>
            <div className={styles.descSide}>
                <div className={styles.desc}>
                    <div className={styles.name}>Анастасия, 23</div>
                    <div className={styles.distance}>
                        <Link src={locationPoint}></Link>
                        8 км от Вас
                    </div>
                    <div className={styles.descField}>
                        <div className={styles.descText}>
                            23 года, дизайнер из Санкт-Петербурга
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium,
                                corporis cumque deleniti eaque ex excepturi fuga inventore, iste nam nulla officiis
                                praesentium, quas quis recusandae sapiente sed vel voluptatum?
                        </div>

                        <div className={styles.descTags}>
                            <div className={styles.tag}>йога</div>
                            <div className={styles.tag}>дизайн</div>
                            <div className={styles.tag}>плавание</div>
                            <div className={styles.tag}>фигурное катание</div>
                            <div className={styles.tag}>теннис</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import {User} from "@/store/user";
import {Tinder} from "@/api/api";
import styles from './recommendProfile.module.css'


export const RecommendProfile = () => {
    return
    (<>
        <div className={styles.content}>
            <div className={styles.avatarSide}>
                <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
                    <div className={styles.avatarShadow}>
                        <a className={styles.swipeBtn} href="#" style="margin-right: 16px;">
                            <object data="../../../assets/svg/dislike.svg"></object>
                        </a>

                        <a className={styles.swipeBtn} href="#">
                            <object data="../../../assets/svg/like.svg"></object>
                        </a>
                    </div>

                    <div className={styles.photoDots}>
                        <object data="../../../assets/svg/photoDot.svg"></object>
                        <object data="../../../assets/svg/photoDot.svg"></object>
                        <object data="../../../assets/svg/photoDot.svg"></object>
                        <object data="../../../assets/svg/photoDot.svg"></object>
                        <object data="../../../assets/svg/photoDot.svg"></object>
                        <object data="../../../assets/svg/photoDot.svg"></object>
                    </div>


                    <a href="#" style="
                        position: absolute;
                        left: 8px;
                        ">
                        <object data="../../../assets/svg/prevPhotoArrow.svg"></object>

                    </a>

                    <a href="#" style="
                        position: absolute;
                        right: 8px;
                        ">
                        <object data="../../../assets/svg/nextPhotoArrow.svg"></object>
                    </a>
            </div>
            <div className={styles.descSide}>
                <div className={styles.desc}>
                    <div className={styles.name}>Анастасия, 23</div>
                    <div className={styles.distance}>
                        <object data="../../../assets/svg/locationPoint.svg"></object>
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
    </>
    )
}
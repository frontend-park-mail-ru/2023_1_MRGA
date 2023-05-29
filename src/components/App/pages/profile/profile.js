import {HeaderAuth} from "components/App/header/header";
import {PageContainer} from "components/UI/containers/pageContainer/pageContainer";
import {SideBar} from "components/App/sideBar/sideBar";
import {getUser, userStore} from "@/store/user";
import {ProfileEditForm} from "components/App/profileEditForm/profileEditForm";

export const ProfilePage = () => {
    return (
        <>
            <HeaderAuth/>
            <PageContainer>
                <SideBar current={'/profile'}/>
                <ProfileEditForm/>
            </PageContainer>
        </>
    )
}

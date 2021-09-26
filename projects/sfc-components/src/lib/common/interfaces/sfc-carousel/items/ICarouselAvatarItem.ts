import IAvatarInfo from "../../sfc-avatar/IAvatarInfo";

export default interface ICarouselAvatarItem{
    avatarInfo: IAvatarInfo; 
    progress: number; 
    showStars: boolean; 
    radius: number;
}
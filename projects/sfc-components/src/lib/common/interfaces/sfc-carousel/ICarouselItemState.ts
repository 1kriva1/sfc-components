export default interface ICarouselItemState{
    // is newwly created - for animation purpose
    created?:boolean;

    // when item will be removed from carousel
    removed?:boolean;

    // is hidden item - for carousel with less than 3 items
    hidden?:boolean;
}
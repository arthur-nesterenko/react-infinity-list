export function topPosition(element : any) : number {
    if(!element) {
        return 0;
    }
    return element.offsetTop + topPosition(element.offsetParent);
}

export function leftPosition(element : any) : number {
    if(!element) {
        return 0;
    }
    return element.offsetLeft + leftPosition(element.offsetParent);
}
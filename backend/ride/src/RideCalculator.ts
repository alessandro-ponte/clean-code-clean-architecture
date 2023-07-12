// @ts-nocheck
export function isOvernight (segment) {
    return segment.date.getHours() >= 22 || segment.date.getHours() <= 6;
}

export function isSunday (segment) {
    return segment.date.getDay() == 0;
}
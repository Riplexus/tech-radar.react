export default function mulberry32(a) {
    return function() {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1); // eslint-disable-line
        t ^= t + Math.imul(t ^ t >>> 7, t | 61); // eslint-disable-line
        return ((t ^ t >>> 14) >>> 0) / 4294967296; // eslint-disable-line
    }
};
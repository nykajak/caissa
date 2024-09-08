export function get_square(notation){
    // Returns [row,col] / square representation of notated square
    return [8 - parseInt(notation[1]), notation.charCodeAt(0) - "a".charCodeAt(0)];
}

export function get_notation(square){
    // Returns notated square representation of [row,col] / square.
    return String.fromCharCode(97 + square[1]) + (8 - square[0]);
}
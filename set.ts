function union<T>(lhs: Set<T>, rhs: Set<T>): Set<T> {
    let res = new Set(lhs);
    for (const elem of rhs) {
        res.add(elem);
    }
    return res;
}
export default union;

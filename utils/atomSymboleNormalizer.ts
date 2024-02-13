
export function normalizeAtomSymbole(atomSymb: string) {
    return atomSymb.charAt(0).toUpperCase()
        + atomSymb.slice(1).toLowerCase();
}

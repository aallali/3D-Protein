export type TAtom = {
    "element": string;
    "name": string;
    "x": number;
    "y": number;
    "z": number
}
export type TAtoms = TAtom[]

export type TConnector = number[]
export type TConnectors = TConnector[]

export interface TPDB {
    atoms: TAtoms,
    connectors: TConnectors
}

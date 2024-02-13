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

export enum AtomShape {
    Sphere = 'sphere',
    Box = 'box',
    Icosahedron = 'icosahedron',
    Dodecahedron = 'dodecahedron',
}

export enum Colors {
    Default = 'default',
    Silver = '#c0c0c0',
    Black = 'black',
    LightGrey = '#d3d3d3',
    Peach = '#ffefd5',
    LightOrange = '#f8b878',
    White = 'white',
    None = 'none',
    Yellow = 'yellow',
    Blue = 'blue',
    Brown = 'Brown'
}

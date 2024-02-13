/**
 * 
 * @param children : element to render on condition
 * @param c : a boolean value to verify before render children
 * @returns 
 */
export default function Vif({ children, c }: { children: any, c: boolean }) {
    return c ? children : null
}

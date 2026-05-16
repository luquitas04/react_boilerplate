import type { Product } from "../types";
interface Props {
    product: Product;
    disabled: boolean;
    onClick: () => void;
}
export declare function CardButton({ product: _product, disabled, onClick }: Props): import("react/jsx-runtime").JSX.Element;
export {};

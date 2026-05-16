import { jsx as _jsx } from "react/jsx-runtime";
import { CLASS_NAMES } from "../constants";
export function CardBody({ children }) {
    return (_jsx("div", { className: CLASS_NAMES.body, children: children }));
}

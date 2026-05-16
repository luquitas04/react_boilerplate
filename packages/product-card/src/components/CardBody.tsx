import { CLASS_NAMES } from "../constants";
import type { Product } from "../types";

export function CardBody({ children }: { children: React.ReactNode; product: Product }) {
  return (
    <div className={CLASS_NAMES.body}>
      {children}
    </div>
  );
}

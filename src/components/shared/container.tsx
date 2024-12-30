import { FC, PropsWithChildren } from "react";
import clsx from "clsx";

interface ContainerProps extends PropsWithChildren {
    className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
    return (
        <div className={clsx("container max-w-7xl mx-auto px-4", className)}>
            {children}
        </div>
    );
}

export default Container;

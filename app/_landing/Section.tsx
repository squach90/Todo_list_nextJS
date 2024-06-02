import { PropsWithChildren } from "react";
import classNames from "classnames";

export type SectionProps = PropsWithChildren<{
    classNames?: string
}>

export const Section = (props: SectionProps) => {
    return (
        <section className={classNames("md:my-20 lg:my-32 max-w-2xl m-auto lg:px-6 px-4", props.classNames, "my-16")}>
            {props.children}
        </section>
    )
}
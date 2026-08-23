import type { ReactNode } from 'react';

import { cx } from '../../../utils/classNames';

export const ConfigSectionShell = ({
    className,
    children
}: {
    className?: string;
    children: ReactNode;
}) => {
    return (
        <section
            className={cx(
                'min-w-0 rounded-[14px] border border-[#30343C] bg-[#1A1C20] p-[14px]',
                className
            )}
        >
            {children}
        </section>
    );
};

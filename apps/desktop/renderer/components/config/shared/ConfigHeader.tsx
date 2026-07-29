
import { cx } from '../../../utils/classNames';

export const ConfigHeader = ({
    title,
    subtitle,
    className,
    titleClassName = 'text-[14px] font-[800] leading-none',
    subtitleClassName = 'text-[11px] font-semibold leading-none text-[#6F7784]'
}: {
    title: string;
    subtitle?: string;
    className?: string;
    titleClassName?: string;
    subtitleClassName?: string;
}) => {
    return (
        <div className={cx('grid gap-1', className)}>
            <h2 className={cx('text-[#F5F7FA]', titleClassName)}>{title}</h2>
            {subtitle ? (
                <p className={cx("font-['Geist']", subtitleClassName)}>
                    {subtitle}
                </p>
            ) : null}
        </div>
    );
};

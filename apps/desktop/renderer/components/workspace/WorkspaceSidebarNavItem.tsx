
import type { WorkspaceNavItem, WorkspaceView } from '../../types/workspace';
import { cx } from '../../utils/classNames';
import { Icon } from '../Icon';

const WorkspaceNavItemContent = ({ item }: { item: WorkspaceNavItem }) => {
    const isActive = item.tone === 'active';

    if (isActive) {
        return (
            <>
                <span className="pointer-events-none absolute left-[13px] top-[8px] h-[60px] w-[72px] rounded-full bg-[radial-gradient(circle_at_45%_45%,#FFFFFF5C_0%,#FF4DA622_44%,#FFFFFF00_100%)] opacity-[0.72] blur-[8px]" />
                <span className="absolute left-[26px] top-[18px] grid h-[46px] w-[46px] place-items-center rounded-[23px] border border-[#FFFFFF40] bg-[#FFFFFF24] text-white shadow-[0_0_18px_rgba(255,255,255,0.2)]">
                    <Icon name={item.icon} className="h-[22px] w-[22px]" />
                </span>
                <span className="absolute left-0 top-[75px] w-[98px] text-center font-['Geist'] text-[12px] font-[800] leading-none text-white">
                    {item.label}
                </span>
            </>
        );
    }

    return (
        <>
            <span className="absolute left-[28px] top-[14px] grid h-[42px] w-[42px] place-items-center rounded-[21px] border border-[#FFFFFF12] bg-[#151824CC] text-[#8D94A6] transition-all duration-200">
                <Icon
                    name={item.icon}
                    className={cx(
                        item.icon === 'house'
                            ? 'h-[20px] w-[20px]'
                            : 'h-[20px] w-[20px]'
                    )}
                />
            </span>
            <span className="absolute left-0 top-[65px] w-[98px] text-center font-['Geist'] text-[12px] font-[650] leading-none text-[#8D94A6]">
                {item.label}
            </span>
        </>
    );
};

export const WorkspaceSidebarNavItem = ({
    item,
    onSelect
}: {
    item: WorkspaceNavItem;
    onSelect?: (view: WorkspaceView) => void;
}) => {
    const isActive = item.tone === 'active';
    const className = cx(
        'relative block w-[98px] rounded-[46px] transition-all duration-200',
        isActive
            ? 'h-[108px] overflow-hidden bg-[radial-gradient(ellipse_at_28%_18%,#FFFFFF42_0%,#FFFFFF00_72%),linear-gradient(165deg,#582CFF_0%,#BF40FF_48%,#FF4DA6_100%)] shadow-[0_10px_28px_rgba(191,64,255,0.4),0_0_16px_rgba(255,77,166,0.3)]'
            : 'h-[92px] bg-transparent opacity-[0.78] hover:bg-white/4 hover:opacity-100'
    );

    const view = item.view;

    if (view) {
        return (
            <button
                type="button"
                aria-current={isActive ? 'page' : undefined}
                className={cx(
                    className,
                    'cursor-pointer appearance-none border-0 p-0 text-left'
                )}
                onClick={() => onSelect?.(view)}
            >
                <WorkspaceNavItemContent item={item} />
            </button>
        );
    }

    if (item.href) {
        return (
            <a
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={className}
            >
                <WorkspaceNavItemContent item={item} />
            </a>
        );
    }

    return (
        <div className={className}>
            <WorkspaceNavItemContent item={item} />
        </div>
    );
};

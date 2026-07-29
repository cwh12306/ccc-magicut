
import { cx } from '../../../utils/classNames';

export const ConfigToggleRow = ({
    onToggle,
    label,
    enabled
}: {
    enabled: boolean;
    label: string;
    onToggle?: () => void;
}) => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-[11px] font-[700] text-[#F5F7FA]">
                {label}
            </span>
            <button
                type="button"
                aria-pressed={enabled}
                onClick={onToggle}
                className={cx(
                    'relative h-[28px] w-[48px] rounded-full transition-all duration-200',
                    enabled ? 'bg-[#F05F73]' : 'bg-[#30343C]'
                )}
            >
                <span
                    className={cx(
                        'absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white transition-all duration-200',
                        enabled ? 'left-[23px]' : 'left-[3px]'
                    )}
                />
            </button>
        </div>
    );
};

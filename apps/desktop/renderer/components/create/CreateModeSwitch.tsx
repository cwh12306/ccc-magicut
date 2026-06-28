
import type { CreateModeOption } from '../../types/create';
import { cx } from '../../utils/classNames';

export const CreateModeSwitch = ({ modes }: { modes: CreateModeOption[] }) => {
    return (
        <div className="absolute left-8 top-[34px] flex h-[58px] w-[305px] items-center gap-3 rounded-2xl border border-[#3C3B46] bg-[#22222A] p-1">
            {modes.map((mode) => (
                <span
                    key={mode.label}
                    className={cx(
                        'grid h-[50px] place-items-center rounded-[13px] text-[20px] leading-none',
                        mode.widthClassName,
                        mode.tone === 'active'
                            ? 'bg-[#4A4A55] font-[850] text-white'
                            : 'bg-[#22222A] text-[#898895] cursor-not-allowed'
                    )}
                >
                    {mode.label}
                </span>
            ))}
        </div>
    );
};

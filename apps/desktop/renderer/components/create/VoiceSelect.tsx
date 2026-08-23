import { useEffect, useId, useRef, useState } from 'react';

import type { CreateVoiceOption } from '../../types/create';
import { cx } from '../../utils/classNames';
import { Icon } from '../Icon';

type VoiceSelectProps = {
    defaultOpen?: boolean;
    labelPrefix: string;
    onChange: (value: string) => void;
    options: CreateVoiceOption[];
    value: string;
};

export const VoiceSelect = ({
    defaultOpen = false,
    labelPrefix,
    onChange,
    options,
    value
}: VoiceSelectProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxId = useId();

    useEffect(() => {
        if (!isOpen) return undefined;

        const handlePointerDown = (event: PointerEvent) => {
            if (
                event.target instanceof Node &&
                !containerRef.current?.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const selectedOption =
        options.find((option) => option.label === value) ?? options[0];

    const handleSelect = (nextValue: string) => {
        onChange(nextValue);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="relative shrink-0">
            <button
                type="button"
                aria-controls={listboxId}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label={labelPrefix}
                className="create-voice-select-trigger flex h-[58px] w-[278px] items-center justify-between gap-2.5 rounded-[14px] border border-[#6B5B80] bg-[#26262E] px-[14px] text-left text-[18px] transition-all duration-200 hover:border-[#8A77A3] hover:bg-[#2C2B35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6AF7]"
                onClick={() => setIsOpen((current) => !current)}
            >
                <span className="flex min-w-0 items-center gap-2">
                    <span className="shrink-0 font-[800] text-[#D8D5DF]">
                        {labelPrefix}
                    </span>
                    <span className="truncate font-[850] text-white">
                        {selectedOption?.label}
                    </span>
                </span>
                <Icon
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    className="h-4 w-4 shrink-0 text-[#B8B2C6]"
                />
            </button>

            {isOpen ? (
                <div
                    id={listboxId}
                    role="listbox"
                    aria-label={labelPrefix}
                    className="absolute left-0 top-[68px] z-30 grid h-[202px] w-[278px] gap-[6px] rounded-[16px] border border-[#3B3948] bg-[#1E1E27F2] p-2 shadow-[0_18px_42px_rgba(0,0,0,0.38)] backdrop-blur-[18px]"
                >
                    {options.map((option) => {
                        const isSelected = option.label === value;

                        return (
                            <button
                                key={option.label}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                className={cx(
                                    'flex h-[42px] w-full items-center justify-between gap-2.5 rounded-[11px] px-3 text-left transition-all duration-200',
                                    isSelected
                                        ? 'bg-[linear-gradient(90deg,#8B6AF7_0%,#BF40FF_55%,#F05F73_100%)] text-white shadow-[0_8px_18px_rgba(139,106,247,0.22)]'
                                        : 'bg-[#252530] text-[#E6E4EC] hover:bg-[#30303B]'
                                )}
                                onClick={() => handleSelect(option.label)}
                            >
                                <span className="grid min-w-0 gap-[3px]">
                                    <span
                                        className={cx(
                                            'truncate text-[14px] font-[850]',
                                            !isSelected && 'font-[800]'
                                        )}
                                    >
                                        {option.label}
                                    </span>
                                    <span
                                        className={cx(
                                            'truncate text-[10px] font-[650]',
                                            isSelected
                                                ? 'text-white/70'
                                                : 'text-[#8E8B99]'
                                        )}
                                    >
                                        {option.description}
                                    </span>
                                </span>
                                {isSelected ? (
                                    <Icon
                                        name="check"
                                        className="h-4 w-4 shrink-0 text-white"
                                    />
                                ) : (
                                    <span className="h-4 w-4 shrink-0" />
                                )}
                            </button>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};

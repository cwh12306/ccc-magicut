import { type ChangeEvent, type FormEvent, useState } from 'react';

import type {
    CreateAgentSubmitInput,
    CreatePageContent
} from '../../types/create';
import { cx } from '../../utils/classNames';
import { Icon } from '../Icon';

import { CreateModeSwitch } from './CreateModeSwitch';
import { VoiceSelect } from './VoiceSelect';

export const isCreateActionDisabled = ({
    disabled,
    isSelectingAssetDirectory,
    sourceAssetDirectory
}: {
    disabled: boolean;
    isSelectingAssetDirectory: boolean;
    sourceAssetDirectory: string;
}) =>
    disabled ||
    isSelectingAssetDirectory ||
    sourceAssetDirectory.trim().length === 0;

export const CreateInputPanel = ({
    content,
    disabled = false,
    onSelectAssetDirectory,
    onSubmit
}: {
    content: CreatePageContent;
    disabled?: boolean;
    onSelectAssetDirectory?: () => Promise<string | undefined>;
    onSubmit?: (input: CreateAgentSubmitInput) => void;
}) => {
    const [manuscript, setManuscript] = useState('');
    const [isSelectingAssetDirectory, setIsSelectingAssetDirectory] =
        useState(false);
    const [sourceAssetDirectory, setSourceAssetDirectory] = useState('');
    const [selectedVoice, setSelectedVoice] = useState(
        content.voiceOptions[0]?.label ?? ''
    );
    const selectedVoiceOption =
        content.voiceOptions.find((option) => option.label === selectedVoice) ??
        content.voiceOptions[0];

    const handleManuscriptChange = (
        event: ChangeEvent<HTMLTextAreaElement>
    ) => {
        setManuscript(event.target.value);
    };

    const actionDisabled = isCreateActionDisabled({
        disabled,
        isSelectingAssetDirectory,
        sourceAssetDirectory
    });

    const handleAssetDirectorySelect = async () => {
        if (disabled || isSelectingAssetDirectory || !onSelectAssetDirectory) {
            return;
        }

        setIsSelectingAssetDirectory(true);

        try {
            const selectedDirectory = await onSelectAssetDirectory();

            if (selectedDirectory) {
                setSourceAssetDirectory(selectedDirectory);
            }
        } catch {
            // Keep the current selection when the native picker cannot be opened.
        } finally {
            setIsSelectingAssetDirectory(false);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (actionDisabled) return;

        onSubmit?.({
            prompt: manuscript,
            selectedVoice,
            selectedVoiceType: selectedVoiceOption?.voiceType ?? '',
            sourceAssetDirectory
        });
    };

    return (
        <section className="relative h-[390px] w-[1340px] max-w-full overflow-visible rounded-[30px] border-2 border-[#3A3945] bg-[#1C1B24DD] shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
            <div className="pointer-events-none absolute inset-0" />
            <form className="relative z-10 h-full" onSubmit={handleSubmit}>
                <CreateModeSwitch modes={content.modes} />
                <textarea
                    aria-label={content.placeholder}
                    className="absolute left-[34px] top-[122px] h-[110px] w-[calc(100%-68px)] max-w-[960px] resize-none border-none bg-transparent p-0 text-[22px] font-normal leading-[1.35] text-[#E5E3EC] outline-none placeholder:text-[#8E8E99]"
                    maxLength={content.maxLength}
                    onChange={handleManuscriptChange}
                    placeholder={content.placeholder}
                    value={manuscript}
                />
                <p className="absolute left-[34px] top-[250px] font-['Geist'] text-[22px] font-normal text-[#9A99A4]">
                    {manuscript.length} / {content.maxLength}
                </p>
                <div
                    data-create-action-row="true"
                    className="absolute bottom-[32px] left-[42px] right-[32px] flex items-center gap-[18px]"
                >
                    <VoiceSelect
                        labelPrefix={content.voiceLabelPrefix}
                        options={content.voiceOptions}
                        value={selectedVoice}
                        onChange={setSelectedVoice}
                    />
                    <button
                        type="button"
                        aria-label="选择本地素材目录"
                        data-asset-directory-selected={
                            sourceAssetDirectory.trim().length > 0
                        }
                        disabled={
                            disabled ||
                            isSelectingAssetDirectory ||
                            !onSelectAssetDirectory
                        }
                        title={sourceAssetDirectory || undefined}
                        className={cx(
                            'flex h-[58px] min-w-0 flex-1 items-center gap-3 rounded-[14px] border bg-[#22232B] px-[16px] text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6AF7] disabled:cursor-not-allowed disabled:opacity-60',
                            sourceAssetDirectory
                                ? 'border-[#74608C] hover:border-[#9377B1] hover:bg-[#292832]'
                                : 'border-[#4A4656] hover:border-[#74608C] hover:bg-[#292832]'
                        )}
                        onClick={() => {
                            void handleAssetDirectorySelect();
                        }}
                    >
                        <span className="shrink-0 text-[16px] font-[850] text-[#D8D5DF]">
                            本地素材目录
                        </span>
                        <span
                            className={cx(
                                'min-w-0 flex-1 truncate text-[15px] font-[700]',
                                sourceAssetDirectory
                                    ? 'text-white'
                                    : 'text-[#777382]'
                            )}
                        >
                            {isSelectingAssetDirectory
                                ? '正在选择目录…'
                                : sourceAssetDirectory ||
                                  '点击选择本地视频素材目录'}
                        </span>
                        <Icon
                            name={
                                sourceAssetDirectory ? 'folder-open' : 'folder'
                            }
                            className="h-5 w-5 shrink-0 text-[#A99CBD]"
                        />
                    </button>
                    <button
                        type="submit"
                        data-agent-start-button="true"
                        disabled={actionDisabled}
                        className={cx(
                            'flex h-[58px] w-[116px] shrink-0 items-center justify-center gap-2 rounded-[14px] text-[18px] font-[800] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BF40FF]',
                            actionDisabled
                                ? 'cursor-not-allowed border border-white/5 bg-[#2A2933] text-[#777382]'
                                : 'bg-[linear-gradient(90deg,#B45CFF_0%,#D943D1_52%,#754DFF_100%)] text-white shadow-[0_10px_28px_rgba(191,64,255,0.32)] hover:brightness-110 active:scale-[0.98]'
                        )}
                    >
                        <Icon name="sparkles" className="h-[21px] w-[21px]" />
                        <span>{content.actionLabel}</span>
                    </button>
                </div>
            </form>
        </section>
    );
};

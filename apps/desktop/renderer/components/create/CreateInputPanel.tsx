
import { type ChangeEvent, type FormEvent, useState } from 'react';

import type {
    CreateAgentSubmitInput,
    CreatePageContent
} from '../../types/create';
import { Icon } from '../Icon';

import { CreateModeSwitch } from './CreateModeSwitch';
import { VoiceSelect } from './VoiceSelect';

export const CreateInputPanel = ({
    content,
    disabled = false,
    onSubmit
}: {
    content: CreatePageContent;
    disabled?: boolean;
    onSubmit?: (input: CreateAgentSubmitInput) => void;
}) => {
    const [manuscript, setManuscript] = useState('');
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

    const handleAssetDirectoryChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setSourceAssetDirectory(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
                <VoiceSelect
                    labelPrefix={content.voiceLabelPrefix}
                    options={content.voiceOptions}
                    value={selectedVoice}
                    onChange={setSelectedVoice}
                />
                <label className="absolute left-[340px] top-[300px] flex h-[58px] w-[520px] items-center gap-3 rounded-[14px] border border-[#4A4656] bg-[#22232B] px-[14px] transition-colors duration-200 focus-within:border-[#8B6AF7]">
                    <span className="shrink-0 text-[16px] font-[850] text-[#D8D5DF]">
                        本地素材目录
                    </span>
                    <input
                        aria-label="本地素材目录"
                        className="min-w-0 flex-1 bg-transparent text-[15px] font-[700] text-white outline-none placeholder:text-[#777382]"
                        disabled={disabled}
                        onChange={handleAssetDirectoryChange}
                        placeholder="粘贴本地视频素材目录"
                        value={sourceAssetDirectory}
                    />
                </label>
                <button
                    type="submit"
                    data-agent-start-button="true"
                    disabled={disabled}
                    className="absolute right-[32px] top-[313px] flex h-[45px] w-[106px] items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(90deg,#B27B8D_0%,#8C3CA7_48%,#2D39A8_100%)] text-[18px] text-[#B8A6D9] transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Icon name="sparkles" className="h-[21px] w-[21px]" />
                    <span>{content.actionLabel}</span>
                </button>
            </form>
        </section>
    );
};

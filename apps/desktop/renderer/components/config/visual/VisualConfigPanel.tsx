import { type KeyboardEvent, useState } from 'react';

import { visualConfigPanel } from '../../../constants/config';
import type { ConfigPanelContext } from '../../../types/config';
import { Icon } from '../../Icon';
import { ConfigTagPair } from '../shared/ConfigTagPair';

import { VisualConversationFeed } from './VisualConversationFeed';

const LinkedShotChip = ({
    label,
    onClear,
    sceneId
}: {
    label: string;
    onClear?: () => void;
    sceneId?: string;
}) => {
    return (
        <div
            data-selected-scene-id={sceneId}
            className="flex h-[22px] max-w-[132px] items-center justify-center gap-1.5 rounded-md bg-[#303136] px-2"
        >
            <Icon name="image" className="h-[14px] w-[14px] text-[#A9AFBA]" />
            <span className="truncate text-[11px] font-bold text-[#D5D8DE]">
                {label}
            </span>
            <button
                type="button"
                aria-label="移除关联分镜"
                onClick={onClear}
                className="grid h-3 w-3 place-items-center text-[#A9AFBA]"
            >
                <Icon name="x" className="h-3 w-3" />
            </button>
        </div>
    );
};

const QuickAdjustmentComposer = ({
    context
}: {
    context: ConfigPanelContext;
}) => {
    const [prompt, setPrompt] = useState('');
    const selectedScene = context.selectedScene;
    const canSubmit =
        Boolean(selectedScene?.id) &&
        prompt.trim().length > 0 &&
        !context.isRegeneratingScene;
    const submit = () => {
        if (!canSubmit || !selectedScene) return;

        const nextPrompt = prompt.trim();

        setPrompt('');
        void context.onRegenerateScene?.({
            prompt: nextPrompt,
            sceneId: selectedScene.id
        });
    };
    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key !== 'Enter' || event.shiftKey) return;

        event.preventDefault();
        submit();
    };

    return (
        <section className="mt-auto h-[160px] w-full shrink-0 rounded-[14px] bg-[#1A1B1E] p-[10px_0_0] pb-[14px]">
            <div className="flex h-[18px] w-full items-center justify-between px-3 text-xs font-bold text-[#A9AFBA]">
                <span>{visualConfigPanel.quickAdjust.title}</span>
                <Icon name="chevron-up" className="h-[18px] w-[18px]" />
            </div>
            <div className="mt-2 flex h-[120px] w-full flex-col justify-between rounded-[10px] border border-[#34363B] bg-[#121316] p-[10px_12px_14px] focus-within:border-[#F05F73]/70">
                <textarea
                    aria-label="输入快捷调整"
                    className="h-[70px] w-full resize-none border-0 bg-transparent p-0 text-xs font-semibold leading-[18px] text-[#D5D8DE] outline-none placeholder:text-[#6F737C]"
                    onChange={(event) => setPrompt(event.currentTarget.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={visualConfigPanel.quickAdjust.placeholder}
                    value={prompt}
                />
                <div className="flex h-7 w-full items-center justify-between overflow-hidden pt-1">
                    {selectedScene ? (
                        <LinkedShotChip
                            label={selectedScene.label}
                            onClear={context.onClearSelectedScene}
                            sceneId={selectedScene.id}
                        />
                    ) : (
                        <span aria-hidden="true" />
                    )}
                    <button
                        type="button"
                        aria-label="发送快捷调整"
                        disabled={!canSubmit}
                        onClick={submit}
                        className="grid h-[23px] w-[23px] shrink-0 place-items-center rounded-full bg-[#F05F73] text-white transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                        <Icon name="arrow-up" className="h-[19px] w-[19px]" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export const VisualConfigPanel = ({
    context
}: {
    context: ConfigPanelContext;
}) => {
    const conversation = context.conversation ?? [];
    const hasConversation = conversation.length > 0;

    return (
        <aside className="flex h-full min-h-0 w-[320px] flex-col overflow-hidden bg-[#111214] p-[16px]">
            <div
                data-config-scroll-region="visual"
                className="editor-panel-scrollbar min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain pb-3 pr-2"
            >
                <div className="mb-[18px] text-center font-['Geist'] text-[13px] font-semibold text-[#6F7784]"></div>

                <section className="mx-2 rounded-[18px] bg-[#252628] p-[12px_14px]">
                    <div className="grid gap-1.5">
                        {visualConfigPanel.tags.map((tag) => (
                            <ConfigTagPair key={tag.label} {...tag} />
                        ))}
                    </div>
                </section>

                {hasConversation ? (
                    <VisualConversationFeed conversation={conversation} />
                ) : (
                    <p className="mx-2 mt-[33px] whitespace-pre-line text-[12.2px] font-semibold leading-[1.36] text-[#D6D8DD]">
                        {visualConfigPanel.analysis}
                    </p>
                )}
            </div>

            <QuickAdjustmentComposer context={context} />
        </aside>
    );
};

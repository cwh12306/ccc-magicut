
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AgentConversationTimeline } from '../components/agent/AgentConversationTimeline';
import { AgentRunStageNav } from '../components/agent/AgentRunStageNav';
import { WindowDragRegion } from '../components/WindowDragRegion';
import {
    approveAgentRun,
    cancelAgentRun,
    ensureAgentRunEventSubscription,
    useAgentRunSnapshot
} from '../stores/agent-run-store';

const formatHeaderTime = () =>
    new Intl.DateTimeFormat('zh-CN', {
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        month: '2-digit'
    }).format(new Date());

export const MiaojianCreateRunScreen = ({ runId }: { runId?: string }) => {
    const snapshot = useAgentRunSnapshot(runId);
    const resolvedRunId = runId ?? snapshot.activeRunId;

    useEffect(() => {
        ensureAgentRunEventSubscription();
    }, []);

    const handleApprove = () => {
        if (!resolvedRunId) return;

        void approveAgentRun(resolvedRunId);
    };

    const handleCancel = () => {
        if (!resolvedRunId) return;

        void cancelAgentRun(resolvedRunId);
    };

    return (
        <main
            data-create-run-message-page="true"
            className="relative h-screen min-h-[720px] overflow-hidden bg-[#08090D] text-[#F5F7FA]"
        >
            <WindowDragRegion />
            <section
                data-create-run-chat-shell="true"
                className="relative mx-auto flex h-full w-[860px] flex-col"
            >
                <time className="mt-6 shrink-0 text-center text-[12px] font-[650] leading-none text-[#6F7784]">
                    {formatHeaderTime()}
                </time>
                <div className="min-h-0 flex-1 overflow-y-auto pb-[14px] pt-[18px]">
                    <AgentConversationTimeline
                        onApprove={handleApprove}
                        onCancel={handleCancel}
                        viewModel={snapshot.viewModel}
                    />
                </div>
                {/*
                <footer className="shrink-0 pb-[18px]">
                    <div className="flex h-[68px] w-[860px] items-center gap-3 rounded-[16px] border border-[#2A2F38] bg-[#171A20] py-3 pl-4 pr-[14px]">
                        <button
                            type="button"
                            className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[10px] border border-[#2A2F38] bg-[#222733] text-[#B9C1CE] transition-colors duration-200 hover:border-[#3B4452] hover:text-[#EAF7FF]"
                            aria-label="添加附件"
                        >
                            <Icon name="plus" className="h-[18px] w-[18px]" />
                        </button>
                        <label className="flex h-[46px] min-w-0 flex-1 flex-col justify-center gap-0.5">
                            <span className="sr-only">输入你的回复</span>
                            <textarea
                                aria-label="输入你的回复"
                                className="h-[24px] min-w-0 resize-none border-0 bg-transparent text-[14px] font-[400] leading-[20px] text-[#F5F7FA] outline-none placeholder:text-[#C7CEDA]"
                                placeholder="继续补充创作要求，或要求智能体修改分镜"
                            />
                            <span className="pointer-events-none text-[11px] font-[400] leading-[14px] text-[#737C8C]">
                                例如：缩短到 90 秒、加重技术感、换成沉稳男声
                            </span>
                        </label>
                        <button
                            type="button"
                            className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-[#EAF7FF] text-[#0F172A] transition-transform duration-200 hover:-translate-y-0.5"
                            aria-label="发送"
                        >
                            <Icon name="send" className="h-[18px] w-[18px]" />
                        </button>
                    </div>
                </footer>
                */}
            </section>
            <AgentRunStageNav stageItems={snapshot.viewModel.stageItems} />
        </main>
    );
};

export const MiaojianCreateRunRoute = () => {
    const params = useParams();

    return <MiaojianCreateRunScreen runId={params.runId} />;
};

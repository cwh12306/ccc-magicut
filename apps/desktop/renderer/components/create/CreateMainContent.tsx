
import type { CreateAgentSubmitInput } from '../../types/create';
import type { CreatePageContent } from '../../types/create';
import SoftAurora from '../reactbits/SoftAurora/SoftAurora';

import { CreateHero } from './CreateHero';
import { CreateInputPanel } from './CreateInputPanel';

export const CreateMainContent = ({
    content,
    isAgentBusy = false,
    onAgentSubmit
}: {
    content: CreatePageContent;
    isAgentBusy?: boolean;
    onAgentSubmit?: (input: CreateAgentSubmitInput) => void;
}) => {
    return (
        <section className="relative h-full min-w-0 overflow-hidden bg-[#090A0E]">
            <div className="absolute inset-0 bg-[#090A0E]" />
            <div className="create-main-soft-aurora-layer pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-75 mix-blend-screen">
                <div className="absolute left-0 top-[280px] h-[620px] w-full">
                    <SoftAurora
                        color1="#F7F7F7"
                        color2="#E100FF"
                        brightness={0.66}
                        scale={1.55}
                        speed={0.52}
                        bandHeight={0.58}
                        bandSpread={1.08}
                        noiseAmplitude={1}
                        noiseFrequency={2.5}
                        enableMouseInteraction={false}
                    />
                </div>
            </div>
            {/* <div className="pointer-events-none absolute inset-0 z-[2] bg-[#090A0E]/45" />
            <div className="pointer-events-none absolute left-[150px] top-[140px] z-[3] h-[210px] w-[1380px] rotate-[4deg] bg-[linear-gradient(90deg,#0A0A0A00_0%,#582CFF33_50%,#0A0A0A00_100%)] opacity-50 blur-[34px]" />
            <div className="pointer-events-none absolute left-[250px] top-[500px] z-[3] h-[150px] w-[980px] -rotate-[6deg] bg-[linear-gradient(90deg,#0A0A0A00_0%,#00F2FF24_46%,#0A0A0A00_100%)] opacity-[0.42] blur-[46px]" /> */}
            <div className="relative z-10 h-full w-full">
                <div className="absolute left-[149px] top-[155px] w-[1300px] max-w-[calc(100%-298px)]">
                    <CreateHero content={content} />
                </div>
                <div className="absolute left-[129px] top-[362px] z-10 w-[1340px] max-w-[calc(100%-258px)]">
                    <CreateInputPanel
                        content={content}
                        disabled={isAgentBusy}
                        onSubmit={onAgentSubmit}
                    />
                </div>
            </div>
        </section>
    );
};

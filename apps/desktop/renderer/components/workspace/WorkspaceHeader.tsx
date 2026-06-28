
import type { WorkspaceHeaderContent } from '../../types/workspace';

export const WorkspaceHeader = ({
    content
}: {
    content: WorkspaceHeaderContent;
}) => {
    return (
        <header className="grid gap-[5px]">
            <h2 className="text-[24px] font-[850] leading-none text-[#F5F7FA]">
                {content.title}
            </h2>
            <p className="font-['Geist'] text-[12px] font-[650] leading-none text-[#858B96]">
                {content.subtitle}
            </p>
        </header>
    );
};


import type { MouseEvent } from 'react';

import type { WorkspaceProject } from '../../types/workspace';
import { Icon } from '../Icon';

import { ClientRouteLink } from './ClientRouteLink';
import { SpotlightCard } from './SpotlightCard';

export const WorkspaceProjectCard = ({
    onDeleteRequest,
    project
}: {
    onDeleteRequest?: (project: WorkspaceProject) => void;
    project: WorkspaceProject;
}) => {
    const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onDeleteRequest?.(project);
    };

    return (
        <SpotlightCard
            className="h-[250px] rounded-[18px] bg-[#202123] p-0 transition-transform duration-200 hover:-translate-y-1"
            spotlightColor="rgba(255, 255, 255, 0.22)"
        >
            <ClientRouteLink
                href={project.href}
                className="group relative z-10 flex h-full flex-col overflow-hidden rounded-[18px]"
            >
                <div className="relative h-[130px] w-full overflow-hidden">
                    <img
                        src={project.coverImageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute bottom-0 left-0 h-[42px] w-full bg-[linear-gradient(180deg,#11121400_0%,#111214AA_100%)]" />
                    <span className="absolute right-[18px] top-3 grid h-[26px] w-8 place-items-center rounded-full bg-[#00000055] text-white/80 transition-colors duration-200 group-hover:bg-[#00000070] group-hover:text-white">
                        <Icon name="ellipsis" className="h-4 w-4" />
                    </span>
                </div>
                <article className="flex h-[120px] flex-col gap-[10px] px-5 py-[18px]">
                    <h3 className="h-[43px] line-clamp-2 overflow-hidden text-[17px] font-[900] leading-[1.25] text-[#F4F5F7]">
                        {project.title}
                    </h3>
                    <div className="flex h-6 items-center justify-between gap-3">
                        <span className="truncate text-[12px] font-[750] leading-none text-[#9AA0AA]">
                            {project.createdAt}
                        </span>
                        <span className="h-6 w-[34px]" aria-hidden="true" />
                    </div>
                </article>
            </ClientRouteLink>
            <button
                type="button"
                aria-label="删除项目"
                onClick={handleDeleteClick}
                className="absolute bottom-[18px] right-5 z-20 grid h-6 w-[34px] place-items-center rounded-full text-[#8A8F98] transition-colors duration-200 hover:bg-[#FF4D6D]/15 hover:text-[#FF8A9B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B497CF]"
            >
                <Icon name="trash-2" className="h-5 w-5" />
            </button>
        </SpotlightCard>
    );
};

import type {
    WorkspaceBrand,
    WorkspaceNavItem,
    WorkspaceView
} from '../../types/workspace';
import Aurora from '../reactbits/Aurora/Aurora';

import { WorkspaceSidebarNavItem } from './WorkspaceSidebarNavItem';

const workspaceBrandLogoUrl = new URL(
    '../../assets/brand/favicon@152.png',
    import.meta.url
).href;

const WorkspaceBrandMark = ({ label }: { label: string }) => {
    return (
        <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-[8px] shadow-[0_8px_24px_rgba(88,44,255,0.22)]">
            <img
                src={workspaceBrandLogoUrl}
                alt={label}
                className="h-full w-full object-cover"
                draggable={false}
            />
        </div>
    );
};

export const WorkspaceSidebar = ({
    brand,
    navItems,
    onNavItemSelect
}: {
    brand: WorkspaceBrand;
    navItems: WorkspaceNavItem[];
    onNavItemSelect?: (view: WorkspaceView) => void;
}) => {
    return (
        <aside className="relative h-full w-[260px] overflow-hidden bg-[#080911]/70 bg-[radial-gradient(ellipse_at_55%_30%,#582CFF30_0%,#BF40FF18_42%,transparent_72%),linear-gradient(180deg,#11131D_0%,#080911_48%,#05060A_100%)] backdrop-blur-[28px]">
            <div
                aria-hidden="true"
                className="workspace-sidebar-aurora-fallback pointer-events-none absolute inset-0 z-0 bg-[#080911] bg-[radial-gradient(ellipse_at_55%_30%,#582CFF30_0%,#BF40FF18_42%,transparent_72%),linear-gradient(180deg,#11131D_0%,#080911_48%,#05060A_100%)]"
            />
            <div
                aria-hidden="true"
                className="workspace-sidebar-aurora-layer pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-75 mix-blend-screen"
            >
                <Aurora
                    className="workspace-sidebar-aurora-horizontal"
                    colorStops={['#582CFF', '#BF40FF', '#00F2FF']}
                    amplitude={0.95}
                    blend={0.62}
                    speed={0.7}
                />
            </div>
            <div className="pointer-events-none absolute inset-0 z-[2] border-r border-white/5 bg-black/10" />
            <div className="pointer-events-none absolute left-[20px] top-[318px] z-[2] h-[444px] w-[220px] rounded-[110px] bg-[radial-gradient(circle_at_center,#BF40FF42_0%,#582CFF24_38%,#00F2FF10_72%,#08091100_100%)] opacity-[0.72] blur-[38px]" />
            <div className="pointer-events-none absolute left-[33px] top-[542px] z-[2] h-1 w-[196px] -rotate-[7deg] rounded-full bg-[linear-gradient(90deg,transparent_0%,#BF40FFCC_38%,#FF4DA6D9_62%,transparent_100%)] opacity-80 blur-[18px]" />
            <div className="absolute left-[20px] top-[30px] z-[3] flex w-[230px] items-center gap-3">
                <WorkspaceBrandMark label={brand.name} />
                <div className="grid gap-1">
                    <h1 className="text-[24px] font-[700] leading-none text-[#F5F7FA]">
                        {brand.name}
                    </h1>
                    <p className="font-['Geist'] text-[11px] font-normal leading-[1.25] tracking-[0.025em] text-[#6F7784]">
                        {brand.description}
                    </p>
                </div>
            </div>
            <nav className="absolute left-0 top-[342px] z-[3] ml-[26px] h-[428px] w-[120px] rounded-[60px] bg-[linear-gradient(180deg,#FFFFFF38_0%,#BF40FF66_48%,#582CFF44_100%)] p-px shadow-[0_18px_46px_rgba(0,0,0,0.5),0_0_38px_rgba(191,64,255,0.26),0_0_68px_rgba(88,44,255,0.14)]">
                <div className="flex h-full w-full flex-col items-center gap-[18px] rounded-[59px] bg-[#0D0F17E8] bg-[radial-gradient(ellipse_at_50%_42%,#BF40FF20_0%,#582CFF10_50%,#0D0F1700_100%),linear-gradient(180deg,#191B27F0_0%,#0D0F17F0_52%,#080910F0_100%)] px-[10px] py-[49px] backdrop-blur-[18px]">
                    {navItems.map((item) => (
                        <WorkspaceSidebarNavItem
                            key={item.label}
                            item={item}
                            onSelect={onNavItemSelect}
                        />
                    ))}
                </div>
            </nav>
        </aside>
    );
};

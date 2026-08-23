import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { MusicConfigPanel } from '../renderer/components/config/music/MusicConfigPanel';
import { VisualConfigPanel } from '../renderer/components/config/visual/VisualConfigPanel';
import { VoiceConfigPanel } from '../renderer/components/config/voice/VoiceConfigPanel';

describe('editor config panel scrollbars', () => {
    it('keeps editor config panels vertical-only with a text gutter', () => {
        const musicHtml = renderToStaticMarkup(createElement(MusicConfigPanel));
        const visualHtml = renderToStaticMarkup(
            createElement(VisualConfigPanel, { context: {} })
        );
        const voiceHtml = renderToStaticMarkup(createElement(VoiceConfigPanel));

        for (const html of [musicHtml, visualHtml, voiceHtml]) {
            expect(html).toContain('editor-panel-scrollbar');
            expect(html).toContain('overflow-x-hidden');
            expect(html).toContain('overflow-y-auto');
            expect(html).toContain('overscroll-y-contain');
            expect(html).toContain('pr-2');
            expect(html).not.toContain('overflow-x-auto');
        }

        expect(musicHtml).toContain('data-config-scroll-region="music"');
        expect(visualHtml).toContain('data-config-scroll-region="visual"');
        expect(voiceHtml).toContain('data-config-scroll-region="voice"');
    });

    it('wraps music filters instead of creating a horizontal scroller', () => {
        const html = renderToStaticMarkup(createElement(MusicConfigPanel));

        expect(html).toContain('data-music-category-list="true"');
        expect(html).toContain('flex-wrap');
        expect(html).not.toContain('w-max');
        expect(html).not.toContain('flex-nowrap');
    });

    it('uses the compact coral editor scrollbar treatment', () => {
        const stylesheet = readFileSync(
            resolve(__dirname, '../renderer/index.css'),
            'utf8'
        );

        expect(stylesheet).toContain('.editor-panel-scrollbar');
        expect(stylesheet).toContain('scrollbar-gutter: stable');
        expect(stylesheet).toContain(
            '.editor-panel-scrollbar::-webkit-scrollbar-thumb'
        );
        expect(stylesheet).toContain('rgba(240, 95, 115, 0.88)');
        expect(stylesheet).toContain('width: 8px');
        expect(stylesheet).toContain('height: 0');
    });
});

# React Design Alignment Tasks

## Goal
Bring the React app into line with the supplied design set in `stitch_16_bit_adventure_rpg_style_prd/`.

## Source Mapping
- Home: `home_unified_clean_hero_layout`
- Portfolio: `projects_unified_palette`
- About: `about_pro_retro`
- Skills: `skills_16_bit_pro`
- Contact: `contact_unified`
- Project detail inspiration: `projects_standard_unified`

## TODO
- [x] Choose the portfolio base design
- [x] Create this task file in the repo
- [x] Add an `About` page and route from `about_pro_retro`
- [x] Update shared navigation to include `About`
- [x] Restyle `Portfolio` to follow `projects_unified_palette`
- [x] Refine `Project` page using `projects_standard_unified` motifs
- [x] Align footer link sets with the new page map
- [x] Restyle `Skills` to follow `skills_16_bit_pro`
- [x] Restyle `Contact` to follow `contact_unified`
- [x] Tighten shared shell details against the design set
- [x] Replace smooth icon language where needed with chunkier presentation
- [x] Validate responsive behavior after the page updates
- [x] Run `npm run build`

## Notes
- `contact_unified/code.html` contains noisy injected CSS; prefer its screen and layout intent over raw copied markup.
- Keep the current React/Vite architecture. Do not regress to static HTML.

## Comparison Polish
- [x] Tighten `Home` against `home_unified_clean_hero_layout`
- [x] Tighten `About` against `about_pro_retro`
- [ ] Tighten `Portfolio` against `projects_unified_palette`
- [ ] Tighten `Project` against `projects_standard_unified`
- [ ] Tighten `Skills` against `skills_16_bit_pro`
- [ ] Tighten `Contact` against `contact_unified`

## Home Repair
- [x] Fix missing/broken home shell icon classes
- [x] Align home shell branding and sidebar metadata to the target frame
- [x] Tighten home hero copy, spacing, and CTA labels
- [x] Improve home work-grid proportion and capability panel finishing
- [x] Rebuild and verify the home page render

## Home Final Polish
- [x] Refine sidebar/header spacing and typography
- [x] Tune exact home card widths and heights
- [x] Tune CTA and footer spacing against the target frame

## Home Icon Consistency
- [x] Remove overlapping icon treatments in the home shell
- [x] Normalize home page icons to one pixel-grid style
- [x] Rebuild and verify the home page render

## Home Library Icons
- [x] Replace invented home shell icons with `lucide-react`
- [x] Replace home trust-strip icons with `lucide-react`
- [x] Rebuild and verify the home page render

## Home Typography And Icons
- [x] Make the home page typography match the site's pixel-forward style
- [x] Replace home and shell icons with a more suitable design-aligned icon set
- [x] Rebuild and verify the home page render

#  Wall Calendar — Interactive React Component

A polished, interactive wall calendar component built with **Next.js**, **TypeScript**, and **Tailwind CSS**, inspired by a physical wall calendar aesthetic.

 **Live Demo**: [wall-calendar.app]

---

##  Features

| Feature | Details |
|---|---|
| **Wall Calendar Aesthetic** | Hero photo per month, geometric blue wave overlay, spiral binding bar |
| **Day Range Selector** | Click start → hover preview → click end. Clear visual states for start, end, in-range, and hover-preview |
| **Live Hover Preview** | See the range fill *before* confirming your end date |
| **Notes Panel** | Attach notes to a selected date range. Persists via `localStorage` |
| **Month Flip Animation** | Smooth fade + scale transition when navigating months |
| **Holiday Markers** | Orange dot indicators for Indian + international holidays |
| **Today Indicator** | Blue dot beneath today's date |
| **Responsive** | Desktop: side-by-side two-column layout. Mobile: stacked vertically |

---

##  Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** — strict types throughout
- **Tailwind CSS** — utility-first styling
- **shadcn/ui** — Button, Textarea, Badge (UI primitives only)
- **Lucide React** — icons
- **localStorage** — note persistence (no backend)

##  Run Locally

```bash
git clone https://github.com/mrpankajpandey/wall-calendar
cd wall-calendar
pnpm install
pnpm  dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Design Decisions

### Custom Calendar Grid (not react-day-picker)
Built the grid from scratch using `buildCalendarDays()` to have full control over:
- Monday-first week layout
- Range selection visual states
- Hover preview before confirming end date

### Hooks Separation
Each concern is isolated:
- `useCalendar` — *what month are we on?*
- `useDateRange` — *what dates are selected?*
- `useNotes` — *what notes exist?*

This makes each hook independently testable and the main component a clean composition.

### localStorage for Notes
No backend needed. Notes survive page refresh. `try/catch` handles SSR and private mode gracefully.

### shadcn Only for Primitives
Used shadcn's `Button`, `Textarea`, and `Badge` for accessible, consistent UI elements. All calendar logic and grid rendering is custom.

---

## Responsive Behaviour

| Breakpoint | Layout |
|---|---|
| `< md` (mobile) | Stacked: Hero → Header → Grid → Notes |
| `≥ md` (desktop) | Two columns: Calendar left, Notes right |
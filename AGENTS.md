<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Homepage portraits use keyed Framer Motion enter/exit transitions with perspective; this ensures every photo enters from the right and exits left without animating backwards during reuse.
- Contact submission must never report successful delivery or open a placeholder mailbox when no sender is configured; this prevents lost enquiries.
- Contact draft destinations and URL encoding live in a browser-safe helper tested independently; mailto opens the user's email app rather than sending mail from the site.
- Selected work content lives in a browser-safe project data module and renders in an equal-row grid rather than a pinned horizontal track, keeping full descriptions readable on all screen sizes.

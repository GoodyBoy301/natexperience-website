# Project styling rules

- Never use CSS `clamp()` for sizing. Use one explicit desktop `rem` value and one explicit mobile `rem` value when a size needs to change, using the existing breakpoint for that layout. If the size is the same on both, declare it once.
- Use the shared 1512px-based root scale for custom site sizes. Keep matching preview and FrontDesk section declarations in sync. Use viewport and percentage units only when the layout itself needs to fill or track the viewport or container.

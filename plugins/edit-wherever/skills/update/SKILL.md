---
name: update
description: Update Edit Wherever to the latest version, or turn on automatic updates. Use when the user says "update Edit Wherever", "update my studio", taps "Update" in their dashboard, or when the session start says an update is available and the user agrees.
---

# Update Edit Wherever

Talk like a friendly helper. Never ask the user to open a terminal.

1. First keep anything they changed: `node "${CLAUDE_SKILL_DIR}/../../scripts/update.mjs" --keep-edits`. It compares the installed Edit Wherever files with the list we shipped and copies every file they changed or added to a dated folder in `.studio/backups`. Tell the user its one-line answer as is when it names files; say nothing when nothing changed. If it says "Don't update yet", stop and don't update.
2. Run these two commands (the user may be asked to allow them once):
   - `claude plugin marketplace update wealthywherever`
   - `claude plugin update edit-wherever@wealthywherever`
3. If they're blocked or fail, walk the user through it in the app instead, one step at a time: type `/plugin`, open the **Installed** tab, pick **Edit Wherever**, choose **Update now**.
4. When it's updated, tell the user: "Done. Type /reload-plugins and press Enter so this chat uses the new version." Then restart their studio so the dashboard is new too: run the `studio` skill (it stops the old one and opens the new one).
5. Say what changed in 2-3 short lines, using the notes from the session start or the dashboard's What's new page.
6. If auto-update isn't on yet, offer it once: "Want updates to install on their own? Type /plugin, open **Marketplaces**, pick **wealthywherever**, choose **Enable auto-update**." Don't ask again if they say no.

Moves and editing rules never need this: they come from our server and are always the newest.

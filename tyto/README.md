# Cybersecurity Discovery Piscine — Tyto Series (OSINT)

Documentation of work on the Tyto00–Tyto03 exercises from the 42 Barcelona Cybersecurity Discovery Piscine. This module focuses on **OSINT** (Open Source Intelligence): finding public information, pivoting between accounts, geolocating images, and reading metadata.

---

## Tyto00 — "Stalker"

**Turn-in directory:** `ex00/` · **Files to turn in:** `flag.txt`

**Goal:** 42 Barcelona's security team monitored a suspicious computer's network traffic and found an interesting packet. Objective: identify the social media profile link used by this suspicious user from that packet.

- **Approach:** Inspect the captured packet for identifying strings/URLs (e.g. a profile handle or link embedded in the traffic), then confirm the account exists on the matching platform.
- **Flag:** `https://x.com/ihatetetris42`

---

## Tyto01 — "Doraemon"

**Turn-in directory:** `ex01/` · **Files to turn in:** `flag.txt` · **Forbidden functions:** Browser only allowed

**Goal:** The account found in Tyto00 turned out to be a fake/alt profile. Find the real identity (a second, linked username) behind it.

- **Approach:** Pivot from the fake profile — cross-reference bio details, profile picture, linked accounts, or reused handles/usernames across other platforms to trace back to the real account, using only browser-based OSINT (no scripts/tools).
- **Flag:** `https://x.com/liam_up2u`

---

## Tyto02 — "Falcon"

**Turn-in directory:** `ex02/` · **Files to turn in:** `flag.txt`

**Goal:** Determine the user's location from a picture — but first, find the picture itself. Hint: Bluesky isn't necessarily the platform where it was posted.

- **Approach:** Locate the photo (posted on a different social platform than expected), then geolocate it using visual landmarks — in this case a bell tower with a stork's nest, a style typical of village churches in Spain — cross-referenced against map/satellite imagery to pin down the specific location.
- **Flag:** `Argañín`

---

## Tyto03 — "Mole"

**Turn-in directory:** `ex03/` · **Files to turn in:** `flag.txt`

**Goal:** The social media team provided the original, unprocessed photo. Determine the model of phone used to take it.

- **Approach:** Examine the image's EXIF/metadata (camera make/model fields) using a metadata-reading tool (e.g. `exiftool`, `exiv2`) rather than relying on the re-compressed/stripped version served on social media.
- **Flag:** `Redmi Note 8T`

---

## Notes

- All flags were written to `flag.txt` in their respective `exXX/` turn-in directories, matching each subject's submission requirement.
- Tyto01 required browser-only investigation (no command-line/API tools), per the subject's forbidden-functions rule.
- Tyto02's attached photo (bell tower with stork's nest, golden-hour lighting) was the key visual evidence used for geolocation.

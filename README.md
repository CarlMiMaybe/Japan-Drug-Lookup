# Japan Drug Lookup

Small static web app for checking whether a prescription or OTC medicine is generally legal to bring into Japan for personal use.

## Open it

- Double-click `index.html`, or
- Serve the folder locally with a simple static server.

Example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## What it uses

- Official MHLW personal-import guidance
- Narcotics Control Department application guidance
- Japan controlled-substances list
- Psychotropics quantity table

## Notes

- Search by generic name or common U.S. brand name.
- Combination products can change the answer.
- This is a guidance tool and should be verified against the exact label before travel.

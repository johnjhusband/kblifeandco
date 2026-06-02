# KB Life & Co — kblifeandco.com

Static marketing + appointment-booking site for Kristi Brown, life insurance agent.
No build step. Plain HTML/CSS/JS — upload the folder to any host (GoDaddy, etc.).

## Structure
```
index.html                 Home: hero, Calendly booking, stats, strategies, bio, carriers, states, contact
strategies/                One page per strategy
  mortgage-protection.html
  income-replacement.html
  retirement-iul.html       (Tax-Free Retirement / Indexed Universal Life)
  final-expense.html
  annuities.html            (Fixed Indexed Annuities)
  cremation.html
  childrens-policies.html
assets/css/styles.css       Brand: olive green · gold leaf · neutrals. Fully responsive.
assets/js/main.js           Mobile nav, scroll reveals, contact-form handler
assets/img/                 kb-logo.svg, kristi.jpg, carriers/
```

## Booking
Calendly is embedded inline on the home page (`#book`) using her link:
`https://calendly.com/kblifeagencyandco/lit`. Every "Book" button scrolls/links there.

## Contact form
Submits by opening the visitor's email app addressed to `kristi@kblifeandco.com`
(zero setup, works on any host). To deliver straight to her inbox instead, create a
free Formspree form and set `action="https://formspree.io/f/XXXX"` plus
`data-endpoint="1"` on `#contact-form` in index.html.

## Local preview
```
cd KBWebsite && python3 -m http.server 8765
# open http://localhost:8765/
```

## Content source
All copy, bio, stats, strategies, carriers, licensed states, and social links were
taken from her existing site `kblifeandco.trustmyproducer.com`. Logo: `kb_gold_leaf.svg`.

## Deploy (GoDaddy)
Upload the entire `KBWebsite` folder's contents to the hosting web root (e.g. via
cPanel File Manager or SFTP) so `index.html` sits at the site root, then point
`kblifeandco.com` at it. Requires an active GoDaddy hosting plan (domain alone is not
enough).

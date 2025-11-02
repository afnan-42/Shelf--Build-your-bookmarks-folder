// One site per line: Name|domain|optional region (IN, US, UK).
// A line starting with # begins a category: #tab|Category name (g = General, p = Privacy).
export const CATALOG = `#g|AI assistants
ChatGPT|chatgpt.com
Gemini|gemini.google.com
Claude|claude.ai
Grok|grok.com
Perplexity|perplexity.ai
Copilot|copilot.microsoft.com
DeepSeek|chat.deepseek.com
Meta AI|meta.ai
NotebookLM|notebooklm.google.com
Hugging Face|huggingface.co
#g|AI creative
Midjourney|midjourney.com
Leonardo|leonardo.ai
Ideogram|ideogram.ai
Suno|suno.com
ElevenLabs|elevenlabs.io
Runway|runwayml.com
#g|Search and reference
Google|google.com
Bing|bing.com
Wikipedia|wikipedia.org
Google Scholar|scholar.google.com
WolframAlpha|wolframalpha.com
Google Translate|translate.google.com
DeepL|deepl.com
Internet Archive|archive.org
#g|Social and messaging
YouTube|youtube.com
Instagram|instagram.com
X|x.com
Reddit|reddit.com
Facebook|facebook.com
LinkedIn|linkedin.com
Threads|threads.com
Pinterest|pinterest.com
Snapchat|snapchat.com
WhatsApp Web|web.whatsapp.com
Telegram Web|web.telegram.org
Discord|discord.com/app
#g|Streaming
Netflix|netflix.com
Prime Video|primevideo.com
Spotify|open.spotify.com
YouTube Music|music.youtube.com
Twitch|twitch.tv
Crunchyroll|crunchyroll.com
IMDb|imdb.com
#g|Creator tools
YouTube Studio|studio.youtube.com
Meta Business Suite|business.facebook.com
Canva|canva.com
CapCut|capcut.com
Figma|figma.com
Adobe Express|express.adobe.com
Buffer|buffer.com
Linktree|linktr.ee
Google Trends|trends.google.com
vidIQ|vidiq.com
Unsplash|unsplash.com
Pexels|pexels.com
Pixabay|pixabay.com
#g|Productivity
Gmail|mail.google.com
Google Drive|drive.google.com
Google Docs|docs.google.com
Google Calendar|calendar.google.com
Outlook|outlook.live.com
Microsoft 365|office.com
Notion|notion.so
Trello|trello.com
Slack|slack.com
Zoom|zoom.us
Google Meet|meet.google.com
Dropbox|dropbox.com
Todoist|todoist.com
Google Keep|keep.google.com
#g|Learning
Google Classroom|classroom.google.com
Khan Academy|khanacademy.org
Coursera|coursera.org
edX|edx.org
Udemy|udemy.com
Duolingo|duolingo.com
Quizlet|quizlet.com
Desmos|desmos.com
GeoGebra|geogebra.org
Brilliant|brilliant.org
AnkiWeb|ankiweb.net
Grammarly|grammarly.com
MIT OpenCourseWare|ocw.mit.edu
#g|Research
arXiv|arxiv.org
Semantic Scholar|semanticscholar.org
ResearchGate|researchgate.net
JSTOR|jstor.org
Overleaf|overleaf.com
#g|Developer
GitHub|github.com
GitLab|gitlab.com
Stack Overflow|stackoverflow.com
MDN|developer.mozilla.org
npm|npmjs.com
PyPI|pypi.org
Docker Hub|hub.docker.com
Vercel|vercel.com
Netlify|netlify.com
Cloudflare|dash.cloudflare.com
CodePen|codepen.io
StackBlitz|stackblitz.com
DevDocs|devdocs.io
Can I Use|caniuse.com
regex101|regex101.com
roadmap.sh|roadmap.sh
LeetCode|leetcode.com
freeCodeCamp|freecodecamp.org
Hacker News|news.ycombinator.com
#g|Utilities
Google Maps|maps.google.com
Speedtest|speedtest.net
iLovePDF|ilovepdf.com
Smallpdf|smallpdf.com
CloudConvert|cloudconvert.com
TinyPNG|tinypng.com
remove.bg|remove.bg
WeTransfer|wetransfer.com
Windy|windy.com
Time.is|time.is
#g|Shopping
Amazon|amazon.com
eBay|ebay.com
AliExpress|aliexpress.com
Etsy|etsy.com
Keepa|keepa.com
Flipkart|flipkart.com|IN
Myntra|myntra.com|IN
Meesho|meesho.com|IN
Walmart|walmart.com|US
Target|target.com|US
Argos|argos.co.uk|UK
John Lewis|johnlewis.com|UK
#g|News
Reuters|reuters.com
Al Jazeera|aljazeera.com
BBC|bbc.com
The Verge|theverge.com
Ars Technica|arstechnica.com
The Hindu|thehindu.com|IN
NDTV|ndtv.com|IN
NPR|npr.org|US
AP News|apnews.com|US
The Guardian|theguardian.com|UK
#g|Finance
Yahoo Finance|finance.yahoo.com
TradingView|tradingview.com
Investing.com|investing.com
XE|xe.com
Wise|wise.com
Zerodha|zerodha.com|IN
Groww|groww.in|IN
Screener|screener.in|IN
Moneycontrol|moneycontrol.com|IN
Fidelity|fidelity.com|US
Vanguard|investor.vanguard.com|US
Hargreaves Lansdown|hl.co.uk|UK
MoneySavingExpert|moneysavingexpert.com|UK
#g|Gaming
Steam|store.steampowered.com
Epic Games|store.epicgames.com
GOG|gog.com
itch.io|itch.io
IGN|ign.com
HowLongToBeat|howlongtobeat.com
PCGamingWiki|pcgamingwiki.com
#p|Private search
DuckDuckGo|duckduckgo.com
Brave Search|search.brave.com
Startpage|startpage.com
Mojeek|mojeek.com
MetaGer|metager.org
Qwant|qwant.com
Mullvad Leta|leta.mullvad.net
Marginalia|marginalia-search.com
SearXNG instances|searx.space
Kagi|kagi.com
DuckDuckGo AI Chat|duck.ai
#p|Leak and fingerprint tests
DNS Leak Test|dnsleaktest.com
IPLeak|ipleak.net
BrowserLeaks|browserleaks.com
Cover Your Tracks|coveryourtracks.eff.org
Mullvad Connection Check|mullvad.net/check
Cloudflare Help|one.one.one.one/help
PrivacyTests|privacytests.org
Blacklight|themarkup.org/blacklight
Webbkoll|webbkoll.dataskydd.net
Exodus Privacy|exodus-privacy.eu.org
Security Headers|securityheaders.com
#p|Scan files and links
VirusTotal|virustotal.com
Hybrid Analysis|hybrid-analysis.com
ANY.RUN|any.run
Triage|tria.ge
MetaDefender|metadefender.opswat.com
urlscan.io|urlscan.io
Safe Browsing check|transparencyreport.google.com/safe-browsing/search
Talos Intelligence|talosintelligence.com
AbuseIPDB|abuseipdb.com
#p|Account safety
Have I Been Pwned|haveibeenpwned.com
Bitwarden web vault|vault.bitwarden.com
Proton Pass|pass.proton.me
Bitwarden Send|send.bitwarden.com
Ente Auth|auth.ente.io
SimpleLogin|app.simplelogin.io
addy.io|app.addy.io
Firefox Relay|relay.firefox.com
#p|Private mail and storage
Proton Mail|mail.proton.me
Proton Drive|drive.proton.me
Proton Calendar|calendar.proton.me
Tuta Mail|app.tuta.com
Mailbox.org|mailbox.org
Posteo|posteo.de
Filen|app.filen.io
Ente Photos|web.ente.io
CryptPad|cryptpad.org
PrivateBin|privatebin.info
Standard Notes|app.standardnotes.com
#p|VPN and DNS
Mullvad|mullvad.net
Proton VPN|protonvpn.com
IVPN|ivpn.net
Quad9|quad9.net
NextDNS|nextdns.io
AdGuard DNS|adguard-dns.io
#p|Private tools
Excalidraw|excalidraw.com
Squoosh|squoosh.app
CyberChef|gchq.github.io/CyberChef
OpenStreetMap|openstreetmap.org
Open-Meteo|open-meteo.com
LibreTranslate|libretranslate.com
Openverse|openverse.org
Farside|farside.link
Jitsi Meet|meet.jit.si
Cal.com|cal.com
#p|Learn privacy
Privacy Guides|privacyguides.org
EFF Surveillance Self-Defense|ssd.eff.org
Security in a Box|securityinabox.org
PRISM Break|prism-break.org
ToS;DR|tosdr.org
Privacy Not Included|foundation.mozilla.org/privacynotincluded
AlternativeTo|alternativeto.net
Awesome Privacy|github.com/Lissy93/awesome-privacy
EFF|eff.org
noyb|noyb.eu
The Markup|themarkup.org`;

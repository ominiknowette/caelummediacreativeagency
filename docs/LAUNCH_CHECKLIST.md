# Caelum Media launch checklist

Current verdict: **Not ready for launch**. No deployment or publication was performed. See `AUDIT_REPORT.md` for evidence and limitations. Use PASS only after a fresh check on the intended production host.

| Item | Status | Owner / next action |
| --- | --- | --- |
| Production build and local route smoke test | PASS | Re-run on the final release commit. |
| Core navigation, booking links, package prefills and 404 | PASS | Recheck after any content edits. |
| Local form validation and controlled mock receipt/rejection | PASS | Mock confirms UI contract only. |
| Real enquiry delivery to business inbox | BLOCKED | Configure `CAELUM_ENQUIRY_WEBHOOK_URL` with a real service and verify receipt with an authorised test recipient. |
| Shared production rate limit and provider spam control | BLOCKED | Configure at hosting edge/provider; the current in-process safeguard is insufficient across instances. |
| Privacy notice and enquiry retention | BLOCKED | Confirm provider, recipient access, retention and deletion process, then update `/privacy`. |
| Provisional prices/content terms | BLOCKED | Obtain client decisions listed in `CONTENT_DECISIONS.md`. |
| Client video captions/audio and final poster | BLOCKED | Review audio, add captions if needed, approve a representative poster. |
| Results image/source alignment | PASS | Keep source mapping in `src/data/results.ts`; obtain independent Amarex evidence only if an image is desired. |
| External Instagram/Facebook/WhatsApp destination availability | BLOCKED | Check on a network/browser that can open the supplied destinations. |
| Final domain, canonical URLs, sitemap, social sharing image and HTTPS/HSTS | BLOCKED | Set final HTTPS origin, then complete metadata and server policy. |
| Staging `noindex` and robots disallow | PASS | Keep until launch; remove only after launch approval and final SEO configuration. |
| Dependency vulnerability scan | PASS | Patched Next.js 15.5.28 plus PostCSS override; final `npm audit` reported zero vulnerabilities. Re-run for the release commit. |
| Lighthouse/performance measurement | BLOCKED | Run against final production-like host on desktop/mobile and investigate any material issues. |
| Multi-browser and real-device test | BLOCKED | Check mobile Safari and at least one other browser/device. Only the ChatGPT in-app browser was available for this audit. |
| Authentication, database and private storage policies | NOT APPLICABLE | None exists in the current application. Reassess if introduced. |
| Live site delivery/publish | BLOCKED | Requires completion of the above and explicit launch authorisation. |

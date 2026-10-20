import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL, Section } from "./Section";

/** The Italian text of /privacy, translated from PrivacyEn.tsx. The English
 *  version is the reference; keep the two in step. */
export default function PrivacyIt() {
  return (
    <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed">
      <section>
        <p>
          The Agentcy (&ldquo;noi&rdquo;) gestisce il sito marketing{" "}
          <span className="text-white">the-agentcy.ai</span> e
          l&rsquo;applicazione web dello studio{" "}
          <span className="text-white">app.the-agentcy.ai</span>. Questa
          pagina spiega quali informazioni raccogliamo, come le usiamo e quali
          scelte hai sui tuoi dati.
        </p>
      </section>

      <Section title="Informazioni che raccogliamo">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-white">Dati dell&rsquo;account</strong> —
            indirizzo email e credenziali di autenticazione quando ti registri.
          </li>
          <li>
            <strong className="text-white">Profilo del brand</strong> — nome
            dell&rsquo;azienda, sito, settore, bio, prodotti e servizi che
            aggiungi per configurare i tuoi brand.
          </li>
          <li>
            <strong className="text-white">Token delle piattaforme social</strong>{" "}
            — token di accesso OAuth rilasciati dalle piattaforme che colleghi
            (ad esempio LinkedIn, Instagram). Sono conservati cifrati e usati
            solo per pubblicare contenuti e leggere le statistiche delle
            piattaforme per tuo conto.
          </li>
          <li>
            <strong className="text-white">
              Dati del profilo sulle piattaforme social
            </strong>{" "}
            — il tuo nome utente, il nome visualizzato, l&rsquo;URL
            dell&rsquo;immagine del profilo e gli identificativi di base
            dell&rsquo;account restituiti dalle piattaforme.
          </li>
          <li>
            <strong className="text-white">Contenuti generati</strong> — i
            post, le immagini, i video e i relativi metadati che crei con i
            nostri strumenti basati sull&rsquo;AI.
          </li>
          <li>
            <strong className="text-white">Dati di utilizzo</strong> — i
            normali log del server (IP, user agent, orari delle richieste)
            usati per sicurezza, debug e limitazione delle richieste.
          </li>
        </ul>
      </Section>

      <Section title="Come usiamo le tue informazioni">
        <ul className="list-disc pl-6 space-y-2">
          <li>Per fornire e far funzionare il servizio (autenticazione, generazione di contenuti, pubblicazione).</li>
          <li>
            Per comunicare con te riguardo al tuo account, alla sicurezza e
            agli aggiornamenti del servizio.
          </li>
          <li>Per migliorare il servizio e sviluppare nuove funzionalità.</li>
          <li>
            Per adempiere agli obblighi di legge e far rispettare i nostri
            Termini di servizio.
          </li>
        </ul>
      </Section>

      <Section title="Servizi di terze parti">
        <p>
          Per far funzionare il servizio ci avvaliamo dei seguenti
          sub-responsabili del trattamento, ciascuno vincolato dai propri
          termini sulla privacy:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Supabase — autenticazione e hosting del database</li>
          <li>Vercel — hosting dell&rsquo;applicazione e distribuzione edge</li>
          <li>Anthropic — generazione di contenuti con l&rsquo;AI</li>
          <li>LinkedIn, Meta (Instagram/Facebook) — API di pubblicazione social che colleghi esplicitamente</li>
          <li>Stripe — elaborazione dei pagamenti (quando la fatturazione è attiva)</li>
        </ul>
      </Section>

      <Section title="Cookie e statistiche">
        <p>
          Il sito marketing the-agentcy.ai non imposta cookie di
          tracciamento. La tua scelta sui cookie viene conservata nella
          memoria locale del browser, così non te la chiediamo di nuovo, e il
          brief che scrivi nella home page viene portato nell&rsquo;app allo
          stesso modo quando ti registri.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>
            <strong className="text-white">Necessari</strong> — la
            registrazione del consenso e il passaggio all&rsquo;app descritto
            sopra. Sempre attivi.
          </li>
          <li>
            <strong className="text-white">Statistiche</strong> — un&rsquo;istanza
            di Plausible in self-hosting, senza cookie, che conta le
            visualizzazioni delle pagine e alcuni eventi di conversione (ad
            esempio una richiesta di demo). Non memorizza identificativi
            personali e viene caricata solo dopo il tuo consenso.
          </li>
          <li>
            <strong className="text-white">Marketing</strong> — riservata ai
            pixel di misurazione pubblicitaria. Oggi non ne usiamo nessuno; se
            ne aggiungeremo uno, verrà caricato solo con questa categoria
            attiva.
          </li>
        </ul>
        <p className="mt-2">
          Puoi cambiare la tua scelta in qualsiasi momento dal link
          &ldquo;Impostazioni cookie&rdquo; nel footer. L&rsquo;app dello
          studio su app.the-agentcy.ai usa solo cookie strettamente necessari
          per mantenerti connesso.
        </p>
      </Section>

      <Section title="Come vengono condivisi i tuoi dati">
        <p>
          Non vendiamo i tuoi dati personali. I dati vengono condivisi solo
          con i sub-responsabili indicati sopra e con le piattaforme social
          che colleghi, esclusivamente per eseguire le azioni che richiedi
          (pubblicare un post, leggere le statistiche, ecc.).
        </p>
      </Section>

      <Section title="Conservazione dei dati">
        <p>
          I dati dell&rsquo;account, i profili dei brand e i contenuti
          generati vengono conservati finché il tuo account è attivo. Puoi
          eliminare il tuo account e tutti i dati collegati in qualsiasi
          momento: vedi{" "}
          <Link
            href="/data-deletion"
            className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
          >
            Cancellazione dei dati
          </Link>
          . Una volta ricevuta la richiesta, eliminiamo i tuoi dati entro 30
          giorni, salvo obblighi di conservazione previsti dalla legge.
        </p>
      </Section>

      <Section title="I tuoi diritti">
        <p>
          A seconda della tua giurisdizione (GDPR, CCPA, ecc.) potresti avere
          il diritto di accedere ai tuoi dati personali, correggerli,
          esportarli o cancellarli. Per esercitare questi diritti scrivici a{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-purple-400 hover:text-purple-300"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Section>

      <Section title="Sicurezza">
        <p>
          Usiamo misure standard del settore per proteggere i tuoi dati in
          transito (TLS) e a riposo. I token di accesso sono conservati con
          cifratura a livello di database e sono disponibili solo per
          l&rsquo;account che li ha collegati.
        </p>
      </Section>

      <Section title="Modifiche a questa informativa">
        <p>
          Potremmo aggiornare questa informativa di tanto in tanto. In quel
          caso aggiorneremo la data di &ldquo;Ultimo aggiornamento&rdquo;
          qui sopra e, per le modifiche sostanziali, te lo comunicheremo via
          email o all&rsquo;interno del prodotto.
        </p>
      </Section>

      <Section title="Contatti">
        <p>
          Domande o richieste?{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-purple-400 hover:text-purple-300"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </Section>
    </div>
  );
}

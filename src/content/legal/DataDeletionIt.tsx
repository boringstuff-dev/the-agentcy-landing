import { CONTACT_EMAIL, Section } from "./Section";

/** The Italian text of /data-deletion, translated from DataDeletionEn.tsx.
 *  The English version is the reference; keep the two in step. */
export default function DataDeletionIt() {
  return (
    <div className="space-y-8 text-sm leading-relaxed">
      <section>
        <p>
          Puoi richiedere in qualsiasi momento la cancellazione del tuo
          account e di tutti i dati collegati. Questa pagina funge anche da{" "}
          <strong className="text-white">
            URL per la cancellazione dei dati utente
          </strong>{" "}
          richiesto da Meta / Instagram e da altri provider OAuth.
        </p>
      </section>

      <Section title="Opzione 1 — Scollega una singola piattaforma">
        <p>
          Per rimuovere solo i dati legati a uno specifico account social
          collegato (ad esempio solo LinkedIn o solo Instagram):
        </p>
        <ol className="list-decimal pl-6 space-y-1 mt-2">
          <li>Accedi al tuo account su app.the-agentcy.ai</li>
          <li>
            Vai su{" "}
            <strong className="text-white">
              Dashboard → Social Accounts
            </strong>
          </li>
          <li>
            Fai clic su <strong className="text-white">Disconnect</strong>{" "}
            nella scheda della piattaforma
          </li>
        </ol>
        <p className="mt-3">
          Scollegare revoca il token di accesso memorizzato e rimuove il
          record del collegamento dal nostro database. Ti consigliamo anche
          di revocare l&rsquo;accesso dell&rsquo;app direttamente dalla
          piattaforma:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/psettings/permitted-services"
              className="text-purple-400 hover:text-purple-300"
              target="_blank"
              rel="noreferrer noopener"
            >
              Privacy dei dati → Servizi autorizzati
            </a>
          </li>
          <li>
            Instagram / Meta:{" "}
            <a
              href="https://www.facebook.com/settings?tab=business_tools"
              className="text-purple-400 hover:text-purple-300"
              target="_blank"
              rel="noreferrer noopener"
            >
              Impostazioni di app e siti web
            </a>
          </li>
        </ul>
      </Section>

      <Section title="Opzione 2 — Elimina l&rsquo;intero account">
        <p>
          Per eliminare definitivamente il tuo account The Agentcy e tutti i
          dati collegati (brand, account collegati, progetti, metadati dei
          contenuti pubblicati), invia un&rsquo;email dall&rsquo;indirizzo
          registrato del tuo account a:
        </p>
        <p className="mt-3">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Account%20deletion%20request`}
            className="text-purple-400 hover:text-purple-300 text-base"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="mt-3">
          Usa come oggetto{" "}
          <em className="text-white">&ldquo;Account deletion request&rdquo;</em>.
          Ti confermeremo la ricezione e completeremo la cancellazione entro{" "}
          <strong className="text-white">30 giorni</strong>.
        </p>
      </Section>

      <Section title="Cosa viene eliminato">
        <ul className="list-disc pl-6 space-y-1">
          <li>Il record del tuo account e i dati di autenticazione</li>
          <li>Tutti i brand che hai creato, compresi i campi dell&rsquo;identità di brand</li>
          <li>Tutti i token delle piattaforme social collegate e i dati del profilo memorizzati</li>
          <li>Tutti i progetti, le risorse e le pubblicazioni che hai generato</li>
          <li>Tutti i suggerimenti di contenuto e le analisi di mercato generati dall&rsquo;AI</li>
          <li>I dati di fatturazione (conservati solo nei limiti previsti dalla legge)</li>
        </ul>
      </Section>

      <Section title="Cosa non viene eliminato">
        <p>
          I contenuti già pubblicati su piattaforme di terze parti (LinkedIn,
          Instagram, ecc.){" "}
          <strong className="text-white">non vengono rimossi da noi</strong>.
          Per eliminarli, rimuovili direttamente sulla piattaforma dove sono
          stati pubblicati.
        </p>
        <p className="mt-2">
          Potremmo conservare log minimi e anonimizzati per finalità di
          sicurezza e prevenzione delle frodi.
        </p>
      </Section>

      <Section title="Codice di conferma / riferimento della richiesta">
        <p>
          Per le richieste di cancellazione avviate tramite il provider OAuth
          (ad esempio quando Meta ci invia un webhook di cancellazione dei
          dati), risponderemo con un codice di conferma e un URL di stato da
          cui seguire la richiesta. Puoi anche scriverci a{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-purple-400 hover:text-purple-300"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          per verificarne lo stato.
        </p>
      </Section>
    </div>
  );
}

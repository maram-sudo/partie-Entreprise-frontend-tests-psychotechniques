import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Screen = "A1" | "R1" | "R2" | "R3" | "R4" | "R5" | "R6" | "C1" | "C2" | "C3" | "C4";
type IconName = "grid" | "campaign" | "users" | "results" | "tests" | "team" | "settings" | "bell" | "plus" | "chevron" | "upload" | "trash" | "check" | "info" | "clock" | "download" | "share" | "lock" | "more" | "edit" | "copy" | "eye" | "archive" | "chart" | "drag" | "image" | "warning" | "arrow" | "close" | "save" | "file" | "search" | "filter" | "note";

const DemoContext = createContext({ navigate: (_screen: Screen) => {}, toast: (_message: string) => {} });
const useDemo = () => useContext(DemoContext);

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const p: Record<IconName, ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    campaign: <><path d="m3 11 18-5v12L3 14zM11.6 16l1.1 4H7l-1-5" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></>,
    results: <><path d="M3 3v18h18" /><path d="m7 16 4-5 4 3 5-7" /></>,
    tests: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
    team: <><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a6 6 0 0 1 12 0v2M17 11h5M19.5 8.5v5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19 15l2 2-4 4-2-2M9 4 7 2 3 6l2 2M4 9v6M20 9v3" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M14 21h-4" /></>,
    plus: <path d="M12 5v14M5 12h14" />, chevron: <path d="m9 18 6-6-6-6" />,
    upload: <><path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4" /></>, trash: <><path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7" /></>,
    check: <path d="m5 12 4 4L19 6" />, info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>, download: <><path d="M12 3v12M7 10l5 5 5-5M4 19h16" /></>,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>, more: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
    edit: <><path d="M12 20h9M16.5 3.5a2 2 0 0 1 3 3L8 18l-4 1 1-4z" /></>, copy: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" /></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12" /><circle cx="12" cy="12" r="3" /></>, archive: <><path d="M3 5h18v4H3zM5 9v11h14V9M10 13h4" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>, drag: <><circle cx="9" cy="6" r="1" fill="currentColor" /><circle cx="15" cy="6" r="1" fill="currentColor" /><circle cx="9" cy="12" r="1" fill="currentColor" /><circle cx="15" cy="12" r="1" fill="currentColor" /><circle cx="9" cy="18" r="1" fill="currentColor" /><circle cx="15" cy="18" r="1" fill="currentColor" /></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m3 17 5-5 4 4 2-2 7 6" /></>, warning: <><path d="M10.3 3.5 2.4 18a2 2 0 0 0 1.8 3h15.6a2 2 0 0 0 1.8-3L13.7 3.5a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>, close: <><path d="m6 6 12 12M18 6 6 18" /></>, save: <><path d="M5 3h12l2 2v16H5zM8 3v6h8V3M8 21v-7h8v7" /></>,
    file: <><path d="M6 2h9l4 4v16H6zM14 2v5h5M9 13h6M9 17h6" /></>, search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    filter: <path d="M4 5h16l-6 7v6l-4 2v-8z" />, note: <><path d="M4 3h16v18H4zM8 8h8M8 12h8M8 16h5" /></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>;
}

function Button({ children, variant = "primary", icon, disabled, onClick }: { children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: IconName; disabled?: boolean; onClick?: () => void }) {
  const { toast } = useDemo();
  return <button className={`btn btn-${variant}`} disabled={disabled} onClick={onClick || (()=>toast("Action prise en compte"))}>{icon && <Icon name={icon} size={15} />}{children}</button>;
}

function Badge({ children, tone = "gray" }: { children: ReactNode; tone?: "green" | "amber" | "red" | "blue" | "gray" }) {
  return <span className={`badge badge-${tone}`}><i />{children}</span>;
}

function Field({ label, children, span }: { label: string; children: ReactNode; span?: boolean }) {
  return <label className={`field ${span ? "span-2" : ""}`}><span>{label}</span>{children}</label>;
}

function TextInput({ value, placeholder, mono = false }: { value?: string; placeholder?: string; mono?: boolean }) {
  return <div className={`input ${mono ? "mono" : ""}`}><input defaultValue={value} placeholder={placeholder} /></div>;
}

function SelectInput({ children }: { children: ReactNode }) {
  return <div className="input select"><select>{children}</select><Icon name="chevron" size={14} /></div>;
}

function Check({ label, checked = false, onChange }: { label: ReactNode; checked?: boolean; onChange?: () => void }) {
  return <label className="check"><input type="checkbox" checked={checked} onChange={onChange || (() => {})} /><span><Icon name="check" size={12} /></span><em>{label}</em></label>;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return <button className={`toggle ${checked ? "on" : ""}`} role="switch" aria-checked={checked} onClick={onChange}><span /></button>;
}

function RecruiterShell({ children, active = "Campagnes" }: { children: ReactNode; active?: string }) {
  const { navigate, toast } = useDemo();
  const nav: [string, IconName][] = [["Tableau de bord", "grid"], ["Campagnes", "campaign"], ["Candidats", "users"], ["Résultats", "results"], ["Épreuves", "tests"], ["Utilisateurs", "team"], ["Paramètres", "settings"]];
  const destinations: Record<string, Screen | undefined> = { "Tableau de bord": "R1", Campagnes: "R3", Résultats: "R3", Épreuves: "R5" };
  return <div className="shell">
    <aside className="sidebar"><div className="brand"><div className="brand-mark"><Icon name="check" size={17} /></div><span>TestPro</span></div>
      <nav><div className="nav-label">ESPACE DE TRAVAIL</div>{nav.map(([label, icon]) => <button className={active === label ? "active" : ""} key={label} onClick={() => destinations[label] ? navigate(destinations[label]!) : toast(`${label} : vue de démonstration`)}><Icon name={icon} /><span>{label}</span></button>)}</nav>
      <div className="side-profile"><div className="avatar">MB</div><div><strong>Mehdi Ben Ali</strong><span>Responsable recrutement</span></div><Icon name="more" size={16} /></div>
    </aside>
    <main className="main"><header className="topbar"><button className="company company-button" onClick={() => navigate("R1")}><div>S</div><span><strong>Sotetel</strong><small>Espace recruteur</small></span><Icon name="chevron" size={13} /></button><div className="top-actions"><button onClick={() => toast("Vous n’avez aucune nouvelle notification")}><Icon name="bell" /></button><button className="avatar avatar-button" onClick={() => toast("Profil de Mehdi Ben Ali")}>MB</button></div></header>{children}</main>
  </div>;
}

function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return <div className="page-head"><div><div className="page-title" role="heading" aria-level={1}>{title}</div>{subtitle && <p>{subtitle}</p>}</div><div className="head-actions">{children}</div></div>;
}

const candidates = [
  ["Sami Gharbi", "SG", "82", "76", "91", "84", "88", "green"],
  ["Inès Trabelsi", "IT", "79", "88", "82", "85", "86", "green"],
  ["Youssef Mansour", "YM", "91", "72", "76", "80", "84", "green"],
  ["Nour Ben Amor", "NB", "68", "81", "77", "72", "76", "green"],
  ["Aziz Khelifi", "AK", "74", "62", "70", "69", "69", "amber"],
  ["Lina Chaabane", "LC", "61", "73", "66", "64", "65", "amber"],
  ["Walid Jaziri", "WJ", "52", "59", "48", "57", "54", "amber"],
  ["Rania Toumi", "RT", "43", "51", "45", "39", "44", "red"],
];

function RecruiterDashboard() {
  const { navigate, toast } = useDemo();
  const recent = [
    ["Recrutement ingénieurs 2025", "Ingénieur réseaux", 18, 24, "En cours"],
    ["Équipe commerciale Nord", "Responsable commercial", 12, 12, "Terminée"],
    ["Programme jeunes diplômés", "Consultant junior", 31, 40, "En cours"],
    ["Support technique N2", "Technicien support", 0, 18, "Brouillon"],
  ];
  return <RecruiterShell active="Tableau de bord"><div className="content dashboard-page"><PageHeader title="Tableau de bord" subtitle="Bonjour Mehdi, voici un aperçu de votre activité."><Button icon="plus" onClick={() => navigate("R2")}>Nouvelle campagne</Button></PageHeader>
    <div className="dashboard-kpis">{[["Crédits restants","142","/200","credit"],["Campagnes actives","5","","+2 ce mois"],["Passations en cours","12","","4 aujourd’hui"],["Taux de complétion","87 %","","↑ 4,2 %"]].map((k,i)=><div className="card dashboard-kpi" key={k[0]}><span>{k[0]}</span><strong>{k[1]} <small>{k[2]}</small></strong>{i===0?<><div className="dash-progress"><i/></div><button onClick={()=>toast("Ouverture du rechargement de crédits")}>Recharger</button></>:<em>{k[3]}</em>}</div>)}</div>
    <div className="dashboard-middle"><section className="card dash-chart"><div className="dash-card-head"><div><strong>Passations par semaine</strong><span>6 dernières semaines</span></div><button onClick={()=>toast("Période : 6 dernières semaines")}>S1–S6 <Icon name="chevron" size={12}/></button></div><div className="dash-bars">{[35,52,68,48,79,94].map((v,i)=><div key={i}><i style={{height:`${v}%`}}/><span>S{i+1}</span></div>)}</div></section>
      <section className="card dash-alerts"><div className="dash-card-head"><div><strong>Alertes</strong><span>2 points à surveiller</span></div><Badge tone="amber">2</Badge></div><button onClick={()=>toast("Crédits : seuil d’alerte configuré")}><Icon name="warning"/><span><strong>Crédits &lt; 10 %</strong><small>Le seuil sera atteint dans 12 jours.</small></span></button><button onClick={()=>toast("Détail de la licence affiché")}><Icon name="clock"/><span><strong>Licence expire dans 30 jours</strong><small>Expiration le 24 décembre 2025.</small></span></button></section>
    </div>
    <section className="card dash-campaigns"><div className="dash-card-head"><div><strong>Campagnes récentes</strong><span>Suivez vos dernières campagnes</span></div><button onClick={()=>navigate("R3")}>Voir tout <Icon name="arrow" size={12}/></button></div><table className="simple-table"><thead><tr><th>Campagne</th><th>Poste</th><th>Testés</th><th>Statut</th><th/></tr></thead><tbody>{recent.map(r=><tr key={r[0] as string}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td><div className="dash-tested"><span>{r[2]}/{r[3]}</span><div><i style={{width:`${(+r[2]/+r[3])*100}%`}}/></div></div></td><td><Badge tone={r[4]==="En cours"?"blue":r[4]==="Terminée"?"green":"gray"}>{r[4]}</Badge></td><td><button className="link-btn" onClick={()=>navigate("R3")}>Voir <Icon name="chevron" size={12}/></button></td></tr>)}</tbody></table></section>
  </div></RecruiterShell>;
}

function NewCampaign() {
  const { navigate, toast } = useDemo();
  const [elimination, setElimination] = useState<string[]>([]);
  const [weights, setWeights] = useState([40,20,25,15]);
  const [privateTests, setPrivateTests] = useState<string[]>([]);
  const [testModal, setTestModal] = useState(false);
  const [language, setLanguage] = useState("FR");
  const [candidateRows, setCandidateRows] = useState([["Amine Ben Salah","amine.bensalah@email.tn","+216 22 458 931"],["Sarra Gharbi","sarra.gharbi@email.tn","+216 98 142 560"],["Youssef Trabelsi","y.trabelsi@email.tn","+216 55 704 219"],["Nour Kammoun","nour.kammoun@email.tn","+216 29 318 742"],["Ahmed Mansour","ahmed.mansour@email.tn","+216 20 845 116"]]);
  const [candidateCount, setCandidateCount] = useState(24);
  const total = weights.reduce((sum,value)=>sum+value,0);
  const addCandidates = (kind: "csv" | "manual") => {
    const row = kind === "csv" ? ["Leïla Ayari","leila.ayari@email.tn","+216 26 903 115"] : ["Fares Dridi","fares.dridi@email.tn","+216 97 610 284"];
    setCandidateRows(rows => [...rows,row]); setCandidateCount(count => count + (kind === "csv" ? 6 : 1)); toast(kind === "csv" ? "6 candidats importés depuis le fichier CSV" : "Candidat ajouté manuellement");
  };
  return <RecruiterShell active="Campagnes"><div className="content campaign-form-page">
    <div className="breadcrumb">Campagnes <Icon name="chevron" size={12} /> Nouvelle campagne</div>
    <PageHeader title="Nouvelle campagne" subtitle="Configurez votre campagne et invitez vos candidats." />
    <div className="form-layout"><div className="form-main">
      <section className="card form-section"><div className="section-heading"><span>1</span><div><strong>Informations</strong><p>Définissez les informations principales de la campagne.</p></div></div>
        <div className="form-grid"><Field label="Intitulé de la campagne" span><TextInput value="Commercial Junior - Tunis" /></Field><Field label="Poste / profil cible"><SelectInput><option>Commercial junior</option><option>Responsable commercial</option></SelectInput></Field><Field label="Validité des clés"><SelectInput><option>7 jours</option><option>14 jours</option><option>30 jours</option></SelectInput></Field><Field label="Description" span><div className="textarea"><textarea defaultValue="Évaluation des aptitudes pour le recrutement de commerciaux juniors basés à Tunis." /></div></Field><Field label="Langue des candidats" span><div className="language-group">{["FR","AR","EN"].map(lang=><button key={lang} className={language===lang?"active":""} onClick={()=>setLanguage(lang)}>{lang}</button>)}</div></Field></div>
      </section>
      <section className="card form-section"><div className="section-heading"><span>2</span><div><strong>Batterie de tests</strong><p>Sélectionnez un modèle puis ajustez les épreuves et leur poids.</p></div></div>
        <Field label="Modèle de batterie"><SelectInput><option>Commercial</option><option>Administratif</option><option>Technique</option><option>Management</option><option>Informatique</option><option>Production</option></SelectInput></Field>
        <div className="test-list"><div className="test-list-head"><span>Épreuve</span><span>Poids</span><span>Durée</span><span>Seuil éliminatoire</span><span /></div>
          {[["Numérique","20 min"],["Verbal","15 min"],["Attention","10 min"],["Logique","15 min"]].map(([name,time], i) => <div className="test-row" key={name}><Check label={<strong>{name}</strong>} checked onChange={()=>toast(`${name} est requis dans ce modèle`)}/><div className="weight-input"><input type="number" value={weights[i]} onChange={e=>setWeights(values=>values.map((v,j)=>j===i?Number(e.target.value):v))}/><span>%</span></div><span className="duration"><Icon name="clock" size={13} />{time}</span><Toggle checked={elimination.includes(name)} onChange={() => setElimination(list=>list.includes(name)?list.filter(x=>x!==name):[...list,name])} /><button className="icon-btn" onClick={()=>toast(`Options de l’épreuve ${name}`)}><Icon name="more" size={16} /></button></div>)}
          {privateTests.map(name=><div className="test-row private-row" key={name}><Check label={<span><strong>{name}</strong><Badge tone="amber">Non étalonnée</Badge><em className="private-tag">Privée</em></span>} checked onChange={()=>toast("Épreuve privée sélectionnée")}/><div className="weight-input muted-weight"><input value="0" readOnly/><span>%</span></div><span className="duration"><Icon name="clock" size={13} />12 min</span><Toggle checked={elimination.includes(name)} onChange={()=>setElimination(list=>list.includes(name)?list.filter(x=>x!==name):[...list,name])}/><button className="icon-btn" onClick={()=>setPrivateTests(list=>list.filter(x=>x!==name))}><Icon name="trash" size={15} /></button></div>)}
        </div>
        <div className="test-footer"><Button variant="secondary" icon="plus" onClick={()=>setTestModal(true)}>Ajouter une épreuve personnalisée</Button><div className={`weight-total ${total!==100?"invalid-total":""}`}><span>Total des poids</span><strong>{total===100&&<Icon name="check" size={14}/ >}{total} %</strong></div></div>
      </section>
      <section className="card form-section"><div className="section-heading"><span>3</span><div><strong>Candidats</strong><p>Ajoutez les personnes à inviter à cette campagne.</p></div></div>
        <div className="candidate-actions"><Button variant="secondary" icon="upload" onClick={()=>addCandidates("csv")}>Importer CSV</Button><Button variant="secondary" icon="plus" onClick={()=>addCandidates("manual")}>Ajouter manuellement</Button><span>{candidateRows.length} affichés · {candidateCount} candidats ajoutés</span></div>
        <table className="simple-table"><thead><tr><th>Nom</th><th>E-mail</th><th>Téléphone</th><th /></tr></thead><tbody>
          {candidateRows.map(row => <tr key={row[0]}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td><td><button className="icon-btn danger-text" onClick={()=>{setCandidateRows(rows=>rows.filter(r=>r[0]!==row[0]));setCandidateCount(c=>c-1)}}><Icon name="trash" size={14} /></button></td></tr>)}
        </tbody></table>
      </section>
    </div>
    <aside className="summary-card card"><div className="summary-title">Récapitulatif</div><div className="summary-campaign"><span>Campagne</span><strong>Commercial Junior - Tunis</strong><small>Commercial junior · Français</small></div>
      <div className="summary-list"><div><span><Icon name="clock" size={15} />Durée totale estimée</span><strong>60 min</strong></div><div><span><Icon name="users" size={15} />Candidats ajoutés</span><strong>{candidateCount}</strong></div><div><span><Icon name="file" size={15} />Crédits nécessaires</span><strong>{candidateCount}</strong></div><div><span><Icon name="chart" size={15} />Solde après envoi</span><strong className="green-text">{142-candidateCount}</strong></div></div>
      <div className="info-note"><Icon name="info" size={16} /><p>Un crédit sera débité pour chaque candidat au moment de l’envoi.</p></div>
      <div className="summary-actions"><Button variant="secondary" onClick={()=>toast("Brouillon enregistré")}>Enregistrer brouillon</Button><Button icon="arrow" disabled={total!==100} onClick={()=>{toast("Campagne générée et invitations envoyées");setTimeout(()=>navigate("R3"),700)}}>Générer et envoyer</Button></div>
    </aside></div>
    {testModal&&<div className="modal-backdrop"><div className="selection-modal card"><div className="drawer-head"><div><strong>Ajouter une épreuve privée</strong><span>Épreuves publiées disponibles</span></div><button onClick={()=>setTestModal(false)}><Icon name="close"/></button></div>{["Mise en situation commerciale","Culture produit Sotetel","Connaissances réseau IP"].map(name=><button className="private-test-choice" key={name} onClick={()=>{setPrivateTests(list=>list.includes(name)?list:[...list,name]);setTestModal(false);toast(`${name} ajoutée`)}}><div><Icon name="tests"/><span><strong>{name}</strong><small>Privée · Publiée</small></span></div><Badge tone="amber">Non étalonnée</Badge></button>)}</div></div>}
  </div></RecruiterShell>;
}

function Radar({ compact = false }: { compact?: boolean }) {
  return <svg className={`radar ${compact ? "compact" : ""}`} viewBox="0 0 260 230" aria-label="Graphique radar des résultats">
    <g transform="translate(130 118)">{[1,.75,.5,.25].map((scale) => <polygon key={scale} points={`0,${-90*scale} ${85.6*scale},${-27.8*scale} ${52.9*scale},${72.8*scale} ${-52.9*scale},${72.8*scale} ${-85.6*scale},${-27.8*scale}`} className="radar-grid" />)}<line x1="0" y1="0" x2="0" y2="-90" /><line x1="0" y1="0" x2="85.6" y2="-27.8" /><line x1="0" y1="0" x2="52.9" y2="72.8" /><line x1="0" y1="0" x2="-52.9" y2="72.8" /><line x1="0" y1="0" x2="-85.6" y2="-27.8" />
      {compact ? <><polygon points="0,-76 70,-23 42,58 -42,58 -66,-21" className="radar-fill blue-fill" /><polygon points="0,-67 76,-25 36,50 -48,66 -61,-20" className="radar-fill violet-fill" /><polygon points="0,-82 62,-20 46,64 -38,52 -72,-23" className="radar-fill green-fill" /></> : <polygon points="0,-79 76,-25 41,57 -45,62 -73,-24" className="radar-fill blue-fill" />}</g>
    {!compact && <g className="radar-labels"><text x="130" y="13" textAnchor="middle">Numérique</text><text x="236" y="91">Verbal</text><text x="195" y="218">Attention</text><text x="65" y="218" textAnchor="end">Logique</text><text x="24" y="91" textAnchor="end">Rapidité</text></g>}
  </svg>;
}

function CampaignResults() {
  const { navigate, toast } = useDemo();
  const [selected, setSelected] = useState<number[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [minimum, setMinimum] = useState(40);
  const [search, setSearch] = useState("");
  const toggle = (i: number) => setSelected(selected.includes(i) ? selected.filter(x => x !== i) : selected.length < 5 ? [...selected, i] : selected);
  const visible = candidates.filter(c=>+c[6]>=minimum&&c[0].toLowerCase().includes(search.toLowerCase()));
  return <RecruiterShell active="Résultats"><div className={`content results-page ${drawer ? "drawer-open" : ""}`}>
    <div className="breadcrumb">Campagnes <Icon name="chevron" size={12} /> Commercial Junior - Tunis <Icon name="chevron" size={12} /> Résultats</div>
    <PageHeader title="Commercial Junior - Tunis" subtitle="24 candidats · Créée le 12 mai 2025"><Badge tone="blue">En cours</Badge><Button variant="secondary" disabled={selected.length < 2 || selected.length > 5} onClick={() => setDrawer(true)}>Comparer ({selected.length})</Button><div className="split-button"><Button variant="secondary" icon="download" onClick={()=>setExportOpen(!exportOpen)}>Exporter</Button><button onClick={()=>setExportOpen(!exportOpen)}><Icon name="chevron" size={13} /></button>{exportOpen&&<div className="export-menu"><button onClick={()=>{toast("Export CSV téléchargé");setExportOpen(false)}}>CSV</button><button onClick={()=>{toast("Export Excel téléchargé");setExportOpen(false)}}>Excel</button></div>}</div></PageHeader>
    <div className="filter-row card"><div className="range-filter"><span>Adéquation minimale</span><input type="range" value={minimum} onChange={e=>setMinimum(Number(e.target.value))}/><strong>{minimum} %</strong></div><Field label="Statut"><SelectInput><option>Tous les statuts</option><option>Terminée</option><option>En cours</option></SelectInput></Field><div className="search-input"><Icon name="search" size={15} /><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un candidat…" /></div></div>
    <div className="card results-table-wrap"><table className="results-table"><thead><tr><th><Check label="" checked={selected.length===visible.length&&visible.length>0} onChange={()=>setSelected(selected.length===visible.length?[]:visible.map(c=>candidates.indexOf(c)).slice(0,5))}/></th><th>Rang</th><th>Candidat</th><th>Numérique</th><th>Verbal</th><th>Attention</th><th>Logique<small>non étalonnée</small></th><th>Adéquation</th><th /></tr></thead><tbody>{visible.map((c) => {const i=candidates.indexOf(c);return <tr key={c[0]}><td><Check label="" checked={selected.includes(i)} onChange={() => toggle(i)} /></td><td><span className={`rank ${i < 3 ? "top" : ""}`}>{i+1}</span></td><td><div className="person"><div className="avatar">{c[1]}</div><strong>{c[0]}</strong></div></td>{c.slice(2,6).map((score,j) => <td key={j}><span className={`score-cell ${+score >= 75 ? "high" : +score >= 55 ? "mid" : "low"}`}>{score}</span></td>)}<td><div className="fit-score"><i className={c[7]} /><strong>{c[6]} %</strong></div></td><td><button className="link-btn" onClick={()=>navigate("R4")}>Voir <Icon name="chevron" size={12} /></button></td></tr>})}</tbody></table><div className="score-note">Scores /100 — la décision finale reste humaine.</div></div>
    {drawer && <aside className="comparison-drawer"><div className="drawer-head"><div><strong>Comparer les candidats</strong><span>{selected.length} candidats sélectionnés</span></div><button onClick={() => setDrawer(false)}><Icon name="close" /></button></div><div className="compare-people">{selected.map((idx,i) => {const c=candidates[idx];return <div key={c[0]}><div className={`avatar avatar-${i}`}>{c[1]}</div><strong>{c[0]}</strong><span>{c[6]} % d’adéquation</span></div>})}</div><div className="compare-radar"><Radar compact /><div className="legend"><span><i className="blue-dot" />Candidat 1</span><span><i className="violet-dot" />Candidat 2</span><span><i className="green-dot" />Candidat 3</span></div></div><div className="compare-table">{["Numérique","Verbal","Attention","Logique"].map((test,j) => <div key={test}><span>{test}</span>{selected.slice(0,3).map(idx => <strong key={idx}>{candidates[idx][j+2]}</strong>)}</div>)}</div><Button onClick={()=>toast("Comparaison détaillée prête")}>Voir la comparaison détaillée</Button></aside>}
  </div></RecruiterShell>;
}

function CandidateReport() {
  const { toast } = useDemo();
  const [note,setNote]=useState("");
  const [notes,setNotes]=useState<string[]>([]);
  return <RecruiterShell active="Candidats"><div className="content report-page">
    <div className="breadcrumb">Candidats <Icon name="chevron" size={12} /> Amine Ben Salah <Icon name="chevron" size={12} /> Rapport</div>
    <PageHeader title="Rapport candidat"><Button variant="secondary" icon="download" onClick={()=>toast("Le rapport PDF a été téléchargé")}>Télécharger PDF</Button><Button icon="share" onClick={()=>toast("Lien de partage copié")}>Partager</Button></PageHeader>
    <section className="card report-hero"><div className="candidate-id"><div className="avatar avatar-lg">AB</div><div><div className="candidate-name">Amine Ben Salah</div><span>amine.bensalah@email.tn</span></div></div><div className="report-meta"><div><span>Campagne</span><strong>Commercial Junior - Tunis</strong></div><div><span>Date de passation</span><strong>18 mai 2025, 14:32</strong></div><div><span>Durée</span><strong>56 min 24 s</strong></div></div><div className="hero-badges"><Badge tone="green">Session complète</Badge><button onClick={()=>toast("2 changements d’onglet détectés")}><Badge tone="amber">Alertes : 2</Badge></button></div><div className="big-score"><div><strong>88</strong><span>%</span></div><small>Adéquation</small><Badge tone="green">Fort</Badge></div></section>
    <div className="report-grid"><section className="card radar-card"><div className="card-title">Profil d’aptitudes</div><p>Positionnement du candidat sur les compétences évaluées.</p><Radar /><div className="radar-scale"><span>Score candidat</span><small>Échelle de 0 à 100</small></div></section>
      <div className="insight-stack"><section className="insight card strength"><div className="insight-title"><div><Icon name="check" size={16} /></div>Points forts</div><ul><li>Excellente capacité de raisonnement numérique</li><li>Très bonne attention aux détails</li><li>Rapidité d’exécution supérieure à la moyenne</li></ul></section><section className="insight card vigilance"><div className="insight-title"><div><Icon name="warning" size={16} /></div>Points de vigilance</div><ul><li>Performance verbale légèrement variable</li><li>Deux changements d’onglet détectés</li></ul></section><section className="insight card interview"><div className="insight-title"><div><Icon name="note" size={16} /></div>Questions d’entretien suggérées</div><ol><li>Décrivez une situation où vous avez dû analyser rapidement des données.</li><li>Comment gérez-vous plusieurs priorités simultanées ?</li><li>Donnez un exemple de négociation difficile.</li><li>Comment vérifiez-vous la qualité de votre travail ?</li></ol></section></div>
    </div>
    <section className="card score-table-card"><div className="card-title">Détail des scores</div><table className="simple-table score-table"><thead><tr><th>Épreuve</th><th>Score brut</th><th>Résultat</th><th>Temps passé</th><th>Interprétation</th></tr></thead><tbody>{[["Raisonnement numérique","34/40","85 %","18 min 42 s","Fort"],["Raisonnement verbal","16/20","80 %","13 min 08 s","Fort"],["Attention","23/25","92 %","09 min 11 s","Très fort"],["Raisonnement logique","13/15","87 %","14 min 23 s","Fort"]].map((r,i)=><tr key={r[0]}><td><strong>{r[0]}</strong>{i===3&&<Badge tone="amber">Non étalonnée, créée par l’entreprise</Badge>}</td><td>{r[1]}</td><td><strong>{r[2]}</strong></td><td>{r[3]}</td><td><Badge tone="green">{r[4]}</Badge></td></tr>)}</tbody></table></section>
    <section className="card notes-card"><div><div className="card-title">Notes du recruteur</div><p>Ces notes sont privées et visibles uniquement par votre équipe.</p></div><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Ajoutez vos observations sur le candidat…" /><Button icon="plus" disabled={!note.trim()} onClick={()=>{setNotes(list=>[...list,note]);setNote("");toast("Note ajoutée")}}>Ajouter note</Button>{notes.length>0&&<div className="notes-list">{notes.map((item,i)=><div key={i}><Icon name="note" size={13}/><span>{item}</span><small>À l’instant</small></div>)}</div>}</section>
    <div className="human-note"><Icon name="info" size={14} />Le score aide à décider, la décision reste humaine.</div>
  </div></RecruiterShell>;
}

const testsLibrary = [
  ["Raisonnement numérique","Catalogue","Numérique","30","20 min","v2","Publié","12 avr. 2025","TestPro"],
  ["Raisonnement verbal","Catalogue","Verbal","25","15 min","v1","Publié","28 mars 2025","TestPro"],
  ["Logique abstraite","Catalogue","Logique","20","15 min","v2","Publié","04 mai 2025","TestPro"],
  ["Attention sélective","Catalogue","Attention","40","10 min","v1","Publié","16 févr. 2025","TestPro"],
  ["Mise en situation commerciale","Privée","Jugement situationnel","18","12 min","v3","Publié","Aujourd’hui, 09:14","Mehdi B."],
  ["Connaissances réseau IP","Privée","Technique","35","25 min","v1","Brouillon","Hier, 16:40","Sarra K."],
  ["Questionnaire valeurs Sotetel","Privée","Personnalité","24","15 min","v2","Archivé","10 mai 2025","Mehdi B."],
  ["Mémoire visuelle terrain","Privée","Mémoire","16","8 min","v1","Brouillon","08 mai 2025","Nour A."],
];

function TestLibrary() {
  const { navigate, toast } = useDemo();
  const [search,setSearch]=useState(""),[origin,setOrigin]=useState("Origine"),[status,setStatus]=useState("Statut"),[type,setType]=useState("Type"),[language,setLanguage]=useState("Langue"),[menu,setMenu]=useState<number|null>(5);
  const rows=testsLibrary.filter(r=>r[0].toLowerCase().includes(search.toLowerCase())&&(origin==="Origine"||r[1]===origin)&&(status==="Statut"||r[6]===status)&&(type==="Type"||r[2]===type));
  return <RecruiterShell active="Épreuves"><div className="content library-page"><PageHeader title="Bibliothèque des épreuves" subtitle="Gérez les tests du catalogue et vos créations privées."><Button variant="secondary" icon="upload" onClick={()=>toast("Sélecteur de fichier CSV/Excel ouvert")}>Importer des questions (CSV/Excel)</Button><Button variant="secondary" icon="plus" onClick={()=>toast("Nouvelle batterie créée")}>Créer une batterie</Button><Button icon="plus" onClick={()=>navigate("R6")}>Nouvelle épreuve</Button></PageHeader>
    <div className="quota-strip card">{[["Épreuves","8","20","40"],["Questions","240","1000","24"],["Médias","120","500 Mo","24"]].map(q=><div key={q[0]}><div><span>{q[0]}</span><strong>{q[1]}<small>/{q[2]}</small></strong></div><div className="quota-bar"><i style={{width:`${q[3]}%`}} /></div></div>)}</div>
    <div className="library-filters card"><div className="search-input"><Icon name="search" size={15}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher une épreuve…" /></div><Field label=""><div className="input select"><select value={origin} onChange={e=>setOrigin(e.target.value)}><option>Origine</option><option>Catalogue</option><option>Privée</option></select><Icon name="chevron" size={14}/></div></Field><Field label=""><div className="input select"><select value={status} onChange={e=>setStatus(e.target.value)}><option>Statut</option><option>Brouillon</option><option>Publié</option><option>Archivé</option></select><Icon name="chevron" size={14}/></div></Field><Field label=""><div className="input select"><select value={type} onChange={e=>setType(e.target.value)}><option>Type</option>{["Numérique","Verbal","Logique","Attention","Jugement situationnel","Technique","Personnalité","Mémoire"].map(x=><option key={x}>{x}</option>)}</select><Icon name="chevron" size={14}/></div></Field><Field label=""><div className="input select"><select value={language} onChange={e=>setLanguage(e.target.value)}><option>Langue</option><option>Français</option><option>Arabe</option><option>Anglais</option></select><Icon name="chevron" size={14}/></div></Field><button className="filter-button" onClick={()=>{setSearch("");setOrigin("Origine");setStatus("Statut");setType("Type");setLanguage("Langue");toast("Filtres réinitialisés")}}><Icon name="filter" size={15}/>Réinitialiser</button></div>
    <section className="card library-table"><table className="simple-table"><thead><tr><th>Intitulé</th><th>Origine</th><th>Type</th><th>Questions</th><th>Durée</th><th>Version</th><th>Statut</th><th>Dernière modification</th><th>Créé par</th><th /></tr></thead><tbody>{rows.map((r)=>{const i=testsLibrary.indexOf(r);return <tr key={r[0]}><td><div className="test-name"><div className={r[1]==="Catalogue"?"catalog-icon":"private-icon"}><Icon name={r[1]==="Catalogue"?"lock":"tests"} size={14}/></div><div><strong>{r[0]}</strong>{i===4&&<span className="lock-tip"><Icon name="lock" size={11}/>Déjà passée<span>Toute modification crée une nouvelle version</span></span>}</div></div></td><td><Badge tone={r[1]==="Catalogue"?"gray":"blue"}>{r[1]}</Badge></td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td><span className="version">{r[5]}</span></td><td><Badge tone={r[6]==="Publié"?"green":r[6]==="Brouillon"?"amber":"gray"}>{r[6]}</Badge></td><td>{r[7]}</td><td>{r[8]}</td><td><div className="row-menu"><button onClick={()=>setMenu(menu===i?null:i)}><Icon name="more" size={16}/></button>{menu===i&&<div className="menu-popover">{r[1]==="Privée"&&r[6]==="Brouillon"&&<button onClick={()=>navigate("R6")}><Icon name="edit" size={14}/>Modifier</button>}<button onClick={()=>toast(`${r[0]} dupliquée`)}><Icon name="copy" size={14}/>Dupliquer</button><button onClick={()=>toast(`Prévisualisation de ${r[0]}`)}><Icon name="eye" size={14}/>Prévisualiser</button>{r[1]==="Privée"&&<><button onClick={()=>toast(`${r[0]} publiée`)}><Icon name="check" size={14}/>Publier</button><button onClick={()=>toast(`${r[0]} archivée`)}><Icon name="archive" size={14}/>Archiver</button><button onClick={()=>toast(`Statistiques de ${r[0]}`)}><Icon name="chart" size={14}/>Statistiques</button></>}</div>}</div></td></tr>})}</tbody></table><div className="table-bottom"><span>{rows.length} épreuves affichées</span><span>Les épreuves du catalogue sont en lecture seule.</span></div></section>
  </div></RecruiterShell>;
}

function QuestionEditor() {
  const { navigate, toast } = useDemo();
  const [random, setRandom] = useState(true);
  const [options,setOptions] = useState(["32","36","40","44"]);
  const [correct,setCorrect]=useState(2);
  const [type,setType]=useState("QCM — Choix unique");
  const updateOption=(i:number,value:string)=>setOptions(list=>list.map((o,j)=>j===i?value:o));
  return <RecruiterShell active="Épreuves"><div className="content editor-page"><div className="editor-head"><div><div className="breadcrumb">Épreuves <Icon name="chevron" size={12}/> Raisonnement logique Sotetel <Icon name="chevron" size={12}/> Question 12</div><div className="editor-title"><div className="page-title">Question 12</div><Badge tone="amber">Brouillon</Badge></div></div><div className="head-actions"><Button variant="ghost" icon="copy">Dupliquer la question</Button><Button variant="danger" icon="trash">Supprimer</Button></div></div>
    <div className="editor-layout"><div className="editor-main">
      <section className="card editor-card"><Field label="Énoncé"><div className="rich-text"><div className="rich-toolbar"><strong>B</strong><em>I</em><span>U</span><i/><button onClick={()=>toast("Alignement appliqué")}>≡</button><button onClick={()=>toast("Liste ajoutée")}>• Liste</button><button onClick={()=>toast("Formule ajoutée")}>ƒx</button></div><textarea defaultValue={"Quel nombre complète logiquement la suite suivante ?\n\n4     8     16     24     ?"} /></div></Field>
        <Field label="Média (facultatif)"><div className="upload-zone"><div><Icon name="image" size={19}/></div><p><strong>Ajouter une image ou un tableau</strong><span>PNG, JPG ou CSV · 5 Mo maximum</span></p><Button variant="secondary" onClick={()=>toast("Sélecteur de média ouvert")}>Parcourir</Button></div></Field>
        <Field label="Type de réponse"><div className="input select"><select value={type} onChange={e=>setType(e.target.value)}><option>QCM — Choix unique</option><option>Réponse numérique</option><option>Séquence</option><option>Appariement</option><option>Échelle de Likert</option></select><Icon name="chevron" size={14}/></div></Field>
        <div className="option-title"><span>Options de réponse</span><small>{type==="QCM — Choix unique"?"Sélectionnez la bonne réponse.":`Configuration : ${type}`}</small></div><div className="answer-editor">{options.map((o,i)=><div className="answer-edit" key={i}><Icon name="drag" size={15}/><span className="option-letter">{String.fromCharCode(65+i)}</span><div className="input"><input value={o} onChange={e=>updateOption(i,e.target.value)}/></div><Check label="Bonne réponse" checked={i===correct} onChange={()=>setCorrect(i)}/><button onClick={()=>{setOptions(list=>list.filter((_,j)=>j!==i));if(correct>=i)setCorrect(0)}}><Icon name="trash" size={14}/></button></div>)}</div>
        <div className="option-actions"><Button variant="secondary" icon="plus" onClick={()=>setOptions(list=>[...list,"Nouvelle option"])}>Ajouter une option</Button><div><span>Ordre aléatoire des options</span><Toggle checked={random} onChange={()=>setRandom(!random)}/></div></div>
      </section>
      <section className="card scoring-card"><div className="card-title">Barème</div><div className="scoring-grid"><Field label="Points"><TextInput value="1" /></Field><Field label="Pénalité (facultatif)"><TextInput value="0" /></Field><Field label="Temps conseillé (secondes)"><TextInput value="45" /></Field><Field label="Difficulté"><SelectInput><option>Moyen</option><option>Facile</option><option>Difficile</option></SelectInput></Field><Field label="Catégorie"><SelectInput><option>Suites numériques</option></SelectInput></Field></div></section>
      <div className="warning-strip"><Icon name="warning" size={17}/><span>Pas de contenu discriminatoire ni de test protégé reproduit.</span></div>
    </div>
    <aside className="preview-panel card"><div className="preview-head"><div><span>Aperçu candidat</span><small>{type}</small></div><Icon name="eye" size={17}/></div><div className="candidate-preview"><div className="preview-test-head"><span>Raisonnement logique</span><strong><Icon name="clock" size={14}/>00:45</strong></div><div className="preview-progress"><i/></div><div className="preview-body"><span>Question 12 sur 20</span><strong>Quel nombre complète logiquement la suite suivante ?</strong><div className="number-sequence">4 <i/> 8 <i/> 16 <i/> 24 <i/> ?</div><div className="preview-options">{options.map((o,i)=><button key={i} className={i===correct?"selected":""} onClick={()=>setCorrect(i)}><span>{String.fromCharCode(65+i)}</span><strong>{o}</strong>{i===correct&&<Icon name="check" size={14}/>}</button>)}</div><Button onClick={()=>toast("Aperçu : réponse enregistrée")}>Question suivante <Icon name="arrow" size={14}/></Button></div></div></aside>
    </div>
    <div className="editor-footer"><span>Dernière sauvegarde il y a 2 min</span><div><Button variant="secondary" icon="eye" onClick={()=>toast("Mode aperçu activé")}>Aperçu</Button><Button icon="save" onClick={()=>{toast("Question enregistrée");setTimeout(()=>navigate("R5"),600)}}>Enregistrer</Button></div></div>
  </div></RecruiterShell>;
}

function EntryPage() {
  const { navigate, toast } = useDemo();
  const [language, setLanguage] = useState<"FR"|"AR"|"EN">("FR");
  const [key,setKey]=useState("");
  const [error, setError] = useState(false);
  const rtl=language==="AR";
  const start=()=>{if(key==="0000-0000-0000"||!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(key)){setError(true)}else navigate("C2")};
  return <div className="candidate-shell" dir={rtl?"rtl":"ltr"}><header className="candidate-header"><div className="candidate-brand"><div>S</div><strong>Sotetel</strong></div><div className="lang-switch">{(["FR","AR","EN"] as const).map(lang=><button key={lang} className={language===lang?"active":""} onClick={()=>setLanguage(lang)}>{lang==="AR"?"العربية":lang}</button>)}</div></header>
    <div className="candidate-center"><div className="entry-card card"><div className="entry-logo">S</div><div className="entry-title">{rtl?"مرحباً! أنت مدعو لإجراء تقييم":language==="EN"?"Welcome! You are invited to take an assessment":"Bienvenue ! Vous êtes invité(e) à passer une évaluation"}</div><p>{rtl?"أدخل المفتاح الذي أرسله لك مسؤول التوظيف.":language==="EN"?"Enter the key sent by your recruiter to begin.":"Saisissez la clé transmise par votre recruteur pour commencer."}</p><label className={`key-field ${error?"has-error":""}`}><span>{rtl?"مفتاح التقييم":language==="EN"?"Assessment key":"Clé d’évaluation"}</span><input value={key} placeholder="XXXX-XXXX-XXXX" onChange={e=>{setKey(e.target.value.toUpperCase());setError(false)}}/>{error&&<em><Icon name="warning" size={13}/>{rtl?"هذا المفتاح غير صالح أو انتهت صلاحيته.":"Cette clé est invalide ou a expiré."}</em>}</label><Button onClick={start}>{rtl?"ابدأ":language==="EN"?"Start":"Commencer"} <Icon name="arrow" size={15}/></Button><div className="entry-info"><span><Icon name="clock" size={15}/>{rtl?"المدة المقدرة: 60 دقيقة":"Durée estimée : 60 min"}</span><span><Icon name="info" size={15}/>{rtl?"اختر مكاناً هادئاً واتصالاً مستقراً.":"Choisissez un endroit calme avec une connexion stable."}</span></div></div><button className="invalid-link" onClick={()=>toast("Le recruteur a été informé de votre demande")}>{rtl?"المفتاح غير صالح؟ اتصل بمسؤول التوظيف":"Clé invalide ? Contactez le recruteur"}</button></div>
    <footer className="candidate-footer">Évaluation sécurisée par <strong>TestPro</strong></footer>
  </div>;
}

function InstructionsPage() {
  const { navigate, toast } = useDemo();
  const [data, setData] = useState(false), [alone, setAlone] = useState(false), [accommodation, setAccommodation] = useState(false);
  return <div className="candidate-shell instructions-page"><header className="candidate-header"><div className="candidate-brand"><div>S</div><strong>Sotetel</strong></div><div className="lang-switch"><button className="active" onClick={()=>toast("Langue : français")}>FR</button><button onClick={()=>toast("Langue arabe disponible depuis la page précédente")}>العربية</button><button onClick={()=>toast("English available from the previous page")}>EN</button></div></header>
    <div className="instructions-wrap"><div className="stepper"><div className="done"><span><Icon name="check" size={13}/></span><strong>Clé</strong></div><i/><div className="active"><span>2</span><strong>Consentement</strong></div><i/><div><span>3</span><strong>Test</strong></div></div><div className="instructions-title"><div className="page-title">Consentement et instructions</div><p>Prenez quelques minutes pour lire ces informations avant de commencer.</p></div>
      <section className="card instruction-card"><div className="instruction-icon blue"><Icon name="tests"/></div><div className="instruction-content"><div className="card-title">Déroulé de l’évaluation</div><p>Vous allez réaliser 4 épreuves dans l’ordre suivant :</p><ol>{[["Numérique","20 min"],["Verbal","15 min"],["Attention","10 min"],["Logique","15 min"]].map((t,i)=><li key={t[0]}><span>{i+1}</span><strong>{t[0]}</strong><em>{t[1]}</em></li>)}</ol><div className="small-note"><Icon name="clock" size={14}/>Épreuves chronométrées, sans pause entre les sections.</div></div></section>
      <section className="card instruction-card"><div className="instruction-icon violet"><Icon name="lock"/></div><div className="instruction-content"><div className="card-title">Vos données</div><div className="data-grid"><div><strong>Pourquoi ?</strong><p>Évaluer votre adéquation au poste dans le cadre de cette campagne.</p></div><div><strong>Conservation</strong><p>Vos résultats sont conservés pendant 12 mois, puis supprimés.</p></div><div><strong>Vos droits</strong><p>Vous pouvez demander l’accès, la rectification ou la suppression de vos données.</p></div></div><button className="link-btn" onClick={()=>toast("Politique de confidentialité ouverte")}>Consulter la politique de confidentialité <Icon name="arrow" size={12}/></button></div></section>
      <section className="card instruction-card"><div className="instruction-icon green"><Icon name="check"/></div><div className="instruction-content consent-content"><div className="card-title">Consentements</div><p>Ces deux consentements sont requis pour poursuivre.</p><Check label={<>J’accepte le traitement de mes données personnelles <strong>*</strong></>} checked={data} onChange={()=>setData(!data)}/><Check label={<>Je m’engage à réaliser le test seul(e), sans aide <strong>*</strong></>} checked={alone} onChange={()=>setAlone(!alone)}/><button className="accommodation" onClick={()=>setAccommodation(!accommodation)}><span>J’ai besoin d’un aménagement</span><Icon name="chevron" size={13}/></button>{accommodation&&<div className="textarea"><textarea placeholder="Décrivez l’aménagement dont vous avez besoin…" /></div>}</div></section>
      <div className="instruction-actions"><Button variant="ghost" onClick={()=>navigate("C1")}>Retour</Button><Button disabled={!data||!alone} onClick={()=>navigate("C3")}>Lancer l’entraînement <Icon name="arrow" size={14}/></Button></div>
    </div><footer className="candidate-footer">Évaluation sécurisée par <strong>TestPro</strong></footer>
  </div>;
}

function TestPage() {
  const { navigate } = useDemo();
  const [answer,setAnswer]=useState("C"), [warning,setWarning]=useState(false),[question,setQuestion]=useState(7),[seconds,setSeconds]=useState(522);
  useEffect(()=>{const timer=window.setInterval(()=>setSeconds(s=>Math.max(0,s-1)),1000);return()=>window.clearInterval(timer)},[]);
  useEffect(()=>{const onVisibility=()=>{if(document.hidden)setWarning(true)};document.addEventListener("visibilitychange",onVisibility);return()=>document.removeEventListener("visibilitychange",onVisibility)},[]);
  const time=`${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`;
  const next=()=>{if(question===20)navigate("C4");else{setQuestion(q=>q+1);setAnswer("")}};
  return <div className="test-shell"><header className="test-header"><div className="candidate-brand"><div>S</div><strong>Sotetel</strong><button className="simulate-tab" onClick={()=>setWarning(true)}>Simuler un changement d’onglet</button></div><div className="test-progress-head"><div><strong>Raisonnement logique</strong><span>Question {question}/20</span></div><div className="test-progress"><i style={{width:`${question/20*100}%`}}/></div></div><div className={`timer ${seconds<120?"danger-timer":seconds<300?"amber-timer":""}`}><Icon name="clock" size={18}/><div><span>Temps restant</span><strong>{time}</strong></div></div></header>
    <main className="test-main"><section className="question-card card"><div className="question-meta"><span>Question {question}</span><Badge tone="gray">Choix unique</Badge></div><div className="question-title">Quel nombre complète logiquement la suite suivante ?</div><div className="sequence-large"><span>3</span><i/><span>6</span><i/><span>12</span><i/><span>24</span><i/><span>?</span></div><div className="test-options">{[["A","36"],["B","42"],["C","48"],["D","52"]].map(o=><button key={o[0]} className={answer===o[0]?"selected":""} onClick={()=>setAnswer(o[0])}><span>{o[0]}</span><strong>{o[1]}</strong>{answer===o[0]&&<div><Icon name="check" size={15}/></div>}</button>)}</div></section></main>
    <footer className="test-footer"><Button variant="secondary" disabled={question===7} onClick={()=>{setQuestion(q=>Math.max(7,q-1));setAnswer("")}}><Icon name="chevron" size={14}/>Précédent</Button><div><span><Icon name="check" size={14}/>Réponse enregistrée automatiquement</span><small><Icon name="info" size={12}/>Le chronomètre est géré par le serveur</small></div><Button onClick={next}>{question===20?"Terminer":"Suivant"} <Icon name="arrow" size={14}/></Button></footer>
    {warning&&<div className="modal-backdrop"><div className="warning-modal card"><div className="modal-warning-icon"><Icon name="warning" size={23}/></div><div className="modal-title">Changement d’onglet détecté</div><p>Pour garantir l’intégrité de votre évaluation, restez sur cette page. Cet événement a été enregistré.</p><div className="modal-note"><Icon name="info" size={14}/>Un nouveau changement pourra déclencher une alerte au recruteur.</div><Button onClick={()=>setWarning(false)}>Reprendre l’épreuve</Button></div></div>}
  </div>;
}

function SuperAdmin() {
  const { toast }=useDemo();
  const [modal,setModal]=useState<"form"|"key"|null>(null),[custom,setCustom]=useState(true),[copied,setCopied]=useState(false),[menu,setMenu]=useState<number|null>(null);
  const licenses=[["Sotetel","ENT-7K4M-••••","142/200","24 déc. 2025","Active"],["Banque Atlas","ENT-9P2R-••••","486/500","18 mars 2026","Active"],["Clinique El Amen","ENT-3H8N-••••","100/100","02 sept. 2025","Épuisée"],["Groupe Carthage","ENT-5W1J-••••","65/150","11 janv. 2026","Active"],["Novatek Industries","ENT-2Q6D-••••","78/250","30 nov. 2025","Suspendue"],["Horizon Conseil","ENT-8F3B-••••","23/80","15 févr. 2026","Active"]];
  return <div className="shell"><aside className="sidebar admin-sidebar"><div className="brand"><div className="brand-mark"><Icon name="check" size={17}/></div><span>TestPro</span><Badge tone="blue">Admin</Badge></div><nav><div className="nav-label">SUPER-ADMINISTRATION</div>{[["Entreprises","users"],["Licences","file"],["Catalogue tests","tests"],["Tarifs","chart"],["Statistiques","results"],["Audit","note"]].map(([n,i])=><button key={n} className={n==="Licences"?"active":""} onClick={()=>toast(n==="Licences"?"Vous êtes déjà sur cette page":`${n} : vue de démonstration`)}><Icon name={i as IconName}/>{n}</button>)}</nav><div className="side-profile"><div className="avatar">NB</div><div><strong>Nadia Ben Salem</strong><span>Super-administratrice</span></div></div></aside><main className="main"><header className="topbar"><strong>Console d’administration</strong><div className="top-actions"><button onClick={()=>toast("Aucune nouvelle notification")}><Icon name="bell"/></button><div className="avatar">NB</div></div></header><div className="content admin-page"><PageHeader title="Licences" subtitle="Gérez les accès, crédits et modules attribués aux entreprises."><Button icon="plus" onClick={()=>setModal("form")}>Générer une clé entreprise</Button></PageHeader><div className="admin-tools card"><div className="search-input"><Icon name="search" size={15}/><input placeholder="Rechercher une entreprise…"/></div><SelectInput><option>Tous les statuts</option><option>Active</option><option>Épuisée</option><option>Suspendue</option></SelectInput></div><section className="card admin-table"><table className="simple-table"><thead><tr><th>Entreprise</th><th>Clé</th><th>Crédits</th><th>Date d’expiration</th><th>Modules</th><th>Statut</th><th/></tr></thead><tbody>{licenses.map((r,i)=>{const [used,total]=r[2].split("/").map(Number);return <tr key={r[0]}><td><strong>{r[0]}</strong></td><td><code>{r[1]}</code></td><td><div className="admin-credit"><span>{r[2]}</span><div><i style={{width:`${used/total*100}%`}}/></div></div></td><td>{r[3]}</td><td><span className="private-tag">Aptitudes</span> <span className="private-tag">Personnalité</span></td><td><Badge tone={r[4]==="Active"?"green":r[4]==="Suspendue"?"red":"gray"}>{r[4]}</Badge></td><td><div className="row-menu"><button onClick={()=>setMenu(menu===i?null:i)}><Icon name="more" size={16}/></button>{menu===i&&<div className="menu-popover">{["Recharger","Prolonger","Suspendre","Historique"].map(action=><button key={action} onClick={()=>{toast(`${action} : ${r[0]}`);setMenu(null)}}>{action}</button>)}</div>}</div></td></tr>})}</tbody></table></section></div></main>
    {modal&&<div className="modal-backdrop">{modal==="form"?<div className="license-create card"><div className="drawer-head"><div><strong>Nouvelle licence</strong><span>Générez une clé d’accès entreprise.</span></div><button onClick={()=>setModal(null)}><Icon name="close"/></button></div><div className="license-form"><Field label="Entreprise"><SelectInput><option>Sotetel</option><option>Banque Atlas</option></SelectInput></Field><Field label="Nombre de crédits"><TextInput value="200"/></Field><Field label="Date d’expiration"><TextInput value="24/12/2025"/></Field><div className="module-checks"><Check label="Aptitudes" checked onChange={()=>toast("Module Aptitudes requis")}/><Check label="Personnalité" checked onChange={()=>toast("Module Personnalité requis")}/><Check label="Tests personnalisés" checked={custom} onChange={()=>setCustom(!custom)}/></div>{custom&&<div className="quota-fields"><Field label="Nombre d’épreuves"><TextInput value="10"/></Field><Field label="Nombre de questions"><TextInput value="250"/></Field><Field label="Médias en Mo"><TextInput value="500"/></Field></div>}<div className="toggle-line"><span>Validation obligatoire avant publication</span><Toggle checked={true} onChange={()=>toast("Validation obligatoire activée")}/></div></div><div className="license-actions"><Button variant="secondary" onClick={()=>setModal(null)}>Annuler</Button><Button onClick={()=>setModal("key")}>Générer</Button></div></div>:<div className="key-result card"><div className="modal-warning-icon success"><Icon name="check"/></div><div className="modal-title">Licence générée</div><p>Conservez cette clé en lieu sûr.</p><div className="warning-strip"><Icon name="warning"/>Cette clé ne sera affichée qu’une seule fois</div><div className="generated-key"><code>ENT-4X9K-7M2P-Q8LN</code><Button variant="secondary" icon={copied?"check":"copy"} onClick={()=>{navigator.clipboard?.writeText("ENT-4X9K-7M2P-Q8LN");setCopied(true);toast("Copié")}}>{copied?"Copiée":"Copier"}</Button></div><Button onClick={()=>setModal(null)}>Terminer</Button></div>}</div>}
  </div>;
}

function CompletionPage(){
  const { toast,navigate }=useDemo();
  return <div className="candidate-shell"><header className="candidate-header"><div className="candidate-brand"><div>S</div><strong>Sotetel</strong></div></header><div className="candidate-center"><div className="entry-card completion-card card"><div className="completion-icon"><Icon name="check" size={25}/></div><div className="entry-title">Évaluation terminée</div><p>Merci Amine. Vos réponses ont bien été enregistrées et transmises au recruteur.</p><div className="reference-box"><span>Référence de passation</span><div><code>TPS-4812-AMN</code><button onClick={()=>{navigator.clipboard?.writeText("TPS-4812-AMN");toast("Copié")}}><Icon name="copy" size={15}/>Copier</button></div></div><div className="info-note"><Icon name="info"/><p>Le recruteur reviendra vers vous directement concernant la suite du processus.</p></div><Button variant="secondary" onClick={()=>navigate("C1")}>Retour à l’accueil</Button></div></div><footer className="candidate-footer">Évaluation sécurisée par <strong>TestPro</strong></footer></div>
}

function DemoNav({ navigate }: { navigate: (s: Screen) => void }) {
  const [open,setOpen]=useState(false);
  return <div className={`demo-nav ${open?"open":""}`}><button className="demo-trigger" onClick={()=>setOpen(!open)}><span>Démo</span><Icon name="chevron" size={13}/></button>{open&&<div className="demo-menu"><strong>Choisir un parcours</strong><button onClick={()=>{navigate("A1");setOpen(false)}}><span>A1</span><div>Super-admin<small>Licences entreprise</small></div></button><button onClick={()=>{navigate("R1");setOpen(false)}}><span>R1</span><div>Recruteur<small>Tableau de bord</small></div></button><button onClick={()=>{navigate("C1");setOpen(false)}}><span>C1</span><div>Candidat<small>Saisie de la clé</small></div></button></div>}</div>;
}

function App() {
  const routes: Record<Screen, string> = {
    A1:"/licences",
    R1:"/tableau-de-bord",
    R2: "/campagnes/nouvelle",
    R3: "/campagnes/128/resultats",
    R4: "/candidats/4812/rapport",
    R5: "/epreuves",
    R6: "/epreuves/57/questions/12",
    C1: "/sotetel",
    C2: "/sotetel/instructions",
    C3: "/sotetel/epreuve/1",
    C4: "/sotetel/termine",
  };
  const getScreen = (): Screen => (Object.entries(routes).find(([, path]) => path === window.location.pathname)?.[0] as Screen) || "R2";
  const [screen,setScreen]=useState<Screen>(getScreen);
  const [toastMessage,setToastMessage]=useState("");
  useEffect(() => {
    const onBack = () => setScreen(getScreen());
    window.addEventListener("popstate", onBack);
    return () => window.removeEventListener("popstate", onBack);
  }, []);
  const navigate = (next: Screen) => {
    window.history.pushState({}, "", routes[next]);
    setScreen(next);
  };
  const showToast=(message:string)=>{setToastMessage(message);window.setTimeout(()=>setToastMessage(""),2400)};
  const pages: Record<Screen,ReactNode>={A1:<SuperAdmin/>,R1:<RecruiterDashboard/>,R2:<NewCampaign/>,R3:<CampaignResults/>,R4:<CandidateReport/>,R5:<TestLibrary/>,R6:<QuestionEditor/>,C1:<EntryPage/>,C2:<InstructionsPage/>,C3:<TestPage/>,C4:<CompletionPage/>};
  return <DemoContext.Provider value={{navigate,toast:showToast}}>{pages[screen]}<DemoNav navigate={navigate}/>{toastMessage&&<div className="global-toast"><div><Icon name="check" size={15}/></div><span>{toastMessage}</span></div>}</DemoContext.Provider>;
}

export default App;

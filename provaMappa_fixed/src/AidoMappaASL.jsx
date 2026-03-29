import { useState, useEffect, useRef } from "react";

const ASL_DATA = [
  // LOMBARDIA - ATS
  { id: 1, nome: "ATS della Città Metropolitana di Milano", tipo: "ATS", regione: "Lombardia", lat: 45.4654, lng: 9.1859 },
  { id: 2, nome: "ATS della Brianza", tipo: "ATS", regione: "Lombardia", lat: 45.6496, lng: 9.2842 },
  { id: 3, nome: "ATS di Bergamo", tipo: "ATS", regione: "Lombardia", lat: 45.6983, lng: 9.6773 },
  { id: 4, nome: "ATS di Brescia", tipo: "ATS", regione: "Lombardia", lat: 45.5416, lng: 10.2118 },
  { id: 5, nome: "ATS della Montagna", tipo: "ATS", regione: "Lombardia", lat: 46.1301, lng: 9.8721 },
  { id: 6, nome: "ATS dell'Insubria", tipo: "ATS", regione: "Lombardia", lat: 45.8206, lng: 8.8257 },
  { id: 7, nome: "ATS della Val Padana", tipo: "ATS", regione: "Lombardia", lat: 45.1564, lng: 10.7915 },
  { id: 8, nome: "ATS di Pavia", tipo: "ATS", regione: "Lombardia", lat: 45.1847, lng: 9.1582 },
  // PIEMONTE
  { id: 9, nome: "ASL TO1 – Torino", tipo: "ASL", regione: "Piemonte", lat: 45.0703, lng: 7.6869 },
  { id: 10, nome: "ASL TO2 – Torino Nord", tipo: "ASL", regione: "Piemonte", lat: 45.1000, lng: 7.7200 },
  { id: 11, nome: "ASL TO3 – Pinerolo", tipo: "ASL", regione: "Piemonte", lat: 44.8833, lng: 7.3333 },
  { id: 12, nome: "ASL TO4 – Ivrea", tipo: "ASL", regione: "Piemonte", lat: 45.4654, lng: 7.8736 },
  { id: 13, nome: "ASL TO5 – Chieri", tipo: "ASL", regione: "Piemonte", lat: 44.9963, lng: 7.9847 },
  { id: 14, nome: "ASL VC – Vercelli", tipo: "ASL", regione: "Piemonte", lat: 45.3206, lng: 8.4239 },
  { id: 15, nome: "ASL BI – Biella", tipo: "ASL", regione: "Piemonte", lat: 45.5628, lng: 8.0559 },
  { id: 16, nome: "ASL NO – Novara", tipo: "ASL", regione: "Piemonte", lat: 45.4469, lng: 8.6242 },
  { id: 17, nome: "ASL VCO – Verbano Cusio Ossola", tipo: "ASL", regione: "Piemonte", lat: 45.9231, lng: 8.5472 },
  { id: 18, nome: "ASL CN1 – Cuneo", tipo: "ASL", regione: "Piemonte", lat: 44.3897, lng: 7.5428 },
  { id: 19, nome: "ASL CN2 – Alba Bra", tipo: "ASL", regione: "Piemonte", lat: 44.6997, lng: 8.0354 },
  { id: 20, nome: "ASL AT – Asti", tipo: "ASL", regione: "Piemonte", lat: 44.9004, lng: 8.2065 },
  { id: 21, nome: "ASL AL – Alessandria", tipo: "ASL", regione: "Piemonte", lat: 44.9125, lng: 8.6153 },
  // VENETO
  { id: 22, nome: "ULSS 1 Dolomiti", tipo: "ULSS", regione: "Veneto", lat: 46.1347, lng: 12.2362 },
  { id: 23, nome: "ULSS 2 Marca Trevigiana", tipo: "ULSS", regione: "Veneto", lat: 45.6669, lng: 12.2422 },
  { id: 24, nome: "ULSS 3 Serenissima – Venezia", tipo: "ULSS", regione: "Veneto", lat: 45.4408, lng: 12.3155 },
  { id: 25, nome: "ULSS 4 Veneto Orientale", tipo: "ULSS", regione: "Veneto", lat: 45.7734, lng: 12.7524 },
  { id: 26, nome: "ULSS 5 Polesana", tipo: "ULSS", regione: "Veneto", lat: 45.0712, lng: 11.7903 },
  { id: 27, nome: "ULSS 6 Euganea – Padova", tipo: "ULSS", regione: "Veneto", lat: 45.4064, lng: 11.8768 },
  { id: 28, nome: "ULSS 7 Pedemontana", tipo: "ULSS", regione: "Veneto", lat: 45.7476, lng: 11.6595 },
  { id: 29, nome: "ULSS 8 Berica – Vicenza", tipo: "ULSS", regione: "Veneto", lat: 45.5455, lng: 11.5354 },
  { id: 30, nome: "ULSS 9 Scaligera – Verona", tipo: "ULSS", regione: "Veneto", lat: 45.4384, lng: 10.9916 },
  // LAZIO
  { id: 31, nome: "ASL Roma 1", tipo: "ASL", regione: "Lazio", lat: 41.9028, lng: 12.4964 },
  { id: 32, nome: "ASL Roma 2", tipo: "ASL", regione: "Lazio", lat: 41.8719, lng: 12.5748 },
  { id: 33, nome: "ASL Roma 3", tipo: "ASL", regione: "Lazio", lat: 41.8370, lng: 12.4690 },
  { id: 34, nome: "ASL Roma 4", tipo: "ASL", regione: "Lazio", lat: 42.1000, lng: 12.2000 },
  { id: 35, nome: "ASL Roma 5", tipo: "ASL", regione: "Lazio", lat: 41.9478, lng: 12.8881 },
  { id: 36, nome: "ASL Roma 6", tipo: "ASL", regione: "Lazio", lat: 41.6693, lng: 12.6978 },
  { id: 37, nome: "ASL di Viterbo", tipo: "ASL", regione: "Lazio", lat: 42.4166, lng: 12.1069 },
  { id: 38, nome: "ASL di Rieti", tipo: "ASL", regione: "Lazio", lat: 42.4042, lng: 12.8662 },
  { id: 39, nome: "ASL di Latina", tipo: "ASL", regione: "Lazio", lat: 41.4673, lng: 12.9038 },
  { id: 40, nome: "ASL di Frosinone", tipo: "ASL", regione: "Lazio", lat: 41.6398, lng: 13.3437 },
  // CAMPANIA
  { id: 41, nome: "ASL Napoli 1 Centro", tipo: "ASL", regione: "Campania", lat: 40.8518, lng: 14.2681 },
  { id: 42, nome: "ASL Napoli 2 Nord", tipo: "ASL", regione: "Campania", lat: 40.9249, lng: 14.1555 },
  { id: 43, nome: "ASL Napoli 3 Sud", tipo: "ASL", regione: "Campania", lat: 40.7536, lng: 14.4327 },
  { id: 44, nome: "ASL Avellino", tipo: "ASL", regione: "Campania", lat: 40.9143, lng: 14.7906 },
  { id: 45, nome: "ASL Benevento", tipo: "ASL", regione: "Campania", lat: 41.1297, lng: 14.7807 },
  { id: 46, nome: "ASL Caserta", tipo: "ASL", regione: "Campania", lat: 41.0731, lng: 14.3329 },
  { id: 47, nome: "ASL Salerno", tipo: "ASL", regione: "Campania", lat: 40.6824, lng: 14.7681 },
  // SICILIA
  { id: 48, nome: "ASP di Agrigento", tipo: "ASP", regione: "Sicilia", lat: 37.3111, lng: 13.5765 },
  { id: 49, nome: "ASP di Caltanissetta", tipo: "ASP", regione: "Sicilia", lat: 37.4904, lng: 14.0625 },
  { id: 50, nome: "ASP di Catania", tipo: "ASP", regione: "Sicilia", lat: 37.5079, lng: 15.0830 },
  { id: 51, nome: "ASP di Enna", tipo: "ASP", regione: "Sicilia", lat: 37.5661, lng: 14.2760 },
  { id: 52, nome: "ASP di Messina", tipo: "ASP", regione: "Sicilia", lat: 38.1938, lng: 15.5540 },
  { id: 53, nome: "ASP di Palermo", tipo: "ASP", regione: "Sicilia", lat: 38.1157, lng: 13.3615 },
  { id: 54, nome: "ASP di Ragusa", tipo: "ASP", regione: "Sicilia", lat: 36.9255, lng: 14.7258 },
  { id: 55, nome: "ASP di Siracusa", tipo: "ASP", regione: "Sicilia", lat: 37.0755, lng: 15.2866 },
  { id: 56, nome: "ASP di Trapani", tipo: "ASP", regione: "Sicilia", lat: 37.9959, lng: 12.5113 },
  // TOSCANA
  { id: 57, nome: "ASL Toscana Nord Ovest", tipo: "ASL", regione: "Toscana", lat: 43.7228, lng: 10.4017 },
  { id: 58, nome: "ASL Toscana Centro", tipo: "ASL", regione: "Toscana", lat: 43.7696, lng: 11.2558 },
  { id: 59, nome: "ASL Toscana Sud Est", tipo: "ASL", regione: "Toscana", lat: 42.7487, lng: 11.5893 },
  // EMILIA-ROMAGNA
  { id: 60, nome: "AUSL di Piacenza", tipo: "AUSL", regione: "Emilia-Romagna", lat: 45.0526, lng: 9.6929 },
  { id: 61, nome: "AUSL di Parma", tipo: "AUSL", regione: "Emilia-Romagna", lat: 44.8015, lng: 10.3279 },
  { id: 62, nome: "AUSL di Reggio Emilia", tipo: "AUSL", regione: "Emilia-Romagna", lat: 44.6989, lng: 10.6297 },
  { id: 63, nome: "AUSL di Modena", tipo: "AUSL", regione: "Emilia-Romagna", lat: 44.6471, lng: 10.9252 },
  { id: 64, nome: "AUSL di Bologna", tipo: "AUSL", regione: "Emilia-Romagna", lat: 44.4949, lng: 11.3426 },
  { id: 65, nome: "AUSL di Imola", tipo: "AUSL", regione: "Emilia-Romagna", lat: 44.3537, lng: 11.7144 },
  { id: 66, nome: "AUSL di Ferrara", tipo: "AUSL", regione: "Emilia-Romagna", lat: 44.8381, lng: 11.6196 },
  { id: 67, nome: "AUSL della Romagna", tipo: "AUSL", regione: "Emilia-Romagna", lat: 44.2123, lng: 12.0407 },
  // PUGLIA
  { id: 68, nome: "ASL Bari", tipo: "ASL", regione: "Puglia", lat: 41.1171, lng: 16.8719 },
  { id: 69, nome: "ASL BAT – Barletta-Andria-Trani", tipo: "ASL", regione: "Puglia", lat: 41.2082, lng: 16.2961 },
  { id: 70, nome: "ASL Brindisi", tipo: "ASL", regione: "Puglia", lat: 40.6328, lng: 17.9404 },
  { id: 71, nome: "ASL Foggia", tipo: "ASL", regione: "Puglia", lat: 41.4623, lng: 15.5446 },
  { id: 72, nome: "ASL Lecce", tipo: "ASL", regione: "Puglia", lat: 40.3516, lng: 18.1750 },
  { id: 73, nome: "ASL Taranto", tipo: "ASL", regione: "Puglia", lat: 40.4645, lng: 17.2470 },
  // SARDEGNA
  { id: 74, nome: "ATS Sardegna – Sassari", tipo: "ATS", regione: "Sardegna", lat: 40.7259, lng: 8.5555 },
  { id: 75, nome: "ATS Sardegna – Nuoro", tipo: "ATS", regione: "Sardegna", lat: 40.3214, lng: 9.3285 },
  { id: 76, nome: "ATS Sardegna – Cagliari", tipo: "ATS", regione: "Sardegna", lat: 39.2238, lng: 9.1217 },
  { id: 77, nome: "ATS Sardegna – Oristano", tipo: "ATS", regione: "Sardegna", lat: 39.9066, lng: 8.5907 },
  // CALABRIA
  { id: 78, nome: "ASP di Catanzaro", tipo: "ASP", regione: "Calabria", lat: 38.9098, lng: 16.5875 },
  { id: 79, nome: "ASP di Cosenza", tipo: "ASP", regione: "Calabria", lat: 39.3082, lng: 16.2530 },
  { id: 80, nome: "ASP di Crotone", tipo: "ASP", regione: "Calabria", lat: 39.0808, lng: 17.1244 },
  { id: 81, nome: "ASP di Reggio Calabria", tipo: "ASP", regione: "Calabria", lat: 38.1114, lng: 15.6473 },
  { id: 82, nome: "ASP di Vibo Valentia", tipo: "ASP", regione: "Calabria", lat: 38.6751, lng: 16.0999 },
  // MARCHE
  { id: 83, nome: "ASUR Marche – AV1 Pesaro Urbino", tipo: "ASUR", regione: "Marche", lat: 43.9103, lng: 12.9131 },
  { id: 84, nome: "ASUR Marche – AV2 Ancona", tipo: "ASUR", regione: "Marche", lat: 43.6158, lng: 13.5189 },
  { id: 85, nome: "ASUR Marche – AV3 Macerata", tipo: "ASUR", regione: "Marche", lat: 43.2998, lng: 13.4531 },
  { id: 86, nome: "ASUR Marche – AV4 Fermo", tipo: "ASUR", regione: "Marche", lat: 43.1596, lng: 13.7180 },
  { id: 87, nome: "ASUR Marche – AV5 Ascoli Piceno", tipo: "ASUR", regione: "Marche", lat: 42.8534, lng: 13.5752 },
  // LIGURIA
  { id: 88, nome: "ASL 1 Imperiese", tipo: "ASL", regione: "Liguria", lat: 43.8864, lng: 8.0298 },
  { id: 89, nome: "ASL 2 Savonese", tipo: "ASL", regione: "Liguria", lat: 44.3074, lng: 8.4771 },
  { id: 90, nome: "ASL 3 Genovese", tipo: "ASL", regione: "Liguria", lat: 44.4056, lng: 8.9463 },
  { id: 91, nome: "ASL 4 Chiavarese", tipo: "ASL", regione: "Liguria", lat: 44.3171, lng: 9.3228 },
  { id: 92, nome: "ASL 5 Spezzino", tipo: "ASL", regione: "Liguria", lat: 44.1024, lng: 9.8227 },
  // FRIULI-VENEZIA GIULIA
  { id: 93, nome: "ASFO – Friuli Occidentale", tipo: "AS", regione: "Friuli-Venezia Giulia", lat: 46.0693, lng: 12.6642 },
  { id: 94, nome: "ASUFC – Friuli Centrale", tipo: "AS", regione: "Friuli-Venezia Giulia", lat: 46.0748, lng: 13.2346 },
  { id: 95, nome: "ASUGI – Trieste e Isontina", tipo: "AS", regione: "Friuli-Venezia Giulia", lat: 45.6496, lng: 13.7694 },
  // TRENTINO-ALTO ADIGE
  { id: 96, nome: "APSS – Azienda Prov. Servizi Sanitari Trento", tipo: "APSS", regione: "Trentino-Alto Adige", lat: 46.0748, lng: 11.1217 },
  { id: 97, nome: "Comprensorio Sanitario di Bolzano", tipo: "AS", regione: "Trentino-Alto Adige", lat: 46.4983, lng: 11.3548 },
  { id: 98, nome: "Comprensorio Sanitario Merano", tipo: "AS", regione: "Trentino-Alto Adige", lat: 46.6717, lng: 11.1598 },
  { id: 99, nome: "Comprensorio Sanitario Bressanone", tipo: "AS", regione: "Trentino-Alto Adige", lat: 46.7168, lng: 11.6575 },
  { id: 100, nome: "Comprensorio Sanitario Brunico", tipo: "AS", regione: "Trentino-Alto Adige", lat: 46.7959, lng: 11.9341 },
  // UMBRIA
  { id: 101, nome: "USL Umbria 1", tipo: "USL", regione: "Umbria", lat: 43.1119, lng: 12.3880 },
  { id: 102, nome: "USL Umbria 2", tipo: "USL", regione: "Umbria", lat: 42.7327, lng: 12.6421 },
  // ABRUZZO
  { id: 103, nome: "ASL 1 Avezzano-Sulmona-L'Aquila", tipo: "ASL", regione: "Abruzzo", lat: 42.3498, lng: 13.3995 },
  { id: 104, nome: "ASL 2 Lanciano-Vasto-Chieti", tipo: "ASL", regione: "Abruzzo", lat: 42.3512, lng: 14.1682 },
  { id: 105, nome: "ASL 3 Pescara", tipo: "ASL", regione: "Abruzzo", lat: 42.4617, lng: 14.2158 },
  { id: 106, nome: "ASL 4 Teramo", tipo: "ASL", regione: "Abruzzo", lat: 42.6589, lng: 13.7040 },
  // BASILICATA
  { id: 107, nome: "ASP di Potenza", tipo: "ASP", regione: "Basilicata", lat: 40.6400, lng: 15.8050 },
  { id: 108, nome: "ASM di Matera", tipo: "ASM", regione: "Basilicata", lat: 40.6642, lng: 16.6044 },
  // MOLISE
  { id: 109, nome: "ASREM – Azienda Sanitaria Regionale del Molise", tipo: "ASREM", regione: "Molise", lat: 41.5616, lng: 14.6648 },
  // VALLE D'AOSTA
  { id: 110, nome: "USL della Valle d'Aosta", tipo: "USL", regione: "Valle d'Aosta", lat: 45.7372, lng: 7.3206 },
];

const TIPO_COLORS = {
  ASL:   { bg: "#E8F4FD", border: "#2980B9", dot: "#2980B9", text: "#1A5276" },
  ATS:   { bg: "#FEF9E7", border: "#F39C12", dot: "#F39C12", text: "#784212" },
  ULSS:  { bg: "#E9F7EF", border: "#27AE60", dot: "#27AE60", text: "#145A32" },
  AUSL:  { bg: "#F4ECF7", border: "#8E44AD", dot: "#8E44AD", text: "#512E5F" },
  ASP:   { bg: "#FDEBD0", border: "#E67E22", dot: "#E67E22", text: "#784212" },
  ASUR:  { bg: "#FDEDEC", border: "#E74C3C", dot: "#E74C3C", text: "#7B241C" },
  APSS:  { bg: "#EAF2FF", border: "#3498DB", dot: "#3498DB", text: "#1A5276" },
  AS:    { bg: "#E8F8F5", border: "#1ABC9C", dot: "#1ABC9C", text: "#0E6655" },
  USL:   { bg: "#F0F3FF", border: "#5D6D7E", dot: "#5D6D7E", text: "#2C3E50" },
  ASM:   { bg: "#FDF2F8", border: "#AF7AC5", dot: "#AF7AC5", text: "#6C3483" },
  ASREM: { bg: "#F9EBEA", border: "#C0392B", dot: "#C0392B", text: "#7B241C" },
};
const DEFAULT_COLOR = { bg: "#F2F3F4", border: "#7F8C8D", dot: "#7F8C8D", text: "#2C3E50" };

const REGIONI = ["Tutte le regioni", ...Array.from(new Set(ASL_DATA.map(a => a.regione))).sort()];
const TIPI = ["Tutti i tipi", ...Array.from(new Set(ASL_DATA.map(a => a.tipo))).sort()];

export default function AidoMappaASL() {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedRegione, setSelectedRegione] = useState("Tutte le regioni");
  const [selectedTipo, setSelectedTipo] = useState("Tutti i tipi");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  const filtered = ASL_DATA.filter(a => {
    const matchReg = selectedRegione === "Tutte le regioni" || a.regione === selectedRegione;
    const matchTipo = selectedTipo === "Tutti i tipi" || a.tipo === selectedTipo;
    const matchSearch = a.nome.toLowerCase().includes(search.toLowerCase()) || a.regione.toLowerCase().includes(search.toLowerCase());
    return matchReg && matchTipo && matchSearch;
  });

  useEffect(() => {
    if (mapReady || !mapRef.current) return;
    const L = window.L;
    if (!L) return;

    const map = L.map(mapRef.current, {
      center: [42.2, 12.5],
      zoom: 6,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    leafletMapRef.current = map;
    setMapReady(true);
  }, []);

  useEffect(() => {
    const L = window.L;
    if (!L || !leafletMapRef.current) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    filtered.forEach(asl => {
      const col = TIPO_COLORS[asl.tipo] || DEFAULT_COLOR;
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:14px;height:14px;border-radius:50%;background:${col.dot};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3);cursor:pointer;transition:transform 0.15s;"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const marker = L.marker([asl.lat, asl.lng], { icon })
        .addTo(leafletMapRef.current)
        .on("click", () => setSelected(asl));

      markersRef.current.push(marker);
    });
  }, [filtered, mapReady]);

  const getColor = tipo => TIPO_COLORS[tipo] || DEFAULT_COLOR;

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column", height: "100vh", background: "#F7F9FC" }}>
      {/* HEADER */}
      <div style={{ background: "#1A1F36", padding: "14px 20px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "#E74C3C", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: 13 }}>AIDO</span>
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 600, fontSize: 15, lineHeight: 1.2 }}>Mappa ASL / ATS Italia</div>
            <div style={{ color: "#8892B0", fontSize: 12 }}>{filtered.length} strutture visualizzate</div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <input
            type="text"
            placeholder="Cerca struttura o regione..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", padding: "7px 12px", borderRadius: 6, border: "1px solid #2D3561", background: "#252B48", color: "white", fontSize: 13, outline: "none", boxSizing: "border-box" }}
          />
        </div>
        <select
          value={selectedRegione}
          onChange={e => setSelectedRegione(e.target.value)}
          style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid #2D3561", background: "#252B48", color: "white", fontSize: 13, outline: "none" }}
        >
          {REGIONI.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select
          value={selectedTipo}
          onChange={e => setSelectedTipo(e.target.value)}
          style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid #2D3561", background: "#252B48", color: "white", fontSize: 13, outline: "none" }}
        >
          {TIPI.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* BODY */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* SIDEBAR */}
        <div style={{ width: 300, background: "white", borderRight: "1px solid #E8ECF0", overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 24, color: "#8892B0", fontSize: 13, textAlign: "center" }}>Nessuna struttura trovata</div>
          ) : (
            filtered.map(asl => {
              const col = getColor(asl.tipo);
              const isActive = selected?.id === asl.id;
              return (
                <div
                  key={asl.id}
                  onClick={() => {
                    setSelected(asl);
                    leafletMapRef.current?.flyTo([asl.lat, asl.lng], 12, { duration: 0.8 });
                  }}
                  style={{
                    padding: "10px 14px",
                    borderBottom: "1px solid #F0F2F5",
                    cursor: "pointer",
                    background: isActive ? "#F0F7FF" : "white",
                    borderLeft: isActive ? `3px solid ${col.dot}` : "3px solid transparent",
                    transition: "background 0.15s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 4, background: col.bg, color: col.text, border: `1px solid ${col.border}`, whiteSpace: "nowrap" }}>
                      {asl.tipo}
                    </span>
                    <span style={{ fontSize: 12, color: "#5A6474", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{asl.regione}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#1A1F36", marginTop: 4, lineHeight: 1.3 }}>{asl.nome}</div>
                </div>
              );
            })
          )}
        </div>

        {/* MAPPA */}
        <div style={{ flex: 1, position: "relative" }}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

          {/* POPUP INFO */}
          {selected && (
            <div style={{
              position: "absolute", bottom: 20, right: 20, zIndex: 1000,
              background: "white", borderRadius: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              padding: 16, maxWidth: 280, border: `2px solid ${getColor(selected.tipo).border}`
            }}>
              <button
                onClick={() => setSelected(null)}
                style={{ position: "absolute", top: 8, right: 10, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#8892B0", lineHeight: 1 }}
              >×</button>
              <span style={{
                display: "inline-block", fontSize: 11, fontWeight: 700, padding: "3px 9px",
                borderRadius: 4, background: getColor(selected.tipo).bg,
                color: getColor(selected.tipo).text, border: `1px solid ${getColor(selected.tipo).border}`, marginBottom: 8
              }}>{selected.tipo}</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1F36", lineHeight: 1.4, marginBottom: 6 }}>{selected.nome}</div>
              <div style={{ fontSize: 12, color: "#5A6474" }}>📍 {selected.regione}</div>
            </div>
          )}

          {/* LEGENDA */}
          <div style={{
            position: "absolute", bottom: 20, left: 20, zIndex: 1000,
            background: "white", borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            padding: "10px 14px", fontSize: 11
          }}>
            <div style={{ fontWeight: 600, color: "#1A1F36", marginBottom: 6 }}>Tipologia</div>
            {Object.entries(TIPO_COLORS).map(([tipo, col]) => (
              <div key={tipo} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: col.dot, flexShrink: 0 }} />
                <span style={{ color: "#5A6474" }}>{tipo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );  
}
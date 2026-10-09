import jsPDF from "jspdf";

export interface ClaimChecklistData {
  incidentType: "auto" | "water" | "theft";
  lang: "ro" | "en";
  circumstances: {
    hasInjuries?: boolean;
    amicablePossible?: boolean;
    policeInvolved?: boolean;
    waterSource?: "pipe" | "neighbor" | "natural";
    isTotalLoss?: boolean;
    forcedEntry?: boolean;
    hasInventory?: boolean;
  };
}

export function generateClaimFilePdf(data: ClaimChecklistData): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const isRo = data.lang === "ro";
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let y = 18;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("CRISTIAN VADUVA — ASIGURARI PREMIUM", margin, 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text("Platforma: Insurance.CristianVaduva.com | Consultanta Daune & Brokeraj", margin, 18);

  const dateStr = new Date().toLocaleDateString(isRo ? "ro-RO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`${isRo ? "Generat la" : "Generated on"}: ${dateStr}`, pageWidth - margin, 18, { align: "right" });

  y = 36;

  // Document Title
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);

  const incidentTitles: Record<string, { ro: string; en: string }> = {
    auto: { ro: "DOSAR DAUNA: ACCIDENT RUTIER / TAMPONARE", en: "CLAIM FILE: ROAD ACCIDENT / COLLISION" },
    water: { ro: "DOSAR DAUNA: INUNDATIE & AVARII INSTALATII", en: "CLAIM FILE: WATER DAMAGE & LEAKS" },
    theft: { ro: "DOSAR DAUNA: FURT & EFRACTIE", en: "CLAIM FILE: THEFT & BURGLARY" },
  };

  const currentTitle = incidentTitles[data.incidentType] || incidentTitles.auto;
  doc.text(isRo ? currentTitle.ro : currentTitle.en, margin, y);

  y += 7;

  // Top Safety Warning Box
  doc.setFillColor(254, 242, 242); // rose-50
  doc.setDrawColor(244, 63, 94); // rose-500
  doc.rect(margin, y, contentWidth, 16, "FD");

  doc.setTextColor(159, 18, 57); // rose-900
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(
    isRo
      ? "AVERTISMENT DE SIGURANTA (112 — NUMARUL NATIONAL DE URGENTA):"
      : "SAFETY WARNING (112 — NATIONAL EMERGENCY DISPATCH):",
    margin + 3,
    y + 5
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(
    isRo
      ? "Siguranta personala este prioritatea absoluta. Apelati 112 in caz de vatamari corporale, incendiu sau pericol iminent. Nu faceti fotografii si nu strangeti documente pe carosabil nesecurizat."
      : "Personal safety is the absolute priority. Call 112 for injuries, fire, or hazards. Do not document unsafe scenes.",
    margin + 3,
    y + 10,
    { maxWidth: contentWidth - 6 }
  );

  y += 22;

  // Section 1: Checklist of Actions & Documents
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(isRo ? "1. CHECKLIST ETAPE OBLIGATORII & DOCUMENTE" : "1. MANDATORY ACTION STEPS & CLAIM DOCUMENTS", margin, y);

  y += 6;

  // Build items based on incident
  interface ChecklistItem {
    title: string;
    desc: string;
  }

  let items: ChecklistItem[] = [];

  if (data.incidentType === "auto") {
    items = [
      {
        title: isRo ? "Punere in siguranta & Semnalizare" : "Scene Safety & Hazard Triangles",
        desc: isRo
          ? "Imbracati vesta reflectorizanta, opriti motorul, aprindeti avariile si amplasati triunghiurile (min 30m)."
          : "Wear high-visibility vest, turn off engine, hazard lights on, place warning triangles.",
      },
      {
        title: isRo ? "Stabilirea Procedurii (Amiabila vs. Politie)" : "Determine Reporting Route (Amicable vs Police)",
        desc: isRo
          ? "Daca sunt doar 2 masini fara victime -> Formular Constatare Amiabila (fizic sau aplicatia Amiabila). Daca exista victime sau 3+ vehicule -> apel 112 / Politia Rutiera in 24h."
          : "2 cars without injury -> Amicable Settlement form. If injuries, dispute or 3+ cars -> Police within 24h.",
      },
      {
        title: isRo ? "Documentare Foto Completa" : "Photographic Scene Documentation",
        desc: isRo
          ? "Fotografiati pozitia masinilor inainte de degajare, placutele de inmatriculare, semnele de circulatie si detaliile avariilor."
          : "Photograph vehicle positions before clearing the road, license plates, road signs, and exact damages.",
      },
      {
        title: isRo ? "Schimb Documente Conducatori Auto" : "Exchange Driver & Policy Documents",
        desc: isRo
          ? "Fotografiati: Polita RCA a ambilor soferi, Cartea de Identitate, Permisul de Conducere si Certificatul de Inmatriculare (Talon)."
          : "Collect: RCA insurance policy, ID card, Driver's license, and Vehicle registration document.",
      },
      {
        title: isRo ? "Asistenta Rutiera & Deschiderea Dosarului" : "Roadside Towing & Claim Notification",
        desc: isRo
          ? "Apelati numarul de asistenta rutiera de pe polita pentru tractare autorizata. Nu reparati vehiculul inainte de inspectia asiguratorului."
          : "Call policy roadside assistance. Do not start repairs before the official surveyor damage inspection.",
      },
    ];
  } else if (data.incidentType === "water") {
    items = [
      {
        title: isRo ? "Oprirea Alimentarii & Risc Electric" : "Shut Off Water & Electrical Hazard Check",
        desc: isRo
          ? "Inchideti robinetul general de apa. Daca apa a atins prizele, NU calcati in apa inainte de oprirea curentului."
          : "Close main water valve. If water reached electrical sockets, cut power safely before stepping into water.",
      },
      {
        title: isRo ? "Constatare Asociatia de Proprietari" : "Building Administration Incident Report",
        desc: isRo
          ? "Solicitati administratorului de bloc intocmirea unui Proces-Verbal de Constatare care sa consemneze sursa infiltratiei."
          : "Request the building manager to inspect and issue a formal written Incident Report (Proces-Verbal).",
      },
      {
        title: isRo ? "Documentare Foto & Video Inainte de Curatare" : "Photo & Video Evidence Before Cleanup",
        desc: isRo
          ? "Filmati si fotografiati tavanele, parchetul umflat, peretii si bunurile deteriorate inainte de extractia apei."
          : "Capture high-resolution video/photos of damaged ceilings, flooring, walls, and wet furniture.",
      },
      {
        title: isRo ? "Notificare Asigurator & Conservare Probe" : "Notify Insurer & Preserve Damaged Contents",
        desc: isRo
          ? "Notificati asiguratorul in termenul din polita (uzual 24-48h). Nu aruncati parchetul sau mobilierul inainte de constatare."
          : "Notify insurer within policy timeframe (usually 24-48h). Do not discard damaged contents before survey.",
      },
    ];
  } else {
    // Theft
    items = [
      {
        title: isRo ? "Securitate Personala & Apel 112" : "Personal Safety & Call 112",
        desc: isRo
          ? "Daca suspectati ca faptuitorul este inca in imobil, retrageti-va la distanta sigura si apelati imediat 112."
          : "If an intruder might still be on site, withdraw to a safe location and call 112 immediately.",
      },
      {
        title: isRo ? "Conservarea Locului Faptei" : "Preserve Crime Scene Integrity",
        desc: isRo
          ? "NU atingeti usile fortate, ferestrele sparte sau obiectele deranjate pana la sosirea echipei criminalistice a Politiei."
          : "DO NOT touch forced entry points, broken locks or moved items before Police forensics arrive.",
      },
      {
        title: isRo ? "Intocmire Inventar Bunuri Sustrase" : "Compile Detailed Missing Property Inventory",
        desc: isRo
          ? "Pregatiti lista bunurilor lipsa, serii de fabricatie (ceasuri, laptopuri), facturi de achizitie si fotografii anterioare."
          : "Prepare list of stolen items with serial numbers, purchase invoices, certificates, and previous photos.",
      },
      {
        title: isRo ? "Obtinerea Numarului de Dosar Penal" : "Obtain Official Police Crime Reference Number",
        desc: isRo
          ? "Solicitati numarul de inregistrare al plangerii penale de la Politie, necesar pentru dosarul de despagubire."
          : "Request the official Police Crime Case Number (Numar Dosar Penal) required for claim registration.",
      },
    ];
  }

  // Render checklist items with clean checkboxes
  doc.setFontSize(9);
  items.forEach((item) => {
    // Checkbox square
    doc.setDrawColor(100, 116, 139);
    doc.rect(margin, y, 4, 4);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(item.title, margin + 7, y + 3.2);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    const splitDesc = doc.splitTextToSize(item.desc, contentWidth - 7);
    doc.text(splitDesc, margin + 7, y + 7.5);

    y += 8 + splitDesc.length * 3.8;
  });

  y += 4;

  // Section 2: Personal Notes & Witness Log
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(isRo ? "2. JURNAL INCIDENT & DATE MARTORI" : "2. INCIDENT LOG & WITNESS DETAILS", margin, y);

  y += 5;

  // Notes Box with guide lines
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.rect(margin, y, contentWidth, 38);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    isRo
      ? "Spatiu rezervat pentru consemnarea orei exacte, conditiilor meteo, numelor martorilor si numerelor de telefon:"
      : "Space for exact time, weather, witness names, contact details, and police officer badge numbers:",
    margin + 3,
    y + 4
  );

  // Ruled lines inside notes box
  for (let lineY = y + 10; lineY <= y + 34; lineY += 6) {
    doc.line(margin + 3, lineY, margin + contentWidth - 3, lineY);
  }

  y += 44;

  // Section 3: Legal Disclaimers & Broker Contact Box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.rect(margin, y, contentWidth, 26, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text(
    isRo ? "CONSULTANTA DOSAR DAUNA (CRISTIAN VADUVA):" : "CLAIMS ADVISORY CONTACT (CRISTIAN VADUVA):",
    margin + 3,
    y + 5
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    isRo
      ? "Telefon Consultanta: 0767 110 439 (Strict contact de asistenta si intermediere asigurari, NU dispecerat 112)\nWebsite: https://insurance.cristianvaduva.com | Email: contact@cristianvaduva.com"
      : "Advisory Phone: 0767 110 439 (Strictly insurance advisory, NOT an emergency dispatch service)\nWebsite: https://insurance.cristianvaduva.com | Email: contact@cristianvaduva.com",
    margin + 3,
    y + 10
  );

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(
    isRo
      ? "DISCLAIMER LEGAL: Acest ghid are caracter educational. Termenele contractuale si documentele solicitate depind exclusiv de polita dumneavoastra."
      : "LEGAL DISCLAIMER: Educational checklist only. Specific deadlines and required files are determined strictly by your insurance contract.",
    margin + 3,
    y + 22
  );

  return doc;
}

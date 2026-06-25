/**
 * Porsche reference catalog — model lines and generations.
 *
 * Specs are recorded at the generation level (ranges span the trims within a
 * generation). Production years, engine layout, and power figures are factual
 * reference data compiled for this catalog. Treat power/spec ranges as
 * approximate generation-wide figures and refine individual entries as needed.
 */

export interface PorscheModel {
  id: string;
  line: string;
  name: string;
  generation: string;
  years: string;
  category:
    | 'Sports Car'
    | 'Grand Tourer'
    | 'Roadster'
    | 'Hypercar'
    | 'SUV'
    | 'Sedan';
  cooling: 'Air-cooled' | 'Water-cooled' | 'Hybrid' | 'Electric';
  layout: string;
  engine: string;
  power: string;
  bodyStyles: string;
  notable: string;
}

export const CATALOG: PorscheModel[] = [
  // ── 356 ──────────────────────────────────────────────
  {
    id: '356-prea',
    line: '356',
    name: '356 "Pre-A"',
    generation: 'Pre-A',
    years: '1948–1955',
    category: 'Sports Car',
    cooling: 'Air-cooled',
    layout: 'Rear-engine, RWD',
    engine: '1.1–1.5L flat-4',
    power: '40–70 hp',
    bodyStyles: 'Coupé, Cabriolet, Speedster',
    notable:
      'The first production Porsche. Lightweight, aerodynamic and built around a VW-derived flat-four, it established the rear-engine sports-car formula the marque still follows.',
  },
  {
    id: '356-a',
    line: '356',
    name: '356 A',
    generation: 'A',
    years: '1955–1959',
    category: 'Sports Car',
    cooling: 'Air-cooled',
    layout: 'Rear-engine, RWD',
    engine: '1.3–1.6L flat-4 (1.5L 4-cam Carrera)',
    power: '60–110 hp',
    bodyStyles: 'Coupé, Cabriolet, Speedster',
    notable:
      'Introduced the curved one-piece windshield and the exotic four-cam Carrera engine, sharpening the 356 into a genuine sporting machine.',
  },
  {
    id: '356-b',
    line: '356',
    name: '356 B',
    generation: 'B',
    years: '1959–1963',
    category: 'Sports Car',
    cooling: 'Air-cooled',
    layout: 'Rear-engine, RWD',
    engine: '1.6L flat-4 (2.0L 4-cam Carrera 2)',
    power: '60–130 hp',
    bodyStyles: 'Coupé, Cabriolet, Roadster',
    notable:
      'Raised bumpers and improved cooling modernised the 356, while the Carrera 2 brought disc brakes and a two-litre four-cam to the road.',
  },
  {
    id: '356-c',
    line: '356',
    name: '356 C',
    generation: 'C',
    years: '1963–1965',
    category: 'Sports Car',
    cooling: 'Air-cooled',
    layout: 'Rear-engine, RWD',
    engine: '1.6L flat-4',
    power: '75–95 hp',
    bodyStyles: 'Coupé, Cabriolet',
    notable:
      'The final and most refined 356, fitted with four-wheel disc brakes. It was sold alongside the new 911 before bowing out in 1965.',
  },
  {
    id: '550-spyder',
    line: '550',
    name: '550 Spyder',
    generation: '550',
    years: '1953–1956',
    category: 'Sports Car',
    cooling: 'Air-cooled',
    layout: 'Mid-engine, RWD',
    engine: '1.5L 4-cam flat-4',
    power: '~110 hp',
    bodyStyles: 'Roadster',
    notable:
      'Porsche’s first purpose-built racer and its first mid-engine car. Tiny, light and giant-killing, it laid the groundwork for decades of competition success.',
  },

  // ── 911 (by generation) ──────────────────────────────
  {
    id: '911-classic',
    line: '911',
    name: '911 (Original)',
    generation: '901 / O-Series',
    years: '1964–1973',
    category: 'Sports Car',
    cooling: 'Air-cooled',
    layout: 'Rear-engine, RWD',
    engine: '2.0–2.4L flat-6',
    power: '130–190 hp',
    bodyStyles: 'Coupé, Targa',
    notable:
      'The car that defined Porsche. The original flat-six 911 culminated in the 1973 Carrera RS 2.7, one of the most coveted air-cooled Porsches ever built.',
  },
  {
    id: '911-g',
    line: '911',
    name: '911 (G-Series)',
    generation: 'G-Series',
    years: '1973–1989',
    category: 'Sports Car',
    cooling: 'Air-cooled',
    layout: 'Rear-engine, RWD',
    engine: '2.7–3.2L flat-6',
    power: '150–231 hp',
    bodyStyles: 'Coupé, Targa, Cabriolet',
    notable:
      'The longest-running 911 body, identified by its impact bumpers. The Carrera 3.2 closed out the era as the definitive classic 911.',
  },
  {
    id: '930-turbo',
    line: '911',
    name: '911 Turbo (930)',
    generation: '930',
    years: '1975–1989',
    category: 'Sports Car',
    cooling: 'Air-cooled',
    layout: 'Rear-engine, RWD',
    engine: '3.0L → 3.3L turbocharged flat-6',
    power: '260–300 hp',
    bodyStyles: 'Coupé, Targa, Cabriolet',
    notable:
      'The original 911 Turbo — wide hips, a signature "whale tail" and ferocious turbo lag that earned it the nickname "the Widowmaker." An icon of the era.',
  },
  {
    id: '964',
    line: '911',
    name: '911 (964)',
    generation: '964',
    years: '1989–1994',
    category: 'Sports Car',
    cooling: 'Air-cooled',
    layout: 'Rear-engine, RWD / AWD',
    engine: '3.6L flat-6 (3.3/3.6L Turbo)',
    power: '250–360 hp',
    bodyStyles: 'Coupé, Targa, Cabriolet',
    notable:
      'A thorough modernisation — coil-spring suspension, power steering, ABS and the first all-wheel-drive Carrera 4 — while keeping the classic silhouette.',
  },
  {
    id: '993',
    line: '911',
    name: '911 (993)',
    generation: '993',
    years: '1994–1998',
    category: 'Sports Car',
    cooling: 'Air-cooled',
    layout: 'Rear-engine, RWD / AWD',
    engine: '3.6–3.8L flat-6 (twin-turbo)',
    power: '272–450 hp',
    bodyStyles: 'Coupé, Targa, Cabriolet',
    notable:
      'The last and most beloved air-cooled 911. Its multi-link rear suspension and twin-turbo flagship make it the connoisseur’s choice.',
  },
  {
    id: '996',
    line: '911',
    name: '911 (996)',
    generation: '996',
    years: '1998–2004',
    category: 'Sports Car',
    cooling: 'Water-cooled',
    layout: 'Rear-engine, RWD / AWD',
    engine: '3.4–3.6L flat-6',
    power: '300–450 hp',
    bodyStyles: 'Coupé, Targa, Cabriolet',
    notable:
      'The first water-cooled 911 — a controversial but pivotal car whose "fried-egg" headlights and shared Boxster front secured Porsche’s financial future.',
  },
  {
    id: '997',
    line: '911',
    name: '911 (997)',
    generation: '997',
    years: '2004–2012',
    category: 'Sports Car',
    cooling: 'Water-cooled',
    layout: 'Rear-engine, RWD / AWD',
    engine: '3.6–3.8L flat-6',
    power: '325–620 hp',
    bodyStyles: 'Coupé, Targa, Cabriolet',
    notable:
      'Widely regarded as a high point — round headlights returned, PDK and direct injection arrived, and the GT3/GT2 variants reached new heights.',
  },
  {
    id: '991',
    line: '911',
    name: '911 (991)',
    generation: '991',
    years: '2011–2019',
    category: 'Sports Car',
    cooling: 'Water-cooled',
    layout: 'Rear-engine, RWD / AWD',
    engine: '3.0L twin-turbo / 3.8–4.0L flat-6',
    power: '350–700 hp',
    bodyStyles: 'Coupé, Targa, Cabriolet',
    notable:
      'A longer, lighter chassis with electromechanical steering. The 991.2 turbocharged the entire Carrera range while the GT3 kept naturally aspirated flat-six glory.',
  },
  {
    id: '992',
    line: '911',
    name: '911 (992)',
    generation: '992',
    years: '2019–present',
    category: 'Sports Car',
    cooling: 'Water-cooled',
    layout: 'Rear-engine, RWD / AWD',
    engine: '3.0L twin-turbo / 4.0L flat-6 (T-Hybrid)',
    power: '379–701 hp',
    bodyStyles: 'Coupé, Targa, Cabriolet',
    notable:
      'The current 911. Wide bodywork across the range, a hybrid Carrera GTS and the track-focused GT3 keep the formula relentlessly modern.',
  },

  // ── Other classic lines ──────────────────────────────
  {
    id: '912',
    line: '912',
    name: '912',
    generation: '912',
    years: '1965–1969',
    category: 'Sports Car',
    cooling: 'Air-cooled',
    layout: 'Rear-engine, RWD',
    engine: '1.6L flat-4',
    power: '~90 hp',
    bodyStyles: 'Coupé, Targa',
    notable:
      'A four-cylinder 911 that bridged the gap from the 356, offering the new body at a more attainable price with famously balanced handling.',
  },
  {
    id: '914',
    line: '914',
    name: '914',
    generation: '914',
    years: '1969–1976',
    category: 'Sports Car',
    cooling: 'Air-cooled',
    layout: 'Mid-engine, RWD',
    engine: 'Flat-4 / flat-6 (914/6)',
    power: '80–110 hp',
    bodyStyles: 'Targa',
    notable:
      'A mid-engine Porsche-VW collaboration. Affordable and tossable, the rare flat-six 914/6 is now a sought-after analogue gem.',
  },
  {
    id: '924',
    line: '924',
    name: '924',
    generation: '924',
    years: '1976–1988',
    category: 'Sports Car',
    cooling: 'Water-cooled',
    layout: 'Front-engine, RWD (transaxle)',
    engine: '2.0L inline-4 (Turbo)',
    power: '95–170 hp',
    bodyStyles: 'Coupé',
    notable:
      'Porsche’s first front-engine, water-cooled production car. Its rear-mounted transaxle gave near-perfect balance and launched the transaxle family.',
  },
  {
    id: '928',
    line: '928',
    name: '928',
    generation: '928',
    years: '1978–1995',
    category: 'Grand Tourer',
    cooling: 'Water-cooled',
    layout: 'Front-engine, RWD (transaxle)',
    engine: '4.5–5.4L V8',
    power: '240–350 hp',
    bodyStyles: 'Coupé',
    notable:
      'A V8 grand tourer once intended to replace the 911. Named European Car of the Year in 1978 — the only sports car ever to win the title.',
  },
  {
    id: '944',
    line: '944',
    name: '944',
    generation: '944',
    years: '1982–1991',
    category: 'Sports Car',
    cooling: 'Water-cooled',
    layout: 'Front-engine, RWD (transaxle)',
    engine: '2.5–3.0L inline-4 (Turbo)',
    power: '150–250 hp',
    bodyStyles: 'Coupé, Cabriolet',
    notable:
      'The transaxle line’s best-seller. Its balanced chassis and muscular turbo variants made it one of the great-handling cars of the 1980s.',
  },
  {
    id: '968',
    line: '968',
    name: '968',
    generation: '968',
    years: '1992–1995',
    category: 'Sports Car',
    cooling: 'Water-cooled',
    layout: 'Front-engine, RWD (transaxle)',
    engine: '3.0L inline-4',
    power: '~240 hp',
    bodyStyles: 'Coupé, Cabriolet',
    notable:
      'The final evolution of the transaxle four-cylinder, with one of the largest four-cylinder engines of its day and the rare, focused Club Sport.',
  },
  {
    id: '959',
    line: '959',
    name: '959',
    generation: '959',
    years: '1986–1993',
    category: 'Hypercar',
    cooling: 'Air-cooled',
    layout: 'Rear-engine, AWD',
    engine: '2.85L twin-turbo flat-6',
    power: '~444 hp',
    bodyStyles: 'Coupé',
    notable:
      'A technological tour de force — sequential twin-turbos, adaptive all-wheel drive and ~197 mph. The fastest production car of its time and a Group B legend.',
  },

  // ── Boxster / Cayman / 718 ───────────────────────────
  {
    id: 'boxster-986',
    line: 'Boxster',
    name: 'Boxster (986)',
    generation: '986',
    years: '1996–2004',
    category: 'Roadster',
    cooling: 'Water-cooled',
    layout: 'Mid-engine, RWD',
    engine: '2.5–3.2L flat-6',
    power: '201–260 hp',
    bodyStyles: 'Roadster',
    notable:
      'The mid-engine roadster that rescued Porsche in the 1990s. Affordable, beautifully balanced and the foundation of the modern range.',
  },
  {
    id: 'boxster-987',
    line: 'Boxster',
    name: 'Boxster (987)',
    generation: '987',
    years: '2004–2012',
    category: 'Roadster',
    cooling: 'Water-cooled',
    layout: 'Mid-engine, RWD',
    engine: '2.7–3.4L flat-6',
    power: '240–320 hp',
    bodyStyles: 'Roadster',
    notable:
      'Sharper styling and more power matured the Boxster, with the Spyder variant stripping it back to a driver’s essentials.',
  },
  {
    id: 'boxster-981',
    line: 'Boxster',
    name: 'Boxster (981)',
    generation: '981',
    years: '2012–2016',
    category: 'Roadster',
    cooling: 'Water-cooled',
    layout: 'Mid-engine, RWD',
    engine: '2.7–3.8L flat-6',
    power: '265–375 hp',
    bodyStyles: 'Roadster',
    notable:
      'A lighter, stiffer chassis widely praised as one of the best-handling Porsches of its day — the flat-six Spyder being its purest form.',
  },
  {
    id: '718-boxster',
    line: '718',
    name: '718 Boxster (982)',
    generation: '982',
    years: '2016–present',
    category: 'Roadster',
    cooling: 'Water-cooled',
    layout: 'Mid-engine, RWD',
    engine: '2.0–2.5L turbo flat-4 / 4.0L flat-6',
    power: '300–414 hp',
    bodyStyles: 'Roadster',
    notable:
      'Turbo flat-fours brought torque and efficiency, while the naturally aspirated 4.0-litre flat-six GTS and Spyder answered the enthusiasts.',
  },
  {
    id: 'cayman-987',
    line: 'Cayman',
    name: 'Cayman (987)',
    generation: '987',
    years: '2005–2012',
    category: 'Sports Car',
    cooling: 'Water-cooled',
    layout: 'Mid-engine, RWD',
    engine: '2.7–3.4L flat-6',
    power: '245–330 hp',
    bodyStyles: 'Coupé',
    notable:
      'The fixed-roof Boxster — stiffer and arguably the better driver’s car. The Cayman R distilled it into a focused, lightweight special.',
  },
  {
    id: 'cayman-981',
    line: 'Cayman',
    name: 'Cayman (981)',
    generation: '981',
    years: '2013–2016',
    category: 'Sports Car',
    cooling: 'Water-cooled',
    layout: 'Mid-engine, RWD',
    engine: '2.7–3.8L flat-6',
    power: '275–385 hp',
    bodyStyles: 'Coupé',
    notable:
      'The car that gave us the original GT4 — a flat-six, manual, track-bred Cayman that finally let the model off its leash.',
  },
  {
    id: '718-cayman',
    line: '718',
    name: '718 Cayman (982)',
    generation: '982',
    years: '2016–present',
    category: 'Sports Car',
    cooling: 'Water-cooled',
    layout: 'Mid-engine, RWD',
    engine: '2.0–2.5L turbo flat-4 / 4.0L flat-6',
    power: '300–414 hp',
    bodyStyles: 'Coupé',
    notable:
      'The flat-four turbo range is crowned by the GT4 and GTS 4.0 — naturally aspirated flat-six coupés regarded among the finest mid-engine Porsches.',
  },

  // ── Halo cars ────────────────────────────────────────
  {
    id: 'carrera-gt',
    line: 'Carrera GT',
    name: 'Carrera GT',
    generation: '980',
    years: '2004–2007',
    category: 'Hypercar',
    cooling: 'Water-cooled',
    layout: 'Mid-engine, RWD',
    engine: '5.7L V10',
    power: '~603 hp',
    bodyStyles: 'Targa',
    notable:
      'A race-bred V10 hypercar with a carbon-fibre monocoque and a beechwood-topped manual gearshift. Raw, analogue and revered as one of the all-time greats.',
  },
  {
    id: '918-spyder',
    line: '918',
    name: '918 Spyder',
    generation: '918',
    years: '2013–2015',
    category: 'Hypercar',
    cooling: 'Hybrid',
    layout: 'Mid-engine, AWD',
    engine: '4.6L V8 + two electric motors',
    power: '~887 hp combined',
    bodyStyles: 'Targa',
    notable:
      'Porsche’s plug-in hybrid hypercar and a member of the "Holy Trinity." It rewrote the Nürburgring production-car record on debut.',
  },

  // ── SUVs & sedans ────────────────────────────────────
  {
    id: 'cayenne-955',
    line: 'Cayenne',
    name: 'Cayenne (955/957)',
    generation: '9PA',
    years: '2002–2010',
    category: 'SUV',
    cooling: 'Water-cooled',
    layout: 'Front-engine, AWD',
    engine: 'V6 / V8 (twin-turbo)',
    power: '250–550 hp',
    bodyStyles: 'SUV',
    notable:
      'Porsche’s first SUV and the commercial gamble that funded a generation of sports cars. The Turbo proved an SUV could genuinely perform.',
  },
  {
    id: 'cayenne-958',
    line: 'Cayenne',
    name: 'Cayenne (958)',
    generation: '92A',
    years: '2010–2017',
    category: 'SUV',
    cooling: 'Water-cooled',
    layout: 'Front-engine, AWD',
    engine: 'V6 / V8 / hybrid / diesel',
    power: '240–570 hp',
    bodyStyles: 'SUV',
    notable:
      'Lighter and far better resolved, the second Cayenne added hybrid and diesel options and cemented the model as Porsche’s volume backbone.',
  },
  {
    id: 'cayenne-9ya',
    line: 'Cayenne',
    name: 'Cayenne (9YA/9YB)',
    generation: '9YA',
    years: '2017–present',
    category: 'SUV',
    cooling: 'Water-cooled',
    layout: 'Front-engine, AWD',
    engine: 'Turbo V6 / V8 / E-Hybrid',
    power: '335–739 hp',
    bodyStyles: 'SUV, Coupé',
    notable:
      'The current Cayenne adds a sleek Coupé body and potent Turbo GT and E-Hybrid variants that blur the line between SUV and sports car.',
  },
  {
    id: 'macan',
    line: 'Macan',
    name: 'Macan (95B)',
    generation: '95B',
    years: '2014–present',
    category: 'SUV',
    cooling: 'Water-cooled',
    layout: 'Front-engine, AWD',
    engine: 'Turbo inline-4 / V6',
    power: '237–639 hp',
    bodyStyles: 'SUV',
    notable:
      'The compact SUV that became Porsche’s best-seller, widely praised as the sharpest-driving vehicle in its class.',
  },
  {
    id: 'panamera-970',
    line: 'Panamera',
    name: 'Panamera (970)',
    generation: '970',
    years: '2009–2016',
    category: 'Sedan',
    cooling: 'Water-cooled',
    layout: 'Front-engine, RWD / AWD',
    engine: 'V6 / V8 / hybrid',
    power: '300–570 hp',
    bodyStyles: 'Fastback Sedan',
    notable:
      'A four-door, four-seat Porsche that delivered genuine sports-car pace with limousine comfort — divisive in looks, decisive in capability.',
  },
  {
    id: 'panamera-971',
    line: 'Panamera',
    name: 'Panamera (971)',
    generation: '971',
    years: '2016–present',
    category: 'Sedan',
    cooling: 'Water-cooled',
    layout: 'Front-engine, RWD / AWD',
    engine: 'Turbo V6 / V8 / E-Hybrid',
    power: '325–690 hp',
    bodyStyles: 'Fastback Sedan, Sport Turismo',
    notable:
      'A dramatically better-looking second generation, adding the Sport Turismo wagon and a 680+ hp Turbo S E-Hybrid flagship.',
  },
  {
    id: 'taycan',
    line: 'Taycan',
    name: 'Taycan (J1)',
    generation: 'J1',
    years: '2019–present',
    category: 'Sedan',
    cooling: 'Electric',
    layout: 'Dual-motor, AWD',
    engine: 'Battery-electric (800V)',
    power: '321–1,019 hp',
    bodyStyles: 'Sedan, Sport Turismo, Cross Turismo',
    notable:
      'Porsche’s first all-electric car. Its 800-volt architecture and repeatable performance proved an EV could feel unmistakably like a Porsche.',
  },
];

/** Start year parsed from the "years" range (handles en-dash and hyphen). */
export const startYear = (years: string): number =>
  parseInt(years.replace(/[–-].*$/, '').trim(), 10) || new Date().getFullYear();

export const getModelById = (id: string): PorscheModel | undefined =>
  CATALOG.find((m) => m.id === id);

/** Distinct model lines, in catalog order. */
export const LINES: string[] = Array.from(new Set(CATALOG.map((m) => m.line)));

/** Distinct categories present in the catalog. */
export const CATEGORIES: string[] = Array.from(
  new Set(CATALOG.map((m) => m.category))
);

/** Distinct cooling/era values present in the catalog. */
export const ERAS: string[] = Array.from(new Set(CATALOG.map((m) => m.cooling)));

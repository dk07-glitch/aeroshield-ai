// Comprehensive database for AeroShield AI - Winter Smog & Clean Air Navigator

export const CITIES = [
  {
    id: 'delhi',
    name: 'New Delhi & NCR',
    country: 'India',
    aqi: 382,
    category: 'Severe / Hazardous',
    color: '#ef4444',
    pm25: 295.4,
    pm10: 418.0,
    no2: 84.2,
    so2: 24.5,
    co: 2.8,
    temp: 14,
    humidity: 78,
    windSpeed: 3.5, // km/h (severe stagnation)
    inversionHeight: 180, // meters
    solarMixingWindow: '13:00 - 15:30',
    primarySources: [
      { name: 'Vehicular Exhaust', percentage: 38, icon: 'Car' },
      { name: 'Biomass & Crop Burning', percentage: 28, icon: 'Flame' },
      { name: 'Secondary Inversion Trap', percentage: 20, icon: 'CloudFog' },
      { name: 'Construction Dust & Road Silt', percentage: 14, icon: 'Building' }
    ],
    forecast: [
      { time: '06:00', aqi: 415, pm25: 320, temp: 11, advisory: 'Severe Inversion Peak: Stay indoors, seal vents' },
      { time: '09:00', aqi: 395, pm25: 305, temp: 13, advisory: 'High rush-hour smog spike: N95 mask mandatory' },
      { time: '12:00', aqi: 340, pm25: 260, temp: 17, advisory: 'Gradual solar thermal mixing begins' },
      { time: '14:00', aqi: 275, pm25: 195, temp: 20, advisory: 'Ventilation Window: Brief 15-min air exchange' },
      { time: '17:00', aqi: 360, pm25: 280, temp: 16, advisory: 'Temperature drop: Inversion cap re-forming' },
      { time: '21:00', aqi: 410, pm25: 315, temp: 12, advisory: 'Stagnant cold pool: Maximum indoor HEPA usage' }
    ]
  },
  {
    id: 'lahore',
    name: 'Lahore',
    country: 'Pakistan',
    aqi: 412,
    category: 'Hazardous Extreme',
    color: '#991b1b',
    pm25: 338.2,
    pm10: 480.0,
    no2: 92.0,
    so2: 31.0,
    co: 3.2,
    temp: 13,
    humidity: 82,
    windSpeed: 2.8,
    inversionHeight: 150,
    solarMixingWindow: '13:30 - 15:00',
    primarySources: [
      { name: 'Low-grade Fuel & Brick Kilns', percentage: 40, icon: 'Factory' },
      { name: 'Vehicular Emissions', percentage: 32, icon: 'Car' },
      { name: 'Agricultural Smudge', percentage: 18, icon: 'Flame' },
      { name: 'Thermal Inversion', percentage: 10, icon: 'CloudFog' }
    ],
    forecast: [
      { time: '06:00', aqi: 435, pm25: 360, temp: 10, advisory: 'Dense toxic haze: Strict HEPA filtration' },
      { time: '09:00', aqi: 420, pm25: 345, temp: 12, advisory: 'Avoid any outdoor exertion' },
      { time: '12:00', aqi: 380, pm25: 300, temp: 16, advisory: 'Atmospheric ceiling slightly rises' },
      { time: '14:00', aqi: 320, pm25: 240, temp: 19, advisory: 'Marginal ventilation slot with filtration' },
      { time: '17:00', aqi: 395, pm25: 315, temp: 15, advisory: 'Sunset inversion compression' },
      { time: '21:00', aqi: 430, pm25: 355, temp: 11, advisory: 'Seal windows, run bedroom air cleaner' }
    ]
  },
  {
    id: 'beijing',
    name: 'Beijing & Hebei',
    country: 'China',
    aqi: 184,
    category: 'Unhealthy',
    color: '#f97316',
    pm25: 118.5,
    pm10: 172.0,
    no2: 48.0,
    so2: 12.0,
    co: 1.4,
    temp: 2,
    humidity: 45,
    windSpeed: 7.2,
    inversionHeight: 320,
    solarMixingWindow: '12:00 - 15:00',
    primarySources: [
      { name: 'Winter Centralized Heating', percentage: 35, icon: 'Flame' },
      { name: 'Heavy Industrial Transport', percentage: 30, icon: 'Car' },
      { name: 'Regional Fine Aerosols', percentage: 25, icon: 'CloudFog' },
      { name: 'Mineral Dust', percentage: 10, icon: 'Building' }
    ],
    forecast: [
      { time: '06:00', aqi: 210, pm25: 145, temp: -2, advisory: 'Freezing inversion layer: keep indoors sealed' },
      { time: '09:00', aqi: 195, pm25: 130, temp: 0, advisory: 'Rush-hour dust buildup' },
      { time: '12:00', aqi: 160, pm25: 98, temp: 4, advisory: 'Brisk mountain breeze aiding dispersal' },
      { time: '14:00', aqi: 145, pm25: 85, temp: 5, advisory: 'Optimal quick room air turnover' },
      { time: '17:00', aqi: 180, pm25: 115, temp: 2, advisory: 'Evening heating ramp-up' },
      { time: '21:00', aqi: 205, pm25: 140, temp: -1, advisory: 'Sub-zero thermal cap locks in soot' }
    ]
  },
  {
    id: 'salt-lake-city',
    name: 'Salt Lake Valley',
    country: 'USA (Utah Inversion)',
    aqi: 142,
    category: 'Unhealthy for Sensitive',
    color: '#eab308',
    pm25: 56.4,
    pm10: 78.0,
    no2: 34.0,
    so2: 6.0,
    co: 0.9,
    temp: -1,
    humidity: 72,
    windSpeed: 4.0,
    inversionHeight: 220,
    solarMixingWindow: '13:00 - 15:30',
    primarySources: [
      { name: 'Valley Bowl Inversion Trapping', percentage: 48, icon: 'CloudFog' },
      { name: 'Light Passenger Vehicles', percentage: 30, icon: 'Car' },
      { name: 'Home Wood Stoves & Gas Heating', percentage: 15, icon: 'Flame' },
      { name: 'Point Sources', percentage: 7, icon: 'Factory' }
    ],
    forecast: [
      { time: '06:00', aqi: 158, pm25: 68, temp: -4, advisory: 'Cold pool locked in valley floor' },
      { time: '09:00', aqi: 150, pm25: 62, temp: -2, advisory: 'Commute emissions pooling low' },
      { time: '12:00', aqi: 130, pm25: 48, temp: 2, advisory: 'Sunlight breaking top boundary' },
      { time: '14:00', aqi: 118, pm25: 42, temp: 3, advisory: 'Best window for outdoor errands' },
      { time: '17:00', aqi: 145, pm25: 58, temp: 0, advisory: 'Night radiative cooling locks inversion' },
      { time: '21:00', aqi: 155, pm25: 65, temp: -3, advisory: 'Wood burning restriction active in county' }
    ]
  },
  {
    id: 'milan',
    name: 'Milan / Po Valley',
    country: 'Italy',
    aqi: 138,
    category: 'Unhealthy for Sensitive',
    color: '#eab308',
    pm25: 52.8,
    pm10: 71.0,
    no2: 44.0,
    so2: 7.2,
    co: 1.1,
    temp: 5,
    humidity: 85,
    windSpeed: 3.1,
    inversionHeight: 250,
    solarMixingWindow: '12:30 - 14:30',
    primarySources: [
      { name: 'Po Valley Stagnant Basin', percentage: 42, icon: 'CloudFog' },
      { name: 'Diesel Vehicle Fleet', percentage: 33, icon: 'Car' },
      { name: 'Domestic Pellet Stoves', percentage: 18, icon: 'Flame' },
      { name: 'Agricultural Ammonia', percentage: 7, icon: 'Factory' }
    ],
    forecast: [
      { time: '06:00', aqi: 150, pm25: 60, temp: 2, advisory: 'Dense valley fog combining with soot' },
      { time: '09:00', aqi: 144, pm25: 55, temp: 4, advisory: 'Morning ring-road congestion' },
      { time: '12:00', aqi: 125, pm25: 45, temp: 8, advisory: 'Light breeze thinning the fog' },
      { time: '14:00', aqi: 115, pm25: 40, temp: 9, advisory: 'Cleanest time for cycling / transit' },
      { time: '17:00', aqi: 140, pm25: 54, temp: 6, advisory: 'Re-condensation of nocturnal inversion' },
      { time: '21:00', aqi: 148, pm25: 58, temp: 3, advisory: 'High humidity suspends fine particulates' }
    ]
  },
  {
    id: 'krakow',
    name: 'Krakow',
    country: 'Poland',
    aqi: 165,
    category: 'Unhealthy',
    color: '#f97316',
    pm25: 84.0,
    pm10: 112.0,
    no2: 36.0,
    so2: 18.0,
    co: 1.6,
    temp: 1,
    humidity: 88,
    windSpeed: 4.8,
    inversionHeight: 280,
    solarMixingWindow: '12:00 - 14:30',
    primarySources: [
      { name: 'Suburban Coal & Wood Stoves', percentage: 45, icon: 'Flame' },
      { name: 'Vistula Valley Inversion Trap', percentage: 30, icon: 'CloudFog' },
      { name: 'Older Transit Emissions', percentage: 18, icon: 'Car' },
      { name: 'Heavy Industry', percentage: 7, icon: 'Factory' }
    ],
    forecast: [
      { time: '06:00', aqi: 185, pm25: 102, temp: -1, advisory: 'Coal smoke trapped along Vistula basin' },
      { time: '09:00', aqi: 172, pm25: 90, temp: 0, advisory: 'Commute and boiler smoke overlap' },
      { time: '12:00', aqi: 145, pm25: 72, temp: 3, advisory: 'Thermal lift disperses low layer' },
      { time: '14:00', aqi: 135, pm25: 64, temp: 4, advisory: 'Safest afternoon walking window' },
      { time: '17:00', aqi: 170, pm25: 88, temp: 1, advisory: 'Evening domestic boilers igniting' },
      { time: '21:00', aqi: 190, pm25: 108, temp: -2, advisory: 'Smog alert: Run indoor air filtration' }
    ]
  }
];

export const PERSONAS = [
  {
    id: 'young-family',
    title: 'Young Family with Toddlers',
    badge: 'High Vulnerability',
    icon: 'Baby',
    color: 'from-pink-500 to-rose-600',
    description: 'Children breathe 50% more air per kg body weight; developing alveoli are hypersensitive to PM2.5.',
    vulnerabilities: [
      'Heightened risk of childhood asthma exacerbations',
      'Lower airway height exposes them to ground-level tailpipe exhaust',
      'Sensitive mucous membranes and developing immune response'
    ],
    recommendedAirQualityCap: 60, // Max safe PM2.5
    routinePointers: [
      'Never stroll with strollers along congested roads (stroller height has 30% higher PM2.5)',
      'Convert master bedroom into "Clean Air Sanctuary" (<25 AQI)',
      'Run low-noise HEPA purifiers 24/7 in nursery',
      'Stagger outdoor school activities to afternoon thermal window'
    ]
  },
  {
    id: 'respiratory-elderly',
    title: 'Elderly & Asthmatic / COPD',
    badge: 'Critical Medical Alert',
    icon: 'HeartPulse',
    color: 'from-amber-500 to-red-600',
    description: 'Particulates cross blood-air barrier causing systemic inflammation, vascular constriction, and bronchospasms.',
    vulnerabilities: [
      'High risk of ischemic cardiac events during sudden cold inversion dips',
      'COPD acute flare-ups triggered by ultra-fine soot particles',
      'Reduced mucociliary clearance of inhaled particulates'
    ],
    recommendedAirQualityCap: 45,
    routinePointers: [
      'Check Peak Flow meter every morning before getting out of bed',
      'Keep rescue inhaler at room temperature (cold air can cause spasms)',
      'Wear tight-fitting N95 mask if stepping out for any medical visits',
      'Maintain indoor humidity at 45% to prevent tracheal dryness'
    ]
  },
  {
    id: 'active-commuter',
    title: 'Active Commuters & Cyclists',
    badge: 'Heavy Inhalation Rate',
    icon: 'Bike',
    color: 'from-cyan-500 to-blue-600',
    description: 'Elevated cardiac exertion dramatically increases minute ventilation (inhaling 4x-8x more smog volume).',
    vulnerabilities: [
      'Deep alveolar deposition of combustion ultrafines during cardio exercise',
      'Increased arterial stiffness when exercising near highway diesel corridors',
      'Eye and nasal airway irritation'
    ],
    recommendedAirQualityCap: 80,
    routinePointers: [
      'Strictly substitute outdoor jogging with indoor cycling or yoga during morning inversions',
      'Shift commute 2 streets away from main arterial diesel corridors to cut PM2.5 exposure by 40%',
      'Equip commuter helmet with N99 silicone-sealed sports respirator',
      'Take advantage of public rapid transit during peak alert days'
    ]
  },
  {
    id: 'remote-worker',
    title: 'Apartment Dweller & Remote Worker',
    badge: 'Indoor Trap Alert',
    icon: 'Laptop',
    color: 'from-emerald-500 to-teal-600',
    description: 'Sealing windows prevents smog entry but causes toxic indoor CO2 (>1500ppm) and cooking VOC accumulation.',
    vulnerabilities: [
      'Mental fatigue and "brain fog" from accumulated indoor carbon dioxide',
      'Indoor gas stove and frying particulates accumulating in unventilated rooms',
      'Sedentary posture combined with shallow breathing'
    ],
    recommendedAirQualityCap: 75,
    routinePointers: [
      'Execute synchronized 15-minute cross-ventilation flush during peak solar noon',
      'Use induction hotplates rather than gas burners to prevent indoor NO2 spikes',
      'Place Snake Plants and Spider Plants near desk to reduce VOCs',
      'Run low-speed desktop HEPA cleaner near workspace'
    ]
  },
  {
    id: 'community-leader',
    title: 'Community Advocate & Housing Society',
    badge: 'Collective Impact',
    icon: 'Users',
    color: 'from-purple-500 to-indigo-600',
    description: 'Organize residential clusters, eliminate neighborhood leaf burning, and establish communal clean air safe-zones.',
    vulnerabilities: [
      'Community ground-level open burning of leaves and municipal waste',
      'Uncontrolled vehicle idling outside schools and society entry gates',
      'Lack of affordable filtration for security guards and domestic workers'
    ],
    recommendedAirQualityCap: 70,
    routinePointers: [
      'Sponsor DIY Corsi-Rosenthal boxes for security cabins and school classrooms',
      'Organize neighborhood electric carpooling and walking buses',
      'Set up compost bins to eliminate garden waste burning',
      'Install an open outdoor AQI display screen at neighborhood gate'
    ]
  }
];

export const IAQ_HACKS = [
  {
    id: 'corsi-rosenthal',
    title: 'The Corsi-Rosenthal DIY Box Purifier',
    category: 'DIY Hardware',
    difficulty: 'Easy (30 mins)',
    cost: '$20 - $35 (vs $250+ Commercial)',
    efficiency: '99% of PM2.5 & Virus Aerosols',
    cadr: '450 - 650 CFM',
    icon: 'Cpu',
    tag: 'Top Community Proven',
    description: 'A scientifically validated, open-source air purifier built with 4 or 5 MERV-13 furnace filters and a 20-inch box fan.',
    materials: [
      '1x 20-inch Box Fan (3-speed)',
      '4x 20x20x2 or 20x20x1 MERV 13 Furnace Filters',
      'Cardboard shroud (cuts corner vortex, increases airflow by 35%)',
      'Roll of high-adhesion Duct Tape or Gorilla Tape'
    ],
    steps: [
      'Tape 4 MERV-13 filters together in a square box with arrows pointing INWARD towards the center.',
      'Cut a cardboard bottom plate and tape securely to seal the base.',
      'Place the 20" box fan on top, blowing UPWARD and away from the filters.',
      'Cut a cardboard circular shroud with a 15-inch circular opening and tape on fan face (prevents backdraft and turbulence).',
      'Seal all seams with duct tape. Turn on medium speed for whisper-quiet continuous filtration.'
    ],
    impactMath: 'Delivers CADR equivalent to 3 premium commercial HEPA purifiers at 1/8th the cost.'
  },
  {
    id: 'smart-ventilation',
    title: 'Atmospheric Inversion Ventilation Timing',
    category: 'Meteorology Hack',
    difficulty: 'Zero Cost',
    cost: '$0',
    efficiency: '70% Lower Indoor Particulates',
    cadr: 'Passive',
    icon: 'Clock',
    tag: 'Crucial Daily Habit',
    description: 'Never open windows in the morning or late evening. Leverage the solar thermal expansion window when the planetary boundary layer temporarily rises.',
    materials: [
      'AeroShield App / Local AQI monitor',
      'Cross-ventilation opposing windows'
    ],
    steps: [
      'Keep all exterior windows and terrace doors locked shut from 5:00 PM to 12:30 PM.',
      'Wait for ground solar radiation to warm the surface air (typically 1:00 PM - 3:00 PM).',
      'Open windows on opposite sides of the house for exactly 12-15 minutes to flush stale CO2 without particulate saturating furniture.',
      'Immediately close and turn indoor air purifiers to Turbo mode for 10 minutes to trap residual outdoor fine dust.'
    ],
    impactMath: 'Flushes indoor CO2 from 1800ppm to 650ppm while preventing 78% of peak morning soot infiltration.'
  },
  {
    id: 'weatherstripping-seals',
    title: 'Thermal Door & Window Sealing',
    category: 'Building Envelope',
    difficulty: 'Moderate (1 hour)',
    cost: '$8 - $15',
    efficiency: 'Blocks 65% of Particulate Infiltration',
    cadr: 'Continuous Defense',
    icon: 'ShieldCheck',
    tag: 'Immediate Relief',
    description: 'Sub-micron winter smog behaves like a gas, penetrating tiny 2mm gaps under doors and around window frames.',
    materials: [
      'Self-adhesive silicone D-shape or E-shape weatherstrips',
      'Twin draft stopper for entrance doors',
      'Painter tape or silicone caulk for stationary sash gaps'
    ],
    steps: [
      'Conduct the "matchstick/candle test": hold an extinguished smoking wick near closed window frame to spot air drafts.',
      'Clean window sills with alcohol wipe and apply silicone compression weatherstripping.',
      'Slide a twin draft stopper under the front door facing outdoor corridors.',
      'Hang heavy winter thermal curtains: dense velvet or double-lined drape provides an extra particulate diffusion barrier.'
    ],
    impactMath: 'Reduces passive air infiltration rate from 1.2 ACH (air changes/hr) to under 0.3 ACH.'
  },
  {
    id: 'clean-cooking',
    title: 'Induction Cooking & Exhaust Protocol',
    category: 'Indoor Source Reduction',
    difficulty: 'Instant',
    cost: '$0 - $45',
    efficiency: 'Cuts Indoor PM2.5 Spikes by 85%',
    cadr: 'Preventive',
    icon: 'Utensils',
    tag: 'Health Essential',
    description: 'Cooking on gas stoves or high-heat oil frying generates localized PM2.5 levels exceeding 800 µg/m³ right at respiratory breathing zone.',
    materials: [
      'Countertop Induction Cooktop',
      'Cookware with tight-fitting glass lids',
      'Range Hood or Backdraft Exhaust Fan'
    ],
    steps: [
      'Turn on kitchen exhaust fan 2 minutes BEFORE lighting any flame or heating pans.',
      'Switch from open-pan deep frying to steaming, poaching, slow cooking, or closed lid pressure cooking.',
      'Transition to an electric induction cooktop: eliminates indoor unburned methane, nitrogen dioxide (NO2), and benzene fumes.',
      'Keep kitchen door isolated from living and sleeping quarters during meal preparation.'
    ],
    impactMath: 'Eliminates up to 350 µg/m³ of ultra-fine particulate matter from entering family living rooms.'
  },
  {
    id: 'humidity-barrier',
    title: 'The 45% Humidity Particulate Trap',
    category: 'Aerosol Physics',
    difficulty: 'Easy',
    cost: '$15 - $25',
    efficiency: 'Accelerates PM2.5 Gravitational Settling',
    cadr: 'Enhanced Deposition',
    icon: 'Droplets',
    tag: 'Respiratory Shield',
    description: 'Dry winter heated air (20% RH) allows sub-micron dust to stay suspended indefinitely. Regulating indoor RH to 40-50% causes hygroscopic growth of particles, causing them to fall to the floor where they can be damp-mopped.',
    materials: [
      'Digital hygrometer ($6)',
      'Cool-mist ultrasonic humidifier (use distilled/boiled water) or evaporative water bowl'
    ],
    steps: [
      'Monitor indoor relative humidity: optimal zone is 42% - 48%.',
      'Never use hard tap water in ultrasonic humidifiers (minerals produce white dust aerosol). Use reverse-osmosis or boiled water.',
      'Moisturize nasal passages: 45% humidity prevents drying of respiratory cilia, maintaining the body\'s natural mucus filter.',
      'Perform wet microfiber floor mopping daily instead of dry sweeping (which resuspends settled toxic soot).'
    ],
    impactMath: 'Cuts airborne particulate suspension half-life by 40% and preserves lung mucociliary defense.'
  },
  {
    id: 'botanical-filters',
    title: 'NASA Phytoremediation Bio-Array',
    category: 'Biological Air Filtering',
    difficulty: 'Low Maintenance',
    cost: '$10 - $20',
    efficiency: 'VOC & Trace Pollutant Removal',
    cadr: 'Continuous Bio-metabolism',
    icon: 'Leaf',
    tag: 'Natural Detox',
    description: 'Certain broad-leaf plants absorb formaldehyde, benzene, and xylene through stomata while breaking down carbon soot with root-associated rhizobacteria.',
    materials: [
      'Sansevieria (Snake Plant / Mother-in-Law\'s Tongue) - oxygen at night',
      'Areca Palm or Boston Fern - natural transpiration humidifier',
      'Chlorophytum (Spider Plant) - formaldehyde scrubber'
    ],
    steps: [
      'Allocate 3 to 4 waist-high potted plants per 100 square feet of room space.',
      'Place Snake Plants directly in bedrooms: they perform CAM photosynthesis, consuming CO2 and releasing oxygen during dark night hours.',
      'Gently wipe plant leaves with a damp cloth weekly: dust-free leaves absorb 3x more airborne volatile organics.'
    ],
    impactMath: 'Absorbs up to 87% of indoor volatile organic compounds (VOCs) within 24 hours in sealed rooms.'
  }
];

export const SUSTAINABLE_ALTERNATIVES = [
  {
    id: 'alt-heating',
    title: 'Heating: Clean Radiant & Inverter Heat Pumps',
    conventional: 'Unvented Kerosene Heaters / Chulha / Biomass / Wood Stoves',
    sustainable: 'Split Inverter Heat Pump / Mica-thermic Radiant Panel with Timer',
    icon: 'Zap',
    emissionsSaved: '3.8 kg PM2.5 & 120 kg CO2 / month',
    healthBonus: 'Zero carbon monoxide (CO) emission; prevents nighttime asphyxiation risk',
    costROI: '45% lower operating electric cost compared to resistive heating coils',
    impactLevel: 'Critical'
  },
  {
    id: 'alt-commute',
    title: 'Commute: Intermodal Transit & Shared EV Shuttles',
    conventional: 'Single-Occupancy Fossil Car / Diesel Auto Rickshaw',
    sustainable: 'Metro Rail + Last-Mile Electric Scooter / Verified Clean Carpool',
    icon: 'Train',
    emissionsSaved: '4.2 kg CO2 & 18g toxic exhaust PM2.5 per commute',
    healthBonus: 'Avoids sitting in bumper-to-bumper tailpipe plume (reduces driver VOC inhalation by 70%)',
    costROI: 'Saves ~$180 monthly in fuel, tolls, and vehicle wear-and-tear',
    impactLevel: 'High'
  },
  {
    id: 'alt-waste',
    title: 'Yard & Garden Waste: Bokashi & Composting',
    conventional: 'Open Smoldering / Burning Dry Leaves & Twigs',
    sustainable: 'Shredding & Municipal Composting / Trench Mulching',
    icon: 'Recycle',
    emissionsSaved: '12 kg PM2.5 & Carcinogenic Polycyclic Aromatic Hydrocarbons (PAHs)',
    healthBonus: 'Prevents acute neighborhood coughing bouts and eye burning',
    costROI: 'Generates rich organic compost fertilizer for spring gardening',
    impactLevel: 'Critical'
  },
  {
    id: 'alt-cooking',
    title: 'Cooking: Smart Magnetic Induction & Convection',
    conventional: 'Indoor Bottled Gas / Charcoal Fire',
    sustainable: 'Digital Induction Plate + Air Fryer with Sealed Condenser',
    icon: 'FlameKindling',
    emissionsSaved: 'Eliminates 85% of indoor NO2 & unburned methane',
    healthBonus: 'Protects infant lungs from chronic childhood asthma triggers',
    costROI: '84% thermal efficiency vs 40% for open gas flames',
    impactLevel: 'High'
  },
  {
    id: 'alt-advocacy',
    title: 'Community: School Clean Air Zones & Zero-Idling',
    conventional: 'Dozens of SUVs idling with heaters running outside school gates',
    sustainable: 'Active "Walking Bus" groups & 100m Enforced Zero-Idle Drop Zones',
    icon: 'GraduationCap',
    emissionsSaved: '55 kg ground-level toxic particulates per school semester',
    healthBonus: 'Protects children whose breathing zones are level with SUV exhaust pipes',
    costROI: 'Faster drop-offs, less traffic jam chaos for parents',
    impactLevel: 'High'
  }
];

export const PRESET_AI_PROMPTS = [
  {
    title: '👶 Child & Elder Day Planner',
    prompt: 'I have a 4-year-old child and elderly parents with mild asthma. Analyze current smog levels in our city and build an hour-by-hour winter safety schedule with indoor play alternatives and ventilation windows.'
  },
  {
    title: '🛠️ Build DIY Corsi-Rosenthal Box',
    prompt: 'Give me a step-by-step DIY Corsi-Rosenthal air cleaner tutorial. Calculate the exact CADR for a 350 sq ft living room and tell me which filter MERV rating gives the best balance between static pressure and PM2.5 capture.'
  },
  {
    title: '🪟 When can I open windows today?',
    prompt: 'Explain the physics of today\'s atmospheric temperature inversion layer in our city. Exactly what time will solar heating cause convective mixing, and how should I ventilate without letting smoke inside?'
  },
  {
    title: '🏃 Can I exercise or jog outdoors?',
    prompt: 'Assess the respiratory risk of outdoor cardiovascular exertion at today\'s AQI. What is the equivalent cigarette smoke burden, and what low-impact indoor aerobic workouts can my family do instead?'
  },
  {
    title: '🥘 Clean Cooking & Indoor Air Hacks',
    prompt: 'What are the top 5 hidden indoor air pollution sources during winter, and how can we neutralize them through induction cooking, plant bio-filtration, and humidity control?'
  }
];

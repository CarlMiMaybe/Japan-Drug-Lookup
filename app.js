const SOURCES = {
  mhlw:
    "https://www.mhlw.go.jp/english/policy/health-medical/pharmaceuticals/01.html?lv=true",
  ncd: "https://www.ncd.mhlw.go.jp/en/application2.html",
  controlledList:
    "https://www.ncd.mhlw.go.jp/dl_data/keitai/cotrolled_substances_list20241212%20.pdf",
  psychotropics: "https://www.ncd.mhlw.go.jp/dl_data/keitai/total.pdf",
};

const MHLW_SOURCES = [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }];
const CONTROLLED_SOURCES = [
  { label: "NCD Application Guidance", url: SOURCES.ncd },
  { label: "Controlled Substances List", url: SOURCES.controlledList },
];
const STANDARD_PRESCRIPTION_SUMMARY =
  "Usually legal to bring into Japan under the normal MHLW prescription-drug quantity rules.";
const STANDARD_PRESCRIPTION_LIMIT_DETAIL =
  "If you plan to bring more than 1 month supply, apply for Import Confirmation before travel.";

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createAllowedEntry({
  generic,
  brands = [],
  aliases = [],
  label = "Usually allowed",
  category,
  summary,
  details,
  sources = MHLW_SOURCES,
}) {
  return {
    generic,
    brands,
    aliases,
    status: "allowed",
    label,
    category,
    summary,
    details,
    sources,
  };
}

function createNarcoticPermissionEntry({
  generic,
  brands = [],
  aliases = [],
  summary = `Legal only with advance permission before entering Japan. ${capitalize(generic)} is listed as a narcotic in Japan.`,
  details = [
    `${capitalize(generic)} appears in the Controlled Substances List as a narcotic.`,
    "The NCD says narcotics require advance permission before you enter Japan.",
    "Travelers should apply before travel and carry the permit with the medicine at customs.",
  ],
}) {
  return {
    generic,
    brands,
    aliases,
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary,
    details,
    sources: CONTROLLED_SOURCES,
  };
}

function createStandardPrescriptionEntry({
  generic,
  brands = [],
  aliases = [],
  category = "General prescription medicine",
  summary = STANDARD_PRESCRIPTION_SUMMARY,
  ruleDetail,
  extraDetails = [],
  label = "Usually allowed",
  nameInDetail = generic,
  appendStandardLimit = true,
}) {
  return createAllowedEntry({
    generic,
    brands,
    aliases,
    label,
    category,
    summary,
    details: [
      `${capitalize(nameInDetail)} is not listed in the controlled-substances sources used in this app.`,
      ruleDetail,
      ...extraDetails,
      ...(appendStandardLimit ? [STANDARD_PRESCRIPTION_LIMIT_DETAIL] : []),
    ],
  });
}

const STANDARD_PRESCRIPTION_LOOKUPS = [
  {
    generic: "metformin",
    brands: ["Glucophage", "Fortamet", "Glumetza"],
    category: "Diabetes medicine",
    ruleDetail:
      "Oral diabetes medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "empagliflozin",
    brands: ["Jardiance"],
    category: "Diabetes medicine",
    ruleDetail:
      "SGLT2 inhibitor medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "dapagliflozin",
    brands: ["Farxiga"],
    category: "Diabetes medicine",
    ruleDetail:
      "SGLT2 inhibitor medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "canagliflozin",
    brands: ["Invokana"],
    category: "Diabetes medicine",
    ruleDetail:
      "SGLT2 inhibitor medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "sitagliptin",
    brands: ["Januvia"],
    category: "Diabetes medicine",
    ruleDetail:
      "DPP-4 inhibitor medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "linagliptin",
    brands: ["Tradjenta"],
    category: "Diabetes medicine",
    ruleDetail:
      "DPP-4 inhibitor medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "glipizide",
    brands: ["Glucotrol", "Glucotrol XL"],
    category: "Diabetes medicine",
    ruleDetail:
      "Sulfonylurea medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "glimepiride",
    brands: ["Amaryl"],
    category: "Diabetes medicine",
    ruleDetail:
      "Sulfonylurea medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "glyburide",
    brands: ["Diabeta", "Glynase"],
    aliases: ["glibenclamide"],
    category: "Diabetes medicine",
    ruleDetail:
      "Sulfonylurea medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "pioglitazone",
    brands: ["Actos"],
    category: "Diabetes medicine",
    ruleDetail:
      "Oral diabetes medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "ethinyl estradiol / levonorgestrel",
    brands: ["Alesse", "Aviane", "Lessina", "Vienva", "Sronyx"],
    aliases: ["levonorgestrel and ethinyl estradiol"],
    category: "Birth control pill",
    ruleDetail:
      "Standard combined oral contraceptive pills are usually handled under the normal MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the box, blister pack, or pharmacy label so the exact hormone combination is easy to show at customs if needed.",
    ],
  },
  {
    generic: "ethinyl estradiol / norgestimate",
    brands: ["Ortho Tri-Cyclen", "Tri-Sprintec", "Sprintec", "Mili", "Estarylla"],
    aliases: ["norgestimate and ethinyl estradiol"],
    category: "Birth control pill",
    ruleDetail:
      "Standard combined oral contraceptive pills are usually handled under the normal MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Triphasic and monophasic versions can look similar by brand, so keep the exact labeled pack.",
    ],
  },
  {
    generic: "ethinyl estradiol / drospirenone",
    brands: ["Yaz", "Yasmin", "Nikki", "Loryna", "Ocella"],
    aliases: ["drospirenone and ethinyl estradiol"],
    category: "Birth control pill",
    ruleDetail:
      "Standard combined oral contraceptive pills are usually handled under the normal MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Bring the exact labeled pack because drospirenone products come in several similar brand versions.",
    ],
  },
  {
    generic: "ethinyl estradiol / norethindrone",
    brands: ["Junel", "Loestrin", "Blisovi Fe", "Hailey Fe", "Microgestin Fe"],
    aliases: ["norethindrone acetate and ethinyl estradiol"],
    category: "Birth control pill",
    ruleDetail:
      "Standard combined oral contraceptive pills are usually handled under the normal MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Some packs include iron placebo tablets, but the overall product is still usually handled under the standard MHLW rules.",
    ],
  },
  {
    generic: "norethindrone",
    brands: ["Camila", "Errin", "Heather", "Incassia", "Norlyda"],
    aliases: ["norethindrone 0.35 mg", "progestin-only pill", "mini pill"],
    category: "Birth control pill",
    ruleDetail:
      "Progestin-only birth control pills are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the original labeled blister pack because norethindrone is also used in non-contraceptive prescription products.",
    ],
  },
  {
    generic: "levonorgestrel emergency contraception",
    brands: ["Plan B One-Step", "Take Action", "My Way", "Aftera", "Option 2"],
    aliases: ["plan b", "morning after pill", "emergency contraception", "levonorgestrel 1.5 mg"],
    category: "Emergency contraception",
    ruleDetail:
      "Non-controlled emergency contraceptive tablets are usually handled under the standard MHLW personal-use rules.",
    extraDetails: [
      "Keep the exact labeled box because emergency-contraception products can be confused with regular daily pill brands.",
    ],
  },
  {
    generic: "ulipristal acetate emergency contraception",
    brands: ["Ella"],
    aliases: ["ella", "ulipristal", "morning after pill prescription"],
    category: "Emergency contraception",
    ruleDetail:
      "Prescription emergency-contraception tablets are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the exact labeled box because emergency-contraception products can be confused with other reproductive-health medicines.",
    ],
  },
  {
    generic: "mifepristone",
    brands: ["Mifeprex", "Korlym"],
    category: "Reproductive health medicine",
    ruleDetail:
      "Standard non-controlled reproductive-health medicines are usually handled under the standard MHLW personal-use rules.",
    extraDetails: [
      "Keep the exact labeled package because mifepristone products can be used under very different treatment contexts.",
    ],
  },
  {
    generic: "misoprostol",
    brands: ["Cytotec"],
    category: "Reproductive health medicine",
    ruleDetail:
      "Standard non-controlled reproductive-health medicines are usually handled under the standard MHLW personal-use rules.",
    extraDetails: [
      "Keep the exact labeled package because misoprostol is used for more than one medical indication.",
    ],
  },
  {
    generic: "emtricitabine / tenofovir disoproxil fumarate",
    brands: ["Truvada"],
    aliases: ["truvada", "prep", "pep", "tdf ftc"],
    category: "HIV prevention and treatment medicine",
    ruleDetail:
      "Standard non-controlled HIV prevention and treatment medicines are usually handled under the standard MHLW personal-use rules.",
    extraDetails: [
      "The same medicine may be used for HIV treatment, PrEP, or PEP, so keep the pharmacy label with it.",
    ],
  },
  {
    generic: "emtricitabine / tenofovir alafenamide",
    brands: ["Descovy"],
    aliases: ["descovy", "taf ftc"],
    category: "HIV prevention and treatment medicine",
    ruleDetail:
      "Standard non-controlled HIV prevention and treatment medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "bictegravir / emtricitabine / tenofovir alafenamide",
    brands: ["Biktarvy"],
    aliases: ["biktarvy"],
    category: "HIV treatment medicine",
    ruleDetail:
      "Standard non-controlled HIV treatment medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "dolutegravir",
    brands: ["Tivicay"],
    aliases: ["tivicay"],
    category: "HIV treatment medicine",
    ruleDetail:
      "Standard non-controlled HIV treatment medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "dolutegravir / abacavir / lamivudine",
    brands: ["Triumeq"],
    aliases: ["triumeq"],
    category: "HIV treatment medicine",
    ruleDetail:
      "Standard non-controlled HIV treatment medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "rilpivirine / emtricitabine / tenofovir alafenamide",
    brands: ["Odefsey"],
    aliases: ["odefsey"],
    category: "HIV treatment medicine",
    ruleDetail:
      "Standard non-controlled HIV treatment medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "naltrexone",
    brands: ["ReVia", "Vivitrol"],
    category: "Addiction treatment medicine",
    ruleDetail:
      "Standard non-controlled addiction-treatment medicines are usually handled under the standard MHLW personal-use rules.",
    extraDetails: [
      "Keep the exact labeled package because naltrexone comes in both oral and injectable forms.",
    ],
  },
  {
    generic: "acamprosate",
    brands: ["Campral"],
    category: "Addiction treatment medicine",
    ruleDetail:
      "Standard non-controlled addiction-treatment medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "disulfiram",
    brands: ["Antabuse"],
    category: "Addiction treatment medicine",
    ruleDetail:
      "Standard non-controlled addiction-treatment medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "estradiol",
    brands: ["Estrace"],
    aliases: ["oral estradiol", "estradiol tablet"],
    category: "Hormone therapy medicine",
    ruleDetail:
      "Oral estrogen therapy medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the exact labeled package because estradiol also comes in patch, cream, and vaginal forms with different quantity rules.",
    ],
  },
  {
    generic: "progesterone",
    brands: ["Prometrium"],
    aliases: ["micronized progesterone", "oral progesterone"],
    category: "Hormone therapy medicine",
    ruleDetail:
      "Oral progesterone medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the labeled package because progesterone also comes in vaginal forms used for fertility treatment.",
    ],
  },
  {
    generic: "conjugated estrogens",
    brands: ["Premarin"],
    category: "Hormone therapy medicine",
    ruleDetail:
      "Oral estrogen therapy medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "estradiol / norethindrone acetate",
    brands: ["Activella", "Mimvey", "Lopreeza"],
    aliases: ["norethindrone acetate and estradiol"],
    category: "Hormone therapy medicine",
    ruleDetail:
      "Combination menopause hormone-therapy tablets are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Bring the exact labeled pack because similar estrogen-progestin products can be used for different indications.",
    ],
  },
  {
    generic: "clomiphene",
    brands: ["Clomid", "Serophene"],
    aliases: ["clomiphene citrate"],
    category: "Fertility medicine",
    ruleDetail:
      "Ovulation-induction medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "letrozole",
    brands: ["Femara"],
    category: "Fertility and hormone therapy medicine",
    ruleDetail:
      "Letrozole tablets are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "The same medicine can be used for fertility or other hormone-related treatment, so keep the pharmacy label with it.",
    ],
  },
  {
    generic: "sildenafil",
    brands: ["Viagra", "Revatio"],
    category: "Sexual health medicine",
    ruleDetail:
      "Non-controlled erectile-dysfunction medicines are usually handled under the standard MHLW personal-use rules.",
    extraDetails: [
      "Bring the labeled package because sildenafil is sold under different brand names depending on the indication.",
    ],
  },
  {
    generic: "tadalafil",
    brands: ["Cialis", "Adcirca"],
    category: "Sexual health medicine",
    ruleDetail:
      "Non-controlled erectile-dysfunction medicines are usually handled under the standard MHLW personal-use rules.",
    extraDetails: [
      "Bring the labeled package because tadalafil is sold under different brand names depending on the indication.",
    ],
  },
  {
    generic: "fluconazole",
    brands: ["Diflucan"],
    category: "Antifungal medicine",
    ruleDetail:
      "Oral antifungal medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the exact labeled package because fluconazole is used in both short-course and longer-course treatment plans.",
    ],
  },
  {
    generic: "itraconazole",
    brands: ["Sporanox"],
    category: "Antifungal medicine",
    ruleDetail:
      "Oral antifungal medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "oral terbinafine",
    brands: ["Lamisil Tablets"],
    aliases: ["terbinafine tablets", "terbinafine hydrochloride tablets"],
    category: "Antifungal medicine",
    ruleDetail:
      "Oral antifungal medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "This entry is for tablet treatment, not the common OTC topical Lamisil AT products.",
    ],
  },
  {
    generic: "nystatin",
    brands: ["Mycostatin", "Nystop"],
    aliases: ["oral nystatin", "nystatin suspension", "nystatin tablets"],
    category: "Antifungal medicine",
    ruleDetail:
      "Standard non-controlled antifungal medicines are usually handled under the standard MHLW personal-use rules.",
    extraDetails: [
      "Nystatin also comes in topical forms, so keep the labeled package to show the exact dosage form.",
    ],
  },
  {
    generic: "tamoxifen",
    brands: ["Nolvadex", "Soltamox"],
    category: "Cancer medicine",
    ruleDetail:
      "Oral hormone-therapy cancer medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the exact labeled package because tamoxifen is typically used as a long-course treatment medicine.",
    ],
  },
  {
    generic: "anastrozole",
    brands: ["Arimidex"],
    category: "Cancer medicine",
    ruleDetail:
      "Oral hormone-therapy cancer medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "exemestane",
    brands: ["Aromasin"],
    category: "Cancer medicine",
    ruleDetail:
      "Oral hormone-therapy cancer medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "imatinib",
    brands: ["Gleevec"],
    category: "Cancer medicine",
    ruleDetail:
      "Targeted oral cancer medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the original pharmacy label because targeted-therapy tablets are often highly specific to the condition being treated.",
    ],
  },
  {
    generic: "capecitabine",
    brands: ["Xeloda"],
    category: "Cancer medicine",
    ruleDetail:
      "Oral chemotherapy medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the medicine in original labeled packaging because cancer-treatment tablets should be clearly identified at customs.",
    ],
  },
  {
    generic: "diclegis",
    brands: ["Diclegis", "Bonjesta"],
    aliases: ["doxylamine pyridoxine", "bonjesta", "pregnancy nausea medicine"],
    category: "Pregnancy medicine",
    ruleDetail:
      "Prescription nausea medicines used in pregnancy are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "This entry is for the pregnancy-nausea combination product, not plain doxylamine sleep tablets.",
    ],
  },
  {
    generic: "ursodiol",
    brands: ["Actigall", "Urso Forte"],
    aliases: ["ursodeoxycholic acid"],
    category: "Pregnancy and liver medicine",
    ruleDetail:
      "Standard non-controlled prescription medicines are usually handled under the standard MHLW personal-use rules.",
    extraDetails: [
      "It is used for more than one condition, so keep the pharmacy label with it.",
    ],
  },
  {
    generic: "labetalol",
    brands: ["Trandate"],
    category: "Pregnancy and blood pressure medicine",
    ruleDetail:
      "Blood-pressure medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Labetalol is commonly used in pregnancy, but the same Japan quantity rules still apply.",
    ],
  },
  {
    generic: "nifedipine",
    brands: ["Procardia XL", "Adalat CC"],
    category: "Pregnancy and blood pressure medicine",
    ruleDetail:
      "Calcium channel blocker medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the exact labeled package because nifedipine comes in immediate-release and extended-release versions.",
    ],
  },
  {
    generic: "amoxicillin",
    brands: ["Amoxil", "Moxatag"],
    category: "Antibiotic",
    ruleDetail:
      "Standard oral antibiotics are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "amoxicillin / clavulanate",
    brands: ["Augmentin"],
    aliases: ["amoxicillin clavulanate", "co-amoxiclav"],
    category: "Antibiotic",
    ruleDetail:
      "Standard oral antibiotics are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the exact labeled package because antibiotic combination products can look similar to plain amoxicillin.",
    ],
  },
  {
    generic: "azithromycin",
    brands: ["Zithromax", "Z-Pak"],
    category: "Antibiotic",
    ruleDetail:
      "Standard oral antibiotics are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "doxycycline",
    brands: ["Doryx", "Vibramycin", "Oracea"],
    aliases: ["doxy pep", "doxypep"],
    category: "Antibiotic",
    ruleDetail:
      "Standard oral antibiotics are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Doxycycline is used for several conditions including infections and acne, so keep the pharmacy label with it.",
    ],
  },
  {
    generic: "cephalexin",
    brands: ["Keflex"],
    category: "Antibiotic",
    ruleDetail:
      "Standard oral antibiotics are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "ciprofloxacin",
    brands: ["Cipro"],
    category: "Antibiotic",
    ruleDetail:
      "Standard oral antibiotics are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "nitrofurantoin",
    brands: ["Macrobid", "Macrodantin"],
    category: "Antibiotic",
    ruleDetail:
      "Standard oral antibiotics are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the exact labeled package because nitrofurantoin comes in different release forms and strengths.",
    ],
  },
  {
    generic: "metronidazole",
    brands: ["Flagyl"],
    category: "Antibiotic",
    ruleDetail:
      "Standard oral antibiotics are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "benzonatate",
    brands: ["Tessalon", "Tessalon Perles"],
    category: "Prescription cough medicine",
    ruleDetail:
      "Standard non-controlled prescription cough medicines are usually handled under the standard MHLW personal-use rules.",
    extraDetails: [
      "Benzonatate is a prescription cough medicine, not an OTC cough product.",
      "Keep the exact labeled package because benzonatate can be confused with OTC cough medicines.",
    ],
  },
  {
    generic: "prednisone",
    brands: ["Rayos"],
    category: "Steroid medicine",
    ruleDetail:
      "Oral corticosteroid medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "prednisolone",
    brands: ["Orapred", "Prelone", "Millipred"],
    category: "Steroid medicine",
    ruleDetail:
      "Oral corticosteroid medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "hydroxychloroquine",
    brands: ["Plaquenil"],
    category: "Autoimmune medicine",
    ruleDetail:
      "Standard non-controlled autoimmune medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "levetiracetam",
    brands: ["Keppra", "Spritam"],
    category: "Seizure medicine",
    ruleDetail:
      "Seizure medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "lamotrigine",
    brands: ["Lamictal"],
    category: "Seizure and mood medicine",
    ruleDetail:
      "Lamotrigine is usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "It is used for more than one condition, so keep the pharmacy label with it.",
    ],
  },
  {
    generic: "pregabalin",
    brands: ["Lyrica"],
    category: "Nerve pain and seizure medicine",
    ruleDetail:
      "Pregabalin is usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "topiramate",
    brands: ["Topamax", "Trokendi XR", "Qudexy XR"],
    category: "Seizure and migraine medicine",
    ruleDetail:
      "Topiramate is usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "budesonide inhaler",
    brands: ["Pulmicort Flexhaler"],
    aliases: ["budesonide inhalation"],
    category: "Asthma maintenance medicine",
    ruleDetail:
      "Inhaled corticosteroid medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep inhalers in original labeled packaging when possible, especially if you are bringing more than one device.",
    ],
  },
  {
    generic: "budesonide / formoterol",
    brands: ["Symbicort", "Breyna"],
    aliases: ["symbicort", "breyna"],
    category: "Asthma maintenance medicine",
    ruleDetail:
      "Combination maintenance inhalers are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep inhalers in original labeled packaging when possible because brand and device format matter.",
    ],
  },
  {
    generic: "fluticasone / salmeterol",
    brands: ["Advair Diskus", "Advair HFA", "Wixela Inhub"],
    aliases: ["advair", "wixela"],
    category: "Asthma maintenance medicine",
    ruleDetail:
      "Combination maintenance inhalers are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep inhalers in original labeled packaging when possible because dry-powder and aerosol versions differ.",
    ],
  },
  {
    generic: "meloxicam",
    brands: ["Mobic"],
    category: "Pain and inflammation medicine",
    ruleDetail:
      "Prescription anti-inflammatory medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "celecoxib",
    brands: ["Celebrex"],
    category: "Pain and inflammation medicine",
    ruleDetail:
      "Prescription anti-inflammatory medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "diclofenac oral",
    brands: ["Voltaren", "Zipsor", "Cambia"],
    aliases: ["diclofenac sodium tablets", "diclofenac potassium"],
    category: "Pain and inflammation medicine",
    ruleDetail:
      "Prescription anti-inflammatory medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "This entry is for oral diclofenac products, not topical Voltaren gel.",
    ],
  },
  {
    generic: "mesalamine",
    brands: ["Lialda", "Apriso", "Pentasa", "Delzicol", "Canasa", "Rowasa"],
    category: "GI medicine",
    ruleDetail:
      "Inflammatory-bowel-disease medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the exact labeled package because mesalamine comes in tablets, capsules, suppositories, and enemas.",
    ],
  },
  {
    generic: "dicyclomine",
    brands: ["Bentyl"],
    category: "GI medicine",
    ruleDetail:
      "IBS and antispasmodic medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "fluoxetine",
    brands: ["Prozac", "Sarafem"],
    category: "Mood medicine",
    ruleDetail:
      "Most standard antidepressants are usually handled under the MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "venlafaxine",
    brands: ["Effexor XR"],
    category: "Mood medicine",
    ruleDetail:
      "Most standard antidepressants are usually handled under the MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "dutasteride",
    brands: ["Avodart"],
    category: "Prostate medicine",
    ruleDetail:
      "Prostate medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "oxybutynin",
    brands: ["Ditropan XL", "Oxytrol"],
    category: "Bladder medicine",
    ruleDetail:
      "Bladder and urinary medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the exact labeled package because oxybutynin comes in tablet, patch, and other forms.",
    ],
  },
  {
    generic: "isotretinoin",
    brands: ["Accutane", "Absorica", "Claravis", "Amnesteem"],
    category: "Acne medicine",
    ruleDetail:
      "Standard non-controlled acne medicines are usually handled under the standard MHLW personal-use rules.",
    extraDetails: [
      "Keep the original labeled packaging because isotretinoin is a tightly managed prescription medicine in many countries.",
    ],
  },
  {
    generic: "prochlorperazine",
    brands: ["Compazine"],
    category: "Nausea medicine",
    ruleDetail:
      "Standard non-controlled anti-nausea medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "olanzapine",
    brands: ["Zyprexa"],
    category: "Mood and nausea-support medicine",
    ruleDetail:
      "Olanzapine is usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "It is used for more than one condition, so keep the pharmacy label with it.",
    ],
  },
  {
    generic: "simvastatin",
    brands: ["Zocor"],
    category: "Heart and cholesterol medicine",
    ruleDetail:
      "Cholesterol medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "pravastatin",
    brands: ["Pravachol"],
    category: "Heart and cholesterol medicine",
    ruleDetail:
      "Cholesterol medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "warfarin",
    brands: ["Coumadin", "Jantoven"],
    category: "Heart and blood thinner medicine",
    ruleDetail:
      "Blood thinner medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the exact labeled package because warfarin tablet strengths often differ by color and dosage.",
    ],
  },
  {
    generic: "rivaroxaban",
    brands: ["Xarelto"],
    category: "Heart and blood thinner medicine",
    ruleDetail:
      "Blood thinner medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "dabigatran",
    brands: ["Pradaxa"],
    category: "Heart and blood thinner medicine",
    ruleDetail:
      "Blood thinner medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "furosemide",
    brands: ["Lasix"],
    category: "Heart and fluid medicine",
    ruleDetail:
      "Diuretic medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "hydrochlorothiazide",
    brands: ["Microzide"],
    aliases: ["hctz"],
    category: "Blood pressure medicine",
    ruleDetail:
      "Diuretic blood-pressure medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "liothyronine",
    brands: ["Cytomel"],
    category: "Thyroid medicine",
    ruleDetail:
      "Thyroid medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "methimazole",
    brands: ["Tapazole"],
    category: "Thyroid medicine",
    ruleDetail:
      "Thyroid medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "propylthiouracil",
    brands: ["PTU"],
    category: "Thyroid medicine",
    ruleDetail:
      "Thyroid medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "trimethoprim / sulfamethoxazole",
    brands: ["Bactrim", "Septra"],
    aliases: ["trimethoprim sulfamethoxazole", "co-trimoxazole", "tmp smx"],
    category: "Antibiotic",
    ruleDetail:
      "Standard oral antibiotics are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the exact labeled package because this is a combination antibiotic product.",
    ],
  },
  {
    generic: "clindamycin",
    brands: ["Cleocin"],
    category: "Antibiotic",
    ruleDetail:
      "Standard oral antibiotics are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "levofloxacin",
    brands: ["Levaquin"],
    category: "Antibiotic",
    ruleDetail:
      "Standard oral antibiotics are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "penicillin v potassium",
    brands: ["Pen-Vee K", "Veetids"],
    aliases: ["penicillin vk"],
    category: "Antibiotic",
    ruleDetail:
      "Standard oral antibiotics are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "carbamazepine",
    brands: ["Tegretol", "Carbatrol"],
    category: "Seizure medicine",
    ruleDetail:
      "Seizure medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "oxcarbazepine",
    brands: ["Trileptal", "Oxtellar XR"],
    category: "Seizure medicine",
    ruleDetail:
      "Seizure medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "divalproex sodium",
    brands: ["Depakote", "Depakote ER"],
    aliases: ["divalproex", "valproate", "valproic acid"],
    category: "Seizure and mood medicine",
    ruleDetail:
      "Seizure and mood medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep the exact labeled package because valproate products come in several related names and formulations.",
    ],
  },
  {
    generic: "phenytoin",
    brands: ["Dilantin", "Phenytek"],
    category: "Seizure medicine",
    ruleDetail:
      "Seizure medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "duloxetine",
    brands: ["Cymbalta", "Drizalma Sprinkle"],
    category: "Mood medicine",
    ruleDetail:
      "Most standard antidepressants are usually handled under the MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "paroxetine",
    brands: ["Paxil", "Pexeva", "Brisdelle"],
    category: "Mood medicine",
    ruleDetail:
      "Most standard antidepressants are usually handled under the MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "mirtazapine",
    brands: ["Remeron"],
    category: "Mood medicine",
    ruleDetail:
      "Most standard antidepressants are usually handled under the MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "quetiapine",
    brands: ["Seroquel", "Seroquel XR"],
    category: "Mood medicine",
    ruleDetail:
      "Standard non-controlled mood medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "aripiprazole",
    brands: ["Abilify"],
    category: "Mood medicine",
    ruleDetail:
      "Standard non-controlled mood medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "atomoxetine",
    brands: ["Strattera"],
    category: "ADHD medicine",
    ruleDetail:
      "Non-stimulant ADHD medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "guanfacine extended release",
    brands: ["Intuniv"],
    aliases: ["guanfacine er"],
    category: "ADHD medicine",
    ruleDetail:
      "Non-stimulant ADHD medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "clonidine extended release",
    brands: ["Kapvay"],
    aliases: ["clonidine er"],
    category: "ADHD medicine",
    ruleDetail:
      "Non-stimulant ADHD medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Clonidine is also used for blood pressure, so keep the pharmacy label with it.",
    ],
  },
  {
    generic: "tiotropium",
    brands: ["Spiriva HandiHaler", "Spiriva Respimat"],
    category: "COPD medicine",
    ruleDetail:
      "Inhaled maintenance medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep inhalers in original labeled packaging when possible because device format matters.",
    ],
  },
  {
    generic: "ipratropium",
    brands: ["Atrovent HFA"],
    aliases: ["ipratropium inhaler"],
    category: "COPD and asthma medicine",
    ruleDetail:
      "Inhaled maintenance medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "umeclidinium",
    brands: ["Incruse Ellipta"],
    category: "COPD medicine",
    ruleDetail:
      "Inhaled maintenance medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "fluticasone / umeclidinium / vilanterol",
    brands: ["Trelegy Ellipta"],
    aliases: ["trelegy"],
    category: "COPD medicine",
    ruleDetail:
      "Combination maintenance inhalers are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep inhalers in original labeled packaging when possible because multi-ingredient inhalers can look similar by brand family.",
    ],
  },
  {
    generic: "linaclotide",
    brands: ["Linzess"],
    category: "GI medicine",
    ruleDetail:
      "Constipation and IBS medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "lubiprostone",
    brands: ["Amitiza"],
    category: "GI medicine",
    ruleDetail:
      "Constipation and IBS medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "sucralfate",
    brands: ["Carafate"],
    category: "GI medicine",
    ruleDetail:
      "GI protective medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "balsalazide",
    brands: ["Colazal"],
    category: "GI medicine",
    ruleDetail:
      "Inflammatory-bowel-disease medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "sulfasalazine",
    brands: ["Azulfidine"],
    category: "Autoimmune and GI medicine",
    ruleDetail:
      "Standard non-controlled autoimmune and GI medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "azathioprine",
    brands: ["Imuran", "Azasan"],
    category: "Autoimmune medicine",
    ruleDetail:
      "Standard non-controlled autoimmune medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "mycophenolate",
    brands: ["CellCept", "Myfortic"],
    aliases: ["mycophenolate mofetil", "mycophenolic acid"],
    category: "Autoimmune medicine",
    ruleDetail:
      "Standard non-controlled autoimmune medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "oseltamivir",
    brands: ["Tamiflu"],
    category: "Antiviral medicine",
    ruleDetail:
      "Antiviral medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "febuxostat",
    brands: ["Uloric"],
    category: "Gout medicine",
    ruleDetail:
      "Gout medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "potassium citrate",
    brands: ["Urocit-K"],
    category: "Kidney stone medicine",
    ruleDetail:
      "Kidney and urinary medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "tranexamic acid",
    brands: ["Lysteda"],
    category: "Women's health medicine",
    ruleDetail:
      "Standard non-controlled women's-health medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "aprepitant",
    brands: ["Emend"],
    category: "Nausea medicine",
    ruleDetail:
      "Standard non-controlled anti-nausea medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "dexamethasone",
    brands: ["Decadron", "DexPak"],
    category: "Steroid medicine",
    ruleDetail:
      "Corticosteroid medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "atorvastatin",
    brands: ["Lipitor"],
    ruleDetail:
      "Prescription medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "rosuvastatin",
    brands: ["Crestor"],
    ruleDetail:
      "Prescription medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "metoprolol",
    brands: ["Lopressor", "Toprol-XL"],
    aliases: ["metoprolol tartrate", "metoprolol succinate"],
    category: "Heart and blood pressure medicine",
    ruleDetail:
      "Beta-blockers are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "carvedilol",
    brands: ["Coreg", "Coreg CR"],
    category: "Heart and blood pressure medicine",
    ruleDetail:
      "Heart-failure and blood-pressure medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "lisinopril",
    brands: ["Zestril", "Prinivil", "Qbrelis"],
    category: "Heart and blood pressure medicine",
    ruleDetail:
      "ACE inhibitors are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "losartan",
    brands: ["Cozaar"],
    category: "Heart and blood pressure medicine",
    ruleDetail:
      "Angiotensin receptor blockers are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "amlodipine",
    brands: ["Norvasc"],
    aliases: ["amlodipine besylate"],
    category: "Heart and blood pressure medicine",
    ruleDetail:
      "Calcium channel blockers are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "clopidogrel",
    brands: ["Plavix"],
    category: "Heart and blood thinner medicine",
    ruleDetail:
      "Antiplatelet medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "apixaban",
    brands: ["Eliquis"],
    category: "Heart and blood thinner medicine",
    ruleDetail:
      "Blood thinner medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "nitroglycerin",
    brands: ["Nitrostat", "Nitro-Dur"],
    aliases: ["glyceryl trinitrate"],
    category: "Heart medicine",
    summary:
      "Usually legal to bring into Japan for personal use under the normal MHLW rules, but the dosage form matters.",
    ruleDetail:
      "Sublingual tablets and transdermal products are usually handled under the standard MHLW personal-use rules.",
    appendStandardLimit: false,
    extraDetails: [
      "If you plan to bring more than 1 month supply of prescription product, or many external-use items, check the MHLW quantity rules before travel.",
    ],
  },
  {
    generic: "levothyroxine",
    brands: ["Synthroid", "Levoxyl", "Unithroid", "Tirosint"],
    category: "Thyroid medicine",
    ruleDetail:
      "Thyroid medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "alendronate",
    brands: ["Fosamax", "Binosto"],
    category: "Bone health medicine",
    ruleDetail:
      "Osteoporosis medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "tamsulosin",
    brands: ["Flomax"],
    category: "Prostate and urinary medicine",
    ruleDetail:
      "BPH and urinary medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "finasteride",
    brands: ["Proscar", "Propecia"],
    category: "Prostate medicine",
    ruleDetail:
      "Prostate medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "allopurinol",
    brands: ["Zyloprim", "Aloprim"],
    category: "Gout medicine",
    ruleDetail:
      "Gout medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "gabapentin",
    brands: ["Neurontin", "Gralise", "Horizant"],
    category: "Nerve pain medicine",
    ruleDetail:
      "Nerve-pain medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "pantoprazole",
    brands: ["Protonix"],
    category: "Acid reflux medicine",
    ruleDetail:
      "Acid-reflux medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "sertraline",
    brands: ["Zoloft"],
    category: "Mood medicine",
    ruleDetail:
      "Most standard antidepressants are usually handled under the MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "donepezil",
    brands: ["Aricept"],
    category: "Memory medicine",
    ruleDetail:
      "Memory medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "memantine",
    brands: ["Namenda"],
    category: "Memory medicine",
    ruleDetail:
      "Memory medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "escitalopram",
    brands: ["Lexapro"],
    category: "Mood medicine",
    ruleDetail:
      "Most standard antidepressants are usually handled under the MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "bupropion",
    brands: ["Wellbutrin XL", "Wellbutrin SR"],
    category: "Mood medicine",
    ruleDetail:
      "Standard antidepressant medicines are usually handled under the MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "buspirone",
    brands: ["Buspar"],
    category: "Anxiety medicine",
    ruleDetail:
      "Non-controlled anxiety medicines are usually handled under the standard MHLW personal-use rules.",
  },
  {
    generic: "sumatriptan",
    brands: ["Imitrex", "Tosymra"],
    category: "Migraine medicine",
    ruleDetail:
      "Migraine medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Nasal and injectable forms may need extra attention to quantity and packaging, so keep them labeled.",
    ],
  },
  {
    generic: "albuterol",
    brands: ["Ventolin HFA", "ProAir HFA", "Proventil HFA"],
    aliases: ["salbutamol"],
    category: "Asthma medicine",
    ruleDetail:
      "Inhalers are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Keep inhalers in original packaging when possible, especially if you are bringing more than one device.",
    ],
  },
  {
    generic: "montelukast",
    brands: ["Singulair"],
    category: "Allergy and asthma medicine",
    ruleDetail:
      "Allergy and asthma medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "spironolactone",
    brands: ["Aldactone"],
    category: "Hormonal and blood pressure medicine",
    ruleDetail:
      "It is used for several conditions, but it is usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "valacyclovir",
    brands: ["Valtrex"],
    category: "Antiviral medicine",
    ruleDetail:
      "Antiviral medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
  {
    generic: "ondansetron",
    brands: ["Zofran"],
    category: "Nausea medicine",
    ruleDetail:
      "Nausea medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
    extraDetails: [
      "Oral and dissolvable forms are usually straightforward when kept in labeled packaging.",
    ],
  },
  {
    generic: "cyclobenzaprine",
    brands: ["Flexeril", "Amrix"],
    category: "Muscle spasm medicine",
    ruleDetail:
      "Muscle-relaxant medicines are usually handled under the standard MHLW personal-use rules unless a controlled ingredient is involved.",
  },
];

const DRUGS = [
  {
    generic: "amphetamine mixed salts",
    brands: ["Adderall", "Adderall XR", "Mydayis"],
    aliases: ["amphetamine", "dextroamphetamine amphetamine"],
    status: "restricted",
    label: "Prohibited",
    category: "Stimulant",
    summary:
      "Not legal to bring into Japan. Amphetamine is controlled as a stimulant and is prohibited for individual travelers, even with a prescription.",
    details: [
      "The NCD FAQ specifically says Adderall cannot be imported into Japan, even for treatment purposes.",
      "Amphetamine is listed as a prohibited stimulant in the Controlled Substances List.",
      "If your ADHD medicine contains amphetamine or dextroamphetamine, assume it is not allowed unless the exact ingredient is shown otherwise by MHLW.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "speed (amphetamine / methamphetamine street term)",
    brands: ["Speed"],
    aliases: ["meth", "crystal meth", "ice", "glass"],
    status: "restricted",
    label: "Prohibited",
    category: "Stimulant",
    summary:
      "Do not bring products described as speed, meth, or similar stimulant street drugs into Japan. Treat them as prohibited for individual travelers.",
    details: [
      "In common usage, speed often refers to amphetamine or methamphetamine-type illegal stimulants.",
      "The NCD traveler guidance specifically says amphetamine cannot be imported into Japan, even for treatment purposes.",
      "Methamphetamine and amphetamine are specifically listed in the NCD prohibited-substances guidance.",
      "If a product uses slang instead of a clear medical ingredient name, do not travel with it until you have official confirmation of the exact substance.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "cannabis (marijuana / THC products)",
    brands: ["Marijuana", "Cannabis"],
    aliases: [
      "weed",
      "pot",
      "grass",
      "ganja",
      "mary jane",
      "herb",
      "bud",
      "reefer",
      "hash",
      "hashish",
      "dope",
      "chronic",
      "kush",
      "thc",
      "thc gummies",
      "edibles",
      "cannabis oil",
      "weed pen",
      "thc vape",
      "joint",
    ],
    status: "restricted",
    label: "Prohibited",
    category: "Cannabis / narcotic-related product",
    summary:
      "Do not bring marijuana, THC products, or cannabis-derived recreational products into Japan. Treat them as prohibited for individual travelers.",
    details: [
      "The NCD travel guidance lists cannabis as a separate controlled category that requires special legal treatment.",
      "Japan's official CBD guidance says products with delta-9 THC above the residue limit are treated as narcotics from December 12, 2024.",
      "Because travelers cannot rely on foreign prescriptions, dispensary labels, or U.S. state legality, marijuana and THC products should be treated as not allowed.",
      "If a product is marketed as CBD but may contain THC, get official confirmation before import rather than assuming it is safe.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "NCD CBD Product Import Guidance", url: "https://www.ncd.mhlw.go.jp/cbd.html" },
    ],
  },
  {
    generic: "cannabidiol (CBD products)",
    brands: ["CBD", "CBD Oil"],
    aliases: ["cannabidiol", "hemp oil", "cbd gummies", "cbd tincture", "cbd vape"],
    status: "permission",
    label: "Official confirmation strongly recommended",
    category: "CBD-related product",
    summary:
      "Do not assume a CBD product is allowed in Japan. Products can be treated very differently depending on their ingredients and THC residue, so official confirmation is strongly recommended before import.",
    details: [
      "The NCD has a dedicated CBD product import guidance page and offers pre-import confirmation for people who are unsure whether a CBD product is considered a narcotic.",
      "Japan's official CBD guidance says that from December 12, 2024, products with delta-9 THC above the residue limit are treated as narcotics.",
      "Even when a product is marketed as CBD in the U.S., travelers should not rely on store labels alone.",
      "If you plan to bring a CBD product, confirm the exact ingredients and use the NCD's CBD guidance process before travel.",
    ],
    sources: [
      { label: "NCD CBD Product Import Guidance", url: "https://www.ncd.mhlw.go.jp/cbd.html" },
      { label: "NCD Application Guidance", url: SOURCES.ncd },
    ],
  },
  {
    generic: "tetrahydrocannabinol (THC)",
    brands: ["THC"],
    aliases: ["delta-9 thc", "tetrahydrocannabinol", "thc oil", "thc cartridge", "thc edibles"],
    status: "restricted",
    label: "Prohibited",
    category: "Cannabis / narcotic-related product",
    summary:
      "Do not bring THC products into Japan. Treat THC oils, edibles, vapes, and similar products as prohibited for individual travelers.",
    details: [
      "Japan's official CBD guidance says that from December 12, 2024, products with delta-9 THC above the residue limit are treated as narcotics.",
      "Travelers should not rely on foreign prescriptions, dispensary labels, or U.S. state legality for THC products.",
      "This includes common THC formats such as oils, cartridges, gummies, and other edibles.",
      "If a product is sold as CBD but may contain THC, use the official CBD import guidance before travel instead of assuming it is allowed.",
    ],
    sources: [
      { label: "NCD CBD Product Import Guidance", url: "https://www.ncd.mhlw.go.jp/cbd.html" },
      { label: "NCD Application Guidance", url: SOURCES.ncd },
    ],
  },
  {
    generic: "cocaine",
    brands: ["Cocaine"],
    aliases: ["coke", "crack", "blow", "snow", "nose candy"],
    status: "restricted",
    label: "Prohibited",
    category: "Narcotic",
    summary:
      "Do not bring cocaine into Japan. Treat cocaine and cocaine-containing products as prohibited for individual travelers.",
    details: [
      "Cocaine is listed as a narcotic in Japan's Controlled Substances List.",
      "The NCD guidance says controlled narcotics require special legal treatment, and prohibited substances cannot be imported by individual travelers.",
      "Travelers should not rely on foreign prescriptions, recreational legality elsewhere, or product labeling for cocaine-related products.",
      "If you are unsure whether a product contains cocaine or a coca-derived controlled ingredient, do not travel with it until you have official confirmation.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "mdma",
    brands: ["MDMA"],
    aliases: ["ecstasy", "molly", "e", "x", "mandy"],
    status: "restricted",
    label: "Prohibited",
    category: "Narcotic",
    summary:
      "Do not bring MDMA into Japan. Treat MDMA and MDMA-containing products as prohibited for individual travelers.",
    details: [
      "MDMA appears in Japan's Controlled Substances List as a controlled narcotic substance.",
      "The NCD guidance says controlled substances require special legal treatment, and prohibited recreational drugs should be treated as not allowed for travelers.",
      "Travelers should not rely on foreign legality, festival labels, or informal product descriptions for MDMA-related products.",
      "If you are unsure whether a pill, powder, or capsule contains MDMA or another controlled stimulant-like substance, do not travel with it until you have official confirmation.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "heroin",
    brands: ["Heroin"],
    aliases: ["smack", "horse", "junk", "dope", "black tar"],
    status: "restricted",
    label: "Prohibited",
    category: "Narcotic",
    summary:
      "Do not bring heroin into Japan. Treat heroin and heroin-containing products as prohibited for individual travelers.",
    details: [
      "The NCD traveler guidance specifically lists heroin among substances that no individual traveler can import or export, even if prescribed elsewhere.",
      "Heroin is treated as a prohibited substance under Japan's controlled-substance rules.",
      "Travelers should not rely on foreign prescriptions, recreational legality elsewhere, or product labeling for heroin-related products.",
      "If you are unsure whether a product contains heroin or another prohibited opioid ingredient, do not travel with it until you have official confirmation.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "opium powder",
    brands: ["Opium Powder"],
    aliases: ["powdered opium"],
    status: "restricted",
    label: "Prohibited",
    category: "Opium",
    summary:
      "Do not bring opium powder into Japan. It is specifically listed by the NCD as prohibited for individual travelers.",
    details: [
      "The NCD traveler guidance specifically lists opium powder among substances that no individual traveler can import or export.",
      "Because it is specifically called out in the prohibited-substances section, travelers should treat it as not allowed.",
      "Do not rely on foreign prescriptions or product labels for opium-containing products.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "lisdexamfetamine",
    brands: ["Vyvanse", "Elvanse", "Venvanse", "Aduvanz", "Tyvense"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Stimulants' raw material",
    summary:
      "Legal only if you get advance permission before entering Japan. The NCD FAQ says Vyvanse may be brought in with prior permission.",
    details: [
      "Lisdexamfetamine is classified as a stimulant raw material in Japan.",
      "You must apply before travel and receive permission from the Japanese authorities.",
      "The NCD advises applying at least 14 days before travel.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "methylphenidate",
    brands: [
      "Ritalin",
      "Concerta",
      "Metadate",
      "Daytrana",
      "Quillivant XR",
      "QuilliChew ER",
      "Jornay PM",
      "Aptensio XR",
    ],
    aliases: [],
    status: "permission",
    label: "Psychotropic threshold applies",
    category: "Psychotropic",
    summary:
      "Usually legal to bring in for personal use. Up to 2.16 g total methylphenidate can be carried without narcotics permission; larger amounts need a doctor's certificate.",
    details: [
      "Methylphenidate appears in the psychotropics table with a 2.16 g threshold.",
      "The NCD says psychotropics at or below the listed amount do not need permission or a doctor's certificate, unless they are injectable.",
      "The NCD psychotropics guidance says that if the supply is more than 1 month, contact yakkan@mhlw.go.jp.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Psychotropics Quantity Table", url: SOURCES.psychotropics },
    ],
  },
  {
    generic: "dexmethylphenidate",
    brands: ["Focalin", "Focalin XR"],
    aliases: [],
    status: "permission",
    label: "Psychotropic threshold applies",
    category: "Psychotropic",
    summary:
      "Usually legal to bring in for personal use. The NCD's guidance groups dexmethylphenidate with methylphenidate under psychotropics.",
    details: [
      "The NCD psychotropics guidance names methylphenidate and dexmethylphenidate together as psychotropics that do not require permission at qualifying amounts.",
      "Use the methylphenidate psychotropic threshold as the closest official reference shown on the NCD page.",
      "If your quantity is high or the product is injectable, carry a doctor's certificate and confirm with MHLW before travel.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Psychotropics Quantity Table", url: SOURCES.psychotropics },
    ],
  },
  {
    generic: "alprazolam",
    brands: ["Xanax", "Xanax XR", "Niravam"],
    aliases: [],
    status: "permission",
    label: "Psychotropic threshold applies",
    category: "Psychotropic",
    summary:
      "Usually legal to bring in for personal use. Up to 72 mg total alprazolam can be carried without narcotics permission; above that, carry a doctor's certificate.",
    details: [
      "Alprazolam is listed as a psychotropic in Japan.",
      "The psychotropics quantity table sets the no-permission threshold at 72 mg total.",
      "The NCD psychotropics guidance says that if you bring more than 1 month supply, contact yakkan@mhlw.go.jp.",
    ],
    sources: [
      { label: "Controlled Substances List", url: SOURCES.controlledList },
      { label: "Psychotropics Quantity Table", url: SOURCES.psychotropics },
    ],
  },
  {
    generic: "clonazepam",
    brands: ["Klonopin"],
    aliases: [],
    status: "permission",
    label: "Psychotropic threshold applies",
    category: "Psychotropic",
    summary:
      "Usually legal to bring in for personal use. Up to 180 mg total clonazepam can be carried without narcotics permission; above that, carry a doctor's certificate.",
    details: [
      "Clonazepam is listed as a psychotropic in the controlled-substances list.",
      "The psychotropics table sets the no-permission threshold at 180 mg total.",
      "Quantities above the listed threshold or injection products require a doctor's certificate.",
    ],
    sources: [
      { label: "Controlled Substances List", url: SOURCES.controlledList },
      { label: "Psychotropics Quantity Table", url: SOURCES.psychotropics },
    ],
  },
  {
    generic: "diazepam",
    brands: ["Valium", "Diastat"],
    aliases: [],
    status: "permission",
    label: "Psychotropic threshold applies",
    category: "Psychotropic",
    summary:
      "Usually legal to bring in for personal use. Up to 1.2 g total diazepam can be carried without narcotics permission; above that, carry a doctor's certificate.",
    details: [
      "Diazepam is listed as a psychotropic in the controlled-substances list.",
      "The psychotropics table sets the no-permission threshold at 1.2 g total.",
      "Injectable products follow stricter documentation rules.",
    ],
    sources: [
      { label: "Controlled Substances List", url: SOURCES.controlledList },
      { label: "Psychotropics Quantity Table", url: SOURCES.psychotropics },
    ],
  },
  {
    generic: "lorazepam",
    brands: ["Ativan"],
    aliases: [],
    status: "permission",
    label: "Psychotropic threshold applies",
    category: "Psychotropic",
    summary:
      "Usually legal to bring in for personal use. Up to 90 mg total lorazepam can be carried without narcotics permission; above that, carry a doctor's certificate.",
    details: [
      "Lorazepam appears in Japan's controlled-substances list as a psychotropic.",
      "The psychotropics table sets the no-permission threshold at 90 mg total.",
      "If your supply exceeds 1 month, MHLW says to contact the import-confirmation office.",
    ],
    sources: [
      { label: "Controlled Substances List", url: SOURCES.controlledList },
      { label: "Psychotropics Quantity Table", url: SOURCES.psychotropics },
    ],
  },
  {
    generic: "zolpidem",
    brands: ["Ambien", "Ambien CR", "Edluar", "Intermezzo", "Zolpimist"],
    aliases: [],
    status: "permission",
    label: "Psychotropic threshold applies",
    category: "Psychotropic",
    summary:
      "Usually legal to bring in for personal use. Up to 300 mg total zolpidem can be carried without narcotics permission; above that, carry a doctor's certificate.",
    details: [
      "Zolpidem is listed in both the controlled-substances list and the psychotropics quantity table.",
      "The no-permission threshold shown in the psychotropics table is 300 mg total.",
      "If you are carrying an injection form or more than the listed amount, take a doctor's certificate.",
    ],
    sources: [
      { label: "Controlled Substances List", url: SOURCES.controlledList },
      { label: "Psychotropics Quantity Table", url: SOURCES.psychotropics },
    ],
  },
  {
    generic: "buprenorphine",
    brands: ["Suboxone", "Subutex", "Butrans", "Belbuca", "Sublocade", "Zubsolv", "Bunavail"],
    aliases: ["buprenorphine naloxone"],
    status: "permission",
    label: "Psychotropic threshold applies",
    category: "Psychotropic",
    summary:
      "Usually legal to bring in for personal use at qualifying amounts, but buprenorphine follows Japan's psychotropics rules rather than the narcotics permit rule.",
    details: [
      "The NCD guidance specifically lists buprenorphine as a psychotropic in the no-permission category reference.",
      "If the amount exceeds the psychotropics table limit or the product is injectable, carry a doctor's certificate and follow the NCD psychotropics guidance.",
      "The NCD psychotropics guidance says that if you bring more than 1 month supply, contact yakkan@mhlw.go.jp.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Psychotropics Quantity Table", url: SOURCES.psychotropics },
    ],
  },
  {
    generic: "pseudoephedrine",
    brands: ["Sudafed", "Claritin-D", "Allegra-D", "Zyrtec-D", "Mucinex D"],
    aliases: [],
    status: "permission",
    label: "Variation warning: some versions need advance permission",
    category: "Stimulants' raw material",
    summary:
      "Very important: decongestant versions that contain pseudoephedrine should be treated as needing advance confirmation before travel, while non-D or non-pseudoephedrine versions may be handled under the normal MHLW rules.",
    details: [
      "Sudafed, Claritin-D, Allegra-D, Zyrtec-D, and Mucinex D are here because those versions commonly contain pseudoephedrine.",
      "Plain Claritin, Allegra, Zyrtec, and standard Mucinex are different products and are usually allowed under the normal MHLW quantity rules.",
      "The controlled-substances list includes ephedrine and pseudoephedrine as stimulant raw materials, with an exclusion note for substances containing 10% or less.",
      "The NCD guidance names pseudoephedrine as a stimulant raw material reference example.",
      "Because U.S. cold medicines use different formulas, verify the exact ingredient list on your package before relying on a brand-name match.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "phenylephrine",
    brands: ["Sudafed PE"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed, but check the exact version",
    category: "General medicine",
    summary:
      "Usually legal to bring into Japan for personal use under the normal MHLW quantity rules, but this does not apply to pseudoephedrine versions sold under similar cold-medicine brand names.",
    details: [
      "For non-controlled medicines, MHLW generally allows up to 1 month of prescription drugs or up to 2 months of other drugs without Import Confirmation.",
      "Sudafed PE is different from pseudoephedrine-based Sudafed products, which should be treated as needing advance confirmation.",
      "If your product combines phenylephrine with another controlled ingredient, the stricter rule controls.",
      "Brand names are risky here because different cold-and-flu formulas can have different active ingredients.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "nyquil / dayquil multi-symptom formulas",
    brands: ["NyQuil", "NyQuil Severe", "DayQuil", "DayQuil Severe"],
    aliases: ["vicks nyquil", "vicks dayquil"],
    status: "allowed",
    label: "Usually allowed, but check the exact formula",
    category: "Combination OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules, but NyQuil and DayQuil products use different ingredient combinations, so the exact label matters.",
    details: [
      "Many standard NyQuil and DayQuil products use non-controlled ingredients such as acetaminophen, dextromethorphan, doxylamine, or phenylephrine.",
      "Severe, high blood pressure, and other special versions can have different active ingredients than the standard formula.",
      "If your package contains pseudoephedrine, codeine, or another controlled ingredient, the stricter rule controls.",
      "Bring the box or a photo of the ingredient panel if you want to double-check the exact product against the app's ingredient entries.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "codeine",
    brands: ["Tylenol with Codeine", "Tylenol 3", "Tylenol 4", "Robitussin AC"],
    aliases: [],
    status: "permission",
    label: "Variation warning: codeine versions need advance permission",
    category: "Narcotic",
    summary:
      "Very important: codeine versions need advance permission, but plain Tylenol and non-codeine cough products follow different rules. Do not rely on the brand name alone.",
    details: [
      "Tylenol with Codeine, Tylenol 3, Tylenol 4, and codeine cough syrups are different from plain acetaminophen products.",
      "The NCD names codeine as a narcotics example.",
      "The controlled-substances list says substances containing 1% or less of codeine or its salt are excluded.",
      "Many U.S. prescription codeine products exceed that exclusion, so travelers should treat them as narcotics unless the exact formulation shows otherwise.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "hydrocodone",
    brands: ["Vicodin", "Norco", "Lortab", "Hycet"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Hydrocodone is listed as a narcotic in Japan.",
    details: [
      "Hydrocodone appears in the Controlled Substances List as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "Apply at least 14 days before travel and carry the permit with the medicine at customs.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "morphine",
    brands: ["MS Contin", "Kadian", "Roxanol"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Morphine is a narcotic under Japan's controlled-substance rules.",
    details: [
      "Morphine is listed as a narcotic in the Controlled Substances List.",
      "The NCD guidance also names morphine as a narcotics example.",
      "Travelers must obtain permission in advance and carry the certificate at customs.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "fentanyl",
    brands: ["Duragesic", "Actiq", "Fentora"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Fentanyl is a narcotic under Japan's controlled-substance rules.",
    details: [
      "Fentanyl appears in the Controlled Substances List as a narcotic.",
      "The NCD guidance names fentanyl as a narcotics example.",
      "Travelers must apply before travel and receive permission before departure.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "oxycodone",
    brands: ["OxyContin", "Roxicodone", "Percocet"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Oxycodone is a narcotic in Japan.",
    details: [
      "Oxycodone appears in the Controlled Substances List as a narcotic.",
      "The NCD guidance names oxycodone as a narcotics example.",
      "Combination products such as Percocet still follow the oxycodone rule because the controlled ingredient sets the requirement.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "tapentadol",
    brands: ["Nucynta", "Nucynta ER"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Tapentadol is treated as a narcotic in Japan.",
    details: [
      "Tapentadol appears in the Controlled Substances List as a narcotic.",
      "The NCD guidance also names tapentadol as a narcotics example.",
      "Carry the permit and the medicine yourself when entering Japan.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "hydromorphone",
    brands: ["Dilaudid", "Exalgo"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Hydromorphone is listed as a narcotic in Japan.",
    details: [
      "Hydromorphone appears in the Controlled Substances List as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "Travelers should apply before travel and carry the permit with the medicine at customs.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "oxymorphone",
    brands: ["Opana", "Opana ER"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Oxymorphone is listed as a narcotic in Japan.",
    details: [
      "Oxymorphone appears in the Controlled Substances List as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "Even extended-release versions still follow the narcotics permit rule.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "methadone",
    brands: ["Dolophine", "Methadose"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Methadone is listed as a narcotic in Japan.",
    details: [
      "Methadone appears in the Controlled Substances List as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "Travelers should apply early and carry both the medicine and permit themselves at entry.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "meperidine",
    brands: ["Demerol", "Mepergan"],
    aliases: ["pethidine"],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Meperidine is treated as a narcotic in Japan.",
    details: [
      "The Controlled Substances List includes pethidine as a narcotic reference name.",
      "Meperidine and pethidine are names for the same controlled opioid medicine.",
      "Because it is a narcotic, travelers need advance permission before carrying it into Japan.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "sufentanil",
    brands: ["Sublimaze", "Dsuvia"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Sufentanil is listed as a narcotic in Japan.",
    details: [
      "The Controlled Substances List includes sufentanil as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "Because sufentanil products are highly controlled, travelers should confirm the exact product details and carry the permit with the medicine.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "alfentanil",
    brands: ["Alfenta"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Alfentanil is listed as a narcotic in Japan.",
    details: [
      "The Controlled Substances List includes alfentanil as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "Travelers should carry the medicine themselves and show the permit at customs.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "anileridine",
    brands: ["Leritine"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Anileridine is listed as a narcotic in Japan.",
    details: [
      "The Controlled Substances List includes anileridine as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "If you are traveling with an older or uncommon opioid, match the exact ingredient rather than relying on familiarity with the brand.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "bezitramide",
    brands: ["Burgodin"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Bezitramide is listed as a narcotic in Japan.",
    details: [
      "The Controlled Substances List includes bezitramide as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "Older or non-U.S. opioid products should be checked by exact ingredient and dosage form before travel.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "dihydrocodeine",
    brands: ["DHC Continus"],
    aliases: [],
    status: "permission",
    label: "Variation warning: some low-strength products may be excluded",
    category: "Narcotic",
    summary:
      "Usually treat dihydrocodeine products as requiring advance permission before entering Japan unless the exact formulation clearly falls under the exclusion shown in the controlled-substances list.",
    details: [
      "The Controlled Substances List includes dihydrocodeine as a narcotic, with an exclusion note for substances containing 1% or less of dihydrocodeine or its salt.",
      "Because formulation details matter, travelers should not rely on the product name alone.",
      "If the exact product does not clearly fit the exclusion, use the narcotics-permit approach before travel.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "diphenoxylate",
    brands: ["Lomotil", "Lonox"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Diphenoxylate is listed as a narcotic in Japan.",
    details: [
      "The Controlled Substances List includes diphenoxylate as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "Combination antidiarrheal products still follow the diphenoxylate rule when that controlled ingredient is present.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "dipipanone",
    brands: ["Diconal"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Dipipanone is listed as a narcotic in Japan.",
    details: [
      "The Controlled Substances List includes dipipanone as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "Travelers should verify the exact ingredient list for combination opioid products before relying on a brand-name match.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "furanylfentanyl",
    brands: [],
    aliases: ["furan fentanyl"],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Treat furanylfentanyl as a narcotic requiring advance permission before entering Japan.",
    details: [
      "The Controlled Substances List includes furanylfentanyl as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "Because fentanyl analogs are high-risk and easy to misidentify, travelers should not carry them without exact documentation and prior approval.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "hydromorphinol",
    brands: [],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Hydromorphinol is listed as a narcotic in Japan.",
    details: [
      "The Controlled Substances List includes hydromorphinol as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "For uncommon opioid derivatives, use the exact ingredient name and carry supporting medical documentation.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "isomethadone",
    brands: [],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Isomethadone is listed as a narcotic in Japan.",
    details: [
      "The Controlled Substances List includes isomethadone as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "Methadone-related opioids should be checked by exact ingredient name because similar names can have different Japan treatment.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  {
    generic: "ketobemidone",
    brands: ["Ketogan"],
    aliases: [],
    status: "permission",
    label: "Advance permission required",
    category: "Narcotic",
    summary:
      "Legal only with advance permission before entering Japan. Ketobemidone is listed as a narcotic in Japan.",
    details: [
      "The Controlled Substances List includes ketobemidone as a narcotic.",
      "The NCD says narcotics require advance permission before you enter Japan.",
      "This is another example of an uncommon opioid where the exact ingredient matters more than brand familiarity.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "Controlled Substances List", url: SOURCES.controlledList },
    ],
  },
  createNarcoticPermissionEntry({
    generic: "acethylmethadol",
    aliases: ["acetylmethadol"],
  }),
  createNarcoticPermissionEntry({
    generic: "acetorphine",
  }),
  createNarcoticPermissionEntry({
    generic: "acetylfentanyl",
  }),
  createNarcoticPermissionEntry({
    generic: "acrylfentanyl",
    aliases: ["acryloylfentanyl"],
  }),
  createNarcoticPermissionEntry({
    generic: "ah-7921",
  }),
  createNarcoticPermissionEntry({
    generic: "allylprodine",
  }),
  createNarcoticPermissionEntry({
    generic: "benzethidine",
  }),
  createNarcoticPermissionEntry({
    generic: "brorphine",
  }),
  createNarcoticPermissionEntry({
    generic: "butonitazene",
  }),
  createNarcoticPermissionEntry({
    generic: "butyrylfentanyl",
    aliases: ["butyrlfentanyl"],
  }),
  createNarcoticPermissionEntry({
    generic: "carfentanil",
    aliases: ["carfentanyl", "4-carbomethoxyfentanyl"],
  }),
  createNarcoticPermissionEntry({
    generic: "clonitazene",
  }),
  {
    generic: "tramadol",
    brands: ["Ultram", "ConZip", "Qdolo"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General prescription medicine",
    summary:
      "Usually legal to bring into Japan under the general MHLW quantity rules. The NCD guidance specifically notes that tramadol is not a narcotic.",
    details: [
      "The NCD narcotics guidance says tramadol is not a narcotic.",
      "That means the usual MHLW personal-use quantity rules apply unless another controlled ingredient is present.",
      "Prescription quantities above 1 month typically require Import Confirmation from MHLW.",
    ],
    sources: [
      { label: "NCD Application Guidance", url: SOURCES.ncd },
      { label: "MHLW Personal Use Guidance", url: SOURCES.mhlw },
    ],
  },
  {
    generic: "insulin",
    brands: ["Humalog", "Novolog", "Lantus", "Levemir", "Tresiba", "Apidra"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable medicine",
    summary:
      "Usually legal to bring into Japan for personal use. MHLW allows up to 1 month supply of injectable drugs and their self-injection kits without Import Confirmation.",
    details: [
      "Injectable drugs and self-injection kits are covered by a special MHLW quantity rule.",
      "For more than 1 month supply, apply for Import Confirmation before you travel.",
      "Carry the insulin in its original labeled packaging when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "semaglutide",
    brands: ["Ozempic", "Wegovy", "Rybelsus"],
    aliases: ["glp-1"],
    status: "allowed",
    label: "Usually allowed",
    category: "General or injectable medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Injection forms generally follow MHLW's 1 month injectable limit, while oral forms follow the usual drug limits.",
    details: [
      "Ozempic and Wegovy are injections, so the 1 month injectable rule is the safer default.",
      "Rybelsus is an oral medicine, so the usual prescription-drug quantity rule applies.",
      "If you plan to bring more than the exempt amount, apply for Import Confirmation before travel.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "tirzepatide",
    brands: ["Mounjaro", "Zepbound"],
    aliases: ["glp-1 gip"],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Tirzepatide injections generally follow MHLW's 1 month injectable limit.",
    details: [
      "Mounjaro and Zepbound are injection products, so the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Carry the product in original labeled packaging when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "liraglutide",
    brands: ["Victoza", "Saxenda"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Liraglutide injections generally follow MHLW's 1 month injectable limit.",
    details: [
      "Victoza and Saxenda are injection products, so the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep pens and original packaging together when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "dulaglutide",
    brands: ["Trulicity"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Dulaglutide injections generally follow MHLW's 1 month injectable limit.",
    details: [
      "Trulicity is an injection product, so the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Carry the product in original labeled packaging when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "exenatide",
    brands: ["Byetta", "Bydureon BCise"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Exenatide injections generally follow MHLW's 1 month injectable limit.",
    details: [
      "Byetta and Bydureon BCise are injection products, so the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Check the exact device and keep it in original packaging when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "risankizumab",
    brands: ["Skyrizi"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Risankizumab injections generally follow MHLW's 1 month injectable limit.",
    details: [
      "Skyrizi is an injection product, so the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep pens, syringes, and original labeled packaging together when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "adalimumab",
    brands: ["Humira", "Amjevita", "Hadlima", "Hyrimoz"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Adalimumab injections generally follow MHLW's 1 month injectable limit.",
    details: [
      "Adalimumab products are injection medicines, so the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep the exact labeled packaging because biosimilar versions may have different brand names.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "ustekinumab",
    brands: ["Stelara"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Ustekinumab injections generally follow MHLW's 1 month injectable limit.",
    details: [
      "Stelara is an injection product, so the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep syringes or infusion documentation with the original labeled packaging when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "secukinumab",
    brands: ["Cosentyx"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Secukinumab injections generally follow MHLW's 1 month injectable limit.",
    details: [
      "Cosentyx is an injection product, so the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep pens or syringes in the original labeled box when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "guselkumab",
    brands: ["Tremfya"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Guselkumab injections generally follow MHLW's 1 month injectable limit.",
    details: [
      "Tremfya is an injection product, so the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep the exact device and original labeled packaging together when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "ixekizumab",
    brands: ["Taltz"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Ixekizumab injections generally follow MHLW's 1 month injectable limit.",
    details: [
      "Taltz is an injection product, so the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep autoinjectors or syringes in original labeled packaging when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "etonogestrel / ethinyl estradiol vaginal ring",
    brands: ["NuvaRing", "EluRyng"],
    aliases: ["nuvaring", "eluryng", "etonogestrel ring", "birth control ring", "contraceptive ring"],
    status: "allowed",
    label: "Usually allowed",
    category: "Hormonal contraceptive ring",
    summary:
      "Usually legal to bring into Japan for personal use. Vaginal ring contraceptives are usually handled under the normal MHLW personal-use rules for non-controlled medicines.",
    details: [
      "NuvaRing and similar products are not listed in the controlled-substances sources used in this app.",
      "Keep the exact labeled packaging because hormonal ring products are device-like medicines and the product type matters.",
      "If you plan to bring more than 1 month supply, apply for Import Confirmation before travel.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "medroxyprogesterone acetate birth control injection",
    brands: ["Depo-Provera", "Depo-SubQ Provera 104"],
    aliases: ["depo provera", "depo-subq provera 104", "depo shot", "birth control shot", "contraceptive injection"],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable contraceptive",
    summary:
      "Usually legal to bring into Japan for personal use. Injectable contraceptives generally follow MHLW's 1 month injectable-drug limit.",
    details: [
      "Depo-Provera is not listed in the controlled-substances sources used in this app.",
      "Because it is an injectable medicine, the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep the original labeled carton or pharmacy documentation with the syringe or vial when possible.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "levonorgestrel intrauterine device",
    brands: ["Mirena", "Kyleena", "Skyla", "Liletta"],
    aliases: ["mirena", "kyleena", "skyla", "liletta", "hormonal iud", "levonorgestrel iud"],
    status: "allowed",
    label: "Usually allowed",
    category: "Hormonal contraceptive device",
    summary:
      "Usually legal to bring into Japan for personal use. Hormonal IUD products are generally handled as non-controlled prescription contraceptive devices when kept in their original labeled packaging.",
    details: [
      "Levonorgestrel IUD brands are not listed in the controlled-substances sources used in this app.",
      "Keep the device sealed in its original labeled package so it is clear this is a prescription contraceptive device, not loose medical equipment.",
      "If you plan to bring more than 1 device or unusual quantities, check with MHLW before travel.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "estradiol patch",
    brands: ["Climara", "Vivelle-Dot", "Dotti", "Minivelle", "Alora"],
    aliases: ["transdermal estradiol", "estradiol transdermal system", "hormone patch"],
    status: "allowed",
    label: "Usually allowed",
    category: "Hormone therapy patch",
    summary:
      "Usually legal to bring into Japan for personal use. Estradiol patches generally follow the MHLW external-use rule.",
    details: [
      "Estradiol patches are not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Keep the patches in their original labeled pouches or carton when possible.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "vaginal estradiol",
    brands: ["Vagifem", "Yuvafem", "Imvexxy", "Estrace Vaginal Cream", "Estring"],
    aliases: ["estradiol vaginal tablet", "estradiol vaginal cream", "estradiol vaginal ring"],
    status: "allowed",
    label: "Usually allowed",
    category: "Hormone therapy medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Vaginal estrogen products are generally handled under the normal MHLW quantity rules for non-controlled medicines.",
    details: [
      "Vaginal estradiol products are not listed in the controlled-substances sources used in this app.",
      "The exact form matters because creams, tablets, and rings may be packaged differently.",
      "Keep the product in original labeled packaging so the dosage form is clear at customs.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "testosterone gel",
    brands: ["AndroGel", "Testim", "Fortesta", "Vogelxo"],
    aliases: ["topical testosterone", "transdermal testosterone gel"],
    status: "allowed",
    label: "Usually allowed",
    category: "Hormone therapy medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical testosterone products generally follow the MHLW external-use rule.",
    details: [
      "Testosterone gel is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Keep pumps or packets in the original labeled box when possible.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "testosterone injection",
    brands: ["Depo-Testosterone", "Xyosted", "Aveed", "Delatestryl"],
    aliases: ["testosterone cypionate", "testosterone enanthate", "testosterone undecanoate"],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable hormone therapy medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Testosterone injections generally follow MHLW's 1 month injectable-drug limit.",
    details: [
      "Testosterone injections are not listed in the controlled-substances sources used in this app.",
      "Because it is an injectable medicine, the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep vials, syringes, or autoinjectors in original labeled packaging when possible.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "gonadotropin fertility injection",
    brands: ["Gonal-f", "Follistim AQ", "Menopur", "Ovidrel", "Pregnyl"],
    aliases: ["fsh injection", "hcg trigger shot", "fertility shot", "ovulation trigger injection"],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable fertility medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Fertility injections generally follow MHLW's 1 month injectable-drug limit.",
    details: [
      "Common gonadotropin fertility injections are not listed in the controlled-substances sources used in this app.",
      "Because these are injectable medicines, the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep pens, vials, diluent, and pharmacy labels together when possible.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "enoxaparin",
    brands: ["Lovenox"],
    aliases: ["enoxaparin sodium"],
    status: "allowed",
    label: "Usually allowed",
    category: "Pregnancy and blood thinner medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Enoxaparin injections generally follow MHLW's 1 month injectable-drug limit.",
    details: [
      "Enoxaparin is not listed in the controlled-substances sources used in this app.",
      "Because it is an injectable medicine, the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep syringes and pharmacy documentation in original labeled packaging when possible.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "filgrastim",
    brands: ["Neupogen", "Nivestym", "Zarxio", "Releuko"],
    aliases: ["g-csf injection"],
    status: "allowed",
    label: "Usually allowed",
    category: "Cancer supportive-care injection",
    summary:
      "Usually legal to bring into Japan for personal use. Filgrastim injections generally follow MHLW's 1 month injectable-drug limit.",
    details: [
      "Filgrastim is not listed in the controlled-substances sources used in this app.",
      "Because it is an injectable medicine, the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep syringes or injection devices in original labeled packaging when possible.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "pegfilgrastim",
    brands: ["Neulasta", "Fylnetra", "Fulphila", "Nyvepria", "Udenyca"],
    aliases: ["long-acting g-csf injection"],
    status: "allowed",
    label: "Usually allowed",
    category: "Cancer supportive-care injection",
    summary:
      "Usually legal to bring into Japan for personal use. Pegfilgrastim injections generally follow MHLW's 1 month injectable-drug limit.",
    details: [
      "Pegfilgrastim is not listed in the controlled-substances sources used in this app.",
      "Because it is an injectable medicine, the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep on-body injector or syringe packaging together with the pharmacy label when possible.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "vaginal progesterone",
    brands: ["Endometrin", "Crinone"],
    aliases: ["progesterone vaginal insert", "progesterone vaginal gel"],
    status: "allowed",
    label: "Usually allowed",
    category: "Pregnancy and fertility medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Vaginal progesterone products are generally handled under the normal MHLW quantity rules for non-controlled medicines.",
    details: [
      "Vaginal progesterone is not listed in the controlled-substances sources used in this app.",
      "Keep the exact labeled packaging because progesterone also comes in oral capsules and other forms.",
      "If you plan to bring more than 1 month supply, apply for Import Confirmation before travel.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "cabotegravir",
    brands: ["Apretude", "Vocabria"],
    aliases: ["apretude", "vocabria", "long-acting prep"],
    status: "allowed",
    label: "Usually allowed",
    category: "HIV prevention and treatment medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Oral cabotegravir generally follows the normal prescription-drug rule, while long-acting injection products are safer to treat under MHLW's 1 month injectable limit.",
    details: [
      "Cabotegravir is not listed in the controlled-substances sources used in this app.",
      "Oral products are usually handled under the standard MHLW personal-use rules for prescription drugs.",
      "Long-acting injection products are safer to treat under the 1 month injectable rule.",
      "Keep the exact labeled packaging because oral and injection forms are used differently.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "naloxone",
    brands: ["Narcan", "Kloxxado"],
    aliases: ["naloxone nasal spray"],
    status: "allowed",
    label: "Usually allowed",
    category: "Overdose reversal medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Naloxone rescue products are generally handled under the normal MHLW quantity rules for non-controlled medicines.",
    details: [
      "Naloxone is not listed in the controlled-substances sources used in this app.",
      "Keep the exact labeled packaging because nasal-spray rescue products can look like ordinary sprays.",
      "If you are carrying multiple units or combination treatment supplies, keep the pharmacy label with them.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "estradiol valerate injection",
    brands: ["Delestrogen"],
    aliases: ["depo-estradiol", "estradiol valerate", "estradiol injection"],
    status: "allowed",
    label: "Usually allowed",
    category: "Injectable hormone therapy medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Estradiol injections generally follow MHLW's 1 month injectable-drug limit.",
    details: [
      "Estradiol valerate injection is not listed in the controlled-substances sources used in this app.",
      "Because it is an injectable medicine, the 1 month injectable rule is the safer default.",
      "For more than 1 month supply of injectable medicine, apply for Import Confirmation before travel.",
      "Keep vials, syringes, or pharmacy documentation in original labeled packaging when possible.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "methotrexate",
    brands: ["Trexall", "Rasuvo", "Otrexup", "Xatmep"],
    aliases: ["methotrexate injection", "methotrexate tablets"],
    status: "allowed",
    label: "Usually allowed",
    category: "Autoimmune and cancer medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Oral methotrexate generally follows the normal prescription-drug rule, while self-injection products are safer to treat under MHLW's 1 month injectable limit.",
    details: [
      "Methotrexate is not listed in the controlled-substances sources used in this app.",
      "Tablets are usually handled under the standard MHLW personal-use rules for prescription drugs.",
      "Self-injection products are safer to treat under the 1 month injectable rule.",
      "Keep the exact labeled packaging because methotrexate comes in several forms and strengths.",
    ],
    sources: MHLW_SOURCES,
  },
  ...STANDARD_PRESCRIPTION_LOOKUPS.map(createStandardPrescriptionEntry),
  {
    generic: "multivitamin",
    brands: ["Centrum", "One A Day", "Nature Made Multi"],
    aliases: ["daily multivitamin"],
    status: "allowed",
    label: "Usually allowed, but check the exact formula",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use, but multivitamin formulas vary and should not contain a separate controlled ingredient.",
    details: [
      "Multivitamins are not listed in the controlled-substances sources used in this app.",
      "Different formulas can add herbal blends, caffeine, or other specialty ingredients, so check the exact label.",
      "Keep supplements in original packaging so the ingredient list is easy to show if needed.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "vitamin c",
    brands: ["Emergen-C", "Airborne", "Nature Made Vitamin C"],
    aliases: ["ascorbic acid"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Vitamin C is not listed in the controlled-substances sources used in this app.",
      "Check combination immune-support products carefully because they can add multiple extra ingredients.",
      "Original packaging helps show the formula and intended use.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "vitamin d3",
    brands: ["Nature Made Vitamin D3", "Vitafusion Vitamin D3"],
    aliases: ["cholecalciferol"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Vitamin D3 is not listed in the controlled-substances sources used in this app.",
      "Some bone-health formulas add calcium, magnesium, or vitamin K, so match the exact product if searching by brand.",
      "Keep supplements in their labeled container when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "vitamin b12",
    brands: ["Nature Made Vitamin B12", "Spring Valley Vitamin B12"],
    aliases: ["cobalamin", "methylcobalamin"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Vitamin B12 is not listed in the controlled-substances sources used in this app.",
      "Lozenges, gummies, and tablets are usually straightforward, but specialty formulas can add other ingredients.",
      "Use the exact label if the product includes multiple B vitamins or stimulatory additives.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "vitamin b complex",
    brands: ["Nature Made Super B-Complex", "Nature's Bounty B-Complex"],
    aliases: ["b-complex"],
    status: "allowed",
    label: "Usually allowed, but check the exact formula",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use, but B-complex products can vary by formula.",
    details: [
      "Vitamin B-complex products are not listed in the controlled-substances sources used in this app.",
      "Some products add herbs, caffeine, or metabolic blends beyond standard vitamins.",
      "Match the exact ingredient list if you are relying on a brand-name search.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "calcium",
    brands: ["Caltrate", "Citracal"],
    aliases: ["calcium carbonate supplement", "calcium citrate"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Calcium supplements are not listed in the controlled-substances sources used in this app.",
      "Bone-health products often add vitamin D, magnesium, or zinc, so check the exact formulation.",
      "Keep the labeled bottle or box when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "magnesium glycinate",
    brands: ["Nature Made Magnesium Glycinate", "Doctor's Best Magnesium Glycinate"],
    aliases: ["magnesium supplement"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Magnesium supplements are not listed in the controlled-substances sources used in this app.",
      "Different magnesium forms are sold for different purposes, so the exact ingredient name can help avoid confusion.",
      "Combination sleep or stress formulas may add melatonin or herbs, so check the full label.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "zinc",
    brands: ["Nature Made Zinc", "Zicam Zinc"],
    aliases: ["zinc supplement"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Zinc is not listed in the controlled-substances sources used in this app.",
      "Immune-support products can add vitamin C, herbs, or other actives, so check the exact formula.",
      "Lozenges and tablets are easier to explain when they remain in original packaging.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "iron",
    brands: ["Slow Fe", "Nature Made Iron"],
    aliases: ["ferrous sulfate", "ferrous bisglycinate"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Iron supplements are not listed in the controlled-substances sources used in this app.",
      "Check whether the product is a plain iron supplement or part of a prenatal or multivitamin formula.",
      "Keep the dosage information visible on the package if possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "omega-3 / fish oil",
    brands: ["Nature Made Fish Oil", "Nordic Naturals Omega-3", "Kirkland Fish Oil"],
    aliases: ["fish oil", "omega 3", "dha", "epa"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Fish oil and omega-3 supplements are not listed in the controlled-substances sources used in this app.",
      "Formulas vary by EPA and DHA content, but that does not usually change the controlled-substance risk.",
      "Keep softgels or liquid products in their original packaging.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "probiotic",
    brands: ["Culturelle", "Align", "Florastor"],
    aliases: ["probiotics", "acidophilus"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Probiotic supplements are not listed in the controlled-substances sources used in this app.",
      "Strain blends vary a lot, but that does not usually create a controlled-substance issue.",
      "Heat-sensitive or specialty formulations are best kept in their original packaging.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "melatonin",
    brands: ["Natrol Melatonin", "OLLY Sleep", "Nature Made Melatonin"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed, but check the exact formula",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use, but some sleep supplements add other active ingredients.",
    details: [
      "Melatonin is not listed in the controlled-substances sources used in this app.",
      "Sleep formulas can combine melatonin with magnesium, L-theanine, botanicals, or antihistamines, so check the full ingredient list.",
      "Brand-name sleep gummies are especially likely to vary by formula.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "collagen peptides",
    brands: ["Vital Proteins Collagen Peptides", "NeoCell Collagen"],
    aliases: ["collagen"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Collagen supplements are not listed in the controlled-substances sources used in this app.",
      "Powders and gummies can include vitamins or beauty-support blends, so the exact label still matters.",
      "Large tubs are easiest to explain when they stay in original packaging.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "creatine monohydrate",
    brands: ["Optimum Nutrition Creatine", "MuscleTech Platinum Creatine"],
    aliases: ["creatine"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Creatine is not listed in the controlled-substances sources used in this app.",
      "Pre-workout or performance formulas can add caffeine or many other ingredients, so a plain creatine product is easier to match.",
      "Original packaging helps clarify that the product is a sports supplement.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "turmeric / curcumin",
    brands: ["Nature Made Turmeric", "Qunol Turmeric"],
    aliases: ["curcumin", "turmeric supplement"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Turmeric and curcumin supplements are not listed in the controlled-substances sources used in this app.",
      "Joint and inflammation blends may combine turmeric with black pepper extract or other botanicals.",
      "If the product is part of a multi-ingredient wellness blend, check the full label.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "coenzyme q10",
    brands: ["Qunol CoQ10", "Nature Made CoQ10"],
    aliases: ["coq10", "ubiquinone", "ubiquinol"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "CoQ10 supplements are not listed in the controlled-substances sources used in this app.",
      "Heart-health formulas can vary in strength and supporting ingredients, but that does not usually change the controlled-substance risk.",
      "Keep softgels in their labeled package when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "elderberry",
    brands: ["Sambucol", "Nature's Way Elderberry"],
    aliases: ["elderberry supplement"],
    status: "allowed",
    label: "Usually allowed, but check the exact formula",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use, but immune-support blends can vary a lot by formula.",
    details: [
      "Elderberry supplements are not listed in the controlled-substances sources used in this app.",
      "Many elderberry products also add vitamin C, zinc, echinacea, or other ingredients.",
      "Check the exact label if you are relying on a brand-name search.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "glucosamine / chondroitin",
    brands: ["Osteo Bi-Flex", "Move Free"],
    aliases: ["glucosamine", "chondroitin"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Glucosamine and chondroitin supplements are not listed in the controlled-substances sources used in this app.",
      "Joint-support products can add MSM, turmeric, or collagen, so match the exact formulation.",
      "Original packaging helps show the ingredient list clearly.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "biotin",
    brands: ["Nature's Bounty Biotin", "Natrol Biotin"],
    aliases: ["vitamin b7"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Biotin is not listed in the controlled-substances sources used in this app.",
      "Hair, skin, and nails products can include many extra ingredients beyond biotin.",
      "Check the exact formula if the product is sold as a beauty blend rather than plain biotin.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "folic acid",
    brands: ["Nature Made Folic Acid", "Spring Valley Folic Acid"],
    aliases: ["vitamin b9", "folate"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Folic acid supplements are not listed in the controlled-substances sources used in this app.",
      "Many folate products are part of prenatal or B-complex formulas, so check the full label.",
      "Original packaging helps identify the exact vitamin and strength.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "prenatal multivitamin",
    brands: ["Nature Made Prenatal", "One A Day Prenatal", "SmartyPants Prenatal"],
    aliases: ["prenatal vitamin"],
    status: "allowed",
    label: "Usually allowed, but check the exact formula",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use, but prenatal formulas vary and can contain many active ingredients.",
    details: [
      "Prenatal vitamins are not listed in the controlled-substances sources used in this app.",
      "Formulas commonly include iron, folate, DHA, and other nutrients, so the exact label matters.",
      "Keep the original package if possible because prenatal products are often multi-ingredient blends.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "electrolyte powder",
    brands: ["Liquid I.V.", "Pedialyte Powder", "LMNT", "Nuun"],
    aliases: ["electrolytes", "hydration powder", "nuun hydration", "lmnt electrolytes"],
    status: "allowed",
    label: "Usually allowed, but check the exact formula",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use, but hydration products can vary by ingredients and purpose.",
    details: [
      "Electrolyte powders are not listed in the controlled-substances sources used in this app.",
      "Sports and hydration mixes can include caffeine, vitamins, amino acids, or herbal additives.",
      "Single-serve packets are easier to explain when they remain in the original box or wrapper.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "protein powder",
    brands: ["Optimum Nutrition Gold Standard Whey", "Premier Protein Powder"],
    aliases: ["whey protein", "protein supplement"],
    status: "allowed",
    label: "Usually allowed, but check the exact formula",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use, but protein formulas vary widely.",
    details: [
      "Protein powders are not listed in the controlled-substances sources used in this app.",
      "Pre-workout, mass-gainer, or stimulant-containing formulas are different from plain protein products.",
      "Keep large tubs sealed and labeled when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "ashwagandha",
    brands: ["Goli Ashwagandha", "Nature's Bounty Ashwagandha"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed, but check the exact formula",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use, but herbal formulas should be checked by exact label.",
    details: [
      "Ashwagandha is not listed in the controlled-substances sources used in this app.",
      "Stress and mood blends often combine it with other botanicals, melatonin, or magnesium.",
      "Use the exact ingredient list instead of relying only on the front-of-package claim.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "berberine",
    brands: ["Nature's Truth Berberine", "Solaray Berberine"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed, but check the exact formula",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use, but specialty metabolic-health formulas should be checked carefully.",
    details: [
      "Berberine is not listed in the controlled-substances sources used in this app.",
      "Products marketed for metabolic or glucose support can include several additional herbal ingredients.",
      "Keep the original label if you are bringing a concentrated or multi-ingredient formula.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "cranberry",
    brands: ["AZO Cranberry", "Nature's Bounty Cranberry"],
    aliases: ["cranberry supplement"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Cranberry supplements are not listed in the controlled-substances sources used in this app.",
      "Urinary-support blends can add probiotics, vitamin C, or other ingredients, so check the exact formula.",
      "Original packaging helps show that the product is a supplement rather than a medicine.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "lutein",
    brands: ["Ocuvite", "PreserVision AREDS 2", "Nature Made Lutein"],
    aliases: ["eye health supplement"],
    status: "allowed",
    label: "Usually allowed, but check the exact formula",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use, but eye-health products often come as complex blends.",
    details: [
      "Lutein is not listed in the controlled-substances sources used in this app.",
      "Eye-health formulas often add zeaxanthin, vitamins, minerals, and AREDS-type combinations.",
      "Use the exact label if you are matching a brand-name product.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "l-lysine",
    brands: ["Nature Made L-Lysine", "Nature's Bounty L-Lysine"],
    aliases: ["lysine"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "L-lysine is not listed in the controlled-substances sources used in this app.",
      "Simple amino-acid supplements are usually straightforward, but some wellness formulas add many other ingredients.",
      "Keep supplements in labeled packaging when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "potassium",
    brands: ["Nature Made Potassium", "Spring Valley Potassium"],
    aliases: ["potassium supplement"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Potassium supplements are not listed in the controlled-substances sources used in this app.",
      "Electrolyte blends may combine potassium with sodium, magnesium, and other ingredients.",
      "Use the exact label if the product is part of a hydration or sports formula.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "vitamin k2",
    brands: ["Sports Research Vitamin K2", "NOW Vitamin K-2"],
    aliases: ["menaquinone"],
    status: "allowed",
    label: "Usually allowed",
    category: "Dietary supplement",
    summary:
      "Usually legal to bring into Japan for personal use.",
    details: [
      "Vitamin K2 is not listed in the controlled-substances sources used in this app.",
      "Bone-support products often combine vitamin K2 with vitamin D3, calcium, or magnesium.",
      "Check the full label if the supplement is sold as a multi-ingredient formula.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "acetaminophen",
    brands: ["Tylenol"],
    aliases: ["paracetamol"],
    status: "allowed",
    label: "Usually allowed, but check the exact version",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules, but this does not apply to Tylenol products that include codeine or another controlled ingredient.",
    details: [
      "For ordinary non-controlled medicines, MHLW generally allows up to 2 months supply without Import Confirmation.",
      "If the product is a prescription version or combines acetaminophen with a controlled drug such as codeine or hydrocodone, the stricter rule applies.",
      "Plain Tylenol is not the same as Tylenol with Codeine or other combination pain products.",
      "Original packaging helps show the ingredient and quantity at customs.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "ibuprofen",
    brands: ["Advil", "Motrin"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Ibuprofen is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "External-use ibuprofen products would follow the separate external-use item rule.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "naproxen",
    brands: ["Aleve"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Naproxen is treated like an ordinary non-controlled medicine in this lookup.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Check the exact product if it is part of a combination formula.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "diphenhydramine",
    brands: ["Benadryl", "Unisom SleepGels"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Diphenhydramine is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Some sleep aids or combination allergy products use different active ingredients, so check the label.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "cetirizine",
    brands: ["Zyrtec"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed, but check the exact version",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules, but this does not apply to Zyrtec-D or other pseudoephedrine versions.",
    details: [
      "Cetirizine is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Zyrtec-D is a different product and may need advance confirmation because it can contain pseudoephedrine.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "loratadine",
    brands: ["Claritin"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed, but check the exact version",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules, but this does not apply to Claritin-D or other pseudoephedrine versions.",
    details: [
      "Loratadine is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Claritin-D is a different product and may need advance confirmation because it can contain pseudoephedrine.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "fexofenadine",
    brands: ["Allegra"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed, but check the exact version",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules, but this does not apply to Allegra-D or other pseudoephedrine versions.",
    details: [
      "Fexofenadine is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Allegra-D is a different product and may need advance confirmation because it can contain pseudoephedrine.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "guaifenesin",
    brands: ["Mucinex"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed, but check the exact version",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules, but this does not apply to Mucinex D or other pseudoephedrine versions.",
    details: [
      "Guaifenesin is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Mucinex D is a different product and may need advance confirmation because it can contain pseudoephedrine.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "dextromethorphan",
    brands: ["Delsym", "Robitussin DM"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Dextromethorphan is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Verify the full formula because many cough products add other ingredients.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "bismuth subsalicylate",
    brands: ["Pepto-Bismol", "Kaopectate"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Bismuth subsalicylate is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Check the exact label if the product is part of a travel-combo pack with other active ingredients.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "calcium carbonate",
    brands: ["Tums", "Rolaids"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Calcium carbonate is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Some antacid products combine more than one ingredient, so check the label if you are matching a brand name.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "famotidine",
    brands: ["Pepcid", "Pepcid AC"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Famotidine is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Pepcid-branded products can vary by market, so match the exact active ingredient if unsure.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "omeprazole",
    brands: ["Prilosec OTC"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Omeprazole is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Prescription-strength omeprazole still usually follows the ordinary prescription-drug rule unless combined with a controlled ingredient.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "esomeprazole",
    brands: ["Nexium 24HR"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Esomeprazole is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Check the exact label if you are using a combination acid-relief product.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "polyethylene glycol 3350",
    brands: ["MiraLAX"],
    aliases: ["peg 3350"],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Polyethylene glycol 3350 is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Bulk powder containers are still easier to explain at customs if they remain in original packaging.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "bisacodyl",
    brands: ["Dulcolax"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Bisacodyl is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Check the exact product because some constipation products combine multiple ingredients.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "sennosides",
    brands: ["Senokot", "Senna"],
    aliases: ["senna glycosides"],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Sennosides are not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Some senna products include stool softeners or additional ingredients, so match the exact label.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "simethicone",
    brands: ["Gas-X", "Phazyme"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Simethicone is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Combination digestive products can use different ingredient mixes, so check the package if unsure.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "meclizine",
    brands: ["Bonine", "Dramamine Less Drowsy"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Meclizine is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Brand naming is especially confusing for motion-sickness products, so the active ingredient matters.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "dimenhydrinate",
    brands: ["Dramamine"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Dimenhydrinate is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Make sure you distinguish standard Dramamine from meclizine-based versions.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "lactase",
    brands: ["Lactaid"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Lactase is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Digestive enzyme products can vary, so confirm the active ingredient if you use another brand.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "loperamide",
    brands: ["Imodium", "Imodium A-D"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Loperamide is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Check the exact product label if it is a combination formula or a prescription-strength version.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "aspirin",
    brands: ["Bayer", "Ecotrin", "St. Joseph"],
    aliases: ["acetylsalicylic acid"],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Aspirin is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Low-dose and pain-relief versions are both usually handled under the normal OTC rule unless combined with another controlled ingredient.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "aspirin / acetaminophen / caffeine",
    brands: ["Excedrin", "Goody's Extra Strength"],
    aliases: ["headache relief formula"],
    status: "allowed",
    label: "Usually allowed, but check the exact formula",
    category: "Combination OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules, but combination headache products should be checked by exact label.",
    details: [
      "This common combination is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Brand extensions can use different ingredient mixes, so match the exact box if you are relying on a brand-name search.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "doxylamine succinate",
    brands: ["Unisom SleepTabs"],
    aliases: ["doxylamine"],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Doxylamine is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Nighttime cold medicines can also contain doxylamine, but those combination products should still be checked by full formula.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "chlorpheniramine",
    brands: ["Chlor-Trimeton"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Chlorpheniramine is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Some multi-symptom allergy or cold products pair chlorpheniramine with decongestants, so the exact label still matters.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "levocetirizine",
    brands: ["Xyzal"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Levocetirizine is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Use the active ingredient when possible because allergy brands can have several different formulations.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "fluticasone propionate",
    brands: ["Flonase Allergy Relief"],
    aliases: ["flonase"],
    status: "allowed",
    label: "Usually allowed",
    category: "Nasal OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Fluticasone propionate is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Check the exact box because Flonase-branded products can use different steroid ingredients in different versions.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "triamcinolone acetonide",
    brands: ["Nasacort Allergy 24HR"],
    aliases: ["nasacort"],
    status: "allowed",
    label: "Usually allowed",
    category: "Nasal OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Triamcinolone acetonide is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "This entry covers the common nasal allergy spray, not unrelated prescription steroid products.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "oxymetazoline",
    brands: ["Afrin"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Nasal OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Oxymetazoline is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Some nasal products are combination formulas, so confirm the exact ingredient if the packaging looks different.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "ketotifen",
    brands: ["Zaditor", "Alaway"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Eye allergy OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Ketotifen is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Keep eye-drop products in original packaging so the dosage form is easy to explain if needed.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "phenazopyridine",
    brands: ["AZO", "Uristat"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Urinary pain OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Phenazopyridine is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Many urinary-health products are supplements rather than medicines, so the ingredient list matters here too.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "diclofenac",
    brands: ["Voltaren Arthritis Pain"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical OTC medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical products generally follow the MHLW external-use rule.",
    details: [
      "Diclofenac is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "This entry is aimed at common OTC topical gel products rather than prescription oral diclofenac.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "lidocaine",
    brands: ["Aspercreme Lidocaine", "Salonpas Lidocaine"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical OTC medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical products generally follow the MHLW external-use rule.",
    details: [
      "Lidocaine is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Pain patches, creams, and roll-ons can have different active ingredients, so verify the exact label if it is not a plain lidocaine product.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "hydrocortisone",
    brands: ["Cortizone-10"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical OTC medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical products generally follow the MHLW external-use rule.",
    details: [
      "Hydrocortisone is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Anti-itch and eczema products often come in several strengths and formulations, so keep the original box if possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "clobetasol propionate",
    brands: ["Clobex", "Olux", "Temovate", "Impoyz"],
    aliases: ["clobetasol"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical prescription medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical prescription products generally follow the MHLW external-use rule.",
    details: [
      "Clobetasol propionate is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Clobetasol products come in cream, ointment, foam, lotion, shampoo, and spray forms, so keep the exact labeled packaging.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "betamethasone dipropionate",
    brands: ["Diprolene"],
    aliases: ["betamethasone"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical prescription medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical prescription products generally follow the MHLW external-use rule.",
    details: [
      "Betamethasone dipropionate is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Some betamethasone products are combination formulas, so match the exact ingredient and strength on the label.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "mometasone furoate",
    brands: ["Elocon"],
    aliases: ["mometasone"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical prescription medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical prescription products generally follow the MHLW external-use rule.",
    details: [
      "Mometasone furoate is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Keep the labeled tube, cream, or lotion packaging because topical steroid products often have very similar names.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "fluocinonide",
    brands: ["Vanos", "Lidex"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical prescription medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical prescription products generally follow the MHLW external-use rule.",
    details: [
      "Fluocinonide is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Because potency and dosage forms vary, verify the exact labeled product rather than relying only on the steroid family name.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "desonide",
    brands: ["DesOwen", "Verdeso"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical prescription medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical prescription products generally follow the MHLW external-use rule.",
    details: [
      "Desonide is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Topical steroids can look similar across strengths and formulations, so keep the exact labeled container when possible.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "halobetasol propionate",
    brands: ["Ultravate", "Bryhali"],
    aliases: ["halobetasol"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical prescription medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical prescription products generally follow the MHLW external-use rule.",
    details: [
      "Halobetasol propionate is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Keep the original labeled packaging because high-potency topical steroid products often come in several formulations.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "tacrolimus",
    brands: ["Protopic"],
    aliases: ["tacrolimus ointment"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical prescription medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical prescription products generally follow the MHLW external-use rule.",
    details: [
      "Topical tacrolimus is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Tacrolimus ointment is a non-steroid topical treatment, so keep the exact labeled packaging to distinguish it from oral tacrolimus products.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "pimecrolimus",
    brands: ["Elidel"],
    aliases: ["pimecrolimus cream"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical prescription medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical prescription products generally follow the MHLW external-use rule.",
    details: [
      "Pimecrolimus is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Pimecrolimus is a non-steroid topical eczema treatment, so keep the exact labeled packaging when traveling.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "crisaborole",
    brands: ["Eucrisa"],
    aliases: ["crisaborole ointment"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical prescription medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical prescription products generally follow the MHLW external-use rule.",
    details: [
      "Crisaborole is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Keep the exact labeled tube or carton because non-steroid topical eczema products can be easy to confuse by brand name alone.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "ruxolitinib topical",
    brands: ["Opzelura"],
    aliases: ["ruxolitinib cream"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical prescription medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical prescription products generally follow the MHLW external-use rule.",
    details: [
      "Topical ruxolitinib is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Keep the exact labeled packaging because topical ruxolitinib should be distinguished from oral or other systemic formulations.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "miconazole",
    brands: ["Monistat"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical OTC medicine",
    summary:
      "Usually legal to bring into Japan for personal use. External and vaginal-use products generally follow the normal MHLW quantity rules for non-controlled medicines.",
    details: [
      "Miconazole is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows ordinary non-controlled medicines under the standard personal-use rules.",
      "Brand extensions can include combination products, so match the exact formulation when searching by brand name.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "clotrimazole",
    brands: ["Lotrimin AF"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical OTC medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical products generally follow the MHLW external-use rule.",
    details: [
      "Clotrimazole is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Use the exact ingredient because antifungal brands can vary across cream, spray, and powder formats.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "terbinafine",
    brands: ["Lamisil AT"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical OTC medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical products generally follow the MHLW external-use rule.",
    details: [
      "Terbinafine is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "This entry is meant for common OTC antifungal products sold in cream, gel, or spray form.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "tolnaftate",
    brands: ["Tinactin"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical OTC medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical products generally follow the MHLW external-use rule.",
    details: [
      "Tolnaftate is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Athlete's-foot products are often sold in multiple delivery forms, so keep the labeled packaging.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "ketoconazole",
    brands: ["Nizoral"],
    aliases: ["ketoconazole cream", "ketoconazole shampoo"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical antifungal medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical ketoconazole products generally follow the MHLW external-use rule.",
    details: [
      "Ketoconazole topical products are not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Keep the exact labeled packaging because ketoconazole is sold in cream and shampoo forms.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "ciclopirox",
    brands: ["Penlac", "Loprox"],
    aliases: ["ciclopirox nail lacquer", "ciclopirox cream", "ciclopirox shampoo"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical antifungal medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Ciclopirox products generally follow the MHLW external-use rule.",
    details: [
      "Ciclopirox is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Keep the exact labeled packaging because nail, cream, and shampoo forms are used differently.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "efinaconazole",
    brands: ["Jublia"],
    aliases: ["efinaconazole topical solution"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical antifungal medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Nail antifungal solutions generally follow the MHLW external-use rule.",
    details: [
      "Efinaconazole is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Keep the bottle in original labeled packaging because nail-fungus products can look like cosmetic liquids.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "nystatin topical",
    brands: ["Nystop"],
    aliases: ["nystatin cream", "nystatin ointment", "nystatin powder"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical antifungal medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical nystatin products generally follow the MHLW external-use rule.",
    details: [
      "Topical nystatin is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Keep the exact labeled packaging because nystatin also comes in oral forms.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "boric acid vaginal suppositories",
    brands: ["pH-D", "The Killer"],
    aliases: ["boric acid suppositories", "vaginal boric acid"],
    status: "allowed",
    label: "Usually allowed",
    category: "Vaginal health product",
    summary:
      "Usually legal to bring into Japan for personal use. Vaginal suppository products are generally handled under the normal MHLW quantity rules for non-controlled medicines.",
    details: [
      "Boric acid suppositories are not listed in the controlled-substances sources used in this app.",
      "Keep the original labeled package because these products can be confused with non-medicine wellness items.",
      "Check the exact formula if the product includes added oils, herbs, or other active ingredients.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "latanoprost eye drops",
    brands: ["Xalatan"],
    aliases: ["latanoprost ophthalmic"],
    status: "allowed",
    label: "Usually allowed",
    category: "Eye prescription medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Eye-drop medicines are generally handled under the normal MHLW quantity rules for non-controlled medicines.",
    details: [
      "Latanoprost eye drops are not listed in the controlled-substances sources used in this app.",
      "Keep the bottle in original labeled packaging because eye-drop products can look similar across brands and strengths.",
      "If you plan to bring more than 1 month supply of prescription eye-drop medicine, apply for Import Confirmation before travel.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "timolol eye drops",
    brands: ["Timoptic", "Istalol"],
    aliases: ["timolol ophthalmic"],
    status: "allowed",
    label: "Usually allowed",
    category: "Eye prescription medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Eye-drop medicines are generally handled under the normal MHLW quantity rules for non-controlled medicines.",
    details: [
      "Timolol eye drops are not listed in the controlled-substances sources used in this app.",
      "Keep the bottle in original labeled packaging because eye-drop products can look similar across brands and strengths.",
      "If you plan to bring more than 1 month supply of prescription eye-drop medicine, apply for Import Confirmation before travel.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "ciprofloxacin eye drops",
    brands: ["Ciloxan"],
    aliases: ["ciprofloxacin ophthalmic"],
    status: "allowed",
    label: "Usually allowed",
    category: "Eye antibiotic medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Eye-drop antibiotics are generally handled under the normal MHLW quantity rules for non-controlled medicines.",
    details: [
      "Ciprofloxacin eye drops are not listed in the controlled-substances sources used in this app.",
      "Keep the bottle in original labeled packaging because eye-drop antibiotics should be distinguished from oral ciprofloxacin.",
      "If you plan to bring more than 1 month supply of prescription eye-drop medicine, apply for Import Confirmation before travel.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "ofloxacin ear drops",
    brands: ["Floxin Otic"],
    aliases: ["ofloxacin otic"],
    status: "allowed",
    label: "Usually allowed",
    category: "Ear antibiotic medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Ear-drop antibiotics are generally handled under the normal MHLW quantity rules for non-controlled medicines.",
    details: [
      "Ofloxacin ear drops are not listed in the controlled-substances sources used in this app.",
      "Keep the bottle in original labeled packaging because ear-drop antibiotics should be distinguished from eye or oral forms.",
      "If you plan to bring more than 1 month supply of prescription drop medicine, apply for Import Confirmation before travel.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "mupirocin",
    brands: ["Bactroban"],
    aliases: ["mupirocin ointment"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical antibiotic medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical antibiotic products generally follow the MHLW external-use rule.",
    details: [
      "Mupirocin is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Keep the tube in original labeled packaging because topical antibiotics can look similar to steroid creams.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "permethrin topical",
    brands: ["Elimite", "Nix"],
    aliases: ["permethrin cream", "permethrin lotion"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical anti-parasite medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical anti-parasite products generally follow the MHLW external-use rule.",
    details: [
      "Permethrin topical products are not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Keep the exact labeled packaging because permethrin is sold in different strengths and indications.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "ivermectin topical",
    brands: ["Soolantra"],
    aliases: ["ivermectin cream"],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical prescription medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical ivermectin products generally follow the MHLW external-use rule.",
    details: [
      "Topical ivermectin is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Keep the exact labeled packaging because topical ivermectin should be distinguished from oral formulations.",
    ],
    sources: MHLW_SOURCES,
  },
  {
    generic: "nicotine",
    brands: ["Nicorette", "Nicoderm CQ"],
    aliases: ["nicotine polacrilex"],
    status: "allowed",
    label: "Usually allowed",
    category: "Smoking cessation OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Nicotine replacement products are not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows ordinary non-controlled medicines under the usual personal-use quantity rules.",
      "Patches, gum, and lozenges may be handled differently as dosage forms at screening, so original packaging is helpful.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "docusate sodium",
    brands: ["Colace"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Docusate sodium is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Some stool-softener products include senna or other laxative ingredients, so verify the exact label.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "psyllium husk",
    brands: ["Metamucil"],
    aliases: ["psyllium"],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Psyllium husk is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Fiber products can also be sold as supplements, so packaging and labeling matter if you are asked to explain the product.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "magnesium hydroxide",
    brands: ["Milk of Magnesia"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "General OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Magnesium hydroxide is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Liquid digestive products are easier to explain at customs when they stay in the original labeled bottle.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "carbamide peroxide",
    brands: ["Debrox"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Ear care OTC medicine",
    summary:
      "Usually legal to bring into Japan under the standard MHLW personal-use quantity rules.",
    details: [
      "Carbamide peroxide is not listed in the controlled-substances sources used in this app.",
      "MHLW generally allows up to 2 months supply of ordinary drugs for personal use without Import Confirmation.",
      "Keep ear-drop products in original packaging so the intended use is easy to identify.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
  {
    generic: "docosanol",
    brands: ["Abreva"],
    aliases: [],
    status: "allowed",
    label: "Usually allowed",
    category: "Topical OTC medicine",
    summary:
      "Usually legal to bring into Japan for personal use. Topical products generally follow the MHLW external-use rule.",
    details: [
      "Docosanol is not listed in the controlled-substances sources used in this app.",
      "MHLW says external-use drugs can usually be brought in up to 24 items per product.",
      "Cold-sore treatments are often sold in small topical packages, which are best kept labeled.",
    ],
    sources: [{ label: "MHLW Personal Use Guidance", url: SOURCES.mhlw }],
  },
];

const searchInput = document.querySelector("#drug-search");
const clearButton = document.querySelector("#clear-search");
const summaryCard = document.querySelector("#summary-card");
const resultsContainer = document.querySelector("#results");
const chips = Array.from(document.querySelectorAll(".chip"));

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function buildHaystack(drug) {
  return [
    drug.generic,
    ...drug.brands,
    ...drug.aliases,
    drug.category,
    drug.summary,
  ]
    .map(normalize)
    .join(" ");
}

function scoreMatch(query, drug) {
  if (!query) {
    return 0;
  }

  const normalizedQuery = normalize(query);
  const haystack = buildHaystack(drug);
  const exactNames = [drug.generic, ...drug.brands, ...drug.aliases].map(normalize);

  if (exactNames.includes(normalizedQuery)) {
    return 100;
  }

  if (exactNames.some((name) => name.startsWith(normalizedQuery))) {
    return 80;
  }

  if (haystack.includes(normalizedQuery)) {
    return 60;
  }

  const queryTokens = normalizedQuery.split(" ").filter(Boolean);
  const hits = queryTokens.filter((token) => haystack.includes(token)).length;
  return hits > 0 ? hits * 10 : 0;
}

function findMatches(query) {
  const scored = DRUGS.map((drug) => ({
    drug,
    score: scoreMatch(query, drug),
  }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.drug.generic.localeCompare(b.drug.generic));

  return scored.map((item) => item.drug);
}

function renderSummary(query, matches) {
  if (!query) {
    summaryCard.innerHTML = `
      <h2>Start with a drug name</h2>
      <p class="summary-copy">
        Enter a generic name or a common U.S. brand name to see the likely Japan
        entry rule and the MHLW source path behind it.
      </p>
    `;
    return;
  }

  if (matches.length === 0) {
    summaryCard.innerHTML = `
      <h2>No exact lookup yet</h2>
      <p class="summary-copy">
        I could not match <strong>${escapeHtml(query)}</strong> to the current
        dataset. Try the active ingredient on the package. For unlisted medicines,
        use the general MHLW limits unless the ingredient appears in Japan's
        controlled-substance guidance.
      </p>
    `;
    return;
  }

  const top = matches[0];
  summaryCard.innerHTML = `
    <h2>${escapeHtml(top.generic)}</h2>
    <p class="summary-copy">
      ${escapeHtml(top.summary)}
    </p>
  `;
}

function getDetailItemClass(detail) {
  const normalized = detail.toLowerCase();

  if (
    normalized.includes("may need advance confirmation") ||
    normalized.includes("advance permission") ||
    normalized.includes("stricter rule controls") ||
    normalized.includes("different product") ||
    normalized.includes("not the same as") ||
    normalized.includes("do not apply to") ||
    normalized.includes("exact label matters") ||
    normalized.includes("do not rely on the brand name alone")
  ) {
    return "detail-warning";
  }

  return "";
}

function getSummaryClass(summary) {
  const normalized = summary.toLowerCase();

  if (
    normalized.includes("very important") ||
    normalized.includes("advance permission") ||
    normalized.includes("prohibited") ||
    normalized.includes("do not bring") ||
    normalized.includes("does not apply to") ||
    normalized.includes("not the same as")
  ) {
    return "summary-warning";
  }

  return "";
}

function renderResults(query, matches) {
  if (!query) {
    resultsContainer.innerHTML = `
      <article class="card empty-state muted-card">
        <h3>Helpful starting points</h3>
        <p>
          Search ADHD meds, sleep meds, opioids, decongestants, diabetes meds,
          and common OTC products by brand or generic name.
        </p>
      </article>
    `;
    return;
  }

  if (matches.length === 0) {
    resultsContainer.innerHTML = `
      <article class="card empty-state muted-card">
        <h3>What to do next</h3>
        <p>
          Check the exact active ingredient and dosage form. Combination products
          can change the answer, especially for cold medicines and pain medicines.
        </p>
      </article>
    `;
    return;
  }

  // Check if there are variants with different warning levels
  const hasWarnings = matches.some((m) => m.status === "restricted" || m.status === "permission");
  const hasMultipleVariants = matches.length > 1;
  const hasVariantMix = hasMultipleVariants && matches.some((m) => m.status === "allowed") && hasWarnings;

  let html = "";

  if (hasVariantMix) {
    html += `
      <article class="card variant-warning-banner">
        <p>⚠️ <strong>Multiple variants available:</strong> Some versions of this product have different Japan entry rules. Check each variant carefully.</p>
      </article>
    `;
  }

  html += matches
    .map((drug) => {
      const warningIcon = drug.status === "restricted" ? "⛔" : drug.status === "permission" ? "⚠️" : "✓";
      const resultCardClass = hasVariantMix
        ? drug.status === "allowed" ? "result-card result-card-safe" : "result-card result-card-warning"
        : "result-card";
      const brandLine = drug.brands.length
        ? `<p class="aliases">U.S. brand names: ${escapeHtml(drug.brands.join(", "))}</p>`
        : "";
      const summaryClass = getSummaryClass(drug.summary);
      const summaryClassAttr = summaryClass ? ` class="${summaryClass}"` : "";
      
      return `
        <article class="card ${resultCardClass}">
          <div class="result-header">
            <div>
              <h3>${escapeHtml(drug.generic)}</h3>
              ${brandLine}
            </div>
            <span class="badge ${drug.status}">${warningIcon} ${escapeHtml(drug.label)}</span>
          </div>
          <p class="result-meta"><strong>Category:</strong> ${escapeHtml(drug.category)}</p>
          <p${summaryClassAttr}>${escapeHtml(drug.summary)}</p>
          <ul class="detail-list">
            ${drug.details
              .map((detail) => {
                const detailClass = getDetailItemClass(detail);
                const classAttr = detailClass ? ` class="${detailClass}"` : "";
                return `<li${classAttr}>${escapeHtml(detail)}</li>`;
              })
              .join("")}
          </ul>
          <p class="source-line">
            Sources:
            ${drug.sources
              .map(
                (source) =>
                  `<a href="${source.url}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a>`
              )
              .join(" · ")}
          </p>
        </article>
      `;
    })
    .join("");

  resultsContainer.innerHTML = html;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function updateUI(query) {
  const matches = findMatches(query);
  renderSummary(query, matches);
  renderResults(query, matches);
}

searchInput.addEventListener("input", (event) => {
  updateUI(event.target.value);
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  updateUI("");
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    searchInput.value = chip.dataset.query || "";
    updateUI(searchInput.value);
  });
});

updateUI("");

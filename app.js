const SOURCES = {
  mhlw:
    "https://www.mhlw.go.jp/english/policy/health-medical/pharmaceuticals/01.html?lv=true",
  ncd: "https://www.ncd.mhlw.go.jp/en/application2.html",
  controlledList:
    "https://www.ncd.mhlw.go.jp/dl_data/keitai/cotrolled_substances_list20241212%20.pdf",
  psychotropics: "https://www.ncd.mhlw.go.jp/dl_data/keitai/total.pdf",
};

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
      "If the supply is more than 1 month, MHLW says to contact yakkan@mhlw.go.jp.",
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
      "If you bring more than 1 month supply, MHLW says to contact yakkan@mhlw.go.jp.",
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
    aliases: [],
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

  resultsContainer.innerHTML = matches
    .map(
      (drug) => `
        <article class="card result-card">
          <div class="result-header">
            <div>
              <h3>${escapeHtml(drug.generic)}</h3>
              <p class="aliases">
                U.S. brand names: ${escapeHtml(drug.brands.join(", "))}
              </p>
            </div>
            <span class="badge ${drug.status}">${escapeHtml(drug.label)}</span>
          </div>
          <p class="result-meta"><strong>Category:</strong> ${escapeHtml(drug.category)}</p>
          <p>${escapeHtml(drug.summary)}</p>
          <ul class="detail-list">
            ${drug.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}
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
      `
    )
    .join("");
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

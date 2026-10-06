export type Program={stage:string;title:string;icon:string;description:string;points:string[];tone:"sun"|"sky"|"coral"};
export type Certificate={classes:string;status:string;title:string;dateLabel:string;date:string;number:string;href:string;tone:"sun"|"coral"};
export type GalleryMoment={src:string;alt:string;category:string;caption:string;wide?:boolean};
export const navItems=[["Home","/"],["About","/about/"],["Learning","/learning/"],["Facilities","/facilities/"],["Gallery","/gallery/"],["Certificates","/certificates/"],["Contact","/contact/"]] as const;
export const programs:Program[]=[
 {stage:"Early years",title:"Play Group & Nursery",icon:"☀",description:"Language, movement, creativity and social confidence through joyful, guided play.",points:["Story and rhyme","Sensory discovery","Fine-motor skills"],tone:"sun"},
 {stage:"Primary",title:"Classes 1–5",icon:"✎",description:"Strong foundations in literacy, numeracy and the world around us—built through participation.",points:["Concept clarity","Projects and teamwork","Creative expression"],tone:"sky"},
 {stage:"Middle school",title:"Classes 6–8",icon:"⚛",description:"Deeper subject knowledge, critical thinking and the confidence to ask better questions.",points:["Science and technology","Leadership skills","Goal-focused support"],tone:"coral"},
];
export const facilities=[["Smart classrooms","Multimedia-rich lessons make concepts clear, visual and interactive."],["Digital laboratory","Hands-on access to technology nurtures curiosity and responsible digital skills."],["Play & activity spaces","Movement, games and creative activities support healthy, balanced development."],["Supportive educators","Teachers guide each child with attention, encouragement and clear feedback."]] as const;

export interface FacilityFeature {
  num: string;
  title: string;
  tag: string;
  copy: string;
  description: string;
  image: string;
  icon: string;
  tone: "amber" | "sky" | "emerald" | "coral";
  highlights: string[];
}

export const facilityCards: FacilityFeature[] = [
  {
    num: "01",
    title: "Smart classrooms",
    tag: "Interactive Tech",
    copy: "Multimedia-rich lessons make concepts clear, visual and interactive.",
    description: "Equipped with interactive audio-visual displays and digital learning modules, our smart classrooms transform complex lessons into engaging, visual experiences that spark curiosity and active participation.",
    image: "/images/gallery/round-2/r2-00.webp",
    icon: "🖥️",
    tone: "amber",
    highlights: ["Interactive Touch Displays", "Visual Concept Mapping", "Audio-Visual Smart Modules", "Ergonomic Student Seating"],
  },
  {
    num: "02",
    title: "Digital laboratory",
    tag: "Modern Computing",
    copy: "Hands-on access to technology nurtures curiosity and responsible digital skills.",
    description: "Our air-conditioned digital computer lab provides every student with individual workstation access to learn coding fundamentals, computer applications, and safe digital research under certified instructors.",
    image: "/images/gallery/round-2/r2-14.webp",
    icon: "💻",
    tone: "sky",
    highlights: ["Individual Workstations", "Child-Safe Monitored Web", "Foundational Coding & IT", "Creative Digital Projects"],
  },
  {
    num: "03",
    title: "Play & activity spaces",
    tag: "Physical & Holistic",
    copy: "Movement, games and creative activities support healthy, balanced development.",
    description: "Children thrive when physical agility complements academics. From morning outdoor yoga and sports grounds to dedicated indoor chess, dance, and creative activity zones, we foster teamwork and vitality.",
    image: "/images/gallery/round-2/r2-02.webp",
    icon: "⚽",
    tone: "emerald",
    highlights: ["Open-Air Yoga & Exercise Ground", "Safe Age-Appropriate Play Kits", "Indoor Games (Chess, Carrom)", "Annual Sports & Drill Meets"],
  },
  {
    num: "04",
    title: "Supportive educators",
    tag: "Child-First Faculty",
    copy: "Teachers guide each child with attention, encouragement and clear feedback.",
    description: "Our dedicated educators believe that every child learns at their own unique pace. With low student-teacher ratios and continuous emotional support, teachers guide every child towards academic excellence and strong moral character.",
    image: "/images/gallery/round-2/r2-09.webp",
    icon: "👩‍🏫",
    tone: "coral",
    highlights: ["1:20 Student-Teacher Ratio", "Individualized Attention", "Continuous Parent-Teacher Dialogues", "Values & Moral Guidance"],
  },
];
export const leaders=[
 {name:"Er H. P. Chaturvedi",role:"Founder",image:"/images/founder-er-hp-chaturvedi.png",quote:"We seek to blend traditional wisdom with modern education, nurturing critical thinking, creativity and cultural appreciation."},
 {name:"Vivek Chaturvedi",role:"Director",image:"/images/director-vivek-chaturvedi.png",quote:"We create a dynamic learning environment that fosters curiosity, personal growth and each student’s unique talents."},
 {name:"Dr. Sandhya Richhariya",role:"Principal",image:"/images/principal-sandhya-richhariya.png",quote:"Every student is encouraged to explore their passions, expand their horizons and reach their full potential."},
] as const;
export const certificates:Certificate[]=[
 {classes:"1–5",status:"Permanent recognition",title:"Pre-Primary & Primary School",dateLabel:"Issued",date:"16 July 2025",number:"JHA0936117190",href:"/documents/wisdom-primary-recognition-certificate.pdf",tone:"sun"},
 {classes:"6–8",status:"Provisional recognition",title:"Upper Primary School",dateLabel:"Valid",date:"25 Mar 2026 – 25 Mar 2027",number:"JHA09369070291",href:"/documents/wisdom-upper-primary-recognition-certificate.pdf",tone:"coral"},
];

export const activityNames=["Cultural Activities","Graduation","Holi","Diwali","Tulsi Poojan","Yoga","Art & Craft","Basant Panchami","Ganesh Chaturthi","Abacus Classes","Games","Health Check-up","Awareness Activities","Student Market","Parent-Teacher Meetings"] as const;

const roundTwo=(file:string,category:string,caption:string,wide=false):GalleryMoment=>({src:`/images/gallery/round-2/${file}.webp`,alt:`Wisdom International School — ${caption}`,category,caption,wide});
const roundTwoGallery:GalleryMoment[]=[
 roundTwo("r2-00","School Campus","Activity classroom prepared for young learners",true),
 roundTwo("r2-01","Tulsi Poojan","Children offering prayers around the Tulsi plant"),
 roundTwo("r2-02","Yoga","A mindful outdoor yoga session",true),
 roundTwo("r2-03","Cultural Activities","A student portraying a revered sage"),
 roundTwo("r2-04","Diwali","A student presenting a handmade diya"),
 roundTwo("r2-05","Cultural Activities","Traditional character presentation"),
 roundTwo("r2-06","Cultural Activities","Dandiya celebration in traditional dress"),
 roundTwo("r2-07","Diwali","Colourful handmade festive crafts",true),
 roundTwo("r2-08","Cultural Activities","Young performers on stage"),
 roundTwo("r2-09","Classroom Activities","Guided learning with a teacher"),
 roundTwo("r2-10","Cultural Activities","Dandiya activity for young learners"),
 roundTwo("r2-11","Student Market","Learning everyday skills through a student stall"),
 roundTwo("r2-12","Student Market","Students managing their own refreshment stall"),
 roundTwo("r2-13","Cultural Activities","Paying tribute during a school celebration"),
 roundTwo("r2-14","Games","Learning strategy through chess",true),
 roundTwo("r2-15","Cultural Activities","Celebrating India together"),
 roundTwo("r2-16","Cultural Activities","Confident expression on stage"),
 roundTwo("r2-17","Tulsi Poojan","Students caring for sacred plants",true),
 roundTwo("r2-18","Tulsi Poojan","Learning to nurture the environment"),
 roundTwo("r2-19","Art & Craft","A colourful clay creation"),
 roundTwo("r2-20","Student Market","Students presenting handmade products"),
 roundTwo("r2-21","Student Market","Teamwork at a student-led stall"),
 roundTwo("r2-22","Cultural Activities","A joyful stage performance"),
 roundTwo("r2-23","Cultural Activities","Families joining the school celebration"),
 roundTwo("r2-24","Art & Craft","Learning shapes through clay modelling"),
 roundTwo("r2-25","Health Check-up","Health awareness address for the school community"),
 roundTwo("r2-26","Student Market","Young chefs at their activity stall"),
 roundTwo("r2-27","Health Check-up","A careful student health examination"),
 roundTwo("r2-28","Student Market","Students proudly presenting their stall"),
 roundTwo("r2-29","Tulsi Poojan","Plantation and environmental learning"),
 roundTwo("r2-30","Student Market","Practical learning beyond the classroom"),
 roundTwo("r2-31","Art & Craft","A bright butterfly made with clay"),
 roundTwo("r2-32","Cultural Activities","Community members at a school event"),
 roundTwo("r2-33","Achievements","Student leadership recognition"),
 roundTwo("r2-34","Tulsi Poojan","Students presenting plants they nurtured",true),
 roundTwo("r2-35","Tulsi Poojan","Planting together for a greener future"),
 roundTwo("r2-36","Diwali","Students displaying their decorated diyas"),
 roundTwo("r2-37","Student Market","A student serving at an activity stall"),
 roundTwo("r2-38","Cultural Activities","Dandiya partners in traditional attire"),
 roundTwo("r2-39","Diwali","Children sharing their Diwali artwork",true),
 roundTwo("extra-00","Graduation","Our little graduates ready for their next step",true),
 roundTwo("extra-01","Awareness Activities","Young voices encouraging everyone to save water",true),
 roundTwo("extra-02","Parent-Teacher Meetings","Families and teachers planning a child’s progress"),
 roundTwo("extra-03","Yoga","Calm minds and healthy bodies through yoga",true),
 roundTwo("extra-04","Tulsi Poojan","Children taking part in Tulsi Poojan"),
 roundTwo("extra-05","Health Check-up","A friendly health check for every child"),
 roundTwo("extra-06","Cultural Activities","Learning values through character portrayal"),
 roundTwo("extra-07","Parent-Teacher Meetings","A focused conversation about student learning"),
 roundTwo("extra-08","Parent-Teacher Meetings","Teachers meeting families in the classroom",true),
 roundTwo("extra-09","Cultural Activities","A historical character brought to life"),
 roundTwo("extra-10","Games","A playful ball game in the activity area",true),
 roundTwo("extra-11","Awareness Activities","Students sharing healthy everyday habits"),
 roundTwo("extra-12","Basant Panchami","Honouring learning and wisdom on Basant Panchami"),
 roundTwo("extra-13","Parent-Teacher Meetings","Progress discussions with parents and teachers",true),
 roundTwo("extra-14","Health Check-up","Caring health support at school"),
 roundTwo("extra-15","Tulsi Poojan","The beautifully decorated Tulsi Poojan setting"),
];

export const galleryMoments:GalleryMoment[]=[
 {src:"/images/gallery/cultural-krishna-radha.webp",alt:"Children dressed as Krishna and Radha during a cultural celebration",category:"Cultural Activities",caption:"Stories and traditions come alive",wide:true},
 {src:"/images/gallery/cultural-stage-dance.webp",alt:"Students performing a cultural dance on stage",category:"Cultural Activities",caption:"Confidence on stage"},
 {src:"/images/gallery/cultural-performance.webp",alt:"Students participating in a school cultural programme",category:"Cultural Activities",caption:"Celebrating talent together"},
 {src:"/images/gallery/independence-day.webp",alt:"Students dressed in tricolour clothing during Independence Day",category:"Cultural Activities",caption:"Pride, unity and belonging"},
 {src:"/images/gallery/graduation-celebration.webp",alt:"Graduating students and teachers at Wisdom International School",category:"Cultural Activities",caption:"A joyful milestone",wide:true},
 {src:"/images/gallery/graduation-class.webp",alt:"Graduation class group photograph",category:"Cultural Activities",caption:"Ready for the next step"},
 {src:"/images/gallery/diwali-diya-art.webp",alt:"Colourful handmade diyas created by students",category:"Diwali",caption:"Handmade festive lights"},
 {src:"/images/gallery/diwali-rangoli.webp",alt:"Colourful rangoli prepared for Diwali",category:"Diwali",caption:"Colour, pattern and celebration",wide:true},
 {src:"/images/gallery/diwali-rangoli-team.webp",alt:"Teachers creating a rangoli together",category:"Diwali",caption:"Creating together"},
 {src:"/images/gallery/diwali-student-crafts.webp",alt:"Students displaying handmade Diwali crafts",category:"Diwali",caption:"Little hands, bright ideas"},
 {src:"/images/gallery/art-and-craft.webp",alt:"Handmade Ganesh artwork created for a school activity",category:"Art & Craft",caption:"Learning through making"},
 {src:"/images/gallery/diwali-crafts.webp",alt:"A collection of colourful student craft projects",category:"Art & Craft",caption:"Creative expression",wide:true},
 {src:"/images/gallery/ganesh-chaturthi-craft.webp",alt:"Handmade Ganesh Chaturthi craft held outdoors",category:"Ganesh Chaturthi",caption:"A thoughtful festival creation"},
 {src:"/images/gallery/abacus-class.webp",alt:"Teacher with an abacus learning display",category:"Abacus Classes",caption:"Numbers made visual"},
 {src:"/images/gallery/games-hula-hoop.webp",alt:"Children enjoying a hula hoop activity outdoors",category:"Games",caption:"Move, play and smile"},
 {src:"/images/gallery/games-outdoor-activity.webp",alt:"Students participating in an outdoor activity",category:"Games",caption:"Active learning outdoors",wide:true},
 {src:"/images/gallery/games-classroom.webp",alt:"Students taking part in a classroom activity",category:"Games",caption:"Thinking and doing"},
 {src:"/images/gallery/games-fancy-dress.webp",alt:"Children enjoying a fancy dress group activity",category:"Games",caption:"Playful participation"},
 ...roundTwoGallery,
];

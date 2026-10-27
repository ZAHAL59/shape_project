// ═══════════════════════════════════════════════════════════════════════
// SHAPE UNIFIED DATA LAYER  — shape_db.js
// Shared across all SHAPE portals via localStorage('SHAPE_DB')
// Every portal reads from and writes back to this store.
// ═══════════════════════════════════════════════════════════════════════

var SHAPE_DB = (function(){

  var KEY = 'SHAPE_DB_v5';

  // ── Default seed data ──────────────────────────────────────────────
  var SEED = {

    // ── Students ──────────────────────────────────────────────────────
    students: [
      {id:'S001',name:'Ananya Krishnan',  dob:'2012-03-14',cls:'Grade 8',  section:'A',
       adm:'2024-06-01',learningStyle:'Visual',   diet:'Vegetarian',
       health:'Mild asthma — inhaler with teacher',needs:'None',
       hobbies:'Drawing, Chess',langs:'Malayalam, English, Hindi',
       travel:'Bus',busRoute:'R001',boarding:false,
       parentName:'Krishnan P.',parentPhone:'+91 94470 11111',
       parentOcc:'Engineer / Teacher',siblings:1,
       behav:'Social, confident, leadership qualities',
       expPref:'Outdoor projects, visual demonstrations',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},
       status:'Active'},

      {id:'S002',name:'Mohammed Ashiq',   dob:'2013-07-22',cls:'Grade 7',  section:'B',
       adm:'2024-06-01',learningStyle:'Auditory',  diet:'Non-Vegetarian',
       health:'None',needs:'None',
       hobbies:'Cricket, Reading',langs:'Malayalam, English',
       travel:'Bus',busRoute:'R002',boarding:false,
       parentName:'Ashiq K.',parentPhone:'+91 94471 22222',
       parentOcc:'Business / Homemaker',siblings:2,
       behav:'Reserved, focused, good at group tasks',
       expPref:'Group discussions, storytelling',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},
       status:'Active'},

      {id:'S003',name:'Devika Nair',       dob:'2010-11-05',cls:'Grade 10', section:'A',
       adm:'2022-06-01',learningStyle:'Kinaesthetic',diet:'Vegetarian',
       health:'None',needs:'None',
       hobbies:'Dance, Art, Swimming',langs:'Malayalam, English, Tamil',
       travel:'Bus',busRoute:'R001',boarding:true,
       parentName:'Nair R.',parentPhone:'+91 94472 33333',
       parentOcc:'Doctor / Teacher',siblings:0,
       behav:'Creative, independent, self-motivated',
       expPref:'Hands-on lab, project-based learning, field trips',
       fees:{term:24500,transport:2800,hostel:3500,activity:1800},
       status:'Active'},

      {id:'S004',name:'Rahul P.',           dob:'2011-05-18',cls:'Grade 9',  section:'C',
       adm:'2023-06-01',learningStyle:'Reading/Writing',diet:'Non-Vegetarian',
       health:'Under specialist support for dyslexia',needs:'Mild dyslexia — support plan active',
       hobbies:'Football, Music, Coding',langs:'Malayalam, English',
       travel:'Bus',busRoute:'R003',boarding:false,
       parentName:'Pradeep K.',parentPhone:'+91 94473 44444',
       parentOcc:'Engineer / Nurse',siblings:1,
       behav:'Determined, sometimes frustrated with text-heavy tasks',
       expPref:'Audio content, peer explanation, visual aids',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},
       status:'Active'},

      {id:'S005',name:'Sreelakshmi K.',    dob:'2014-02-28',cls:'Grade 6',  section:'B',
       adm:'2025-06-01',learningStyle:'Visual',   diet:'Vegetarian',
       health:'None',needs:'None',
       hobbies:'Drawing, Gardening, Cooking',langs:'Malayalam, English',
       travel:'Bus',busRoute:'R002',boarding:false,
       parentName:'Krishnan V.',parentPhone:'+91 94474 55555',
       parentOcc:'Farmer / Homemaker',siblings:3,
       behav:'Shy at first, blooms with encouragement',
       expPref:'Nature-based, Living Learning Park activities',
       fees:{term:22000,transport:2800,hostel:0,activity:1800},
       status:'Active'},

      {id:'S006',name:'Arjun Menon',        dob:'2011-09-12',cls:'Grade 9',  section:'A',
       adm:'2023-06-01',learningStyle:'Kinaesthetic',diet:'Non-Vegetarian',
       health:'None',needs:'None',
       hobbies:'Football, Gaming',langs:'Malayalam, English',
       travel:'Bus',busRoute:'R001',boarding:true,
       parentName:'Menon A.',parentPhone:'+91 94475 66666',
       parentOcc:'Police / Homemaker',siblings:1,
       behav:'High energy, needs structured tasks',
       expPref:'Active projects, physical activities',
       fees:{term:24500,transport:2800,hostel:3500,activity:1800},
       status:'Active'},
    ],

    // ── Staff ─────────────────────────────────────────────────────────
    staff: [
      {id:'T001',name:'Ms. Latha R.',     subj:'Mathematics',   joined:'2019-06-01',phone:'+91 94470 91001',email:'latha@aretemodel.edu',salary:55000,status:'Active',ratings:[4.1,4.2,4.5,4.6,4.7],trainings:14,concerns:0},
      {id:'T002',name:'Ms. Divya K.',     subj:'Science',       joined:'2020-08-01',phone:'+91 94470 91002',email:'divya@aretemodel.edu',salary:50000,status:'Active',ratings:[4.0,4.1,4.0,4.2,4.3],trainings:11,concerns:1},
      {id:'T003',name:'Mr. Paul T.',      subj:'English',       joined:'2018-06-01',phone:'+91 94470 91003',email:'paul@aretemodel.edu',salary:58000,status:'Active',ratings:[4.4,4.5,4.6,4.7,4.8],trainings:17,concerns:0},
      {id:'T004',name:'Mr. Arun P.',      subj:'Social Studies',joined:'2021-06-01',phone:'+91 94470 91004',email:'arun@aretemodel.edu',salary:48000,status:'Active',ratings:[3.7,3.9,3.8,4.0,4.1],trainings:8,concerns:1},
      {id:'T005',name:'Ms. Rani S.',      subj:'Malayalam',     joined:'2022-06-01',phone:'+91 94470 91005',email:'rani@aretemodel.edu',salary:46000,status:'Active',ratings:[4.2,4.3,4.4,4.5],trainings:7,concerns:0},
    ],

    // ── Bus Routes ───────────────────────────────────────────────────
    routes: [
      {id:'R001',name:'Route 1 — KL Bus',    vehicle:'KL 11 AB 1234',type:'Bus (52 seats)',driver:'Rajan P.',  phone:'+91 94470 12345',dept:'07:05',arr:'07:45',status:'Active'},
      {id:'R002',name:'Route 2 — Koyilandy', vehicle:'KL 11 CD 5678',type:'Bus (52 seats)',driver:'Suresh Kumar',phone:'+91 94471 56789',dept:'07:15',arr:'07:55',status:'Active'},
      {id:'R003',name:'Route 3 — Vatakara',  vehicle:'KL 11 EF 9012',type:'Van (15 seats)',driver:'Krishnan K.',phone:'+91 94472 98765',dept:'07:20',arr:'08:00',status:'Active'},
      {id:'R004',name:'Route 4 — Peringathur',vehicle:'KL 11 GH 3456',type:'Bus (52 seats)',driver:'Sunil M.',  phone:'+91 94473 11111',dept:'07:00',arr:'07:50',status:'Active'},
    ],

    // ── Hostel Rooms ─────────────────────────────────────────────────
    rooms: [
      {id:'RM-A01',block:'A',num:1, cap:4},
      {id:'RM-A02',block:'A',num:2, cap:4},
      {id:'RM-A03',block:'A',num:12,cap:4},
      {id:'RM-A04',block:'A',num:15,cap:4},
      {id:'RM-B01',block:'B',num:3, cap:4},
      {id:'RM-B02',block:'B',num:7, cap:4},
    ],

    // ── Fee Payments ─────────────────────────────────────────────────
    payments: [
      {id:'RC-001',studentId:'S001',category:'Term Fee',  amount:24500,date:'2026-10-14',mode:'Online',month:'Oct 2026'},
      {id:'RC-002',studentId:'S002',category:'Term Fee',  amount:24500,date:'2026-10-13',mode:'Cash',  month:'Oct 2026'},
      {id:'RC-003',studentId:'S003',category:'Hostel Fee',amount:3500, date:'2026-10-12',mode:'Online',month:'Oct 2026'},
      {id:'RC-004',studentId:'S004',category:'Term Fee',  amount:24500,date:'2026-10-11',mode:'Online',month:'Oct 2026'},
      {id:'RC-005',studentId:'S005',category:'Term Fee',  amount:22000,date:'2026-10-10',mode:'Cheque',month:'Oct 2026'},
    ],

    // ── Complaints ───────────────────────────────────────────────────
    feeStructure: {
      'Grade 1':  {admission:5000, t1:8000,  t2:8000,  t3:8000,  term:24000, transport:6000, hostel:42000, activity:1800, total:31800},
      'Grade 2':  {admission:5000, t1:8000,  t2:8000,  t3:8000,  term:24000, transport:6000, hostel:42000, activity:1800, total:31800},
      'Grade 3':  {admission:5000, t1:8500,  t2:8500,  t3:8500,  term:25500, transport:6000, hostel:42000, activity:1800, total:33300},
      'Grade 4':  {admission:5000, t1:8500,  t2:8500,  t3:8500,  term:25500, transport:6000, hostel:42000, activity:1800, total:33300},
      'Grade 5':  {admission:5000, t1:9000,  t2:9000,  t3:9000,  term:27000, transport:6000, hostel:42000, activity:2500, total:35500},
      'Grade 6':  {admission:6000, t1:10000, t2:10000, t3:10000, term:30000, transport:6500, hostel:42000, activity:3000, total:39500},
      'Grade 7':  {admission:6000, t1:10000, t2:10000, t3:10000, term:30000, transport:6500, hostel:42000, activity:3000, total:39500},
      'Grade 8':  {admission:6000, t1:11000, t2:11000, t3:11000, term:33000, transport:6500, hostel:42000, activity:3000, total:42500},
      'Grade 9':  {admission:7000, t1:12000, t2:12000, t3:12000, term:36000, transport:7000, hostel:42000, activity:3500, total:46500},
      'Grade 10': {admission:7000, t1:12000, t2:12000, t3:12000, term:36000, transport:7000, hostel:42000, activity:3500, total:46500},
      'Grade 11': {admission:8000, t1:14000, t2:14000, t3:14000, term:42000, transport:7000, hostel:42000, activity:4000, total:53000},
      'Grade 12': {admission:8000, t1:14000, t2:14000, t3:14000, term:42000, transport:7000, hostel:42000, activity:4000, total:53000},
      monthly: {hostel:3500, mess:800}
    },

    complaints: [
      {id:'CP001',date:'2026-10-10',from:'Parent',who:'Mrs. Suma R.',studentId:'S005',type:'Academic',  subj:'Assignment load too heavy for Grade 5',action:'Referred to HOD',status:'Open'},
      {id:'CP002',date:'2026-10-08',from:'Parent',who:'Mr. Rahul',   studentId:'S004',type:'Transport', subj:'Bus arriving late consistently',action:'Driver counselled',status:'Resolved',resolved:'2026-10-09'},
      {id:'CP003',date:'2026-10-14',from:'Staff', who:'Mr. Arun P.', staffId:'T004',  type:'Facility',  subj:'Projector in Room 12 not working',action:'IT notified',status:'Open'},
    ],

    // ── Events ───────────────────────────────────────────────────────
    events: [
      {id:'EV001',title:'Parent-Teacher Meeting — Grade 8',type:'Parent Meeting',date:'2026-10-20',time:'10:00',venue:'Main Hall',seats:120,alloc:98,organiser:'T001'},
      {id:'EV002',title:'Monthly Staff Meeting',type:'Staff Meeting',date:'2026-10-25',time:'16:00',venue:'Staff Room',seats:40,alloc:38,organiser:'T003'},
      {id:'EV003',title:'Science Fair — Grades 6–10',type:'School Event',date:'2026-11-08',time:'09:00',venue:'Main Hall + Grounds',seats:600,alloc:540,organiser:'T002'},
    ],

    // ── Early Departures ─────────────────────────────────────────────
    departures: [
      {id:'DEP001',studentId:'S004',reason:'Medical appointment',time:'13:30',date:'2026-10-14',smsSent:true},
      {id:'DEP002',studentId:'S002',reason:'Family function',    time:'14:00',date:'2026-10-12',smsSent:true},
    ],

    // ── HR Vacancies & Candidates ────────────────────────────────────
    vacancies: [
      {id:'V001',subj:'Mathematics', qual:'M.Sc Maths + B.Ed',exp:'3+ years',posted:'2026-09-01',status:'Active'},
      {id:'V002',subj:'English',     qual:'MA English + B.Ed', exp:'2+ years',posted:'2026-09-10',status:'Active'},

      {id:'S007',name:'Arjun Suresh',       dob:'2012-05-12',cls:'Grade 8',section:'A',roll:2,
       adm:'2024-06-01',learningStyle:'Visual',    diet:'Non-Vegetarian',
       health:'None',needs:'None',hobbies:'Cricket, Gaming',langs:'Malayalam, English',
       travel:'Bus',busRoute:'R001',boarding:false,
       parentName:'Suresh K.',parentPhone:'+91 94470 22201',
       behav:'Active, competitive, strong in sports',expPref:'Group work, outdoor activities',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},status:'Active'},

      {id:'S008',name:'Fathima Nousheen',   dob:'2012-09-28',cls:'Grade 8',section:'A',roll:3,
       adm:'2024-06-01',learningStyle:'Reading',    diet:'Non-Vegetarian',
       health:'None',needs:'None',hobbies:'Reading, Calligraphy',langs:'Malayalam, English, Arabic',
       travel:'Bus',busRoute:'R002',boarding:false,
       parentName:'Noushad P.',parentPhone:'+91 94471 33301',
       behav:'Focused, disciplined, top academic performer',expPref:'Individual study, written assignments',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},status:'Active'},

      {id:'S009',name:'Rohan Vijay',         dob:'2012-03-17',cls:'Grade 8',section:'A',roll:4,
       adm:'2024-06-01',learningStyle:'Kinaesthetic',diet:'Vegetarian',
       health:'Mild peanut allergy — carry antihistamine',needs:'None',
       hobbies:'Football, Robotics',langs:'Malayalam, English, Tamil',
       travel:'Bus',busRoute:'R001',boarding:false,
       parentName:'Vijay R.',parentPhone:'+91 94472 44401',
       behav:'Energetic, hands-on learner, needs movement breaks',expPref:'Lab work, projects, field trips',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},status:'Active'},

      {id:'S010',name:'Sneha Anil',          dob:'2012-11-04',cls:'Grade 8',section:'A',roll:5,
       adm:'2024-06-01',learningStyle:'Visual',    diet:'Vegetarian',
       health:'None',needs:'None',hobbies:'Dance, Art',langs:'Malayalam, English',
       travel:'Own',busRoute:'',boarding:false,
       parentName:'Anil M.',parentPhone:'+91 94473 55501',
       behav:'Creative, expressive, excellent at presentations',expPref:'Visual demonstrations, project-based',
       fees:{term:33000,transport:0,hostel:0,activity:3000},status:'Active'},

      {id:'S011',name:'Mohammed Riyas',      dob:'2012-07-22',cls:'Grade 8',section:'A',roll:6,
       adm:'2024-06-01',learningStyle:'Auditory',  diet:'Non-Vegetarian',
       health:'None',needs:'None',hobbies:'Music, Debate',langs:'Malayalam, English, Arabic',
       travel:'Bus',busRoute:'R003',boarding:false,
       parentName:'Riyas T.',parentPhone:'+91 94474 66601',
       behav:'Articulate, confident speaker, strong critical thinker',expPref:'Discussions, debates, storytelling',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},status:'Active'},

      {id:'S012',name:'Aiswarya Pradeep',    dob:'2012-02-14',cls:'Grade 8',section:'A',roll:7,
       adm:'2024-06-01',learningStyle:'Reading',   diet:'Vegetarian',
       health:'None',needs:'Mild dyslexia — extra time for written tests',
       hobbies:'Swimming, Puzzles',langs:'Malayalam, English',
       travel:'Own',busRoute:'',boarding:false,
       parentName:'Pradeep S.',parentPhone:'+91 94475 77701',
       behav:'Thoughtful, creative problem-solver — needs patient support with reading',
       expPref:'Verbal explanations, diagrams over text',
       fees:{term:33000,transport:0,hostel:0,activity:3000},status:'Active'},

      {id:'S013',name:'Vishnu Narayanan',    dob:'2012-08-30',cls:'Grade 8',section:'A',roll:8,
       adm:'2024-06-01',learningStyle:'Visual',    diet:'Vegetarian',
       health:'None',needs:'None',hobbies:'Chess, Coding',langs:'Malayalam, English',
       travel:'Bus',busRoute:'R001',boarding:false,
       parentName:'Narayanan V.',parentPhone:'+91 94476 88801',
       behav:'Analytical, logical, quiet but highly capable',expPref:'Problem-solving, individual challenge tasks',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},status:'Active'},

      {id:'S014',name:'Amala Thomas',        dob:'2012-12-20',cls:'Grade 8',section:'A',roll:9,
       adm:'2024-06-01',learningStyle:'Kinaesthetic',diet:'Non-Vegetarian',
       health:'None',needs:'None',hobbies:'Theatre, Volleyball',langs:'Malayalam, English',
       travel:'Bus',busRoute:'R002',boarding:false,
       parentName:'Thomas C.',parentPhone:'+91 94477 99901',
       behav:'Enthusiastic, team player, strong communicator',expPref:'Role play, group activities, drama',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},status:'Active'},

      {id:'S015',name:'Sherin Babu',          dob:'2012-04-09',cls:'Grade 8',section:'A',roll:10,
       adm:'2024-06-01',learningStyle:'Auditory',  diet:'Non-Vegetarian',
       health:'None',needs:'None',hobbies:'Cooking, Reading',langs:'Malayalam, English',
       travel:'Bus',busRoute:'R001',boarding:false,
       parentName:'Babu J.',parentPhone:'+91 94478 10101',
       behav:'Calm, attentive, consistent academic performance',expPref:'Listening, note-taking, clear instructions',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},status:'Active'},

      {id:'S016',name:'Adithya Krishnamohan',dob:'2012-06-03',cls:'Grade 8',section:'A',roll:11,
       adm:'2024-06-01',learningStyle:'Visual',    diet:'Vegetarian',
       health:'Asthma — inhaler in school bag',needs:'None',
       hobbies:'Sketching, Badminton',langs:'Malayalam, English, Hindi',
       travel:'Bus',busRoute:'R003',boarding:false,
       parentName:'Krishnamohan A.',parentPhone:'+91 94479 11201',
       behav:'Quiet achiever, very detail-oriented, needs encouragement to speak up',
       expPref:'Diagrams, step-by-step notes, visual examples',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},status:'Active'},

      {id:'S017',name:'Lakshmi Sunil',        dob:'2012-10-15',cls:'Grade 8',section:'A',roll:12,
       adm:'2024-06-01',learningStyle:'Reading',   diet:'Vegetarian',
       health:'None',needs:'None',hobbies:'Piano, Creative writing',langs:'Malayalam, English',
       travel:'Own',busRoute:'',boarding:false,
       parentName:'Sunil L.',parentPhone:'+91 94480 12301',
       behav:'Self-motivated, disciplined, high academic ambition',expPref:'Independent research, in-depth notes',
       fees:{term:33000,transport:0,hostel:0,activity:3000},status:'Active'},

      {id:'S018',name:'Rahul Rajan',          dob:'2012-01-27',cls:'Grade 8',section:'A',roll:13,
       adm:'2024-06-01',learningStyle:'Kinaesthetic',diet:'Non-Vegetarian',
       health:'None',needs:'None',hobbies:'Football, Basketball',langs:'Malayalam, English',
       travel:'Bus',busRoute:'R002',boarding:false,
       parentName:'Rajan M.',parentPhone:'+91 94481 13401',
       behav:'High energy, competitive, performs better with physical activity breaks',
       expPref:'Hands-on experiments, movement-based learning',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},status:'Active'},

      {id:'S019',name:'Noor Fathima',         dob:'2012-09-11',cls:'Grade 8',section:'A',roll:14,
       adm:'2024-06-01',learningStyle:'Visual',    diet:'Non-Vegetarian',
       health:'None',needs:'None',hobbies:'Henna art, Photography',langs:'Malayalam, English, Arabic',
       travel:'Bus',busRoute:'R001',boarding:false,
       parentName:'Faisal P.',parentPhone:'+91 94482 14501',
       behav:'Creative, perceptive, strong in arts and humanities',expPref:'Visual aids, colour-coded notes, mind maps',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},status:'Active'},

      {id:'S020',name:'Sreejith Menon',       dob:'2012-03-06',cls:'Grade 8',section:'A',roll:15,
       adm:'2024-06-01',learningStyle:'Auditory',  diet:'Vegetarian',
       health:'None',needs:'None',hobbies:'Carnatic music, Carrom',langs:'Malayalam, English, Sanskrit',
       travel:'Bus',busRoute:'R003',boarding:false,
       parentName:'Menon G.',parentPhone:'+91 94483 15601',
       behav:'Attentive, rhythmically inclined, learns well through patterns and repetition',
       expPref:'Songs, rhythmic patterns, oral recitation',
       fees:{term:33000,transport:6500,hostel:0,activity:3000},status:'Active'},
    ],
    candidates: [
      {id:'C001',name:'Priya Suresh', vacId:'V001',qual:'M.Sc Maths, B.Ed',exp:'5 yrs',score:88,status:'Shortlisted',interviewDate:'2026-10-05'},
      {id:'C002',name:'Anoop Varma',  vacId:'V001',qual:'M.Sc Maths, B.Ed',exp:'3 yrs',score:76,status:'Shortlisted',interviewDate:'2026-10-05'},
      {id:'C003',name:'Reshma K.',    vacId:'V002',qual:'MA English, B.Ed', exp:'6 yrs',score:91,status:'Recommended',interviewDate:'2026-09-28'},
    ],
    interviews: [],
    training: [
      {id:'TR001',title:'NEP 2020 — Competency Based Education',date:'2026-08-15',trainer:'Dr. Anitha Raj',duration:'Full day',topics:['CBE Framework','Portfolio Learning','Outcome Mapping'],attendees:['T001','T002','T003','T004','T005']},
      {id:'TR002',title:'SHAPE DLSS — Digital Classroom Tools',  date:'2026-09-02',trainer:'Muhd Zahal',    duration:'Half day',topics:['DLSS Overview','Resource Library','Lesson Planning'],attendees:['T001','T002','T003','T004']},
    ],

    // ── Inventory ────────────────────────────────────────────────────
    inventory: [
      {id:'INV001',name:'Laptops',           cat:'IT Equipment',total:42,working:39,repair:3,value:2100000},
      {id:'INV002',name:'Projectors',        cat:'IT Equipment',total:18,working:16,repair:2,value:540000},
      {id:'INV003',name:'Science Lab Sets',  cat:'Lab Equipment',total:12,working:12,repair:0,value:360000},
      {id:'INV004',name:'Student Desks',     cat:'Furniture',    total:420,working:414,repair:6,value:840000},
    ],

    // ── Books ────────────────────────────────────────────────────────
    books: [
      {id:'BK001',title:'Mathematics for Grade 8',cat:'Textbook', issuedTo:'S001',dueDate:'2026-10-20',status:'Issued'},
      {id:'BK002',title:'The Secret Garden',       cat:'Fiction',  issuedTo:'S005',dueDate:'2026-10-18',status:'Overdue'},
      {id:'BK003',title:'A Brief History of Time', cat:'Science',  issuedTo:'S004',dueDate:'2026-10-25',status:'Issued'},
      {id:'BK004',title:'Wings of Fire (Kalam)',   cat:'Biography',issuedTo:'S003',dueDate:'2026-10-28',status:'Issued'},
      {id:'BK005',title:'NCERT Science Grade 9',   cat:'Textbook', issuedTo:'S006',dueDate:'2026-10-16',status:'Overdue'},
    ],

    // ── Mess Stock ───────────────────────────────────────────────────
    messStock: [
      {item:'Rice (Ponni)',    unit:'kg',    qty:280,max:400,low:80,cost:58,  cat:'Staples'},
      {item:'Cooking Oil',    unit:'L',     qty:38, max:60, low:15,cost:145, cat:'Staples'},
      {item:'Dal (Mixed)',    unit:'kg',    qty:45, max:80, low:15,cost:98,  cat:'Staples'},
      {item:'Fresh Vegetables',unit:'kg',   qty:35, max:80, low:20,cost:40,  cat:'Fresh'},
      {item:'Eggs',           unit:'dozen', qty:18, max:40, low:10,cost:95,  cat:'Protein'},
    ],

    // ── Budget ───────────────────────────────────────────────────────
    budget: [
      {cat:'Teacher Salaries',     dept:'HR',       budgeted:18000000,actual:18000000},
      {cat:'Non-Teaching Salaries',dept:'HR',       budgeted:6000000, actual:5800000},
      {cat:'Transport — Total',    dept:'Transport',budgeted:4600000, actual:4820000},
      {cat:'Infrastructure',       dept:'Ops',      budgeted:2500000, actual:1900000},
      {cat:'Hostel & Mess',        dept:'Hostel',   budgeted:1600000, actual:1480000},
      {cat:'Library & Materials',  dept:'Academic', budgeted:450000,  actual:320000},
    ],

    // ── Audit Log ────────────────────────────────────────────────────
    auditLog: []
  };

  // ── Load / Save ───────────────────────────────────────────────────
  function load(){
    try {
      var raw = localStorage.getItem(KEY);
      if(raw){ 
        var parsed = JSON.parse(raw);
        // Merge: keep seed structure but overlay saved data
        return Object.assign({}, SEED, parsed);
      }
    } catch(e){}
    return JSON.parse(JSON.stringify(SEED)); // deep clone seed
  }

  function save(db){
    try { localStorage.setItem(KEY, JSON.stringify(db)); } catch(e){}
  }

  // ── Audit ─────────────────────────────────────────────────────────
  function audit(db, action, detail){
    db.auditLog.unshift({
      ts: new Date().toISOString(),
      action: action,
      detail: detail,
      user: 'Muhd Zahal'
    });
    if(db.auditLog.length > 200) db.auditLog.length = 200;
  }

  // ── Helpers ───────────────────────────────────────────────────────
  function genId(prefix){
    return prefix + Date.now().toString().slice(-6);
  }
  function fmt(n){ return '₹'+(n||0).toLocaleString('en-IN'); }
  function fmtL(n){ return '₹'+((n||0)/100000).toFixed(1)+'L'; }

  // ── Public API ────────────────────────────────────────────────────
  return {
    load: load,
    save: save,
    audit: audit,
    genId: genId,
    fmt: fmt,
    fmtL: fmtL,

    // Student helpers
    getStudent: function(db,id){ return db.students.find(function(s){return s.id===id;}); },
    getStudentName: function(db,id){ var s=db.students.find(function(x){return x.id===id;}); return s?s.name:'Unknown'; },
    getBoarders: function(db){ return db.students.filter(function(s){return s.boarding&&s.status==='Active';}); },
    getBusStudents: function(db,routeId){ return db.students.filter(function(s){return s.busRoute===routeId&&s.status==='Active';}); },

    // Staff helpers  
    getStaff: function(db,id){ return db.staff.find(function(s){return s.id===id;}); },
    getStaffName: function(db,id){ var s=db.staff.find(function(x){return x.id===id;}); return s?s.name:'Unknown'; },

    // Route helpers
    getRoute: function(db,id){ return db.routes.find(function(r){return r.id===id;}); },
    getRouteName: function(db,id){ var r=db.routes.find(function(x){return x.id===id;}); return r?r.name:'Unknown'; },

    // Fee helpers
    getStudentPayments: function(db,studentId){ return db.payments.filter(function(p){return p.studentId===studentId;}); },
    getTotalCollected: function(db){ return db.payments.reduce(function(a,p){return a+p.amount;},0); },

    // Reset (dev use)
    reset: function(){ localStorage.removeItem(KEY); location.reload(); }
  };
})();

import brandsEn from './brands.en';
import rolesEn from './roles.en';
import reposEn from './repos.en';
import cvEn from './cv.en';

const en = {
  ...brandsEn,
  ...cvEn,
  ...reposEn,
  ...rolesEn,
  // Per-route <title> and description, applied by <RouteMeta>. Unfurlers never
  // run JavaScript, so public/index.html carries the version a link preview
  // shows; these exist for the browser tab, the bookmark, the history entry,
  // and the crawlers that do render the page.
  // The closing band under the project catalogue. Every other route reaches
  // Contact through the navbar and the footer, so this is the one page that
  // earns a band of its own: it is where a reader who has gone through the
  // whole body of work ends up.
  talk: {
    title: 'Want to work together, or just share ideas?',
    lede:
      'Write to me. A project you want built, a team you want me on, or an idea you want to think through out loud — all three are good reasons to start the conversation.',
    cta: 'Get in touch',
  },
  // The game. Two voices: one for somebody who chose to come here, one for
  // somebody who arrived by mistyping a URL and deserves better than a blank
  // page.
  play: {
    badge: 'Coffee break',
    title: 'A laptop that jumps bugs',
    lede:
      'Every bug on the track is one I have actually shipped. The deploys floating past are worth 25 points, and missing one costs nothing — which is the only honest way to price a bonus in a game where the floor is already lava.',
    lostBadge: 'Error 404',
    lostTitle: 'This page does not exist',
    lostLede:
      'Something in the URL is off, or something on this site is. Either way, here is a laptop that jumps bugs while you decide where you meant to go.',
    score: 'Score',
    dodged: 'Bugs dodged',
    best: 'Best',
    ready: 'Ready when you are.',
    over: 'A bug got through. It happens in production too.',
    start: 'Start',
    again: 'Again',
    hint: 'Space, arrow up, or tap to jump.',
    canvasLabel: 'A pixel-art laptop running and jumping over bugs',
    note:
      'Written for this page: one canvas, no dependencies, and a hitbox slightly smaller than the sprite because pixel-perfect collision feels like cheating to the person holding the spacebar.',
    back: 'Back to the serious pages',
  },
  // The shell. Terse on purpose — a command that answers in a paragraph is a
  // command nobody types twice.
  term: {
    label: 'Site terminal',
    title: 'adal@portfolio — ~',
    placeholder: 'type a command…  (tab to complete)',
    inputLabel: 'Command',
    greeting: "Type 'help' if you are not sure where to start.",
    unknown: "'{cmd}': no such command. Try 'help'.",
    desc: {
      help: 'what you can type here',
      whoami: 'who I am, in three lines',
      ls: 'the project catalogue',
      cat: 'the CV',
      open: 'go to any page',
      decisions: 'the technical calls, and why',
      study: 'ten problems, with hints and answers',
      stack: 'the technologies I build with',
      play: 'a laptop that jumps bugs',
      contact: 'email and profiles',
      theme: 'switch light / dark',
      lang: 'switch English / Spanish',
      clear: 'clear the screen',
      sudo: 'the only command with privileges',
      exit: 'close the terminal',
    },
    help: {
      intro: 'Available commands below. Tab completes, ↑ repeats, Esc closes.',
      hint: 'Everything in the navbar can be reached by typing it.',
    },
    whoami: {
      line1: 'adal — Founding Software Engineer at Radii Manufacturing.',
      line2: 'Backend, cloud and AI systems. Founder of two companies.',
      line3: 'Zacatecas, Mexico · open to collaborate',
    },
    ls: {
      projects: '{n} projects catalogued. Opening the catalogue…',
      unknown: "nothing called '{arg}'. Try 'ls projects' or 'ls pages'.",
    },
    cat: {
      line: 'Full CV, two pages, current.',
      download: 'download CV.pdf',
      unknown: "'{arg}': no such file.",
    },
    open: {
      going: 'Opening {page}…',
      unknown: "'{arg}': no such page. The ones there are:",
    },
    decisions: {
      line: 'Opening the decision log…',
    },
    study: {
      line: 'Opening the study zone. There is coffee.',
    },
    stack: {
      line: 'Back to About — the technology section is halfway down.',
      hint: '395 marks in twelve groups. The ones with a number link to real projects.',
    },
    play: {
      line: 'Starting the game. Space to jump.',
    },
    contact: {
      line: 'Here is where to find me:',
    },
    theme: {
      line: 'Theme switched.',
    },
    lang: {
      line: 'Language switched.',
    },
    sudo: {
      granted: 'Permission granted. Opening contact…',
      nope: 'sudo: there is only one thing you can do with privileges here.',
      note: 'Proposals, ideas and hard questions all welcome.',
    },
    exit: {
      line: 'See you.',
    },
    footer: 'Open the terminal',
  },

  // The log. The form is an ADR on purpose: a decision written without the
  // options it beat is not a decision, it is an announcement.
  decisions: {
    badge: 'Log',
    title: 'Decisions',
    lede: 'The catalogue proves what I built and the stack proves what with. Neither shows the part a technical reader is actually assessing: what was chosen, over what, and why.',
    note: 'Almost all of my work lives in private repositories, so the code cannot be the evidence. The reasoning can.',
    parts: {
      options: 'Options',
      chose: 'Chose',
      why: 'Why',
      today: 'Today',
    },
    dates: {
      ongoing: 'Ongoing',
    },
    where: {
      radii: 'Radii Manufacturing',
      rbr: 'Release Before Ready',
      own: 'Own project',
      personal: 'Personal call',
      freelance: 'Freelance',
    },
    items: {
      breadth: {
        title: 'Why so many tools and areas instead of specialising',
        options: [
          'Specialise in one stack and be as good as possible at that',
          'Learn only what the work asks for, when it asks',
          'Deliberate breadth: try a lot, go deep where it sticks',
        ],
        chose: 'Breadth.',
        why: 'The industry moves at the speed of light, and learning something new or trying it out now costs a fraction of what it used to. That changes the maths: specialising early is a bet that the thing you specialised in stays the thing that matters. But the honest reason is not strategic — it is curiosity, and love for this industry. I want to know how things work before I know whether I will use them.',
        today: 'It is why the technology list on this site is so long, and also why only fourteen of those have a public project behind them. The breadth is real; the depth is where the work was, and those are not the same thing and should not read as if they were.',
      },
      services: {
        title: 'Why microservices, and not a monolith or something more complicated',
        options: [
          'A monolith: one deployment, comfortable at the start',
          'A modular monolith, with the boundaries held up by convention alone',
          'Separate services, one per responsibility',
        ],
        chose: 'Separate services, one per responsibility.',
        why: 'The decision is simple and it runs in both directions: a project cannot be a monolith, and it cannot be over-complicated either. Splitting by responsibility is precisely the line between those two. Each service does one thing, which is why it can be maintained and scaled without dragging the rest along with it. There are no services because the pattern sounds modern: there are as many as there are distinct responsibilities, and not one more.',
        today: 'It is what made it possible to move the whole platform from one cloud to another in two weeks: it migrated service by service rather than all at once.',
      },
      parallel: {
        title: 'Building things of my own while working at Radii',
        options: [
          'Focus on Radii alone and leave the rest for later',
          'Wait for more time, or more stability',
          'Build in parallel',
        ],
        chose: 'Build in parallel.',
        why: 'Radii is a place that pushes you to attempt mad things and to solve problems, and that is the reason, not the obstacle. Having projects of my own running at the same time is exactly the vision and the hunger this work asks for. They are not a distraction from what I do here: they are the same disposition, aimed at problems I chose myself.',
        today: 'Moonphase and StackSelect are both still being built, in parallel.',
      },
      quoter: {
        title: 'Pricing a part with no data to train on',
        options: [
          'Wait for enough history to train a model, and quote by hand in the meantime',
          'Train anyway, on the handful of examples there were',
          'A mathematical algorithm derived from the domain: geometry, material, finishing and volume',
        ],
        chose: 'The mathematical algorithm.',
        why: 'There was nothing to train on. A new company has no corpus of historical quotes, and on a handful of examples a model does not learn to price a part — it learns the habits of whoever priced those. A wrong price is also not a bad recommendation a user can ignore; it is a job lost or a job done at a loss, which means you have to be able to point at the term that produced it. But having no data was not an excuse to attempt nothing: the problem had structure — geometry, material, finishing and volume really do determine a cost — and that structure could be written down.',
        today: 'It is still in production and it is the reason a price comes out on its own. The ML conversation reopens when the history this algorithm has been generating is enough to train against something real.',
      },
      cloud: {
        title: 'Moving an entire platform from one cloud to another, in two weeks',
        options: [
          'Stay on Azure and absorb the cost',
          'Port service by service behind an abstraction layer of our own',
          'Port straight onto each provider’s SDKs, with no layer in between',
        ],
        chose: 'Port straight across, with no abstraction layer.',
        why: 'A layer that hid both clouds would have cost more to maintain than the two SDKs together, and it would have to be written for a migration that happens exactly once. The hard part was never moving compute and storage — it was the vision models. Working out what actually changes when they go from Azure AI Foundry to AWS Bedrock (what behaves the same, what does not, and where the difference shows up in the output) is the work that cannot be abstracted, because an abstraction is precisely the thing that hides the difference you need to see.',
        today: 'I would do it the same way again. The platform runs on AWS today and carries no compatibility debt to the cloud we left.',
      },
    },
    more: 'I add entries as decisions settle. The ones here have already been paid for — they are calls that have been running for a while, not proposals.',
    back: 'Back',
  },

  // The study zone. The tone is deliberate: it is the only page on this site
  // written for somebody who has not built any of the rest of it yet.
  study: {
    badge: 'Study zone',
    title: 'Ten problems and a coffee',
    lede: 'The same ten I hand to anyone who asks me where to start. Each teaches a different idea and none of them is here for being hard: they are here because the day I understood them, something else became clear.',
    note: 'The hint and the solution are folded on purpose. The minute you spend stuck is the one that works — open the answer straight away and the page has taught you nothing. And if you do get stuck, relax: being stuck is the job, not a symptom.',
    hintLabel: 'A hint',
    solutionLabel: 'See the solution',
    levels: { easy: 'approachable', medium: 'intermediate', hard: 'a thinker' },
    closing: 'If you solved one a different way, yours is probably fine too — there is rarely a single answer. And if one of them left you thinking, write to me. Those are good messages to get.',
    back: 'Back',
    items: {
      fizzbuzz: {
        title: 'FizzBuzz',
        statement: 'Print the numbers from 1 to 100. If a number is a multiple of 3, print “Fizz”. If it is a multiple of 5, “Buzz”. If it is a multiple of both, “FizzBuzz”.',
        hint: 'What about 15? It is a multiple of 3 and of 5 at once. If you ask about 3 first, you never reach the question that matters.',
        solution: [
          'The problem is not the modulo: it is the order. The most specific condition goes first, because the first one that matches wins. Ask about 3 before 15 and 15 comes out as “Fizz” — the program runs, the output is wrong, and nothing complains.',
          'For a lot of people this is the first time the order of their ifs turns out to be logic rather than style. That lesson is worth far more than the exercise.',
        ],
      },
      floats: {
        title: 'Why is 0.1 + 0.2 not 0.3?',
        statement: 'Open the browser console and type 0.1 + 0.2. You will not get 0.3. Why, and how do you compare two decimals without getting bitten?',
        hint: 'Write 1/3 as a decimal. It never ends. Now remember the machine does not count in base 10 but in base 2 — which fractions never end there?',
        solution: [
          'In binary, 0.1 and 0.2 are repeating fractions: they do not fit exactly in a double’s 64 bits, the same way 1/3 does not fit exactly in decimal. What you stored is not 0.1, it is the nearest representable number. Add two approximations and you get a third one.',
          'This is not a JavaScript bug: it is IEEE 754, and Python, Java and C all do the same. The practical rule is to compare within a tolerance rather than for equality — and for money, do not use floats at all: store cents as integers.',
        ],
      },
      reverse: {
        title: 'Reverse a string',
        statement: 'Given a string, return it backwards. However you like at first; then again, without using reverse().',
        hint: 'Think of two fingers, one at each end. Swap them and move them towards each other. When do you stop?',
        solution: [
          'The one-liner is fine and it is what you would write at work. The second version exists so you can see the two-pointer pattern, which you will reuse for the rest of this list.',
          'The detail: the loop stops when i meets j, not when it reaches the end. Keep going and you swap everything back into the original string. Also note [...s] rather than s.split(\'\'): the first respects emoji and combining accents, the second cuts them in half.',
        ],
      },
      palindrome: {
        title: 'Is it a palindrome?',
        statement: 'Decide whether a text reads the same forwards and backwards. “A man, a plan, a canal: Panama” does, despite the spaces and punctuation.',
        hint: 'Before comparing — what is different about “A” and “a”? And the spaces? Clean first, compare after.',
        solution: [
          'Almost all of this problem is normalisation, not comparison. Lowercase it, strip accents with normalize(\'NFD\'), drop anything that is not a letter or a digit. Only then does the algorithm start, and it is the same two pointers as before.',
          'It is a pattern that repeats for the rest of your career: when a text problem looks hard, it is usually because you are comparing things that are not in the same format yet.',
        ],
      },
      brackets: {
        title: 'Balanced brackets',
        statement: 'Given a text containing (), [] and {}, decide whether they are properly closed. “([]{})” is; “([)]” is not, even though it has the same count of each.',
        hint: 'Counting is not enough: “([)]” has two of each. What matters is the order. Which structure always gives you back the last thing you put in?',
        solution: [
          'A stack. Every opening symbol is pushed; every closing one has to match whatever is on top. If it does not match, or the stack was already empty, the text is wrong.',
          'The last detail is the one people forget: when you finish, the stack has to be empty. Anything left over was opened and never closed. This is the same algorithm a compiler uses on your code, at another scale.',
        ],
      },
      twosum: {
        title: 'Two numbers that add up to N',
        statement: 'Given an array of numbers and a target, find the positions of the two that add up to it. Do it in a single pass over the array.',
        hint: 'If you are standing on 7 and the target is 10, you know exactly what you are looking for. Can you ask whether you have already seen it, without walking back?',
        solution: [
          'The obvious version is two nested loops: O(n²). The good one takes a single pass, storing what it has seen in a Map. At each number you work out what is missing and ask whether it already went by.',
          'This is the exercise where a hash map finally makes sense: you trade memory for time. You store n numbers so you can stop walking the array n times. That trade is behind half the optimisations you will ever write.',
        ],
      },
      missing: {
        title: 'The missing number',
        statement: 'You have the numbers 1 to n, shuffled, with exactly one missing. Find it without sorting the array and without checking one by one.',
        hint: 'If nothing were missing, what would they all add up to? Gauss solved this at nine years old, without a computer.',
        solution: [
          'The sum from 1 to n is n(n+1)/2. Add up what you do have, subtract, and what is left over is the one that is gone. One pass and no extra memory.',
          'Worth knowing that with enough numbers that sum can overflow an integer, and that there is an XOR solution that never does. But the point of the exercise comes earlier: before you write code, ask whether the problem already has a mathematical answer.',
        ],
      },
      binary: {
        title: 'Binary search',
        statement: 'Find a number in an already sorted array. Every comparison should discard half of what is left.',
        hint: 'Write it, then run it on an array with one element, and then on an empty one. That is where it breaks.',
        solution: [
          'Everybody understands the idea; the implementation breaks at the edges. Three places it fails: a while using < instead of <= never checks the last candidate, and moving low or high to mid instead of mid+1 and mid-1 leaves the loop spinning forever.',
          'Note that mid is computed as low + (high - low) / 2 rather than (low + high) / 2. In JavaScript it makes no difference, but in languages with fixed-size integers the second form overflows on large arrays — a bug that sat in Java’s standard library for nine years.',
        ],
      },
      fib: {
        title: 'Fibonacci, from exponential to linear',
        statement: 'Write Fibonacci recursively. Ask it for term 45 and count the seconds. Then fix it.',
        hint: 'Draw the call tree for fib(6). How many times do you compute fib(3)? What if you wrote it down the first time?',
        solution: [
          'Naive recursion recomputes the same thing over and over: reaching fib(45) takes more than a billion calls. Storing each result the first time you compute it turns an exponential algorithm into a linear one, and it is three lines.',
          'That is memoisation, and it is the doorway into dynamic programming. What changes is not the algorithm but noticing that you were solving the same subproblem many times — a pattern that shows up in a great many problems that look unrelated.',
        ],
      },
      cycle: {
        title: 'The tortoise and the hare',
        statement: 'A linked list can contain a cycle: a node pointing backwards so the list never ends. Detect it without using extra memory.',
        hint: 'Two runners on a track, one going twice as fast. If the track is a loop, what happens sooner or later? And if it is a straight line?',
        solution: [
          'Two pointers: one moves one step at a time, the other two. If there is a cycle, the fast one laps the slow one and they eventually land on the same node. If there is not, the fast one reaches the end and you are done.',
          'It is Floyd’s algorithm. The interesting part is not that it works but that it uses constant memory: the obvious solution keeps every visited node in a Set, and this one keeps nothing. When somebody asks you to solve something “without extra memory”, they are usually asking for two pointers.',
        ],
      },
    },
  },

  // Notes about the site rather than about the work, which is why it lives
  // on its own page.
  changelog: {
    badge: 'Log',
    title: 'What has changed here',
    lede: 'This site is still being built. What has been added and when is kept here, in case anybody wonders whether it is still alive.',
    back: 'Back',
  },

  meta: {
    home: {
      title: 'Adal Cerrillo — Founding Software Engineer',
      description:
        'Founding Software Engineer at Radii Manufacturing, building the backend, cloud and AI systems behind an AI manufacturing platform. Founder of Moonphase and StackSelect.',
    },
    experience: {
      title: 'Experience · Adal Cerrillo',
      description:
        'Five fronts, one standard: Radii Manufacturing, independent clients, Evodeps, LABSOL Network and peer mentoring at CASE.',
    },
    ventures: {
      title: 'Ventures · Adal Cerrillo',
      description:
        'Moonphase and StackSelect: the two companies I founded, what each one is for, and where each one stands today.',
    },
    projects: {
      title: 'Projects · Adal Cerrillo',
      description:
        'Twenty projects, from systems delivered to public institutions to research and experiments: what each one solves, its stack, and its repository.',
    },
    contact: {
      title: 'Contact · Adal Cerrillo',
      description:
        'A project you want built, a team you want me on, or an idea you want to think through out loud. Write to me.',
    },
    radii: {
      title: 'Radii Manufacturing · Adal Cerrillo',
      description:
        'Founding Software Engineer: the backend, the cloud workers and the AI agents behind a platform that turns a CAD file into a quoted, manufactured, traceable part.',
    },
    stackselect: {
      title: 'StackSelect · Adal Cerrillo',
      description:
        'Bootcamps and a technical assessment platform aimed at placing developers with no prior experience into their first job.',
    },
    moonphase: {
      title: 'Moonphase · Adal Cerrillo',
      description:
        'Real automation and R&D on what nobody has solved yet, with method and a written record.',
    },
    evodeps: {
      title: 'Evodeps · Adal Cerrillo',
      description: 'Software, equipment and prototypes built to each client’s measure.',
    },
    freelance: {
      title: 'Independent engineering · Adal Cerrillo',
      description:
        'Engineering inside multidisciplinary teams: turning business problems into systems that are actually adopted.',
    },
    labsol: {
      title: 'LABSOL Network · Adal Cerrillo',
      description:
        'The free-software lab at COZCYT, where I led two projects delivered to the Autonomous University of Zacatecas and the state science council.',
    },
    case: {
      title: 'CASE · Adal Cerrillo',
      description:
        'Two years as a peer mentor, teaching the five subjects that decide who stays in an engineering degree.',
    },
    study: {
      title: 'Study zone · Adal Cerrillo',
      description:
        'Ten programming problems with a hint and a solution, for whoever is starting out.',
    },
    changelog: {
      title: 'Changes · Adal Cerrillo',
      description: 'What has been added to this site, and when.',
    },
    decisions: {
      title: 'Decisions · Adal Cerrillo',
      description:
        'A log of technical decisions: the options on the table, the one I took, why, and what it cost.',
    },
    play: {
      title: 'A laptop that jumps bugs · Adal Cerrillo',
      description:
        'A small endless runner written for this site: a pixel-art laptop jumping the bugs I have actually shipped.',
    },
    uaz: {
      title: 'Software Engineering, UAZ · Adal Cerrillo',
      description:
        'The degree behind the work: Software Engineering at the Autonomous University of Zacatecas, and what it actually taught.',
    },
  },
  footer: {
    tagline: 'Founding Software Engineer. Backend, cloud and AI systems — and the two companies I am building.',
    exploreLabel: 'Explore',
    reachLabel: 'Reach me',
    cvLabel: 'Curriculum',
    cvDownload: 'Download CV (PDF)',
    cvOpen: 'Open in the browser',
    changelog: 'Changes',
    kicker: 'Footnote',
    study: 'Study zone',
    decisions: 'Decision log',
    play: 'Or go jump some bugs →',
    prev: 'Previous joke',
    next: 'Next joke',
    credit: '© 2026 Adal Cerrillo · Handmade, on more coffee than advisable.',
    jokes: [
      'Stated life goal: to be the real-life Tony Stark, Jarvis included. The suit is on version 0.1, but Jarvis already runs locally — and unlike the original, this one asks for approval before deploying to production.',
      'When the suit is finally ready, the first ticket will be "the arc reactor has no integration tests".',
      'My favourite stack is still coffee, a terminal, and the phrase "it works on my machine".',
      'I know exactly how many unfinished projects I have. That figure is classified.',
      'The most elegant architecture I have ever designed is still the one I diagrammed before reading the full requirements.',
      'I ran a penetration test against my own house. The router won.',
      'I know seven programming languages and still google "how to center a div".',
      'My estimates are honest, and they always have to be doubled. Both of those are true at once.',
      'My disaster recovery plan is thoroughly documented. It is called git push.',
      'PSeInt is still the only environment that never broke a migration on me.',
      'I have forty tabs open and every one of them is "the important one".',
    ],
  },
  nav: {
    about: 'About Me',
    projects: 'Projects',
    experience: 'Experience',
    ventures: 'Ventures',
    contact: 'Contact',
    menu: 'Menu',
    closeMenu: 'Close menu',
  },
  contact: {
    badge: 'Contact',
    title: 'Let’s talk',
    lede: 'This is where anything we end up doing together starts. What I am usually looking for is below, in case it saves you half the message. I answer everything that comes in.',
    reasonsKicker: 'Who I am looking for',
    reasonsTitle: 'Why people usually write',
    reasons: {
      moonphase: {
        title: 'A client for Moonphase',
        body: 'Automation, systems built to fit, and problems that do not have a known solution yet. If yours is in the last category, all the better.',
        link: 'See Moonphase',
      },
      evodeps: {
        title: 'A client for Evodeps',
        body: 'Software, equipment and prototypes for operations that still run by hand. Public sector and private companies since 2025.',
        link: 'See Evodeps',
      },
      stackselect: {
        title: 'Joining StackSelect',
        body: 'If you finished your degree and still have not found your first job, this was built for exactly that. It opens formally in January 2027.',
        link: 'See StackSelect',
      },
      build: {
        title: 'Building something together',
        body: 'Partners, people to collaborate with on projects, or anybody with an idea neither of us could pull off alone.',
      },
      ideas: {
        title: 'Trading ideas, and building a scene',
        body: 'Arguing about the craft, showing me something you are building, or putting something together with the technical people around here. Those messages are the good ones and they need no excuse.',
      },
    },
    reasonsNote: 'And if you are none of those, write anyway. The list is here to save you time, not to screen you out.',
    fields: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
    },
    placeholders: {
      name: 'What should I call you?',
      email: 'you@email.com',
      subject: 'What is this about?',
      message: 'Tell me what you have in mind.',
    },
    send: 'Send message',
    sending: 'Sending…',
    sent: 'Message sent. I will reply as soon as I read it.',
    error: 'That did not send. Write to me directly at adalc3488@gmail.com.',
  },
  common: {
    skipToContent: 'Skip to content',
    language: 'Language',
    back: 'Back',
    backToExperience: 'Back to Experience',
    backToVentures: 'Back to Ventures',
    backToAbout: 'Back to About',
    scroll: 'Scroll',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    openRepo: 'source repository',
    prevShot: 'Previous screenshot',
    nextShot: 'Next screenshot',
    of: 'of',
    screenshots: 'screenshots',
    close: 'Close',
    zoomIn: 'Fill screen height',
    zoomOut: 'Fit image to screen',
    tapToZoom: 'Tap image to zoom',
    dragToExplore: 'Drag to explore',
    enlargedImage: 'Enlarged image',
  },
  about: {
    badge: 'About Me & Education',
    heading: 'About Me:',
    name: 'Adal Cerrillo',
    role: 'Software Engineer',
    bio: 'Full-stack software engineer building backend services, cloud infrastructure, and AI systems. At Radii Manufacturing I design the services behind core manufacturing workflows, build cloud workers on AWS that automate data processing, develop AI agents with LangGraph and LangChain, and maintain the CI/CD pipelines and observability that hold a microservices platform together. I work across Python, Java, JavaScript and C#, with Django, Spring Boot and React, and my interests run to distributed systems, event-driven architecture, LLM systems and RAG, and platform engineering. I trained as a software engineer at the Autonomous University of Zacatecas. My working axis is continuous innovation: applying emerging technology to influence the direction of the software industry, and integrating engineering, design and business judgement into solutions that hold up over time.',
    downloadCv: 'Download CV',
    cvFormat: 'PDF',
    openInBrowser: 'Open in browser',
    photoAlt: 'About Me',
  },
  skills: {
    heading: 'Skills',
    subheading: 'Technologies & Tools I Work With',
    groups: {
      languages: 'Languages',
      backend: 'Backend & architecture',
      ai: 'AI systems I build',
      aitools: 'Agents and models I work with',
      cloud: 'Cloud, hosting & DevOps',
      security: 'Security & offensive tooling',
      data: 'Data',
      frontend: 'Frontend & mobile',
      web: 'CMS, e-commerce & web',
      media: 'Games, animation & multimedia',
      tools: 'Tooling & practice',
      frontier: 'Frontiers I explore',
    },
    pseint: 'PSeInt (joke)',
  },
  education: {
    heading: 'Education:',
    university: 'Autonomous University of Zacatecas',
    years: '(2020 - 2024)',
    body: 'I completed my Software Engineering degree at the Academic Unit of Electrical Engineering at the Autonomous University of Zacatecas, where I consolidated the technical foundation of systems development and the judgement required to build high-quality solutions grounded in sound engineering practice.',
    description: 'The Autonomous University of Zacatecas Francisco García Salinas (UAZ) is the leading higher education institution in Zacatecas, Mexico. It is organized into academic areas and units focused on teaching, research, extension, and academic management. UAZ serves students from Zacatecas and other states in fields such as biology, humanities, engineering, languages, arts, agriculture, and exact sciences. The university actively promotes science, technology, and innovation.',
  },
  certifications: {
    heading: 'Certifications & Achievements:',
    icp: 'Internet Computer Certification (2023)',
    somece: 'INTERNATIONAL CONGRESS SOMECE 2024',
  },
  experience: {
    radii: {
      company: 'Radii Manufacturing',
      period: 'Jul 2025 — Present',
      title: 'Founding Software Engineer',
      body: "Founding Software Engineer at Radii Manufacturing, a startup automating manufacturing through an AI-powered platform and a network of manufacturers, and one of the most promising startups in Latin America. I define the company's technical direction alongside the founding team — the stack, the architecture, and the engineering practices the platform is built on — turning an early-stage product into a system the business can scale on. In the first year: the platform’s entire infrastructure migrated in two weeks, the automatic quoting engine built on a mathematical pricing algorithm — which returns the price with no human in the loop, and took what the AI does flag for manual review from five days to one — and 80% of the operations team’s recurring work automated with AI agents.",
    },
    freelance: {
      company: 'Freelance',
      period: 'Jan 2025 — Present',
      title: 'Software Engineer',
      body: 'I build software for clients as an independent engineer, within multidisciplinary teams — design, domain experts and other engineers — to translate business problems into systems that are actually adopted. Technology selection responds to the requirements of the problem and is documented through trade-off analysis, with full accountability for the result from initial gathering through to delivery.',
    },
    labsol: {
      company: 'Labsol Network',
      period: 'Sep 2023 — Nov 2024',
      title: 'Software Developer Intern',
      body: 'Part of the Free Software Laboratory team at COZCYT, where I led two projects delivered to the Autonomous University of Zacatecas and the Zacatecan Council of Science, Technology and Innovation. Owning delivery end to end sharpened my full-stack development, requirements analysis, software design, testing, and project management.',
    },
    case: {
      company: 'Centre for Learning and Student Services',
      period: '2022 — 2023',
      title: 'Peer Mentor · Student Volunteer',
      body: 'Two years volunteering at CASE while I was an undergraduate myself, helping other Software Engineering and Computer Engineering students through the subjects giving them trouble: Algebra, Calculus, Object-Oriented Programming, Data Structures, and Discrete Mathematics. More than thirty students came through those sessions. It was the student community looking after itself, and it is where I learned to hand knowledge over rather than just hold it.',
    },
  },
  projects: {
    badge: 'Featured Projects & Portfolio',
    pbienestar: {
      title: 'Appointment Scheduling System',
      label: 'Punto Bienestar',
      body: "Appointment scheduling system for a professional psychological care clinic. Administrators manage specialists' availability and review appointment details before confirming, keeping clinical judgement in the loop rather than handing scheduling to an automated queue. The system notifies patients, specialists, and administrators by email as appointments change, and writes confirmed appointments into users' Google Calendars through the Calendar API, so reminders operate within the scheduling tool they already use. Access is protected with JSON Web Token authentication.",
    },
    cosiap: {
      title: 'Sistema de Apoyos COZCyT',
      label: 'Cosiap',
      body: 'Grant management platform for the Zacatecan Council of Science, Technology and Innovation. Before it, every application for public research and entrepreneurship funding was submitted on paper. The platform moved the process online: applicants upload their documentation digitally and administrators manage the applications in one system. Built during my internship at LABSOL Network as part of the delivery team.',
    },
    cargas: {
      title: 'Sistema de Cargas UAIE',
      label: 'Cargas',
      body: "Course-load and scheduling platform for the Faculty of Electrical Engineering at the Autonomous University of Zacatecas. Program coordinators build each semester's timetable, assign professors, and keep course information in one place, with the system catching conflicts between professors and class groups before a timetable is published — the problem the platform was commissioned to solve. Built during my social service with LABSOL Network.",
    },
    bazarSol: {
      title: 'Bazar Sol',
      label: 'Bazar Sol',
      body: 'E-commerce platform for a clothing retailer, built as a university project. Administrators own the catalogue: adding stock, adjusting prices, and maintaining product descriptions. Customers consult the catalogue, keep a private favourites list, and add items to a cart to reserve them.',
    },
    rentazac: {
      title: 'RentaZac',
      label: 'RentaZac',
      body: 'Rental listings platform for the student community in Zacatecas. Students and landlords in the city were coordinating housing through scattered social media posts; RentaZac centralises listing and search in a dedicated platform. Built as a university project.',
    },
  },
};

export default en;

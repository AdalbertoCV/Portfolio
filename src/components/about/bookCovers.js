// A cover for every book on the reading list, keyed by the exact title in
// reading.js. Most come from Open Library; the few it lacks from the
// publisher or the book's own site. All are 120px wide — 2.5x the size the
// list shows them at — and a few kilobytes each.

import coverAiEngineering from '../../images/books/ai-engineering.jpg';
import coverBuildALargeLanguageModelFromScratch from '../../images/books/build-a-large-language-model-from-scratch.jpg';
import coverHandsOnLargeLanguageModels from '../../images/books/hands-on-large-language-models.jpg';
import coverDesigningMachineLearningSystems from '../../images/books/designing-machine-learning-systems.jpg';
import coverHandsOnMachineLearningWithScikitLearnKer from '../../images/books/hands-on-machine-learning-with-scikit-learn-keras-tensorflow.jpg';
import coverLlmEngineersHandbook from '../../images/books/llm-engineers-handbook.jpg';
import coverDesigningMultiAgentSystems from '../../images/books/designing-multi-agent-systems.jpg';
import coverBuildingApplicationsWithAiAgents from '../../images/books/building-applications-with-ai-agents.jpg';
import coverNaturalLanguageProcessingWithTransformer from '../../images/books/natural-language-processing-with-transformers.jpg';
import coverPromptEngineeringForLlms from '../../images/books/prompt-engineering-for-llms.jpg';
import coverBuildingLlmsForProduction from '../../images/books/building-llms-for-production.jpg';
import coverAiAgentsInAction from '../../images/books/ai-agents-in-action.jpg';
import coverPromptEngineeringForGenerativeAi from '../../images/books/prompt-engineering-for-generative-ai.jpg';
import coverTheHundredPageLanguageModelsBook from '../../images/books/the-hundred-page-language-models-book.jpg';
import coverTheHundredPageMachineLearningBook from '../../images/books/the-hundred-page-machine-learning-book.jpg';
import coverDeepLearning from '../../images/books/deep-learning.jpg';
import coverWhyMachinesLearnTheElegantMathBehindMode from '../../images/books/why-machines-learn-the-elegant-math-behind-modern-ai.jpg';
import coverCoIntelligenceLivingAndWorkingWithAi from '../../images/books/co-intelligence-living-and-working-with-ai.jpg';
import coverTheAlignmentProblemMachineLearningAndHum from '../../images/books/the-alignment-problem-machine-learning-and-human-values.jpg';
import coverThePragmaticProgrammer from '../../images/books/the-pragmatic-programmer.jpg';
import coverCleanCode from '../../images/books/clean-code.jpg';
import coverRefactoring from '../../images/books/refactoring.jpg';
import coverDesigningDataIntensiveApplications from '../../images/books/designing-data-intensive-applications.jpg';
import coverTheMythicalManMonth from '../../images/books/the-mythical-man-month.jpg';
import coverDontMakeMeThink from '../../images/books/dont-make-me-think.jpg';
import coverExtremeOwnership from '../../images/books/extreme-ownership.jpg';
import coverHighOutputManagement from '../../images/books/high-output-management.jpg';
import coverTheManagersPath from '../../images/books/the-managers-path.jpg';
import coverStaffEngineerLeadershipBeyondTheManageme from '../../images/books/staff-engineer-leadership-beyond-the-management-track.jpg';
import coverTheHardThingAboutHardThings from '../../images/books/the-hard-thing-about-hard-things.jpg';
import coverTeamTopologies from '../../images/books/team-topologies.jpg';
import coverCodeComplete from '../../images/books/code-complete.jpg';
import coverAPhilosophyOfSoftwareDesign from '../../images/books/a-philosophy-of-software-design.jpg';
import coverWorkingEffectivelyWithLegacyCode from '../../images/books/working-effectively-with-legacy-code.jpg';
import coverTestDrivenDevelopmentByExample from '../../images/books/test-driven-development-by-example.jpg';
import coverTidyFirst from '../../images/books/tidy-first.jpg';
import coverDesignPatterns from '../../images/books/design-patterns.jpg';
import coverGrowingObjectOrientedSoftwareGuidedByTests from '../../images/books/growing-object-oriented-software-guided-by-tests.jpg';
import coverStructureAndInterpretationOfComputerPrograms from '../../images/books/structure-and-interpretation-of-computer-programs.jpg';
import coverCodeTheHiddenLanguageOfComputerHardwareAndSof from '../../images/books/code-the-hidden-language-of-computer-hardware-and-software.jpg';
import coverIntroductionToAlgorithms from '../../images/books/introduction-to-algorithms.jpg';
import coverGrokkingAlgorithms from '../../images/books/grokking-algorithms.jpg';
import coverProgrammingPearls from '../../images/books/programming-pearls.jpg';
import coverSoftwareEngineeringAtGoogle from '../../images/books/software-engineering-at-google.jpg';
import coverModernSoftwareEngineering from '../../images/books/modern-software-engineering.jpg';
import coverFundamentalsOfSoftwareArchitecture from '../../images/books/fundamentals-of-software-architecture.jpg';
import coverSoftwareArchitectureTheHardParts from '../../images/books/software-architecture-the-hard-parts.jpg';
import coverCleanArchitecture from '../../images/books/clean-architecture.jpg';
import coverDomainDrivenDesign from '../../images/books/domain-driven-design.jpg';
import coverBuildingMicroservices from '../../images/books/building-microservices.jpg';
import coverBuildingEvolutionaryArchitectures from '../../images/books/building-evolutionary-architectures.jpg';
import coverPatternsOfEnterpriseApplicationArchitecture from '../../images/books/patterns-of-enterprise-application-architecture.jpg';
import coverEnterpriseIntegrationPatterns from '../../images/books/enterprise-integration-patterns.jpg';
import coverDesigningDistributedSystems from '../../images/books/designing-distributed-systems.jpg';
import coverDatabaseInternals from '../../images/books/database-internals.jpg';
import coverSystemDesignInterviewAnInsidersGuide from '../../images/books/system-design-interview-an-insiders-guide.jpg';
import coverReleaseIt from '../../images/books/release-it.jpg';
import coverSiteReliabilityEngineering from '../../images/books/site-reliability-engineering.jpg';
import coverContinuousDelivery from '../../images/books/continuous-delivery.jpg';
import coverTheDevopsHandbook from '../../images/books/the-devops-handbook.jpg';
import coverAccelerate from '../../images/books/accelerate.jpg';
import coverThePhoenixProject from '../../images/books/the-phoenix-project.jpg';
import coverThinkingInSystems from '../../images/books/thinking-in-systems.jpg';
import coverAnElegantPuzzle from '../../images/books/an-elegant-puzzle.jpg';
import coverTheMakingOfAManager from '../../images/books/the-making-of-a-manager.jpg';
import coverRadicalCandor from '../../images/books/radical-candor.jpg';
import coverTheFiveDysfunctionsOfATeam from '../../images/books/the-five-dysfunctions-of-a-team.jpg';
import coverPeopleware from '../../images/books/peopleware.jpg';
import coverTurnTheShipAround from '../../images/books/turn-the-ship-around.jpg';
import coverCrucialConversations from '../../images/books/crucial-conversations.jpg';
import coverMultipliers from '../../images/books/multipliers.jpg';
import coverTheCultureCode from '../../images/books/the-culture-code.jpg';
import coverDrive from '../../images/books/drive.jpg';
import coverTheEffectiveExecutive from '../../images/books/the-effective-executive.jpg';
import coverLeadersEatLast from '../../images/books/leaders-eat-last.jpg';
import coverGoodToGreat from '../../images/books/good-to-great.jpg';
import coverTheLeanStartup from '../../images/books/the-lean-startup.jpg';
import coverZeroToOne from '../../images/books/zero-to-one.jpg';
import coverTheMomTest from '../../images/books/the-mom-test.jpg';
import coverInspired from '../../images/books/inspired.jpg';
import coverEmpowered from '../../images/books/empowered.jpg';
import coverContinuousDiscoveryHabits from '../../images/books/continuous-discovery-habits.jpg';
import coverEscapingTheBuildTrap from '../../images/books/escaping-the-build-trap.jpg';
import coverShapeUp from '../../images/books/shape-up.jpg';
import coverTheDesignOfEverydayThings from '../../images/books/the-design-of-everyday-things.jpg';
import coverHooked from '../../images/books/hooked.jpg';
import coverCrossingTheChasm from '../../images/books/crossing-the-chasm.jpg';
import coverTheInnovatorsDilemma from '../../images/books/the-innovators-dilemma.jpg';
import coverGoodStrategyBadStrategy from '../../images/books/good-strategy-bad-strategy.jpg';
import coverPlayingToWin from '../../images/books/playing-to-win.jpg';
import coverBlueOceanStrategy from '../../images/books/blue-ocean-strategy.jpg';
import coverMeasureWhatMatters from '../../images/books/measure-what-matters.jpg';
import coverTraction from '../../images/books/traction.jpg';
import coverTheColdStartProblem from '../../images/books/the-cold-start-problem.jpg';
import coverRework from '../../images/books/rework.jpg';
import coverThinkingFastAndSlow from '../../images/books/thinking-fast-and-slow.jpg';
import coverThinkingInBets from '../../images/books/thinking-in-bets.jpg';
import coverSuperforecasting from '../../images/books/superforecasting.jpg';
import coverTheSignalAndTheNoise from '../../images/books/the-signal-and-the-noise.jpg';
import coverTheBlackSwan from '../../images/books/the-black-swan.jpg';
import coverAntifragile from '../../images/books/antifragile.jpg';
import coverTheScoutMindset from '../../images/books/the-scout-mindset.jpg';
import coverPoorCharliesAlmanack from '../../images/books/poor-charlies-almanack.jpg';
import coverAlgorithmsToLiveBy from '../../images/books/algorithms-to-live-by.jpg';
import coverInfluence from '../../images/books/influence.jpg';
import coverDeepWork from '../../images/books/deep-work.jpg';
import coverAtomicHabits from '../../images/books/atomic-habits.jpg';
import coverMindset from '../../images/books/mindset.jpg';
import coverRange from '../../images/books/range.jpg';
import coverMakeItStick from '../../images/books/make-it-stick.jpg';
import coverUltralearning from '../../images/books/ultralearning.jpg';
import coverTheArtOfDoingScienceAndEngineering from '../../images/books/the-art-of-doing-science-and-engineering.jpg';
import coverSurelyYoureJokingMrFeynman from '../../images/books/surely-youre-joking-mr-feynman.jpg';
import coverGodelEscherBach from '../../images/books/godel-escher-bach.jpg';
import coverCosmos from '../../images/books/cosmos.jpg';
import coverABriefHistoryOfTime from '../../images/books/a-brief-history-of-time.jpg';
import coverAstrophysicsForPeopleInAHurry from '../../images/books/astrophysics-for-people-in-a-hurry.jpg';
import coverTheFirstThreeMinutes from '../../images/books/the-first-three-minutes.jpg';
import coverTheFeynmanLecturesOnPhysics from '../../images/books/the-feynman-lectures-on-physics.jpg';
import coverQedTheStrangeTheoryOfLightAndMatter from '../../images/books/qed-the-strange-theory-of-light-and-matter.jpg';
import coverQuantumMechanicsTheTheoreticalMinimum from '../../images/books/quantum-mechanics-the-theoretical-minimum.jpg';
import coverSevenBriefLessonsOnPhysics from '../../images/books/seven-brief-lessons-on-physics.jpg';
import coverTheElegantUniverse from '../../images/books/the-elegant-universe.jpg';
import coverTheRoadToReality from '../../images/books/the-road-to-reality.jpg';
import coverWhatIsMathematics from '../../images/books/what-is-mathematics.jpg';
import coverInfinitePowers from '../../images/books/infinite-powers.jpg';
import coverFermatsEnigma from '../../images/books/fermats-enigma.jpg';
import coverChaosMakingANewScience from '../../images/books/chaos-making-a-new-science.jpg';
import coverTheDisappearingSpoon from '../../images/books/the-disappearing-spoon.jpg';
import coverNapoleonsButtons from '../../images/books/napoleons-buttons.jpg';
import coverWhatIsLife from '../../images/books/what-is-life.jpg';
import coverTheSelfishGene from '../../images/books/the-selfish-gene.jpg';
import coverTheGeneAnIntimateHistory from '../../images/books/the-gene-an-intimate-history.jpg';
import coverRefactoringUi from '../../images/books/refactoring-ui.jpg';
import coverTheNonDesignersDesignBook from '../../images/books/the-non-designers-design-book.jpg';
import coverAboutFaceTheEssentialsOfInteractionDesign from '../../images/books/about-face-the-essentials-of-interaction-design.jpg';
import coverTheElementsOfUserExperience from '../../images/books/the-elements-of-user-experience.jpg';
import coverLawsOfUx from '../../images/books/laws-of-ux.jpg';
import coverN100ThingsEveryDesignerNeedsToKnowAboutPeople from '../../images/books/100-things-every-designer-needs-to-know-about-people.jpg';
import coverDesigningInterfaces from '../../images/books/designing-interfaces.jpg';
import coverUniversalPrinciplesOfDesign from '../../images/books/universal-principles-of-design.jpg';
import coverThinkingWithType from '../../images/books/thinking-with-type.jpg';
import coverGridSystemsInGraphicDesign from '../../images/books/grid-systems-in-graphic-design.jpg';
import coverInteractionOfColor from '../../images/books/interaction-of-color.jpg';
import coverAtomicDesign from '../../images/books/atomic-design.jpg';
import coverMicrointeractions from '../../images/books/microinteractions.jpg';
import coverInclusiveDesignPatterns from '../../images/books/inclusive-design-patterns.jpg';
import coverJustEnoughResearch from '../../images/books/just-enough-research.jpg';
import coverLeanUx from '../../images/books/lean-ux.jpg';
import coverSprint from '../../images/books/sprint.jpg';
import coverTheArtOfReadableCode from '../../images/books/the-art-of-readable-code.jpg';
import coverObviouslyAwesome from '../../images/books/obviously-awesome.jpg';

const BOOK_COVERS = {
  'AI Engineering': coverAiEngineering,
  'Build a Large Language Model (From Scratch)': coverBuildALargeLanguageModelFromScratch,
  'Hands-On Large Language Models': coverHandsOnLargeLanguageModels,
  'Designing Machine Learning Systems': coverDesigningMachineLearningSystems,
  'Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow': coverHandsOnMachineLearningWithScikitLearnKer,
  'LLM Engineer’s Handbook': coverLlmEngineersHandbook,
  'Designing Multi-Agent Systems': coverDesigningMultiAgentSystems,
  'Building Applications with AI Agents': coverBuildingApplicationsWithAiAgents,
  'Natural Language Processing with Transformers': coverNaturalLanguageProcessingWithTransformer,
  'Prompt Engineering for LLMs': coverPromptEngineeringForLlms,
  'Building LLMs for Production': coverBuildingLlmsForProduction,
  'AI Agents in Action': coverAiAgentsInAction,
  'Prompt Engineering for Generative AI': coverPromptEngineeringForGenerativeAi,
  'The Hundred-Page Language Models Book': coverTheHundredPageLanguageModelsBook,
  'The Hundred-Page Machine Learning Book': coverTheHundredPageMachineLearningBook,
  'Deep Learning': coverDeepLearning,
  'Why Machines Learn: The Elegant Math Behind Modern AI': coverWhyMachinesLearnTheElegantMathBehindMode,
  'Co-Intelligence: Living and Working with AI': coverCoIntelligenceLivingAndWorkingWithAi,
  'The Alignment Problem: Machine Learning and Human Values': coverTheAlignmentProblemMachineLearningAndHum,
  'The Pragmatic Programmer': coverThePragmaticProgrammer,
  'Clean Code': coverCleanCode,
  'Refactoring': coverRefactoring,
  'Designing Data-Intensive Applications': coverDesigningDataIntensiveApplications,
  'The Mythical Man-Month': coverTheMythicalManMonth,
  'Don’t Make Me Think': coverDontMakeMeThink,
  'Extreme Ownership': coverExtremeOwnership,
  'High Output Management': coverHighOutputManagement,
  'The Manager’s Path': coverTheManagersPath,
  'Staff Engineer: Leadership Beyond the Management Track': coverStaffEngineerLeadershipBeyondTheManageme,
  'The Hard Thing About Hard Things': coverTheHardThingAboutHardThings,
  'Team Topologies': coverTeamTopologies,
  'Code Complete': coverCodeComplete,
  'A Philosophy of Software Design': coverAPhilosophyOfSoftwareDesign,
  'Working Effectively with Legacy Code': coverWorkingEffectivelyWithLegacyCode,
  'Test-Driven Development: By Example': coverTestDrivenDevelopmentByExample,
  'Tidy First?': coverTidyFirst,
  'Design Patterns': coverDesignPatterns,
  'Growing Object-Oriented Software, Guided by Tests': coverGrowingObjectOrientedSoftwareGuidedByTests,
  'Structure and Interpretation of Computer Programs': coverStructureAndInterpretationOfComputerPrograms,
  'Code: The Hidden Language of Computer Hardware and Software': coverCodeTheHiddenLanguageOfComputerHardwareAndSof,
  'Introduction to Algorithms': coverIntroductionToAlgorithms,
  'Grokking Algorithms': coverGrokkingAlgorithms,
  'Programming Pearls': coverProgrammingPearls,
  'Software Engineering at Google': coverSoftwareEngineeringAtGoogle,
  'Modern Software Engineering': coverModernSoftwareEngineering,
  'Fundamentals of Software Architecture': coverFundamentalsOfSoftwareArchitecture,
  'Software Architecture: The Hard Parts': coverSoftwareArchitectureTheHardParts,
  'Clean Architecture': coverCleanArchitecture,
  'Domain-Driven Design': coverDomainDrivenDesign,
  'Building Microservices': coverBuildingMicroservices,
  'Building Evolutionary Architectures': coverBuildingEvolutionaryArchitectures,
  'Patterns of Enterprise Application Architecture': coverPatternsOfEnterpriseApplicationArchitecture,
  'Enterprise Integration Patterns': coverEnterpriseIntegrationPatterns,
  'Designing Distributed Systems': coverDesigningDistributedSystems,
  'Database Internals': coverDatabaseInternals,
  'System Design Interview – An Insider’s Guide': coverSystemDesignInterviewAnInsidersGuide,
  'Release It!': coverReleaseIt,
  'Site Reliability Engineering': coverSiteReliabilityEngineering,
  'Continuous Delivery': coverContinuousDelivery,
  'The DevOps Handbook': coverTheDevopsHandbook,
  'Accelerate': coverAccelerate,
  'The Phoenix Project': coverThePhoenixProject,
  'Thinking in Systems': coverThinkingInSystems,
  'An Elegant Puzzle': coverAnElegantPuzzle,
  'The Making of a Manager': coverTheMakingOfAManager,
  'Radical Candor': coverRadicalCandor,
  'The Five Dysfunctions of a Team': coverTheFiveDysfunctionsOfATeam,
  'Peopleware': coverPeopleware,
  'Turn the Ship Around!': coverTurnTheShipAround,
  'Crucial Conversations': coverCrucialConversations,
  'Multipliers': coverMultipliers,
  'The Culture Code': coverTheCultureCode,
  'Drive': coverDrive,
  'The Effective Executive': coverTheEffectiveExecutive,
  'Leaders Eat Last': coverLeadersEatLast,
  'Good to Great': coverGoodToGreat,
  'The Lean Startup': coverTheLeanStartup,
  'Zero to One': coverZeroToOne,
  'The Mom Test': coverTheMomTest,
  'Inspired': coverInspired,
  'Empowered': coverEmpowered,
  'Continuous Discovery Habits': coverContinuousDiscoveryHabits,
  'Escaping the Build Trap': coverEscapingTheBuildTrap,
  'Shape Up': coverShapeUp,
  'The Design of Everyday Things': coverTheDesignOfEverydayThings,
  'Hooked': coverHooked,
  'Crossing the Chasm': coverCrossingTheChasm,
  'The Innovator’s Dilemma': coverTheInnovatorsDilemma,
  'Good Strategy Bad Strategy': coverGoodStrategyBadStrategy,
  'Playing to Win': coverPlayingToWin,
  'Blue Ocean Strategy': coverBlueOceanStrategy,
  'Measure What Matters': coverMeasureWhatMatters,
  'Traction': coverTraction,
  'The Cold Start Problem': coverTheColdStartProblem,
  'Rework': coverRework,
  'Thinking, Fast and Slow': coverThinkingFastAndSlow,
  'Thinking in Bets': coverThinkingInBets,
  'Superforecasting': coverSuperforecasting,
  'The Signal and the Noise': coverTheSignalAndTheNoise,
  'The Black Swan': coverTheBlackSwan,
  'Antifragile': coverAntifragile,
  'The Scout Mindset': coverTheScoutMindset,
  'Poor Charlie’s Almanack': coverPoorCharliesAlmanack,
  'Algorithms to Live By': coverAlgorithmsToLiveBy,
  'Influence': coverInfluence,
  'Deep Work': coverDeepWork,
  'Atomic Habits': coverAtomicHabits,
  'Mindset': coverMindset,
  'Range': coverRange,
  'Make It Stick': coverMakeItStick,
  'Ultralearning': coverUltralearning,
  'The Art of Doing Science and Engineering': coverTheArtOfDoingScienceAndEngineering,
  'Surely You’re Joking, Mr. Feynman!': coverSurelyYoureJokingMrFeynman,
  'Gödel, Escher, Bach': coverGodelEscherBach,
  'Cosmos': coverCosmos,
  'A Brief History of Time': coverABriefHistoryOfTime,
  'Astrophysics for People in a Hurry': coverAstrophysicsForPeopleInAHurry,
  'The First Three Minutes': coverTheFirstThreeMinutes,
  'The Feynman Lectures on Physics': coverTheFeynmanLecturesOnPhysics,
  'QED: The Strange Theory of Light and Matter': coverQedTheStrangeTheoryOfLightAndMatter,
  'Quantum Mechanics: The Theoretical Minimum': coverQuantumMechanicsTheTheoreticalMinimum,
  'Seven Brief Lessons on Physics': coverSevenBriefLessonsOnPhysics,
  'The Elegant Universe': coverTheElegantUniverse,
  'The Road to Reality': coverTheRoadToReality,
  'What Is Mathematics?': coverWhatIsMathematics,
  'Infinite Powers': coverInfinitePowers,
  'Fermat’s Enigma': coverFermatsEnigma,
  'Chaos: Making a New Science': coverChaosMakingANewScience,
  'The Disappearing Spoon': coverTheDisappearingSpoon,
  'Napoleon’s Buttons': coverNapoleonsButtons,
  'What Is Life?': coverWhatIsLife,
  'The Selfish Gene': coverTheSelfishGene,
  'The Gene: An Intimate History': coverTheGeneAnIntimateHistory,
  'Refactoring UI': coverRefactoringUi,
  'The Non-Designer’s Design Book': coverTheNonDesignersDesignBook,
  'About Face: The Essentials of Interaction Design': coverAboutFaceTheEssentialsOfInteractionDesign,
  'The Elements of User Experience': coverTheElementsOfUserExperience,
  'Laws of UX': coverLawsOfUx,
  '100 Things Every Designer Needs to Know About People': coverN100ThingsEveryDesignerNeedsToKnowAboutPeople,
  'Designing Interfaces': coverDesigningInterfaces,
  'Universal Principles of Design': coverUniversalPrinciplesOfDesign,
  'Thinking with Type': coverThinkingWithType,
  'Grid Systems in Graphic Design': coverGridSystemsInGraphicDesign,
  'Interaction of Color': coverInteractionOfColor,
  'Atomic Design': coverAtomicDesign,
  'Microinteractions': coverMicrointeractions,
  'Inclusive Design Patterns': coverInclusiveDesignPatterns,
  'Just Enough Research': coverJustEnoughResearch,
  'Lean UX': coverLeanUx,
  'Sprint': coverSprint,
  'The Art of Readable Code': coverTheArtOfReadableCode,
  'Obviously Awesome': coverObviouslyAwesome,
};

export default BOOK_COVERS;

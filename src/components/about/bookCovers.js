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
};

export default BOOK_COVERS;

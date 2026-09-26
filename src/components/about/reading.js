// The recommended reading, grouped by what each shelf is for.
//
// Titles and authors stay in English in both languages, like the product names
// in the stack: these are published works with one name each, and translating
// "Designing Data-Intensive Applications" would send a reader looking for a
// book that does not exist. Only the group labels change language, and those
// live in the dictionary.
const READING = [
  {
    id: 'ai',
    books: [
      { title: 'AI Engineering', author: 'Chip Huyen', icon: 'architecture' },
      { title: 'Build a Large Language Model (From Scratch)', author: 'Sebastian Raschka', icon: 'rag' },
      { title: 'Hands-On Large Language Models', author: 'Jay Alammar & Maarten Grootendorst', icon: 'rag' },
      { title: 'Designing Machine Learning Systems', author: 'Chip Huyen', icon: 'ml' },
      {
        title: 'Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow',
        author: 'Aurélien Géron',
        icon: 'ml',
      },
      { title: 'LLM Engineer’s Handbook', author: 'Paul Iusztin & Maxime Labonne', icon: 'craft' },
      { title: 'Designing Multi-Agent Systems', author: 'Victor Dibia', icon: 'multiAgent' },
      { title: 'Building Applications with AI Agents', author: 'Michael Albada', icon: 'agents' },
      {
        title: 'Natural Language Processing with Transformers',
        author: 'Lewis Tunstall, Leandro von Werra & Thomas Wolf',
        icon: 'rag',
      },
      { title: 'Prompt Engineering for LLMs', author: 'John Berryman & Albert Ziegler', icon: 'prompt' },
      { title: 'Building LLMs for Production', author: 'Louis-François Bouchard & Louie Peters', icon: 'observability' },
      { title: 'AI Agents in Action', author: 'Micheal Lanham', icon: 'agents' },
      { title: 'Prompt Engineering for Generative AI', author: 'James Phoenix & Mike Taylor', icon: 'prompt' },
      { title: 'The Hundred-Page Language Models Book', author: 'Andriy Burkov', icon: 'rag' },
      { title: 'The Hundred-Page Machine Learning Book', author: 'Andriy Burkov', icon: 'ml' },
      { title: 'Deep Learning', author: 'Ian Goodfellow, Yoshua Bengio & Aaron Courville', icon: 'ml' },
      {
        title: 'Why Machines Learn: The Elegant Math Behind Modern AI',
        author: 'Anil Ananthaswamy',
        icon: 'exactSciences',
      },
      { title: 'Co-Intelligence: Living and Working with AI', author: 'Ethan Mollick', icon: 'ethics' },
      {
        title: 'The Alignment Problem: Machine Learning and Human Values',
        author: 'Brian Christian',
        icon: 'ethics',
      },
    ],
  },
  {
    id: 'craft',
    books: [
      { title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas', icon: 'craft' },
      { title: 'Clean Code', author: 'Robert C. Martin', icon: 'craft' },
      { title: 'Refactoring', author: 'Martin Fowler', icon: 'refactor' },
      { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', icon: 'distributed' },
      { title: 'The Mythical Man-Month', author: 'Frederick P. Brooks Jr.', icon: 'projectPlan' },
      { title: 'Don’t Make Me Think', author: 'Steve Krug', icon: 'usability' },
    ],
  },
  {
    id: 'leadership',
    books: [
      { title: 'Extreme Ownership', author: 'Jocko Willink & Leif Babin', icon: 'ownership' },
      { title: 'High Output Management', author: 'Andrew S. Grove', icon: 'scale' },
      { title: 'The Manager’s Path', author: 'Camille Fournier', icon: 'strategy' },
      {
        title: 'Staff Engineer: Leadership Beyond the Management Track',
        author: 'Will Larson',
        icon: 'endToEnd',
      },
      { title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz', icon: 'entrepreneur' },
      { title: 'Team Topologies', author: 'Matthew Skelton & Manuel Pais', icon: 'crossFunctional' },
    ],
  },
];

export const BOOK_COUNT = READING.reduce((total, group) => total + group.books.length, 0);

export default READING;

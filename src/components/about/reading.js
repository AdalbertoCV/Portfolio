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
      { title: 'AI Engineering', author: 'Chip Huyen' },
      { title: 'Build a Large Language Model (From Scratch)', author: 'Sebastian Raschka' },
      { title: 'Hands-On Large Language Models', author: 'Jay Alammar & Maarten Grootendorst' },
      { title: 'Designing Machine Learning Systems', author: 'Chip Huyen' },
      {
        title: 'Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow',
        author: 'Aurélien Géron',
      },
      { title: 'LLM Engineer’s Handbook', author: 'Paul Iusztin & Maxime Labonne' },
      { title: 'Designing Multi-Agent Systems', author: 'Victor Dibia' },
      { title: 'Building Applications with AI Agents', author: 'Michael Albada' },
      {
        title: 'Natural Language Processing with Transformers',
        author: 'Lewis Tunstall, Leandro von Werra & Thomas Wolf',
      },
      { title: 'Prompt Engineering for LLMs', author: 'John Berryman & Albert Ziegler' },
      { title: 'Building LLMs for Production', author: 'Louis-François Bouchard & Louie Peters' },
      { title: 'AI Agents in Action', author: 'Micheal Lanham' },
      { title: 'Prompt Engineering for Generative AI', author: 'James Phoenix & Mike Taylor' },
      { title: 'The Hundred-Page Language Models Book', author: 'Andriy Burkov' },
      { title: 'The Hundred-Page Machine Learning Book', author: 'Andriy Burkov' },
      { title: 'Deep Learning', author: 'Ian Goodfellow, Yoshua Bengio & Aaron Courville' },
      {
        title: 'Why Machines Learn: The Elegant Math Behind Modern AI',
        author: 'Anil Ananthaswamy',
      },
      { title: 'Co-Intelligence: Living and Working with AI', author: 'Ethan Mollick' },
      {
        title: 'The Alignment Problem: Machine Learning and Human Values',
        author: 'Brian Christian',
      },
    ],
  },
  {
    id: 'craft',
    books: [
      { title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas' },
      { title: 'Clean Code', author: 'Robert C. Martin' },
      { title: 'Refactoring', author: 'Martin Fowler' },
      { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann' },
      { title: 'The Mythical Man-Month', author: 'Frederick P. Brooks Jr.' },
    ],
  },
  {
    id: 'leadership',
    books: [
      { title: 'Extreme Ownership', author: 'Jocko Willink & Leif Babin' },
      { title: 'High Output Management', author: 'Andrew S. Grove' },
      { title: 'The Manager’s Path', author: 'Camille Fournier' },
      {
        title: 'Staff Engineer: Leadership Beyond the Management Track',
        author: 'Will Larson',
      },
      { title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz' },
      { title: 'Team Topologies', author: 'Matthew Skelton & Manuel Pais' },
    ],
  },
];

export const BOOK_COUNT = READING.reduce((total, group) => total + group.books.length, 0);

export default READING;

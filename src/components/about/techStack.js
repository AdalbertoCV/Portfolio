// The stack, as tiles. Kept out of the component because it is a data table,
// not markup, and because the accuracy rule below is easier to enforce when the
// whole list is visible in one file.
//
// ACCURACY RULE: a logo is only attached to a skill the CV actually claims.
// "IaC" and "CI/CD" are claimed; Terraform and GitHub Actions specifically are
// not, so those stay as text tiles rather than borrowing a logo that would
// assert a tool that was never listed.
//
// Every entry without a vendor logo carries a `concept` instead, drawn by
// ConceptIcons.jsx. No tile falls back to initials.
//
// `mono: true` marks a logo that is solid black. Those are inverted in dark
// mode (see about.css); the full-colour ones are left alone, because inverting
// them would produce colours the brand does not own.

import python from '../../images/tech/python.svg';
import java from '../../images/tech/java.svg';
import javascript from '../../images/tech/javascript.svg';
import csharp from '../../images/tech/csharp.svg';
import django from '../../images/tech/django.svg';
import djangorest from '../../images/tech/djangorest.svg';
import spring from '../../images/tech/spring.svg';
import langchain from '../../images/tech/langchain.svg';
import aws from '../../images/tech/aws.svg';
import azure from '../../images/tech/azure.svg';
import docker from '../../images/tech/docker.svg';
import kubernetes from '../../images/tech/kubernetes.svg';
import linux from '../../images/tech/linux.svg';
import mysql from '../../images/tech/mysql.svg';
import postgresql from '../../images/tech/postgresql.svg';
import sqlite from '../../images/tech/sqlite.svg';
import oracle from '../../images/tech/oracle.svg';
import mongodb from '../../images/tech/mongodb.svg';
import redis from '../../images/tech/redis.svg';
import react from '../../images/tech/react.svg';
import html5 from '../../images/tech/html5.svg';
import css3 from '../../images/tech/css3.svg';
import tailwind from '../../images/tech/tailwind.svg';
import bootstrap from '../../images/tech/bootstrap.svg';
import git from '../../images/tech/git.svg';
import github from '../../images/tech/github.svg';
import postman from '../../images/tech/postman.svg';
import selenium from '../../images/tech/selenium.svg';
import figma from '../../images/tech/figma.svg';
import miro from '../../images/tech/miro.svg';
import linear from '../../images/tech/linear.svg';
import jira from '../../images/tech/jira.svg';
import trello from '../../images/tech/trello.svg';
import notion from '../../images/tech/notion.svg';
import flutter from '../../images/tech/flutter.svg';
import dart from '../../images/tech/dart.svg';
import typescriptIcon from '../../images/tech/typescript.svg';
import goIcon from '../../images/tech/go.svg';
import phpIcon from '../../images/tech/php.svg';
import vaadinIcon from '../../images/tech/vaadin.svg';
import laravelIcon from '../../images/tech/laravel.svg';
import ginIcon from '../../images/tech/gin.svg';
import angularIcon from '../../images/tech/angular.svg';
import astroIcon from '../../images/tech/astro.svg';
import claudeIcon from '../../images/tech/claude.svg';
import orcaIcon from '../../images/tech/orca.svg';
import opencodeIcon from '../../images/tech/opencode.svg';
import openclawIcon from '../../images/tech/openclaw.svg';
import nemoclawIcon from '../../images/tech/nemoclaw.svg';
import openaiIcon from '../../images/tech/openai.svg';
import copilotIcon from '../../images/tech/githubcopilot.svg';
import ollamaIcon from '../../images/tech/ollama.svg';
import deepseekIcon from '../../images/tech/deepseek.svg';
import slackIcon from '../../images/tech/slack.svg';
import jwt from '../../images/jwt.png';

const TECH_GROUPS = [
  {
    id: 'languages',
    items: [
      { name: 'Python', icon: python },
      { name: 'Java', icon: java },
      { name: 'JavaScript', icon: javascript },
      { name: 'TypeScript', icon: typescriptIcon },
      { name: 'C#', icon: csharp },
      { name: 'Go', icon: goIcon },
      { name: 'PHP', icon: phpIcon },
      { name: 'SQL', concept: 'sql' },
    ],
  },
  {
    id: 'backend',
    items: [
      { name: 'Django', icon: django },
      // Dark maroon wordmark on a transparent ground: invisible on the dark
      // card, and too coloured to inverse. It gets a light plate instead.
      { name: 'Django REST', icon: djangorest, plate: true },
      { name: 'Spring Boot', icon: spring },
      { name: 'Vaadin', icon: vaadinIcon },
      { name: 'Laravel', icon: laravelIcon },
      // simple-icons ships one black path, so it inverts in dark like the
      // other monochrome marks here.
      { name: 'Gin', icon: ginIcon, mono: true },
      { name: 'Microservices', concept: 'microservices' },
      { name: 'Event-driven', concept: 'eventDriven' },
      { name: 'Distributed systems', concept: 'distributed' },
      { name: 'JWT', icon: jwt },
      { name: 'OAuth', concept: 'oauth' },
      { name: 'Async task flows', concept: 'async' },
    ],
  },
  {
    id: 'ai',
    items: [
      { name: 'LangChain', icon: langchain, mono: true },
      { name: 'LangGraph', concept: 'langgraph' },
      { name: 'AI Agents', concept: 'agents' },
      { name: 'LLM & RAG', concept: 'rag' },
      { name: 'Machine Learning', concept: 'ml' },
      { name: 'Multi-agent', concept: 'multiAgent' },
    ],
  },
  {
    // The agents and runtimes actually used day to day, as opposed to the group
    // above, which is about building AI systems rather than working with them.
    // Only tools genuinely in use are listed — this is a CV, not a survey of
    // what exists.
    id: 'aitools',
    items: [
      { name: 'Claude Code', icon: claudeIcon, mono: true },
      { name: 'Codex', icon: openaiIcon, mono: true },
      { name: 'GitHub Copilot', icon: copilotIcon, mono: true },
      // These three ship their own artwork and none of them invert. OpenCode's
      // app tile carries its own dark ground; OpenClaw is Molty, their mascot,
      // taken as SVG rather than the app icon PNG — that one is RGB with no
      // alpha, so on a dark card it rendered as a white block around the
      // lobster; NemoClaw is an NVIDIA project and uses their green symbol.
      { name: 'Orca', icon: orcaIcon },
      { name: 'OpenCode', icon: opencodeIcon },
      { name: 'OpenClaw', icon: openclawIcon },
      { name: 'NemoClaw', icon: nemoclawIcon },
      { name: 'Ollama', icon: ollamaIcon, mono: true },
      { name: 'DeepSeek', icon: deepseekIcon, mono: true },
    ],
  },
  {
    id: 'cloud',
    items: [
      { name: 'AWS', icon: aws },
      { name: 'Azure', icon: azure },
      { name: 'Docker', icon: docker },
      { name: 'Kubernetes', icon: kubernetes },
      { name: 'Linux', icon: linux },
      { name: 'IaC', concept: 'iac' },
      { name: 'CI/CD', concept: 'cicd' },
      { name: 'Observability', concept: 'observability' },
      { name: 'Cloud security', concept: 'cloudSecurity' },
      { name: 'FinOps', concept: 'finops' },
    ],
  },
  {
    id: 'data',
    items: [
      { name: 'PostgreSQL', icon: postgresql },
      { name: 'MySQL', icon: mysql },
      { name: 'MongoDB', icon: mongodb },
      { name: 'Redis', icon: redis },
      { name: 'SQLite', icon: sqlite },
      { name: 'Oracle', icon: oracle },
      { name: 'Stream processing', concept: 'stream' },
      { name: 'Time-series', concept: 'timeSeries' },
    ],
  },
  {
    id: 'frontend',
    items: [
      { name: 'React', icon: react },
      { name: 'Angular', icon: angularIcon },
      { name: 'Astro', icon: astroIcon },
      { name: 'HTML5', icon: html5 },
      { name: 'CSS3', icon: css3 },
      { name: 'Tailwind', icon: tailwind },
      { name: 'Bootstrap', icon: bootstrap },
      { name: 'Flutter', icon: flutter },
      { name: 'Dart', icon: dart },
    ],
  },
  {
    id: 'tools',
    items: [
      { name: 'Git', icon: git },
      { name: 'GitHub', icon: github, mono: true },
      { name: 'Postman', icon: postman },
      { name: 'Selenium', icon: selenium },
      { name: 'Figma', icon: figma },
      { name: 'Miro', icon: miro, mono: true },
      { name: 'Linear', icon: linear, mono: true },
      { name: 'Slack', icon: slackIcon },
      { name: 'Jira', icon: jira },
      { name: 'Trello', icon: trello },
      { name: 'Notion', icon: notion, mono: true },
    ],
  },
  {
    id: 'frontier',
    items: [
      { name: 'Blockchain / Web3', concept: 'blockchain' },
      { name: 'IoT & IIoT', concept: 'iot' },
      { name: 'Edge & Edge AI', concept: 'edge' },
      { name: 'Digital twins', concept: 'digitalTwin' },
      { name: 'Real-time systems', concept: 'realtime' },
      { name: 'Optimization', concept: 'optimization' },
      { name: 'Control systems', concept: 'control' },
    ],
  },
];

// A tile with no logo gets a monogram instead of a blank square: up to two
// initials, skipping the joining words that would produce a meaningless "&".
export const monogram = (name) => {
  const words = name
    .split(/[\s/&·]+/)
    .filter((word) => word && !['and', 'y', 'de', '&'].includes(word.toLowerCase()));
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

export default TECH_GROUPS;

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
// Every mark on the wall is a silhouette. A grid that was two-thirds
// monochrome and one-third full colour read as an accident rather than as a
// decision, so the colour marks were replaced by their own brands' single-tone
// versions (or flattened to black in place, where no such version is
// published). `mono: true` inverts the file in dark mode; `flat: true` does
// the same for the two marks that only exist as PNGs, by filter rather than by
// inversion — see about.css.

import python from '../../images/tech/python.svg';
import java from '../../images/tech/java.svg';
import javascript from '../../images/tech/javascript.svg';
import csharp from '../../images/tech/csharp.svg';
import django from '../../images/tech/django.svg';
import djangorest from '../../images/tech/djangorest.svg';
import spring from '../../images/tech/spring.svg';
import langchain from '../../images/tech/langchain.svg';
import pandasIcon from '../../images/tech/pandas.svg';
import colabIcon from '../../images/tech/googlecolab.svg';
import kaggleIcon from '../../images/tech/kaggle.svg';
import tensorflowIcon from '../../images/tech/tensorflow.svg';
import huggingfaceIcon from '../../images/tech/huggingface.svg';
import aws from '../../images/tech/aws.svg';
import azure from '../../images/tech/azure.svg';
import docker from '../../images/tech/docker.svg';
import kubernetes from '../../images/tech/kubernetes.svg';
import linux from '../../images/tech/linux.svg';
import mysql from '../../images/tech/mysql.svg';
import postgresql from '../../images/tech/postgresql.svg';
import sqlite from '../../images/tech/sqlite.svg';
import oracle from '../../images/tech/oracle.svg';
import airflowIcon from '../../images/tech/apacheairflow.svg';
import sparkIcon from '../../images/tech/apachespark.svg';
import dbtIcon from '../../images/tech/dbt.svg';
import snowflakeIcon from '../../images/tech/snowflake.svg';
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
import rIcon from '../../images/tech/r.svg';
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
import cursorIcon from '../../images/tech/cursor.svg';
import ollamaIcon from '../../images/tech/ollama.svg';
import n8nIcon from '../../images/tech/n8n.svg';
import deepseekIcon from '../../images/tech/deepseek.svg';
import grokIcon from '../../images/tech/grok.svg';
import slackIcon from '../../images/tech/slack.svg';
import herokuIcon from '../../images/tech/heroku.svg';
import vercelIcon from '../../images/tech/vercel.svg';
import contaboIcon from '../../images/tech/contabo.svg';
import hostingerIcon from '../../images/tech/hostinger.svg';
import obsidianIcon from '../../images/tech/obsidian.svg';
import adonisIcon from '../../images/tech/adonisjs.svg';
import nodeIcon from '../../images/tech/nodedotjs.svg';
import expressIcon from '../../images/tech/express.svg';
import nextIcon from '../../images/tech/nextdotjs.svg';
import vueIcon from '../../images/tech/vuedotjs.svg';
import fastapiIcon from '../../images/tech/fastapi.svg';
import flaskIcon from '../../images/tech/flask.svg';
import rustIcon from '../../images/tech/rust.svg';
import cIcon from '../../images/tech/c.svg';
import cppIcon from '../../images/tech/cplusplus.svg';
import kotlinIcon from '../../images/tech/kotlin.svg';
import graphqlIcon from '../../images/tech/graphql.svg';
import rabbitmqIcon from '../../images/tech/rabbitmq.svg';
import kafkaIcon from '../../images/tech/apachekafka.svg';
import supabaseIcon from '../../images/tech/supabase.svg';
import wordpressIcon from '../../images/tech/wordpress.svg';
import woocommerceIcon from '../../images/tech/woocommerce.svg';
import elementorIcon from '../../images/tech/elementor.svg';
import pseintIcon from '../../images/tech/pseint.png';
import kaliIcon from '../../images/tech/kalilinux.svg';
import wiresharkIcon from '../../images/tech/wireshark.svg';
import burpIcon from '../../images/tech/burpsuite.svg';
import metasploitIcon from '../../images/tech/metasploit.svg';
import jwt from '../../images/jwt.png';
import langgraphIcon from '../../images/tech/langgraph.svg';
import scalaIcon from '../../images/tech/scala.svg';
import swiftIcon from '../../images/tech/swift.svg';
import rubyIcon from '../../images/tech/ruby.svg';
import elixirIcon from '../../images/tech/elixir.svg';
import haskellIcon from '../../images/tech/haskell.svg';
import zigIcon from '../../images/tech/zig.svg';
import juliaIcon from '../../images/tech/julia.svg';
import luaIcon from '../../images/tech/lua.svg';
import perlIcon from '../../images/tech/perl.svg';
import gnubashIcon from '../../images/tech/gnubash.svg';
import solidityIcon from '../../images/tech/solidity.svg';
import ocamlIcon from '../../images/tech/ocaml.svg';
import erlangIcon from '../../images/tech/erlang.svg';
import clojureIcon from '../../images/tech/clojure.svg';
import fsharpIcon from '../../images/tech/fsharp.svg';
import apachegroovyIcon from '../../images/tech/apachegroovy.svg';
import assemblyscriptIcon from '../../images/tech/assemblyscript.svg';
import nestjsIcon from '../../images/tech/nestjs.svg';
import ktorIcon from '../../images/tech/ktor.svg';
import quarkusIcon from '../../images/tech/quarkus.svg';
import phoenixframeworkIcon from '../../images/tech/phoenixframework.svg';
import rubyonrailsIcon from '../../images/tech/rubyonrails.svg';
import dotnetIcon from '../../images/tech/dotnet.svg';
import trpcIcon from '../../images/tech/trpc.svg';
import denoIcon from '../../images/tech/deno.svg';
import bunIcon from '../../images/tech/bun.svg';
import celeryIcon from '../../images/tech/celery.svg';
import honoIcon from '../../images/tech/hono.svg';
import symfonyIcon from '../../images/tech/symfony.svg';
import socketdotioIcon from '../../images/tech/socketdotio.svg';
import apachetomcatIcon from '../../images/tech/apachetomcat.svg';
import swaggerIcon from '../../images/tech/swagger.svg';
import prismaIcon from '../../images/tech/prisma.svg';
import sequelizeIcon from '../../images/tech/sequelize.svg';
import hibernateIcon from '../../images/tech/hibernate.svg';
import mastraIcon from '../../images/tech/mastra.svg';
import crewaiIcon from '../../images/tech/crewai.svg';
import ag2Icon from '../../images/tech/ag2.svg';
import agnoIcon from '../../images/tech/agno.svg';
import pydanticIcon from '../../images/tech/pydantic.svg';
import haystackIcon from '../../images/tech/haystack.svg';
import difyIcon from '../../images/tech/dify.svg';
import langflowIcon from '../../images/tech/langflow.svg';
import temporalIcon from '../../images/tech/temporal.svg';
import modelcontextprotocolIcon from '../../images/tech/modelcontextprotocol.svg';
import modalIcon from '../../images/tech/modal.svg';
import rayIcon from '../../images/tech/ray.svg';
import vllmIcon from '../../images/tech/vllm.svg';
import weightsandbiasesIcon from '../../images/tech/weightsandbiases.svg';
import herdrIcon from '../../images/tech/herdr.svg';
import clineIcon from '../../images/tech/cline.svg';
import windsurfIcon from '../../images/tech/windsurf.svg';
import zedindustriesIcon from '../../images/tech/zedindustries.svg';
import googlegeminiIcon from '../../images/tech/googlegemini.svg';
import qwenIcon from '../../images/tech/qwen.svg';
import openrouterIcon from '../../images/tech/openrouter.svg';
import replicateIcon from '../../images/tech/replicate.svg';
import mistralaiIcon from '../../images/tech/mistralai.svg';
import perplexityIcon from '../../images/tech/perplexity.svg';
import terraformIcon from '../../images/tech/terraform.svg';
import pulumiIcon from '../../images/tech/pulumi.svg';
import ansibleIcon from '../../images/tech/ansible.svg';
import githubactionsIcon from '../../images/tech/githubactions.svg';
import gitlabIcon from '../../images/tech/gitlab.svg';
import jenkinsIcon from '../../images/tech/jenkins.svg';
import argoIcon from '../../images/tech/argo.svg';
import helmIcon from '../../images/tech/helm.svg';
import googlecloudIcon from '../../images/tech/googlecloud.svg';
import digitaloceanIcon from '../../images/tech/digitalocean.svg';
import cloudflareIcon from '../../images/tech/cloudflare.svg';
import podmanIcon from '../../images/tech/podman.svg';
import redhatopenshiftIcon from '../../images/tech/redhatopenshift.svg';
import rancherIcon from '../../images/tech/rancher.svg';
import portainerIcon from '../../images/tech/portainer.svg';
import nomadIcon from '../../images/tech/nomad.svg';
import packerIcon from '../../images/tech/packer.svg';
import consulIcon from '../../images/tech/consul.svg';
import vaultIcon from '../../images/tech/vault.svg';
import istioIcon from '../../images/tech/istio.svg';
import ciliumIcon from '../../images/tech/cilium.svg';
import nginxIcon from '../../images/tech/nginx.svg';
import caddyIcon from '../../images/tech/caddy.svg';
import traefikproxyIcon from '../../images/tech/traefikproxy.svg';
import prometheusIcon from '../../images/tech/prometheus.svg';
import grafanaIcon from '../../images/tech/grafana.svg';
import opentelemetryIcon from '../../images/tech/opentelemetry.svg';
import sentryIcon from '../../images/tech/sentry.svg';
import datadogIcon from '../../images/tech/datadog.svg';
import elasticstackIcon from '../../images/tech/elasticstack.svg';
import clickhouseIcon from '../../images/tech/clickhouse.svg';
import neo4jIcon from '../../images/tech/neo4j.svg';
import apachecassandraIcon from '../../images/tech/apachecassandra.svg';
import elasticsearchIcon from '../../images/tech/elasticsearch.svg';
import duckdbIcon from '../../images/tech/duckdb.svg';
import databricksIcon from '../../images/tech/databricks.svg';
import googlebigqueryIcon from '../../images/tech/googlebigquery.svg';
import trinoIcon from '../../images/tech/trino.svg';
import apacheflinkIcon from '../../images/tech/apacheflink.svg';
import apachepulsarIcon from '../../images/tech/apachepulsar.svg';
import timescaleIcon from '../../images/tech/timescale.svg';
import influxdbIcon from '../../images/tech/influxdb.svg';
import qdrantIcon from '../../images/tech/qdrant.svg';
import milvusIcon from '../../images/tech/milvus.svg';
import sqlalchemyIcon from '../../images/tech/sqlalchemy.svg';
import minioIcon from '../../images/tech/minio.svg';
import apachehadoopIcon from '../../images/tech/apachehadoop.svg';
import dbeaverIcon from '../../images/tech/dbeaver.svg';
import svelteIcon from '../../images/tech/svelte.svg';
import solidIcon from '../../images/tech/solid.svg';
import qwikIcon from '../../images/tech/qwik.svg';
import remixIcon from '../../images/tech/remix.svg';
import nuxtIcon from '../../images/tech/nuxt.svg';
import viteIcon from '../../images/tech/vite.svg';
import reduxIcon from '../../images/tech/redux.svg';
import reactqueryIcon from '../../images/tech/reactquery.svg';
import threedotjsIcon from '../../images/tech/threedotjs.svg';
import d3Icon from '../../images/tech/d3.svg';
import framerIcon from '../../images/tech/framer.svg';
import storybookIcon from '../../images/tech/storybook.svg';
import shadcnuiIcon from '../../images/tech/shadcnui.svg';
import muiIcon from '../../images/tech/mui.svg';
import chakrauiIcon from '../../images/tech/chakraui.svg';
import sassIcon from '../../images/tech/sass.svg';
import lessIcon from '../../images/tech/less.svg';
import electronIcon from '../../images/tech/electron.svg';
import tauriIcon from '../../images/tech/tauri.svg';
import expoIcon from '../../images/tech/expo.svg';
import ionicIcon from '../../images/tech/ionic.svg';
import capacitorIcon from '../../images/tech/capacitor.svg';
import webpackIcon from '../../images/tech/webpack.svg';
import babelIcon from '../../images/tech/babel.svg';
import eslintIcon from '../../images/tech/eslint.svg';
import prettierIcon from '../../images/tech/prettier.svg';
import cypressIcon from '../../images/tech/cypress.svg';
import jestIcon from '../../images/tech/jest.svg';
import vitestIcon from '../../images/tech/vitest.svg';
import testinglibraryIcon from '../../images/tech/testinglibrary.svg';
import owaspIcon from '../../images/tech/owasp.svg';
import parrotsecurityIcon from '../../images/tech/parrotsecurity.svg';
import torprojectIcon from '../../images/tech/torproject.svg';
import hacktheboxIcon from '../../images/tech/hackthebox.svg';
import tryhackmeIcon from '../../images/tech/tryhackme.svg';
import hackeroneIcon from '../../images/tech/hackerone.svg';
import bugcrowdIcon from '../../images/tech/bugcrowd.svg';
import virustotalIcon from '../../images/tech/virustotal.svg';
import snykIcon from '../../images/tech/snyk.svg';
import trivyIcon from '../../images/tech/trivy.svg';
import splunkIcon from '../../images/tech/splunk.svg';
import keycloakIcon from '../../images/tech/keycloak.svg';
import auth0Icon from '../../images/tech/auth0.svg';
import oktaIcon from '../../images/tech/okta.svg';
import openvpnIcon from '../../images/tech/openvpn.svg';
import wireguardIcon from '../../images/tech/wireguard.svg';
import letsencryptIcon from '../../images/tech/letsencrypt.svg';
import bitwardenIcon from '../../images/tech/bitwarden.svg';
import gnuprivacyguardIcon from '../../images/tech/gnuprivacyguard.svg';

const TECH_GROUPS = [
  {
    id: 'languages',
    items: [
      { name: 'Python', icon: python, mono: true },
      { name: 'Java', icon: java, mono: true },
      { name: 'JavaScript', icon: javascript, mono: true },
      { name: 'TypeScript', icon: typescriptIcon, mono: true },
      { name: 'C#', icon: csharp, mono: true },
      { name: 'Go', icon: goIcon, mono: true },
      { name: 'PHP', icon: phpIcon, mono: true },
      { name: 'R', icon: rIcon, mono: true },
      // The systems end: C and C++ where the code has to answer to the
      // hardware, Rust where that has to happen without the footguns, Kotlin
      // on the JVM side next to Java.
      { name: 'Rust', icon: rustIcon, mono: true },
      { name: 'C', icon: cIcon, mono: true },
      { name: 'C++', icon: cppIcon, mono: true },
      { name: 'Kotlin', icon: kotlinIcon, mono: true },
      { name: 'SQL', concept: 'sql' },
      { name: 'Scala', icon: scalaIcon, mono: true },
      { name: 'Swift', icon: swiftIcon, mono: true },
      { name: 'Ruby', icon: rubyIcon, mono: true },
      { name: 'Elixir', icon: elixirIcon, mono: true },
      { name: 'Haskell', icon: haskellIcon, mono: true },
      { name: 'Zig', icon: zigIcon, mono: true },
      { name: 'Julia', icon: juliaIcon, mono: true },
      { name: 'Lua', icon: luaIcon, mono: true },
      { name: 'Perl', icon: perlIcon, mono: true },
      { name: 'Bash', icon: gnubashIcon, mono: true },
      { name: 'Solidity', icon: solidityIcon, mono: true },
      { name: 'OCaml', icon: ocamlIcon, mono: true },
      { name: 'Erlang', icon: erlangIcon, mono: true },
      { name: 'Clojure', icon: clojureIcon, mono: true },
      { name: 'F#', icon: fsharpIcon, mono: true },
      { name: 'Groovy', icon: apachegroovyIcon, mono: true },
      { name: 'AssemblyScript', icon: assemblyscriptIcon, mono: true },
    ],
  },
  {
    id: 'backend',
    items: [
      { name: 'Django', icon: django, mono: true },
      { name: 'Django REST', icon: djangorest, mono: true },
      { name: 'Spring Boot', icon: spring, mono: true },
      { name: 'Node.js', icon: nodeIcon, mono: true },
      { name: 'AdonisJS', icon: adonisIcon, mono: true },
      { name: 'Express', icon: expressIcon, mono: true },
      { name: 'FastAPI', icon: fastapiIcon, mono: true },
      { name: 'Flask', icon: flaskIcon, mono: true },
      { name: 'Vaadin', icon: vaadinIcon, mono: true },
      { name: 'Laravel', icon: laravelIcon, mono: true },
      // simple-icons ships one black path, so it inverts in dark like the
      // other monochrome marks here.
      { name: 'Gin', icon: ginIcon, mono: true },
      { name: 'Microservices', concept: 'microservices' },
      { name: 'Event-driven', concept: 'eventDriven' },
      { name: 'Distributed systems', concept: 'distributed' },
      { name: 'GraphQL', icon: graphqlIcon, mono: true },
      // The two brokers behind the event-driven and streaming claims above.
      { name: 'RabbitMQ', icon: rabbitmqIcon, mono: true },
      { name: 'Apache Kafka', icon: kafkaIcon, mono: true },
      { name: 'JWT', icon: jwt, flat: true },
      { name: 'OAuth', concept: 'oauth' },
      { name: 'Async task flows', concept: 'async' },
      { name: 'NestJS', icon: nestjsIcon, mono: true },
      { name: 'Ktor', icon: ktorIcon, mono: true },
      { name: 'Quarkus', icon: quarkusIcon, mono: true },
      { name: 'Phoenix', icon: phoenixframeworkIcon, mono: true },
      { name: 'Ruby on Rails', icon: rubyonrailsIcon, mono: true },
      { name: '.NET', icon: dotnetIcon, mono: true },
      { name: 'tRPC', icon: trpcIcon, mono: true },
      { name: 'Deno', icon: denoIcon, mono: true },
      { name: 'Bun', icon: bunIcon, mono: true },
      { name: 'Celery', icon: celeryIcon, mono: true },
      { name: 'Hono', icon: honoIcon, mono: true },
      { name: 'Symfony', icon: symfonyIcon, mono: true },
      { name: 'Socket.IO', icon: socketdotioIcon, mono: true },
      { name: 'Tomcat', icon: apachetomcatIcon, mono: true },
      { name: 'OpenAPI / Swagger', icon: swaggerIcon, mono: true },
      { name: 'Prisma', icon: prismaIcon, mono: true },
      { name: 'Sequelize', icon: sequelizeIcon, mono: true },
      { name: 'Hibernate', icon: hibernateIcon, mono: true },
    ],
  },
  {
    // Two AI groups, split on one axis: this one is what AI systems get built
    // WITH — libraries, the ML working surface, and the architectures they add
    // up to. The next one is AI products used as a practitioner. The labels in
    // the dictionary carry that distinction, so neither group has to be read
    // against the other to make sense.
    id: 'ai',
    items: [
      { name: 'LangChain', icon: langchain, mono: true },
      { name: 'LangGraph', icon: langgraphIcon, mono: true },
      { name: 'AI Agents', concept: 'agents' },
      { name: 'LLM & RAG', concept: 'rag' },
      { name: 'Machine Learning', concept: 'ml' },
      { name: 'Multi-agent', concept: 'multiAgent' },
      { name: 'TensorFlow', icon: tensorflowIcon, mono: true },
      { name: 'Hugging Face', icon: huggingfaceIcon, mono: true },
      { name: 'pandas', icon: pandasIcon, mono: true },
      { name: 'Google Colab', icon: colabIcon, mono: true },
      { name: 'Kaggle', icon: kaggleIcon, mono: true },
      { name: 'Mastra', icon: mastraIcon, mono: true },
      { name: 'CrewAI', icon: crewaiIcon, mono: true },
      { name: 'AG2 (AutoGen)', icon: ag2Icon, mono: true },
      { name: 'Agno', icon: agnoIcon, mono: true },
      { name: 'Pydantic AI', icon: pydanticIcon, mono: true },
      { name: 'Haystack', icon: haystackIcon, mono: true },
      { name: 'Dify', icon: difyIcon, mono: true },
      { name: 'Langflow', icon: langflowIcon, mono: true },
      { name: 'Temporal', icon: temporalIcon, mono: true },
      { name: 'MCP', icon: modelcontextprotocolIcon, mono: true },
      { name: 'Modal', icon: modalIcon, mono: true },
      { name: 'Ray', icon: rayIcon, mono: true },
      { name: 'vLLM', icon: vllmIcon, mono: true },
      { name: 'Weights & Biases', icon: weightsandbiasesIcon, mono: true },
    ],
  },
  {
    // The agents and runtimes actually used day to day. Only tools genuinely in
    // use are listed — this is a CV, not a survey of what exists.
    id: 'aitools',
    items: [
      { name: 'Claude Code', icon: claudeIcon, mono: true },
      { name: 'Codex', icon: openaiIcon, mono: true },
      { name: 'Cursor', icon: cursorIcon, mono: true },
      { name: 'GitHub Copilot', icon: copilotIcon, mono: true },
      // These three ship their own artwork and none of them invert. OpenCode's
      // app tile carries its own dark ground; OpenClaw is Molty, their mascot,
      // taken as SVG rather than the app icon PNG — that one is RGB with no
      // alpha, so on a dark card it rendered as a white block around the
      // lobster; NemoClaw is an NVIDIA project and uses their green symbol.
      { name: 'Orca', icon: orcaIcon, mono: true },
      { name: 'OpenCode', icon: opencodeIcon, mono: true },
      { name: 'OpenClaw', icon: openclawIcon, mono: true },
      { name: 'NemoClaw', icon: nemoclawIcon, mono: true },
      { name: 'Ollama', icon: ollamaIcon, mono: true },
      { name: 'DeepSeek', icon: deepseekIcon, mono: true },
      // xAI ships Grok only as an app tile — a white glyph on its own near-black
      // rounded square, with Figma blur filters attached. The two strokes were
      // lifted out of it so the mark arrives monochrome like the rest of the
      // wall and inverts with them.
      { name: 'Grok', icon: grokIcon, mono: true },
      // Not a coding agent like the rest: n8n is where agents get wired into a
      // workflow that runs on its own schedule. It earns its place in the group
      // for the same reason the group exists — it is used, not surveyed.
      { name: 'n8n', icon: n8nIcon, mono: true },
      { name: 'Herdr', icon: herdrIcon, mono: true },
      { name: 'Cline', icon: clineIcon, mono: true },
      { name: 'Windsurf', icon: windsurfIcon, mono: true },
      { name: 'Zed', icon: zedindustriesIcon, mono: true },
      { name: 'Gemini CLI', icon: googlegeminiIcon, mono: true },
      { name: 'Qwen', icon: qwenIcon, mono: true },
      { name: 'OpenRouter', icon: openrouterIcon, mono: true },
      { name: 'Replicate', icon: replicateIcon, mono: true },
      { name: 'Mistral', icon: mistralaiIcon, mono: true },
      { name: 'Perplexity', icon: perplexityIcon, mono: true },
    ],
  },
  {
    id: 'cloud',
    items: [
      { name: 'AWS', icon: aws, mono: true },
      { name: 'Azure', icon: azure, mono: true },
      { name: 'Docker', icon: docker, mono: true },
      { name: 'Kubernetes', icon: kubernetes, mono: true },
      { name: 'Linux', icon: linux, mono: true },
      // Where things actually get deployed, from a push-to-deploy PaaS down to
      // a bare VPS that has to be provisioned by hand. All four marks are
      // simple-icons monochrome, so the dark-mode inversion covers them.
      { name: 'Vercel', icon: vercelIcon, mono: true },
      { name: 'Heroku', icon: herokuIcon, mono: true },
      { name: 'Contabo', icon: contaboIcon, mono: true },
      { name: 'Hostinger', icon: hostingerIcon, mono: true },
      { name: 'VPS & self-hosting', concept: 'vps' },
      { name: 'Networking & topologies', concept: 'networking' },
      { name: 'DNS & domains', concept: 'dns' },
      { name: 'IaC', concept: 'iac' },
      { name: 'CI/CD', concept: 'cicd' },
      { name: 'Observability', concept: 'observability' },
      { name: 'Cloud security', concept: 'cloudSecurity' },
      { name: 'FinOps', concept: 'finops' },
      { name: 'Terraform', icon: terraformIcon, mono: true },
      { name: 'Pulumi', icon: pulumiIcon, mono: true },
      { name: 'Ansible', icon: ansibleIcon, mono: true },
      { name: 'GitHub Actions', icon: githubactionsIcon, mono: true },
      { name: 'GitLab CI', icon: gitlabIcon, mono: true },
      { name: 'Jenkins', icon: jenkinsIcon, mono: true },
      { name: 'Argo CD', icon: argoIcon, mono: true },
      { name: 'Helm', icon: helmIcon, mono: true },
      { name: 'Google Cloud', icon: googlecloudIcon, mono: true },
      { name: 'DigitalOcean', icon: digitaloceanIcon, mono: true },
      { name: 'Cloudflare', icon: cloudflareIcon, mono: true },
      { name: 'Podman', icon: podmanIcon, mono: true },
      { name: 'OpenShift', icon: redhatopenshiftIcon, mono: true },
      { name: 'Rancher', icon: rancherIcon, mono: true },
      { name: 'Portainer', icon: portainerIcon, mono: true },
      { name: 'Nomad', icon: nomadIcon, mono: true },
      { name: 'Packer', icon: packerIcon, mono: true },
      { name: 'Consul', icon: consulIcon, mono: true },
      { name: 'Vault', icon: vaultIcon, mono: true },
      { name: 'Istio', icon: istioIcon, mono: true },
      { name: 'Cilium', icon: ciliumIcon, mono: true },
      { name: 'Nginx', icon: nginxIcon, mono: true },
      { name: 'Caddy', icon: caddyIcon, mono: true },
      { name: 'Traefik', icon: traefikproxyIcon, mono: true },
      { name: 'Prometheus', icon: prometheusIcon, mono: true },
      { name: 'Grafana', icon: grafanaIcon, mono: true },
      { name: 'OpenTelemetry', icon: opentelemetryIcon, mono: true },
      { name: 'Sentry', icon: sentryIcon, mono: true },
      { name: 'Datadog', icon: datadogIcon, mono: true },
      { name: 'Elastic Stack', icon: elasticstackIcon, mono: true },
    ],
  },
  {
    // Security from the attacking side. The two without a vendor mark —
    // simple-icons carries neither — get a drawn icon like every other
    // logo-less tile, rather than a monogram.
    id: 'security',
    items: [
      { name: 'Kali Linux', icon: kaliIcon, mono: true },
      { name: 'Wireshark', icon: wiresharkIcon, mono: true },
      { name: 'Burp Suite', icon: burpIcon, mono: true },
      { name: 'Metasploit', icon: metasploitIcon, mono: true },
      { name: 'Nmap', concept: 'portScan' },
      { name: 'John the Ripper', concept: 'passwordCrack' },
      { name: 'OWASP', icon: owaspIcon, mono: true },
      { name: 'Parrot OS', icon: parrotsecurityIcon, mono: true },
      { name: 'Tor', icon: torprojectIcon, mono: true },
      { name: 'Hack The Box', icon: hacktheboxIcon, mono: true },
      { name: 'TryHackMe', icon: tryhackmeIcon, mono: true },
      { name: 'HackerOne', icon: hackeroneIcon, mono: true },
      { name: 'Bugcrowd', icon: bugcrowdIcon, mono: true },
      { name: 'VirusTotal', icon: virustotalIcon, mono: true },
      { name: 'Snyk', icon: snykIcon, mono: true },
      { name: 'Trivy', icon: trivyIcon, mono: true },
      { name: 'Splunk', icon: splunkIcon, mono: true },
      { name: 'Keycloak', icon: keycloakIcon, mono: true },
      { name: 'Auth0', icon: auth0Icon, mono: true },
      { name: 'Okta', icon: oktaIcon, mono: true },
      { name: 'OpenVPN', icon: openvpnIcon, mono: true },
      { name: 'WireGuard', icon: wireguardIcon, mono: true },
      { name: 'Let’s Encrypt', icon: letsencryptIcon, mono: true },
      { name: 'Bitwarden', icon: bitwardenIcon, mono: true },
      { name: 'GnuPG', icon: gnuprivacyguardIcon, mono: true },
    ],
  },
  {
    id: 'data',
    items: [
      { name: 'PostgreSQL', icon: postgresql, mono: true },
      { name: 'MySQL', icon: mysql, mono: true },
      { name: 'MongoDB', icon: mongodb, mono: true },
      { name: 'Redis', icon: redis, mono: true },
      { name: 'SQLite', icon: sqlite, mono: true },
      { name: 'Supabase', icon: supabaseIcon, mono: true },
      { name: 'Oracle', icon: oracle, mono: true },
      // The pipeline, in the order it runs: orchestration, processing,
      // transformation, warehouse. All four are simple-icons monochrome, so
      // the dark-mode inversion covers them.
      { name: 'Airflow', icon: airflowIcon, mono: true },
      { name: 'Spark', icon: sparkIcon, mono: true },
      { name: 'dbt', icon: dbtIcon, mono: true },
      { name: 'Snowflake', icon: snowflakeIcon, mono: true },
      { name: 'Stream processing', concept: 'stream' },
      { name: 'Time-series', concept: 'timeSeries' },
      { name: 'ClickHouse', icon: clickhouseIcon, mono: true },
      { name: 'Neo4j', icon: neo4jIcon, mono: true },
      { name: 'Cassandra', icon: apachecassandraIcon, mono: true },
      { name: 'Elasticsearch', icon: elasticsearchIcon, mono: true },
      { name: 'DuckDB', icon: duckdbIcon, mono: true },
      { name: 'Databricks', icon: databricksIcon, mono: true },
      { name: 'BigQuery', icon: googlebigqueryIcon, mono: true },
      { name: 'Trino', icon: trinoIcon, mono: true },
      { name: 'Flink', icon: apacheflinkIcon, mono: true },
      { name: 'Pulsar', icon: apachepulsarIcon, mono: true },
      { name: 'TimescaleDB', icon: timescaleIcon, mono: true },
      { name: 'InfluxDB', icon: influxdbIcon, mono: true },
      { name: 'Qdrant', icon: qdrantIcon, mono: true },
      { name: 'Milvus', icon: milvusIcon, mono: true },
      { name: 'SQLAlchemy', icon: sqlalchemyIcon, mono: true },
      { name: 'MinIO', icon: minioIcon, mono: true },
      { name: 'Hadoop', icon: apachehadoopIcon, mono: true },
      { name: 'DBeaver', icon: dbeaverIcon, mono: true },
    ],
  },
  {
    id: 'frontend',
    items: [
      { name: 'React', icon: react, mono: true },
      { name: 'Next.js', icon: nextIcon, mono: true },
      { name: 'Vue', icon: vueIcon, mono: true },
      { name: 'Angular', icon: angularIcon, mono: true },
      { name: 'Astro', icon: astroIcon, mono: true },
      { name: 'HTML5', icon: html5, mono: true },
      { name: 'CSS3', icon: css3, mono: true },
      { name: 'Tailwind', icon: tailwind, mono: true },
      { name: 'Bootstrap', icon: bootstrap, mono: true },
      { name: 'Flutter', icon: flutter, mono: true },
      { name: 'Dart', icon: dart, mono: true },
      { name: 'Svelte', icon: svelteIcon, mono: true },
      { name: 'SolidJS', icon: solidIcon, mono: true },
      { name: 'Qwik', icon: qwikIcon, mono: true },
      { name: 'Remix', icon: remixIcon, mono: true },
      { name: 'Nuxt', icon: nuxtIcon, mono: true },
      { name: 'Vite', icon: viteIcon, mono: true },
      { name: 'Redux', icon: reduxIcon, mono: true },
      { name: 'TanStack Query', icon: reactqueryIcon, mono: true },
      { name: 'Three.js', icon: threedotjsIcon, mono: true },
      { name: 'D3', icon: d3Icon, mono: true },
      { name: 'Framer Motion', icon: framerIcon, mono: true },
      { name: 'Storybook', icon: storybookIcon, mono: true },
      { name: 'shadcn/ui', icon: shadcnuiIcon, mono: true },
      { name: 'Material UI', icon: muiIcon, mono: true },
      { name: 'Chakra UI', icon: chakrauiIcon, mono: true },
      { name: 'Sass', icon: sassIcon, mono: true },
      { name: 'Less', icon: lessIcon, mono: true },
      { name: 'Electron', icon: electronIcon, mono: true },
      { name: 'Tauri', icon: tauriIcon, mono: true },
      { name: 'Expo', icon: expoIcon, mono: true },
      { name: 'Ionic', icon: ionicIcon, mono: true },
      { name: 'Capacitor', icon: capacitorIcon, mono: true },
    ],
  },
  {
    // The CMS end of the work, which is a different job from the frontend
    // group above: a site somebody else has to edit afterwards, and a store
    // that has to take money.
    id: 'web',
    items: [
      { name: 'WordPress', icon: wordpressIcon, mono: true },
      { name: 'WooCommerce', icon: woocommerceIcon, mono: true },
      { name: 'Elementor', icon: elementorIcon, mono: true },
      { name: 'E-commerce', concept: 'ecommerce' },
      { name: 'Payments & checkout', concept: 'payments' },
      { name: 'SEO & analytics', concept: 'seo' },
    ],
  },
  {
    id: 'tools',
    items: [
      { name: 'Git', icon: git, mono: true },
      { name: 'GitHub', icon: github, mono: true },
      { name: 'Postman', icon: postman, mono: true },
      { name: 'Selenium', icon: selenium, mono: true },
      { name: 'Figma', icon: figma, mono: true },
      { name: 'Miro', icon: miro, mono: true },
      { name: 'Linear', icon: linear, mono: true },
      { name: 'Slack', icon: slackIcon, mono: true },
      { name: 'Jira', icon: jira, mono: true },
      { name: 'Trello', icon: trello, mono: true },
      { name: 'Notion', icon: notion, mono: true },
      { name: 'Obsidian', icon: obsidianIcon, mono: true },
      { name: 'Webpack', icon: webpackIcon, mono: true },
      { name: 'Babel', icon: babelIcon, mono: true },
      { name: 'ESLint', icon: eslintIcon, mono: true },
      { name: 'Prettier', icon: prettierIcon, mono: true },
      { name: 'Cypress', icon: cypressIcon, mono: true },
      { name: 'Jest', icon: jestIcon, mono: true },
      { name: 'Vitest', icon: vitestIcon, mono: true },
      { name: 'Testing Library', icon: testinglibraryIcon, mono: true },
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
  {
    // Last on purpose: the joke only works once the reader has been through the
    // whole serious list. Everybody who learned to program in Spanish started
    // here, and the logo is the real one.
    id: 'joke',
    items: [{ name: 'PSeInt', icon: pseintIcon, flat: true }],
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

// The stack, as tiles. Kept out of the component because it is a data table,
// not markup, and because the accuracy rule below is easier to enforce when the
// whole list is visible in one file.
//
// ACCURACY RULE: a logo is only attached to a skill the CV actually claims.
// "IaC" and "CI/CD" are claimed; Terraform and GitHub Actions specifically are
// not, so those stay as text tiles rather than borrowing a logo that would
// assert a tool that was never listed.
//
// Every entry without a vendor logo carries a `concept` drawn by
// ConceptIcons.jsx. No tile is initials: the monogram tile the component
// still has is a fallback that nothing currently reaches.
//
// The 2026 intake's marks did not come from one icon set, because most of
// these are younger than the icon sets. They come from whoever publishes a
// single-tone version: CNCF's own artwork for its projects, the project's
// repository, or in a few cases the mark lifted out of the project's own page.
// Anything that arrived in colour was flattened by luminance — dark to black,
// light to transparent — rather than crushed, which is what keeps a knockout
// like Apache Iceberg's readable instead of turning it into a disc.
//
// One honest caveat: Axum has no mark of its own. It is a Tokio project and
// ships under Tokio's branding, so that is the mark it carries here.
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
import fastifyIcon from '../../images/tech/fastify.svg';
import mlflowIcon from '../../images/tech/mlflow.svg';
import onnxIcon from '../../images/tech/onnx.svg';
import gradioIcon from '../../images/tech/gradio.svg';
import kimiIcon from '../../images/tech/kimi.svg';
import minimaxIcon from '../../images/tech/minimax.svg';
import replitIcon from '../../images/tech/replit.svg';
import flyIcon from '../../images/tech/flydotio.svg';
import railwayIcon from '../../images/tech/railway.svg';
import coolifyIcon from '../../images/tech/coolify.svg';
import opensslIcon from '../../images/tech/openssl.svg';
import autheliaIcon from '../../images/tech/authelia.svg';
import vaultwardenIcon from '../../images/tech/vaultwarden.svg';
import openbugbountyIcon from '../../images/tech/openbugbounty.svg';
import polarsIcon from '../../images/tech/polars.svg';
import tursoIcon from '../../images/tech/turso.svg';
import neonIcon from '../../images/tech/neon.svg';
import surrealdbIcon from '../../images/tech/surrealdb.svg';
import radixIcon from '../../images/tech/radixui.svg';
import tanstackIcon from '../../images/tech/tanstack.svg';
import payloadIcon from '../../images/tech/payloadcms.svg';
import medusaIcon from '../../images/tech/medusa.svg';
import clerkIcon from '../../images/tech/clerk.svg';
import posthogIcon from '../../images/tech/posthog.svg';
import biomeIcon from '../../images/tech/biome.svg';
import brunoIcon from '../../images/tech/bruno.svg';
import uvIcon from '../../images/tech/astral.svg';
import zodIcon from '../../images/tech/zod.svg';
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
import metaIcon from '../../images/tech/meta.svg';
import pytorchIcon from '../../images/tech/pytorch.svg';
import scikitlearnIcon from '../../images/tech/scikitlearn.svg';
import kerasIcon from '../../images/tech/keras.svg';
import numpyIcon from '../../images/tech/numpy.svg';
import jupyterIcon from '../../images/tech/jupyter.svg';
import opencvIcon from '../../images/tech/opencv.svg';
import lmstudioIcon from '../../images/tech/lmstudio.svg';
import notebooklmIcon from '../../images/tech/notebooklm.svg';
import v0Icon from '../../images/tech/v0.svg';
import warpIcon from '../../images/tech/warp.svg';
import raycastIcon from '../../images/tech/raycast.svg';
import hashcatIcon from '../../images/tech/hashcat.svg';
import snortIcon from '../../images/tech/snort.svg';
import pfsenseIcon from '../../images/tech/pfsense.svg';
import opnsenseIcon from '../../images/tech/opnsense.svg';
import keepassxcIcon from '../../images/tech/keepassxc.svg';
import yubicoIcon from '../../images/tech/yubico.svg';
import p5dotjsIcon from '../../images/tech/p5dotjs.svg';
import processingfoundationIcon from '../../images/tech/processingfoundation.svg';
import spineIcon from '../../images/tech/spine.svg';
import bitwigIcon from '../../images/tech/bitwig.svg';
import penpotIcon from '../../images/tech/penpot.svg';
import excalidrawIcon from '../../images/tech/excalidraw.svg';
import tldrawIcon from '../../images/tech/tldraw.svg';
import sketchIcon from '../../images/tech/sketch.svg';
import shopifyIcon from '../../images/tech/shopify.svg';
import drupalIcon from '../../images/tech/drupal.svg';
import joomlaIcon from '../../images/tech/joomla.svg';
import strapiIcon from '../../images/tech/strapi.svg';
import contentfulIcon from '../../images/tech/contentful.svg';
import sanityIcon from '../../images/tech/sanity.svg';
import ghostIcon from '../../images/tech/ghost.svg';
import webflowIcon from '../../images/tech/webflow.svg';
import wixIcon from '../../images/tech/wix.svg';
import squarespaceIcon from '../../images/tech/squarespace.svg';
import prestashopIcon from '../../images/tech/prestashop.svg';
import bigcommerceIcon from '../../images/tech/bigcommerce.svg';
import stripeIcon from '../../images/tech/stripe.svg';
import paypalIcon from '../../images/tech/paypal.svg';
import mercadopagoIcon from '../../images/tech/mercadopago.svg';
import googleanalyticsIcon from '../../images/tech/googleanalytics.svg';
import googletagmanagerIcon from '../../images/tech/googletagmanager.svg';
import googlesearchconsoleIcon from '../../images/tech/googlesearchconsole.svg';
import hotjarIcon from '../../images/tech/hotjar.svg';
import mailchimpIcon from '../../images/tech/mailchimp.svg';
import hubspotIcon from '../../images/tech/hubspot.svg';
import algoliaIcon from '../../images/tech/algolia.svg';
import cloudinaryIcon from '../../images/tech/cloudinary.svg';
import netlifyIcon from '../../images/tech/netlify.svg';
import pwaIcon from '../../images/tech/pwa.svg';
import openglIcon from '../../images/tech/opengl.svg';
import vulkanIcon from '../../images/tech/vulkan.svg';
import webglIcon from '../../images/tech/webgl.svg';
import raylibIcon from '../../images/tech/raylib.svg';
import monogameIcon from '../../images/tech/monogame.svg';
import kdenliveIcon from '../../images/tech/kdenlive.svg';
import lmmsIcon from '../../images/tech/lmms.svg';
import ardourIcon from '../../images/tech/ardour.svg';
import npmIcon from '../../images/tech/npm.svg';
import pnpmIcon from '../../images/tech/pnpm.svg';
import yarnIcon from '../../images/tech/yarn.svg';
import turborepoIcon from '../../images/tech/turborepo.svg';
import nxIcon from '../../images/tech/nx.svg';
import insomniaIcon from '../../images/tech/insomnia.svg';
import codecovIcon from '../../images/tech/codecov.svg';
import renovateIcon from '../../images/tech/renovate.svg';
import markdownIcon from '../../images/tech/markdown.svg';
import latexIcon from '../../images/tech/latex.svg';
import elevenlabsIcon from '../../images/tech/elevenlabs.svg';
import sunoIcon from '../../images/tech/suno.svg';
import unityIcon from '../../images/tech/unity.svg';
import unrealengineIcon from '../../images/tech/unrealengine.svg';
import godotengineIcon from '../../images/tech/godotengine.svg';
import blenderIcon from '../../images/tech/blender.svg';
import asepriteIcon from '../../images/tech/aseprite.svg';
import riveIcon from '../../images/tech/rive.svg';
import lottiefilesIcon from '../../images/tech/lottiefiles.svg';
import davinciresolveIcon from '../../images/tech/davinciresolve.svg';
import obsstudioIcon from '../../images/tech/obsstudio.svg';
import ffmpegIcon from '../../images/tech/ffmpeg.svg';
import audacityIcon from '../../images/tech/audacity.svg';
import gimpIcon from '../../images/tech/gimp.svg';
import kritaIcon from '../../images/tech/krita.svg';
import inkscapeIcon from '../../images/tech/inkscape.svg';
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

// The 2024-2026 intake. Kept together rather than filed alphabetically
// among the rest, because the point of these is that they are new.
import sigleamIcon from '../../images/tech/gleam.svg';
import sinushellIcon from '../../images/tech/nushell.svg';
import siluauIcon from '../../images/tech/luau.svg';
import sinimIcon from '../../images/tech/nim.svg';
import sicrystalIcon from '../../images/tech/crystal.svg';
import siodinIcon from '../../images/tech/odin.svg';
import sivIcon from '../../images/tech/v.svg';
import sirescriptIcon from '../../images/tech/rescript.svg';
import sipurescriptIcon from '../../images/tech/purescript.svg';
import sidrizzleIcon from '../../images/tech/drizzle.svg';
import sinatsdotioIcon from '../../images/tech/natsdotio.svg';
import siactixIcon from '../../images/tech/actix.svg';
import sirocketIcon from '../../images/tech/rocket.svg';
import sisanicIcon from '../../images/tech/sanic.svg';
import sibentomlIcon from '../../images/tech/bentoml.svg';
import sistreamlitIcon from '../../images/tech/streamlit.svg';
import sioptunaIcon from '../../images/tech/optuna.svg';
import sispacyIcon from '../../images/tech/spacy.svg';
import sidvcIcon from '../../images/tech/dvc.svg';
import sicoderabbitIcon from '../../images/tech/coderabbit.svg';
import sigooglejulesIcon from '../../images/tech/googlejules.svg';
import sizapierIcon from '../../images/tech/zapier.svg';
import simakeIcon from '../../images/tech/make.svg';
import siopentofuIcon from '../../images/tech/opentofu.svg';
import sisstIcon from '../../images/tech/sst.svg';
import sitalosIcon from '../../images/tech/talos.svg';
import siinfracostIcon from '../../images/tech/infracost.svg';
import siknativeIcon from '../../images/tech/knative.svg';
import sitektonIcon from '../../images/tech/tekton.svg';
import sijaegerIcon from '../../images/tech/jaeger.svg';
import sifluxIcon from '../../images/tech/flux.svg';
import siopenbaoIcon from '../../images/tech/openbao.svg';
import sifalcoIcon from '../../images/tech/falco.svg';
import sitailscaleIcon from '../../images/tech/tailscale.svg';
import siauthentikIcon from '../../images/tech/authentik.svg';
import sioryIcon from '../../images/tech/ory.svg';
import sigraylogIcon from '../../images/tech/graylog.svg';
import siprefectIcon from '../../images/tech/prefect.svg';
import sicockroachlabsIcon from '../../images/tech/cockroachlabs.svg';
import simeilisearchIcon from '../../images/tech/meilisearch.svg';
import sidaskIcon from '../../images/tech/dask.svg';
import siapachearrowIcon from '../../images/tech/apachearrow.svg';
import simetabaseIcon from '../../images/tech/metabase.svg';
import sirolldownIcon from '../../images/tech/rolldown.svg';
import sibaseuiIcon from '../../images/tech/baseui.svg';
import silitIcon from '../../images/tech/lit.svg';
import siunocssIcon from '../../images/tech/unocss.svg';
import simantineIcon from '../../images/tech/mantine.svg';
import siswcIcon from '../../images/tech/swc.svg';
import siesbuildIcon from '../../images/tech/esbuild.svg';
import sipreactIcon from '../../images/tech/preact.svg';
import siwebgpuIcon from '../../images/tech/webgpu.svg';
import siwebassemblyIcon from '../../images/tech/webassembly.svg';
import siwasmerIcon from '../../images/tech/wasmer.svg';
import sihtmxIcon from '../../images/tech/htmx.svg';
import siumamiIcon from '../../images/tech/umami.svg';
import sidirectusIcon from '../../images/tech/directus.svg';
import siresendIcon from '../../images/tech/resend.svg';
import sibetterauthIcon from '../../images/tech/betterauth.svg';
import silemonsqueezyIcon from '../../images/tech/lemonsqueezy.svg';
import simatomoIcon from '../../images/tech/matomo.svg';
import silivekitIcon from '../../images/tech/livekit.svg';
import sibabylondotjsIcon from '../../images/tech/babylondotjs.svg';
import siplaycanvasIcon from '../../images/tech/playcanvas.svg';
import simediapipeIcon from '../../images/tech/mediapipe.svg';
import sideepgramIcon from '../../images/tech/deepgram.svg';
import sicocosIcon from '../../images/tech/cocos.svg';
import siruffIcon from '../../images/tech/ruff.svg';
import sioxcIcon from '../../images/tech/oxc.svg';
import sighosttyIcon from '../../images/tech/ghostty.svg';
import sitypstIcon from '../../images/tech/typst.svg';
import sineovimIcon from '../../images/tech/neovim.svg';
import sijustIcon from '../../images/tech/just.svg';
import sitaskIcon from '../../images/tech/task.svg';
import sik6Icon from '../../images/tech/k6.svg';
import siampIcon from '../../images/tech/amp.svg';
import siantigravityIcon from '../../images/tech/antigravity.svg';
import siaxumIcon from '../../images/tech/axum.svg';
import siboltnewIcon from '../../images/tech/boltnew.svg';
import sicomfyuiIcon from '../../images/tech/comfyui.svg';
import sicrossplaneIcon from '../../images/tech/crossplane.svg';
import sidagsterIcon from '../../images/tech/dagster.svg';
import sidevinIcon from '../../images/tech/devin.svg';
import sielysiaIcon from '../../images/tech/elysia.svg';
import siinfisicalIcon from '../../images/tech/infisical.svg';
import siinngestIcon from '../../images/tech/inngest.svg';
import sijujutsuIcon from '../../images/tech/jujutsu.svg';
import sikarpenterIcon from '../../images/tech/karpenter.svg';
import sikiroIcon from '../../images/tech/kiro.svg';
import sikyvernoIcon from '../../images/tech/kyverno.svg';
import silangfuseIcon from '../../images/tech/langfuse.svg';
import silitestarIcon from '../../images/tech/litestar.svg';
import sillamaindexIcon from '../../images/tech/llamaindex.svg';
import simojoIcon from '../../images/tech/mojo.svg';
import sipandacssIcon from '../../images/tech/pandacss.svg';
import sipipecatIcon from '../../images/tech/pipecat.svg';
import siplaywrightIcon from '../../images/tech/playwright.svg';
import siremotionIcon from '../../images/tech/remotion.svg';
import siroocodeIcon from '../../images/tech/roocode.svg';
import sisemgrepIcon from '../../images/tech/semgrep.svg';
import sisigstoreIcon from '../../images/tech/sigstore.svg';
import sivalkeyIcon from '../../images/tech/valkey.svg';
import sizustandIcon from '../../images/tech/zustand.svg';
import sidspyIcon from '../../images/tech/dspy.png';
import siicebergIcon from '../../images/tech/iceberg.png';
import sisglangIcon from '../../images/tech/sglang.png';
import siunslothIcon from '../../images/tech/unsloth.png';
import siencoreIcon from '../../images/tech/encore.png';
import siflux1Icon from '../../images/tech/flux1.png';
import siartemisIcon from '../../images/tech/artemis.svg';
import siopenhandsIcon from '../../images/tech/openhands.svg';
import sigooseIcon from '../../images/tech/goose.svg';
import sitraeIcon from '../../images/tech/trae.svg';
import siqodoIcon from '../../images/tech/qodo.svg';
import siaccioIcon from '../../images/tech/accio.svg';
import simanusIcon from '../../images/tech/manus.svg';
import siactivepiecesIcon from '../../images/tech/activepieces.svg';
import siwindmillIcon from '../../images/tech/windmill.svg';
import siskyworkIcon from '../../images/tech/skywork.svg';
import siandroidstudioIcon from '../../images/tech/androidstudio.svg';
import siandroidIcon from '../../images/tech/android.svg';
import sigradleIcon from '../../images/tech/gradle.svg';
import sijetpackcomposeIcon from '../../images/tech/jetpackcompose.svg';
import sifirebaseIcon from '../../images/tech/firebase.svg';
import sihermesIcon from '../../images/tech/hermes.svg';
import sicapyIcon from '../../images/tech/capy.svg';
import sicomposioIcon from '../../images/tech/composio.svg';
import silettaIcon from '../../images/tech/letta.png';
import simem0Icon from '../../images/tech/mem0.png';
import silayaIcon from '../../images/tech/laya.svg';
import sigroqIcon from '../../images/tech/groq.svg';
import sicerebrasIcon from '../../images/tech/cerebras.svg';
import sibasetenIcon from '../../images/tech/baseten.svg';
import sitogetherIcon from '../../images/tech/together.svg';
import sisticklightIcon from '../../images/tech/sticklight.svg';
import siarchifyIcon from '../../images/tech/archify.svg';
import siponytailIcon from '../../images/tech/ponytail.svg';
import sisuperpowersIcon from '../../images/tech/superpowers.svg';
import simintlifyIcon from '../../images/tech/mintlify.svg';
import sicontext7Icon from '../../images/tech/context7.png';
import siunisonIcon from '../../images/tech/unison.png';
import siuiuaIcon from '../../images/tech/uiua.png';
import sichapelIcon from '../../images/tech/chapel.png';
import sifutharkIcon from '../../images/tech/futhark.png';
import sielmIcon from '../../images/tech/elm.svg';
import siracketIcon from '../../images/tech/racket.svg';
import sihaxeIcon from '../../images/tech/haxe.svg';
import siballerinaIcon from '../../images/tech/ballerina.svg';
import sigrpcIcon from '../../images/tech/grpc.svg';
import sikrakendIcon from '../../images/tech/krakend.svg';
import sipocketbaseIcon from '../../images/tech/pocketbase.svg';
import siappwriteIcon from '../../images/tech/appwrite.svg';
import sidaprIcon from '../../images/tech/dapr.svg';
import sieffectIcon from '../../images/tech/effect.svg';
import sirisingwaveIcon from '../../images/tech/risingwave.svg';
import sidltIcon from '../../images/tech/dlt.svg';
import sikestraIcon from '../../images/tech/kestra.svg';
import sievidenceIcon from '../../images/tech/evidence.svg';
import sichromaIcon from '../../images/tech/chroma.svg';
import sitypesenseIcon from '../../images/tech/typesense.svg';
import sidragonflyIcon from '../../images/tech/dragonfly.svg';
import sibackstageIcon from '../../images/tech/backstage.svg';
import sik3sIcon from '../../images/tech/k3s.svg';
import sisignozIcon from '../../images/tech/signoz.svg';
import sivictoriametricsIcon from '../../images/tech/victoriametrics.svg';
import siteleportIcon from '../../images/tech/teleport.svg';
import sicueIcon from '../../images/tech/cue.png';
import sijanetIcon from '../../images/tech/janet.svg';
import sibufIcon from '../../images/tech/buf.png';
import sirobynIcon from '../../images/tech/robyn.png';
import sitaskiqIcon from '../../images/tech/taskiq.png';
import sibullmqIcon from '../../images/tech/bullmq.png';
import sisqlmodelIcon from '../../images/tech/sqlmodel.png';
import silancedbIcon from '../../images/tech/lancedb.png';
import sidaftIcon from '../../images/tech/daft.png';
import siparadedbIcon from '../../images/tech/paradedb.png';
import sisqlmeshIcon from '../../images/tech/sqlmesh.png';
import sikroIcon from '../../images/tech/kro.png';
import sidaggerIcon from '../../images/tech/dagger.png';
import sidevenvIcon from '../../images/tech/devenv.png';
import siopencostIcon from '../../images/tech/opencost.png';
import siskypilotIcon from '../../images/tech/skypilot.png';
import siorbstackIcon from '../../images/tech/orbstack.png';
import sisupermemoryIcon from '../../images/tech/supermemory.png';
import sifastmcpIcon from '../../images/tech/fastmcp.png';
import sibrowseruseIcon from '../../images/tech/browseruse.png';
import sifirecrawlIcon from '../../images/tech/firecrawl.svg';
import siragflowIcon from '../../images/tech/ragflow.png';
import siunstructuredIcon from '../../images/tech/unstructured.svg';
import sinomicIcon from '../../images/tech/nomic.png';
import siopikIcon from '../../images/tech/opik.png';
import siheliconeIcon from '../../images/tech/helicone.png';
import sipromptfooIcon from '../../images/tech/promptfoo.png';
import sioutlinesIcon from '../../images/tech/outlines.png';
import sibamlIcon from '../../images/tech/baml.png';
import sizepIcon from '../../images/tech/zep.png';
import sistagehandIcon from '../../images/tech/stagehand.png';
import sibraintrustIcon from '../../images/tech/braintrust.svg';
import sidbosIcon from '../../images/tech/dbos.png';
import sibrowserbaseIcon from '../../images/tech/browserbase.svg';
import sireductoIcon from '../../images/tech/reducto.png';
import sistrandsagentsIcon from '../../images/tech/strandsagents.svg';
import siturbopufferIcon from '../../images/tech/turbopuffer.png';
import siaxolotlIcon from '../../images/tech/axolotl.png';
import sibitsandbytesIcon from '../../images/tech/bitsandbytes.png';
import sizenmlIcon from '../../images/tech/zenml.png';
import siflyteIcon from '../../images/tech/flyte.png';
import silabelstudioIcon from '../../images/tech/labelstudio.svg';
import silightgbmIcon from '../../images/tech/lightgbm.png';
import sijaxIcon from '../../images/tech/jax.svg';
import siscipyIcon from '../../images/tech/scipy.svg';
import sishapIcon from '../../images/tech/shap.png';
import sigemmaIcon from '../../images/tech/gemma.svg';
import siglmIcon from '../../images/tech/glm.svg';
import siplaneIcon from '../../images/tech/plane.png';
import siplatziIcon from '../../images/tech/platzi.svg';
import siudemyIcon from '../../images/tech/udemy.svg';
import siw3schoolsIcon from '../../images/tech/w3schools.svg';
import sistackoverflowIcon from '../../images/tech/stackoverflow.svg';
import sifreecodecampIcon from '../../images/tech/freecodecamp.svg';
import sicourseraIcon from '../../images/tech/coursera.svg';
import siedxIcon from '../../images/tech/edx.svg';
import sikhanacademyIcon from '../../images/tech/khanacademy.svg';
import simdnwebdocsIcon from '../../images/tech/mdnwebdocs.svg';
import siexercismIcon from '../../images/tech/exercism.svg';
import sileetcodeIcon from '../../images/tech/leetcode.svg';
import sihackerrankIcon from '../../images/tech/hackerrank.svg';
import sicodecademyIcon from '../../images/tech/codecademy.svg';
import sipluralsightIcon from '../../images/tech/pluralsight.svg';
import siankiIcon from '../../images/tech/anki.svg';
import siscrimbaIcon from '../../images/tech/scrimba.svg';
import siadventofcodeIcon from '../../images/tech/adventofcode.svg';
import siarxivIcon from '../../images/tech/arxiv.svg';
import sisemanticscholarIcon from '../../images/tech/semanticscholar.svg';
import sigoogleclassroomIcon from '../../images/tech/googleclassroom.svg';
import sicodewarsIcon from '../../images/tech/codewars.svg';
import sizoteroIcon from '../../images/tech/zotero.svg';
import siroadmapshIcon from '../../images/tech/roadmapsh.png';
import sifrontendmastersIcon from '../../images/tech/frontendmasters.png';
import sieggheadioIcon from '../../images/tech/eggheadio.png';
import sidevdocsIcon from '../../images/tech/devdocs.svg';
import sigooglemeetIcon from '../../images/tech/googlemeet.svg';
import siloomIcon from '../../images/tech/loom.svg';
import simicrosoftteamsIcon from '../../images/tech/microsoftteams.svg';
import sidiscordIcon from '../../images/tech/discord.svg';
import sitelegramIcon from '../../images/tech/telegram.svg';
import siwhatsappIcon from '../../images/tech/whatsapp.svg';
import siconfluenceIcon from '../../images/tech/confluence.svg';
import siasanaIcon from '../../images/tech/asana.svg';
import siclickupIcon from '../../images/tech/clickup.svg';
import sicalendlyIcon from '../../images/tech/calendly.svg';
import sigranolaIcon from '../../images/tech/granola.svg';
import sifrontIcon from '../../images/tech/front.svg';
import sizulipIcon from '../../images/tech/zulip.svg';
import simattermostIcon from '../../images/tech/mattermost.svg';
import sirocketchatIcon from '../../images/tech/rocketchat.png';
import sielementIcon from '../../images/tech/element.svg';
import siotteraiIcon from '../../images/tech/otterai.png';
import siplantumlIcon from '../../images/tech/plantuml.png';
import simermaidIcon from '../../images/tech/mermaid.svg';
import sid2Icon from '../../images/tech/d2.svg';
import sikrokiIcon from '../../images/tech/kroki.png';
import sieraserIcon from '../../images/tech/eraser.svg';
import sivisualparadigmIcon from '../../images/tech/visualparadigm.svg';
import sidocusaurusIcon from '../../images/tech/docusaurus.svg';
import simkdocsIcon from '../../images/tech/mkdocs.svg';
import sisphinxIcon from '../../images/tech/sphinx.svg';
import sireadthedocsIcon from '../../images/tech/readthedocs.svg';
import sigitbookIcon from '../../images/tech/gitbook.svg';
import sivitepressIcon from '../../images/tech/vitepress.svg';
import sistarlightIcon from '../../images/tech/starlight.png';
import similanoteIcon from '../../images/tech/milanote.svg';
import silucidchartIcon from '../../images/tech/lucidchart.png';
import siyedIcon from '../../images/tech/yed.svg';
import sigliffyIcon from '../../images/tech/gliffy.png';
import signs3Icon from '../../images/tech/gns3.svg';
import siputtyIcon from '../../images/tech/putty.svg';
import sinetdataIcon from '../../images/tech/netdata.svg';
import sizabbixIcon from '../../images/tech/zabbix.svg';
import siuptimekumaIcon from '../../images/tech/uptimekuma.svg';
import siproxmoxIcon from '../../images/tech/proxmox.svg';
import sitruenasIcon from '../../images/tech/truenas.svg';
import siopenwrtIcon from '../../images/tech/openwrt.svg';
import simikrotikIcon from '../../images/tech/mikrotik.svg';
import sihomeassistantIcon from '../../images/tech/homeassistant.svg';
import sipiholeIcon from '../../images/tech/pihole.svg';
import sinextcloudIcon from '../../images/tech/nextcloud.svg';
import sijellyfinIcon from '../../images/tech/jellyfin.svg';
import sivagrantIcon from '../../images/tech/vagrant.svg';
import sinetboxIcon from '../../images/tech/netbox.svg';
import sivirtualboxIcon from '../../images/tech/virtualbox.svg';
import siqemuIcon from '../../images/tech/qemu.svg';
import sirosIcon from '../../images/tech/ros.svg';
import sigazeboIcon from '../../images/tech/gazebo.svg';
import simoveitIcon from '../../images/tech/moveit.png';
import siplotjugglerIcon from '../../images/tech/plotjuggler.png';
import simujocoIcon from '../../images/tech/mujoco.png';
import siwebotsIcon from '../../images/tech/webots.png';
import sigymnasiumIcon from '../../images/tech/gymnasium.png';
import sidrakeIcon from '../../images/tech/drake.svg';
import siviamIcon from '../../images/tech/viam.png';
import siduckietownIcon from '../../images/tech/duckietown.png';
import siunitreeIcon from '../../images/tech/unitree.svg';
import sifreecadIcon from '../../images/tech/freecad.svg';
import siopenscadIcon from '../../images/tech/openscad.svg';
import sikicadIcon from '../../images/tech/kicad.svg';
import sibambustudioIcon from '../../images/tech/bambustudio.png';
import siautodeskfusionIcon from '../../images/tech/autodeskfusion.svg';
import sialtiumdesignerIcon from '../../images/tech/altiumdesigner.png';
import sicatiaIcon from '../../images/tech/catia.png';
import sisiemensnxIcon from '../../images/tech/siemensnx.svg';
import sintopIcon from '../../images/tech/ntop.svg';
import siultimakercuraIcon from '../../images/tech/ultimakercura.png';
import simastercamIcon from '../../images/tech/mastercam.svg';
import siphysicsxIcon from '../../images/tech/physicsx.png';
import siarduinoIcon from '../../images/tech/arduino.svg';
import siraspberrypiIcon from '../../images/tech/raspberrypi.svg';
import siespressifIcon from '../../images/tech/espressif.svg';
import siplatformioIcon from '../../images/tech/platformio.svg';
import sizephyrIcon from '../../images/tech/zephyr.svg';
import sifreertosIcon from '../../images/tech/freertos.png';
import simicropythonIcon from '../../images/tech/micropython.svg';
import sicircuitpythonIcon from '../../images/tech/circuitpython.svg';
import sinordicsemiconductorIcon from '../../images/tech/nordicsemiconductor.svg';
import siyoctoprojectIcon from '../../images/tech/yoctoproject.png';
import sibalenaIcon from '../../images/tech/balena.svg';
import sigoliothIcon from '../../images/tech/golioth.png';
import sibluesIcon from '../../images/tech/blues.png';
import siparticleIcon from '../../images/tech/particle.svg';
import sitoitIcon from '../../images/tech/toit.png';
import siembassyIcon from '../../images/tech/embassy.png';
import siriotIcon from '../../images/tech/riot.svg';
import sitinygoIcon from '../../images/tech/tinygo.svg';
import siedgeimpulseIcon from '../../images/tech/edgeimpulse.svg';
import silitertIcon from '../../images/tech/litert.png';
import sinoderedIcon from '../../images/tech/nodered.svg';
import siignitionIcon from '../../images/tech/ignition.png';
import sithingsboardIcon from '../../images/tech/thingsboard.svg';
import siemqxIcon from '../../images/tech/emqx.svg';
import sihivemqIcon from '../../images/tech/hivemq.svg';
import simosquittoIcon from '../../images/tech/mosquitto.svg';
import siubidotsIcon from '../../images/tech/ubidots.svg';
import sireacthookformIcon from '../../images/tech/reacthookform.svg';
import siformikIcon from '../../images/tech/formik.svg';
import sireactariaIcon from '../../images/tech/reactaria.svg';
import siarkuiIcon from '../../images/tech/arkui.svg';
import siheadlessuiIcon from '../../images/tech/headlessui.svg';
import sifloatinguiIcon from '../../images/tech/floatingui.png';
import siaggridIcon from '../../images/tech/aggrid.png';
import sivikeIcon from '../../images/tech/vike.svg';
import sigsapIcon from '../../images/tech/gsap.svg';
import sireactspringIcon from '../../images/tech/reactspring.svg';
import sirspackIcon from '../../images/tech/rspack.svg';
import silernaIcon from '../../images/tech/lerna.svg';
import sivanillaextractIcon from '../../images/tech/vanillaextract.svg';
import sipostcssIcon from '../../images/tech/postcss.svg';
import sistyledictionaryIcon from '../../images/tech/styledictionary.png';
import silightningcssIcon from '../../images/tech/lightningcss.svg';
import silucideIcon from '../../images/tech/lucide.svg';
import siphosphoriconsIcon from '../../images/tech/phosphoricons.svg';
import sifontawesomeIcon from '../../images/tech/fontawesome.svg';
import siiconifyIcon from '../../images/tech/iconify.svg';
import sibevyIcon from '../../images/tech/bevy.svg';
import sitresjsIcon from '../../images/tech/tresjs.svg';
import sistoryblokIcon from '../../images/tech/storyblok.svg';
import sicraftcmsIcon from '../../images/tech/craftcms.svg';
import simagentoIcon from '../../images/tech/magento.svg';
import sihygraphIcon from '../../images/tech/hygraph.png';
import sitallyIcon from '../../images/tech/tally.svg';
import siloopsIcon from '../../images/tech/loops.svg';
import siplausibleIcon from '../../images/tech/plausible.svg';
import sisimpleanalyticsIcon from '../../images/tech/simpleanalytics.svg';
import sicanvaIcon from '../../images/tech/canva.svg';
import sizeplinIcon from '../../images/tech/zeplin.svg';
import sifigjamIcon from '../../images/tech/figjam.svg';
import siundrawIcon from '../../images/tech/undraw.svg';
import sicapcutIcon from '../../images/tech/capcut.svg';
import siabletonliveIcon from '../../images/tech/abletonlive.svg';
import sihandbrakeIcon from '../../images/tech/handbrake.png';
import sipremiereproIcon from '../../images/tech/premierepro.svg';
import siaftereffectsIcon from '../../images/tech/aftereffects.svg';
import simuxIcon from '../../images/tech/mux.svg';
import sistreamyardIcon from '../../images/tech/streamyard.svg';
import siflstudioIcon from '../../images/tech/flstudio.png';
import sidefoldIcon from '../../images/tech/defold.png';
import sigdevelopIcon from '../../images/tech/gdevelop.svg';
import sihoudiniIcon from '../../images/tech/houdini.svg';
import sizbrushIcon from '../../images/tech/zbrush.png';
import simidjourneyIcon from '../../images/tech/midjourney.svg';
import sirunwayIcon from '../../images/tech/runway.svg';
import sipikaIcon from '../../images/tech/pika.svg';
import siudioIcon from '../../images/tech/udio.svg';
import siideogramIcon from '../../images/tech/ideogram.svg';
import sikreaIcon from '../../images/tech/krea.svg';
import siklingaiIcon from '../../images/tech/klingai.png';
import siadobefireflyIcon from '../../images/tech/adobefirefly.svg';
import sihiggsfieldIcon from '../../images/tech/higgsfield.png';
import sirecraftIcon from '../../images/tech/recraft.svg';
import sichainguardIcon from '../../images/tech/chainguard.svg';
import sianchoreIcon from '../../images/tech/anchore.png';
import sidependencytrackIcon from '../../images/tech/dependencytrack.png';
import sitetragonIcon from '../../images/tech/tetragon.png';
import sikubescapeIcon from '../../images/tech/kubescape.png';
import siwazuhIcon from '../../images/tech/wazuh.svg';
import sivelociraptorIcon from '../../images/tech/velociraptor.png';
import sicaidoIcon from '../../images/tech/caido.png';
import sighidraIcon from '../../images/tech/ghidra.svg';
import sibloodhoundIcon from '../../images/tech/bloodhound.png';
import sicalderaIcon from '../../images/tech/caldera.png';
import siatomicredteamIcon from '../../images/tech/atomicredteam.png';
import sicyberchefIcon from '../../images/tech/cyberchef.svg';
import sishodanIcon from '../../images/tech/shodan.svg';
import sihaveibeenpwnedIcon from '../../images/tech/haveibeenpwned.svg';
import sidopplerIcon from '../../images/tech/doppler.svg';
import si1passwordIcon from '../../images/tech/1password.svg';
import silimacharlieIcon from '../../images/tech/limacharlie.png';
import sinucleiIcon from '../../images/tech/nuclei.svg';
import sibinaryninjaIcon from '../../images/tech/binaryninja.svg';
import sigreynoiseIcon from '../../images/tech/greynoise.png';
import siakeylessIcon from '../../images/tech/akeyless.png';
import sihiddenlayerIcon from '../../images/tech/hiddenlayer.png';
import sistarshipIcon from '../../images/tech/starship.svg';
import sinixIcon from '../../images/tech/nix.png';
import sibazelIcon from '../../images/tech/bazel.svg';
import sibuck2Icon from '../../images/tech/buck2.svg';
import sigitbutlerIcon from '../../images/tech/gitbutler.png';
import sisourcegraphIcon from '../../images/tech/sourcegraph.svg';
import sibatIcon from '../../images/tech/bat.svg';
import sihoppscotchIcon from '../../images/tech/hoppscotch.svg';
import sitableplusIcon from '../../images/tech/tableplus.png';
import sibeekeeperstudioIcon from '../../images/tech/beekeeperstudio.svg';
import sichangesetsIcon from '../../images/tech/changesets.png';
import siknipIcon from '../../images/tech/knip.svg';
import sibencherIcon from '../../images/tech/bencher.png';
import sicodeiumIcon from '../../images/tech/codeium.png';
import simiseIcon from '../../images/tech/mise.svg';
import siunderstandanythingIcon from '../../images/tech/understandanything.png';
import sidiaIcon from '../../images/tech/dia.png';
import sijanIcon from '../../images/tech/jan.png';
import sianythingllmIcon from '../../images/tech/anythingllm.svg';
import sisanaIcon from '../../images/tech/sana.svg';
import sipoeIcon from '../../images/tech/poe.svg';
import sinotionmailIcon from '../../images/tech/notionmail.svg';
import sicuaIcon from '../../images/tech/cua.svg';
import sidaytonaIcon from '../../images/tech/daytona.png';
import simorphIcon from '../../images/tech/morph.svg';
import sigensparkIcon from '../../images/tech/genspark.png';
import sifirefliesaiIcon from '../../images/tech/firefliesai.png';
import siconsensusIcon from '../../images/tech/consensus.svg';
import silegoraIcon from '../../images/tech/legora.png';
import sirogoIcon from '../../images/tech/rogo.png';
import sihebbiaIcon from '../../images/tech/hebbia.svg';
import siplaudIcon from '../../images/tech/plaud.png';
import siclayIcon from '../../images/tech/clay.png';
import sielicitIcon from '../../images/tech/elicit.svg';
import sinapkinaiIcon from '../../images/tech/napkinai.png';
import sicognitionIcon from '../../images/tech/cognition.svg';
import simotokoIcon from '../../images/tech/motoko.png';
import sizipdevIcon from '../../images/tech/zipdev.png';
import sicohereIcon from '../../images/tech/cohere.svg';
import siexaIcon from '../../images/tech/exa.svg';
import silibrechatIcon from '../../images/tech/librechat.svg';
import siopenspecIcon from '../../images/tech/openspec.png';
import siscreenpipeIcon from '../../images/tech/screenpipe.png';
import siklavisIcon from '../../images/tech/klavis.png';
import sipineconeIcon from '../../images/tech/pinecone.svg';
import sicamelIcon from '../../images/tech/camel.png';
import siuniverIcon from '../../images/tech/univer.png';
import sicoderIcon from '../../images/tech/coder.svg';
import siphotopeaIcon from '../../images/tech/photopea.svg';
import siturboIcon from '../../images/tech/turbo.svg';
import simillionIcon from '../../images/tech/million.svg';
import siwakuIcon from '../../images/tech/waku.svg';
import sieleventyIcon from '../../images/tech/eleventy.svg';
import sihugoIcon from '../../images/tech/hugo.svg';
import sizolaIcon from '../../images/tech/zola.svg';
import sinitroIcon from '../../images/tech/nitro.png';
import sishikiIcon from '../../images/tech/shiki.svg';
import simeltuiIcon from '../../images/tech/meltui.png';
import sinueIcon from '../../images/tech/nue.png';
import sizagjsIcon from '../../images/tech/zagjs.svg';
import simoonIcon from '../../images/tech/moon.svg';
import siwebcontainersIcon from '../../images/tech/webcontainers.svg';
import siferretdbIcon from '../../images/tech/ferretdb.svg';
import sigarnetIcon from '../../images/tech/garnet.png';
import siatlasIcon from '../../images/tech/atlas.png';
import sikyselyIcon from '../../images/tech/kysely.png';
import sientIcon from '../../images/tech/ent.png';
import sisqlcIcon from '../../images/tech/sqlc.png';
import sihasuraIcon from '../../images/tech/hasura.svg';
import sipostgrestIcon from '../../images/tech/postgrest.png';
import siconvexIcon from '../../images/tech/convex.svg';
import sicentrifugoIcon from '../../images/tech/centrifugo.png';
import sipgdogIcon from '../../images/tech/pgdog.png';
import silitestreamIcon from '../../images/tech/litestream.png';
import sidataeaseIcon from '../../images/tech/dataease.png';
import siantflyIcon from '../../images/tech/antfly.png';
import siharborIcon from '../../images/tech/harbor.svg';
import sicertmanagerIcon from '../../images/tech/certmanager.svg';
import sikarmadaIcon from '../../images/tech/karmada.png';
import sivclusterIcon from '../../images/tech/vcluster.png';
import siveleroIcon from '../../images/tech/velero.svg';
import sipersesIcon from '../../images/tech/perses.svg';
import sifluentbitIcon from '../../images/tech/fluentbit.svg';
import sichaosmeshIcon from '../../images/tech/chaosmesh.png';
import siwoodpeckerciIcon from '../../images/tech/woodpeckerci.svg';
import siopenpolicyagentIcon from '../../images/tech/openpolicyagent.svg';
import sikratixIcon from '../../images/tech/kratix.png';
import sihumanitecIcon from '../../images/tech/humanitec.png';
import sidepotIcon from '../../images/tech/depot.svg';
import six64dbgIcon from '../../images/tech/x64dbg.png';
import siradare2Icon from '../../images/tech/radare2.png';
import sicrowdsecIcon from '../../images/tech/crowdsec.svg';
import siopenctiIcon from '../../images/tech/opencti.png';
import sigitleaksIcon from '../../images/tech/gitleaks.png';
import sikanidmIcon from '../../images/tech/kanidm.svg';
import sipomeriumIcon from '../../images/tech/pomerium.svg';
import sifirezoneIcon from '../../images/tech/firezone.svg';
import simvtIcon from '../../images/tech/mvt.png';
import siimmichIcon from '../../images/tech/immich.svg';
import sikarakeepIcon from '../../images/tech/karakeep.svg';
import sidockgeIcon from '../../images/tech/dockge.svg';
import sibeszelIcon from '../../images/tech/beszel.svg';
import sinetbirdIcon from '../../images/tech/netbird.svg';
import sipangolinIcon from '../../images/tech/pangolin.svg';
import siaudiobookshelfIcon from '../../images/tech/audiobookshelf.svg';
import sinavidromeIcon from '../../images/tech/navidrome.svg';
import sipaperlessngxIcon from '../../images/tech/paperlessngx.svg';
import siforgejoIcon from '../../images/tech/forgejo.svg';
import sigiteaIcon from '../../images/tech/gitea.svg';
import sirustdeskIcon from '../../images/tech/rustdesk.svg';
import singinxproxymanagerIcon from '../../images/tech/nginxproxymanager.svg';
import sikasmworkspacesIcon from '../../images/tech/kasmworkspaces.svg';
import sisnapdropIcon from '../../images/tech/snapdrop.svg';
import sitwakedriveIcon from '../../images/tech/twakedrive.svg';
import sifyroxIcon from '../../images/tech/fyrox.png';
import siitchioIcon from '../../images/tech/itchio.png';
import sirenpyIcon from '../../images/tech/renpy.svg';
import sicascadeurIcon from '../../images/tech/cascadeur.png';
import sildtkIcon from '../../images/tech/ldtk.png';
import sistrudelIcon from '../../images/tech/strudel.png';
import simarvelousdesignerIcon from '../../images/tech/marvelousdesigner.png';
import sicodecraftersIcon from '../../images/tech/codecrafters.svg';
import sitheodinprojectIcon from '../../images/tech/theodinproject.svg';
import sifrontendmentorIcon from '../../images/tech/frontendmentor.svg';
import sibootdevIcon from '../../images/tech/bootdev.png';
import silogseqIcon from '../../images/tech/logseq.svg';
import siheptabaseIcon from '../../images/tech/heptabase.svg';
import sianytypeIcon from '../../images/tech/anytype.svg';
import sicapacitiesIcon from '../../images/tech/capacities.png';
import sibasecampIcon from '../../images/tech/basecamp.svg';
import sitwistIcon from '../../images/tech/twist.svg';
import siworktrunkIcon from '../../images/tech/worktrunk.png';
import sifilesmdIcon from '../../images/tech/filesmd.svg';
import siapachesupersetIcon from '../../images/tech/apachesuperset.svg';
import siopensearchIcon from '../../images/tech/opensearch.svg';
import siapachedorisIcon from '../../images/tech/apachedoris.svg';
import siredpandaIcon from '../../images/tech/redpanda.png';
import siredashIcon from '../../images/tech/redash.svg';
import sigrafanalokiIcon from '../../images/tech/grafanaloki.svg';
import sirancherdesktopIcon from '../../images/tech/rancherdesktop.svg';
import siheadlampIcon from '../../images/tech/headlamp.svg';
import sikubeflowIcon from '../../images/tech/kubeflow.svg';
import siudacityIcon from '../../images/tech/udacity.svg';
import siunifiIcon from '../../images/tech/unifi.svg';
import singrokIcon from '../../images/tech/ngrok.png';
import sizoomIcon from '../../images/tech/zoom.svg';
import sitwilioIcon from '../../images/tech/twilio.svg';
import siodooIcon from '../../images/tech/odoo.svg';
import sisolidworksIcon from '../../images/tech/solidworks.svg';
import sisolidedgeIcon from '../../images/tech/solidedge.svg';
import sionshapeIcon from '../../images/tech/onshape.png';
import siautocadIcon from '../../images/tech/autocad.svg';
import sirhinoIcon from '../../images/tech/rhino.svg';
import sisketchupIcon from '../../images/tech/sketchup.svg';
import sitinkercadIcon from '../../images/tech/tinkercad.svg';
import sicadqueryIcon from '../../images/tech/cadquery.png';
import simatlabIcon from '../../images/tech/matlab.svg';
import sisimulinkIcon from '../../images/tech/simulink.png';
import siltspiceIcon from '../../images/tech/ltspice.svg';
import siproteusIcon from '../../images/tech/proteus.svg';
import sieagleIcon from '../../images/tech/eagle.svg';
import sieasyedaIcon from '../../images/tech/easyeda.svg';
import sipx4Icon from '../../images/tech/px4.png';
import siardupilotIcon from '../../images/tech/ardupilot.png';
import simavlinkIcon from '../../images/tech/mavlink.png';
import sinav2Icon from '../../images/tech/nav2.svg';
import siintelrealsenseIcon from '../../images/tech/intelrealsense.png';
import siopenmvIcon from '../../images/tech/openmv.png';
import siuniversalrobotsIcon from '../../images/tech/universalrobots.svg';
import siabbIcon from '../../images/tech/abb.svg';
import sidjiIcon from '../../images/tech/dji.svg';
import sistm32Icon from '../../images/tech/stm32.svg';
import sibeagleboardIcon from '../../images/tech/beagleboard.png';
import siadafruitIcon from '../../images/tech/adafruit.svg';
import sisparkfunIcon from '../../images/tech/sparkfun.svg';
import siklipperIcon from '../../images/tech/klipper.svg';
import simarlinIcon from '../../images/tech/marlin.png';
import sioctoprintIcon from '../../images/tech/octoprint.svg';
import silitellmIcon from '../../images/tech/litellm.svg';
import siguidanceIcon from '../../images/tech/guidance.png';
import simirascopeIcon from '../../images/tech/mirascope.png';
import siragasIcon from '../../images/tech/ragas.svg';
import siagentaIcon from '../../images/tech/agenta.png';
import sihumanloopIcon from '../../images/tech/humanloop.svg';
import sipromptlayerIcon from '../../images/tech/promptlayer.png';
import sijinaaiIcon from '../../images/tech/jinaai.svg';
import sitavilyIcon from '../../images/tech/tavily.svg';
import sicrawl4aiIcon from '../../images/tech/crawl4ai.svg';
import sidoclingIcon from '../../images/tech/docling.svg';
import sie2bIcon from '../../images/tech/e2b.png';
import sismitheryIcon from '../../images/tech/smithery.svg';
import sichainlitIcon from '../../images/tech/chainlit.png';
import siopenwebuiIcon from '../../images/tech/openwebui.svg';
import simlxIcon from '../../images/tech/mlx.png';
import simetagptIcon from '../../images/tech/metagpt.svg';
import siautogptIcon from '../../images/tech/autogpt.png';
import siaiderIcon from '../../images/tech/aider.png';
import sifortranIcon from '../../images/tech/fortran.svg';
import sicommonlispIcon from '../../images/tech/commonlisp.svg';
import sidIcon from '../../images/tech/d.svg';
import siprologIcon from '../../images/tech/prolog.svg';
import sivalaIcon from '../../images/tech/vala.svg';
import sigunicornIcon from '../../images/tech/gunicorn.svg';
import sisailsjsIcon from '../../images/tech/sailsjs.svg';
import sifeathersIcon from '../../images/tech/feathers.svg';
import sikoaIcon from '../../images/tech/koa.svg';
import sirenderIcon from '../../images/tech/render.svg';
import silinodeIcon from '../../images/tech/linode.svg';
import sivultrIcon from '../../images/tech/vultr.svg';
import sinumbaIcon from '../../images/tech/numba.svg';
import sianacondaIcon from '../../images/tech/anaconda.svg';
import sialpinejsIcon from '../../images/tech/alpinejs.svg';
import sigatsbyIcon from '../../images/tech/gatsby.svg';
import siscylladbIcon from '../../images/tech/scylladb.svg';
import sicouchdbIcon from '../../images/tech/couchdb.svg';
import sipixijsIcon from '../../images/tech/pixijs.svg';
import sishopwareIcon from '../../images/tech/shopware.svg';
import sitmuxIcon from '../../images/tech/tmux.svg';
import sipreziIcon from '../../images/tech/prezi.svg';
import sigreptileIcon from '../../images/tech/greptile.svg';
import sidropboxIcon from '../../images/tech/dropbox.svg';
// Windows Autopilot has no logo of its own; this is Microsoft's own Fluent
// UI glyph for autopilot, rather than the Windows mark it ships under.
import siwindowsautopilotIcon from '../../images/tech/windowsautopilot.svg';
// Fabrix.ai: the mark cut from the company's own logo, without the wordmark.
import sifabrixaiIcon from '../../images/tech/fabrixai.png';
// Gentle AI: the neon rose from Gentleman Programming's own brand assets.
import sigentleaiIcon from '../../images/tech/gentleai.png';

const TECH_GROUPS = [
  {
    // The Stars: every technology with a public project behind it, moved up
    // from its own group (which got a new tile in its place) and ordered by
    // how many projects it carries. Everything else on the wall is used under
    // NDA, in personal work, or kept on the radar — the lede says so.
    id: 'stars',
    items: [
      { name: 'Python', icon: python, mono: true },
      { name: 'Django', icon: django, mono: true },
      { name: 'Java', icon: java, mono: true },
      { name: 'JavaScript', icon: javascript, mono: true },
      { name: 'Docker', icon: docker, mono: true },
      { name: 'C#', icon: csharp, mono: true },
      { name: 'R', icon: rIcon, mono: true },
      { name: 'Spring Boot', icon: spring, mono: true },
      { name: 'FastAPI', icon: fastapiIcon, mono: true },
      { name: 'JWT', icon: jwt, flat: true },
      { name: 'LangGraph', icon: langgraphIcon, mono: true },
      { name: 'PyTorch', icon: pytorchIcon, mono: true },
      { name: 'AWS', icon: aws, mono: true },
      { name: 'Kubernetes', icon: kubernetes, mono: true },
      { name: 'PostgreSQL', icon: postgresql, mono: true },
      { name: 'Oracle', icon: oracle, mono: true },
      { name: 'React', icon: react, mono: true },
      { name: 'Gradle', icon: sigradleIcon, mono: true },
      { name: 'E-commerce', concept: 'ecommerce' },
      { name: 'Strudel', icon: sistrudelIcon, flat: true },
      { name: 'Selenium', icon: selenium, mono: true },
      { name: 'Behave', concept: 'bdd' },
    ],
  },
  {
    id: 'languages',
    items: [
      { name: 'TypeScript', icon: typescriptIcon, mono: true },
      { name: 'Go', icon: goIcon, mono: true },
      { name: 'PHP', icon: phpIcon, mono: true },
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
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'Gleam', icon: sigleamIcon, mono: true },
      { name: 'Nushell', icon: sinushellIcon, mono: true },
      { name: 'Luau', icon: siluauIcon, mono: true },
      { name: 'Nim', icon: sinimIcon, mono: true },
      { name: 'Crystal', icon: sicrystalIcon, mono: true },
      { name: 'Mojo', icon: simojoIcon, mono: true },
      { name: 'Odin', icon: siodinIcon, mono: true },
      { name: 'V', icon: sivIcon, mono: true },
      { name: 'ReScript', icon: sirescriptIcon, mono: true },
      { name: 'PureScript', icon: sipurescriptIcon, mono: true },
      // The 2026 intake, second pass.
      { name: 'Unison', icon: siunisonIcon, flat: true },
      { name: 'Uiua', icon: siuiuaIcon, flat: true },
      { name: 'Chapel', icon: sichapelIcon, flat: true },
      { name: 'Futhark', icon: sifutharkIcon, flat: true },
      { name: 'Elm', icon: sielmIcon, mono: true },
      { name: 'Racket', icon: siracketIcon, mono: true },
      { name: 'Haxe', icon: sihaxeIcon, mono: true },
      { name: 'Ballerina', icon: siballerinaIcon, mono: true },
      { name: 'CUE', icon: sicueIcon, flat: true },
      { name: 'Janet', icon: sijanetIcon, mono: true },
      // Motoko has no mark of its own; it is DFINITY's language and wears
      // DFINITY's, the way Axum wears Tokio's further up.
      { name: 'Motoko', icon: simotokoIcon, flat: true },
      // In for the star this group sent up to The Stars.
      { name: 'Fortran', icon: sifortranIcon, mono: true },
      { name: 'Common Lisp', icon: sicommonlispIcon, mono: true },
      { name: 'D', icon: sidIcon, mono: true },
      { name: 'Prolog', icon: siprologIcon, mono: true },
      { name: 'Vala', icon: sivalaIcon, mono: true },
    ],
  },
  {
    id: 'backend',
    items: [
      { name: 'Django REST', icon: djangorest, mono: true },
      { name: 'Node.js', icon: nodeIcon, mono: true },
      { name: 'AdonisJS', icon: adonisIcon, mono: true },
      { name: 'Express', icon: expressIcon, mono: true },
      { name: 'Flask', icon: flaskIcon, mono: true },
      { name: 'Vaadin', icon: vaadinIcon, mono: true },
      { name: 'Laravel', icon: laravelIcon, mono: true },
      // simple-icons ships one black path, so it inverts in dark like the
      // other monochrome marks here.
      { name: 'Gin', icon: ginIcon, mono: true },
      { name: 'Fastify', icon: fastifyIcon, mono: true },
      { name: 'Microservices', concept: 'microservices' },
      { name: 'Multi-tenancy', concept: 'saas' },
      { name: 'Event-driven', concept: 'eventDriven' },
      { name: 'Distributed systems', concept: 'distributed' },
      { name: 'GraphQL', icon: graphqlIcon, mono: true },
      // The two brokers behind the event-driven and streaming claims above.
      { name: 'RabbitMQ', icon: rabbitmqIcon, mono: true },
      { name: 'Apache Kafka', icon: kafkaIcon, mono: true },
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
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'Drizzle', icon: sidrizzleIcon, mono: true },
      { name: 'Axum', icon: siaxumIcon, mono: true },
      { name: 'NATS.io', icon: sinatsdotioIcon, mono: true },
      { name: 'Elysia', icon: sielysiaIcon, mono: true },
      { name: 'Actix', icon: siactixIcon, mono: true },
      { name: 'Litestar', icon: silitestarIcon, mono: true },
      { name: 'Rocket', icon: sirocketIcon, mono: true },
      { name: 'Inngest', icon: siinngestIcon, mono: true },
      { name: 'Sanic', icon: sisanicIcon, mono: true },
      { name: 'Encore', icon: siencoreIcon, flat: true },
      // The 2026 intake, second pass.
      { name: 'gRPC', icon: sigrpcIcon, mono: true },
      { name: 'KrakenD', icon: sikrakendIcon, mono: true },
      { name: 'PocketBase', icon: sipocketbaseIcon, mono: true },
      { name: 'Appwrite', icon: siappwriteIcon, mono: true },
      { name: 'Dapr', icon: sidaprIcon, mono: true },
      { name: 'Effect', icon: sieffectIcon, mono: true },
      { name: 'Buf', icon: sibufIcon, flat: true },
      { name: 'Robyn', icon: sirobynIcon, flat: true },
      { name: 'Taskiq', icon: sitaskiqIcon, flat: true },
      { name: 'BullMQ', icon: sibullmqIcon, flat: true },
      { name: 'SQLModel', icon: sisqlmodelIcon, flat: true },
      // Tech week, the top-up.
      { name: 'FerretDB', icon: siferretdbIcon, mono: true },
      { name: 'Garnet', icon: sigarnetIcon, flat: true },
      { name: 'Atlas', icon: siatlasIcon, flat: true },
      { name: 'Kysely', icon: sikyselyIcon, flat: true },
      { name: 'Ent', icon: sientIcon, flat: true },
      { name: 'sqlc', icon: sisqlcIcon, flat: true },
      { name: 'Hasura', icon: sihasuraIcon, mono: true },
      { name: 'PostgREST', icon: sipostgrestIcon, flat: true },
      { name: 'Convex', icon: siconvexIcon, mono: true },
      { name: 'Centrifugo', icon: sicentrifugoIcon, flat: true },
      { name: 'PgDog', icon: sipgdogIcon, flat: true },
      { name: 'Litestream', icon: silitestreamIcon, flat: true },
      // In for the star this group sent up to The Stars.
      { name: 'Gunicorn', icon: sigunicornIcon, mono: true },
      { name: 'Sails.js', icon: sisailsjsIcon, mono: true },
      { name: 'Feathers', icon: sifeathersIcon, mono: true },
      { name: 'Koa', icon: sikoaIcon, mono: true },
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
      { name: 'AI Agents', concept: 'agents' },
      { name: 'LLM & RAG', concept: 'rag' },
      { name: 'Machine Learning', concept: 'ml' },
      // Not a synonym for the line above it: machine learning covers the
      // classical methods too — the stroke classifier in the catalogue is a
      // random forest, not a network — so the distinction carries information
      // rather than repeating a word.
      { name: 'Neural networks', concept: 'neuralNet' },
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
      { name: 'scikit-learn', icon: scikitlearnIcon, mono: true },
      { name: 'Keras', icon: kerasIcon, mono: true },
      { name: 'NumPy', icon: numpyIcon, mono: true },
      { name: 'Jupyter', icon: jupyterIcon, mono: true },
      { name: 'OpenCV', icon: opencvIcon, mono: true },
      { name: 'MLflow', icon: mlflowIcon, mono: true },
      { name: 'ONNX', icon: onnxIcon, mono: true },
      { name: 'Gradio', icon: gradioIcon, mono: true },
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'BentoML', icon: sibentomlIcon, mono: true },
      { name: 'LlamaIndex', icon: sillamaindexIcon, mono: true },
      { name: 'Streamlit', icon: sistreamlitIcon, mono: true },
      { name: 'DSPy', icon: sidspyIcon, flat: true },
      { name: 'Optuna', icon: sioptunaIcon, mono: true },
      { name: 'Langfuse', icon: silangfuseIcon, mono: true },
      { name: 'spaCy', icon: sispacyIcon, mono: true },
      { name: 'SGLang', icon: sisglangIcon, flat: true },
      { name: 'DVC', icon: sidvcIcon, mono: true },
      { name: 'Unsloth', icon: siunslothIcon, flat: true },
      // Agents, and what makes one persistent: Hermes runs on your own box
      // and keeps what it learns, Letta and Mem0 are the memory under that
      // idea, and Composio is the tools it reaches for. Capy runs a lot of
      // them at once, which is the other way to make an agent useful.
      { name: 'Hermes', icon: sihermesIcon, mono: true },
      { name: 'Capy', icon: sicapyIcon, mono: true },
      { name: 'Composio', icon: sicomposioIcon, mono: true },
      { name: 'Letta', icon: silettaIcon, flat: true },
      { name: 'Mem0', icon: simem0Icon, flat: true },
      // The agent bench, 2026.
      { name: 'Axolotl', icon: siaxolotlIcon, flat: true },
      { name: 'bitsandbytes', icon: sibitsandbytesIcon, flat: true },
      { name: 'ZenML', icon: sizenmlIcon, flat: true },
      { name: 'Flyte', icon: siflyteIcon, flat: true },
      { name: 'Label Studio', icon: silabelstudioIcon, mono: true },
      { name: 'LightGBM', icon: silightgbmIcon, flat: true },
      { name: 'JAX', icon: sijaxIcon, mono: true },
      { name: 'SciPy', icon: siscipyIcon, mono: true },
      { name: 'SHAP', icon: sishapIcon, flat: true },
      // Tech week, the top-up.
      { name: 'Pinecone', icon: sipineconeIcon, mono: true },
      // In for the star this group sent up to The Stars.
      { name: 'Numba', icon: sinumbaIcon, mono: true },
      { name: 'Anaconda', icon: sianacondaIcon, mono: true },
    ],
  },
  {
    id: 'agents',
    items: [
      // The agent-engineering bench: frameworks, memory, tools, evals.
      // The agent bench, 2026.
      { name: 'Supermemory', icon: sisupermemoryIcon, flat: true },
      { name: 'FastMCP', icon: sifastmcpIcon, flat: true },
      { name: 'Browser Use', icon: sibrowseruseIcon, flat: true },
      { name: 'Firecrawl', icon: sifirecrawlIcon, mono: true },
      { name: 'RAGFlow', icon: siragflowIcon, flat: true },
      { name: 'Unstructured', icon: siunstructuredIcon, mono: true },
      { name: 'Nomic', icon: sinomicIcon, flat: true },
      { name: 'Opik', icon: siopikIcon, flat: true },
      { name: 'Helicone', icon: siheliconeIcon, flat: true },
      { name: 'Promptfoo', icon: sipromptfooIcon, flat: true },
      { name: 'Outlines', icon: sioutlinesIcon, flat: true },
      { name: 'BAML', icon: sibamlIcon, flat: true },
      { name: 'Zep', icon: sizepIcon, flat: true },
      { name: 'Stagehand', icon: sistagehandIcon, flat: true },
      { name: 'Braintrust', icon: sibraintrustIcon, mono: true },
      { name: 'DBOS', icon: sidbosIcon, flat: true },
      { name: 'Browserbase', icon: sibrowserbaseIcon, mono: true },
      { name: 'Reducto', icon: sireductoIcon, flat: true },
      { name: 'Strands Agents', icon: sistrandsagentsIcon, mono: true },
      // Tech week, the top-up.
      { name: 'Cohere', icon: sicohereIcon, mono: true },
      { name: 'Exa', icon: siexaIcon, mono: true },
      { name: 'LibreChat', icon: silibrechatIcon, mono: true },
      { name: 'OpenSpec', icon: siopenspecIcon, flat: true },
      { name: 'Screenpipe', icon: siscreenpipeIcon, flat: true },
      { name: 'Klavis', icon: siklavisIcon, flat: true },
      { name: 'CAMEL', icon: sicamelIcon, flat: true },
      // Third intake.
      { name: 'LiteLLM', icon: silitellmIcon, mono: true },
      { name: 'Guidance', icon: siguidanceIcon, flat: true },
      { name: 'Mirascope', icon: simirascopeIcon, flat: true },
      { name: 'Ragas', icon: siragasIcon, mono: true },
      { name: 'Agenta', icon: siagentaIcon, flat: true },
      { name: 'Humanloop', icon: sihumanloopIcon, mono: true },
      { name: 'PromptLayer', icon: sipromptlayerIcon, flat: true },
      { name: 'Jina AI', icon: sijinaaiIcon, mono: true },
      { name: 'Tavily', icon: sitavilyIcon, mono: true },
      { name: 'Crawl4AI', icon: sicrawl4aiIcon, mono: true },
      { name: 'Docling', icon: sidoclingIcon, mono: true },
      { name: 'E2B', icon: sie2bIcon, flat: true },
      { name: 'Smithery', icon: sismitheryIcon, mono: true },
      { name: 'Chainlit', icon: sichainlitIcon, flat: true },
      { name: 'Open WebUI', icon: siopenwebuiIcon, mono: true },
      { name: 'MLX', icon: simlxIcon, flat: true },
      { name: 'MetaGPT', icon: simetagptIcon, mono: true },
      { name: 'AutoGPT', icon: siautogptIcon, flat: true },
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
      // Meta has not published a mark for Muse, so the tile carries Meta's own,
      // the way Codex carries OpenAI's and NemoClaw carries NVIDIA's. The name
      // says which product it is.
      { name: 'Muse (Meta)', icon: metaIcon, mono: true },
      { name: 'ElevenLabs', icon: elevenlabsIcon, mono: true },
      { name: 'Suno', icon: sunoIcon, mono: true },
      { name: 'LM Studio', icon: lmstudioIcon, mono: true },
      { name: 'NotebookLM', icon: notebooklmIcon, mono: true },
      { name: 'v0', icon: v0Icon, mono: true },
      { name: 'Warp', icon: warpIcon, mono: true },
      { name: 'Raycast', icon: raycastIcon, mono: true },
      // No logo to import: TypeSafe AI shipped this on 15 September 2026 and
      // simple-icons does not carry it yet, so it uses a drawn mark like the
      // concepts do.
      { name: 'Jev', concept: 'jev' },
      { name: 'Kimi', icon: kimiIcon, mono: true },
      { name: 'MiniMax', icon: minimaxIcon, mono: true },
      { name: 'Replit', icon: replitIcon, mono: true },
      // No mark in simple-icons, so it gets a drawn one like Jev: a prompt
      // going in and a running app coming out, which is the product.
      { name: 'Lovable', concept: 'lovable' },
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'CodeRabbit', icon: sicoderabbitIcon, mono: true },
      { name: 'Antigravity', icon: siantigravityIcon, mono: true },
      { name: 'Kiro', icon: sikiroIcon, mono: true },
      { name: 'Google Jules', icon: sigooglejulesIcon, mono: true },
      { name: 'Devin', icon: sidevinIcon, mono: true },
      { name: 'Zapier', icon: sizapierIcon, mono: true },
      { name: 'Amp', icon: siampIcon, mono: true },
      { name: 'Make', icon: simakeIcon, mono: true },
      { name: 'Bolt.new', icon: siboltnewIcon, mono: true },
      { name: 'Roo Code', icon: siroocodeIcon, mono: true },
      // Agents, late 2026. ARTEMIS drives an Android device rather than a
      // repository, which makes it the odd one here and the reason it is worth
      // knowing about.
      { name: 'ARTEMIS', icon: siartemisIcon, mono: true },
      { name: 'OpenHands', icon: siopenhandsIcon, mono: true },
      { name: 'Goose', icon: sigooseIcon, mono: true },
      { name: 'Trae', icon: sitraeIcon, mono: true },
      { name: 'Qodo', icon: siqodoIcon, mono: true },
      // Agents that do business rather than code. Accio is Alibaba's sourcing
      // agent — it finds suppliers, compares offers and keeps a negotiation
      // moving, which is the closest thing on this wall to what Radii does.
      { name: 'Accio', icon: siaccioIcon, mono: true },
      { name: 'Manus', icon: simanusIcon, mono: true },
      { name: 'Activepieces', icon: siactivepiecesIcon, mono: true },
      { name: 'Windmill', icon: siwindmillIcon, mono: true },
      { name: 'Skywork', icon: siskyworkIcon, mono: true },
      // Decisions, and how fast they can be. Laya is the open-weights answer
      // to Jev a few tiles up; the rest is what you reach for once the
      // decision itself has stopped being the slow part.
      { name: 'Laya', icon: silayaIcon, mono: true },
      { name: 'Groq', icon: sigroqIcon, mono: true },
      { name: 'Cerebras', icon: sicerebrasIcon, mono: true },
      { name: 'Baseten', icon: sibasetenIcon, mono: true },
      { name: 'Together AI', icon: sitogetherIcon, mono: true },
      { name: 'Sticklight', icon: sisticklightIcon, mono: true },
      // The agent bench, 2026.
      { name: 'Gemma', icon: sigemmaIcon, mono: true },
      { name: 'GLM', icon: siglmIcon, mono: true },
      // The tech-week intake.
      { name: 'Dia', icon: sidiaIcon, flat: true },
      { name: 'Jan', icon: sijanIcon, flat: true },
      { name: 'AnythingLLM', icon: sianythingllmIcon, mono: true },
      { name: 'Sana', icon: sisanaIcon, mono: true },
      { name: 'Poe', icon: sipoeIcon, mono: true },
      { name: 'Notion Mail', icon: sinotionmailIcon, mono: true },
      { name: 'Cua', icon: sicuaIcon, mono: true },
      { name: 'Daytona', icon: sidaytonaIcon, flat: true },
      { name: 'Morph', icon: simorphIcon, mono: true },
      { name: 'Genspark', icon: sigensparkIcon, flat: true },
      { name: 'Fireflies.ai', icon: sifirefliesaiIcon, flat: true },
      { name: 'Consensus', icon: siconsensusIcon, mono: true },
      { name: 'Legora', icon: silegoraIcon, flat: true },
      { name: 'Rogo', icon: sirogoIcon, flat: true },
      { name: 'Hebbia', icon: sihebbiaIcon, mono: true },
      { name: 'Plaud', icon: siplaudIcon, flat: true },
      { name: 'Clay', icon: siclayIcon, flat: true },
      { name: 'Elicit', icon: sielicitIcon, mono: true },
      { name: 'Napkin AI', icon: sinapkinaiIcon, flat: true },
      { name: 'Cognition', icon: sicognitionIcon, mono: true },
      // Tech week, the top-up.
      { name: 'Univer', icon: siuniverIcon, flat: true },
      { name: 'Coder', icon: sicoderIcon, mono: true },
      { name: 'Photopea', icon: siphotopeaIcon, mono: true },
      // Third intake.
      { name: 'Aider', icon: siaiderIcon, flat: true },
      { name: 'Greptile', icon: sigreptileIcon, mono: true },
      { name: 'Fabrix.ai', icon: sifabrixaiIcon, flat: true },
      { name: 'Gentle AI', icon: sigentleaiIcon, flat: true },
    ],
  },
  {
    id: 'cloud',
    items: [
      { name: 'Azure', icon: azure, mono: true },
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
      { name: 'Fly.io', icon: flyIcon, mono: true },
      { name: 'Railway', icon: railwayIcon, mono: true },
      { name: 'Coolify', icon: coolifyIcon, mono: true },
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'OpenTofu', icon: siopentofuIcon, mono: true },
      { name: 'SST', icon: sisstIcon, mono: true },
      { name: 'Talos Linux', icon: sitalosIcon, mono: true },
      { name: 'Crossplane', icon: sicrossplaneIcon, mono: true },
      { name: 'Infracost', icon: siinfracostIcon, mono: true },
      { name: 'Knative', icon: siknativeIcon, mono: true },
      { name: 'Tekton', icon: sitektonIcon, mono: true },
      { name: 'Karpenter', icon: sikarpenterIcon, mono: true },
      { name: 'Jaeger', icon: sijaegerIcon, mono: true },
      { name: 'Flux CD', icon: sifluxIcon, mono: true },
      // The 2026 intake, second pass.
      { name: 'Backstage', icon: sibackstageIcon, mono: true },
      { name: 'k3s', icon: sik3sIcon, mono: true },
      { name: 'SigNoz', icon: sisignozIcon, mono: true },
      { name: 'VictoriaMetrics', icon: sivictoriametricsIcon, mono: true },
      { name: 'Teleport', icon: siteleportIcon, mono: true },
      { name: 'kro', icon: sikroIcon, flat: true },
      { name: 'Dagger', icon: sidaggerIcon, flat: true },
      { name: 'devenv', icon: sidevenvIcon, flat: true },
      { name: 'OpenCost', icon: siopencostIcon, flat: true },
      { name: 'SkyPilot', icon: siskypilotIcon, flat: true },
      { name: 'OrbStack', icon: siorbstackIcon, flat: true },
      // Tech week, the top-up.
      { name: 'Harbor', icon: siharborIcon, mono: true },
      { name: 'cert-manager', icon: sicertmanagerIcon, mono: true },
      { name: 'Karmada', icon: sikarmadaIcon, flat: true },
      { name: 'vCluster', icon: sivclusterIcon, flat: true },
      { name: 'Velero', icon: siveleroIcon, mono: true },
      { name: 'Perses', icon: sipersesIcon, mono: true },
      { name: 'Fluent Bit', icon: sifluentbitIcon, mono: true },
      { name: 'Chaos Mesh', icon: sichaosmeshIcon, flat: true },
      { name: 'Woodpecker CI', icon: siwoodpeckerciIcon, mono: true },
      { name: 'Open Policy Agent', icon: siopenpolicyagentIcon, mono: true },
      { name: 'Kratix', icon: sikratixIcon, flat: true },
      { name: 'Humanitec', icon: sihumanitecIcon, flat: true },
      { name: 'Depot', icon: sidepotIcon, mono: true },
      // The last nine.
      { name: 'Grafana Loki', icon: sigrafanalokiIcon, mono: true },
      { name: 'Rancher Desktop', icon: sirancherdesktopIcon, mono: true },
      { name: 'Headlamp', icon: siheadlampIcon, mono: true },
      { name: 'Kubeflow', icon: sikubeflowIcon, mono: true },
      // In for the star this group sent up to The Stars.
      { name: 'Render', icon: sirenderIcon, mono: true },
      { name: 'Linode', icon: silinodeIcon, mono: true },
      { name: 'Vultr', icon: sivultrIcon, mono: true },
      { name: 'Windows Autopilot', icon: siwindowsautopilotIcon, mono: true },
    ],
  },
  {
    id: 'netlab',
    items: [
      // The network bench and the homelab it runs on.
      // The tech-week intake.
      { name: 'GNS3', icon: signs3Icon, mono: true },
      { name: 'PuTTY', icon: siputtyIcon, mono: true },
      { name: 'Netdata', icon: sinetdataIcon, mono: true },
      { name: 'Zabbix', icon: sizabbixIcon, mono: true },
      { name: 'Uptime Kuma', icon: siuptimekumaIcon, mono: true },
      { name: 'Proxmox', icon: siproxmoxIcon, mono: true },
      { name: 'TrueNAS', icon: sitruenasIcon, mono: true },
      { name: 'OpenWrt', icon: siopenwrtIcon, mono: true },
      { name: 'MikroTik', icon: simikrotikIcon, mono: true },
      { name: 'Home Assistant', icon: sihomeassistantIcon, mono: true },
      { name: 'Pi-hole', icon: sipiholeIcon, mono: true },
      { name: 'Nextcloud', icon: sinextcloudIcon, mono: true },
      { name: 'Jellyfin', icon: sijellyfinIcon, mono: true },
      { name: 'Vagrant', icon: sivagrantIcon, mono: true },
      { name: 'NetBox', icon: sinetboxIcon, mono: true },
      { name: 'VirtualBox', icon: sivirtualboxIcon, mono: true },
      { name: 'QEMU', icon: siqemuIcon, mono: true },
      // Tech week, the top-up.
      { name: 'Immich', icon: siimmichIcon, mono: true },
      { name: 'Karakeep', icon: sikarakeepIcon, mono: true },
      { name: 'Dockge', icon: sidockgeIcon, mono: true },
      { name: 'Beszel', icon: sibeszelIcon, mono: true },
      { name: 'NetBird', icon: sinetbirdIcon, mono: true },
      { name: 'Pangolin', icon: sipangolinIcon, mono: true },
      { name: 'Audiobookshelf', icon: siaudiobookshelfIcon, mono: true },
      { name: 'Navidrome', icon: sinavidromeIcon, mono: true },
      { name: 'Paperless-ngx', icon: sipaperlessngxIcon, mono: true },
      { name: 'Forgejo', icon: siforgejoIcon, mono: true },
      { name: 'Gitea', icon: sigiteaIcon, mono: true },
      { name: 'RustDesk', icon: sirustdeskIcon, mono: true },
      { name: 'Nginx Proxy Manager', icon: singinxproxymanagerIcon, mono: true },
      { name: 'Kasm Workspaces', icon: sikasmworkspacesIcon, mono: true },
      { name: 'Snapdrop', icon: sisnapdropIcon, mono: true },
      { name: 'Twake Drive', icon: sitwakedriveIcon, mono: true },
      // Third intake.
      { name: 'UniFi', icon: siunifiIcon, mono: true },
      { name: 'ngrok', icon: singrokIcon, flat: true },
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
      { name: 'Hashcat', icon: hashcatIcon, mono: true },
      { name: 'Snort', icon: snortIcon, mono: true },
      { name: 'pfSense', icon: pfsenseIcon, mono: true },
      { name: 'OPNsense', icon: opnsenseIcon, mono: true },
      { name: 'KeePassXC', icon: keepassxcIcon, mono: true },
      { name: 'YubiKey', icon: yubicoIcon, mono: true },
      { name: 'OpenSSL', icon: opensslIcon, mono: true },
      { name: 'Authelia', icon: autheliaIcon, mono: true },
      { name: 'Vaultwarden', icon: vaultwardenIcon, mono: true },
      { name: 'Open Bug Bounty', icon: openbugbountyIcon, mono: true },
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'OpenBao', icon: siopenbaoIcon, mono: true },
      { name: 'Semgrep', icon: sisemgrepIcon, mono: true },
      { name: 'Falco', icon: sifalcoIcon, mono: true },
      { name: 'Tailscale', icon: sitailscaleIcon, mono: true },
      { name: 'Sigstore', icon: sisigstoreIcon, mono: true },
      { name: 'Authentik', icon: siauthentikIcon, mono: true },
      { name: 'Kyverno', icon: sikyvernoIcon, mono: true },
      { name: 'Ory', icon: sioryIcon, mono: true },
      { name: 'Graylog', icon: sigraylogIcon, mono: true },
      { name: 'Infisical', icon: siinfisicalIcon, mono: true },
      // The tech-week intake.
      { name: 'Chainguard', icon: sichainguardIcon, mono: true },
      { name: 'Anchore', icon: sianchoreIcon, flat: true },
      { name: 'Dependency-Track', icon: sidependencytrackIcon, flat: true },
      { name: 'Tetragon', icon: sitetragonIcon, flat: true },
      { name: 'Kubescape', icon: sikubescapeIcon, flat: true },
      { name: 'Wazuh', icon: siwazuhIcon, mono: true },
      { name: 'Velociraptor', icon: sivelociraptorIcon, flat: true },
      { name: 'Caido', icon: sicaidoIcon, flat: true },
      { name: 'Ghidra', icon: sighidraIcon, mono: true },
      { name: 'BloodHound', icon: sibloodhoundIcon, flat: true },
      { name: 'Caldera', icon: sicalderaIcon, flat: true },
      { name: 'Atomic Red Team', icon: siatomicredteamIcon, flat: true },
      { name: 'CyberChef', icon: sicyberchefIcon, mono: true },
      { name: 'Shodan', icon: sishodanIcon, mono: true },
      { name: 'Have I Been Pwned', icon: sihaveibeenpwnedIcon, mono: true },
      { name: 'Doppler', icon: sidopplerIcon, mono: true },
      { name: '1Password', icon: si1passwordIcon, mono: true },
      { name: 'LimaCharlie', icon: silimacharlieIcon, flat: true },
      { name: 'Nuclei', icon: sinucleiIcon, mono: true },
      { name: 'Binary Ninja', icon: sibinaryninjaIcon, mono: true },
      { name: 'GreyNoise', icon: sigreynoiseIcon, flat: true },
      { name: 'Akeyless', icon: siakeylessIcon, flat: true },
      { name: 'HiddenLayer', icon: sihiddenlayerIcon, flat: true },
      // Tech week, the top-up.
      { name: 'x64dbg', icon: six64dbgIcon, flat: true },
      { name: 'radare2', icon: siradare2Icon, flat: true },
      { name: 'CrowdSec', icon: sicrowdsecIcon, mono: true },
      { name: 'OpenCTI', icon: siopenctiIcon, flat: true },
      { name: 'Gitleaks', icon: sigitleaksIcon, flat: true },
      { name: 'Kanidm', icon: sikanidmIcon, mono: true },
      { name: 'Pomerium', icon: sipomeriumIcon, mono: true },
      { name: 'Firezone', icon: sifirezoneIcon, mono: true },
    ],
  },
  {
    id: 'data',
    items: [
      { name: 'MySQL', icon: mysql, mono: true },
      { name: 'MongoDB', icon: mongodb, mono: true },
      { name: 'Redis', icon: redis, mono: true },
      { name: 'SQLite', icon: sqlite, mono: true },
      { name: 'Supabase', icon: supabaseIcon, mono: true },
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
      { name: 'Polars', icon: polarsIcon, mono: true },
      { name: 'Turso', icon: tursoIcon, mono: true },
      { name: 'Neon', icon: neonIcon, mono: true },
      { name: 'SurrealDB', icon: surrealdbIcon, mono: true },
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'Prefect', icon: siprefectIcon, mono: true },
      { name: 'Iceberg', icon: siicebergIcon, flat: true },
      { name: 'CockroachDB', icon: sicockroachlabsIcon, mono: true },
      { name: 'Meilisearch', icon: simeilisearchIcon, mono: true },
      { name: 'Dagster', icon: sidagsterIcon, mono: true },
      { name: 'Dask', icon: sidaskIcon, mono: true },
      { name: 'pgvector', concept: 'pgvector' },
      { name: 'Apache Arrow', icon: siapachearrowIcon, mono: true },
      { name: 'Metabase', icon: simetabaseIcon, mono: true },
      { name: 'Valkey', icon: sivalkeyIcon, mono: true },
      // The 2026 intake, second pass.
      { name: 'RisingWave', icon: sirisingwaveIcon, mono: true },
      { name: 'dlt', icon: sidltIcon, mono: true },
      { name: 'Kestra', icon: sikestraIcon, mono: true },
      { name: 'Evidence', icon: sievidenceIcon, mono: true },
      { name: 'Chroma', icon: sichromaIcon, mono: true },
      { name: 'Typesense', icon: sitypesenseIcon, mono: true },
      { name: 'Dragonfly', icon: sidragonflyIcon, mono: true },
      { name: 'LanceDB', icon: silancedbIcon, flat: true },
      { name: 'Daft', icon: sidaftIcon, flat: true },
      { name: 'ParadeDB', icon: siparadedbIcon, flat: true },
      { name: 'SQLMesh', icon: sisqlmeshIcon, flat: true },
      // The agent bench, 2026.
      { name: 'turbopuffer', icon: siturbopufferIcon, flat: true },
      // Tech week, the top-up.
      { name: 'DataEase', icon: sidataeaseIcon, flat: true },
      { name: 'Antfly', icon: siantflyIcon, flat: true },
      // The last nine.
      { name: 'Apache Superset', icon: siapachesupersetIcon, mono: true },
      { name: 'OpenSearch', icon: siopensearchIcon, mono: true },
      { name: 'Apache Doris', icon: siapachedorisIcon, mono: true },
      { name: 'Redpanda', icon: siredpandaIcon, flat: true },
      { name: 'Redash', icon: siredashIcon, mono: true },
      // In for the star this group sent up to The Stars.
      { name: 'ScyllaDB', icon: siscylladbIcon, mono: true },
      { name: 'CouchDB', icon: sicouchdbIcon, mono: true },
      { name: 'Beautiful Soup', concept: 'soup' },
    ],
  },
  {
    id: 'frontend',
    items: [
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
      { name: 'React Query', icon: reactqueryIcon, mono: true },
      { name: 'Three.js', icon: threedotjsIcon, mono: true },
      { name: 'D3', icon: d3Icon, mono: true },
      { name: 'Framer Motion', icon: framerIcon, mono: true },
      { name: 'Storybook', icon: storybookIcon, mono: true },
      { name: 'shadcn/ui', icon: shadcnuiIcon, mono: true },
      { name: 'MUI', icon: muiIcon, mono: true },
      { name: 'Chakra UI', icon: chakrauiIcon, mono: true },
      { name: 'Sass', icon: sassIcon, mono: true },
      { name: 'Less', icon: lessIcon, mono: true },
      { name: 'Electron', icon: electronIcon, mono: true },
      { name: 'Tauri', icon: tauriIcon, mono: true },
      { name: 'Expo', icon: expoIcon, mono: true },
      { name: 'Ionic', icon: ionicIcon, mono: true },
      { name: 'Capacitor', icon: capacitorIcon, mono: true },
      { name: 'Radix UI', icon: radixIcon, mono: true },
      { name: 'TanStack', icon: tanstackIcon, mono: true },
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'Rolldown', icon: sirolldownIcon, mono: true },
      { name: 'Base UI', icon: sibaseuiIcon, mono: true },
      { name: 'Lit', icon: silitIcon, mono: true },
      { name: 'Zustand', icon: sizustandIcon, mono: true },
      { name: 'UnoCSS', icon: siunocssIcon, mono: true },
      { name: 'Mantine', icon: simantineIcon, mono: true },
      { name: 'SWC', icon: siswcIcon, mono: true },
      { name: 'Panda CSS', icon: sipandacssIcon, mono: true },
      { name: 'esbuild', icon: siesbuildIcon, mono: true },
      { name: 'Preact', icon: sipreactIcon, mono: true },
      // The Android bench. Flutter, Expo, Ionic and Capacitor were all here
      // and the toolchain they are alternatives to was not.
      { name: 'Android Studio', icon: siandroidstudioIcon, mono: true },
      { name: 'Android', icon: siandroidIcon, mono: true },
      { name: 'Jetpack Compose', icon: sijetpackcomposeIcon, mono: true },
      { name: 'Firebase', icon: sifirebaseIcon, mono: true },
      // The tech-week intake.
      { name: 'React Hook Form', icon: sireacthookformIcon, mono: true },
      { name: 'Formik', icon: siformikIcon, mono: true },
      { name: 'React Aria', icon: sireactariaIcon, mono: true },
      { name: 'Ark UI', icon: siarkuiIcon, mono: true },
      { name: 'Headless UI', icon: siheadlessuiIcon, mono: true },
      { name: 'Floating UI', icon: sifloatinguiIcon, flat: true },
      { name: 'AG Grid', icon: siaggridIcon, flat: true },
      { name: 'Vike', icon: sivikeIcon, mono: true },
      { name: 'GSAP', icon: sigsapIcon, mono: true },
      { name: 'React Spring', icon: sireactspringIcon, mono: true },
      { name: 'Rspack', icon: sirspackIcon, mono: true },
      { name: 'Lerna', icon: silernaIcon, mono: true },
      { name: 'vanilla-extract', icon: sivanillaextractIcon, mono: true },
      { name: 'PostCSS', icon: sipostcssIcon, mono: true },
      { name: 'Style Dictionary', icon: sistyledictionaryIcon, flat: true },
      { name: 'Lightning CSS', icon: silightningcssIcon, mono: true },
      { name: 'Lucide', icon: silucideIcon, mono: true },
      { name: 'Phosphor Icons', icon: siphosphoriconsIcon, mono: true },
      { name: 'Font Awesome', icon: sifontawesomeIcon, mono: true },
      { name: 'Iconify', icon: siiconifyIcon, mono: true },
      { name: 'Bevy', icon: sibevyIcon, mono: true },
      { name: 'TresJS', icon: sitresjsIcon, mono: true },
      // Tech week, the top-up.
      { name: 'Turbo', icon: siturboIcon, mono: true },
      { name: 'Million', icon: simillionIcon, mono: true },
      { name: 'Waku', icon: siwakuIcon, mono: true },
      { name: 'Eleventy', icon: sieleventyIcon, mono: true },
      { name: 'Hugo', icon: sihugoIcon, mono: true },
      { name: 'Zola', icon: sizolaIcon, mono: true },
      { name: 'Nitro', icon: sinitroIcon, flat: true },
      { name: 'Shiki', icon: sishikiIcon, mono: true },
      { name: 'Melt UI', icon: simeltuiIcon, flat: true },
      { name: 'Nue', icon: sinueIcon, flat: true },
      { name: 'Zag.js', icon: sizagjsIcon, mono: true },
      { name: 'moon', icon: simoonIcon, mono: true },
      { name: 'WebContainers', icon: siwebcontainersIcon, mono: true },
      // In for the star this group sent up to The Stars.
      { name: 'Alpine.js', icon: sialpinejsIcon, mono: true },
      { name: 'Gatsby', icon: sigatsbyIcon, mono: true },
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
      { name: 'Payments & checkout', concept: 'payments' },
      { name: 'SEO & analytics', concept: 'seo' },
      { name: 'Shopify', icon: shopifyIcon, mono: true },
      { name: 'Drupal', icon: drupalIcon, mono: true },
      { name: 'Joomla', icon: joomlaIcon, mono: true },
      { name: 'Strapi', icon: strapiIcon, mono: true },
      { name: 'Contentful', icon: contentfulIcon, mono: true },
      { name: 'Sanity', icon: sanityIcon, mono: true },
      { name: 'Ghost', icon: ghostIcon, mono: true },
      { name: 'Webflow', icon: webflowIcon, mono: true },
      { name: 'Wix', icon: wixIcon, mono: true },
      { name: 'Squarespace', icon: squarespaceIcon, mono: true },
      { name: 'PrestaShop', icon: prestashopIcon, mono: true },
      { name: 'BigCommerce', icon: bigcommerceIcon, mono: true },
      { name: 'Stripe', icon: stripeIcon, mono: true },
      { name: 'PayPal', icon: paypalIcon, mono: true },
      { name: 'Mercado Pago', icon: mercadopagoIcon, mono: true },
      { name: 'Google Analytics', icon: googleanalyticsIcon, mono: true },
      { name: 'Tag Manager', icon: googletagmanagerIcon, mono: true },
      { name: 'Search Console', icon: googlesearchconsoleIcon, mono: true },
      { name: 'Hotjar', icon: hotjarIcon, mono: true },
      { name: 'Mailchimp', icon: mailchimpIcon, mono: true },
      { name: 'HubSpot', icon: hubspotIcon, mono: true },
      { name: 'Algolia', icon: algoliaIcon, mono: true },
      { name: 'Cloudinary', icon: cloudinaryIcon, mono: true },
      { name: 'Netlify', icon: netlifyIcon, mono: true },
      { name: 'PWA', icon: pwaIcon, mono: true },
      { name: 'Payload', icon: payloadIcon, mono: true },
      { name: 'Medusa', icon: medusaIcon, mono: true },
      { name: 'Clerk', icon: clerkIcon, mono: true },
      { name: 'PostHog', icon: posthogIcon, mono: true },
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'WebGPU', icon: siwebgpuIcon, mono: true },
      { name: 'WebAssembly', icon: siwebassemblyIcon, mono: true },
      { name: 'Wasmer', icon: siwasmerIcon, mono: true },
      { name: 'htmx', icon: sihtmxIcon, mono: true },
      { name: 'Umami', icon: siumamiIcon, mono: true },
      { name: 'Directus', icon: sidirectusIcon, mono: true },
      { name: 'Resend', icon: siresendIcon, mono: true },
      { name: 'Better Auth', icon: sibetterauthIcon, mono: true },
      { name: 'Lemon Squeezy', icon: silemonsqueezyIcon, mono: true },
      { name: 'Matomo', icon: simatomoIcon, mono: true },
      // The tech-week intake.
      { name: 'Storyblok', icon: sistoryblokIcon, mono: true },
      { name: 'Craft CMS', icon: sicraftcmsIcon, mono: true },
      { name: 'Magento', icon: simagentoIcon, mono: true },
      { name: 'Hygraph', icon: sihygraphIcon, flat: true },
      { name: 'Tally', icon: sitallyIcon, mono: true },
      { name: 'Loops', icon: siloopsIcon, mono: true },
      { name: 'Plausible', icon: siplausibleIcon, mono: true },
      { name: 'Simple Analytics', icon: sisimpleanalyticsIcon, mono: true },
      { name: 'Canva', icon: sicanvaIcon, mono: true },
      { name: 'Zeplin', icon: sizeplinIcon, mono: true },
      { name: 'FigJam', icon: sifigjamIcon, mono: true },
      { name: 'unDraw', icon: siundrawIcon, mono: true },
      // Third intake.
      { name: 'Odoo', icon: siodooIcon, mono: true },
      // In for the star this group sent up to The Stars.
      { name: 'Shopware', icon: sishopwareIcon, mono: true },
    ],
  },
  {
    // Engines, 3D, video, audio and raster/vector. The half of the craft that
    // produces something to look at rather than something to call.
    id: 'media',
    items: [
      { name: 'Unity', icon: unityIcon, mono: true },
      { name: 'Unreal Engine', icon: unrealengineIcon, mono: true },
      { name: 'Godot', icon: godotengineIcon, mono: true },
      { name: 'Blender', icon: blenderIcon, mono: true },
      { name: 'Aseprite', icon: asepriteIcon, mono: true },
      { name: 'Rive', icon: riveIcon, mono: true },
      { name: 'Lottie', icon: lottiefilesIcon, mono: true },
      { name: 'DaVinci Resolve', icon: davinciresolveIcon, mono: true },
      { name: 'OBS Studio', icon: obsstudioIcon, mono: true },
      { name: 'FFmpeg', icon: ffmpegIcon, mono: true },
      { name: 'Audacity', icon: audacityIcon, mono: true },
      { name: 'GIMP', icon: gimpIcon, mono: true },
      { name: 'Krita', icon: kritaIcon, mono: true },
      { name: 'Inkscape', icon: inkscapeIcon, mono: true },
      { name: 'OpenGL', icon: openglIcon, mono: true },
      { name: 'Vulkan', icon: vulkanIcon, mono: true },
      { name: 'WebGL', icon: webglIcon, mono: true },
      { name: 'raylib', icon: raylibIcon, mono: true },
      { name: 'MonoGame', icon: monogameIcon, mono: true },
      { name: 'Kdenlive', icon: kdenliveIcon, mono: true },
      { name: 'LMMS', icon: lmmsIcon, mono: true },
      { name: 'Ardour', icon: ardourIcon, mono: true },
      { name: 'p5.js', icon: p5dotjsIcon, mono: true },
      { name: 'Processing', icon: processingfoundationIcon, mono: true },
      { name: 'Spine', icon: spineIcon, mono: true },
      { name: 'Bitwig', icon: bitwigIcon, mono: true },
      { name: 'Penpot', icon: penpotIcon, mono: true },
      { name: 'Excalidraw', icon: excalidrawIcon, mono: true },
      { name: 'tldraw', icon: tldrawIcon, mono: true },
      { name: 'Sketch', icon: sketchIcon, mono: true },
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'LiveKit', icon: silivekitIcon, mono: true },
      { name: 'ComfyUI', icon: sicomfyuiIcon, mono: true },
      { name: 'Babylon.js', icon: sibabylondotjsIcon, mono: true },
      { name: 'PlayCanvas', icon: siplaycanvasIcon, mono: true },
      { name: 'Remotion', icon: siremotionIcon, mono: true },
      { name: 'MediaPipe', icon: simediapipeIcon, mono: true },
      { name: 'FLUX.1', icon: siflux1Icon, flat: true },
      { name: 'Deepgram', icon: sideepgramIcon, mono: true },
      { name: 'Cocos', icon: sicocosIcon, mono: true },
      { name: 'Pipecat', icon: sipipecatIcon, mono: true },
      // The tech-week intake.
      { name: 'CapCut', icon: sicapcutIcon, mono: true },
      { name: 'Ableton Live', icon: siabletonliveIcon, mono: true },
      { name: 'HandBrake', icon: sihandbrakeIcon, flat: true },
      { name: 'Premiere Pro', icon: sipremiereproIcon, mono: true },
      { name: 'After Effects', icon: siaftereffectsIcon, mono: true },
      { name: 'Mux', icon: simuxIcon, mono: true },
      { name: 'StreamYard', icon: sistreamyardIcon, mono: true },
      { name: 'FL Studio', icon: siflstudioIcon, flat: true },
      { name: 'Defold', icon: sidefoldIcon, flat: true },
      { name: 'GDevelop', icon: sigdevelopIcon, mono: true },
      { name: 'Houdini', icon: sihoudiniIcon, mono: true },
      { name: 'ZBrush', icon: sizbrushIcon, flat: true },
      { name: 'Midjourney', icon: simidjourneyIcon, mono: true },
      { name: 'Runway', icon: sirunwayIcon, mono: true },
      { name: 'Pika', icon: sipikaIcon, mono: true },
      { name: 'Udio', icon: siudioIcon, mono: true },
      { name: 'Ideogram', icon: siideogramIcon, mono: true },
      { name: 'Krea', icon: sikreaIcon, mono: true },
      { name: 'Kling AI', icon: siklingaiIcon, flat: true },
      { name: 'Adobe Firefly', icon: siadobefireflyIcon, mono: true },
      { name: 'Higgsfield', icon: sihiggsfieldIcon, flat: true },
      { name: 'Recraft', icon: sirecraftIcon, mono: true },
      // Tech week, the top-up.
      { name: 'Fyrox', icon: sifyroxIcon, flat: true },
      { name: 'itch.io', icon: siitchioIcon, flat: true },
      { name: 'Ren\'Py', icon: sirenpyIcon, mono: true },
      { name: 'Cascadeur', icon: sicascadeurIcon, flat: true },
      { name: 'LDtk', icon: sildtkIcon, flat: true },
      { name: 'Marvelous Designer', icon: simarvelousdesignerIcon, flat: true },
      // In for the star this group sent up to The Stars.
      { name: 'PixiJS', icon: sipixijsIcon, mono: true },
    ],
  },
  {
    id: 'hardware',
    items: [
      // Where the software meets something that moves or gets made.
      // The tech-week intake.
      { name: 'ROS', icon: sirosIcon, mono: true },
      { name: 'Gazebo', icon: sigazeboIcon, mono: true },
      { name: 'MoveIt', icon: simoveitIcon, flat: true },
      { name: 'PlotJuggler', icon: siplotjugglerIcon, flat: true },
      { name: 'MuJoCo', icon: simujocoIcon, flat: true },
      { name: 'Webots', icon: siwebotsIcon, flat: true },
      { name: 'Gymnasium', icon: sigymnasiumIcon, flat: true },
      { name: 'Drake', icon: sidrakeIcon, mono: true },
      { name: 'Viam', icon: siviamIcon, flat: true },
      { name: 'Duckietown', icon: siduckietownIcon, flat: true },
      { name: 'Unitree', icon: siunitreeIcon, mono: true },
      { name: 'FreeCAD', icon: sifreecadIcon, mono: true },
      { name: 'OpenSCAD', icon: siopenscadIcon, mono: true },
      { name: 'KiCad', icon: sikicadIcon, mono: true },
      { name: 'Bambu Studio', icon: sibambustudioIcon, flat: true },
      { name: 'Autodesk Fusion', icon: siautodeskfusionIcon, mono: true },
      { name: 'Altium Designer', icon: sialtiumdesignerIcon, flat: true },
      { name: 'CATIA', icon: sicatiaIcon, flat: true },
      { name: 'Siemens NX', icon: sisiemensnxIcon, mono: true },
      { name: 'nTop', icon: sintopIcon, mono: true },
      { name: 'UltiMaker Cura', icon: siultimakercuraIcon, flat: true },
      // CAM for the machines, not a parts marketplace.
      { name: 'Mastercam', icon: simastercamIcon, mono: true },
      { name: 'PhysicsX', icon: siphysicsxIcon, flat: true },
      { name: 'Arduino', icon: siarduinoIcon, mono: true },
      { name: 'Raspberry Pi', icon: siraspberrypiIcon, mono: true },
      { name: 'Espressif', icon: siespressifIcon, mono: true },
      { name: 'PlatformIO', icon: siplatformioIcon, mono: true },
      { name: 'Zephyr', icon: sizephyrIcon, mono: true },
      { name: 'FreeRTOS', icon: sifreertosIcon, flat: true },
      { name: 'MicroPython', icon: simicropythonIcon, mono: true },
      { name: 'CircuitPython', icon: sicircuitpythonIcon, mono: true },
      { name: 'Nordic Semiconductor', icon: sinordicsemiconductorIcon, mono: true },
      { name: 'Yocto Project', icon: siyoctoprojectIcon, flat: true },
      { name: 'balena', icon: sibalenaIcon, mono: true },
      { name: 'Golioth', icon: sigoliothIcon, flat: true },
      { name: 'Blues', icon: sibluesIcon, flat: true },
      { name: 'Particle', icon: siparticleIcon, mono: true },
      { name: 'Toit', icon: sitoitIcon, flat: true },
      { name: 'Embassy', icon: siembassyIcon, flat: true },
      { name: 'RIOT', icon: siriotIcon, mono: true },
      { name: 'TinyGo', icon: sitinygoIcon, mono: true },
      { name: 'Edge Impulse', icon: siedgeimpulseIcon, mono: true },
      { name: 'LiteRT', icon: silitertIcon, flat: true },
      { name: 'Node-RED', icon: sinoderedIcon, mono: true },
      { name: 'Ignition', icon: siignitionIcon, flat: true },
      { name: 'ThingsBoard', icon: sithingsboardIcon, mono: true },
      { name: 'EMQX', icon: siemqxIcon, mono: true },
      { name: 'HiveMQ', icon: sihivemqIcon, mono: true },
      { name: 'Mosquitto', icon: simosquittoIcon, mono: true },
      { name: 'Ubidots', icon: siubidotsIcon, mono: true },
      // Third intake. SolidWorks has no mark of its own beyond a wordmark:
      // its desktop icon is Dassault's 3DS compass, the same one CATIA
      // carries, so the two share it on purpose.
      { name: 'SolidWorks', icon: sisolidworksIcon, mono: true },
      { name: 'Solid Edge', icon: sisolidedgeIcon, mono: true },
      { name: 'Onshape', icon: sionshapeIcon, flat: true },
      { name: 'AutoCAD', icon: siautocadIcon, mono: true },
      { name: 'Rhino', icon: sirhinoIcon, mono: true },
      { name: 'SketchUp', icon: sisketchupIcon, mono: true },
      { name: 'Tinkercad', icon: sitinkercadIcon, mono: true },
      { name: 'CadQuery', icon: sicadqueryIcon, flat: true },
      { name: 'MATLAB', icon: simatlabIcon, mono: true },
      { name: 'Simulink', icon: sisimulinkIcon, flat: true },
      { name: 'LTspice', icon: siltspiceIcon, mono: true },
      { name: 'Proteus', icon: siproteusIcon, mono: true },
      { name: 'EAGLE', icon: sieagleIcon, mono: true },
      { name: 'EasyEDA', icon: sieasyedaIcon, mono: true },
      { name: 'PX4', icon: sipx4Icon, flat: true },
      { name: 'ArduPilot', icon: siardupilotIcon, flat: true },
      { name: 'MAVLink', icon: simavlinkIcon, flat: true },
      { name: 'Nav2', icon: sinav2Icon, mono: true },
      { name: 'Intel RealSense', icon: siintelrealsenseIcon, flat: true },
      { name: 'OpenMV', icon: siopenmvIcon, flat: true },
      { name: 'Universal Robots', icon: siuniversalrobotsIcon, mono: true },
      { name: 'ABB', icon: siabbIcon, mono: true },
      { name: 'DJI', icon: sidjiIcon, mono: true },
      { name: 'STM32', icon: sistm32Icon, mono: true },
      { name: 'BeagleBoard', icon: sibeagleboardIcon, flat: true },
      { name: 'Adafruit', icon: siadafruitIcon, mono: true },
      { name: 'SparkFun', icon: sisparkfunIcon, mono: true },
      { name: 'Klipper', icon: siklipperIcon, mono: true },
      { name: 'Marlin', icon: simarlinIcon, flat: true },
      { name: 'OctoPrint', icon: sioctoprintIcon, mono: true },
    ],
  },
  {
    id: 'tools',
    items: [
      { name: 'Git', icon: git, mono: true },
      { name: 'GitHub', icon: github, mono: true },
      { name: 'Postman', icon: postman, mono: true },
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
      { name: 'npm', icon: npmIcon, mono: true },
      { name: 'pnpm', icon: pnpmIcon, mono: true },
      { name: 'Yarn', icon: yarnIcon, mono: true },
      { name: 'Turborepo', icon: turborepoIcon, mono: true },
      { name: 'Nx', icon: nxIcon, mono: true },
      { name: 'Insomnia', icon: insomniaIcon, mono: true },
      { name: 'Codecov', icon: codecovIcon, mono: true },
      { name: 'Renovate', icon: renovateIcon, mono: true },
      { name: 'Markdown', icon: markdownIcon, mono: true },
      { name: 'LaTeX', icon: latexIcon, mono: true },
      // Last in the group on purpose: the joke only works once a reader has
      // been through the whole serious list. Everybody who learned to program
      // in Spanish started here, and the logo is the real one.
      { name: 'PSeInt', labelKey: 'skills.pseint', icon: pseintIcon, flat: true },
      { name: 'Biome', icon: biomeIcon, mono: true },
      { name: 'Bruno', icon: brunoIcon, mono: true },
      { name: 'uv', icon: uvIcon, mono: true },
      { name: 'Zod', icon: zodIcon, mono: true },
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'Ruff', icon: siruffIcon, mono: true },
      { name: 'Oxc', icon: sioxcIcon, mono: true },
      { name: 'Ghostty', icon: sighosttyIcon, mono: true },
      { name: 'Playwright', icon: siplaywrightIcon, mono: true },
      { name: 'Typst', icon: sitypstIcon, mono: true },
      { name: 'Neovim', icon: sineovimIcon, mono: true },
      { name: 'Just', icon: sijustIcon, mono: true },
      { name: 'Jujutsu', icon: sijujutsuIcon, mono: true },
      { name: 'Task', icon: sitaskIcon, mono: true },
      { name: 'k6', icon: sik6Icon, mono: true },
      // Agent skills: files you drop next to a coding agent that change how it
      // works. Archify draws the architecture, Ponytail argues the code should
      // not be written, Superpowers is a whole workflow and Context7 keeps a
      // library's real docs in the context. Mintlify is where it all lands.
      { name: 'Archify', icon: siarchifyIcon, mono: true },
      { name: 'Ponytail', icon: siponytailIcon, mono: true },
      { name: 'Superpowers', icon: sisuperpowersIcon, mono: true },
      { name: 'Mintlify', icon: simintlifyIcon, mono: true },
      { name: 'Context7', icon: sicontext7Icon, flat: true },
      // The tech-week intake.
      { name: 'Starship', icon: sistarshipIcon, mono: true },
      { name: 'Nix', icon: sinixIcon, flat: true },
      { name: 'Bazel', icon: sibazelIcon, mono: true },
      { name: 'Buck2', icon: sibuck2Icon, mono: true },
      { name: 'GitButler', icon: sigitbutlerIcon, flat: true },
      { name: 'Sourcegraph', icon: sisourcegraphIcon, mono: true },
      { name: 'bat', icon: sibatIcon, mono: true },
      { name: 'Hoppscotch', icon: sihoppscotchIcon, mono: true },
      { name: 'TablePlus', icon: sitableplusIcon, flat: true },
      { name: 'Beekeeper Studio', icon: sibeekeeperstudioIcon, mono: true },
      { name: 'Changesets', icon: sichangesetsIcon, flat: true },
      { name: 'Knip', icon: siknipIcon, mono: true },
      { name: 'Bencher', icon: sibencherIcon, flat: true },
      { name: 'Codeium', icon: sicodeiumIcon, flat: true },
      { name: 'mise', icon: simiseIcon, mono: true },
      { name: 'Understand-Anything', icon: siunderstandanythingIcon, flat: true },
      // Tech week, the top-up.
      { name: 'MVT', icon: simvtIcon, flat: true },
      { name: 'worktrunk', icon: siworktrunkIcon, flat: true },
      { name: 'Files.md', icon: sifilesmdIcon, mono: true },
      // In for the star this group sent up to The Stars.
      { name: 'tmux', icon: sitmuxIcon, mono: true },
    ],
  },
  {
    id: 'diagrams',
    items: [
      // Drawing the system, then writing it down.
      // The tech-week intake.
      { name: 'PlantUML', icon: siplantumlIcon, flat: true },
      { name: 'Mermaid', icon: simermaidIcon, mono: true },
      { name: 'D2', icon: sid2Icon, mono: true },
      { name: 'Kroki', icon: sikrokiIcon, flat: true },
      { name: 'Eraser', icon: sieraserIcon, mono: true },
      { name: 'Visual Paradigm', icon: sivisualparadigmIcon, mono: true },
      { name: 'Docusaurus', icon: sidocusaurusIcon, mono: true },
      { name: 'MkDocs', icon: simkdocsIcon, mono: true },
      { name: 'Sphinx', icon: sisphinxIcon, mono: true },
      { name: 'Read the Docs', icon: sireadthedocsIcon, mono: true },
      { name: 'GitBook', icon: sigitbookIcon, mono: true },
      { name: 'VitePress', icon: sivitepressIcon, mono: true },
      { name: 'Starlight', icon: sistarlightIcon, flat: true },
      { name: 'Milanote', icon: similanoteIcon, mono: true },
      { name: 'Lucidchart', icon: silucidchartIcon, flat: true },
      { name: 'yEd', icon: siyedIcon, mono: true },
      { name: 'Gliffy', icon: sigliffyIcon, flat: true },
    ],
  },
  {
    id: 'learning',
    items: [
      // Where the knowledge actually comes from.
      // The tech-week intake.
      { name: 'Platzi', icon: siplatziIcon, mono: true },
      { name: 'Udemy', icon: siudemyIcon, mono: true },
      { name: 'W3Schools', icon: siw3schoolsIcon, mono: true },
      { name: 'Stack Overflow', icon: sistackoverflowIcon, mono: true },
      { name: 'freeCodeCamp', icon: sifreecodecampIcon, mono: true },
      { name: 'Coursera', icon: sicourseraIcon, mono: true },
      { name: 'edX', icon: siedxIcon, mono: true },
      { name: 'Khan Academy', icon: sikhanacademyIcon, mono: true },
      { name: 'MDN Web Docs', icon: simdnwebdocsIcon, mono: true },
      { name: 'Exercism', icon: siexercismIcon, mono: true },
      { name: 'LeetCode', icon: sileetcodeIcon, mono: true },
      { name: 'HackerRank', icon: sihackerrankIcon, mono: true },
      { name: 'Codecademy', icon: sicodecademyIcon, mono: true },
      { name: 'Pluralsight', icon: sipluralsightIcon, mono: true },
      { name: 'Anki', icon: siankiIcon, mono: true },
      { name: 'Scrimba', icon: siscrimbaIcon, mono: true },
      { name: 'Advent of Code', icon: siadventofcodeIcon, mono: true },
      { name: 'arXiv', icon: siarxivIcon, mono: true },
      { name: 'Semantic Scholar', icon: sisemanticscholarIcon, mono: true },
      { name: 'Google Classroom', icon: sigoogleclassroomIcon, mono: true },
      { name: 'Codewars', icon: sicodewarsIcon, mono: true },
      { name: 'Zotero', icon: sizoteroIcon, mono: true },
      { name: 'roadmap.sh', icon: siroadmapshIcon, flat: true },
      { name: 'Frontend Masters', icon: sifrontendmastersIcon, flat: true },
      { name: 'egghead.io', icon: sieggheadioIcon, flat: true },
      { name: 'DevDocs', icon: sidevdocsIcon, mono: true },
      // Tech week, the top-up.
      { name: 'CodeCrafters', icon: sicodecraftersIcon, mono: true },
      { name: 'The Odin Project', icon: sitheodinprojectIcon, mono: true },
      { name: 'Frontend Mentor', icon: sifrontendmentorIcon, mono: true },
      { name: 'Boot.dev', icon: sibootdevIcon, flat: true },
      { name: 'Logseq', icon: silogseqIcon, mono: true },
      { name: 'Heptabase', icon: siheptabaseIcon, mono: true },
      { name: 'Anytype', icon: sianytypeIcon, mono: true },
      { name: 'Capacities', icon: sicapacitiesIcon, flat: true },
      { name: 'Udacity', icon: siudacityIcon, mono: true },
    ],
  },
  {
    id: 'collab',
    items: [
      // How the work gets done with other people.
      { name: 'Plane', icon: siplaneIcon, flat: true },
      // The tech-week intake.
      { name: 'Google Meet', icon: sigooglemeetIcon, mono: true },
      { name: 'Loom', icon: siloomIcon, mono: true },
      { name: 'Microsoft Teams', icon: simicrosoftteamsIcon, mono: true },
      { name: 'Discord', icon: sidiscordIcon, mono: true },
      { name: 'Telegram', icon: sitelegramIcon, mono: true },
      { name: 'WhatsApp', icon: siwhatsappIcon, mono: true },
      { name: 'Confluence', icon: siconfluenceIcon, mono: true },
      { name: 'Asana', icon: siasanaIcon, mono: true },
      { name: 'ClickUp', icon: siclickupIcon, mono: true },
      { name: 'Calendly', icon: sicalendlyIcon, mono: true },
      { name: 'Granola', icon: sigranolaIcon, mono: true },
      { name: 'Front', icon: sifrontIcon, mono: true },
      { name: 'Zulip', icon: sizulipIcon, mono: true },
      { name: 'Mattermost', icon: simattermostIcon, mono: true },
      { name: 'Rocket.Chat', icon: sirocketchatIcon, flat: true },
      { name: 'Element', icon: sielementIcon, mono: true },
      { name: 'Otter.ai', icon: siotteraiIcon, flat: true },
      { name: 'Zipdev', icon: sizipdevIcon, flat: true },
      // Tech week, the top-up.
      { name: 'Basecamp', icon: sibasecampIcon, mono: true },
      { name: 'Twist', icon: sitwistIcon, mono: true },
      // Third intake.
      { name: 'Zoom', icon: sizoomIcon, mono: true },
      { name: 'Twilio', icon: sitwilioIcon, mono: true },
      { name: 'Prezi', icon: sipreziIcon, mono: true },
      { name: 'Dropbox', icon: sidropboxIcon, mono: true },
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
      { name: 'Quantum computing', concept: 'quantum' },
      { name: 'Post-quantum cryptography', concept: 'postQuantum' },
      { name: 'Neuromorphic computing', concept: 'neuromorphic' },
      { name: 'Spatial computing', concept: 'spatial' },
      { name: 'Brain-computer interfaces', concept: 'bci' },
      { name: 'Reinforcement learning', concept: 'reinforcement' },
      { name: 'Computer vision', concept: 'vision' },
      { name: 'Federated learning', concept: 'federated' },
      { name: 'Privacy-preserving computation', concept: 'privacyComputing' },
      { name: 'Formal verification', concept: 'formalVerification' },
      { name: 'Additive manufacturing', concept: 'additive' },
      { name: 'Swarm intelligence', concept: 'swarm' },
      { name: 'Causal inference', concept: 'causal' },
      { name: 'Sustainable computing', concept: 'greenCompute' },
      { name: 'Explainable AI', concept: 'explainable' },
      { name: 'Neuro-symbolic AI', concept: 'neuroSymbolic' },
      { name: 'World models', concept: 'worldModel' },
      { name: 'Embodied AI', concept: 'embodied' },
      { name: 'Zero-knowledge proofs', concept: 'zeroKnowledge' },
      { name: 'Confidential computing', concept: 'confidential' },
      { name: 'Synthetic data', concept: 'syntheticData' },
      { name: 'Bioinformatics', concept: 'bioinformatics' },
      { name: 'Autonomous systems', concept: 'autonomous' },
      { name: 'System One models', concept: 'systemOne' },
      { name: 'Test-time compute', concept: 'testTime' },
      { name: 'Mechanistic interpretability', concept: 'interpretability' },
      { name: 'On-device AI', concept: 'onDevice' },
      { name: 'Context engineering', concept: 'contextEng' },
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'Diffusion LLMs', concept: 'diffusionLm' },
      { name: 'Agent sandboxes', concept: 'sandbox' },
      { name: 'Agent-to-agent protocols', concept: 'a2a' },
      { name: 'Homomorphic encryption', concept: 'fhe' },
      { name: 'Robotics foundation models', concept: 'roboticsFm' },
      { name: 'Small language models', concept: 'slm' },
      { name: 'Photonic computing', concept: 'photonic' },
      { name: 'Continual learning', concept: 'continual' },
      { name: 'Neural rendering', concept: 'neuralRendering' },
      { name: 'Multimodal RAG', concept: 'multimodalRag' },
      // Third pass: the bench side — robots, the factory floor, the lab —
      // and the architectures that are not a plain transformer.
      { name: 'Humanoid robots', concept: 'humanoid' },
      { name: 'Sim-to-real transfer', concept: 'simToReal' },
      { name: 'Soft robotics', concept: 'softRobotics' },
      { name: 'Exoskeletons', concept: 'exoskeleton' },
      { name: 'Collaborative robots', concept: 'cobot' },
      { name: 'Tactile sensing', concept: 'tactile' },
      { name: 'Generative design', concept: 'generativeDesign' },
      { name: 'Lights-out manufacturing', concept: 'lightsOut' },
      { name: 'Self-driving labs', concept: 'selfDrivingLab' },
      { name: 'AI materials discovery', concept: 'materials' },
      { name: 'Protein design', concept: 'protein' },
      { name: 'State space models', concept: 'ssm' },
      { name: 'Mixture of experts', concept: 'moe' },
      { name: 'Liquid neural networks', concept: 'liquidNn' },
      { name: 'Kolmogorov-Arnold networks', concept: 'kan' },
      { name: 'Model merging', concept: 'modelMerge' },
      { name: 'AI alignment', concept: 'alignment' },
      { name: 'Analog in-memory computing', concept: 'analogCompute' },
      { name: 'Chiplets', concept: 'chiplet' },
      { name: 'Orbital data centers', concept: 'spaceCompute' },
      { name: '6G & satellite networks', concept: 'sixG' },
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

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
// ConceptIcons.jsx, or — for the newest arrivals, which are younger than the
// icon sets that would have to carry them — the monogram tile. Leaving a tool
// off this wall to protect a rule about pictures would be the wrong trade.
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
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'Gleam', icon: sigleamIcon, mono: true },
      { name: 'Nushell', icon: sinushellIcon, mono: true },
      { name: 'Luau', icon: siluauIcon, mono: true },
      { name: 'Nim', icon: sinimIcon, mono: true },
      { name: 'Crystal', icon: sicrystalIcon, mono: true },
      { name: 'Mojo' },
      { name: 'Odin', icon: siodinIcon, mono: true },
      { name: 'V', icon: sivIcon, mono: true },
      { name: 'ReScript', icon: sirescriptIcon, mono: true },
      { name: 'PureScript', icon: sipurescriptIcon, mono: true },
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
      { name: 'Fastify', icon: fastifyIcon, mono: true },
      { name: 'Microservices', concept: 'microservices' },
      { name: 'Multi-tenancy', concept: 'saas' },
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
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'Drizzle', icon: sidrizzleIcon, mono: true },
      { name: 'Axum' },
      { name: 'NATS.io', icon: sinatsdotioIcon, mono: true },
      { name: 'Elysia' },
      { name: 'Actix', icon: siactixIcon, mono: true },
      { name: 'Litestar' },
      { name: 'Rocket', icon: sirocketIcon, mono: true },
      { name: 'Inngest' },
      { name: 'Sanic', icon: sisanicIcon, mono: true },
      { name: 'Encore' },
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
      { name: 'PyTorch', icon: pytorchIcon, mono: true },
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
      { name: 'LlamaIndex' },
      { name: 'Streamlit', icon: sistreamlitIcon, mono: true },
      { name: 'DSPy' },
      { name: 'Optuna', icon: sioptunaIcon, mono: true },
      { name: 'Langfuse' },
      { name: 'spaCy', icon: sispacyIcon, mono: true },
      { name: 'SGLang' },
      { name: 'DVC', icon: sidvcIcon, mono: true },
      { name: 'Unsloth' },
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
      { name: 'Antigravity' },
      { name: 'Kiro' },
      { name: 'Google Jules', icon: sigooglejulesIcon, mono: true },
      { name: 'Devin' },
      { name: 'Zapier', icon: sizapierIcon, mono: true },
      { name: 'Amp' },
      { name: 'Make', icon: simakeIcon, mono: true },
      { name: 'Bolt.new' },
      { name: 'Roo Code' },
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
      { name: 'Fly.io', icon: flyIcon, mono: true },
      { name: 'Railway', icon: railwayIcon, mono: true },
      { name: 'Coolify', icon: coolifyIcon, mono: true },
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'OpenTofu', icon: siopentofuIcon, mono: true },
      { name: 'SST', icon: sisstIcon, mono: true },
      { name: 'Talos Linux', icon: sitalosIcon, mono: true },
      { name: 'Crossplane' },
      { name: 'Infracost', icon: siinfracostIcon, mono: true },
      { name: 'Knative', icon: siknativeIcon, mono: true },
      { name: 'Tekton', icon: sitektonIcon, mono: true },
      { name: 'Karpenter' },
      { name: 'Jaeger', icon: sijaegerIcon, mono: true },
      { name: 'Flux CD', icon: sifluxIcon, mono: true },
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
      { name: 'Semgrep' },
      { name: 'Falco', icon: sifalcoIcon, mono: true },
      { name: 'Tailscale', icon: sitailscaleIcon, mono: true },
      { name: 'Sigstore' },
      { name: 'Authentik', icon: siauthentikIcon, mono: true },
      { name: 'Kyverno' },
      { name: 'Ory', icon: sioryIcon, mono: true },
      { name: 'Graylog', icon: sigraylogIcon, mono: true },
      { name: 'Infisical' },
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
      { name: 'Polars', icon: polarsIcon, mono: true },
      { name: 'Turso', icon: tursoIcon, mono: true },
      { name: 'Neon', icon: neonIcon, mono: true },
      { name: 'SurrealDB', icon: surrealdbIcon, mono: true },
      // 2026 intake: things worth trying, not things already shipped.
      { name: 'Prefect', icon: siprefectIcon, mono: true },
      { name: 'Iceberg' },
      { name: 'CockroachDB', icon: sicockroachlabsIcon, mono: true },
      { name: 'Meilisearch', icon: simeilisearchIcon, mono: true },
      { name: 'Dagster' },
      { name: 'Dask', icon: sidaskIcon, mono: true },
      { name: 'pgvector' },
      { name: 'Apache Arrow', icon: siapachearrowIcon, mono: true },
      { name: 'Metabase', icon: simetabaseIcon, mono: true },
      { name: 'Valkey' },
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
      { name: 'Zustand' },
      { name: 'UnoCSS', icon: siunocssIcon, mono: true },
      { name: 'Mantine', icon: simantineIcon, mono: true },
      { name: 'SWC', icon: siswcIcon, mono: true },
      { name: 'Panda CSS' },
      { name: 'esbuild', icon: siesbuildIcon, mono: true },
      { name: 'Preact', icon: sipreactIcon, mono: true },
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
      { name: 'ComfyUI' },
      { name: 'Babylon.js', icon: sibabylondotjsIcon, mono: true },
      { name: 'PlayCanvas', icon: siplaycanvasIcon, mono: true },
      { name: 'Remotion' },
      { name: 'MediaPipe', icon: simediapipeIcon, mono: true },
      { name: 'FLUX.1' },
      { name: 'Deepgram', icon: sideepgramIcon, mono: true },
      { name: 'Cocos', icon: sicocosIcon, mono: true },
      { name: 'Pipecat' },
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
      { name: 'Playwright' },
      { name: 'Typst', icon: sitypstIcon, mono: true },
      { name: 'Neovim', icon: sineovimIcon, mono: true },
      { name: 'Just', icon: sijustIcon, mono: true },
      { name: 'Jujutsu' },
      { name: 'Task', icon: sitaskIcon, mono: true },
      { name: 'k6', icon: sik6Icon, mono: true },
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

export const PROFILE = {
  name: 'Nilanjan Chatterjee',
  role: 'Principal Data Architect',
  location: 'Austin, Texas',
  email: 'nilanjan.9325@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nil68657/',
  github: 'https://github.com/nil68657',
  leetcode: 'https://leetcode.com/u/hailgilfoyle/',
}

export const METRICS = [
  { value: '13+', label: 'years architecting data platforms' },
  { value: '2 PB', label: 'telemetry processed per quarter' },
  { value: '$5M+', label: 'measurable revenue and cost impact' },
  { value: '85%', label: 'YoY reduction in Sev-2 incidents' },
]

export const IMPACT_STORIES = [
  {
    id: 'amd',
    index: '01',
    company: 'AMD',
    eyebrow: 'Enterprise lakehouse · Data + AI',
    title: 'A unified data foundation for silicon at petabyte scale.',
    description:
      'Own the target-state architecture connecting silicon validation, manufacturing, telemetry, automation, and SaaS data through a governed Lakehouse with Data Mesh and Data Fabric overlays.',
    outcomes: [
      { value: '2 PB', label: 'telemetry / quarter' },
      { value: '<1 ms', label: 'p9999 serving latency' },
      { value: '60%', label: 'less manual triage' },
    ],
    stack: ['Databricks', 'Snowflake', 'Kafka', 'Aerospike', 'Trino', 'LangGraph'],
  },
  {
    id: 'transunion',
    index: '02',
    company: 'TransUnion',
    eyebrow: 'Feature platform · Real-time MLOps',
    title: 'Faster fraud decisions with a multi-cloud feature plane.',
    description:
      'Designed online/offline feature serving, identity pipelines, and privacy-preserving cleanrooms across fraud, credit, cyber, and churn product lines.',
    outcomes: [
      { value: '35→7 ms', label: 'inference latency' },
      { value: '32%', label: 'lift in fraud identification' },
      { value: '$1.2M', label: 'annual serving savings' },
    ],
    stack: ['Feast', 'Tecton', 'Aerospike', 'BigQuery', 'Kubernetes', 'MLflow'],
  },
  {
    id: 'amazon',
    index: '03',
    company: 'Amazon',
    eyebrow: 'Data strategy · Platform reliability',
    title: 'A modern analytics roadmap that removed delivery friction.',
    description:
      'Architected Lakehouse, Lake, Mesh, and Mart patterns for FinTech, education, retail, and FMCG clients while establishing quality and reliability guardrails.',
    outcomes: [
      { value: '90%', label: 'fewer blocker-driven misses' },
      { value: '70%', label: 'lower query latency' },
      { value: '200 bps', label: 'operational improvement' },
    ],
    stack: ['AWS', 'Iceberg', 'Redshift', 'Kinesis', 'Airflow', 'dbt'],
  },
]

export const EXPERIENCES = [
  {
    id: 'amd',
    company: 'Advanced Micro Devices (AMD)',
    title: 'Principal Staff Data Architect',
    location: 'Austin, TX',
    period: 'Jul 2024 — Present',
    highlights: [
      'Own AMD’s enterprise target-state architecture: a Unified Lakehouse with federated Data Mesh and Data Fabric overlays across silicon validation, manufacturing, automation, telemetry, and SaaS sources.',
      'Architected Kafka, OneHouse, Aerospike, Trino, Dremio, Spark, and Elasticsearch serving infrastructure sustaining sub-millisecond p9999 latency across 2 PB of quarterly data.',
      'Built agentic DataOps with Claude, OpenAI, LangChain, and LangGraph, reducing manual quality, monitoring, and anomaly triage by 60%.',
      'Lead 12+ engineers and AI/ML scientists across Power Management, Performance Logging, Manufacturing, and Test Automation programs.',
    ],
  },
  {
    id: 'transunion',
    company: 'TransUnion',
    title: 'Principal Data Architect',
    location: 'Austin, TX',
    period: 'Apr 2023 — Jul 2024',
    highlights: [
      'Set enterprise data architecture and go-to-market strategy across fraud, device, credit, cyber, and churn product lines while leading 18 engineers and data scientists.',
      'Designed an Aerospike-backed online/offline feature store that cut inference latency from 35 ms to 7 ms and saved $1.2M annually.',
      'Integrated GenAI and RAG into customer data products, lifting fraud-identification accuracy by 32% YoY.',
      'Architected a multi-cloud MLOps serving plane that generated $1M+ in net-new annual product revenue.',
    ],
  },
  {
    id: 'amazon',
    company: 'Amazon',
    title: 'Senior Data Architect',
    location: 'Arlington, VA',
    period: 'Jul 2020 — Apr 2023',
    highlights: [
      'Architected enterprise data strategy across Lakehouse, Lake, Mesh, and Mart patterns for FinTech, education, retail, and FMCG clients.',
      'Reduced data-blocker delivery misses by 90% and query latency by 70% through Iceberg, Project Nessie, and optimized lake caching.',
      'Established data quality, SLA, and resolution frameworks that reduced Sev-2 incidents by 50% annually.',
      'Led six business intelligence engineers, data scientists, and data engineers across multiple customer engagements.',
    ],
  },
  {
    id: 'hughes',
    company: 'Hughes Network Systems',
    title: 'Data Mining Scientist · Tech Lead',
    location: 'Germantown, MD',
    period: 'Jan 2018 — Jun 2020',
    highlights: [
      'Led five data engineers and analysts building edge-served ML models for two major US telecom providers.',
      'Reduced national audio call drops by 72% and delivered $650K+ in quarterly revenue growth.',
      'Built ML-driven CDN caching and frame-rate models that cut frame drops by 48% and monthly churn by 26%.',
    ],
  },
  {
    id: 'ibm',
    company: 'IBM Corporation',
    title: 'Data Science Intern',
    location: 'Durham, NC',
    period: 'Jun 2017 — Dec 2017',
    highlights: [
      'Built BlueMix usage-pattern feature pipelines and machine-learning models spanning PCA, SVD, clustering, classification, and Bayesian methods.',
      'Designed model deployment and optimization strategy with CPLEX, Gurobi, LAPack, and Spark MLlib.',
    ],
  },
  {
    id: 'cognizant',
    company: 'Cognizant Technology Solutions',
    title: 'Senior Data Engineer',
    location: 'Bangalore, India',
    period: 'Jul 2013 — Aug 2016',
    highlights: [
      'Led three data engineers delivering enterprise ETL and BI pipelines that generated $500K in annual revenue growth.',
      'Engineered a 50-node Spark streaming cluster processing more than 10 TB daily with Kafka, Flume, Impala, and HBase.',
      'Delivered AWS and Azure integrations and CI/CD automation across large data-warehouse and Hadoop migrations.',
    ],
  },
]

export const CAPABILITIES = [
  {
    number: '01',
    title: 'Architecture',
    description: 'Target states that balance ambition with operability—from first diagram to production guardrails.',
    items: ['Data Lakehouse', 'Data Mesh', 'Data Fabric', 'Data Products', 'Data Contracts', 'Event-driven systems'],
  },
  {
    number: '02',
    title: 'Data platforms',
    description: 'Batch, streaming, and real-time serving planes designed around clear reliability and cost envelopes.',
    items: ['Databricks', 'Snowflake', 'Kafka', 'Spark', 'Flink', 'Iceberg', 'Airflow', 'Dagster'],
  },
  {
    number: '03',
    title: 'AI + MLOps',
    description: 'Production AI systems with governed features, evaluation, observability, and efficient model serving.',
    items: ['Claude', 'OpenAI', 'LangChain', 'LangGraph', 'MLflow', 'Feast', 'vLLM', 'BentoML'],
  },
  {
    number: '04',
    title: 'Cloud + scale',
    description: 'Multi-cloud foundations shaped for latency, throughput, resilience, security, and ownership.',
    items: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Terraform', 'Aerospike', 'Trino', 'Dremio'],
  },
  {
    number: '05',
    title: 'Governance',
    description: 'Federated controls that make high-quality data easier to discover, trust, and safely reuse.',
    items: ['Unity Catalog', 'Collibra', 'Alation', 'Monte Carlo', 'OpenLineage', 'SOC 2', 'NIST 800-53'],
  },
  {
    number: '06',
    title: 'Technical leadership',
    description: 'Architecture review, product strategy, and hands-on direction for multidisciplinary teams.',
    items: ['Architecture boards', '0→1 platforms', '1→100 scale-out', 'Executive advisory', 'Team leadership'],
  },
]

export const PROJECTS = [
  {
    index: '01',
    title: 'YouTube Clickbait Detection',
    description:
      'A desktop application that summarizes YouTube captions with local Ollama models and compares the content with its title to identify clickbait.',
    tags: ['Python', 'Tkinter', 'Ollama', 'yt-dlp'],
    href: 'https://github.com/nil68657/Youtube_Clickbait_Detection',
  },
  {
    index: '02',
    title: 'Duplicate Question Detection',
    description:
      'A character-level RNN and SVM ensemble using Word2Vec and bag-of-words representations, tuned across TensorFlow and PyTorch.',
    tags: ['NLP', 'PyTorch', 'TensorFlow', 'scikit-learn'],
    href: 'https://github.com/nil68657/Quora-Duplicate-Question-Pairs-ML',
  },
  {
    index: '03',
    title: 'Indian Language Voice Translator',
    description:
      'Voice and audio translation for major Indian languages with modern FastAPI web and native Tkinter desktop interfaces.',
    tags: ['Python', 'FastAPI', 'Speech Recognition', 'gTTS'],
    href: 'https://github.com/nil68657/indian-language-translator',
  },
  {
    index: '04',
    title: 'Make Money Last',
    description:
      'A relocation runway simulator that compares two cities and shows how long savings last under different cost-of-living assumptions.',
    tags: ['TypeScript', 'Next.js', 'Data Visualization', 'Personal Finance'],
    href: 'https://github.com/nil68657/make-money-last',
  },
  {
    index: '05',
    title: 'X Opinionate',
    description:
      'A Streamlit workspace for trend analysis, brand sentiment, and stance detection using Claude-assisted opinion-mining workflows.',
    tags: ['Python', 'Streamlit', 'Claude', 'Plotly'],
    href: 'https://github.com/nil68657/x-opinionate',
  },
]

export const EDUCATION = [
  {
    degree: 'M.S. Computer Science',
    school: 'University of North Carolina at Charlotte',
    meta: '2016 — 2017 · GPA 3.8 / 4.0',
  },
  {
    degree: 'B.S. Electronics & Communication Engineering',
    school: 'West Bengal University of Technology',
    meta: '2009 — 2013 · GPA 3.7 / 4.0',
  },
]

export const CERTIFICATIONS = [
  'Databricks Data Engineer Professional',
  'AWS Machine Learning — Specialty',
  'AWS Developer — Associate',
  'SnowPro Core',
  'GCP Professional Data Engineer',
]

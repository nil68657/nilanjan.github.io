/** Work history for interactive timeline (newest first). */
export const EXPERIENCES = [
  {
    id: 'amd',
    company: 'Advanced Micro Devices (AMD)',
    title: 'Principal Data Engineer / Architect',
    location: 'Austin, TX',
    period: 'July 2024 – Present',
    accent: 'cyan',
    highlights: [
      'Spearheading 0-to-1 greenfield design of a Unified Data Lakehouse integrating multiple internal and external sources for GPU validation, performance reporting, and self-serve analytics; directed 1-to-100 scale-out for Data Center GPU Validation, Test Strategy, and Automation platforms for Radeon and Helios compute tray series, influencing customer data roadmaps and contract definitions with leading SaaS and cloud providers.',
      'Leading 12+ SDEs, Data Engineers, and AI/ML Scientists delivering advanced data and AI/ML solutions for Power Management, Performance Logging, Manufacturing, and Test Automation use cases.',
      'Architected enterprise Data Lakehouse and governance platforms supporting Lambda | Kappa | Delta Data Mart patterns using Databricks (Delta Lake, DLT, Unity Catalog, LakeBase, AgentBricks) and Snowflake (Dynamic Tables, Cortex, OpenFlow) for pre/post-silicon validation, utilization, and yield analysis DataOps and MLOps pipelines.',
      'Built production data serving infrastructure on CDP using Apache Kafka, OneHouse, Aerospike, Trino, Dremio, Apache Spark, and Elasticsearch with sub-millisecond p9999 latency SLA compliance.',
      'Engineered LLM-assisted agentic data operations using Anthropic Claude API (Claude 3 Opus/Sonnet), OpenAI GPT-4o, LangChain, and LangGraph to automate data quality checks, pipeline monitoring, and anomaly root-cause analysis, reducing manual triage effort by 60%.',
      'Built ML monitoring and telemetry framework for data, performance, and inference drift using MLflow, BentoML, Prometheus, Dagster, Grafana, Loki, Mimir, and Thanos; drove BI reporting via Databricks SQL and Apache Superset, delivering $3M+ revenue growth YoY.',
      'Established event-driven, multi-tier lakehouse architecture patterns with HA/DR, reducing SEV-2 incidents by 85% YoY with GitHub Copilot and Databricks Agents; operationalized governance complying with PCI DSS, HIPAA, GDPR, CCPA, SOC 2, ISO 27001 via LightUp, Alation, Monte Carlo, and Collibra.',
      'Architected HPC multi-node GPU clusters supporting GenAI, RAG, and RLHF pipelines using vLLM and TGI for efficient SOTA model serving.',
    ],
  },
  {
    id: 'transunion',
    company: 'TransUnion',
    title: 'Principal Data Engineer',
    location: 'Austin, TX',
    period: 'April 2023 – July 2024',
    accent: 'violet',
    highlights: [
      'Strategically led 18 Data Engineers, Data Scientists, and SDEs delivering 0-to-1 turn-key data products and 1-to-100 scaled solutions across fraud, credit/non-credit risk, cybersecurity, and churn analytics.',
      'Led Go-to-Market strategy for CDP and Data Cleanroom features supporting Lambda | Kappa Data Mart and MLOps workflows; integrated GenAI RAG pipelines achieving 32% YoY lift in fraud identification via identity keying-matching-linking pipelines using Feast, Redis, Aerospike, dbt, MLflow, BigQuery, Airflow, Pub/Sub, Kubernetes, and Trino.',
      'Engineered Aerospike-based online/offline Feature Store using Feast, Tecton, and Kubeflow, cutting inference latency for Scoring, Fraud, and AML pipelines by 80% (35ms to 7ms) and enabling $1.2M/year in infrastructure savings.',
      'Designed A/B and A/A testing pipelines for credit and non-credit feature rollout with custom treatment traffic bifurcation and statistical significance frameworks.',
      'Architected MLOps serving infrastructure using Cloud Spanner, Terraform, Kong, and Swagger for GraphQL and REST API endpoints enabling batch inferencing across GCP, AWS, and Azure using Parquet, Protobuf, Apache Arrow, and Apache Iceberg, generating $1M+ YoY revenue.',
      'Operationalized cost-efficient data lakehouses and orchestration workflows using Kafka, Flink, Spark, Hudi, Iceberg, Airflow, Redshift, TimescaleDB, and serialization formats Avro and Parquet.',
      'Developed distributed GenAI solutions with RAG using OpenAI GPT-4, Meta LLaMA, LangChain, LlamaIndex, and Milvus vector store, saving 10+ clients $2.5M+ annually by offloading legacy NLP infrastructure.',
      'Engineered low-latency threat detection ingestion pipelines using CrowdStrike, SIEM, Cloudflare, Splunk, Filebeat, and ELK stack.',
    ],
  },
  {
    id: 'amazon',
    company: 'Amazon',
    title: 'Senior Data Engineer / Architect',
    location: 'Arlington, VA',
    period: 'July 2020 – April 2023',
    accent: 'amber',
    highlights: [
      'Led a team of 6 BIEs, Data Scientists, and Data Engineers across multiple analytics programs; drove task assignment, weekly reviews, and growth tracking resulting in direct report promotions.',
      'Architected enterprise data strategy and roadmap supporting Lambda | Kappa | Delta pipeline patterns via Data Lakehouse | Data Lake | Data Mesh | Data Mart designs using Redshift, Aurora, Kinesis, Firehose, DynamoDB, dbt, Fivetran, Athena, and Airflow for FinTech, Retail, and FMCG clients, reducing data-blocker delivery misses by 90%.',
      'Developed and optimized ETL/ELT pipelines using Redshift, AWS Lambda, and AWS Glue; reduced query latency by 70% implementing Apache Iceberg with Project Nessie and optimized data lake caching, saving 400 resource-hours annually.',
      'Architected enterprise data roadmap with p9999 latency SLA compliance; established QA frameworks and data resolution processes reducing SEV-2 incidents by 50% annually across creation-to-presentation data layers.',
      'Led capacity planning attribution model for Amazon Seller and Buyer journeys from onboarding to shipment, boosting operational performance by 200bps via proactive RBAC-based data delivery using Kinesis, AWS Glue, and DynamoDB.',
      'Built Airflow DAGs with multiple executors for real-time data processing integrating Apache Kafka, Apache Hudi, and Apache Flink; improved failover consistency and migrated legacy cron and Jenkins scheduling.',
      'Formulated statistical runbooks for pre/post A/B and A/A test analysis and ML pipeline productionization via AWS SageMaker and DynamoDB; implemented Redshift metadata management and automated Glue Crawler pipelines.',
    ],
  },
  {
    id: 'hughes',
    company: 'Hughes Network Systems',
    title: 'Data Mining Scientist',
    location: 'Germantown, MD',
    period: 'January 2018 – July 2020',
    accent: 'cyan',
    highlights: [
      'Led 5 Data Engineers and Data Analysts building edge-serving ML models for the two largest US telecom providers; reduced national audio call drop rates by 72% and delivered $650K+ QoQ revenue growth.',
      'Implemented ML models for video frame-rate improvement via prediction-based CDN caching, achieving 48% fewer frame drops and 26% reduction in month-over-month churn on low-bandwidth networks.',
      'Developed NLP/NLU processing pipelines using AWS SageMaker, Textract, spaCy, gensim, AllenNLP, ELMo, and RoBERTa for multi-LOB survey text summarization with custom training corpora.',
      'Set up GCP clusters with AutoML jobs for image classification; engineered BigQuery and Pub/Sub pipelines for real-time data ingestion for field installer operations.',
      'Engineered data pipelines for RL models using PySpark, Kafka, AWS Glue, AWS Lambda, Apache Hive, and Apache NiFi; built ARIMA, Kalman filter, and k-NN models for supply-chain assortment optimization, reducing logistics bottlenecks by 4% and lifting profit by 6%.',
    ],
  },
  {
    id: 'ibm',
    company: 'IBM Corporation',
    title: 'Data Science Intern',
    location: 'Durham, NC',
    period: 'June 2017 – December 2017',
    accent: 'violet',
    highlights: [
      'Built BlueMix usage-pattern feature engineering pipelines and ML models — PCA, SVD, Market Basket Analysis, kNN, GBM, Hierarchical Clustering, Logistic Regression with Bayesian Belief and MCMC.',
      'Designed A/B testing and pilot rollout strategies with Sales and Pre-Sales teams; created model deployment and optimization pipelines using CPLEX, Gurobi, and LAPack with Spark MLlib.',
    ],
  },
  {
    id: 'cognizant',
    company: 'Cognizant Technology Solutions',
    title: 'Senior Data Engineer',
    location: 'Bangalore, India',
    period: 'July 2013 – August 2016',
    accent: 'amber',
    highlights: [
      'Led 3 Data Engineers implementing end-to-end ETL pipelines using Informatica, Talend, Cognos BI, and SAP Business Objects for Marketing analytics, delivering $500K YoY revenue growth.',
      'Engineered 50-node Apache Spark cluster for stream processing of 10TB+/day using Apache Kafka, Flume, Impala, HBase, and Oozie; performed large-scale data mining with OpenRefine and Trifacta to enable XGBoost feature development.',
      'Migrated data warehouses and data lakes to Hadoop with Pig, Hive, HBase, Impala, Ambari, and Mahout; managed DW integration using Erwin, MSSQL, SSIS, SSAS, SSRS, PL/SQL, and T-SQL.',
      'Delivered AWS and Azure cloud integrations using S3, EMR, DynamoDB, Redshift, Lambda following CRISP-DM; implemented CI/CD pipelines using Git, Maven, Jenkins, Chef, Ansible, and Puppet.',
    ],
  },
]

export const EDUCATION = [
  {
    line: 'MS, Computer Science — University of North Carolina at Charlotte, NC · 2016–2017 · GPA 3.8/4.0',
  },
  {
    line: 'BS, Electronics & Communication Engineering — West Bengal University of Technology, India · 2009–2013 · GPA 3.7/4.0',
  },
]

export const CERTIFICATIONS = [
  'Databricks Certified Data Engineer Professional',
  'AWS Certified Machine Learning Specialty (ML-S)',
  'AWS Certified Developer Associate',
  'SnowPro Core Expert',
  'GCP Professional Data Engineer',
]

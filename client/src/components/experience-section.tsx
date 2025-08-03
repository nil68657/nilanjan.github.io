export function ExperienceSection() {
  const experiences = [
    {
      id: 'amd',
      period: 'July 2024 - Present',
      company: 'Advanced Micro Devices',
      title: 'Sr. Engineering Manager',
      location: 'Austin, TX, USA',
      color: 'fractal-cyan',
      achievements: [
        'Spearheading Go-to-Market strategy for 0-1 features for Data Center GPU Validation and Automation teams for GPU product series',
        'Leading team of 6 SDE, Data Engineers and Data Scientists developing cutting-edge ML and AI initiatives on Power Management, Performance logs, Validation, Manufacturing and Automation',
        'Architecting Gen AI and Data Lakehouse using Databricks (DLT, Delta, Iceberg, UC) and Snowflake (DT, Cortex) reducing SEV-2 issues by 70% annually',
        'Developed HPC multi-node clusters supporting Gen AI capabilities with RAG and RLHF pipeline using SOTA models'
      ]
    },
    {
      id: 'transunion',
      period: 'Apr 2023 - July 2024',
      company: 'TransUnion',
      title: 'Sr. Engineering Manager',
      location: 'Austin, TX, USA',
      color: 'fractal-purple',
      achievements: [
        'Led team of 11 Data Engineers, Data Scientists, SDEs developing 0-1 turn-key solutions for ML and AI initiatives on fraud, device and credit risk',
        'Engineered Aerospike-based Feature Store using Feast, Tecton, Kubeflow reducing inference time by 80% from 35ms to 7ms enabling $1.2Mn/y savings',
        'Enabled GenAI with RAG pipeline achieving 32% YoY lift for fraud and risk identification using GPT-4, Llama, and custom vectors on Milvus',
        'Spearheaded MLOps serving infrastructure using Spanner, Terraform, Kong for GraphQL endpoints leading to $1Mn+ YoY revenue'
      ]
    },
    {
      id: 'amazon',
      period: 'July 2020 - Apr 2023',
      company: 'Amazon',
      title: 'Sr. Data Architect',
      location: 'Arlington, VA, USA',
      color: 'fractal-orange',
      achievements: [
        'Directed team of Data Architects, Data Scientists, ML Engineers on multiple analytics customer engagements leading to promotions',
        'Operationalized ML models for A/B testing using Lambda, SageMaker, DynamoDB leading to 66% faster TAT',
        'Developed ETL pipelines reducing latency by 70% through Iceberg optimization, saving 400 resource-hours annually',
        'Architected Data Strategy for FinTech, Education, Retail, FMCG clients using comprehensive AWS stack'
      ]
    },
    {
      id: 'hughes',
      period: 'Jan 2018 - July 2020',
      company: 'Hughes Network Systems',
      title: 'Sr. Data Mining Scientist',
      location: 'Germantown, MD, USA',
      color: 'fractal-cyan',
      achievements: [
        'Developed NLP/NLU processing pipelines using AWS SageMaker, Textract, spaCy, AllenNLP, ELMO and RoBERTa',
        'Created NLP models for NER, Topic modeling, Sentiment Analysis from survey feedback data',
        'Built data warehouses using Oracle 11g, 12c with Data Guard, ASM, RMAN, RAC capabilities'
      ]
    }
  ];

  const earlierExperiences = [
    {
      company: 'IBM Corporation',
      title: 'Data Science Intern',
      period: 'June 2017 - Dec 2017',
      description: 'BlueMix solutions, HR Analytics, A/B testing',
      color: 'fractal-purple'
    },
    {
      company: 'Cognizant Technology Solutions',
      title: 'Senior Data Engineer',
      period: 'July 2013 - Aug 2016',
      description: 'Led team of 3, $500K YoY revenue growth',
      color: 'fractal-orange'
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8" data-testid="experience-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-shadow-strong" data-testid="experience-title">
            Professional Experience
          </h2>
          <p className="text-lg text-foreground/80 text-shadow-strong" data-testid="experience-subtitle">
            12+ years of leadership in Data & ML Engineering
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="glass-morphism rounded-2xl p-6 md:p-8 hover:bg-white/5 transition-all duration-300" data-testid={`experience-${exp.id}`}>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <div className={`text-[hsl(var(--${exp.color}))] font-mono text-sm font-semibold mb-2`} data-testid={`text-period-${exp.id}`}>
                    {exp.period}
                  </div>
                  <div className="text-foreground font-bold text-lg mb-2 text-shadow-strong" data-testid={`text-company-${exp.id}`}>
                    {exp.company}
                  </div>
                  <div className="text-foreground/80 font-medium text-shadow-strong" data-testid={`text-title-${exp.id}`}>
                    {exp.title}
                  </div>
                  <div className="text-foreground/60 text-sm text-shadow-strong" data-testid={`text-location-${exp.id}`}>
                    {exp.location}
                  </div>
                </div>
                <div className="md:col-span-3">
                  <ul className="space-y-3 text-foreground/90 text-shadow-strong">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start" data-testid={`achievement-${exp.id}-${index}`}>
                        <div className={`w-2 h-2 bg-[hsl(var(--${exp.color}))] rounded-full mt-2 mr-3 flex-shrink-0`}></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* Earlier Experience Summary */}
          <div className="glass-morphism rounded-2xl p-6 md:p-8" data-testid="earlier-experience">
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-4 text-shadow-strong" data-testid="earlier-experience-title">
                Earlier Career Highlights
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {earlierExperiences.map((exp, index) => (
                  <div key={index} data-testid={`earlier-exp-${index}`}>
                    <h4 className={`text-[hsl(var(--${exp.color}))] font-semibold mb-2`} data-testid={`earlier-company-${index}`}>
                      {exp.company}
                    </h4>
                    <p className="text-foreground/80 text-sm text-shadow-strong" data-testid={`earlier-title-${index}`}>
                      {exp.title} ({exp.period})
                    </p>
                    <p className="text-foreground/70 text-sm text-shadow-strong" data-testid={`earlier-description-${index}`}>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

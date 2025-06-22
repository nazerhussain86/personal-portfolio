
import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// ERP System Flow Nodes with enhanced descriptions
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: '🌐 ASP.NET MVC Backend\n(Core Application Logic)' },
    position: { x: 250, y: 25 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#f97316', 
      border: '2px solid #f97316',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '180px'
    },
  },
  {
    id: '2',
    data: { label: '🗄️ MS SQL Server\n(Data Storage & Management)' },
    position: { x: 50, y: 150 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#f97316', 
      border: '2px solid #f97316',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '160px'
    },
  },
  {
    id: '3',
    data: { label: '🐍 Python OCR Engine\n(EasyOCR Processing)' },
    position: { x: 450, y: 150 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#f97316', 
      border: '2px solid #f97316',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '160px'
    },
  },
  {
    id: '4',
    data: { label: '📄 Document Processing\n(PDF & Scanned Docs)' },
    position: { x: 600, y: 280 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#f97316', 
      border: '2px solid #f97316',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '160px'
    },
  },
  {
    id: '5',
    data: { label: '🔗 C# Web API\n(Integration Layer)' },
    position: { x: 250, y: 280 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#f97316', 
      border: '2px solid #f97316',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '160px'
    },
  },
  {
    id: '6',
    data: { label: '📧 Email Management\n(Automated System)' },
    position: { x: 50, y: 410 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#f97316', 
      border: '2px solid #f97316',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '160px'
    },
  },
  {
    id: '7',
    data: { label: '📊 ERP Modules\n(Import/Export System)' },
    position: { x: 450, y: 410 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#f97316', 
      border: '2px solid #f97316',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '160px'
    },
  },
  {
    id: '8',
    type: 'output',
    data: { label: '⚡ Real-time Processing\n(Live Data Updates)' },
    position: { x: 250, y: 540 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#f97316', 
      border: '2px solid #f97316',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '160px'
    },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
    label: 'Data Flow',
    labelStyle: { fill: '#f97316', fontWeight: 600 }
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
    label: 'OCR Request',
    labelStyle: { fill: '#f97316', fontWeight: 600 }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
    label: 'Process',
    labelStyle: { fill: '#f97316', fontWeight: 600 }
  },
  {
    id: 'e1-5',
    source: '1',
    target: '5',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
    label: 'API Call',
    labelStyle: { fill: '#f97316', fontWeight: 600 }
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
    label: 'Email Trigger',
    labelStyle: { fill: '#f97316', fontWeight: 600 }
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
    label: 'ERP Integration',
    labelStyle: { fill: '#f97316', fontWeight: 600 }
  },
  {
    id: 'e5-8',
    source: '5',
    target: '8',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
    label: 'Live Updates',
    labelStyle: { fill: '#f97316', fontWeight: 600 }
  },
];

// OCR Project Flow Nodes with enhanced descriptions
const ocrNodes = [
  {
    id: 'ocr-1',
    type: 'input',
    data: { label: '📱 Document Input\n(PDF/Scanned Images)' },
    position: { x: 300, y: 25 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#10b981', 
      border: '2px solid #10b981',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '160px'
    },
  },
  {
    id: 'ocr-2',
    data: { label: '🔍 Python EasyOCR\n(Text Recognition Engine)' },
    position: { x: 300, y: 150 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#10b981', 
      border: '2px solid #10b981',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '160px'
    },
  },
  {
    id: 'ocr-3',
    data: { label: '📊 Text Extraction\n(90% Accuracy Rate)' },
    position: { x: 100, y: 280 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#10b981', 
      border: '2px solid #10b981',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '160px'
    },
  },
  {
    id: 'ocr-4',
    data: { label: '⚙️ C# Web API\n(Processing Logic)' },
    position: { x: 500, y: 280 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#10b981', 
      border: '2px solid #10b981',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '160px'
    },
  },
  {
    id: 'ocr-5',
    data: { label: '🌐 ASP.NET MVC\n(User Interface)' },
    position: { x: 300, y: 410 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#10b981', 
      border: '2px solid #10b981',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '160px'
    },
  },
  {
    id: 'ocr-6',
    type: 'output',
    data: { label: '📋 Processed Data\n(Structured Output)' },
    position: { x: 300, y: 540 },
    style: { 
      backgroundColor: '#1e293b', 
      color: '#10b981', 
      border: '2px solid #10b981',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '12px',
      minWidth: '160px'
    },
  },
];

const ocrEdges = [
  {
    id: 'ocr-e1-2',
    source: 'ocr-1',
    target: 'ocr-2',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
    label: 'Upload',
    labelStyle: { fill: '#10b981', fontWeight: 600 }
  },
  {
    id: 'ocr-e2-3',
    source: 'ocr-2',
    target: 'ocr-3',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
    label: 'Extract',
    labelStyle: { fill: '#10b981', fontWeight: 600 }
  },
  {
    id: 'ocr-e2-4',
    source: 'ocr-2',
    target: 'ocr-4',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
    label: 'Process',
    labelStyle: { fill: '#10b981', fontWeight: 600 }
  },
  {
    id: 'ocr-e3-5',
    source: 'ocr-3',
    target: 'ocr-5',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
    label: 'Display',
    labelStyle: { fill: '#10b981', fontWeight: 600 }
  },
  {
    id: 'ocr-e4-5',
    source: 'ocr-4',
    target: 'ocr-5',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
    label: 'Render',
    labelStyle: { fill: '#10b981', fontWeight: 600 }
  },
  {
    id: 'ocr-e5-6',
    source: 'ocr-5',
    target: 'ocr-6',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
    label: 'Export',
    labelStyle: { fill: '#10b981', fontWeight: 600 }
  },
];

const Projects = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [ocrNodesState, setOcrNodes, onOcrNodesChange] = useNodesState(ocrNodes);
  const [ocrEdgesState, setOcrEdges, onOcrEdgesChange] = useEdgesState(ocrEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onOcrConnect = useCallback(
    (params: Connection) => setOcrEdges((eds) => addEdge(params, eds)),
    [setOcrEdges],
  );

  const projectDetails = [
    {
      title: "Backend Architecture & Database Management",
      description: "Built robust server-side architecture using ASP.NET MVC framework with MS SQL Server for enterprise-grade data management, ensuring scalability and security for concurrent user access.",
      impact: "🚀 Robust foundation supporting 1000+ concurrent users",
      techStack: ["ASP.NET MVC", "MS SQL Server", "C#", "Entity Framework"]
    },
    {
      title: "Python OCR Integration & Document Processing",
      description: "Integrated Python-based OCR engine using EasyOCR library with executable deployment, achieving high accuracy in text extraction from diverse document formats including scanned PDFs.",
      impact: "📈 80% efficiency increase with 90%+ accuracy rate",
      techStack: ["Python", "EasyOCR", "Document Processing", "Image Recognition"]
    },
    {
      title: "API Development & Cross-Platform Integration",
      description: "Developed comprehensive Web API architecture facilitating seamless communication between Python OCR engine and C# application, enabling real-time data exchange and processing workflows.",
      impact: "⚡ 50% reduction in processing time with real-time updates",
      techStack: ["Web API", "RESTful Services", "JSON", "Real-time Processing"]
    },
    {
      title: "ERP System Integration & Workflow Optimization",
      description: "Implemented custom import/export modules within the ASP.NET MVC application, specifically designed for ERP workflow integration with automated data synchronization and validation.",
      impact: "📊 15% improvement in data processing efficiency",
      techStack: ["ERP Integration", "Data Import/Export", "Workflow Automation", "Validation Systems"]
    },
    {
      title: "Automated Email Management System",
      description: "Developed intelligent email processing system with automated reading, analysis, and response capabilities, integrated with SQL Server for comprehensive communication management and tracking.",
      impact: "💬 Streamlined communication with 95% automation rate",
      techStack: ["Email Automation", "SMTP Integration", "SQL Server", "Communication APIs"]
    }
  ];

  const ocrProjectDetails = [
    {
      title: "Advanced OCR Text Extraction Engine",
      description: "Developed a sophisticated Python-based OCR application utilizing EasyOCR library for precise text extraction from multiple document formats including PDFs, scanned images, and mixed-content documents.",
      impact: "🎯 90% accuracy in multi-format document processing",
      techStack: ["Python", "EasyOCR", "OpenCV", "Image Processing"]
    },
    {
      title: "Seamless Web API Integration Layer",
      description: "Created a robust integration bridge between Python OCR engine and C# Web API, enabling seamless document processing workflow with error handling, logging, and performance optimization.",
      impact: "🔗 Unified processing pipeline with 99.9% uptime",
      techStack: ["C# Web API", "Python Integration", "Error Handling", "Performance Optimization"]
    },
    {
      title: "User-Friendly ASP.NET MVC Interface",
      description: "Built an intuitive web interface using ASP.NET MVC architecture for document upload, processing management, and results visualization with responsive design and user experience optimization.",
      impact: "✨ Enhanced user experience with 40% faster task completion",
      techStack: ["ASP.NET MVC", "Responsive Design", "jQuery", "Bootstrap"]
    }
  ];

  return (
    <section id="projects" className="py-8 sm:py-12 lg:py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Interactive Project Architecture
          </h2>
          <div className="w-12 sm:w-16 lg:w-20 h-1 bg-orange-500 mx-auto mb-4 sm:mb-6 lg:mb-8"></div>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2">
            Explore detailed flow diagrams showcasing the technical architecture and integration patterns of my full-stack development projects, highlighting seamless connectivity between multiple technologies and platforms.
          </p>
        </div>

        {/* ERP System Project */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="bg-slate-900/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500">
                  Enterprise ERP System Architecture
                </h3>
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="h-72 sm:h-96 lg:h-[600px] xl:h-[700px] w-full overflow-hidden rounded-lg border border-slate-600">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                style={{ backgroundColor: '#0f172a' }}
                minZoom={0.1}
                maxZoom={1.2}
                defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
                attributionPosition="bottom-left"
              >
                <Controls
                  style={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #f97316',
                    borderRadius: '8px'
                  }}
                  className="[&_button]:text-orange-500 [&_button]:bg-slate-800 [&_button]:border-orange-500/30 [&_button]:hover:bg-orange-500/20"
                />
                <Background color="#374151" gap={16} size={1} />
              </ReactFlow>
            </div>
            
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <h4 className="text-lg sm:text-xl font-semibol text-orange-400 mb-3">🔄 System Flow Explanation:</h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                The ERP system follows a microservice architecture where the ASP.NET MVC backend orchestrates communication between the SQL Server database, Python OCR engine, and various processing modules. Data flows through the Web API integration layer, enabling real-time document processing, automated email management, and seamless ERP module synchronization.
              </p>
            </div>
          </div>

          {/* ERP Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10">
            {projectDetails.map((project, index) => (
              <div
                key={index}
                className="bg-slate-800/60 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl lg:rounded-2xl border border-slate-600 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl group"
              >
                <div className="flex items-start mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white leading-tight group-hover:text-orange-400 transition-colors duration-300">{project.title}</h3>
                </div>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">{project.description}</p>
                
                <div className="mb-3 sm:mb-4">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-slate-700/50 text-orange-300 text-xs rounded-md border border-orange-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 sm:p-4">
                  <p className="text-orange-400 font-medium text-sm leading-relaxed">{project.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OCR Document Processing Project */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-slate-900/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-500">
                  OCR Document Processing Pipeline
                </h3>
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="h-72 sm:h-96 lg:h-[600px] xl:h-[700px] w-full overflow-hidden rounded-lg border border-slate-600">
              <ReactFlow
                nodes={ocrNodesState}
                edges={ocrEdgesState}
                fitView
                style={{ backgroundColor: '#0f172a' }}
                minZoom={0.1}
                maxZoom={1.2}
                defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
              >
                <Controls
                  style={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #10b981',
                    borderRadius: '8px'
                  }}
                  className="[&_button]:text-emerald-500 [&_button]:bg-slate-800 [&_button]:border-emerald-500/30 [&_button]:hover:bg-emerald-500/20"
                />
                <Background color="#374151" gap={16} size={1} />
              </ReactFlow>
            </div>
            
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <h4 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-3">🔍 Processing Pipeline Explanation:</h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                The OCR system processes documents through a streamlined pipeline: documents are uploaded via the ASP.NET MVC interface, processed by the Python EasyOCR engine for text extraction, validated through the C# Web API layer, and finally presented back to users with structured, searchable data output achieving 90% accuracy rates.
              </p>
            </div>
          </div>

          {/* OCR Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10">
            {ocrProjectDetails.map((project, index) => (
              <div
                key={index}
                className="bg-slate-800/60 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl lg:rounded-2xl border border-slate-600 hover:border-emerald-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl group"
              >
                <div className="flex items-start mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white leading-tight group-hover:text-emerald-400 transition-colors duration-300">{project.title}</h3>
                </div>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">{project.description}</p>
                
                <div className="mb-3 sm:mb-4">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-slate-700/50 text-emerald-300 text-xs rounded-md border border-emerald-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 sm:p-4">
                  <p className="text-emerald-400 font-medium text-sm leading-relaxed">{project.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

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

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'ASP.NET MVC Backend' },
    position: { x: 250, y: 25 },
    style: { backgroundColor: '#1e293b', color: '#f97316', border: '2px solid #f97316' },
  },
  {
    id: '2',
    data: { label: 'MS SQL Server Database' },
    position: { x: 100, y: 125 },
    style: { backgroundColor: '#1e293b', color: '#f97316', border: '2px solid #f97316' },
  },
  {
    id: '3',
    data: { label: 'Python EasyOCR Engine' },
    position: { x: 400, y: 125 },
    style: { backgroundColor: '#1e293b', color: '#f97316', border: '2px solid #f97316' },
  },
  {
    id: '4',
    data: { label: 'Document Processing' },
    position: { x: 550, y: 225 },
    style: { backgroundColor: '#1e293b', color: '#f97316', border: '2px solid #f97316' },
  },
  {
    id: '5',
    data: { label: 'C# Web API Integration' },
    position: { x: 250, y: 225 },
    style: { backgroundColor: '#1e293b', color: '#f97316', border: '2px solid #f97316' },
  },
  {
    id: '6',
    data: { label: 'Email Management System' },
    position: { x: 50, y: 325 },
    style: { backgroundColor: '#1e293b', color: '#f97316', border: '2px solid #f97316' },
  },
  {
    id: '7',
    data: { label: 'ERP Import/Export Modules' },
    position: { x: 450, y: 325 },
    style: { backgroundColor: '#1e293b', color: '#f97316', border: '2px solid #f97316' },
  },
  {
    id: '8',
    type: 'output',
    data: { label: 'Real-time Data Processing' },
    position: { x: 250, y: 425 },
    style: { backgroundColor: '#1e293b', color: '#f97316', border: '2px solid #f97316' },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#f97316' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    animated: true,
    style: { stroke: '#f97316' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    style: { stroke: '#f97316' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
  },
  {
    id: 'e1-5',
    source: '1',
    target: '5',
    animated: true,
    style: { stroke: '#f97316' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    animated: true,
    style: { stroke: '#f97316' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    animated: true,
    style: { stroke: '#f97316' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
  },
  {
    id: 'e5-8',
    source: '5',
    target: '8',
    animated: true,
    style: { stroke: '#f97316' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
  },
];

// OCR Project Flow Nodes
const ocrNodes = [
  {
    id: 'ocr-1',
    type: 'input',
    data: { label: 'Document Input (PDF/Scanned)' },
    position: { x: 250, y: 25 },
    style: { backgroundColor: '#1e293b', color: '#10b981', border: '2px solid #10b981' },
  },
  {
    id: 'ocr-2',
    data: { label: 'Python EasyOCR Engine' },
    position: { x: 250, y: 125 },
    style: { backgroundColor: '#1e293b', color: '#10b981', border: '2px solid #10b981' },
  },
  {
    id: 'ocr-3',
    data: { label: 'Text Extraction (90% Accuracy)' },
    position: { x: 100, y: 225 },
    style: { backgroundColor: '#1e293b', color: '#10b981', border: '2px solid #10b981' },
  },
  {
    id: 'ocr-4',
    data: { label: 'C# Web API Processing' },
    position: { x: 400, y: 225 },
    style: { backgroundColor: '#1e293b', color: '#10b981', border: '2px solid #10b981' },
  },
  {
    id: 'ocr-5',
    data: { label: 'ASP.NET MVC Frontend' },
    position: { x: 250, y: 325 },
    style: { backgroundColor: '#1e293b', color: '#10b981', border: '2px solid #10b981' },
  },
  {
    id: 'ocr-6',
    type: 'output',
    data: { label: 'Processed Document Data' },
    position: { x: 250, y: 425 },
    style: { backgroundColor: '#1e293b', color: '#10b981', border: '2px solid #10b981' },
  },
];

const ocrEdges = [
  {
    id: 'ocr-e1-2',
    source: 'ocr-1',
    target: 'ocr-2',
    animated: true,
    style: { stroke: '#10b981' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
  },
  {
    id: 'ocr-e2-3',
    source: 'ocr-2',
    target: 'ocr-3',
    animated: true,
    style: { stroke: '#10b981' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
  },
  {
    id: 'ocr-e2-4',
    source: 'ocr-2',
    target: 'ocr-4',
    animated: true,
    style: { stroke: '#10b981' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
  },
  {
    id: 'ocr-e3-5',
    source: 'ocr-3',
    target: 'ocr-5',
    animated: true,
    style: { stroke: '#10b981' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
  },
  {
    id: 'ocr-e4-5',
    source: 'ocr-4',
    target: 'ocr-5',
    animated: true,
    style: { stroke: '#10b981' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
  },
  {
    id: 'ocr-e5-6',
    source: 'ocr-5',
    target: 'ocr-6',
    animated: true,
    style: { stroke: '#10b981' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
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
      title: "Backend Architecture & Database",
      description: "Developed scalable back-end logic and database interactions using C# and ASP.NET MVC with MS SQL Server, ensuring security and handling concurrent users.",
      impact: "Robust foundation for enterprise applications"
    },
    {
      title: "Document Processing Integration",
      description: "Integrated Python executable (.exe) using EasyOCR for accurate document processing.",
      impact: "80% efficiency increase with 90%+ data accuracy"
    },
    {
      title: "API Integration & Data Exchange",
      description: "Established seamless data exchange between platforms by linking Python application and C# Web API.",
      impact: "50% reduction in manual data entry with real-time processing"
    },
    {
      title: "ERP Workflow Optimization",
      description: "Developed custom import/export modules within ASP.NET MVC application tailored for ERP workflows.",
      impact: "15% reduction in data processing time"
    },
    {
      title: "Automated Email Management",
      description: "Implemented automated email system to read, analyze, and respond to emails with SQL Server integration.",
      impact: "Streamlined communication with automated responses"
    }
  ];

  const ocrProjectDetails = [
    {
      title: "OCR Text Extraction",
      description: "Python-based OCR application with EasyOCR for precise text extraction from diverse document formats.",
      impact: "90% accuracy in document processing"
    },
    {
      title: "Web API Integration",
      description: "Seamless integration between Python OCR engine and C# Web API for robust document processing workflow.",
      impact: "Unified processing pipeline"
    },
    {
      title: "ASP.NET MVC Frontend",
      description: "User-friendly web interface built with ASP.NET MVC architecture for document upload and processing management.",
      impact: "Enhanced user experience and workflow efficiency"
    }
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Project Architecture
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Interactive visualization of my full-stack development projects showcasing seamless integration between multiple technologies
          </p>
        </div>

        {/* ERP System Project */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-slate-900/50 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm border border-slate-700">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-orange-500">ERP System Architecture Flow</h3>
            <div className="h-80 sm:h-96 lg:h-[500px] w-full">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                style={{ backgroundColor: '#0f172a' }}
              >
                <Controls style={{ backgroundColor: '#1e293b', border: '1px solid #f97316' }} />
                <MiniMap 
                  style={{ backgroundColor: '#1e293b', border: '1px solid #f97316' }}
                  nodeColor="#f97316"
                  className="hidden sm:block"
                />
                <Background color="#374151" gap={16} />
              </ReactFlow>
            </div>
          </div>

          {/* ERP Project Details */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8">
            {projectDetails.map((project, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-slate-600 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm mr-2 sm:mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">{project.title}</h3>
                </div>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                  <p className="text-orange-400 font-medium text-xs sm:text-sm">{project.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OCR Document Processing Project */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-slate-900/50 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm border border-slate-700">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-emerald-500">OCR Document Processing System</h3>
            <div className="h-80 sm:h-96 lg:h-[500px] w-full">
              <ReactFlow
                nodes={ocrNodesState}
                edges={ocrEdgesState}
                onNodesChange={onOcrNodesChange}
                onEdgesChange={onOcrEdgesChange}
                onConnect={onOcrConnect}
                fitView
                style={{ backgroundColor: '#0f172a' }}
              >
                <Controls style={{ backgroundColor: '#1e293b', border: '1px solid #10b981' }} />
                <MiniMap 
                  style={{ backgroundColor: '#1e293b', border: '1px solid #10b981' }}
                  nodeColor="#10b981"
                  className="hidden sm:block"
                />
                <Background color="#374151" gap={16} />
              </ReactFlow>
            </div>
          </div>

          {/* OCR Project Details */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8">
            {ocrProjectDetails.map((project, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-slate-600 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm mr-2 sm:mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">{project.title}</h3>
                </div>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                  <p className="text-emerald-400 font-medium text-xs sm:text-sm">{project.impact}</p>
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

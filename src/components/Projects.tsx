
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

const Projects = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
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

  return (
    <section id="projects" className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Project Architecture
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Interactive visualization of my full-stack development project showcasing seamless integration between multiple technologies
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="mb-16 bg-slate-900/50 rounded-2xl p-8 backdrop-blur-sm border border-slate-700">
          <h3 className="text-2xl font-bold text-center mb-8 text-orange-500">System Architecture Flow</h3>
          <div style={{ width: '100%', height: '500px' }}>
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
              />
              <Background color="#374151" gap={16} />
            </ReactFlow>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectDetails.map((project, index) => (
            <div 
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-600 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
              </div>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                <p className="text-orange-400 font-medium text-sm">{project.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

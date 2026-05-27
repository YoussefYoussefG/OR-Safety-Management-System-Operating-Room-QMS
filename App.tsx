import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard';
import ChecklistTool from './components/ChecklistTool';
import RiskAuditor from './components/RiskAuditor';
import StandardsViewer from './components/StandardsViewer';
import IncidentForm from './components/IncidentForm';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="checklist" element={<ChecklistTool />} />
          <Route path="auditor" element={<RiskAuditor />} />
          <Route path="standards" element={<StandardsViewer />} />
          <Route path="reporting" element={<IncidentForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

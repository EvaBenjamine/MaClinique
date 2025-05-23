import React from 'react';
import Sidebar from '@/components/Sidebar'; 


// Composant pour l'historique des diagnostics
const DiagnosisHistory: React.FC = () => {
  return (
    <div className="diagnosis-history">
      <h2>Diagnosis History</h2>
      <img src="https://i.pinimg.com/736x/e5/59/4a/e5594a22746f922b4a05b803bce5d90d.jpg" alt="Heart" />
    </div>
  );
};

// Composant pour l'état du patient
const PatientStatus: React.FC = () => {
  return (
    <div className="patient-status">
      <h2>Your Status</h2>
      <div className="status-grid">
        <div className="status-item">
          <h3>Blood Status</h3>
          <p>100/70</p>
          <p className="status-note">10% higher than last week</p>
        </div>
        <div className="status-item">
          <h3>Glucose Level</h3>
          <p>78-82</p>
          <p className="status-note">5% lower than last week</p>
        </div>
        <div className="status-item">
          <h3>Heart Rate</h3>
          <p>78 bpm</p>
          <p className="status-note">3% lower than last week</p>
        </div>
        <div className="status-item">
          <h3>Blood Count</h3>
          <p>8,500/ml</p>
          <p className="status-note">7% lower than last week</p>
        </div>
      </div>
    </div>
  );
};

// Composant pour le rythme cardiaque
const HeartRate: React.FC = () => {
  return (
    <div className="heart-rate">
      <h2>Heart Rate</h2>
      <img src="https://i.pinimg.com/736x/8a/e9/96/8ae99695674d0951b379d24040d72ca6.jpg" alt="Heart Rate" />
    </div>
  );
};

// Composant pour les documents
const Documents: React.FC = () => {
  return (
    <div className="documents">
      <h2>Documents</h2>
      <ul>
        <li>Blood Status Report.pdf</li>
        <li>Heart Rate Report.pdf</li>
        <li>Glucose Report.pdf</li>
        <li>Blood Count Report.pdf</li>
      </ul>
    </div>
  );
};

// Composant principal pour le dossier médical
const DossierMedical: React.FC = () => {
  return (
    <div className="dossier-medical">
      <Sidebar children={undefined} /> {/* Inclusion de la barre latérale */}
      <div className="main-content">
        <div className="header">
          <h1>Medical Website</h1>
          <div className="user-profile">
            <img src="https://i.pinimg.com/474x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg" alt="User" />
          </div>
        </div>
        <div className="content">
          <DiagnosisHistory />
          <PatientStatus />
          <HeartRate />
          <Documents />
        </div>
      </div>
    </div>
  );
};

export default DossierMedical;

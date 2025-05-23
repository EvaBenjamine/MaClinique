import { useState } from 'react';
import {
  Upload, Grid, List, Search, ChevronRight, Home, Folder
} from 'lucide-react';
import Sidebar from '@/components/Sidebar'; // ✅ garde ceci

export default function FileManager() {
  const [viewMode, setViewMode] = useState('grid');

  const folders = [
    { id: 1, name: 'Tous les dossiers prénatals', size: '8 GB', date: '12.07.2019' },
    { id: 2, name: 'Tous les dossiers postnatals', size: '10 GB', date: '12.07.2019' },
  ];

  const files = [
    { id: 1, name: 'KAZIENGA Eva', size: '1 MB', date: '12.07.2019', type: 'doc' },
    { id: 2, name: 'OUEDRAOGO Armand', size: '150 KB', date: '12.07.2019', type: 'doc' },
    { id: 3, name: 'KOURA Stephane', size: '150 MB', date: '12.07.2019', type: 'pdf' },
  ];

  const handleUpload = () => {
    alert('Uploader fichier (fonction à implémenter)');
  };

  const handleFolderClick = (id: number) => {
    window.location.href = `/dossierMedical/VoirDossier`;
  };

  const handleFileClick = (file: any) => {
    if (file.type === 'pdf') {
      window.location.href = `/dossierMedical/VoirDossier`;
    }
  };

  return (
    <div className="flex min-h-screen bg-pink-50">
      <Sidebar>
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Home size={16} className="text-gray-400" />
              <ChevronRight size={14} className="text-gray-300" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search files"
                  className="pl-8 pr-4 py-1 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                className="flex items-center px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 text-sm"
                onClick={handleUpload}
              >
                <Upload size={16} className="mr-2" />
                Télécharger
              </button>
              <button className="p-1 hover:bg-pink-100 rounded" onClick={() => setViewMode('grid')}>
                <Grid size={18} className={viewMode === 'grid' ? 'text-pink-500' : 'text-gray-400'} />
              </button>
              <button className="p-1 hover:bg-pink-100 rounded" onClick={() => setViewMode('list')}>
                <List size={18} className={viewMode === 'list' ? 'text-pink-500' : 'text-gray-400'} />
              </button>
            </div>
          </div>

          {/* Dossiers et fichiers */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {viewMode === 'grid'
              ? files.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => handleFileClick(file)}
                    className={`bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4 ${
                      file.type === 'pdf' ? 'cursor-pointer hover:bg-pink-50 transition' : ''
                    }`}
                  >
                    <div className="w-12 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded font-bold text-xs">
                      {file.type.toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">{file.name}</h4>
                      <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                    </div>
                  </div>
                ))
              : (
                <>
                  {folders.map((folder) => (
                    <div
                      key={folder.id}
                      className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4 cursor-pointer hover:bg-pink-50 transition"
                      onClick={() => handleFolderClick(folder.id)}
                    >
                      <div className="w-12 h-16 bg-yellow-100 flex items-center justify-center rounded">
                        <Folder className="text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{folder.name}</h4>
                        <p className="text-xs text-gray-500">{folder.size} • {folder.date}</p>
                      </div>
                    </div>
                  ))}
                  {files.map((file) => (
                    <div
                      key={file.id}
                      onClick={() => handleFileClick(file)}
                      className={`bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4 ${
                        file.type === 'pdf' ? 'cursor-pointer hover:bg-pink-50 transition' : ''
                      }`}
                    >
                      <div className="w-12 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded font-bold text-xs">
                        {file.type.toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{file.name}</h4>
                        <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

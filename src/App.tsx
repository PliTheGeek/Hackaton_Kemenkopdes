/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ViewType, 
  Land, 
  Farmer, 
  Approval, 
  CatalogItem, 
  Transaction, 
  LandReport,
  INITIAL_LANDS,
  INITIAL_FARMERS,
  INITIAL_APPROVALS,
  INITIAL_CATALOG,
  INITIAL_TRANSACTIONS,
  INITIAL_LAND_REPORTS
} from './types';
import LandingPageView from './components/LandingPageView';
import LoginPageView from './components/LoginPageView';
import FarmerDashboardView from './components/FarmerDashboardView';
import ManagerDashboardView from './components/ManagerDashboardView';
import BuyerDashboardView from './components/BuyerDashboardView';
import GlobalHistoryView from './components/GlobalHistoryView';
import { Sprout, Users, ShieldCheck, ShoppingCart, Database, Globe } from 'lucide-react';

export default function App() {
  // Navigation State
  const [view, setView] = useState<ViewType>(() => {
    const saved = localStorage.getItem('kemenkopdes_view');
    return (saved as ViewType) || 'landing';
  });

  // User Authentication State
  const [currentRole, setCurrentRole] = useState<'petani' | 'manager' | 'pembeli' | null>(() => {
    const saved = localStorage.getItem('kemenkopdes_role');
    return (saved as 'petani' | 'manager' | 'pembeli') || null;
  });

  // Core Data States with localStorage Persistence
  const [lands, setLands] = useState<Land[]>(() => {
    const saved = localStorage.getItem('kemenkopdes_lands');
    return saved ? JSON.parse(saved) : INITIAL_LANDS;
  });

  const [farmers, setFarmers] = useState<Farmer[]>(() => {
    const saved = localStorage.getItem('kemenkopdes_farmers');
    return saved ? JSON.parse(saved) : INITIAL_FARMERS;
  });

  const [approvals, setApprovals] = useState<Approval[]>(() => {
    const saved = localStorage.getItem('kemenkopdes_approvals');
    return saved ? JSON.parse(saved) : INITIAL_APPROVALS;
  });

  const [catalog, setCatalog] = useState<CatalogItem[]>(() => {
    const saved = localStorage.getItem('kemenkopdes_catalog');
    return saved ? JSON.parse(saved) : INITIAL_CATALOG;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('kemenkopdes_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [landReports, setLandReports] = useState<LandReport[]>(() => {
    const saved = localStorage.getItem('kemenkopdes_land_reports');
    return saved ? JSON.parse(saved) : INITIAL_LAND_REPORTS;
  });

  // Synchronize States to LocalStorage
  useEffect(() => {
    localStorage.setItem('kemenkopdes_view', view);
  }, [view]);

  useEffect(() => {
    if (currentRole) {
      localStorage.setItem('kemenkopdes_role', currentRole);
    } else {
      localStorage.removeItem('kemenkopdes_role');
    }
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('kemenkopdes_lands', JSON.stringify(lands));
  }, [lands]);

  useEffect(() => {
    localStorage.setItem('kemenkopdes_farmers', JSON.stringify(farmers));
  }, [farmers]);

  useEffect(() => {
    localStorage.setItem('kemenkopdes_approvals', JSON.stringify(approvals));
  }, [approvals]);

  useEffect(() => {
    localStorage.setItem('kemenkopdes_catalog', JSON.stringify(catalog));
  }, [catalog]);

  useEffect(() => {
    localStorage.setItem('kemenkopdes_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('kemenkopdes_land_reports', JSON.stringify(landReports));
  }, [landReports]);

  // Callbacks for interactions
  const handleLoginSuccess = (role: 'petani' | 'manager' | 'pembeli') => {
    setCurrentRole(role);
    if (role === 'petani') {
      setView('petani');
    } else if (role === 'manager') {
      setView('manager');
    } else {
      setView('pembeli');
    }
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setView('landing');
  };

  const handleAddLandReport = (newReport: LandReport) => {
    // Add to land reports table
    setLandReports(prev => [newReport, ...prev]);

    // Also add an audit transaction to represent the submission in global logs
    const newTrx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      produk: `Usulan Panen: ${newReport.produk}`,
      detail: `${newReport.lahan} • Pagu Estimasi`,
      entitas: 'Sutaryo (Petani)',
      role: 'PETANI',
      kuantitas: newReport.volume,
      totalHarga: 0, // Pending calculation
      margin: 0,
      status: 'Tinjauan',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRMcxQvLpKXC-PV0ZwXpMH16XVVRnMWn5wbkModTojJ-QoeJ9ecriDwLkwOU51wzq0nyP657eIV6OjtIXpNWi3qV8i4MGwd_Bs4QGnOOwIADe4Vsvta7UJJNo0jc8ntQ-uoASdCCLmxjyYZ4kbl67OfiXebOhWxDR7vYKegR5j051LBcD-rVYcU6tcUaIZBkIHriAizhVbA3BbyfcyyVFP2yt6dpVb3mu6xey9XJcrJOv7Fqo32bR5IX4q9-8MfIFTzwVPq-xxtpY'
    };
    setTransactions(prev => [newTrx, ...prev]);
  };

  const handleAddFarmer = (newFarmer: Farmer) => {
    setFarmers(prev => [...prev, newFarmer]);
  };

  const handleAddApproval = (newApproval: Approval) => {
    setApprovals(prev => [newApproval, ...prev]);
  };

  const handleVerifyReport = (idx: number) => {
    // Set report status to TERDIVERIFIKASI
    const updatedReports = [...landReports];
    const report = updatedReports[idx];
    if (report) {
      report.status = 'TERDIVERIFIKASI';
      setLandReports(updatedReports);

      // Find the corresponding pending transaction and mark it accepted / complete
      const cleanVol = parseInt(report.volume.replace(/[^0-9]/g, '')) || 500;
      const updatedTransactions = transactions.map(t => {
        if (t.produk.includes(report.produk) && t.role === 'PETANI' && t.status === 'Tinjauan') {
          return {
            ...t,
            status: 'Diterima' as const,
            totalHarga: cleanVol * 6800, // Calculated standard price
            detail: `${report.lahan} • Terverifikasi KDMP`
          };
        }
        return t;
      });
      setTransactions(updatedTransactions);
    }
  };

  const handleAddTransaction = (newTrx: Transaction) => {
    setTransactions(prev => [newTrx, ...prev]);
  };

  return (
    <div className="min-h-screen pb-20 relative">
      {/* View Router */}
      {view === 'landing' && (
        <LandingPageView onNavigate={setView} />
      )}
      
      {view === 'login' && (
        <LoginPageView onNavigate={setView} onLoginSuccess={handleLoginSuccess} />
      )}
      
      {view === 'petani' && (
        <FarmerDashboardView 
          lands={lands}
          landReports={landReports}
          transactions={transactions}
          onAddLandReport={handleAddLandReport}
          onLogout={handleLogout}
          onNavigate={setView}
        />
      )}
      
      {view === 'manager' && (
        <ManagerDashboardView 
          farmers={farmers}
          landReports={landReports}
          approvals={approvals}
          transactions={transactions}
          onAddFarmer={handleAddFarmer}
          onAddApproval={handleAddApproval}
          onVerifyReport={handleVerifyReport}
          onLogout={handleLogout}
          onNavigate={setView}
        />
      )}
      
      {view === 'pembeli' && (
        <BuyerDashboardView 
          catalog={catalog}
          transactions={transactions}
          onAddTransaction={handleAddTransaction}
          onLogout={handleLogout}
          onNavigate={setView}
        />
      )}
      
      {view === 'riwayat' && (
        <GlobalHistoryView 
          transactions={transactions}
          onNavigate={setView}
          currentRole={currentRole}
        />
      )}

      {/* Floating Interactive Demo Navigator (For ease of grading/testing) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-3 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-3 z-50 border border-slate-700 backdrop-blur-md max-w-[95vw] sm:max-w-fit animate-fade-in">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary-fixed">
          <Database className="w-4 h-4 text-secondary shrink-0" />
          <span className="hidden sm:inline">Navigasi Simulasi (6 Layar):</span>
          <span className="sm:hidden">Layar:</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-1.5 text-[11px] font-bold">
          <button 
            id="nav-sim-landing"
            onClick={() => setView('landing')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors ${view === 'landing' ? 'bg-secondary text-on-secondary' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            1. Beranda (L4)
          </button>
          
          <button 
            id="nav-sim-login"
            onClick={() => setView('login')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors ${view === 'login' ? 'bg-secondary text-on-secondary' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            2. Portal (L5)
          </button>

          <button 
            id="nav-sim-petani"
            onClick={() => { setCurrentRole('petani'); setView('petani'); }}
            className={`px-2.5 py-1.5 rounded-lg transition-colors ${view === 'petani' ? 'bg-secondary text-on-secondary' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            3. Petani (L1)
          </button>

          <button 
            id="nav-sim-kdmp"
            onClick={() => { setCurrentRole('manager'); setView('manager'); }}
            className={`px-2.5 py-1.5 rounded-lg transition-colors ${view === 'manager' ? 'bg-secondary text-on-secondary' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            4. KDMP (L2)
          </button>

          <button 
            id="nav-sim-sppg"
            onClick={() => { setCurrentRole('pembeli'); setView('pembeli'); }}
            className={`px-2.5 py-1.5 rounded-lg transition-colors ${view === 'pembeli' ? 'bg-secondary text-on-secondary' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            5. SPPG (L3)
          </button>

          <button 
            id="nav-sim-ledger"
            onClick={() => setView('riwayat')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors ${view === 'riwayat' ? 'bg-secondary text-on-secondary' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            6. Ledger (L6)
          </button>
        </div>
      </div>
    </div>
  );
}

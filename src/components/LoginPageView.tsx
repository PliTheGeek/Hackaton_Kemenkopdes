/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sprout, 
  User, 
  Building, 
  ShoppingCart, 
  Lock, 
  Mail, 
  ArrowLeft,
  Info
} from 'lucide-react';
import { ViewType } from '../types';

interface LoginPageViewProps {
  onNavigate: (view: ViewType) => void;
  onLoginSuccess: (role: 'petani' | 'manager' | 'pembeli') => void;
}

export default function LoginPageView({ onNavigate, onLoginSuccess }: LoginPageViewProps) {
  const [selectedRole, setSelectedRole] = useState<'petani' | 'manager' | 'pembeli'>('petani');
  const [email, setEmail] = useState('petani@kemenkopdes.id');
  const [password, setPassword] = useState('petani123');
  const [error, setError] = useState('');

  const handleRoleChange = (role: 'petani' | 'manager' | 'pembeli') => {
    setSelectedRole(role);
    setError('');
    if (role === 'petani') {
      setEmail('petani@kemenkopdes.id');
      setPassword('petani123');
    } else if (role === 'manager') {
      setEmail('kdmp@kemenkopdes.id');
      setPassword('kdmp123');
    } else {
      setEmail('sppg@kemenkopdes.id');
      setPassword('sppg123');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email dan Password wajib diisi.');
      return;
    }
    
    // Simulate authentication
    if (
      (selectedRole === 'petani' && email === 'petani@kemenkopdes.id' && password === 'petani123') ||
      (selectedRole === 'manager' && email === 'kdmp@kemenkopdes.id' && password === 'kdmp123') ||
      (selectedRole === 'pembeli' && email === 'sppg@kemenkopdes.id' && password === 'sppg123')
    ) {
      setError('');
      onLoginSuccess(selectedRole);
    } else {
      setError('Kredensial tidak cocok. Silakan gunakan akun uji yang tertera.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="flex justify-center items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
          <Sprout className="text-secondary w-8 h-8" />
          <span className="font-sans text-3xl font-bold text-primary">Kemenkopdes</span>
        </div>
        <h2 className="text-2xl font-bold text-primary">Portal Masuk Terintegrasi</h2>
        <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
          Pilih peran Anda di bawah untuk mengelola input, Koperasi KDMP, atau distribusi SPPG.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-outline-variant space-y-6">
          
          {/* Role Selection Tabs */}
          <div>
            <label className="block text-xs font-mono font-bold text-primary uppercase tracking-wider mb-3">Pilih Peran Anda</label>
            <div className="grid grid-cols-3 gap-3">
              {/* Petani */}
              <button
                type="button"
                onClick={() => handleRoleChange('petani')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                  selectedRole === 'petani' 
                    ? 'border-secondary bg-secondary-container/20 text-secondary ring-1 ring-secondary' 
                    : 'border-outline-variant bg-surface hover:bg-surface-container'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-sans text-xs font-bold leading-tight">PETANI</span>
              </button>

              {/* KDMP Manager */}
              <button
                type="button"
                onClick={() => handleRoleChange('manager')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                  selectedRole === 'manager' 
                    ? 'border-primary bg-primary-container/10 text-primary ring-1 ring-primary' 
                    : 'border-outline-variant bg-surface hover:bg-surface-container'
                }`}
              >
                <Building className="w-5 h-5" />
                <span className="font-sans text-xs font-bold leading-tight">KDMP</span>
              </button>

              {/* SPPG Buyer */}
              <button
                type="button"
                onClick={() => handleRoleChange('pembeli')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                  selectedRole === 'pembeli' 
                    ? 'border-tertiary bg-tertiary-container/10 text-tertiary ring-1 ring-tertiary' 
                    : 'border-outline-variant bg-surface hover:bg-surface-container'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-sans text-xs font-bold leading-tight">PEMBELI</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            {error && (
              <div className="p-3 bg-error-container text-error rounded-xl text-xs font-medium flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-primary uppercase tracking-wide mb-1.5">Alamat Email / ID Peran</label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="name@kemenkopdes.id"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-primary uppercase tracking-wide mb-1.5">Kata Sandi</label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-surface border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              id="btn-login-submit"
              type="submit"
              className="w-full h-11 bg-primary text-on-primary rounded-xl font-body-md font-bold hover:opacity-95 transition-opacity flex items-center justify-center cursor-pointer mt-2"
            >
              Masuk ke Platform
            </button>
          </form>

          {/* Guide / Quick Login Helper */}
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <Info className="w-4 h-4 text-secondary shrink-0" />
              <span>Akun Simulasi Uji</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Silakan gunakan akun di bawah yang sesuai dengan peran aktif untuk demonstrasi langsung:
            </p>
            <div className="grid grid-cols-1 gap-1.5 font-mono text-[11px] text-primary">
              {selectedRole === 'petani' && (
                <div className="p-2 bg-white rounded border border-outline-variant/50">
                  <span className="font-semibold text-secondary">Petani:</span> petani@kemenkopdes.id / petani123
                </div>
              )}
              {selectedRole === 'manager' && (
                <div className="p-2 bg-white rounded border border-outline-variant/50">
                  <span className="font-semibold text-primary">Manager KDMP:</span> kdmp@kemenkopdes.id / kdmp123
                </div>
              )}
              {selectedRole === 'pembeli' && (
                <div className="p-2 bg-white rounded border border-outline-variant/50">
                  <span className="font-semibold text-tertiary">Pembeli SPPG:</span> sppg@kemenkopdes.id / sppg123
                </div>
              )}
            </div>
          </div>

          {/* Kembali */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

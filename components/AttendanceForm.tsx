'use client';

import { useState, useEffect } from 'react';
import { saveToGoogleSheets } from '@/lib/googleSheets';
import QRScanner from './QRScanner';
import { QrCode, MapPin, CheckCircle } from 'lucide-react';

export default function AttendanceForm() {
  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    jenisKelamin: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    status: 'Hadir' as 'Hadir' | 'Izin' | 'Sakit' | 'Alpha',
  });

  const [location, setLocation] = useState<{ latitude: string; longitude: string } | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [qrData, setQrData] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.');
        }
      );
    }
  };

  const handleQRScan = (decodedText: string) => {
    setQrData(decodedText);
    setShowScanner(false);

    // Parse QR code data if it contains student info
    try {
      const data = JSON.parse(decodedText);
      if (data.nama) setFormData(prev => ({ ...prev, nama: data.nama }));
      if (data.kelas) setFormData(prev => ({ ...prev, kelas: data.kelas }));
    } catch (e) {
      // QR code might just be a simple ID
      console.log('QR Data:', decodedText);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location) {
      setError('Lokasi belum tersedia. Mohon tunggu...');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const now = new Date();
      const attendanceData = {
        ...formData,
        tanggal: now.toISOString().split('T')[0],
        waktu: now.toTimeString().split(' ')[0].substring(0, 5),
        latitude: location.latitude,
        longitude: location.longitude,
      };

      await saveToGoogleSheets(attendanceData);

      setSuccess(true);
      setFormData({
        nama: '',
        kelas: '',
        jenisKelamin: 'Laki-laki',
        status: 'Hadir',
      });
      setQrData('');

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Gagal menyimpan data absensi. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Form Absensi Siswa
        </h2>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
            <CheckCircle className="mr-2" />
            Absensi berhasil disimpan!
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowScanner(!showScanner)}
            className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
          >
            <QrCode className="mr-2" />
            {showScanner ? 'Tutup Scanner' : 'Scan QR Code'}
          </button>
        </div>

        {showScanner && (
          <div className="mb-6">
            <QRScanner onScanSuccess={handleQRScan} />
          </div>
        )}

        {qrData && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">QR Code Terdeteksi: {qrData}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kelas
            </label>
            <select
              required
              value={formData.kelas}
              onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Pilih Kelas</option>
              <option value="X-A">X-A</option>
              <option value="X-B">X-B</option>
              <option value="X-C">X-C</option>
              <option value="XI-A">XI-A</option>
              <option value="XI-B">XI-B</option>
              <option value="XI-C">XI-C</option>
              <option value="XII-A">XII-A</option>
              <option value="XII-B">XII-B</option>
              <option value="XII-C">XII-C</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Kelamin
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Laki-laki"
                  checked={formData.jenisKelamin === 'Laki-laki'}
                  onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as any })}
                  className="mr-2"
                />
                Laki-laki
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Perempuan"
                  checked={formData.jenisKelamin === 'Perempuan'}
                  onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as any })}
                  className="mr-2"
                />
                Perempuan
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Kehadiran
            </label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Hadir">Hadir</option>
              <option value="Izin">Izin</option>
              <option value="Sakit">Sakit</option>
              <option value="Alpha">Alpha</option>
            </select>
          </div>

          {location && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center text-sm text-green-800">
                <MapPin className="mr-2 h-4 w-4" />
                <span>Lokasi terdeteksi: {location.latitude}, {location.longitude}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !location}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Menyimpan...' : 'Submit Absensi'}
          </button>
        </form>
      </div>
    </div>
  );
}

export interface AttendanceRecord {
  id: string;
  nama: string;
  kelas: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha';
  tanggal: string;
  waktu: string;
  latitude: string;
  longitude: string;
}

export async function saveToGoogleSheets(data: Omit<AttendanceRecord, 'id'>) {
  try {
    const response = await fetch('/api/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to save attendance');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
}

export async function getAttendanceRecords(filters?: {
  kelas?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const params = new URLSearchParams();
    if (filters?.kelas) params.append('kelas', filters.kelas);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await fetch(`/api/attendance?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch attendance records');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    throw error;
  }
}

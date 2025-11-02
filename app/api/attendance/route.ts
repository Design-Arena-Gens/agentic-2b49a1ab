import { NextRequest, NextResponse } from 'next/server';

// Simulated database - in production this would connect to Google Sheets API
let attendanceData: any[] = [
  {
    id: '1',
    nama: 'Ahmad Fauzi',
    kelas: 'X-A',
    jenisKelamin: 'Laki-laki',
    status: 'Hadir',
    tanggal: '2025-11-02',
    waktu: '07:30',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '2',
    nama: 'Siti Nurhaliza',
    kelas: 'X-A',
    jenisKelamin: 'Perempuan',
    status: 'Hadir',
    tanggal: '2025-11-02',
    waktu: '07:25',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '3',
    nama: 'Budi Santoso',
    kelas: 'X-B',
    jenisKelamin: 'Laki-laki',
    status: 'Izin',
    tanggal: '2025-11-02',
    waktu: '07:00',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '4',
    nama: 'Dewi Lestari',
    kelas: 'X-A',
    jenisKelamin: 'Perempuan',
    status: 'Sakit',
    tanggal: '2025-11-02',
    waktu: '06:50',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '5',
    nama: 'Eko Prasetyo',
    kelas: 'X-B',
    jenisKelamin: 'Laki-laki',
    status: 'Alpha',
    tanggal: '2025-11-02',
    waktu: '',
    latitude: '',
    longitude: ''
  },
  {
    id: '6',
    nama: 'Fitri Handayani',
    kelas: 'X-C',
    jenisKelamin: 'Perempuan',
    status: 'Hadir',
    tanggal: '2025-11-02',
    waktu: '07:20',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '7',
    nama: 'Gilang Ramadhan',
    kelas: 'X-C',
    jenisKelamin: 'Laki-laki',
    status: 'Hadir',
    tanggal: '2025-11-02',
    waktu: '07:15',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '8',
    nama: 'Hana Pertiwi',
    kelas: 'XI-A',
    jenisKelamin: 'Perempuan',
    status: 'Hadir',
    tanggal: '2025-11-02',
    waktu: '07:10',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '9',
    nama: 'Indra Gunawan',
    kelas: 'XI-A',
    jenisKelamin: 'Laki-laki',
    status: 'Izin',
    tanggal: '2025-11-02',
    waktu: '06:45',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '10',
    nama: 'Juwita Sari',
    kelas: 'XI-B',
    jenisKelamin: 'Perempuan',
    status: 'Hadir',
    tanggal: '2025-11-02',
    waktu: '07:35',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '11',
    nama: 'Kemal Pasha',
    kelas: 'XI-B',
    jenisKelamin: 'Laki-laki',
    status: 'Hadir',
    tanggal: '2025-11-02',
    waktu: '07:28',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '12',
    nama: 'Laila Maharani',
    kelas: 'XI-C',
    jenisKelamin: 'Perempuan',
    status: 'Sakit',
    tanggal: '2025-11-02',
    waktu: '06:55',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '13',
    nama: 'Muhammad Rizki',
    kelas: 'XI-C',
    jenisKelamin: 'Laki-laki',
    status: 'Hadir',
    tanggal: '2025-11-02',
    waktu: '07:22',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '14',
    nama: 'Nurul Aini',
    kelas: 'XII-A',
    jenisKelamin: 'Perempuan',
    status: 'Hadir',
    tanggal: '2025-11-02',
    waktu: '07:18',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '15',
    nama: 'Omar Hakim',
    kelas: 'XII-A',
    jenisKelamin: 'Laki-laki',
    status: 'Alpha',
    tanggal: '2025-11-02',
    waktu: '',
    latitude: '',
    longitude: ''
  },
  {
    id: '16',
    nama: 'Putri Ayu',
    kelas: 'XII-B',
    jenisKelamin: 'Perempuan',
    status: 'Hadir',
    tanggal: '2025-11-02',
    waktu: '07:32',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '17',
    nama: 'Qori Hidayat',
    kelas: 'XII-B',
    jenisKelamin: 'Laki-laki',
    status: 'Izin',
    tanggal: '2025-11-02',
    waktu: '07:05',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '18',
    nama: 'Rina Susanti',
    kelas: 'XII-C',
    jenisKelamin: 'Perempuan',
    status: 'Hadir',
    tanggal: '2025-11-02',
    waktu: '07:27',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '19',
    nama: 'Syahrul Gunawan',
    kelas: 'XII-C',
    jenisKelamin: 'Laki-laki',
    status: 'Hadir',
    tanggal: '2025-11-02',
    waktu: '07:12',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '20',
    nama: 'Tika Kartika',
    kelas: 'X-A',
    jenisKelamin: 'Perempuan',
    status: 'Hadir',
    tanggal: '2025-11-02',
    waktu: '07:33',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '21',
    nama: 'Umar Bakri',
    kelas: 'X-B',
    jenisKelamin: 'Laki-laki',
    status: 'Sakit',
    tanggal: '2025-11-01',
    waktu: '07:00',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '22',
    nama: 'Vina Melinda',
    kelas: 'X-C',
    jenisKelamin: 'Perempuan',
    status: 'Hadir',
    tanggal: '2025-11-01',
    waktu: '07:15',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '23',
    nama: 'Wahyu Hidayat',
    kelas: 'XI-A',
    jenisKelamin: 'Laki-laki',
    status: 'Hadir',
    tanggal: '2025-11-01',
    waktu: '07:25',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '24',
    nama: 'Xena Putri',
    kelas: 'XI-B',
    jenisKelamin: 'Perempuan',
    status: 'Izin',
    tanggal: '2025-11-01',
    waktu: '06:50',
    latitude: '-6.2088',
    longitude: '106.8456'
  },
  {
    id: '25',
    nama: 'Yudi Setiawan',
    kelas: 'XI-C',
    jenisKelamin: 'Laki-laki',
    status: 'Hadir',
    tanggal: '2025-11-01',
    waktu: '07:30',
    latitude: '-6.2088',
    longitude: '106.8456'
  }
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const kelas = searchParams.get('kelas');
  const status = searchParams.get('status');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  let filtered = [...attendanceData];

  // Apply filters
  if (kelas) {
    filtered = filtered.filter(record => record.kelas === kelas);
  }

  if (status) {
    filtered = filtered.filter(record => record.status === status);
  }

  if (startDate && endDate) {
    filtered = filtered.filter(record => {
      const recordDate = new Date(record.tanggal);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return recordDate >= start && recordDate <= end;
    });
  }

  // Calculate pagination
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filtered.slice(startIndex, endIndex);

  // Calculate statistics
  const stats = {
    totalSiswa: attendanceData.length,
    putra: attendanceData.filter(r => r.jenisKelamin === 'Laki-laki').length,
    putri: attendanceData.filter(r => r.jenisKelamin === 'Perempuan').length,
    hadir: filtered.filter(r => r.status === 'Hadir').length,
    izin: filtered.filter(r => r.status === 'Izin').length,
    sakit: filtered.filter(r => r.status === 'Sakit').length,
    alpha: filtered.filter(r => r.status === 'Alpha').length,
  };

  return NextResponse.json({
    data: paginatedData,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
    stats,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newRecord = {
      id: (attendanceData.length + 1).toString(),
      ...body,
    };

    attendanceData.push(newRecord);

    return NextResponse.json({
      success: true,
      data: newRecord,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save attendance' },
      { status: 500 }
    );
  }
}

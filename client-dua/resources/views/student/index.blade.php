<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Client 2 — Mirror Siswa Perempuan</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Segoe UI', sans-serif;
            background: #fdf2f8;
            color: #2d3748;
        }

        .app {
            max-width: 1100px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: linear-gradient(135deg, #831843, #db2777);
            color: white;
            border-radius: 16px;
            padding: 24px 32px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
            box-shadow: 0 4px 20px rgba(219, 39, 119, 0.3);
        }

        .header h1 {
            font-size: 1.7rem;
        }

        .header p {
            font-size: 0.85rem;
            opacity: 0.8;
            margin-top: 4px;
        }

        .badge-server {
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            padding: 6px 14px;
            font-size: 0.8rem;
        }

        .info-bar {
            background: #fdf2f8;
            border: 1px solid #fbcfe8;
            border-radius: 12px;
            padding: 14px 20px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
        }

        .info-bar span {
            font-size: 0.88rem;
            color: #9d174d;
        }

        .alert-success {
            background: #d1fae5;
            color: #065f46;
            border-left: 4px solid #10b981;
            padding: 12px 20px;
            border-radius: 8px;
            margin-bottom: 16px;
        }

        .refresh-btn {
            background: #db2777;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 8px 18px;
            cursor: pointer;
            font-size: 0.88rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            transition: background 0.2s;
        }

        .refresh-btn:hover {
            background: #be185d;
        }

        .stat-box {
            background: white;
            border-radius: 12px;
            padding: 20px 28px;
            margin-bottom: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .stat-icon {
            font-size: 2.5rem;
        }

        .stat-num {
            font-size: 2.2rem;
            font-weight: 700;
            color: #db2777;
        }

        .stat-label {
            font-size: 0.85rem;
            color: #6b7280;
        }

        .card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        }

        .card h2 {
            font-size: 1.05rem;
            margin-bottom: 16px;
            color: #831843;
        }

        .table-wrapper {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            background: #fdf2f8;
            padding: 11px 15px;
            text-align: left;
            font-size: 0.8rem;
            font-weight: 700;
            color: #9d174d;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #fbcfe8;
        }

        td {
            padding: 11px 15px;
            border-bottom: 1px solid #fdf2f8;
            font-size: 0.9rem;
            vertical-align: middle;
        }

        tr:hover td {
            background: #fff1f7;
        }

        .badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 0.78rem;
            font-weight: 600;
        }

        .badge-nis {
            background: #fce7f3;
            color: #9d174d;
        }

        .badge-kelas {
            background: #d1fae5;
            color: #065f46;
        }

        .badge-perempuan {
            background: #fdf2f8;
            color: #9d174d;
        }

        .empty {
            text-align: center;
            color: #9ca3af;
            padding: 40px !important;
        }

        .mirror-note {
            margin-top: 16px;
            font-size: 0.8rem;
            color: #6b7280;
            text-align: right;
        }

        .webhook-log {
            margin-top: 20px;
            background: #0f172a;
            color: #f9a8d4;
            border-radius: 10px;
            padding: 16px;
            font-family: 'Courier New', monospace;
            font-size: 0.82rem;
        }

        .webhook-log h3 {
            color: #94a3b8;
            margin-bottom: 8px;
            font-size: 0.85rem;
        }

        .webhook-log p {
            margin: 2px 0;
        }
    </style>

    <script>
        window.addEventListener("load", () => {
            window.Echo.channel("SiswaChannels").listen(".siswa.update", async payload => {
                const data = await fetch("/data").then(res => res.json());
                renderTable(data);
            })

            function renderTable(data) {
                const table = document.getElementById("student-table-body");
                table.innerHTML = "";
                if (data.length === 0) {
                    table.innerHTML = `
                        <tr>
                            <td colspan="7" class="empty">
                                Belum ada data siswa laki-laki.<br>
                                <small>Data akan muncul otomatis saat server utama menambahkan siswa laki-laki.</small>
                            </td>
                        </tr>
                    `;
                    return;
                }
                data.forEach((s, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td><span class="badge badge-nis">${s.nis || '-'}</span></td>
                        <td><strong>${s.nama || '-'}</strong></td>
                        <td><span class="badge badge-kelas">${s.kelas || '-'}</span></td>
                        <td><span class="badge badge-laki">♂ Laki-laki</span></td>
                        <td>${s.no_telp || '-'}</td>
                    `;
                    table.appendChild(row);
                });
            }
        })
    </script>
</head>

<body>
    <div class="app">

        <!-- HEADER -->
        <div class="header">
            <div>
                <h1>♀ Client 2 — Mirror Siswa Perempuan</h1>
                <p>Data di-mirror dari Server Utama via Webhook • Port 8002</p>
            </div>
            <span class="badge-server">📡 Webhook Receiver</span>
        </div>

        @if (session('success'))
            <div class="alert-success">✅ {{ session('success') }}</div>
        @endif

        <!-- INFO BAR -->
        <div class="info-bar">
            <span>🕐 Terakhir diupdate: <strong>{{ $last_updated }}</strong></span>
            <span>⚡ Halaman auto-refresh setiap 15 detik</span>
            <a href="{{ route('students.refresh') }}" class="refresh-btn">🔄 Refresh dari Server Utama</a>
        </div>

        <!-- STAT -->
        <div class="stat-box">
            <div class="stat-icon">♀</div>
            <div>
                <div class="stat-num">{{ $total }}</div>
                <div class="stat-label">Total Siswa Perempuan (Mirror)</div>
            </div>
        </div>

        <!-- TABLE -->
        <div class="card">
            <h2>📋 Daftar Siswa Perempuan</h2>
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NIS</th>
                            <th>Nama</th>
                            <th>Umur</th>
                            <th>Kelas</th>
                            <th>Jenis Kelamin</th>
                            <th>No. Telepon</th>
                        </tr>
                    </thead>
                    <tbody id="student-table-body">
                        @forelse($siswa as $index => $s)
                            <tr>
                                <td>{{ $index + 1 }}</td>
                                <td><span class="badge badge-nis">{{ $s['nis'] ?? '-' }}</span></td>
                                <td><strong>{{ $s['nama'] ?? '-' }}</strong></td>
                                <td><span class="badge badge-umur">{{ $s['umur'] ?? '-' }}</span></td>
                                <td><span class="badge badge-kelas">{{ $s['kelas'] ?? '-' }}</span></td>
                                <td><span class="badge badge-perempuan">♀ Perempuan</span></td>
                                <td>{{ $s['no_telp'] ?? '-' }}</td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="7" class="empty">
                                    Belum ada data siswa perempuan.<br>
                                    <small>Data akan muncul otomatis saat server utama menambahkan siswa
                                        perempuan.</small>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>

</html>

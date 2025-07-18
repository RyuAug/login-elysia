import { Elysia } from 'elysia';
import { User, userManager } from './fileObject';
import path from 'path';

const FILE_USERDATA = path.join(__dirname, 'userdata.txt');
const manager = new userManager(FILE_USERDATA);

const daftarUKT = [
  "UKT G.1 = 2 REBU JING",
  "UKT G.2 = Rp 4.000.000",     
  "UKT G.3 = 10 JUTAK JING",
];

const app = new Elysia();

app.get('/', () => 'Selamat datang di Laman Utama!');

// --- REGISTER ---
app.post('/register', ({ body }) => {
  const data = body as { username: string; password: string };

  if (!data.username || !data.password) {
    return { error: "Username dan password wajib diisi" };
  }

  if (data.password.length < 6) {
    return { error: "Password minimal 6 karakter" };
  }

  if (manager.isUsernameTaken(data.username)) {
    return { error: "Username sudah terdaftar" };
  }

  const userBaru = new User(data.username, data.password);
  manager.saveUser(userBaru);

  return { message: `Registrasi berhasil untuk ${data.username}` };
});

// --- LOGIN ---
app.post('/login', ({ body }) => {
  const data = body as { username: string; password: string };

  if (!data.username || !data.password) {
    return { error: "Username dan password wajib diisi" };
  }

  const ditemukan = manager.findUser(data.username, data.password);

  if (!ditemukan) {
    return { error: "Username atau password salah" };
  }

  return { message: `Selamat datang, ${data.username}` };
});

// --- GACHA ---
app.get('/:user/gacha', ({ params }) => {
  const { user } = params;

  if (!manager.isUserExist(user)) {
    return { error: "User belum login atau tidak ditemukan" };
  }

  const hasil = Math.floor(Math.random() * 100) + 1;

  let hasilUKT = "";
  if (hasil < 15) hasilUKT = daftarUKT[0];
  else if (hasil < 70) hasilUKT = daftarUKT[1];
  else hasilUKT = daftarUKT[2];

  return {
    message: `Gacha berhasil untuk ${user}`,
    hasil
  };
});

app.listen(3002);
console.log("Server Elysia aktif di http://localhost:3002");
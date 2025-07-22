import { Elysia } from 'elysia';
import path from 'path';
import { User, userManager } from './fileObject';
import { Faktor } from './ukt';

const fileData = path.join(__dirname, 'userdata.txt');
const manager = new userManager(fileData);
const app = new Elysia();

function error(a: string){
    return {error: a}
};

app.get('/', () => 'Selamat datang di page utama!');

// -- Register --
app.post('/register', ({ body }) => {
    const data = body as {username: string, password: string};

    if (!data.username || !data.password){
        return error('Username dan password wajib di isi');
    };

    if (data.password.length < 6){
        return error('Format password tidak valid');
    };

    if (manager.isUsernameTaken (data.username)){
        return error('Username sudah digunakan');
    };

    const userBaru = new User(data.username, data.password);
    manager.saveUser(userBaru);
});

// --LOGIN--

app.post('/login',({ body }) => {
    const data = body as {username: string, password:string};

    const sudahAda = manager.findUser(data.username, data.password);

    if (!data.username || !data.password){
        return error('Username dan password wajib di isi');
    };

    if(!sudahAda){
        return error('Username atau password belum terdaftar!');
    };

    return { message : `Login berhasil!\nSelamat datang ${data.username}!`}
});


app.post('/:user/ukt', ({ params, body }) => {
    const { user } = params;

     if (!manager.isUserExist(user)) {
        return { error: "User belum login atau tidak ditemukan" };
    ;}

    const data = body as {
        gaji: number, 
        rumah: number, 
        tanggungan: number, 
        daya: number, 
        tagihan: number
    };  

    const faktor = new Faktor (
        data.gaji,
        data.rumah,
        data.tanggungan,
        data.daya,
        data.tagihan
    );

    return {
        skorAkhir: faktor.hitungSkor(),
        ukt: faktor.golonganUKT(),
        message: `UKT yang anda dapatkan: ${faktor.golonganUKT}!`
    };
});

const s: number = 3003
app.listen(s);
console.log(`Server Elysia aktif di http://localhost:${s}`);
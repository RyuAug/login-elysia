import { Elysia } from 'elysia';
import path from 'path';
import { User, userManager } from './fileObject';

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
        error('Username dan password wajib di isi');
    };

    if (data.password.length < 6){
        error('Format password tidak valid');
    };

    if (manager.isUsernameTaken (data.username)){
        error('Username sudah digunakan');
    };

    const userBaru = new User(data.username, data.password);
    manager.saveUser(userBaru);
})

// --LOGIN--

app.post('/login',({ body }) => {
    const data = body as {username: string, password:string};

    const sudahAda = manager.findUser(data.username, data.password);

    if (!data.username || !data.password){
        error('Username dan password wajib di isi');
    };

    if(!sudahAda){
        error('Username atau password belum terdaftar!');
    };

    return { message : `Login berhasil!\nSelamat datang ${data.username}!`}
});

const s: number = 3003
app.listen(s);
console.log(`Server Elysia aktif di http://localhost:${s}`);
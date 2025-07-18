import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class User {
    public username: string;
    #password: string;

    constructor(username: string, password: string){
        this.username = username;
        this.#password = password;
    }
    
    simpenData(): void {
        fs.appendFileSync('userdata.txt',`${this.username}:${this.#password}\n`);
    }

    cekPassword(input: string): boolean {
    return this.#password === input;
    }

}

class userManager {
    private filePath: string;

    constructor (filePath: string) {
        this.filePath = filePath;
    }

    readUsers(): User[] {
        if (!fs.existsSync(this.filePath)) return [];

        const lines = fs.readFileSync(this.filePath, 'utf-8')
            .trim()
            .split('\n')
            .filter(line => line.length > 0);

        return lines.map(line => {
            const [username, password] = line.split(':');
            return new User(username, password);
        });
    }

    findUser(username: string, password: string): User | null {
    const users = this.readUsers();
    return users.find(user =>
        user.username === username &&
        user.cekPassword(password)
    ) || null;
    }
}

const FILE_USERDATA = path.join(__dirname, '../src/userdata.txt')

const manager = new userManager(FILE_USERDATA);

const daftarUKT = [
  "UKT G.1 = 2 REBU JING",
  "UKT G.2 = Rp 4.000.000",     
  "UKT G.3 = 10 JUTAK JING",
];


tanya();

function tanya(){
    rl.question('Registrasi atau Login (r/l)? ', (keputusan) => {
        const pilihan = keputusan.toLowerCase().trim();

        if (pilihan === 'r' || pilihan === 'register') {
            prosesRegister();
        } else if(pilihan === 'l' || pilihan === 'login') {
            prosesLogin();
        } else {
            console.log('Pilihan tidak valid')
            tanya();
        }   
    });
};


function prosesRegister(){
    rl.question('Masukkan Username: ', (inputUsername: string) => {
         rl.question('Masukkan Password (min 6 karakter): ', (inputPassword) => {
            if (inputPassword.length < 6) {
                console.log('Password terlalu pendek!');
                return prosesRegister();
            }

        const semuaUser = manager.readUsers();

        const sudahAda = semuaUser.some(user => user.username === inputUsername);   

            if(sudahAda){
                console.log('Username atau Password sudah terdaftar. Mohon buat yang lain.');
                return prosesRegister();
            }

            const userBaru = new User(inputUsername, inputPassword);
            userBaru.simpenData();

            console.log(`Registrasi berhasil! Username: ${inputUsername} dan Password: ${inputPassword}`);
            tanyalogin();
        });
    });
}


function prosesLogin(){
    rl.question('Masukkan username: ', (username2 : string)  => {
        rl.question('Masukkan password: ', (password2: string) => {
            const ditemukan = manager.findUser(username2,password2);

            if (ditemukan) {
                console.log('Login berhasil!');
                gacha();
            } else {
                console.log('Username atau Password tidak valid!');
                return prosesLogin();
            }
        });
    });
}


function gacha(){
    let hasilUKT: string = ''
    const hasil = Math.floor(Math.random() * 100) + 1;
    
    console.log('\nAnda melakukan gacha UKT!\n');

    if(hasil<15){
        hasilUKT = (daftarUKT[0]);
    } else if (hasil >= 15 && hasil < 70){
        hasilUKT = (daftarUKT[1]);
    } else {
        hasilUKT = (daftarUKT[2]);
    }
    
    function delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function main() {
        console.log("Loading...");     
        await delay(2000);             
        console.clear();               
        console.log('\n' + hasilUKT + '\n'); 
        programSelesai();    
    }    
    main();
}


function tanyalogin(){
    rl.question('Apakah mau lanjut login (y/n)? ', (pilihan: string) => {
        if(pilihan.toLowerCase().trim() === 'y') {
            prosesLogin();
        } else if (pilihan.toLowerCase().trim() === 'n') {
            programSelesai();
        } else {
            console.log("Pilihan tidak valid!")
            tanyalogin();
        }
    });
}


function programSelesai(){
    console.log('Program selesai. Terimakasih!')
    rl.close();
}


function keluar() {
  console.log('Keluar dari program. Terima kasih!');
  rl.close();
}       
import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger';

const app = new Elysia()
    .use(swagger());

const users: {username: string, password: string}[] = [];   

app.get('/', () => 'Halo dari Elysia');

app.post('/register', ({body}) => {
    const data = body as {username: string, password: string};
    
    if(!data.username || !data.password){
        return {error: 'Username dan Password tidak valid!'}
    } 
    
    const sudahAda = users.find(u => u.username === data.username);
    if(sudahAda) {
        return {error: 'Username sudah terdaftar!'}
    }
    
    users.push({ username: data.username, password: data.password });
    return{
        message: `User ${data.username} berhasil diregistrasi!`
    }
}); 

app.listen(3001);

console.log('Server jalan di http://localhost:3001');
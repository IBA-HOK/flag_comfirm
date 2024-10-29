const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

// 静的ファイルの提供
app.use(express.static('public'));

// クライアントから画像名を受け取ったときにコンソールとページに表示
io.on('connection', (socket) => {
    console.log('クライアントが接続しました');

    socket.on('showImage', (imageName) => {
        console.log(`表示された画像: ${imageName}`);

        // サーバー上のリアルタイム更新用イベント送信
        io.emit('displayImage', imageName);
    });

    socket.on('disconnect', () => {
        console.log('クライアントが切断しました');
    });
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT} にサーバーが起動しました`);
});

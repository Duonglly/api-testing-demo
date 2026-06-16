const express = require('express');
const app = express();
app.use(express.json()); // Cho phép API đọc dữ liệu JSON

// 1. API Đăng nhập (Authentication)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        return res.status(200).json({ token: 'mock-jwt-token-admin-secret' });
    }
    return res.status(401).json({ error: 'Unauthorized: Sai tài khoản hoặc mật khẩu' });
});

// 2. API Tạo sản phẩm (Có kiểm tra Contract, Quyền hạn, và Lỗi biên)
app.post('/api/products', (req, res) => {
    // [Xác thực & Phân quyền]
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== 'Bearer mock-jwt-token-admin-secret') {
        return res.status(403).json({ error: 'Forbidden: Bạn không có quyền truy cập' });
    }

    const { name, quantity } = req.body;

    // [Kiểm thử Hợp đồng - Contract: Sai kiểu dữ liệu]
    if (typeof name !== 'string' || typeof quantity !== 'number') {
        return res.status(400).json({ error: 'Bad Request: Sai cấu trúc dữ liệu (Contract Broken)' });
    }

    // [Kiểm thử Lỗi biên - Boundary: Số lượng phải từ 1 đến 100]
    if (quantity < 1 || quantity > 100) {
        return res.status(422).json({ error: 'Unprocessable Entity: Số lượng vượt quá giới hạn biên (1-100)' });
    }

    // Nếu mọi thứ hợp lệ
    return res.status(201).json({
        message: 'Product created successfully',
        data: { name, quantity }
    });
});

// Chạy server ở cổng 3000
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server đang chạy ổn định tại cổng ${PORT}`);
});
const express = require('express');
const app = express();

app.use(express.json());

// =========================================================
// KHU VỰC CẦN THIẾT: API kiểm tra trạng thái (Mồi cho CI thông mạng)
// =========================================================
app.get('/', (req, res) => {
    res.status(200).json({ status: "Server is fully active and running!" });
});

// =========================================================
// CÁC ĐỊNH NGHĨA API KHÁC CỦA BẠN (Ví dụ Đăng nhập, Sản phẩm...)
// Bạn hãy giữ nguyên hoặc dán các hàm router cũ của bạn vào đoạn này:
// =========================================================

// Ví dụ mock API đăng nhập /api/products nếu bạn chưa có:
app.post('/api/products', (req, res) => {
    const { name, quantity } = req.body;
    if (!name || !quantity) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    res.status(201).json({ message: "Product created successfully", data: { name, quantity } });
});

// =========================================================
// KHỞI ĐỘNG SERVER (Ép chạy cổng mạng thông minh)
// =========================================================
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server đang chạy ổn định tại cổng ${PORT}`);
});
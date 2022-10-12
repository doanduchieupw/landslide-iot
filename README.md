# Lanslide Monitoring

### Database
Các collection trong đề tài: Để hiển thị dữ liệu trực quan tôi sử dụng phần mềm Robo3T.
- Dữ liệu của cảm biến: accels, gyros, rain, temps.
- Thông tin người dùng: users.
- Liên hệ với quản trị viên (admin): messages, contact.

![image](https://user-images.githubusercontent.com/75432727/195254902-845c1c33-f5ce-446c-be80-60e4f681aa6a.png)

Dữ liệu cảm biến Accel lưu với 3 thông số: accX, accY, accZ tương ứng 3 trục x, y và z. Trường createdAt chỉ ra thời gian các dữ liệu cảm biến được lưu vào
database và được lưu dưới dạng UTC. Trường _id được MongoDB có cấu trúc phức tạp đánh số tự động và duy nhất.

Còn thông tin người dùng bao gồm username, email, password và isAdmin. isAdmin dùng để kiểm tra người dùng đó có quyền quản trị viên hay không.

![image](https://user-images.githubusercontent.com/75432727/195255427-e7f1a490-3f00-4967-b937-a85b6571c3a4.png)

### Back-end
MQTT Server: Shiftr.io là Broker MQTT miễn phí trên internet. Broker này sử dụng giao thức MQTT 3.1.1. Hỗ trợ các port 1883 (TCP), 8883 (TLS) và 443 (WSS/HTTPS).
Ngoài ra còn hỗ trợ giao diện dễ dàng sử dụng.\

![image](https://user-images.githubusercontent.com/75432727/195255572-7e7833f8-1202-4d8b-9433-7babc041e468.png)

Thiết lập các API trong đề tài: Bảng 4.16 và Bảng 4.17 dưới dây mô tả các chức năng của API phục vụ cho webserver.

![image](https://user-images.githubusercontent.com/75432727/195255604-8552272c-f1fe-4c78-91f3-095c082dcfe8.png)

### Front-end
Các giao diện được xây dựng trong đề tài:
a. Màn hình đăng nhập
Người dùng khi đã có tài khoản thì dễ dàng đăng nhập một cách nhanh chóng và dễ dàng.
Tiêu chí:
- Yêu cầu cần có Internet để có thể xác thực đăng nhập.
- Người sử dụng phải nhập đúng tài khoản đã được đăng ký.
- Mật khẩu có ít nhất 8 ký tự. Trong mật khẩu ít nhất một chữ cái và một số.
- Trường mật khẩu được mã hoá.
- Thông báo cho người dùng nếu không đăng nhập được.

![image](https://user-images.githubusercontent.com/75432727/195255859-4966c4c2-9dc5-4a7d-9ba4-b0d5011d1a6b.png)

b. Màn hình đăng ký
Người sử dụng lần đầu dễ dàng tạo tài khoản mới nhanh chóng và dễ dàng. 
Tiêu chí:
- Yêu cầu cần có Internet để có thể xác thực đăng ký.
- Username dùng để đăng nhập. Không được trùng với username có sẵn.
- Các trường dữ liệu nhập vào không được trống và phải hợp lệ, email phải
theo đúng định dạng, password phải đủ 8 ký tự (bao gồm 1 chữ cái và 1
số).
- Mật khẩu xác nhận phải trùng với mật khẩu trên.
- Lựa chọn giới tính của người dùng.
- Email đăng ký chưa từng được sử dụng trên website này, nếu đăng ký
trùng email sẽ bị báo lỗi.

![image](https://user-images.githubusercontent.com/75432727/195255944-b2e017aa-665d-4dfc-9ff9-98f49f97d1e7.png)

c. Màn hình xem dữ liệu do cảm biến trả về realtime
Xem thẻ dữ liệu về accel, gyro, nhiệt độ, độ ẩm và mưa do sensor trả về. Ngoài
ra có thể xem được tình trạng thời tiết của các tỉnh trong Việt Nam thông qua
API cung cấp từ https://openweathermap.org/ .
Tiêu chí: Yêu cầu người dùng phải đăng nhập vào hệ thống

![image](https://user-images.githubusercontent.com/75432727/195256015-78f0aa5a-c21d-4ccd-9859-faf1ad69ba52.png)

![image](https://user-images.githubusercontent.com/75432727/195256041-5bfaf05e-adbb-44e4-bf6a-b0446056f5a5.png)

d. Màn hình hiển thị biểu đồ của cảm biến
Dữ liệu của cảm biến được truy vấn từ database. Các dữ liệu được tìm theo ngày, tháng, năm.

![image](https://user-images.githubusercontent.com/75432727/195256090-6a5842b5-34f1-487f-b1ab-1805b6d27a59.png)

![image](https://user-images.githubusercontent.com/75432727/195256125-c51c132e-923b-497c-be9a-dd01009328ee.png)

![image](https://user-images.githubusercontent.com/75432727/195256164-4b6542f0-b4ca-46be-9ae9-79d63f088210.png)

e. Màn hình hiển thị những câu hỏi thường gặp trong sạt lở đất
Phần này giúp cho người dùng có thêm thông tin về sạt lở đất, những dấu hiệu,
cách phòng tránh và theo dõi thông tin.

![image](https://user-images.githubusercontent.com/75432727/195256224-667df236-ae73-4118-bf5d-93e52abcb98f.png)


f. Liên hệ với quản trị viên.
Các thông tin liên quan đến sạt lở đất khi người dùng không hiểu có thể được giải
đáp bởi người có chuyên môn thông qua 2 hình thức: nhắn tin trực tiếp và gửi
qua email. Nhắn tin trực tiếp sử dụng socket.io, còn email sẽ gửi đến gmail của
quản trị viên.

![image](https://user-images.githubusercontent.com/75432727/195256271-5252b5a4-2d7a-4bd9-a17e-cccdafbc7e84.png)

![image](https://user-images.githubusercontent.com/75432727/195256294-b01ffe3b-174f-4c40-85dc-baddd5522a26.png)

g. Giao diện thông tin cảnh báo
Khi có cảnh báo xảy ra MQTT sẽ publish 1 topic cảnh báo, đồng thời lưu vào
database. Người dùng có thể xem thông tin cảnh báo tại đây.

![image](https://user-images.githubusercontent.com/75432727/195256329-67216675-84e3-414b-a681-f412f916c160.png)

### Sản phẩm đạt được
- Node

![image](https://user-images.githubusercontent.com/75432727/195256422-4602b742-8967-4c60-9d4c-16b901c94ec0.png)

- Gateway

![image](https://user-images.githubusercontent.com/75432727/195256460-9b95c4b5-804d-41c2-8c6a-7feab4399ba8.png)










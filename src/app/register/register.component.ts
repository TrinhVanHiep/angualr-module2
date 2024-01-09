import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  isSubmitting = false;
  validationErrors: any = [];

  constructor(public userAuthService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    // Kiểm tra nếu đã đăng nhập (có token trong localStorage), chuyển hướng đến trang dashboard
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  registerAction() {
    // Bắt đầu quá trình đăng ký
    this.isSubmitting = true;

    // Tạo payload chứa thông tin người dùng
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    // Gọi hàm đăng ký từ service
    this.userAuthService.register(payload)
      .then(({ data }) => {
        // Đăng ký thành công, lưu token vào localStorage và chuyển hướng đến trang dashboard
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/dashboard');
      })
      .catch(error => {
        // Xử lý lỗi
        this.isSubmitting = false;

        // Kiểm tra nếu có thông tin lỗi trong phản hồi từ server
        this.validationErrors = error.response?.data?.errors || [];

        return error; // Trả về lỗi để có thể xử lý tiếp nếu cần
      });
  }
}

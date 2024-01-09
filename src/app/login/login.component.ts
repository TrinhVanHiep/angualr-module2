import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  isSubmitting = false;
  validationErrors: any[] = [];

  constructor(public userAuthService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    // Kiểm tra nếu đã đăng nhập (có token trong localStorage), chuyển hướng đến trang dashboard
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  loginAction() {
    // Bắt đầu quá trình đăng nhập
    this.isSubmitting = true;

    // Tạo payload chứa thông tin đăng nhập từ người dùng
    const payload = { email: this.email, password: this.password };

    // Gọi hàm login từ userAuthService để thực hiện quá trình đăng nhập
    this.userAuthService.login(payload)
      .then(({ data }) => {
        // Kiểm tra nếu có token trong data, lưu token vào localStorage và chuyển hướng đến trang dashboard
        if (data.token) {
          localStorage.setItem('token', data.token);
          this.router.navigateByUrl('/dashboard');
        }
      })
      .catch((error) => {
        // Xử lý lỗi
        this.isSubmitting = false;

        // Lấy thông báo lỗi từ server nếu có
        this.validationErrors = error.response?.data?.errors || [error.response?.data?.error] || [];

        // Log thông báo lỗi không mong muốn (unexpected error) vào console
        console.error('Unexpected error:', error);
      });
  }
}

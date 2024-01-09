import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';
import { User } from '../user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Khai báo biến user kiểu User (đã import từ '../user/user') 
  user!: User;

  // Constructor của component, nhận vào một instance của UserAuthService và Router
  constructor(public userAuthService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    // Lấy giá trị token từ localStorage
    const token = localStorage.getItem('token');

    // Kiểm tra xem token có tồn tại không
    if (!token) {
      // Nếu không có token, chuyển hướng đến trang '/' (đăng nhập)
      this.router.navigateByUrl('/');
    } else {
      // Nếu có token, gọi hàm getUser từ service để lấy thông tin người dùng
      this.userAuthService.getUser().then(({ data }) => {
        // Gán dữ liệu người dùng vào biến user
        this.user = data;
      });
    }
  }

  // Xử lý đăng xuất.
  logoutAction() {
    // Gọi hàm logout từ service
    this.userAuthService.logout().then(() => {
      // Xóa giá trị token khi đăng xuất và chuyển hướng đến trang '/'
      localStorage.setItem('token', '');
      this.router.navigateByUrl('/');
    }).catch(() => {
      // Xóa giá trị token nếu có lỗi và chuyển hướng đến trang '/'
      localStorage.setItem('token', '');
      this.router.navigateByUrl('/');
    });
  }
}

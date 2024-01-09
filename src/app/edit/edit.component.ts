import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditProfileComponent implements OnInit {
  userId: string = '';
  user: any;
  isSubmitting = false;
  validationErrors: any[] = [];

  constructor(
    private userAuthService: UserAuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Lấy userId từ URL
    this.userId = this.route.snapshot.params['id'];

    // Gọi phương thức getUserById từ service để lấy thông tin người dùng theo ID
    this.userAuthService.getUserById(this.userId)
      .then(({ data }) => {
        this.user = data;
        console.log(data)
      })
     
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }

  updateProfile() {
    this.isSubmitting = true;

    // Gọi phương thức updateProfile từ service để cập nhật thông tin người dùng
    this.userAuthService.updateProfile(this.userId, this.user)
      .then(() => {
        // Cập nhật thành công, có thể thực hiện các thao tác sau khi cập nhật
        this.isSubmitting = false;
      })
      .catch(error => {
        // Xử lý lỗi
        this.isSubmitting = false;
        this.validationErrors = error.response?.data?.errors || [error.response?.data?.error] || [];
        console.error('Error updating profile:', error);
      });
  }
}

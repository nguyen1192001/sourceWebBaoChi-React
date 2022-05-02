import React from 'react';


function Introduce() {



    return (
        <div id="container">
        <div className="introduce_sidebar">
          <div className="introduce_title">
            <h5>Thông Tin Nhóm</h5>
          </div>
          <div className="introduce_sv">
            <span>Mssv: 2001191213</span><br />
            <span>Tên: Trần Thị Thảo Nguyên</span><br />
            <span>Nhiệm Vụ: Front End, Back End, Data</span>
          </div>
        </div>
        <div className="introduce_contentadmin">
          <div className="introduce_title">
            <h5>Hướng Dẫn</h5>
          </div>
          <div className="introduce_sv">
            <span>Admin</span><br />
            <span>Sử dụng tài khoản Admin để truy cập vào Amin</span><br />
            <span>Tài Khoản Truy Cập Admin</span><br />
            <span>email: admin@wizard.com </span><br />
            <span>password: 12345 </span>
          </div>
          <div className="introduce_sv">
            <span>journalist</span><br />
            <span>Sử dụng tài khoản journalist để truy cập vào journalist tạo ra các bài viết cho User đọc</span><br />
            <span>Tài Khoản Truy Cập journalist</span><br />
            <span>email: phamthanh@wizard.com </span><br />
            <span>password: 12345 </span>
          </div>
          <div className="introduce_sv">
            <span>User</span><br />
            <span>Sử dụng tài khoản User hoặc đăng ký tài khoản User để truy cập vào User tại đây User có thể đọc, bình luận, nêu cảm nhận về các bài báo</span><br />
            <span>Tài Khoản Truy Cập User</span><br />
            <span>email: tranthaonguyen119@gmail.com </span><br />
            <span>password: 123 </span>
          </div>
        </div>
      </div>
    );
}

export default Introduce
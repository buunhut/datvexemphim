import { toHaveAccessibleDescription } from "@testing-library/jest-dom/matchers";
import React, { Component } from "react";
import { connect } from "react-redux";

class DatVeXemPhim extends Component {
  state = {
    khachHang: {
      ten: "",
      soDT: "",
      gio: "",
      ngay: "",
    },
  };

  getInput = (event) => {
    let input = event.target;
    let { id, value } = input;
    let newKhachHang = this.state.khachHang;
    newKhachHang[id] = value;

    this.setState({
      khachHang: newKhachHang,
    });
  };
  handleDatVe = (item) => {
    this.setState({
      khachHang: {
        ten: "",
        soDT: "",
        gio: "",
        ngay: "",
      },
    });
    const action = {
      type: "ghedachon",
      payload: item,
    };
    this.props.dispatch(action);
  };
  handleXacNhan = () => {
    const ngayGio = new Date();
    const ngay = ngayGio.getDate();
    const thang = ngayGio.getMonth() + 1;
    const nam = ngayGio.getFullYear();
    const gio = ngayGio.getHours();
    const phut = ngayGio.getMinutes();
    const giay = ngayGio.getSeconds();
    const myDay = ngay + "/" + thang + "/" + nam;
    const myTime = gio + ":" + phut + ":" + giay;
    const khachHang = {
      ...this.state.khachHang,
      ngay: myDay,
      gio: myTime,
    };

    this.setState({
      khachHang,
    });
    console.log(khachHang);
    const action = {
      type: "xacnhan",
      payload: khachHang,
    };
    this.props.dispatch(action);
  };
  handleChonLai = () => {
    const action = {
      type: "chonlai",
    };
    this.props.dispatch(action);
  };

  render() {
    const khachHangDat = this.props.arrGhe
      .flatMap((hang) => hang.danhSachGhe)
      .filter(
        (ghe) =>
          ghe.khachHang === this.state.khachHang.ten &&
          ghe.gio === this.state.khachHang.gio
      );
    // console.log(khachHangDat);

    let arrGhe = [...this.props.arrGhe];
    const danhSachGheDaChon = arrGhe
      .flatMap((hang) => hang.danhSachGhe)
      .filter((ghe) => ghe.daChon === true);
    let soLuongGheDaChon = danhSachGheDaChon.length;
    let tongTien = 0;
    let tongTienDaThanhToan = 0;

    return (
      <div className="container">
        <div className="content">
          <div id="datVe">
            <div id="manHinh">Màn hình flasma 8k 900" :)</div>
            {arrGhe.map((item, index) => {
              if (item.hang === "") {
                return (
                  <div key={index} className="hangTitle">
                    <div className="hangTitleItem">{item.hang}</div>
                    {item.danhSachGhe.map((item, index) => {
                      return (
                        <div key={index} className="soGhe">
                          {item.soGhe}
                        </div>
                      );
                    })}
                  </div>
                );
              } else {
                return (
                  <div key={index} className="hang">
                    <div className="hangItem">{item.hang}</div>
                    {item.danhSachGhe.map((item, index) => {
                      if (item.daDat === true) {
                        return (
                          <div key={index} className="soGheDaDat">
                            {item.soGhe}
                          </div>
                        );
                      } else {
                        return (
                          <button
                            key={index}
                            className="soGhe"
                            style={{
                              backgroundColor: `${item.daChon ? "yellow" : ""}`,
                            }}
                            onClick={() => this.handleDatVe(item)}
                          >
                            {item.soGhe}
                          </button>
                        );
                      }
                    })}
                  </div>
                );
              }
            })}
            <div id="ghiChu">
              <div id="huyTatCa">
                <button
                  type="button"
                  onClick={this.handleChonLai}
                  style={{
                    display: `${soLuongGheDaChon === 0 ? "none" : "block"}`,
                  }}
                >
                  Tôi muốn chọn lại
                </button>
              </div>
              <div>
                <span className="gheTrong">Ghế trống</span>
                <span className="daChon">Đã chọn</span>
                <span className="daDat">Đã đặt</span>
              </div>
            </div>
          </div>
          <div id="myList">
            <div
              id="xacNhan"
              style={{
                display: `${soLuongGheDaChon === 0 ? "none" : "block"}`,
              }}
            >
              <div id="xacNhanContent">
                <div className="gioHang">
                  <i className="fa-solid fa-ticket gioHangContent">
                    <span className="soLuong">
                      {" "}
                      {soLuongGheDaChon.toLocaleString()}
                    </span>
                  </i>
                  <form action="">
                    <div id="formInput">
                      <i className="fa-solid fa-user"></i>
                      <input
                        id="ten"
                        value={this.state.khachHang.ten}
                        type="text"
                        placeholder="Tên khách hàng"
                        onChange={this.getInput}
                      />
                    </div>
                    <div id="formInput">
                      <i className="fa-solid fa-phone"></i>
                      <input
                        id="soDT"
                        value={this.state.khachHang.soDT}
                        type="text"
                        placeholder="Số điện thoại"
                        onChange={this.getInput}
                      />
                    </div>
                  </form>
                </div>
              </div>

              <button type="button" onClick={this.handleXacNhan}>
                Xác nhận Thanh Toán
              </button>
            </div>
            <div
              style={{
                display: `${soLuongGheDaChon === 0 ? "none" : "block"}`,
              }}
            >
              <table id="myTable" style={{}}>
                <thead>
                  <tr>
                    <th>Mã Ghế</th>
                    <th>Giá tiền</th>
                    <th>Hủy</th>
                  </tr>
                </thead>
                <tbody>
                  {danhSachGheDaChon.map((item, index) => {
                    let { soGhe, gia } = item;
                    tongTien += gia;

                    return (
                      <tr key={index}>
                        <td>{soGhe}</td>
                        <td>{gia.toLocaleString()}</td>
                        <td>
                          <button
                            onClick={() => this.handleDatVe(item)}
                            className="huyGhe"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Tổng tiền:</th>
                    <th>{tongTien.toLocaleString()}</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div
              id="khachDatVe"
              style={{
                display: khachHangDat.length > 0 ? "block" : "none",
              }}
            >
              <h3>Đặt chỗ thành công</h3>
              <p>
                Khách hàng:{" "}
                {khachHangDat.length > 0 ? khachHangDat[0].khachHang : ""}
              </p>
              <p>
                Số ĐT: {khachHangDat.length > 0 ? khachHangDat[0].soDT : ""}
              </p>
              <span>
                Mã đơn:{" "}
                {khachHangDat.length > 0
                  ? "#" +
                    khachHangDat[0].gio.split(":").join("") +
                    khachHangDat[0].ngay.split("/").join("")
                  : ""}
              </span>
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Số ghế</th>
                    <th>Số tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {khachHangDat.map((item, index) => {
                    tongTienDaThanhToan += item.gia;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.soGhe}</td>
                        <td>{item.gia.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="2">Đã thanh toán</th>
                    <th>{tongTienDaThanhToan.toLocaleString()}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    arrGhe: state.duLieu.arrGhe,
  };
};
const layDuLieuTuRedux = connect(mapStateToProps)(DatVeXemPhim);
export default layDuLieuTuRedux;

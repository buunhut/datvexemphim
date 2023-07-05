import React, { Component } from "react";
import { connect } from "react-redux";

class DatVeXemPhim extends Component {
  handleDatVe = (item) => {
    const action = {
      type: "ghedachon",
      payload: item,
    };
    this.props.dispatch(action);
  };

  handleHuyVe = (soGhe) => {
    const action = {
      type: "huychon",
      payload: soGhe,
    };
    this.props.dispatch(action);
  };
  handleXacNhan = () => {
    const action = {
      type: "xacnhan",
    };
    this.props.dispatch(action);
  };

  render() {
    let arrGhe = [...this.props.arrGhe];
    const danhSachGheDaChon = arrGhe
      .flatMap((hang) => hang.danhSachGhe)
      .filter((ghe) => ghe.daChon === true);

    return (
      <div className="container">
        <div className="content">
          <div id="datVe">
            <div id="manHinh">Màn hình</div>
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
          </div>
          <div>
            <h1>Số ghế bạn đã chọn</h1>
            <table>
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
                  return (
                    <tr key={index}>
                      <td>{soGhe}</td>
                      <td>{gia}</td>
                      <td>
                        <button onClick={() => this.handleHuyVe(item)}>
                          x
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button type="button" onClick={this.handleXacNhan}>
              Xác nhận Thanh Toán
            </button>
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

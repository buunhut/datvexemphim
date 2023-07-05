import data from "../danhSachGhe.json";
import { configureStore } from "@reduxjs/toolkit";
const initialState = {
  arrGhe: data,
  arrGheDaChon: [],
};

export const store = configureStore({
  reducer: {
    duLieu: (state = initialState, action) => {
      switch (action.type) {
        case "ghedachon": {
          let item = action.payload;
          let hang = item.soGhe.charAt(0);
          let viTriHang = state.arrGhe.findIndex((item) => item.hang === hang);
          let viTriGhe = state.arrGhe[viTriHang].danhSachGhe.findIndex(
            (ghe) => ghe.soGhe === item.soGhe
          );
          let gheDaChon = {
            ...item,
            daChon: !item.daChon,
          };

          let newarrGhe = [...state.arrGhe];
          let newDanhSachGhe = [...newarrGhe[viTriHang].danhSachGhe];
          // Thay thế ghế trong danhSachGhe mới
          newDanhSachGhe[viTriGhe] = gheDaChon;
          // Thay thế danhSachGhe mới trong arrGhe
          newarrGhe[viTriHang] = {
            ...newarrGhe[viTriHang],
            danhSachGhe: newDanhSachGhe,
          };

          return {
            ...state,
            arrGhe: newarrGhe, // Cập nhật arrGhe mới
          };
        }
        case "huychon": {
          let arrGheDaChon = [...state.arrGheDaChon];

          let viTri = arrGheDaChon.findIndex(
            (item) => item.soGhe === action.payload.soGhe
          );
          arrGheDaChon.splice(viTri, 1);

          let item = action.payload;
          let hang = item.soGhe.charAt(0);
          let viTriHang = state.arrGhe.findIndex((item) => item.hang === hang);
          let viTriGhe = state.arrGhe[viTriHang].danhSachGhe.findIndex(
            (ghe) => ghe.soGhe === item.soGhe
          );
          let gheDaChon = {
            ...item,
            daChon: !item.daChon,
          };

          let newarrGhe = [...state.arrGhe];
          let newDanhSachGhe = [...newarrGhe[viTriHang].danhSachGhe];
          // Thay thế ghế trong danhSachGhe mới
          newDanhSachGhe[viTriGhe] = gheDaChon;
          // Thay thế danhSachGhe mới trong arrGhe
          newarrGhe[viTriHang] = {
            ...newarrGhe[viTriHang],
            danhSachGhe: newDanhSachGhe,
          };

          return {
            ...state,
            arrGhe: newarrGhe, // Cập nhật arrGhe mới
          };
        }
        case "xacnhan": {
          let newArrGhe = state.arrGhe.map((hang) => {
            let newDanhSachGhe = hang.danhSachGhe.map((ghe) => ({
              ...ghe,
              daDat: ghe.daChon ? true : ghe.daDat,
            }));

            return {
              ...hang,
              danhSachGhe: newDanhSachGhe,
            };
          });

          return {
            ...state,
            arrGhe: newArrGhe,
          };
        }
        default:
          return state;
      }
    },
  },
});

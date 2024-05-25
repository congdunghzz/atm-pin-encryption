import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Encrypt.css";
import CryptoJS from "crypto-js";

const Encrypt = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [pan, setPan] = useState('');
  const [key, setKey] = useState('');
  const [encryptedPin, setEncryptedPin] = useState('');

  //Hàm tạo ra một chuỗi ký tự ngẫu nhiên
  const getRandomHex = (length) => {
    let result = '';
    const characters = '0';
    for (let i = 0; i < length; i++) {
      result += characters;
    }
    return result;
  };
  // Hàm mã hóa 1 khối với trường hợp pass > 8 ký tự
  const encryptBlock = (block, key) => {
    const encrypted = CryptoJS.DES.encrypt(CryptoJS.enc.Hex.parse(block), CryptoJS.enc.Hex.parse(key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.NoPadding
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  };
  // Các ràng buộc
  const handleEncrypt = async () => {
    if (pin.length < 4) {
      alert('PIN phải có ít nhất 4 chữ số');
      return;
    }
    if (pan.length < 16) {
      alert('PAN phải có ít nhất 16 chữ số');
      return;
    }
    if (key.length !== 16) {
      alert('Khóa DES phải có 16 ký tự');
      return;
    }

    //Chia mã pin thành các khối 8 ký tự và mã hóa từng khối
    let result = '';
    for (let i = 0; i < pin.length; i += 8) {
      let block = pin.slice(i, i + 8);
      if (block.length < 8) {
        const randomPadding = getRandomHex(8 - block.length);
        block = block + randomPadding;
      }
      // đệm mã pin với giá trị ngẫu nhiên (đã thực hiện ở trên)
      const paddedPin = block;
      // Lấy 12 chữ số cuối của PAN   
      const panLast12 = pan.slice(-12);
      // XOR giữa mã PIN đệm và PAN
      const xorResult = paddedPin.split('').map((char, i) => {
        return (parseInt(char, 16) ^ parseInt(panLast12[i % 12], 16)).toString(16);
      }).join('');
      // Mã hóa khối với DES
      const encryptedBlock = encryptBlock(xorResult, key);
      result += encryptedBlock;
    }

    setEncryptedPin(result);
  };

  useEffect(() => {
    const accountNumber = localStorage.getItem('accountNumber');
    if(accountNumber){
      setPan(accountNumber);
    }else{
      navigate("/login")
    }
  })
  return (
    <div>
      <div className="working-space p-5 d-flex ">
        <div className=" container  d-flex  justify-content-center align-items-center">
          <div className="working-space-cart ">
            <h1 className="mb-5">Mã hóa và Lưu trữ mã PIN ATM bằng DES</h1>
            <div className="mb-5 w-50 ">
              <label for="pinCode">Mã PIN:</label>
              <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} id="pinCode" name="pinCode" />
            </div>
            <div className="w-50">
              <label for="key">Khóa DES (16 ký tự):</label>
              <input type="text" value={key} onChange={(e) => setKey(e.target.value)} id="key" name="key" />
            </div>
            <button onClick={handleEncrypt}>Mã hóa và Lưu trữ</button>
            {encryptedPin && (
              <div className="mt-5">
                <h2>Mã PIN đã mã hóa:</h2>
                <p>{encryptedPin}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encrypt;
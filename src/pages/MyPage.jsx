import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose, IoChevronForward } from "react-icons/io5";
import BottomNavbar from "../components/common/BottomNavbar";

const mockUser = {
  isLoggedIn: false,
  email: "",
  id: "",
  password: "",
};

// Style Objects
const sectionContainerStyle = {
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  overflow: 'hidden',
};

const sectionTitleStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: '#6B7280',
  padding: '12px 16px 4px 16px',
  background: '#f9fafb',
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '16px',
  background: '#fff',
  transition: 'background-color 0.2s',
};

const dividerStyle = {
  border: 'none',
  borderTop: '1px solid #f3f4f6',
  margin: '0 16px',
};

const MyPage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [smsOption, setSmsOption] = useState("direct");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(mockUser.isLoggedIn);
  const [email, setEmail] = useState(mockUser.email);
  const [id, setId] = useState(mockUser.id);
  const [password, setPassword] = useState(mockUser.password);
  const [editPw, setEditPw] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPw, setSignupPw] = useState("");
  const [signupNickname, setSignupNickname] = useState("");
  const [signupEmailError, setSignupEmailError] = useState("");
  const [signupPwError, setSignupPwError] = useState("");
  const [signupNicknameError, setSignupNicknameError] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const validatePw = (pw) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\\]:;<>,.?~\\\/-]).{8,15}$/;
    return regex.test(pw);
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleEmailCheck = () => {
    if (!validateEmail(signupEmail)) {
      setSignupEmailError("올바른 이메일 주소를 입력하세요.");
      setEmailChecked(false);
      return;
    }
    if (signupEmail === email) {
      setSignupEmailError("이미 가입된 이메일입니다.");
      setEmailChecked(false);
      return;
    }
    setSignupEmailError("");
    setEmailChecked(true);
    alert("사용 가능한 이메일입니다.");
  };

  const handleSignup = () => {
    if (!signupNickname.trim()) {
      setSignupNicknameError("닉네임을 입력해주세요.");
      return;
    }
    if (signupNickname.trim().length < 2) {
      setSignupNicknameError("닉네임은 2자 이상 입력해주세요.");
      return;
    }
    if (!validateEmail(signupEmail)) {
      setSignupEmailError("올바른 이메일 주소를 입력하세요.");
      return;
    }
    if (!validatePw(signupPw)) {
      setSignupPwError("문자, 숫자, 특수기호 포함 8~15자로 입력하세요.");
      return;
    }
    if (!emailChecked) {
      setSignupEmailError("이메일 중복 확인을 해주세요.");
      return;
    }
    setEmail(signupEmail);
    setId(signupEmail);
    setPassword(signupPw);
    setIsLoggedIn(true);
    setShowSignupModal(false);
    setSignupEmail("");
    setSignupPw("");
    setSignupNickname("");
    setSignupEmailError("");
    setSignupPwError("");
    setSignupNicknameError("");
    setEmailChecked(false);
    alert(`${signupNickname}님, 회원가입이 완료되었습니다!`);
  };

  const handlePwChange = (e) => {
    const value = e.target.value;
    setNewPw(value);
    if (!validatePw(value)) {
      setPwError("문자, 숫자, 특수기호 혼합 8~15자로 입력하세요.");
    } else {
      setPwError("");
    }
  };

  const handlePwSubmit = () => {
    if (validatePw(newPw)) {
      setPassword(newPw);
      setEditPw(false);
      setNewPw("");
      setPwError("");
      alert("비밀번호가 변경되었습니다.");
    } else {
      setPwError("문자, 숫자, 특수기호 혼합 8~15자로 입력하세요.");
    }
  };

  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
    setShowLoginModal(false);
    setIsLoggedIn(false);
    setId("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      setLoginError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    if (loginEmail === 'test@example.com' && loginPassword === 'password123') {
      setLoginError('');
      setEmail(loginEmail);
      setId(loginEmail);
      setPassword(loginPassword);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginEmail("");
      setLoginPassword("");
      alert('로그인 되었습니다.');
    } else {
      setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
    setLoginError('');
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", paddingBottom: 80 }}>
      <header style={{ width: "100%", maxWidth: 768, margin: "0 auto", padding: "24px 16px", textAlign: "center" }}>
        <span style={{ fontSize: 22, fontWeight: 700 }}>내 정보</span>
      </header>
      <main style={{ width: "100%", maxWidth: 768, margin: "0 auto", padding: '0 16px', display: "flex", flexDirection: "column", gap: 24 }}>
        
        {/* 계정 관리 */}
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>계정</h3>
          <div style={rowStyle} onClick={() => { isLoggedIn ? setShowLoginModal(true) : handleOpenLoginModal(); }}>
            <span>로그인 정보</span>
            <span style={{ fontWeight: 500, color: '#6B7280' }}>
              {isLoggedIn ? id : "로그인 하기"}
            </span>
          </div>
          <hr style={dividerStyle} />
          <div style={rowStyle} onClick={() => setShowSignupModal(true)}>
            <span>회원 가입</span>
            <IoChevronForward color="#9CA3AF" />
          </div>
        </div>

        {/* 앱 설정 */}
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>앱 설정</h3>
          <div style={rowStyle} onClick={() => setShowPopup(true)}>
            <span>문자 인식 기능 사용하기</span>
            <input type="checkbox" checked={smsOption !== "disable"} onChange={() => setSmsOption(smsOption === "disable" ? "direct" : "disable")} />
          </div>
          <hr style={dividerStyle} />
          <div style={rowStyle} onClick={() => navigate("/error-report")}>
            <span>오류 신고</span>
            <IoChevronForward color="#9CA3AF" />
          </div>
        </div>

        {/* 데이터 */}
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>데이터</h3>
          <div style={rowStyle} onClick={() => navigate("/confirm-action?type=reset")}>
            <span>데이터 초기화</span>
            <IoChevronForward color="#9CA3AF" />
          </div>
        </div>

        {/* 정보 */}
        <div style={sectionContainerStyle}>
           <div style={rowStyle}>
            <span>프로그램 버전</span>
            <span style={{ fontWeight: 500, color: '#6B7280' }}>v1.6.0</span>
          </div>
        </div>

        {/* 탈퇴 */}
        <div style={{...sectionContainerStyle, background: 'transparent', boxShadow: 'none'}}>
          <div style={{ ...rowStyle, justifyContent: 'center', color: "#EF4444", fontWeight: 500, background: '#fff' }} onClick={() => navigate("/confirm-action?type=withdraw")}>
            서비스 탈퇴하기
          </div>
        </div>

      </main>
      
      {/* Modals... */}
      {showLoginModal && !isLoggedIn && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={handleCloseLoginModal}>
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.1)", padding: "32px 28px 28px 28px", minWidth: 320, maxWidth: 400, width: "90%", textAlign: "center", position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={handleCloseLoginModal} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", fontSize: 26, color: "#888", cursor: "pointer", zIndex: 10 }} aria-label="닫기"><IoClose /></button>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>로그인</h3>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, color: "#666", marginBottom: 8, textAlign: "left" }}>이메일 주소</div>
              <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="이메일을 입력하세요" style={{ width: "100%", fontSize: 16, padding: "12px 16px", border: "1px solid #ddd", borderRadius: 8, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, color: "#666", marginBottom: 8, textAlign: "left" }}>비밀번호</div>
              <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="비밀번호를 입력하세요" style={{ width: "100%", fontSize: 16, padding: "12px 16px", border: "1px solid #ddd", borderRadius: 8, outline: "none", boxSizing: "border-box" }} onKeyPress={(e) => { if (e.key === 'Enter') { handleLogin(); } }} />
            </div>
            {loginError && (<div style={{ color: "#ef4444", fontSize: 14, marginBottom: 16, textAlign: "left" }}>{loginError}</div>)}
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button onClick={handleCloseLoginModal} style={{ flex: 1, background: "#f5f5f5", color: "#666", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>취소</button>
              <button onClick={handleLogin} style={{ flex: 1, background: "#4B4BFF", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>로그인</button>
            </div>
            <button onClick={() => alert('ID/PW 찾기 기능은 추후 업데이트될 예정입니다.')} style={{ width: "100%", background: "none", color: "#4B4BFF", border: "none", fontSize: 14, cursor: "pointer", marginTop: 16, textDecoration: "underline" }}>ID/PW 찾기</button>
          </div>
        </div>
      )}
      {showLoginModal && isLoggedIn && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowLoginModal(false)}>
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px #d1d5db", padding: "32px 28px 28px 28px", minWidth: 300, maxWidth: 350, textAlign: "center", position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowLoginModal(false)} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", fontSize: 26, color: "#888", cursor: "pointer", zIndex: 10 }} aria-label="닫기"><IoClose /></button>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>로그인 정보</h3>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 15, color: "#888", marginBottom: 6, textAlign: "left" }}>이메일 주소</div>
              <div style={{ fontSize: 16, fontWeight: 600, background: "#f5f5f5", borderRadius: 8, padding: "10px 12px", marginBottom: 10, textAlign: "left" }}>{email}</div>
              <div style={{ fontSize: 15, color: "#888", marginBottom: 6, textAlign: "left" }}>비밀번호</div>
              <div style={{ display: "flex", alignItems: "center", background: "#f5f5f5", borderRadius: 8, padding: "10px 12px", marginBottom: 10 }}>
                {!editPw ? (
                  <>
                    <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: 2 }}>{"*".repeat(password.length)}</span>
                    <button style={{ marginLeft: 12, background: "#4B4BFF", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 14, cursor: "pointer", fontWeight: 600 }} onClick={() => setEditPw(true)}>수정하기</button>
                  </>
                ) : (
                  <>
                    <input type="password" value={newPw} onChange={handlePwChange} placeholder="새 비밀번호 입력" style={{ fontSize: 15, padding: "8px", borderRadius: 8, border: "1px solid #ddd", width: "60%", marginRight: 8 }} maxLength={15} />
                    <button style={{ background: "#4B4BFF", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 14, cursor: "pointer", fontWeight: 600 }} onClick={handlePwSubmit}>저장</button>
                    <button style={{ marginLeft: 6, background: "#eee", color: "#888", border: "none", borderRadius: 8, padding: "6px 10px", fontSize: 14, cursor: "pointer", fontWeight: 500 }} onClick={() => { setEditPw(false); setNewPw(""); setPwError(""); }}>취소</button>
                  </>
                )}
              </div>
              {pwError && (<div style={{ color: "#d32f2f", fontSize: 13, marginBottom: 8 }}>{pwError}</div>)}
            </div>
            <button style={{ width: "100%", background: "#EF4444", color: "#fff", fontWeight: 700, fontSize: 16, border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer", marginTop: 8 }} onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      )}
      {showSignupModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setShowSignupModal(false)}>
          <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.15)", padding: "40px 36px 36px 36px", minWidth: 400, maxWidth: 480, width: "100%", maxHeight: "90vh", overflowY: "auto", textAlign: "center", position: "relative", border: "1px solid rgba(255,255,255,0.8)" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowSignupModal(false)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", fontSize: 28, color: "#999", cursor: "pointer", zIndex: 10, borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} aria-label="닫기" onMouseOver={(e) => {e.target.style.background = "#f5f5f5"; e.target.style.color = "#666";}} onMouseOut={(e) => {e.target.style.background = "none"; e.target.style.color = "#999";}}><IoClose /></button>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32, color: "#2d3748", letterSpacing: "-0.5px" }}>회원 가입</h3>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 16, color: "#4a5568", marginBottom: 8, textAlign: "left", fontWeight: 600 }}>닉네임</div>
              <input type="text" value={signupNickname} onChange={(e) => { setSignupNickname(e.target.value); setSignupNicknameError(""); }} placeholder="사용할 닉네임을 입력하세요" style={{ fontSize: 16, padding: "14px 16px", borderRadius: 12, border: "2px solid #e2e8f0", width: "100%", boxSizing: "border-box", transition: "all 0.2s", outline: "none" }} maxLength={20} autoComplete="off" onFocus={(e) => {e.target.style.borderColor = "#4B4BFF"; e.target.style.boxShadow = "0 0 0 3px rgba(75,75,255,0.1)";}} onBlur={(e) => {e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none";}} />
              {signupNicknameError && (<div style={{ color: "#e53e3e", fontSize: 14, marginTop: 8, textAlign: "left" }}>{signupNicknameError}</div>)}
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 16, color: "#4a5568", marginBottom: 8, textAlign: "left", fontWeight: 600 }}>이메일 주소(ID)</div>
              <div style={{ display: "flex", gap: 12 }}>
                <input type="email" value={signupEmail} onChange={(e) => { setSignupEmail(e.target.value); setSignupEmailError(""); setEmailChecked(false); }} placeholder="이메일 주소 입력" style={{ fontSize: 16, padding: "14px 16px", borderRadius: 12, border: "2px solid #e2e8f0", flex: 1, transition: "all 0.2s", outline: "none" }} autoComplete="off" onFocus={(e) => {e.target.style.borderColor = "#4B4BFF"; e.target.style.boxShadow = "0 0 0 3px rgba(75,75,255,0.1)";}} onBlur={(e) => {e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none";}} />
                <button type="button" style={{ background: "linear-gradient(135deg, #4B4BFF 0%, #6366f1 100%)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 20px", fontSize: 15, cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(75,75,255,0.3)", transition: "all 0.2s" }} onClick={handleEmailCheck} onMouseOver={(e) => {e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 20px rgba(75,75,255,0.4)";}} onMouseOut={(e) => {e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 12px rgba(75,75,255,0.3)";}} >중복 확인</button>
              </div>
              {signupEmailError && (<div style={{ color: "#e53e3e", fontSize: 14, marginTop: 8, textAlign: "left" }}>{signupEmailError}</div>)}
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 16, color: "#4a5568", marginBottom: 8, textAlign: "left", fontWeight: 600 }}>비밀번호</div>
              <input type="password" value={signupPw} onChange={(e) => { setSignupPw(e.target.value); setSignupPwError(""); }} placeholder="문자, 숫자, 특수기호 포함 8~15자" style={{ fontSize: 16, padding: "14px 16px", borderRadius: 12, border: "2px solid #e2e8f0", width: "100%", boxSizing: "border-box", transition: "all 0.2s", outline: "none" }} maxLength={15} autoComplete="off" onFocus={(e) => {e.target.style.borderColor = "#4B4BFF"; e.target.style.boxShadow = "0 0 0 3px rgba(75,75,255,0.1)";}} onBlur={(e) => {e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none";}} />
              {signupPwError && (<div style={{ color: "#e53e3e", fontSize: 14, marginTop: 8, textAlign: "left" }}>{signupPwError}</div>)}
            </div>
            <button type="button" style={{ width: "100%", background: "linear-gradient(135deg, #4B4BFF 0%, #6366f1 100%)", color: "#fff", fontWeight: 700, fontSize: 18, border: "none", borderRadius: 14, padding: "16px 0", cursor: "pointer", marginTop: 16, boxShadow: "0 8px 24px rgba(75,75,255,0.3)", transition: "all 0.3s", letterSpacing: "-0.3px" }} onClick={handleSignup} onMouseOver={(e) => {e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 32px rgba(75,75,255,0.4)";}} onMouseOut={(e) => {e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 24px rgba(75,75,255,0.3)";}} >가입 완료</button>
          </div>
        </div>
      )}
      {showPopup && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowPopup(false)}>
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #aaa", padding: 24, minWidth: 280, maxWidth: 340 }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, marginBottom: 16 }}>인식된 문자 내역 등록방법</h3>
            <div style={{ marginBottom: 12 }}>
              <input type="radio" id="direct" name="regtype" checked={smsOption === "direct"} onChange={() => setSmsOption("direct")} />
              <label htmlFor="direct" style={{ marginLeft: 8 }}><b>바로등록</b><br />문자 인식과 동시에 가계부에 입력됩니다.</label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <input type="radio" id="select" name="regtype" checked={smsOption === "select"} onChange={() => setSmsOption("select")} />
              <label htmlFor="select" style={{ marginLeft: 8 }}><b>확인 후 선택등록</b><br />앱이 인식한 문자 목록을 확인하고, 원하는 내역만 선택하여 등록할 수 있습니다.</label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <input type="radio" id="disable" name="regtype" checked={smsOption === "disable"} onChange={() => setSmsOption("disable")} />
              <label htmlFor="disable" style={{ marginLeft: 8 }}><b>사용하지 않기</b><br />문자 인식 기능을 사용하지 않습니다.</label>
            </div>
            <button style={{ marginTop: 16, background: "#4B4BFF", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 15, cursor: "pointer", width: "100%" }} onClick={() => setShowPopup(false)}>닫기</button>
          </div>
        </div>
      )}
      <BottomNavbar active="mypage" />
    </div>
  );
}

export default MyPage;
import React, { useState, useMemo } from 'react';
import BottomNavbar from '../components/common/BottomNavbar';
import LedgerEntryModal from '../components/ledger/LedgerEntryModal';
import { IoAdd } from 'react-icons/io5';
import { MdArrowBack } from 'react-icons/md'; // 좌측 화살표 아이콘

const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
const months = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'
];

// 이체 카테고리 항목 추가
const transferCategories = [
  "부동산", "대출", "예금", "기타 금융자산", "카드 대금 출금"
];

const LedgerPage = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('5월');
  const [selectedDay, setSelectedDay] = useState(26);
  const [ledgerEntries, setLedgerEntries] = useState([
    { date: '2025-05-01', income: 150000, expense: 50000, memo: '월급' },
    { date: '2025-05-08', income: 0, expense: 49500, memo: '온라인 쇼핑' },
    { date: '2025-05-27', income: 200000, expense: 0, memo: '추가 수입' },
    { date: '2025-05-27', income: 0, expense: 15000, memo: '커피' },
    { date: '2025-05-09', income: 0, expense: 49500, memo: '여행 준비' },
    { date: '2025-05-09', income: 0, expense: 15000, memo: '교통비' },
    { date: '2025-05-26', income: 0, expense: 3000, memo: '간식' },
  ]);
  const [modalDate, setModalDate] = useState(null);

  // 연도/월 선택 핸들러
  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
    setSelectedDay(1);
  };
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setSelectedDay(1);
  };
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };
  const handleOpenModal = () => {
    const monthNumber = parseInt(selectedMonth.replace('월', '')) - 1;
    const dateToOpen = new Date(selectedYear, monthNumber, selectedDay);
    setModalDate(dateToOpen);
  };
  const handleCloseModal = () => {
    setModalDate(null);
  };
  const handleEntrySubmit = (data) => {
    // 숫자 맨 앞에 0 입력 막기 (첫 숫자가 0이면 무시)
    let amount = data.amount.replace(/^0+/, '');
    amount = amount === '' ? '0' : amount;
    amount = parseFloat(amount) || 0;

    // 날짜 칸에 시간 이하 삭제
    const year = data.selectedDate.getFullYear();
    const month = String(data.selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(data.selectedDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    const newEntry = {
      date: dateString,
      income: data.type === '수입' ? amount : 0,
      expense: data.type === '지출' ? amount : 0,
      memo: data.memo,
      type: data.type,
      category: data.category,
      payment: data.payment,
      transfer: data.transfer || null,
    };
    setLedgerEntries(prev => [...prev, newEntry]);
    handleCloseModal();
  };

  // 달력 정보
  const getMonthInfo = useMemo(() => {
    const monthIndex = parseInt(selectedMonth.replace('월', '')) - 1;
    const firstDayOfMonth = new Date(selectedYear, monthIndex, 1).getDay();
    const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
    return { firstDayOfMonth, daysInMonth, monthIndex };
  }, [selectedMonth, selectedYear]);
  const { firstDayOfMonth, daysInMonth, monthIndex } = getMonthInfo;
  const days = useMemo(() => {
    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    return daysArray;
  }, [firstDayOfMonth, daysInMonth]);
  const monthlySummary = useMemo(() => {
    const startOfMonth = new Date(selectedYear, monthIndex, 1);
    const endOfMonth = new Date(selectedYear, monthIndex + 1, 0);
    return ledgerEntries.reduce((acc, entry) => {
      const entryDate = new Date(entry.date);
      if (entryDate >= startOfMonth && entryDate <= endOfMonth) {
        acc.income += entry.income;
        acc.expense += entry.expense;
      }
      return acc;
    }, { income: 0, expense: 0 });
  }, [ledgerEntries, monthIndex, selectedYear]);
  const selectedDayEntries = useMemo(() => {
    const targetDateString = `${selectedYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    return ledgerEntries
      .filter(entry => entry.date === targetDateString)
      .sort(a => (a.expense > 0 ? 1 : -1));
  }, [ledgerEntries, selectedDay, monthIndex, selectedYear]);
  const formatCurrency = (amount) => {
    return amount.toLocaleString('ko-KR');
  };

  // 달력 렌더링
  const renderCalendar = () => {
    const today = new Date();
    const todayString = `${selectedYear}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return (
      <div className="grid grid-cols-7 text-center text-sm gap-y-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((dayName, index) => (
          <div key={dayName} className={`font-bold py-2 ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-700'}`}>
            {dayName}
          </div>
        ))}
        {days.map((day, index) => {
          const isToday = day && `${selectedYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` === todayString;
          const isSelected = day === selectedDay;
          const dayData = ledgerEntries.filter(d => {
            const dDate = new Date(d.date);
            return dDate.getDate() === day && dDate.getMonth() === monthIndex && dDate.getFullYear() === selectedYear;
          });
          const dayIncome = dayData.reduce((sum, d) => sum + d.income, 0);
          const dayExpense = dayData.reduce((sum, d) => sum + d.expense, 0);
          if (day === null) {
            return <div key={index} className="h-16"></div>;
          }
          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-start h-16 cursor-pointer rounded-lg relative 
                          ${isSelected ? 'bg-indigo-100' : 'hover:bg-gray-50'}
                          ${isToday ? 'border-2 border-indigo-500' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <span className={`text-xs font-semibold ${index % 7 === 0 ? 'text-red-500' : index % 7 === 6 ? 'text-blue-500' : 'text-gray-800'}`}>
                {day}
              </span>
              {dayIncome > 0 && (
                <span className="text-xs text-blue-600 absolute bottom-4 whitespace-nowrap">
                  +{formatCurrency(dayIncome)}
                </span>
              )}
              {dayExpense > 0 && (
                <span className="text-xs text-red-500 absolute bottom-1 whitespace-nowrap">
                  -{formatCurrency(dayExpense)}
                </span>
              )}
              {isSelected && (
                <div className="absolute inset-0 border-2 border-indigo-500 rounded-lg pointer-events-none"></div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // 상세 내역 렌더링
  const renderDayEntries = () => (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-gray-700 mb-4">{selectedYear}년 {selectedMonth} {selectedDay}일 상세 내역</h3>
      {selectedDayEntries.length > 0 ? (
        <div className="space-y-3">
          {selectedDayEntries.map((entry, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">{entry.memo || '내용 없음'}</span>
                <span className="text-xs text-gray-500">
                  {entry.category || entry.type} ({entry.payment || '없음'})
                  {entry.transfer ? ` / 이체: ${entry.transfer}` : ""}
                </span>
              </div>
              <span className={`font-semibold text-lg ${entry.income > 0 ? 'text-blue-600' : 'text-red-500'}`}>
                {entry.income > 0 ? `+${formatCurrency(entry.income)}원` : `-${formatCurrency(entry.expense)}원`}
              </span>
              {/* 금액 수정 아이콘을 좌로 가는 화살표로 변경 */}
              <button className="text-sm text-gray-400 hover:text-gray-600">
                <MdArrowBack size={22} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">선택된 날짜에는 내역이 없습니다.</p>
      )}
    </div>
  );

  // 고정비 수정 페이지 이동
  const handleFixedExpenseEdit = () => {
    window.location.href = "http://localhost:5175/fixed-expense";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 768,
          margin: "0 auto",
          padding: "24px 8px",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 700, color: "#222", marginBottom: 24 }}>가계부</h1>
        {/* 연도/월 선택 */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            style={{ fontSize: 16, padding: "6px 12px", borderRadius: 8, border: "1px solid #ddd" }}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            style={{ fontSize: 16, padding: "6px 12px", borderRadius: 8, border: "1px solid #ddd" }}
          >
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        {/* 수입/지출 합계 */}
        <div style={{ marginBottom: 24, fontSize: 18, fontWeight: 600 }}>
          <span style={{ color: "#3B82F6", marginRight: 24 }}>수입: {formatCurrency(monthlySummary.income)}원</span>
          <span style={{ color: "#EF4444" }}>지출: {formatCurrency(monthlySummary.expense)}원</span>
        </div>
        {/* 달력 */}
        {renderCalendar()}
        {/* 상세 내역 */}
        {renderDayEntries()}
      </div>
      {/* 수입/지출 입력, 고정비 지출 수정 버튼 */}
      <div style={{ position: "fixed", right: 24, bottom: 150, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 20 }}>
        {/* 수입/지출 입력 버튼 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
          <button
            onClick={handleOpenModal}
            style={{
              width: 56,
              height: 56,
              background: "#4B4BFF",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0 2px 8px #bbb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative"
            }}
            title="수입/지출 입력"
          >
            <IoAdd size={32} style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
          </button>
          <span style={{ fontSize: 14, color: "#4B4BFF", fontWeight: 600, marginTop: 8 }}>수입/지출 입력</span>
        </div>
        {/* 고정비 지출 수정 버튼 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button
            onClick={handleFixedExpenseEdit}
            style={{
              width: 56,
              height: 56,
              background: "#10B981",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0 2px 8px #bbb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative"
            }}
            title="고정비 지출 수정"
          >
            <MdArrowBack size={28} style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
          </button>
          <span style={{ fontSize: 14, color: "#10B981", fontWeight: 600, marginTop: 8 }}>고정비 지출 수정</span>
        </div>
      </div>
      {modalDate && (
        <LedgerEntryModal
          initialDate={modalDate}
          onSubmit={handleEntrySubmit}
          onClose={handleCloseModal}
          transferCategories={transferCategories} // 이체 항목 전달
        />
      )}
      <BottomNavbar active="ledger" />
    </div>
  );
};

export default LedgerPage;